import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileCheck, 
  Download, 
  Send, 
  Camera, 
  Check, 
  X, 
  ShieldAlert, 
  FileText,
  Loader2
} from 'lucide-react';
import { User, CompanyVisit, InspectionCheckItem, ComplianceAnswer, FindingSeverity } from '../../types';
import { StorageService } from '../../services/storage';
import { PDFGeneratorService } from '../../services/pdfGenerator';

interface ConsultantPortalProps {
  currentUser: User;
  onNavigate: (path: string) => void;
}

export const ConsultantPortal: React.FC<ConsultantPortalProps> = ({ currentUser, onNavigate }) => {
  const [visits, setVisits] = useState<CompanyVisit[]>(StorageService.getVisits());
  const [selectedVisitId, setSelectedVisitId] = useState<string>(visits[0]?.id || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Form states for inspection
  const selectedVisit = visits.find(v => v.id === selectedVisitId) || visits[0];
  const [checklist, setChecklist] = useState<InspectionCheckItem[]>(selectedVisit?.checklistResponses || []);
  const [summaryNotes, setSummaryNotes] = useState(selectedVisit?.consultantSummaryNotes || '');
  const [clientRep, setClientRep] = useState(selectedVisit?.clientRepPresent || '');

  // Default inspection template questions if empty
  const defaultQuestions: InspectionCheckItem[] = [
    {
      id: 'chk-1',
      section: '1. Senior Management Commitment & Food Safety Policy',
      question: 'Is there a written, signed food safety policy communicated across shift bulletin boards and supported by active resource allocation?',
      response: 'COMPLIANT',
      observation: 'Policy signed by MD in Jan 2026. Displayed at plant entrance.'
    },
    {
      id: 'chk-2',
      section: '2. Prerequisite Programs (PRPs) - Facility & Zoning',
      question: 'Are high-hygiene processing zones physically separated with positive air pressure, footbaths, and controlled access doors?',
      response: 'COMPLIANT',
      observation: 'Airlocks verified in blending and packing areas.'
    },
    {
      id: 'chk-3',
      section: '3. Hazard Control Plans (HACCP / OPRP / CCPs)',
      question: 'Are CCP critical limits (e.g. metal detection, pasteurization temp) monitored continuously with calibrated instruments?',
      response: 'NON_COMPLIANT',
      severity: 'MAJOR',
      observation: 'Metal detector conveyor 3 challenge frequency lacks documentation for non-ferrous test rod.',
      correctiveActionRequired: true
    },
    {
      id: 'chk-4',
      section: '4. Allergen Management & Cross-Contact Prevention',
      question: 'Are allergen-containing ingredients stored in dedicated color-coded zones with dedicated transfer equipment?',
      response: 'COMPLIANT',
      observation: 'Yellow tagged storage verified for mustard/celery stocks.'
    },
    {
      id: 'chk-5',
      section: '5. Cleaning, Sanitation & Environmental Swabbing',
      question: 'Is the sanitation master schedule updated and verified through ATP or microbiological surface swab records?',
      response: 'NON_COMPLIANT',
      severity: 'MINOR',
      observation: 'Floor coving crack observed in warehouse bay 2.',
      correctiveActionRequired: true
    }
  ];

  // Load checklist on visit switch
  React.useEffect(() => {
    if (selectedVisit) {
      if (selectedVisit.checklistResponses && selectedVisit.checklistResponses.length > 0) {
        setChecklist(selectedVisit.checklistResponses);
      } else {
        setChecklist(defaultQuestions);
      }
      setSummaryNotes(selectedVisit.consultantSummaryNotes || '');
      setClientRep(selectedVisit.clientRepPresent || '');
    }
  }, [selectedVisitId]);

  const updateQuestionResponse = (id: string, response: ComplianceAnswer, severity?: FindingSeverity, notes?: string) => {
    setChecklist(prev => prev.map(q => {
      if (q.id === id) {
        return {
          ...q,
          response,
          severity: response === 'NON_COMPLIANT' ? (severity || q.severity || 'MINOR') : undefined,
          observation: notes !== undefined ? notes : q.observation,
          correctiveActionRequired: response === 'NON_COMPLIANT'
        };
      }
      return q;
    }));
  };

  const handleSubmitInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisit) return;

    try {
      const updated = StorageService.submitVisitInspection(
        selectedVisit.id,
        checklist,
        summaryNotes,
        clientRep,
        currentUser
      );
      setVisits(StorageService.getVisits());
      showToast(`Inspection submitted for official Lead Auditor approval`);
    } catch (err: any) {
      alert(err?.message || 'Failed to submit inspection');
    }
  };

  const handleDownloadReportPDF = async () => {
    if (!selectedVisit) return;
    setIsGeneratingPDF(true);
    try {
      const currentSnapshot = {
        ...selectedVisit,
        checklistResponses: checklist,
        consultantSummaryNotes: summaryNotes,
        clientRepPresent: clientRep
      };
      const pdf = await PDFGeneratorService.generateVisitReportPDF(currentSnapshot);
      pdf.save(`${selectedVisit.visitReference}_Official_Audit_Report.pdf`);
      showToast('Official Audit Report PDF downloaded');
    } catch (e) {
      console.error(e);
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
    <div className="w-full bg-[#F8FAFC] py-10 min-h-screen">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#012542] text-white text-xs font-semibold shadow-2xl border border-emerald-500/40 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#012542] via-[#012B53] to-[#013C63] text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#012B53] to-[#0C5A91] text-emerald-300 flex items-center justify-center font-bold text-xl border border-emerald-500/40 shadow-md">
              <FileCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Auditor & Consultant Operations Console
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-emerald-200">
                  ROLE: {currentUser.role}
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight mt-0.5">
                {currentUser.name}
              </h1>
              <p className="text-xs text-neutral-300">
                {currentUser.email} · Senior Food Safety Auditor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-emerald-500/20 pt-4 md:pt-0 md:pl-6 text-xs text-neutral-300">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-bold">Assigned Visits</span>
              <strong className="text-lg font-mono text-white">{visits.length}</strong>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-bold">Active Checklist Items</span>
              <strong className="text-lg font-mono text-emerald-300">{checklist.length}</strong>
            </div>
          </div>
        </div>

        {/* Visit Selector Pills */}
        <div className="flex flex-wrap gap-3 border-b border-neutral-200 pb-3">
          {visits.map(v => {
            const isSelected = selectedVisit?.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVisitId(v.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-[#142B3A] text-white shadow-sm' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{v.visitReference}: {v.organizationName}</span>
                <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold uppercase ${
                  v.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                  v.status === 'SUBMITTED_FOR_REVIEW' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {v.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Inspection Checklist Screen */}
        {selectedVisit ? (
          <form onSubmit={handleSubmitInspection} className="space-y-6">
            
            {/* Visit Details Header */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Facility Site</span>
                <strong className="text-sm font-bold text-[#142B3A]">{selectedVisit.siteName}</strong>
                <span className="text-[11px] text-neutral-500 block truncate">{selectedVisit.siteAddress}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Audit Scope</span>
                <strong className="text-sm font-bold text-neutral-900">{selectedVisit.visitType.replace(/_/g, ' ')}</strong>
                <span className="text-[11px] text-[#547565] block">{selectedVisit.standardsScope.join(' · ')}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Inspection Date</span>
                <span className="text-neutral-800 font-medium block">
                  {new Date(selectedVisit.scheduledDate).toLocaleDateString()}
                </span>
                <span className="text-[11px] text-neutral-500 block">Status: {selectedVisit.status}</span>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  onClick={handleDownloadReportPDF}
                  disabled={isGeneratingPDF}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#142B3A] bg-[#F5E4B5] hover:bg-[#ffeec2] rounded-lg transition-colors shadow-xs"
                >
                  {isGeneratingPDF ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>Export Report PDF</span>
                </button>
              </div>
            </div>

            {/* Client Rep & Time log */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Client Representative(s) Present on Site
                </label>
                <input
                  type="text"
                  value={clientRep}
                  onChange={e => setClientRep(e.target.value)}
                  placeholder="e.g. Sunil Mehta (QA Director), Anand Joshi (Shift Lead)"
                  className="w-full px-3 py-2 border rounded-lg bg-neutral-50 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Inspection Time Window
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    defaultValue={selectedVisit.startTime || '09:00'}
                    className="px-2 py-2 border rounded-lg text-xs"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    defaultValue={selectedVisit.endTime || '17:30'}
                    className="px-2 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="p-5 bg-[#F8F8F5] border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                    Digital Inspection Checklist & Non-Conformity Findings
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Evaluate compliance with standard requirements and document findings for CAPA generation.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-1 bg-red-100 text-red-800 rounded font-bold">
                    Non-Compliant: {checklist.filter(c => c.response === 'NON_COMPLIANT').length}
                  </span>
                  <span className="text-xs font-mono px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-bold">
                    Compliant: {checklist.filter(c => c.response === 'COMPLIANT').length}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-neutral-100 p-2">
                {checklist.map((item, idx) => (
                  <div key={item.id} className="p-5 space-y-3 hover:bg-neutral-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#547565]">
                          {item.section}
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                          {idx + 1}. {item.question}
                        </h4>
                      </div>

                      {/* Response Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuestionResponse(item.id, 'COMPLIANT')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                            item.response === 'COMPLIANT'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                        >
                          Compliant
                        </button>
                        <button
                          type="button"
                          onClick={() => updateQuestionResponse(item.id, 'NON_COMPLIANT', item.severity || 'MAJOR')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                            item.response === 'NON_COMPLIANT'
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                        >
                          Non-Compliant
                        </button>
                        <button
                          type="button"
                          onClick={() => updateQuestionResponse(item.id, 'NOT_APPLICABLE')}
                          className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                            item.response === 'NOT_APPLICABLE'
                              ? 'bg-neutral-700 text-white'
                              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                          }`}
                        >
                          N/A
                        </button>
                      </div>
                    </div>

                    {/* Non-compliance severity and observation box */}
                    {item.response === 'NON_COMPLIANT' && (
                      <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200 space-y-2 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-red-900 text-[11px] uppercase tracking-wider">
                            Severity Level:
                          </span>
                          {(['CRITICAL', 'MAJOR', 'MINOR', 'OBSERVATION'] as FindingSeverity[]).map(sev => (
                            <button
                              key={sev}
                              type="button"
                              onClick={() => updateQuestionResponse(item.id, 'NON_COMPLIANT', sev)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.severity === sev 
                                  ? 'bg-red-700 text-white' 
                                  : 'bg-white text-neutral-700 border border-neutral-300'
                              }`}
                            >
                              {sev}
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                            Auditor Objective Observation & Evidence:
                          </label>
                          <input
                            type="text"
                            value={item.observation || ''}
                            onChange={(e) => updateQuestionResponse(item.id, 'NON_COMPLIANT', item.severity, e.target.value)}
                            placeholder="State exact physical location, machine number, and evidence observed..."
                            className="w-full px-3 py-1.5 border rounded bg-white text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {item.response === 'COMPLIANT' && (
                      <div className="text-xs text-neutral-500 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <input
                          type="text"
                          value={item.observation || ''}
                          onChange={(e) => updateQuestionResponse(item.id, 'COMPLIANT', undefined, e.target.value)}
                          placeholder="Verified evidence reference (e.g. Q4 committee minutes reviewed)..."
                          className="flex-1 px-2.5 py-1 border rounded text-xs bg-neutral-50"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Summary */}
            <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Auditor Executive Summary & Readiness Assessment
              </label>
              <textarea
                rows={3}
                value={summaryNotes}
                onChange={e => setSummaryNotes(e.target.value)}
                placeholder="Summarize overall plant preparedness, major risk areas, and priority recommendations..."
                className="w-full px-3.5 py-2.5 border rounded-lg text-xs leading-relaxed"
              />
            </div>

            {/* Submit Bar */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Submitting updates the visit status to <strong className="font-mono text-neutral-800">SUBMITTED_FOR_REVIEW</strong> for lead audit sign-off.
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inspection For Review</span>
                </button>
              </div>
            </div>

          </form>
        ) : null}

      </div>

    </div>
  );
};
