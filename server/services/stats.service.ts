import { StoreRepository } from '../repositories/store.repository';

export interface DashboardStats {
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
}

export class StatsService {
  static getDashboardStats(): DashboardStats {
    const s = StoreRepository.getState();
    const totalOrgs = s.organizations.length;
    const totalSites = s.organizations.reduce((acc, o) => acc + o.sites.length, 0);
    const upcomingVisits = s.visits.filter(v => ['PLANNED', 'CONFIRMED'].includes(v.status)).length;
    const visitsAwaitingReview = s.visits.filter(v => v.status === 'SUBMITTED_FOR_REVIEW').length;
    const scheduledSessions = s.sessions.filter(sess => ['PUBLISHED', 'IN_PROGRESS'].includes(sess.status)).length;
    const pendingApprovals = s.sessions.reduce((acc, sess) => 
      acc + sess.enrollments.filter(e => e.completionStatus === 'SUBMITTED_FOR_APPROVAL').length, 0
    );
    const issuedCerts = s.certificates.filter(c => c.status === 'ISSUED').length;
    const openCapas = s.capas.filter(c => c.status !== 'CLOSED').length;
    const overdueCapas = s.capas.filter(c => c.isOverdue || (c.status !== 'CLOSED' && new Date(c.dueDate) < new Date())).length;
    const newEnquiries = s.enquiries.filter(e => e.status === 'NEW').length;

    return {
      totalOrgs,
      totalSites,
      upcomingVisits,
      visitsAwaitingReview,
      scheduledSessions,
      pendingApprovals,
      issuedCerts,
      openCapas,
      overdueCapas,
      newEnquiries,
      totalEnquiries: s.enquiries.length
    };
  }
}
