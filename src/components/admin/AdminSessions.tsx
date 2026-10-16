import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Users, 
  CheckCircle, 
  Award, 
  Clock, 
  AlertCircle, 
  X, 
  Download,
  Search,
  ChevronRight,
  ShieldCheck,
  Check,
  Loader2
} from 'lucide-react';
import { TrainingSession, ParticipantEnrollment, User, TrainingCourse, Organization } from '../../types';
import { StorageService } from '../../services/storage';
import { PDFGeneratorService } from '../../services/pdfGenerator';

interface AdminSessionsProps {
  currentUser: User;
  onRefresh: () => void;
}

export const AdminSessions: React.FC<AdminSessionsProps> = ({ currentUser, onRefresh }) => {
  const [sessions, setSessions] = useState<TrainingSession[]>(StorageService.getSessions());
  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessions[0]?.id || '');
  const [isScheduling, setIsScheduling] = useState(false);
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingCert, setIsGeneratingCert] = useState<string | null>(null);

  const courses = StorageService.getCourses();
  const orgs = StorageService.getOrganizations();
  const trainers = StorageService.getUsers().filter(u => ['TRAINER', 'ADMIN', 'SUPER_ADMIN'].includes(u.role));

  // New session form
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [selectedTrainerId, setSelectedTrainerId] = useState(trainers[0]?.id || '');
  const [selectedOrgId, setSelectedOrgId] = useState(orgs[0]?.id || '');
  const [deliveryType, setDeliveryType] = useState<TrainingSession['deliveryType']>('On-site corporate');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venueOrLink, setVenueOrLink] = useState('Executive Seminar Hall & Online Stream');
  const [maxSeats, setMaxSeats] = useState(25);
  const [passingScore, setPassingScore] = useState(70);

  // New participant form
  const [partName, setPartName] = useState('');
  const [partEmail, setPartEmail] = useState('');

  const activeSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find(c => c.id === selectedCourseId) || courses[0];
    const trainer = trainers.find(t => t.id === selectedTrainerId) || trainers[0];
    const org = orgs.find(o => o.id === selectedOrgId);

    const year = new Date().getFullYear();
    const sessionCode = `ESSOR-TRN-${year}-${(sessions.length + 19).toString().padStart(3, '0')}`;

    const newSession: TrainingSession = {
      id: `sess-${Date.now()}`,
      sessionCode,
      courseId: course.id,
      courseTitle: course.title,
      courseCategory: course.category,
      trainerId: trainer.id,
      trainerName: trainer.name,
      organizationId: org?.id,
      organizationName: org?.legalName,
      deliveryType,
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || new Date(Date.now() + 86400000 * 2).toISOString(),
      venueOrLink,
      status: 'PUBLISHED',
      maxSeats,
      attendanceThresholdPercent: 80,
      passingAssessmentScore: passingScore,
      enrollments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.saveSession(newSession, currentUser);
    const updated = StorageService.getSessions();
    setSessions(updated);
    setSelectedSessionId(newSession.id);
    setIsScheduling(false);
    showToast(`Scheduled session "${sessionCode}"`);
    onRefresh();
  };

  const handleEnrollParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession || !partName.trim() || !partEmail.trim()) return;

    const newEnr: ParticipantEnrollment = {
      id: `enr-${Date.now()}`,
      sessionId: activeSession.id,
      participantId: `usr-part-${Date.now()}`,
      participantName: partName.trim(),
      participantEmail: partEmail.trim().toLowerCase(),
      organizationId: activeSession.organizationId,
      organizationName: activeSession.organizationName,
      attendance: 'PRESENT',
      attendanceMarkedAt: new Date().toISOString(),
      attendanceMarkedBy: currentUser.name,
      assessmentStatus: 'PENDING',
      completionStatus: 'ENROLLED',
      enrolledAt: new Date().toISOString()
    };

    activeSession.enrollments.push(newEnr);
    StorageService.saveSession(activeSession, currentUser);
    setSessions(StorageService.getSessions());
    setPartName('');
    setPartEmail('');
    setIsAddingParticipant(false);
    showToast(`Enrolled participant ${newEnr.participantName}`);
  };

  const handleApproveAndIssue = (enrollmentId: string) => {
    if (!activeSession) return;
    try {
      const res = StorageService.approveCompletionAndIssueCertificate(activeSession.id, enrollmentId, currentUser);
      setSessions(StorageService.getSessions());
      showToast(`Issued Certificate ${res.certificate.certificateNumber}`);
      onRefresh();
    } catch (e: any) {
      alert(e?.message || 'Failed to issue certificate');
    }
  };

  const handleDownloadPDF = async (certNumber: string) => {
    const cert = StorageService.getCertificateByNumber(certNumber);
    if (!cert) return;
    setIsGeneratingCert(certNumber);
    try {
      const pdf = await PDFGeneratorService.generateCertificatePDF(cert);
      pdf.save(`${cert.certificateNumber}_Certificate.pdf`);
      showToast('Certificate PDF generated successfully');
    } catch (e) {
      alert('Error generating PDF');
    } finally {
      setIsGeneratingCert(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-xl border border-[#234257] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#D9B76A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Training Sessions & Participant Batches
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Schedule corporate training cohorts, manage participant attendance and assessments, and issue tamper-evident certificates.
          </p>
        </div>

        <button
          onClick={() => setIsScheduling(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#142B3A] hover:bg-[#1f3f54] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-[#D9B76A]" />
          <span>Schedule New Batch</span>
        </button>
      </div>

      {/* Grid: Session Selection & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sessions List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Scheduled Sessions ({sessions.length})
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {sessions.map(sess => {
              const isSelected = sess.id === activeSession?.id;
              const completedCount = sess.enrollments.filter(e => e.completionStatus === 'APPROVED').length;
              return (
                <div
                  key={sess.id}
                  onClick={() => setSelectedSessionId(sess.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-white border-[#142B3A] shadow-md ring-1 ring-[#142B3A]' 
                      : 'bg-white/70 hover:bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
                    <span>{sess.sessionCode}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {sess.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#142B3A] line-clamp-1">{sess.courseTitle}</h4>
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-1">{sess.organizationName || 'Open Enrolment Batch'}</p>
                  
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{sess.enrollments.length} / {sess.maxSeats} enrolled</span>
                    </span>
                    <span className="font-semibold text-neutral-700">
                      {completedCount} certified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Session Details & Participant Roster */}
        {activeSession ? (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Session Info Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#547565] uppercase tracking-wider">
                    {activeSession.sessionCode} · {activeSession.deliveryType}
                  </span>
                  <h2 className="text-xl font-bold text-[#142B3A] mt-1">{activeSession.courseTitle}</h2>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Lead Trainer: <strong className="text-neutral-800">{activeSession.trainerName}</strong> · Client: <strong className="text-neutral-800">{activeSession.organizationName || 'Open Enrolment'}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingParticipant(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#142B3A] text-xs font-semibold rounded-lg transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enrol Participant</span>
                </button>
              </div>

              {/* Session Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-neutral-400 block">Dates</span>
                  <span className="font-semibold text-neutral-800">
                    {new Date(activeSession.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Venue / Mode</span>
                  <span className="font-semibold text-neutral-800 truncate block">
                    {activeSession.venueOrLink}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Passing Benchmark</span>
                  <span className="font-semibold text-emerald-700">
                    {activeSession.passingAssessmentScore}% Score
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Seats Remaining</span>
                  <span className="font-semibold text-neutral-800">
                    {activeSession.maxSeats - activeSession.enrollments.length} seats free
                  </span>
                </div>
              </div>
            </div>

            {/* Participant Roster Table */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#142B3A]">Participant Roster & Certification Queue</h3>
                  <p className="text-[11px] text-neutral-500">Record assessment scores and approve official certificates</p>
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-600">
                  Total Enrolled: {activeSession.enrollments.length}
                </span>
              </div>

              {activeSession.enrollments.length === 0 ? (
                <div className="p-12 text-center text-xs text-neutral-500">
                  <Users className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  No participants enrolled in this batch yet. Click "Enrol Participant" above to add learners.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-100/70 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
                      <tr>
                        <th className="py-3 px-4">Participant</th>
                        <th className="py-3 px-4">Attendance</th>
                        <th className="py-3 px-4">Score</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {activeSession.enrollments.map((enr) => {
                        const isPassed = enr.assessmentScore && enr.assessmentScore >= activeSession.passingAssessmentScore;
                        return (
                          <tr key={enr.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-semibold text-neutral-800">{enr.participantName}</div>
                              <div className="text-[11px] text-neutral-500">{enr.participantEmail}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                                enr.attendance === 'PRESENT' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {enr.attendance}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {enr.assessmentScore !== undefined ? (
                                <span className={`font-bold ${isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                                  {enr.assessmentScore}%
                                </span>
                              ) : (
                                <span className="text-neutral-400 italic">Not graded</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                                enr.completionStatus === 'APPROVED'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : enr.completionStatus === 'SUBMITTED_FOR_APPROVAL'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-neutral-100 text-neutral-700'
                              }`}>
                                {enr.completionStatus}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              {enr.completionStatus === 'APPROVED' && enr.certificateNumber ? (
                                <button
                                  onClick={() => handleDownloadPDF(enr.certificateNumber!)}
                                  disabled={isGeneratingCert === enr.certificateNumber}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-[#142B3A] text-[11px] font-semibold rounded transition-colors"
                                  title="Download Tamper-Evident Certificate PDF"
                                >
                                  {isGeneratingCert === enr.certificateNumber ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Award className="w-3.5 h-3.5 text-[#D9B76A]" />
                                  )}
                                  <span>{enr.certificateNumber}</span>
                                </button>
                              ) : isPassed || enr.completionStatus === 'SUBMITTED_FOR_APPROVAL' ? (
                                <button
                                  onClick={() => handleApproveAndIssue(enr.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold rounded shadow-sm transition-colors"
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span>Issue Cert</span>
                                </button>
                              ) : (
                                <span className="text-neutral-400 text-[11px] italic">Requires passing score</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        ) : null}

      </div>

      {/* Schedule Modal */}
      {isScheduling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl relative">
            <button
              onClick={() => setIsScheduling(false)}
              className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#142B3A] mb-1">Schedule New Training Cohort</h3>
            <p className="text-xs text-neutral-500 mb-6">Select syllabus, instructor, dates and client facility</p>

            <form onSubmit={handleCreateSession} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Course Curriculum</label>
                <select
                  value={selectedCourseId}
                  onChange={e => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Assigned Trainer</label>
                  <select
                    value={selectedTrainerId}
                    onChange={e => setSelectedTrainerId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    {trainers.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Client Organization (Optional)</label>
                  <select
                    value={selectedOrgId}
                    onChange={e => setSelectedOrgId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="">Open Enrolment (Public Batch)</option>
                    {orgs.map(o => (
                      <option key={o.id} value={o.id}>{o.legalName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Delivery Format</label>
                  <select
                    value={deliveryType}
                    onChange={e => setDeliveryType(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="On-site corporate">On-site corporate</option>
                    <option value="Virtual">Virtual / Remote Interactive</option>
                    <option value="Open-enrolment">Open-enrolment</option>
                    <option value="Customized client curriculum">Customized client curriculum</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Passing Assessment Score (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={passingScore}
                    onChange={e => setPassingScore(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Venue or Virtual Stream URL</label>
                <input
                  type="text"
                  value={venueOrLink}
                  onChange={e => setVenueOrLink(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsScheduling(false)}
                  className="px-4 py-2 border rounded-lg font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B3A] text-white font-semibold rounded-lg hover:bg-[#1f3f54]"
                >
                  Confirm & Schedule Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enrol Participant Modal */}
      {isAddingParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl relative">
            <button
              onClick={() => setIsAddingParticipant(false)}
              className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#142B3A] mb-1">Enrol Learner in Batch</h3>
            <p className="text-xs text-neutral-500 mb-4">{activeSession?.courseTitle}</p>

            <form onSubmit={handleEnrollParticipant} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Participant Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={partName}
                  onChange={e => setPartName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Official Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ramesh.k@company.com"
                  value={partEmail}
                  onChange={e => setPartEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddingParticipant(false)}
                  className="px-4 py-2 border rounded-lg font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B3A] text-white font-semibold rounded-lg hover:bg-[#1f3f54]"
                >
                  Add Participant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
