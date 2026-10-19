import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Building2, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { User, Certificate, TrainingSession } from '../../types';
import { StorageService } from '../../services/storage';
import { PDFGeneratorService } from '../../services/pdfGenerator';

interface ParticipantPortalProps {
  currentUser: User;
  onNavigate: (path: string) => void;
}

export const ParticipantPortal: React.FC<ParticipantPortalProps> = ({ currentUser, onNavigate }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Retrieve participant certificates and sessions
  const certificates = StorageService.getCertificates().filter(c => 
    c.participantEmail.toLowerCase() === currentUser.email.toLowerCase() ||
    c.participantName.toLowerCase().includes(currentUser.name.toLowerCase().slice(0, 4))
  );

  const sessions = StorageService.getSessions().filter(s => 
    s.enrollments.some(e => e.participantEmail.toLowerCase() === currentUser.email.toLowerCase())
  );

  const handleDownloadCertificate = async (cert: Certificate) => {
    setIsDownloading(true);
    try {
      const pdf = await PDFGeneratorService.generateCertificatePDF(cert);
      pdf.save(`${cert.certificateNumber}_Certificate.pdf`);
      showToast('Official Certificate PDF generated and downloaded');
    } catch (e) {
      alert('Failed to generate certificate');
    } finally {
      setIsDownloading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full bg-[#F8FAFC] py-10 min-h-screen">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#012542] text-white text-xs font-semibold shadow-2xl border border-emerald-500/40 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#012542] via-[#012B53] to-[#013C63] text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#012B53] to-[#0C5A91] text-emerald-300 flex items-center justify-center font-bold text-xl border border-emerald-500/40 shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Trainee & Participant Portal
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-emerald-200">
                  {currentUser.role}
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight mt-0.5">
                {currentUser.name}
              </h1>
              <p className="text-xs text-neutral-300">
                {currentUser.email} · Verified Training Candidate
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-neutral-400 block uppercase font-bold">Earned Credentials</span>
            <strong className="text-2xl font-mono text-emerald-300">{certificates.length}</strong>
          </div>
        </div>

        {/* Certificates Showcase */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#012B53] uppercase tracking-wider">
            My Official Certificates of Completion
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-[#142B3A] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-[#142B3A]">
                      {cert.certificateNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {cert.status}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
                    Certified Subject
                  </span>
                  <h3 className="text-xl font-bold text-[#142B3A]">
                    {cert.courseTitle}
                  </h3>
                  {cert.organizationName && (
                    <p className="text-xs text-neutral-500">
                      Affiliation: {cert.organizationName}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-semibold uppercase">Duration</span>
                    <strong className="text-neutral-900">{cert.durationHours} Training Hours</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-semibold uppercase">Exam Score</span>
                    <strong className="text-emerald-700 font-bold">{cert.gradeScore}% (Pass)</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-semibold uppercase">Completion Date</span>
                    <strong className="text-neutral-900">{new Date(cert.completionDate).toLocaleDateString()}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-semibold uppercase">Lead Signatory</span>
                    <strong className="text-neutral-900">{cert.issuedByName}</strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigate(`/verify-certificate`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#547565] hover:text-[#142B3A] underline"
                  >
                    <span>View Public Security Verification</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDownloadCertificate(cert)}
                    disabled={isDownloading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating High-Res PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Official PDF Certificate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {certificates.length === 0 && (
              <div className="p-12 text-center bg-white rounded-xl border border-neutral-200 text-neutral-400 text-xs">
                No issued certificates found under your account. Complete your enrolled session and assessment to receive official credentials.
              </div>
            )}
          </div>
        </div>

        {/* Enrolled Sessions History */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="p-5 bg-[#F8F8F5] border-b border-neutral-200">
            <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
              Enrolled Training Sessions & Attendance History
            </h3>
          </div>

          <div className="divide-y divide-neutral-100">
            {sessions.map(s => {
              const myEnrollment = s.enrollments.find(e => e.participantEmail.toLowerCase() === currentUser.email.toLowerCase());
              return (
                <div key={s.id} className="p-5 flex items-center justify-between hover:bg-neutral-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#142B3A]">{s.courseTitle}</span>
                      <span className="text-xs font-mono text-neutral-400">({s.sessionCode})</span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Trainer: {s.trainerName} · Mode: {s.deliveryType}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                      {myEnrollment?.attendance || 'ENROLLED'}
                    </span>
                    <span className="font-bold text-neutral-800">
                      Score: {myEnrollment?.assessmentScore ? `${myEnrollment.assessmentScore}%` : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
