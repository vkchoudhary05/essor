import React, { useState } from 'react';
import { FileCheck, Building2, Calendar, Plus, CheckCircle, Download, X, Eye, ShieldCheck, Loader2 } from 'lucide-react';
import { CompanyVisit, VisitLifecycle, User, Organization } from '../../types';
import { StorageService } from '../../services/storage';
import { PDFGeneratorService } from '../../services/pdfGenerator';

interface AdminVisitsProps {
  currentUser: User;
  onRefresh: () => void;
}

export const AdminVisits: React.FC<AdminVisitsProps> = ({ currentUser, onRefresh }) => {
  const [visits, setVisits] = useState<CompanyVisit[]>(StorageService.getVisits());
  const [orgs] = useState<Organization[]>(StorageService.getOrganizations());
  const [selectedVisit, setSelectedVisit] = useState<CompanyVisit | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New visit state
  const [targetOrgId, setTargetOrgId] = useState(orgs[0]?.id || '');
  const [targetSiteId, setTargetSiteId] = useState('');
  const [consultantName, setConsultantName] = useState('Rajesh Verma');
  const [visitType, setVisitType] = useState<CompanyVisit['visitType']>('AUDIT_GAP_ASSESSMENT');
  const [scheduledDate, setScheduledDate] = useState('');
  const [standardsScope, setStandardsScope] = useState('BRCGS, FSSC 22000');

  // Approval review notes
  const [reviewNotes, setReviewNotes] = useState('');

  const currentOrg = orgs.find(o => o.id === targetOrgId) || orgs[0];

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrg || !scheduledDate) return;

    const matchedSite = currentOrg.sites.find(s => s.id === targetSiteId) || currentOrg.sites[0];
    const visitRef = `ECS-VST-${new Date().getFullYear()}-${(visits.length + 13).toString().padStart(3, '0')}`;

    const newVisit: CompanyVisit = {
      id: `vst-${Date.now()}`,
      visitReference: visitRef,
      organizationId: currentOrg.id,
      organizationName: currentOrg.legalName,
      siteId: matchedSite?.id || 'site-1',
      siteName: matchedSite?.name || 'Main Facility',
      siteAddress: matchedSite?.address || 'Site Address',
      consultantId: 'usr-5',
      consultantName,
      scheduledDate,
      visitType,
      standardsScope: standardsScope.split(',').map(s => s.trim()),
      status: 'CONFIRMED',
      checklistResponses: [],
      findingsCount: { critical: 0, major: 0, minor: 0, observations: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.saveVisit(newVisit, currentUser);
    setVisits(StorageService.getVisits());
    setIsScheduling(false);
    showToast(`Scheduled visit ${visitRef} for ${currentOrg.legalName}`);
    onRefresh();
  };

  const handleApproveReport = (visitId: string) => {
    try {
      StorageService.approveVisitReport(visitId, reviewNotes || 'Approved by Lead Auditor after technical verification.', currentUser);
      setVisits(StorageService.getVisits());
      setSelectedVisit(null);
      setReviewNotes('');
      showToast('Official Visit Report approved and issued to client portal');
      onRefresh();
    } catch (e: any) {
      alert(e?.message || 'Failed to approve report');
    }
  };

  const handleDownloadPDF = async (visit: CompanyVisit) => {
    setIsGeneratingPDF(true);
    try {
      const pdf = await PDFGeneratorService.generateVisitReportPDF(visit);
      pdf.save(`${visit.visitReference}_Official_Report.pdf`);
      showToast('Official report PDF downloaded');
    } catch (e) {
      alert('Failed to generate report PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-xl border border-[#234257] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Company Visits & Site Audits Schedule
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Coordinate auditor site assignments, review digital inspection checklists, and approve official audit reports.
          </p>
        </div>

        <button
          onClick={() => setIsScheduling(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F5] text-neutral-500 uppercase font-semibold text-[10px] tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-5 py-3">Reference</th>
                <th className="px-5 py-3">Client & Site</th>
                <th className="px-5 py-3">Visit Type</th>
                <th className="px-5 py-3">Consultant</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Findings</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {visits.map(v => (
                <tr key={v.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[#142B3A]">
                    {v.visitReference}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-neutral-900">{v.organizationName}</div>
                    <div className="text-[11px] text-neutral-500 truncate max-w-xs">{v.siteName}</div>
                  </td>
                  <td className="px-5 py-4 font-medium text-neutral-700">
                    {v.visitType.replace(/_/g, ' ')}
                  </td>
                  <td className="px-5 py-4 text-neutral-800">
                    {v.consultantName}
                  </td>
                  <td className="px-5 py-4 font-mono text-neutral-500 text-[11px]">
                    {new Date(v.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px]">
                    <span className="text-red-700 font-bold">{v.findingsCount.critical + v.findingsCount.major} Maj</span> · 
                    <span className="text-neutral-600"> {v.findingsCount.minor} Min</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      v.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                      v.status === 'SUBMITTED_FOR_REVIEW' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedVisit(v)}
                      className="text-xs font-semibold text-[#547565] hover:text-[#142B3A] underline"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(v)}
                      disabled={isGeneratingPDF}
                      className="text-xs font-semibold text-[#142B3A] hover:text-[#547565] underline"
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Visit Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl p-6 space-y-4 text-xs max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#547565]">{selectedVisit.visitReference}</span>
                <h3 className="text-lg font-bold text-[#142B3A]">{selectedVisit.organizationName} - {selectedVisit.siteName}</h3>
              </div>
              <button onClick={() => setSelectedVisit(null)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 border space-y-2">
              <span className="font-bold text-neutral-800 block">Consultant Observation Summary:</span>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                {selectedVisit.consultantSummaryNotes || 'No notes submitted yet.'}
              </p>
              <div className="text-[11px] text-neutral-500 pt-1">
                Client Representative Present: <strong>{selectedVisit.clientRepPresent || 'QA Lead'}</strong>
              </div>
            </div>

            {selectedVisit.checklistResponses.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-neutral-800 block uppercase text-[10px]">Checklist Highlights:</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {selectedVisit.checklistResponses.map(c => (
                    <div key={c.id} className="p-2.5 rounded border bg-white flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-neutral-800 block">{c.section}</span>
                        <span className="text-[11px] text-neutral-500">{c.question}</span>
                        {c.observation && <p className="text-[11px] text-red-700 mt-1 font-medium">{c.observation}</p>}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.response === 'COMPLIANT' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {c.response}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedVisit.status === 'SUBMITTED_FOR_REVIEW' && (
              <div className="space-y-3 pt-3 border-t">
                <label className="block font-semibold text-neutral-800">
                  Lead Auditor Review & Approval Sign-off Comments:
                </label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  placeholder="Technical verification comments (e.g. Corrective action timeline reviewed and confirmed)..."
                  className="w-full px-3 py-2 border rounded-lg resize-none text-xs"
                />
                <button
                  onClick={() => handleApproveReport(selectedVisit.id)}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
                >
                  Approve & Issue Official Report to Client
                </button>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2 border-t">
              <button
                onClick={() => handleDownloadPDF(selectedVisit)}
                className="px-4 py-2 font-semibold text-white bg-[#142B3A] rounded-lg"
              >
                Download PDF
              </button>
              <button
                onClick={() => setSelectedVisit(null)}
                className="px-4 py-2 font-semibold text-neutral-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {isScheduling && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#142B3A]">Schedule Site Audit Visit</h3>
              <button onClick={() => setIsScheduling(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleScheduleVisit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Target Client Organization</label>
                <select
                  value={targetOrgId}
                  onChange={e => {
                    setTargetOrgId(e.target.value);
                    const matched = orgs.find(o => o.id === e.target.value);
                    if (matched && matched.sites[0]) setTargetSiteId(matched.sites[0].id);
                  }}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  {orgs.map(o => (
                    <option key={o.id} value={o.id}>{o.legalName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Target Facility Site</label>
                <select
                  value={targetSiteId}
                  onChange={e => setTargetSiteId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  {currentOrg.sites.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.siteCode})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Lead Consultant / Auditor</label>
                  <input
                    type="text"
                    required
                    value={consultantName}
                    onChange={e => setConsultantName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Planned Date</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Visit Type</label>
                <select
                  value={visitType}
                  onChange={e => setVisitType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="AUDIT_GAP_ASSESSMENT">AUDIT_GAP_ASSESSMENT</option>
                  <option value="MOCK_AUDIT">MOCK_AUDIT</option>
                  <option value="MONTHLY_GMP_REVIEW">MONTHLY_GMP_REVIEW</option>
                  <option value="SUPPLIER_AUDIT">SUPPLIER_AUDIT</option>
                  <option value="SPECIALIZED_INSPECTION">SPECIALIZED_INSPECTION</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Standards Scope (Comma separated)</label>
                <input
                  type="text"
                  value={standardsScope}
                  onChange={e => setStandardsScope(e.target.value)}
                  placeholder="BRCGS, FSSC 22000, ISO 22000"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsScheduling(false)} className="px-4 py-2 font-semibold text-neutral-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-[#142B3A] rounded-lg">
                  Confirm & Schedule Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
