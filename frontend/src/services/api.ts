import { 
  User, 
  UserRole, 
  Organization, 
  CompanyVisit, 
  TrainingSession, 
  Certificate, 
  CorrectiveAction, 
  Enquiry, 
  EnquiryStatus, 
  ServiceItem, 
  TrainingCourse, 
  CMSContent, 
  AuditLog,
  AttendanceStatus
} from '../types';
import { StorageService } from './storage';

const RAW_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '';
export const API_ROOT_URL = RAW_BASE_URL.replace(/\/$/, '');
export const API_BASE = API_ROOT_URL ? `${API_ROOT_URL}/api/v1` : '/api/v1';

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return API_ROOT_URL ? `${API_ROOT_URL}${cleanPath}` : cleanPath;
}

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const currentUser = StorageService.getCurrentUser();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Simulated-Role': currentUser?.role || 'SUPER_ADMIN',
      ...(options?.headers || {})
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export class BackendApiService {
  /**
   * Health check
   */
  static async checkHealth(): Promise<{ status: string; service: string; version: string; uptimeSeconds: number }> {
    try {
      return await fetchJSON(`${API_BASE}/health`);
    } catch {
      return { status: 'STANDALONE_FALLBACK', service: 'Local Client Store', version: '1.0.0', uptimeSeconds: 0 };
    }
  }

  /**
   * Operational Stats for Dashboard Widgets
   */
  static async getStats(): Promise<{
    totalOrgs: number;
    totalSites: number;
    upcomingVisits: number;
    visitsAwaitingReview: number;
    scheduledSessions: number;
    pendingApprovals: number;
    issuedCerts: number;
    openCapas: number;
    overdueCapas: number;
    newEnquiries: number;
    totalEnquiries: number;
  }> {
    try {
      return await fetchJSON(`${API_BASE}/stats`);
    } catch {
      // Fallback to local storage calculations
      const orgs = StorageService.getOrganizations();
      const visits = StorageService.getVisits();
      const sessions = StorageService.getSessions();
      const certs = StorageService.getCertificates();
      const capas = StorageService.getCAPAs();
      const enquiries = StorageService.getEnquiries();

      return {
        totalOrgs: orgs.length,
        totalSites: orgs.reduce((acc, o) => acc + o.sites.length, 0),
        upcomingVisits: visits.filter(v => ['PLANNED', 'CONFIRMED'].includes(v.status)).length,
        visitsAwaitingReview: visits.filter(v => v.status === 'SUBMITTED_FOR_REVIEW').length,
        scheduledSessions: sessions.filter(s => ['PUBLISHED', 'IN_PROGRESS'].includes(s.status)).length,
        pendingApprovals: sessions.reduce((acc, s) => acc + s.enrollments.filter(e => e.completionStatus === 'SUBMITTED_FOR_APPROVAL').length, 0),
        issuedCerts: certs.filter(c => c.status === 'ISSUED').length,
        openCapas: capas.filter(c => c.status !== 'CLOSED').length,
        overdueCapas: capas.filter(c => c.isOverdue || (c.status !== 'CLOSED' && new Date(c.dueDate) < new Date())).length,
        newEnquiries: enquiries.filter(e => e.status === 'NEW').length,
        totalEnquiries: enquiries.length
      };
    }
  }

  /**
   * Auth & User Sessions
   */
  static async getMe(): Promise<User> {
    try {
      return await fetchJSON(`${API_BASE}/auth/me`);
    } catch {
      return StorageService.getCurrentUser();
    }
  }

  static async switchRole(role: UserRole): Promise<User> {
    try {
      const user = await fetchJSON<User>(`${API_BASE}/auth/switch-role`, {
        method: 'POST',
        body: JSON.stringify({ role })
      });
      StorageService.setCurrentUser(user);
      return user;
    } catch {
      return StorageService.switchRole(role);
    }
  }

  static async login(email: string): Promise<User> {
    try {
      const user = await fetchJSON<User>(`${API_BASE}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      StorageService.setCurrentUser(user);
      return user;
    } catch {
      const users = StorageService.getUsers();
      const match = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'PARTICIPANT' as UserRole,
        isActive: true
      };
      StorageService.setCurrentUser(match);
      return match;
    }
  }

  /**
   * Services
   */
  static async getServices(): Promise<ServiceItem[]> {
    try {
      return await fetchJSON(`${API_BASE}/services`);
    } catch {
      return StorageService.getServices();
    }
  }

  static async saveService(service: ServiceItem, actor: User): Promise<ServiceItem> {
    try {
      return await fetchJSON(`${API_BASE}/services`, {
        method: 'POST',
        body: JSON.stringify(service)
      });
    } catch {
      return StorageService.saveService(service, actor);
    }
  }

  /**
   * Courses
   */
  static async getCourses(): Promise<TrainingCourse[]> {
    try {
      return await fetchJSON(`${API_BASE}/courses`);
    } catch {
      return StorageService.getCourses();
    }
  }

  static async saveCourse(course: TrainingCourse, actor: User): Promise<TrainingCourse> {
    try {
      return await fetchJSON(`${API_BASE}/courses`, {
        method: 'POST',
        body: JSON.stringify(course)
      });
    } catch {
      return StorageService.saveCourse(course, actor);
    }
  }

  /**
   * Enquiries Pipeline
   */
  static async getEnquiries(): Promise<Enquiry[]> {
    try {
      return await fetchJSON(`${API_BASE}/enquiries`);
    } catch {
      return StorageService.getEnquiries();
    }
  }

  static async createEnquiry(payload: any): Promise<{ enquiry: Enquiry; referenceNumber: string }> {
    try {
      const res = await fetchJSON<{ enquiry: Enquiry; referenceNumber: string }>(`${API_BASE}/enquiries`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      // also sync local store
      StorageService.createEnquiry(payload);
      return res;
    } catch {
      return StorageService.createEnquiry(payload);
    }
  }

  static async updateEnquiryStatus(enquiryId: string, status: EnquiryStatus, actor: User, reason?: string): Promise<Enquiry> {
    try {
      const updated = await fetchJSON<Enquiry>(`${API_BASE}/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reason })
      });
      StorageService.updateEnquiryStatus(enquiryId, status, actor, reason);
      return updated;
    } catch {
      return StorageService.updateEnquiryStatus(enquiryId, status, actor, reason);
    }
  }

  static async addEnquiryNote(enquiryId: string, noteText: string, actor: User): Promise<Enquiry> {
    try {
      const updated = await fetchJSON<Enquiry>(`${API_BASE}/enquiries/${enquiryId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ note: noteText })
      });
      StorageService.addEnquiryNote(enquiryId, noteText, actor);
      return updated;
    } catch {
      return StorageService.addEnquiryNote(enquiryId, noteText, actor);
    }
  }

  static async assignEnquiry(enquiryId: string, assignedTo: string, actor: User): Promise<Enquiry> {
    try {
      const updated = await fetchJSON<Enquiry>(`${API_BASE}/enquiries/${enquiryId}/assign`, {
        method: 'PATCH',
        body: JSON.stringify({ assignedTo })
      });
      StorageService.assignEnquiry(enquiryId, assignedTo, actor);
      return updated;
    } catch {
      return StorageService.assignEnquiry(enquiryId, assignedTo, actor);
    }
  }

  /**
   * Organizations & Sites
   */
  static async getOrganizations(): Promise<Organization[]> {
    try {
      return await fetchJSON(`${API_BASE}/organizations`);
    } catch {
      return StorageService.getOrganizations();
    }
  }

  static async saveOrganization(org: Organization, actor: User): Promise<Organization> {
    try {
      const updated = await fetchJSON<Organization>(`${API_BASE}/organizations`, {
        method: 'POST',
        body: JSON.stringify(org)
      });
      StorageService.saveOrganization(org, actor);
      return updated;
    } catch {
      return StorageService.saveOrganization(org, actor);
    }
  }

  /**
   * Visits & Inspections
   */
  static async getVisits(): Promise<CompanyVisit[]> {
    try {
      return await fetchJSON(`${API_BASE}/visits`);
    } catch {
      return StorageService.getVisits();
    }
  }

  static async saveVisit(visit: CompanyVisit, actor: User): Promise<CompanyVisit> {
    try {
      const updated = await fetchJSON<CompanyVisit>(`${API_BASE}/visits`, {
        method: 'POST',
        body: JSON.stringify(visit)
      });
      StorageService.saveVisit(visit, actor);
      return updated;
    } catch {
      return StorageService.saveVisit(visit, actor);
    }
  }

  static async reviewVisit(visitId: string, decision: 'APPROVED' | 'REJECTED', notes: string, actor: User): Promise<CompanyVisit> {
    try {
      const updated = await fetchJSON<CompanyVisit>(`${API_BASE}/visits/${visitId}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ decision, notes })
      });
      StorageService.saveVisit(updated, actor);
      return updated;
    } catch {
      const v = StorageService.getVisitById(visitId);
      if (v) {
        v.status = decision === 'APPROVED' ? 'APPROVED' : 'CONFIRMED';
        v.reviewNotes = notes;
        StorageService.saveVisit(v, actor);
        return v;
      }
      throw new Error('Visit not found');
    }
  }

  /**
   * CAPA
   */
  static async getCAPAs(): Promise<CorrectiveAction[]> {
    try {
      return await fetchJSON(`${API_BASE}/capa`);
    } catch {
      return StorageService.getCAPAs();
    }
  }

  static async saveCAPA(capa: CorrectiveAction, actor: User): Promise<CorrectiveAction> {
    try {
      const updated = await fetchJSON<CorrectiveAction>(`${API_BASE}/capa`, {
        method: 'POST',
        body: JSON.stringify(capa)
      });
      StorageService.saveCAPA(capa, actor);
      return updated;
    } catch {
      return StorageService.saveCAPA(capa, actor);
    }
  }

  static async submitCAPAEvidence(capaId: string, filename: string, notes: string, actor: User): Promise<CorrectiveAction> {
    try {
      const updated = await fetchJSON<CorrectiveAction>(`${API_BASE}/capa/${capaId}/evidence`, {
        method: 'POST',
        body: JSON.stringify({ filename, notes })
      });
      StorageService.submitCAPAEvidence(capaId, { uploadedBy: actor.name, uploadedByRole: actor.role, filename, notes }, actor);
      return updated;
    } catch {
      return StorageService.submitCAPAEvidence(capaId, { uploadedBy: actor.name, uploadedByRole: actor.role, filename, notes }, actor);
    }
  }

  static async reviewCAPA(capaId: string, decision: 'APPROVED' | 'REJECTED', comments: string, actor: User): Promise<CorrectiveAction> {
    try {
      const updated = await fetchJSON<CorrectiveAction>(`${API_BASE}/capa/${capaId}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ decision, comments })
      });
      StorageService.reviewCAPA(capaId, decision, comments, actor);
      return updated;
    } catch {
      return StorageService.reviewCAPA(capaId, decision, comments, actor);
    }
  }

  /**
   * Training Sessions & Certificates
   */
  static async getSessions(): Promise<TrainingSession[]> {
    try {
      return await fetchJSON(`${API_BASE}/training/sessions`);
    } catch {
      return StorageService.getSessions();
    }
  }

  static async saveSession(session: TrainingSession, actor: User): Promise<TrainingSession> {
    try {
      const updated = await fetchJSON<TrainingSession>(`${API_BASE}/training/sessions`, {
        method: 'POST',
        body: JSON.stringify(session)
      });
      StorageService.saveSession(session, actor);
      return updated;
    } catch {
      return StorageService.saveSession(session, actor);
    }
  }

  static async enrollParticipant(sessionId: string, name: string, email: string, actor: User): Promise<TrainingSession> {
    try {
      const updated = await fetchJSON<TrainingSession>(`${API_BASE}/training/sessions/${sessionId}/enroll`, {
        method: 'POST',
        body: JSON.stringify({ participantName: name, participantEmail: email })
      });
      return updated;
    } catch {
      const s = StorageService.getSessions().find(item => item.id === sessionId);
      if (s) {
        s.enrollments.push({
          id: `enr-${Date.now()}`,
          sessionId,
          participantId: `usr-part-${Date.now()}`,
          participantName: name,
          participantEmail: email,
          attendance: 'PRESENT',
          assessmentStatus: 'PENDING',
          completionStatus: 'ENROLLED',
          enrolledAt: new Date().toISOString()
        });
        StorageService.saveSession(s, actor);
        return s;
      }
      throw new Error('Session not found');
    }
  }

  static async recordAttendance(sessionId: string, enrollmentId: string, status: AttendanceStatus, actor: User): Promise<TrainingSession> {
    try {
      const updated = await fetchJSON<TrainingSession>(`${API_BASE}/training/sessions/${sessionId}/enrollments/${enrollmentId}/attendance`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      StorageService.recordAttendance(sessionId, enrollmentId, status, actor);
      return updated;
    } catch {
      return StorageService.recordAttendance(sessionId, enrollmentId, status, actor);
    }
  }

  static async recordAssessment(sessionId: string, enrollmentId: string, score: number, remarks: string, actor: User): Promise<TrainingSession> {
    try {
      const updated = await fetchJSON<TrainingSession>(`${API_BASE}/training/sessions/${sessionId}/enrollments/${enrollmentId}/assessment`, {
        method: 'PATCH',
        body: JSON.stringify({ score, remarks })
      });
      StorageService.recordAssessment(sessionId, enrollmentId, score, remarks, actor);
      return updated;
    } catch {
      return StorageService.recordAssessment(sessionId, enrollmentId, score, remarks, actor);
    }
  }

  static async approveCompletionAndIssueCertificate(sessionId: string, enrollmentId: string, actor: User): Promise<{ session: TrainingSession; certificate: Certificate }> {
    try {
      const res = await fetchJSON<{ session: TrainingSession; certificate: Certificate }>(`${API_BASE}/training/sessions/${sessionId}/enrollments/${enrollmentId}/approve-issue`, {
        method: 'POST'
      });
      StorageService.approveCompletionAndIssueCertificate(sessionId, enrollmentId, actor);
      return res;
    } catch {
      return StorageService.approveCompletionAndIssueCertificate(sessionId, enrollmentId, actor);
    }
  }

  static async getCertificates(): Promise<Certificate[]> {
    try {
      return await fetchJSON(`${API_BASE}/certificates`);
    } catch {
      return StorageService.getCertificates();
    }
  }

  static async verifyCertificate(certNumber: string): Promise<{ valid: boolean; certificate: Certificate }> {
    try {
      return await fetchJSON(`${API_BASE}/certificates/verify/${encodeURIComponent(certNumber)}`);
    } catch {
      const cert = StorageService.verifyCertificate(certNumber);
      if (!cert) throw new Error('Certificate not found');
      return { valid: cert.status === 'ISSUED', certificate: cert };
    }
  }

  static async revokeCertificate(certId: string, reason: string, actor: User): Promise<Certificate> {
    try {
      const updated = await fetchJSON<Certificate>(`${API_BASE}/certificates/${certId}/revoke`, {
        method: 'PATCH',
        body: JSON.stringify({ reason })
      });
      StorageService.revokeCertificate(certId, reason, actor);
      return updated;
    } catch {
      return StorageService.revokeCertificate(certId, reason, actor);
    }
  }

  /**
   * CMS & Audit Logs
   */
  static async getCMSContent(): Promise<CMSContent> {
    try {
      return await fetchJSON(`${API_BASE}/cms`);
    } catch {
      return StorageService.getCMSContent();
    }
  }

  static async saveCMSContent(content: CMSContent, actor: User): Promise<CMSContent> {
    try {
      const updated = await fetchJSON<CMSContent>(`${API_BASE}/cms`, {
        method: 'PUT',
        body: JSON.stringify(content)
      });
      StorageService.saveCMSContent(content, actor);
      return updated;
    } catch {
      return StorageService.saveCMSContent(content, actor);
    }
  }

  static async getAuditLogs(): Promise<AuditLog[]> {
    try {
      return await fetchJSON(`${API_BASE}/audit-logs`);
    } catch {
      return StorageService.getAuditLogs();
    }
  }
}
