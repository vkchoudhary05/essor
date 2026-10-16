import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Check, 
  X, 
  ChevronRight,
  Award,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { User, TrainingSession, ParticipantEnrollment, AttendanceStatus } from '../../types';
import { StorageService } from '../../services/storage';

interface TrainerPortalProps {
  currentUser: User;
  onNavigate: (path: string) => void;
}

export const TrainerPortal: React.FC<TrainerPortalProps> = ({ currentUser, onNavigate }) => {
  const [sessions, setSessions] = useState<TrainingSession[]>(StorageService.getSessions());
  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const handleAttendance = (enrollmentId: string, status: AttendanceStatus) => {
    if (!activeSession) return;
    try {
      const updated = StorageService.recordAttendance(activeSession.id, enrollmentId, status, currentUser);
      setSessions(StorageService.getSessions());
      showToast(`Marked ${status} for participant`);
    } catch (e: any) {
      alert(e?.message || 'Failed to update attendance');
    }
  };

  const handleAssessment = (enrollmentId: string, score: number, remarks: string) => {
    if (!activeSession) return;
    try {
      StorageService.recordAssessment(activeSession.id, enrollmentId, score, remarks, currentUser);
      setSessions(StorageService.getSessions());
      showToast(`Recorded score ${score}% (Passing: ${activeSession.passingAssessmentScore}%)`);
    } catch (e: any) {
      alert(e?.message || 'Failed to update assessment');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full bg-[#fafbf9] py-10 min-h-screen">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-xl border border-[#234257] flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Trainer Top Profile Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#142B3A] text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0e271d] text-[#F5E4B5] flex items-center justify-center font-bold text-xl border border-[#D9B76A]/40">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D9B76A]">
                  Trainer Operations Console
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">
                  ROLE: {currentUser.role}
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight mt-0.5">
                {currentUser.name}
              </h1>
              <p className="text-xs text-neutral-300">
                {currentUser.email} · Authorized Food Safety Lead Trainer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-xs text-neutral-300">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Active Sessions</span>
              <strong className="text-lg font-mono text-white">{sessions.length}</strong>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Total Trainees</span>
              <strong className="text-lg font-mono text-[#F5E4B5]">
                {sessions.reduce((acc, s) => acc + s.enrollments.length, 0)}
              </strong>
            </div>
          </div>
        </div>

        {/* Sessions Tab Selector */}
        <div className="flex flex-wrap gap-3 border-b border-neutral-200 pb-3">
          {sessions.map(s => {
            const isSelected = activeSession?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSessionId(s.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-[#142B3A] text-white shadow-sm' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{s.sessionCode}: {s.courseTitle}</span>
                <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold uppercase ${
                  s.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {s.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Session Workspace */}
        {activeSession ? (
          <div className="space-y-6">
            
            {/* Session Specs Card */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Curriculum</span>
                <strong className="text-sm font-bold text-[#142B3A]">{activeSession.courseTitle}</strong>
                <span className="text-[11px] text-[#547565] block">{activeSession.courseCategory}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Target Client</span>
                <strong className="text-sm font-bold text-neutral-900">{activeSession.organizationName || 'Open Enrolment'}</strong>
                <span className="text-[11px] text-neutral-500 block">Delivery: {activeSession.deliveryType}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Schedule & Venue</span>
                <span className="text-neutral-800 font-medium block">
                  {new Date(activeSession.startDate).toLocaleDateString()} – {new Date(activeSession.endDate).toLocaleDateString()}
                </span>
                <span className="text-[11px] text-neutral-500 truncate block max-w-xs">{activeSession.venueOrLink}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Criteria</span>
                <span className="text-neutral-800 font-medium block">Attendance Min: {activeSession.attendanceThresholdPercent}%</span>
                <span className="text-neutral-800 font-medium block">Passing Score: {activeSession.passingAssessmentScore}%</span>
              </div>
            </div>

            {/* Attendance & Assessment Roster */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="p-5 bg-[#F8F8F5] border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                    Participant Attendance Register & Assessment Grading
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Record real-time session attendance and examination scores for certificate eligibility.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-600">
                  Enrolled: {activeSession.enrollments.length} / {activeSession.maxSeats}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFBF9] text-neutral-500 uppercase font-semibold text-[10px] tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="px-5 py-3">Participant</th>
                      <th className="px-5 py-3">Attendance</th>
                      <th className="px-5 py-3">Assessment Score</th>
                      <th className="px-5 py-3">Evaluation Remarks</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-700">
                    {activeSession.enrollments.map(enr => {
                      const isPassing = (enr.assessmentScore || 0) >= activeSession.passingAssessmentScore;
                      return (
                        <tr key={enr.id} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="font-bold text-[#142B3A] text-sm">{enr.participantName}</div>
                            <div className="text-[11px] text-neutral-400">{enr.participantEmail}</div>
                            <div className="text-[10px] text-[#547565] font-semibold">{enr.organizationName}</div>
                          </td>

                          {/* Attendance Selector */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              {(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as AttendanceStatus[]).map(att => (
                                <button
                                  key={att}
                                  onClick={() => handleAttendance(enr.id, att)}
                                  className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition-colors ${
                                    enr.attendance === att
                                      ? att === 'PRESENT' ? 'bg-emerald-600 text-white' :
                                        att === 'ABSENT' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                  }`}
                                >
                                  {att[0]}
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] text-neutral-400 block mt-1 font-mono">
                              Current: {enr.attendance}
                            </span>
                          </td>

                          {/* Assessment Score Input */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                defaultValue={enr.assessmentScore || ''}
                                onBlur={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val)) {
                                    handleAssessment(enr.id, val, enr.assessmentRemarks || 'Completed curriculum evaluation');
                                  }
                                }}
                                placeholder="Score"
                                className="w-16 px-2 py-1 border rounded text-xs font-mono font-bold text-center"
                              />
                              <span className="font-mono text-xs text-neutral-400">%</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isPassing ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                          </td>

                          {/* Remarks */}
                          <td className="px-5 py-4 max-w-xs">
                            <input
                              type="text"
                              defaultValue={enr.assessmentRemarks || ''}
                              onBlur={(e) => {
                                if (enr.assessmentScore !== undefined) {
                                  handleAssessment(enr.id, enr.assessmentScore, e.target.value);
                                }
                              }}
                              placeholder="Notes on candidate..."
                              className="w-full px-2 py-1 border rounded text-xs text-neutral-700"
                            />
                          </td>

                          {/* Completion Lifecycle */}
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                              enr.completionStatus === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              enr.completionStatus === 'SUBMITTED_FOR_APPROVAL' ? 'bg-purple-100 text-purple-800' :
                              'bg-neutral-100 text-neutral-700'
                            }`}>
                              {enr.completionStatus.replace(/_/g, ' ')}
                            </span>
                          </td>

                          {/* Certificate Badge */}
                          <td className="px-5 py-4 text-right">
                            {enr.certificateNumber ? (
                              <button
                                onClick={() => onNavigate(`/verify-certificate`)}
                                className="font-mono font-bold text-xs text-[#547565] hover:text-[#142B3A] underline"
                              >
                                {enr.certificateNumber}
                              </button>
                            ) : enr.completionStatus === 'APPROVED' ? (
                              <span className="text-[11px] text-neutral-500">Processing</span>
                            ) : (
                              <span className="text-[11px] text-neutral-400 italic">Pending approval</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {activeSession.enrollments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-neutral-400">
                          No participants enrolled yet. Enrol trainees in the Admin Console.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance Guarantee Notice */}
            <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#547565]" />
                <span>Trainer audit trail active: All score submissions logged with timestamp and trainer credential.</span>
              </div>
              <button
                onClick={() => onNavigate('/admin')}
                className="text-xs font-semibold text-[#142B3A] hover:underline"
              >
                Go to Admin Overview
              </button>
            </div>

          </div>
        ) : null}

      </div>

    </div>
  );
};
