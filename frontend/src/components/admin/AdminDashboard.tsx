import React, { useMemo } from 'react';
import { 
  Inbox, 
  TrendingUp, 
  Users, 
  Layers, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  FileText,
  AlertCircle,
  Building2,
  FileCheck,
  AlertTriangle,
  Award
} from 'lucide-react';
import { Enquiry, ServiceItem, TrainingCourse, EnquiryStatus, Organization, CompanyVisit, TrainingSession, Certificate, CorrectiveAction } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminDashboardProps {
  enquiries: Enquiry[];
  services: ServiceItem[];
  courses: TrainingCourse[];
  onSelectEnquiry: (id: string) => void;
  onNavigateToSection: (section: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  enquiries,
  services,
  courses,
  onSelectEnquiry,
  onNavigateToSection
}) => {
  // Real database calculations
  const orgs = StorageService.getOrganizations();
  const visits = StorageService.getVisits();
  const sessions = StorageService.getSessions();
  const certificates = StorageService.getCertificates();
  const capas = StorageService.getCAPAs();

  const totalOrgs = orgs.length;
  const totalSites = orgs.reduce((acc, o) => acc + o.sites.length, 0);

  const upcomingVisits = visits.filter(v => ['PLANNED', 'CONFIRMED'].includes(v.status)).length;
  const visitsAwaitingReview = visits.filter(v => v.status === 'SUBMITTED_FOR_REVIEW').length;

  const scheduledSessions = sessions.filter(s => ['PUBLISHED', 'IN_PROGRESS'].includes(s.status)).length;
  const pendingApprovals = sessions.reduce((acc, s) => 
    acc + s.enrollments.filter(e => e.completionStatus === 'SUBMITTED_FOR_APPROVAL').length, 0
  );

  const issuedCerts = certificates.filter(c => c.status === 'ISSUED').length;
  const openCapas = capas.filter(c => c.status !== 'CLOSED').length;
  const overdueCapas = capas.filter(c => c.isOverdue || (c.status !== 'CLOSED' && new Date(c.dueDate) < new Date())).length;
  const newEnquiries = enquiries.filter(e => e.status === 'NEW').length;
  const totalEnquiries = enquiries.length;

  const statusBreakdown = useMemo(() => {
    const counts: Record<EnquiryStatus, number> = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL_SENT: 0,
      CONVERTED: 0,
      CLOSED: 0,
      SPAM: 0
    };
    enquiries.forEach(e => {
      if (counts[e.status] !== undefined) counts[e.status]++;
    });
    return counts;
  }, [enquiries]);

  // Service interest distribution
  const serviceDistribution = useMemo(() => {
    const map = new Map<string, number>();
    enquiries.forEach(e => {
      const title = e.serviceTitle || 'General Consulting';
      map.set(title, (map.get(title) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [enquiries]);

  const recentEnquiries = useMemo(() => {
    return [...enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  }, [enquiries]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time calculations across Client Organizations, Site Audits, Training Sessions, Certificates, and CAPAs.
          </p>
        </div>

        <button
          onClick={() => onNavigateToSection('ENQUIRIES')}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors self-start"
        >
          <span>Manage Enquiries ({enquiries.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary KPI Grid (10 Widgets required by prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* 1. Client Organizations */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Client Orgs</span>
            <Building2 className="w-3.5 h-3.5 text-[#142B3A]" />
          </div>
          <div className="text-2xl font-extrabold text-[#142B3A] font-mono tabular-nums">
            {totalOrgs}
          </div>
          <div className="text-[10px] text-neutral-500">
            {totalSites} operational sites
          </div>
        </div>

        {/* 2. Upcoming Visits */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#547565]">Upcoming Visits</span>
            <Clock className="w-3.5 h-3.5 text-[#547565]" />
          </div>
          <div className="text-2xl font-extrabold text-[#547565] font-mono tabular-nums">
            {upcomingVisits}
          </div>
          <div className="text-[10px] text-neutral-500">
            Scheduled auditor visits
          </div>
        </div>

        {/* 3. Visits Awaiting Review */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Review Queue</span>
            <FileCheck className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <div className="text-2xl font-extrabold text-purple-700 font-mono tabular-nums">
            {visitsAwaitingReview}
          </div>
          <div className="text-[10px] text-neutral-500">
            Reports pending approval
          </div>
        </div>

        {/* 4. Scheduled Training Sessions */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Training Batches</span>
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <div className="text-2xl font-extrabold text-blue-700 font-mono tabular-nums">
            {scheduledSessions}
          </div>
          <div className="text-[10px] text-neutral-500">
            Published / in progress
          </div>
        </div>

        {/* 5. Awaiting Approval */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Pending Trainees</span>
            <Users className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
            {pendingApprovals}
          </div>
          <div className="text-[10px] text-neutral-500">
            Awaiting completion sign-off
          </div>
        </div>

        {/* 6. Certificates Issued */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Certificates</span>
            <Award className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
            {issuedCerts}
          </div>
          <div className="text-[10px] text-neutral-500">
            Issued with QR verification
          </div>
        </div>

        {/* 7. Open Corrective Actions */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Open CAPAs</span>
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
            {openCapas}
          </div>
          <div className="text-[10px] text-neutral-500">
            Active non-conformities
          </div>
        </div>

        {/* 8. Overdue CAPAs */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">Overdue CAPAs</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
          </div>
          <div className="text-2xl font-extrabold text-red-700 font-mono tabular-nums">
            {overdueCapas}
          </div>
          <div className="text-[10px] text-neutral-500">
            Past due date threshold
          </div>
        </div>

        {/* 9. New Inbound Leads */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#547565]">New Leads</span>
            <Inbox className="w-3.5 h-3.5 text-[#547565]" />
          </div>
          <div className="text-2xl font-extrabold text-[#547565] font-mono tabular-nums">
            {newEnquiries}
          </div>
          <div className="text-[10px] text-neutral-500">
            Uncontacted enquiries
          </div>
        </div>

        {/* 10. Total Inbound Pipeline */}
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#142B3A]">Total Leads</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#142B3A]" />
          </div>
          <div className="text-2xl font-extrabold text-[#142B3A] font-mono tabular-nums">
            {enquiries.length}
          </div>
          <div className="text-[10px] text-neutral-500">
            Submissions in repository
          </div>
        </div>

      </div>

      {/* Main Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Status Pipeline Distribution */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-700">
            Enquiry Status Pipeline
          </h2>

          <div className="space-y-3">
            {(Object.keys(statusBreakdown) as EnquiryStatus[]).map((status) => {
              const count = statusBreakdown[status];
              const pct = totalEnquiries > 0 ? Math.round((count / totalEnquiries) * 100) : 0;
              return (
                <div key={status} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-700">{status}</span>
                    <span className="font-mono text-neutral-500">
                      {count} enquiries ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        status === 'NEW' ? 'bg-[#547565]' :
                        status === 'CONTACTED' ? 'bg-blue-400' :
                        status === 'QUALIFIED' ? 'bg-blue-600' :
                        status === 'PROPOSAL_SENT' ? 'bg-purple-600' :
                        status === 'CONVERTED' ? 'bg-emerald-600' :
                        status === 'CLOSED' ? 'bg-neutral-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Interest Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-700">
            Demand by Service Scope
          </h2>

          <div className="space-y-3 pt-1">
            {serviceDistribution.map(([title, count]) => {
              const pct = totalEnquiries > 0 ? Math.round((count / totalEnquiries) * 100) : 0;
              return (
                <div key={title} className="p-3 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <div className="text-xs font-semibold text-neutral-800 truncate">{title}</div>
                    <div className="text-[11px] text-neutral-400">{pct}% of inbound interest</div>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#142B3A] shrink-0">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent Inbound Enquiries Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden space-y-4">
        <div className="p-6 pb-2 flex items-center justify-between border-b border-neutral-100">
          <div>
            <h2 className="text-base font-bold text-[#142B3A]">
              Recent Lead Activity
            </h2>
            <p className="text-xs text-neutral-500">
              Latest submissions received through the website portal
            </p>
          </div>

          <button
            onClick={() => onNavigateToSection('ENQUIRIES')}
            className="text-xs font-semibold text-[#547565] hover:text-[#142B3A] flex items-center gap-1"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F5] text-neutral-500 uppercase font-semibold text-[10px] tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Company / Client</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-normal text-neutral-700">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-6 py-3.5 font-mono font-bold text-[#142B3A]">
                    {enq.referenceNumber}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="font-semibold text-neutral-900">{enq.companyName}</div>
                    <div className="text-[11px] text-neutral-400">{enq.name} · {enq.email}</div>
                  </td>
                  <td className="px-6 py-3.5 text-neutral-600">
                    {enq.serviceTitle || 'General Enquiry'}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                      enq.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                      enq.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-800' :
                      enq.status === 'PROPOSAL_SENT' ? 'bg-purple-100 text-purple-800' :
                      enq.status === 'CONVERTED' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-neutral-400 font-mono text-[11px]">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => {
                        onSelectEnquiry(enq.id);
                        onNavigateToSection('ENQUIRIES');
                      }}
                      className="text-xs font-semibold text-[#142B3A] hover:text-[#547565] underline"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
