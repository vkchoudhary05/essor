import { StoreRepository } from '../repositories/store.repository';
import { TrainingSession, Certificate, AttendanceStatus, User } from '../types';

export class TrainingService {
  static getAllSessions(): TrainingSession[] {
    const s = StoreRepository.getState();
    return s.sessions;
  }

  static upsertSession(session: TrainingSession, actor: User): TrainingSession {
    const s = StoreRepository.getState();
    const idx = s.sessions.findIndex(item => item.id === session.id);
    const updated = { ...session, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
      s.sessions[idx] = updated;
      StoreRepository.logAudit(actor, 'UPDATE', 'SESSION', session.id, `Updated session ${session.sessionCode}`);
    } else {
      s.sessions.push(updated);
      StoreRepository.logAudit(actor, 'CREATE', 'SESSION', session.id, `Created session ${session.sessionCode}`);
    }

    StoreRepository.saveState();
    return updated;
  }

  static enrollParticipant(sessionId: string, participantName: string, participantEmail: string, actor: User): TrainingSession {
    const s = StoreRepository.getState();
    const target = s.sessions.find(sess => sess.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = {
      id: `enr-${Date.now()}`,
      sessionId: target.id,
      participantId: `usr-part-${Date.now()}`,
      participantName,
      participantEmail,
      organizationId: target.organizationId,
      organizationName: target.organizationName,
      attendance: 'PRESENT' as AttendanceStatus,
      attendanceMarkedAt: new Date().toISOString(),
      attendanceMarkedBy: actor.name,
      assessmentStatus: 'PENDING' as const,
      completionStatus: 'ENROLLED' as const,
      enrolledAt: new Date().toISOString()
    };

    target.enrollments.push(enr);
    target.updatedAt = new Date().toISOString();
    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'ENROL_PARTICIPANT', 'SESSION', target.id, `Enrolled ${enr.participantName}`);
    return target;
  }

  static recordAttendance(sessionId: string, enrollmentId: string, status: AttendanceStatus, actor: User): TrainingSession {
    const s = StoreRepository.getState();
    const target = s.sessions.find(sess => sess.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = target.enrollments.find(e => e.id === enrollmentId);
    if (!enr) throw new Error('Enrollment not found');

    enr.attendance = status;
    enr.attendanceMarkedAt = new Date().toISOString();
    enr.attendanceMarkedBy = actor.name;
    enr.completionStatus = 'ATTENDED';
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'RECORD_ATTENDANCE', 'SESSION', target.id, `Recorded attendance ${enr.attendance} for ${enr.participantName}`);
    return target;
  }

  static recordAssessment(sessionId: string, enrollmentId: string, score: number, remarks: string | undefined, actor: User): TrainingSession {
    const s = StoreRepository.getState();
    const target = s.sessions.find(sess => sess.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = target.enrollments.find(e => e.id === enrollmentId);
    if (!enr) throw new Error('Enrollment not found');

    enr.assessmentScore = score;
    enr.assessmentRemarks = remarks || 'Graded by instructor';
    enr.assessmentStatus = score >= target.passingAssessmentScore ? 'PASSED' : 'FAILED';
    enr.completionStatus = score >= target.passingAssessmentScore ? 'SUBMITTED_FOR_APPROVAL' : 'ASSESSED';
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'RECORD_ASSESSMENT', 'SESSION', target.id, `Recorded score ${score}% for ${enr.participantName}`);
    return target;
  }

  static approveAndIssue(sessionId: string, enrollmentId: string, actor: User): { session: TrainingSession; certificate: Certificate } {
    const s = StoreRepository.getState();
    const target = s.sessions.find(sess => sess.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = target.enrollments.find(e => e.id === enrollmentId);
    if (!enr) throw new Error('Enrollment not found');

    const certNum = `ECS-CERT-${new Date().getFullYear()}-${(s.certificates.length + 92).toString().padStart(4, '0')}`;
    const token = `vtf-${Math.random().toString(36).substring(2, 10)}-${new Date().getFullYear()}`;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      verificationToken: token,
      participantId: enr.participantId,
      participantName: enr.participantName,
      participantEmail: enr.participantEmail,
      organizationName: enr.organizationName || target.organizationName,
      courseId: target.courseId,
      courseTitle: target.courseTitle,
      sessionId: target.id,
      completionDate: new Date().toISOString(),
      durationHours: 16,
      gradeScore: enr.assessmentScore,
      issueDate: new Date().toISOString(),
      issuedByName: actor.name,
      issuedByRole: actor.role === 'SUPER_ADMIN' ? 'Principal Lead Auditor' : 'Executive Director of Compliance',
      status: 'ISSUED',
      verificationCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    s.certificates.unshift(newCert);
    enr.completionStatus = 'APPROVED';
    enr.approvedBy = actor.name;
    enr.approvedAt = new Date().toISOString();
    enr.certificateId = newCert.id;
    enr.certificateNumber = newCert.certificateNumber;
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'ISSUE_CERTIFICATE', 'CERTIFICATE', newCert.id, `Issued certificate ${newCert.certificateNumber} to ${enr.participantName}`);
    return { session: target, certificate: newCert };
  }
}
