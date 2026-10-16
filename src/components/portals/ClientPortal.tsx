import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Upload, 
  Download, 
  Eye, 
  Clock, 
  ShieldCheck, 
  GraduationCap, 
  FolderCheck,
  ChevronRight,
  Plus,
  Loader2
} from 'lucide-react';
import { User, Organization, CompanyVisit, CorrectiveAction, Certificate, ComplianceDocument } from '../../types';
import { StorageService } from '../../services/storage';
import { PDFGeneratorService } from '../../services/pdfGenerator';

interface ClientPortalProps {
  currentUser: User;
  onNavigate: (path: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'VISITS' | 'CAPA' | 'TRAINING' | 'DOCUMENTS'>('OVERVIEW');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Evidence submission state
  const [selectedCapaId, setSelectedCapaId] = useState<string | null>(null);
  const [evidenceFileName, setEvidenceFileName] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');

  // Retrieve client-isolated records
  const allOrgs = StorageService.getOrganizations();
  const org = allOrgs.find(o => o.id === currentUser.organizationId) || allOrgs[0];
  
  const visits = StorageService.getVisits().filter(v => v.organizationId === org.id);
  const capas = StorageService.getCAPAs().filter(c => c.organizationId === org.id);
  const certificates = StorageService.getCertificates().filter(c => c.organizationName?.toLowerCase().includes(org.legalName.toLowerCase().slice(0, 8)));
  const documents = StorageService.getDocuments().filter(d => d.organizationId === org.id);

  const openCapasCount = capas.filter(c => c.status !== 'CLOSED').length;

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCapaId || !evidenceFileName.trim()) return;

    try {
      StorageService.submitCAPAEvidence(selectedCapaId, {
        uploadedBy: currentUser.name,
        uploadedByRole: currentUser.role,
        filename: evidenceFileName.trim(),
        notes: evidenceNotes.trim() || 'Attached corrective evidence file for Lead Auditor verification.'
      }, currentUser);

      setSelectedCapaId(null);
      setEvidenceFileName('');
      setEvidenceNotes('');
      showToast('Corrective action evidence submitted for review');
    } catch (err: any) {
      alert(err?.message || 'Failed to submit evidence');
    }
  };

  const handleDownloadCertificate = async (cert: Certificate) => {
    setIsDownloading(true);
    try {
      const pdf = await PDFGeneratorService.generateCertificatePDF(cert);
      pdf.save(`${cert.certificateNumber}_Certificate.pdf`);
      showToast('Certificate downloaded successfully');
    } catch (e) {
      alert('Failed to download certificate');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadVisitReport = async (visit: CompanyVisit) => {
    setIsDownloading(true);
    try {
      const pdf = await PDFGeneratorService.generateVisitReportPDF(visit);
      pdf.save(`${visit.visitReference}_Audit_Report.pdf`);
      showToast('Audit report downloaded successfully');
    } catch (e) {
      alert('Failed to download report');
    } finally {
      setIsDownloading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full bg-[#fafbf9] py-10 min-h-screen">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-xl border border-[#234257] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Client Top Profile Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#142B3A] text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0e271d] text-[#F5E4B5] flex items-center justify-center font-bold text-xl border border-[#D9B76A]/40">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D9B76A]">
                  Client Compliance Portal (Tenant Isolated)
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">
                  {currentUser.role}
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight mt-0.5">
                {org.legalName}
              </h1>
              <p className="text-xs text-neutral-300">
                Authorized User: {currentUser.name} ({currentUser.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-xs text-neutral-300">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Active Sites</span>
              <strong className="text-lg font-mono text-white">{org.sites.length}</strong>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Open CAPAs</span>
              <strong className={`text-lg font-mono ${openCapasCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {openCapasCount}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Certified Staff</span>
              <strong className="text-lg font-mono text-[#F5E4B5]">{certificates.length}</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-2">
          {[
            { id: 'OVERVIEW', label: 'Company & Sites Overview' },
            { id: 'VISITS', label: `Audit & Visit Reports (${visits.length})` },
            { id: 'CAPA', label: `Corrective Actions (${capas.length})` },
            { id: 'TRAINING', label: `Staff Training & Certificates (${certificates.length})` },
            { id: 'DOCUMENTS', label: `Repository Documents (${documents.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#142B3A] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & SITES */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {org.sites.map(site => (
                <div key={site.id} className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#547565]">
                      SITE CODE: {site.siteCode}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      Operational
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#142B3A]">
                    {site.name}
                  </h3>

                  <div className="space-y-2 text-xs text-neutral-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{site.address}, {site.city}, {site.state}, {site.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900">Site Contact:</span>
                      <span>{site.contactName} ({site.contactPhone})</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Target Audit Benchmarks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {site.applicableStandards.map(std => (
                        <span key={std} className="px-2.5 py-1 text-xs font-bold text-[#142B3A] bg-neutral-100 rounded">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3 text-xs">
              <h4 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                Active Service Agreements & SOWs
              </h4>
              <div className="flex flex-wrap gap-2">
                {org.serviceAgreements.map(ag => (
                  <span key={ag} className="px-3 py-1.5 rounded-lg bg-[#F8F8F5] border border-neutral-200 font-semibold text-neutral-800">
                    ✓ {ag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDIT REPORTS */}
        {activeTab === 'VISITS' && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-[#F8F8F5] border-b border-neutral-200">
              <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                Site Inspection & Audit Visit Reports
              </h3>
              <p className="text-xs text-neutral-500">
                Official reports submitted by ESSOR Lead Auditors with non-conformity findings and scorecards.
              </p>
            </div>

            <div className="divide-y divide-neutral-100">
              {visits.map(v => (
                <div key={v.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-neutral-50/60 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-[#142B3A]">{v.visitReference}</span>
                      <span className="text-xs text-neutral-400">· {v.siteName}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-emerald-100 text-emerald-800">
                        {v.status}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-700 font-medium">
                      {v.visitType.replace(/_/g, ' ')} · Standards: {v.standardsScope.join(', ')}
                    </div>
                    <p className="text-xs text-neutral-500 max-w-2xl line-clamp-2">
                      {v.consultantSummaryNotes}
                    </p>
                    <div className="text-[11px] text-neutral-400 pt-1">
                      Lead Consultant: {v.consultantName} · Inspected on: {new Date(v.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleDownloadVisitReport(v)}
                      disabled={isDownloading}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CORRECTIVE ACTIONS (CAPA) */}
        {activeTab === 'CAPA' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                  Corrective & Preventive Action (CAPA) Tracker
                </h3>
                <p className="text-xs text-neutral-500">
                  Track non-conformities, submit objective evidence, and view closure approvals.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 font-bold">
                Total CAPAs: {capas.length}
              </span>
            </div>

            <div className="space-y-4">
              {capas.map(capa => (
                <div key={capa.id} className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-extrabold text-[#142B3A]">
                        {capa.referenceNumber}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                        capa.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        capa.severity === 'MAJOR' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {capa.severity}
                      </span>
                      <span className="text-xs text-neutral-400">Clause: {capa.standardClause || 'General'}</span>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      capa.status === 'CLOSED' ? 'bg-emerald-100 text-emerald-800' :
                      capa.status === 'SUBMITTED_FOR_REVIEW' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {capa.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-1">
                      {capa.findingTitle}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {capa.findingDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-lg">
                    <div>
                      <span className="font-semibold text-neutral-700 block mb-0.5">Immediate Correction:</span>
                      <p className="text-neutral-600">{capa.immediateCorrection || 'Immediate operational containment action pending.'}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-700 block mb-0.5">Preventive Action Plan:</span>
                      <p className="text-neutral-600">{capa.preventiveActionPlan || 'Root cause investigation in progress.'}</p>
                    </div>
                  </div>

                  {/* Evidence List */}
                  {capa.evidenceList.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Submitted Objective Evidence ({capa.evidenceList.length})
                      </span>
                      {capa.evidenceList.map(ev => (
                        <div key={ev.id} className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-neutral-900 block">{ev.filename}</span>
                            <span className="text-neutral-500 text-[11px]">{ev.notes}</span>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400">
                            By {ev.uploadedBy} on {new Date(ev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submit Evidence CTA */}
                  {capa.status !== 'CLOSED' && (
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-500 font-mono">
                        Target Closure Date: {new Date(capa.dueDate).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => setSelectedCapaId(capa.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#547565] hover:bg-[#435e51] rounded-lg transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Evidence</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Evidence Modal Dialog */}
            {selectedCapaId && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                  <div className="p-5 bg-[#142B3A] text-white">
                    <h4 className="text-base font-bold">Submit CAPA Evidence</h4>
                    <p className="text-xs text-neutral-300">Attach photo record or log sheet to close finding</p>
                  </div>
                  <form onSubmit={handleSubmitEvidence} className="p-6 space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        Evidence Document / Log Sheet Filename <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={evidenceFileName}
                        onChange={e => setEvidenceFileName(e.target.value)}
                        placeholder="e.g. Calibrated_CCP_LogSheet_Line3.pdf"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        Remediation Explanation Notes
                      </label>
                      <textarea
                        rows={3}
                        value={evidenceNotes}
                        onChange={e => setEvidenceNotes(e.target.value)}
                        placeholder="Detail how this evidence proves permanent root cause elimination..."
                        className="w-full px-3 py-2 border rounded-lg resize-none"
                      />
                    </div>
                    <div className="pt-3 border-t flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCapaId(null)}
                        className="px-4 py-2 font-semibold text-neutral-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 font-semibold text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg"
                      >
                        Submit to Lead Auditor
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STAFF CERTIFICATES */}
        {activeTab === 'TRAINING' && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-[#F8F8F5] border-b border-neutral-200">
              <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                Staff Training Records & Official Certificates
              </h3>
              <p className="text-xs text-neutral-500">
                Download verified credentials for company personnel to satisfy auditor competency requirements.
              </p>
            </div>

            <div className="divide-y divide-neutral-100">
              {certificates.map(cert => (
                <div key={cert.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#142B3A]">{cert.participantName}</span>
                      <span className="font-mono text-xs text-[#547565]">({cert.certificateNumber})</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700 font-medium">
                      Course: {cert.courseTitle} · Assessment Score: {cert.gradeScore}%
                    </p>
                    <div className="text-[11px] text-neutral-400">
                      Completed: {new Date(cert.completionDate).toLocaleDateString()} · Signatory: {cert.issuedByName}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigate(`/verify-certificate`)}
                      className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleDownloadCertificate(cert)}
                      disabled={isDownloading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMPLIANCE DOCUMENTS */}
        {activeTab === 'DOCUMENTS' && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-[#F8F8F5] border-b border-neutral-200">
              <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                Confidential Compliance Document Vault
              </h3>
              <p className="text-xs text-neutral-500">
                Approved standard operating procedures, gap assessments, and food safety policies.
              </p>
            </div>

            <div className="divide-y divide-neutral-100">
              {documents.map(doc => (
                <div key={doc.id} className="p-5 flex items-center justify-between hover:bg-neutral-50/60">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#142B3A]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#142B3A]">{doc.title}</h4>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {doc.filename} · {doc.fileSizeKb} KB · Version {doc.version}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                    {doc.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
