import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Building2, 
  FileText, 
  ChevronRight, 
  X, 
  Check, 
  Paperclip,
  Download,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { CorrectiveAction, User, FindingSeverity, CAPALifecycle } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminCAPAProps {
  currentUser: User;
  onRefresh: () => void;
}

export const AdminCAPA: React.FC<AdminCAPAProps> = ({ currentUser, onRefresh }) => {
  const [capas, setCapas] = useState<CorrectiveAction[]>(StorageService.getCAPAs());
  const [selectedCapaId, setSelectedCapaId] = useState<string>(capas[0]?.id || '');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | FindingSeverity>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | CAPALifecycle>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Review modal state
  const [reviewAction, setReviewAction] = useState<'CLOSE' | 'REJECT' | null>(null);
  const [reviewComments, setReviewComments] = useState('');

  const selectedCapa = capas.find(c => c.id === selectedCapaId) || capas[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCapa || !reviewAction) return;

    try {
      StorageService.reviewCAPA(
        selectedCapa.id,
        reviewAction === 'CLOSE' ? 'APPROVED' : 'REJECTED',
        reviewComments.trim() || (reviewAction === 'CLOSE' ? 'Verified corrective action implementation and closed finding.' : 'Evidence insufficient; rework required.'),
        currentUser
      );
      setCapas(StorageService.getCAPAs());
      setReviewAction(null);
      setReviewComments('');
      showToast(reviewAction === 'CLOSE' ? 'CAPA finding closed and approved' : 'CAPA rejected for client rework');
      onRefresh();
    } catch (e: any) {
      alert(e?.message || 'Failed to review CAPA');
    }
  };

  const filteredCapas = capas.filter(c => {
    const matchesSearch = 
      c.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.findingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || c.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (sev: FindingSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'MAJOR':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'MINOR':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'OBSERVATION':
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
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
            Corrective & Preventive Actions (CAPA)
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track root cause analyses, corrective evidence submissions, and lead auditor close-out approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
            {capas.filter(c => c.status !== 'CLOSED').length} Open Action Items
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            {capas.filter(c => c.status === 'CLOSED').length} Closed
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search CAPA ref, title, client..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value as any)}
            className="px-3 py-1.5 border rounded-lg text-xs bg-white font-medium text-neutral-700"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="MAJOR">Major</option>
            <option value="MINOR">Minor</option>
            <option value="OBSERVATION">Observation</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 border rounded-lg text-xs bg-white font-medium text-neutral-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="SUBMITTED_FOR_REVIEW">Submitted for Review</option>
            <option value="CLOSED">Closed</option>
            <option value="REJECTED_FOR_REWORK">Rejected for Rework</option>
          </select>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredCapas.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-neutral-200 text-xs text-neutral-500">
              No CAPA records match the selected filters.
            </div>
          ) : (
            filteredCapas.map(capa => {
              const isSelected = capa.id === selectedCapa?.id;
              const isOverdue = capa.status !== 'CLOSED' && new Date(capa.dueDate) < new Date();
              return (
                <div
                  key={capa.id}
                  onClick={() => setSelectedCapaId(capa.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#142B3A] shadow-md ring-1 ring-[#142B3A]'
                      : 'bg-white/80 hover:bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-mono font-bold text-neutral-700">{capa.referenceNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityBadge(capa.severity)}`}>
                      {capa.severity}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#142B3A] line-clamp-1">{capa.findingTitle}</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">{capa.organizationName}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-neutral-100 text-neutral-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span className={isOverdue ? 'text-rose-600 font-bold' : ''}>
                        Due: {new Date(capa.dueDate).toLocaleDateString()}
                      </span>
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      capa.status === 'CLOSED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : capa.status === 'SUBMITTED_FOR_REVIEW'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {capa.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane */}
        {selectedCapa ? (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                    <span>{selectedCapa.referenceNumber}</span>
                    {selectedCapa.sourceVisitRef && (
                      <span>· Source Visit: {selectedCapa.sourceVisitRef}</span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-[#142B3A] mt-1">{selectedCapa.findingTitle}</h2>
                  <div className="text-xs text-neutral-600 mt-1 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{selectedCapa.organizationName} · {selectedCapa.siteName}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getSeverityBadge(selectedCapa.severity)}`}>
                    {selectedCapa.severity} FINDING
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Clause: {selectedCapa.standardClause || 'HACCP / PRP'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Non-Conformance Finding Description
                </h4>
                <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-800 leading-relaxed border border-neutral-100">
                  {selectedCapa.findingDescription}
                </div>
              </div>

              {/* Root Cause & Plans */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-100">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                    Root Cause Analysis (RCA)
                  </h5>
                  <p className="text-xs text-neutral-700">
                    {selectedCapa.rootCauseAnalysis || 'Pending formal 5-Why root cause determination by client QA team.'}
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-100">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-blue-900 mb-1">
                    Immediate Correction & Preventive Plan
                  </h5>
                  <p className="text-xs text-neutral-700">
                    {selectedCapa.preventiveActionPlan || selectedCapa.immediateCorrection || 'Immediate quarantine of impacted lot initiated.'}
                  </p>
                </div>
              </div>

              {/* Assigned Person & Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-neutral-50 rounded-lg text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px]">Responsible Party</span>
                  <span className="font-semibold text-neutral-800">{selectedCapa.responsiblePerson}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Due Date</span>
                  <span className="font-semibold text-neutral-800">
                    {new Date(selectedCapa.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Current Status</span>
                  <span className="font-semibold text-neutral-800">{selectedCapa.status}</span>
                </div>
              </div>

              {/* Evidence Submissions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                  <span>Client Submitted Evidence & Attachments ({selectedCapa.evidenceList.length})</span>
                </h4>

                {selectedCapa.evidenceList.length === 0 ? (
                  <div className="p-4 bg-neutral-50 rounded-lg text-xs text-neutral-500 border border-neutral-100 italic">
                    No corrective evidence documents uploaded yet by client.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedCapa.evidenceList.map(ev => (
                      <div key={ev.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <Paperclip className="w-4 h-4 text-neutral-400" />
                          <div>
                            <span className="font-semibold text-neutral-800 block">{ev.filename}</span>
                            <span className="text-[11px] text-neutral-500">
                              Uploaded by {ev.uploadedBy} ({ev.uploadedByRole}) · {new Date(ev.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Verified Attached
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviewer Comments if closed */}
              {selectedCapa.reviewerComments && (
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                  <strong>Auditor Review Notes:</strong> {selectedCapa.reviewerComments}
                  {selectedCapa.closedBy && (
                    <div className="text-[10px] text-emerald-700 mt-1">
                      Closed by {selectedCapa.closedBy} on {new Date(selectedCapa.closedAt!).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              {selectedCapa.status !== 'CLOSED' && ['SUPER_ADMIN', 'ADMIN', 'AUDITOR_CONSULTANT'].includes(currentUser.role) && (
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setReviewAction('REJECT')}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                  >
                    Reject for Client Rework
                  </button>

                  <button
                    onClick={() => setReviewAction('CLOSE')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Close Finding</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        ) : null}

      </div>

      {/* Review Dialog */}
      {reviewAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl relative">
            <button
              onClick={() => setReviewAction(null)}
              className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#142B3A] mb-1">
              {reviewAction === 'CLOSE' ? 'Approve & Close CAPA' : 'Reject & Request Client Rework'}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              {selectedCapa?.referenceNumber} · {selectedCapa?.findingTitle}
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Lead Auditor Feedback & Decision Notes
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewComments}
                  onChange={e => setReviewComments(e.target.value)}
                  placeholder={
                    reviewAction === 'CLOSE' 
                      ? 'Confirm physical verification or review of photographic evidence satisfactory for closure' 
                      : 'Specify missing evidence, inadequate root cause analysis, or required rework actions'
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setReviewAction(null)}
                  className="px-4 py-2 border rounded-lg font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 text-white font-semibold rounded-lg ${
                    reviewAction === 'CLOSE' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {reviewAction === 'CLOSE' ? 'Confirm Closure' : 'Submit Rework Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
