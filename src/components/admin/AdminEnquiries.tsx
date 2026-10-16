import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Clock, 
  UserCheck, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  AlertCircle, 
  ChevronRight, 
  X,
  FileSpreadsheet,
  Tag
} from 'lucide-react';
import { Enquiry, EnquiryStatus, AdminUser } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminEnquiriesProps {
  enquiries: Enquiry[];
  currentUser: AdminUser;
  onRefresh: () => void;
  selectedEnquiryId?: string;
}

export const AdminEnquiries: React.FC<AdminEnquiriesProps> = ({
  enquiries,
  currentUser,
  onRefresh,
  selectedEnquiryId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);

  // Note form state
  const [noteText, setNoteText] = useState('');
  const [statusReason, setStatusReason] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Set initial selected enquiry if passed
  React.useEffect(() => {
    if (selectedEnquiryId) {
      const found = enquiries.find(e => e.id === selectedEnquiryId);
      if (found) setActiveEnquiry(found);
    }
  }, [selectedEnquiryId, enquiries]);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(e => {
      const matchesSearch = 
        e.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.serviceTitle && e.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  const handleStatusChange = (newStatus: EnquiryStatus) => {
    if (!activeEnquiry) return;
    try {
      const updated = StorageService.updateEnquiryStatus(
        activeEnquiry.id,
        newStatus,
        currentUser,
        statusReason || undefined
      );
      setActiveEnquiry({ ...updated });
      setStatusReason('');
      onRefresh();
      showToast(`Status updated to ${newStatus}`);
    } catch (e: any) {
      alert(e?.message || 'Failed to update status');
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEnquiry || !noteText.trim()) return;

    try {
      const updated = StorageService.addEnquiryNote(
        activeEnquiry.id,
        noteText.trim(),
        currentUser
      );
      setActiveEnquiry({ ...updated });
      setNoteText('');
      onRefresh();
      showToast('Internal note recorded in audit log');
    } catch (e: any) {
      alert(e?.message || 'Failed to add note');
    }
  };

  const handleAssign = () => {
    if (!activeEnquiry || !assigneeEmail.trim()) return;
    try {
      const updated = StorageService.assignEnquiry(
        activeEnquiry.id,
        assigneeEmail.trim(),
        currentUser
      );
      setActiveEnquiry({ ...updated });
      setAssigneeEmail('');
      onRefresh();
      showToast(`Assigned to ${assigneeEmail}`);
    } catch (e: any) {
      alert(e?.message || 'Failed to assign enquiry');
    }
  };

  const handleExportCSV = () => {
    const csvContent = StorageService.exportEnquiriesToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `essor_enquiries_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Enquiry records exported to CSV');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const statusOptions: EnquiryStatus[] = [
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'PROPOSAL_SENT',
    'CONVERTED',
    'CLOSED',
    'SPAM'
  ];

  return (
    <div className="space-y-6">
      
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-lg border border-[#234257] flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Lead & Enquiry Workflow
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage inbound corporate food-safety consulting inquiries and track conversion milestones.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg transition-colors shadow-xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#547565]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by reference, company, contact name, or email..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#547565] focus:border-transparent"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-100 rounded-lg">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              statusFilter === 'ALL' ? 'bg-white text-[#142B3A] shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All ({enquiries.length})
          </button>
          {statusOptions.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                statusFilter === st ? 'bg-white text-[#142B3A] shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Main Grid: List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* List Column */}
        <div className={`${activeEnquiry ? 'lg:col-span-5' : 'lg:col-span-12'} bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden`}>
          <div className="px-4 py-3 bg-[#F8F8F5] border-b border-neutral-200 text-xs font-semibold text-neutral-600 flex items-center justify-between">
            <span>Inbound Records ({filteredEnquiries.length})</span>
            <span className="text-[11px] text-neutral-400">Chronological Sort</span>
          </div>

          <div className="divide-y divide-neutral-100 max-h-[750px] overflow-y-auto">
            {filteredEnquiries.map(enq => {
              const isSelected = activeEnquiry?.id === enq.id;
              return (
                <div
                  key={enq.id}
                  onClick={() => setActiveEnquiry(enq)}
                  className={`p-4 transition-colors cursor-pointer hover:bg-neutral-50 ${
                    isSelected ? 'bg-neutral-50/90 border-l-4 border-l-[#142B3A]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono font-bold text-xs text-[#142B3A]">
                      {enq.referenceNumber}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                      enq.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                      enq.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-800' :
                      enq.status === 'PROPOSAL_SENT' ? 'bg-purple-100 text-purple-800' :
                      enq.status === 'CONVERTED' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {enq.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 mt-1">
                    {enq.companyName}
                  </h3>
                  <div className="text-xs text-neutral-500">
                    {enq.name} · {enq.email}
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 text-[11px] text-neutral-400 border-t border-neutral-100">
                    <span className="truncate max-w-[180px]">
                      {enq.serviceTitle || 'General Consulting'}
                    </span>
                    <span className="font-mono">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredEnquiries.length === 0 && (
              <div className="p-8 text-center text-xs text-neutral-500">
                No matching enquiries found.
              </div>
            )}
          </div>
        </div>

        {/* Detail Column */}
        {activeEnquiry && (
          <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 shadow-md p-6 space-y-6">
            
            {/* Top reference bar */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-extrabold text-[#142B3A]">
                    {activeEnquiry.referenceNumber}
                  </span>
                  <span className="text-xs text-neutral-400">· Source: {activeEnquiry.sourcePage}</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mt-1">
                  {activeEnquiry.companyName}
                </h2>
              </div>

              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md"
                aria-label="Close detail view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Workflow Control */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Update Lifecycle Status
                </span>
                <span className="text-xs text-neutral-500">
                  Current: <strong className="text-neutral-900">{activeEnquiry.status}</strong>
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    disabled={activeEnquiry.status === st}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeEnquiry.status === st
                        ? 'bg-[#142B3A] text-white shadow-xs cursor-default'
                        : 'bg-white hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={statusReason}
                onChange={e => setStatusReason(e.target.value)}
                placeholder="Optional transition reason (e.g. Scoping call completed)..."
                className="w-full px-3 py-1.5 text-xs rounded border border-neutral-300 bg-white"
              />
            </div>

            {/* Inbound Information Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">Primary Contact</span>
                <span className="font-semibold text-neutral-900">{activeEnquiry.name}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">Email</span>
                <a href={`mailto:${activeEnquiry.email}`} className="text-[#547565] underline">{activeEnquiry.email}</a>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">Phone</span>
                <span className="text-neutral-800">{activeEnquiry.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">Preferred Channel</span>
                <span className="font-medium text-neutral-800">{activeEnquiry.preferredContactMethod}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">Service Interest</span>
                <span className="font-medium text-neutral-800">{activeEnquiry.serviceTitle || 'General'}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">Target Standard</span>
                <span className="font-medium text-neutral-800">{activeEnquiry.auditStandard || 'Not specified'}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-neutral-400 uppercase font-semibold text-[10px] block mb-1">
                Client Stated Requirements:
              </span>
              <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap">
                {activeEnquiry.message || 'No additional details provided.'}
              </div>
            </div>

            {/* Assignment Section */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] font-semibold uppercase">Lead Assignee</span>
                <span className="font-semibold text-neutral-800">
                  {activeEnquiry.assignedTo || 'Unassigned'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={assigneeEmail}
                  onChange={e => setAssigneeEmail(e.target.value)}
                  placeholder="assignee@essorcompliance.com"
                  className="px-2.5 py-1 text-xs border border-neutral-300 rounded"
                />
                <button
                  onClick={handleAssign}
                  className="px-3 py-1 bg-[#142B3A] text-white rounded font-semibold text-xs"
                >
                  Assign
                </button>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Internal Staff Notes ({activeEnquiry.notes.length})
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeEnquiry.notes.map(note => (
                  <div key={note.id} className="p-3 rounded-lg bg-neutral-50 border border-neutral-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="font-semibold text-neutral-700">{note.authorName}</span>
                      <span className="font-mono">{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-neutral-800">{note.note}</p>
                  </div>
                ))}
                {activeEnquiry.notes.length === 0 && (
                  <p className="text-xs text-neutral-400 italic">No notes added yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                <input
                  type="text"
                  required
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Add confidential consultant note..."
                  className="flex-1 px-3 py-1.5 text-xs rounded border border-neutral-300"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#547565] hover:bg-[#435e51] rounded"
                >
                  Post Note
                </button>
              </form>
            </div>

            {/* Lifecycle Audit Trail */}
            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Status History Audit Trail
              </h3>
              <div className="space-y-1.5 max-h-36 overflow-y-auto text-[11px] text-neutral-500 font-mono">
                {activeEnquiry.statusHistory.map(hist => (
                  <div key={hist.id} className="p-2 rounded bg-neutral-50 border border-neutral-100">
                    <span className="font-bold text-[#142B3A]">{hist.previousStatus} → {hist.newStatus}</span>
                    <span className="text-neutral-400"> by {hist.changedByName} on {new Date(hist.createdAt).toLocaleString()}</span>
                    {hist.reason && <div className="text-neutral-600 mt-0.5">"{hist.reason}"</div>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
