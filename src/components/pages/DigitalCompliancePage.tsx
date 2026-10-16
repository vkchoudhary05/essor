import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckSquare, 
  Search, 
  AlertCircle, 
  Bell, 
  FolderCheck, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Database,
  Sparkles
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface DigitalCompliancePageProps {
  onOpenEnquiry: (service?: string) => void;
  onNavigate: (path: string) => void;
}

export const DigitalCompliancePage: React.FC<DigitalCompliancePageProps> = ({
  onOpenEnquiry,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'INTERACTIVE_PREVIEW' | 'ARCHITECTURE'>('OVERVIEW');
  
  // Interactive inspection simulator state
  const [demoChecks, setDemoChecks] = useState([
    { id: 1, label: 'Handwashing hygiene station soap & sanitiser dispensers filled', passed: true, note: 'Dispenser checked at Shift A start' },
    { id: 2, label: 'Cold storage blast freezer temp reading within target (≤ -18°C)', passed: true, note: 'Current reading: -19.4°C calibrated' },
    { id: 3, label: 'Conveyor 3 foreign material detection reject mechanism verified', passed: false, note: 'Piston test failed on 1.5mm stainless test piece. Maintenance flagged' },
    { id: 4, label: 'Allergen rework segregation color-coded containers sealed & labeled', passed: true, note: 'Yellow allergen tags verified' }
  ]);

  const toggleCheck = (id: number) => {
    setDemoChecks(prev => prev.map(c => c.id === id ? { ...c, passed: !c.passed } : c));
  };

  const modules = [
    {
      title: 'Compliance Dashboard',
      description: 'Visibility of actions, audits, documents, CAPA and key indicators.',
      icon: BarChart3,
      features: ['Real-time audit countdown', 'Open CAPA aging matrix', 'Management review agenda sync', 'Action item assignees & status']
    },
    {
      title: 'Digital Inspections',
      description: 'Record GMP observations, owners, due dates, evidence and actions.',
      icon: CheckSquare,
      features: ['Mobile shift walk checklist', 'Photo proof attachment', 'Automated maintenance tickets', 'Non-conformance logging']
    },
    {
      title: 'Knowledge Assistant',
      description: 'Quick access to approved internal food-safety documents and procedures.',
      icon: Search,
      features: ['Indexed SOP repository', 'Critical control limit lookup', 'Version controlled manuals', 'Strict human-verified sources']
    },
    {
      title: 'Complaint Workflow',
      description: 'Track intake, investigation, RCA, CAPA, verification and closure.',
      icon: AlertCircle,
      features: ['Customer complaint logging', '5-Whys investigation capture', 'Traceability batch association', 'Closure verification records']
    },
    {
      title: 'Regulatory Awareness',
      description: 'Surface relevant changes and actions requiring review.',
      icon: Bell,
      features: ['FSSAI gazette monitoring', 'Export market updates (EU/FDA)', 'Labeling statutory alerts', 'Risk impact assessment']
    },
    {
      title: 'Audit Document Readiness',
      description: 'Support checklists, document readiness and evidence workflows.',
      icon: FolderCheck,
      features: ['Master document index', 'Calibration record repository', 'Pest control logs archive', 'One-click auditor binder package']
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Digital Compliance Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              Make compliance easier to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                manage and verify.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Digital tools can help your team organize evidence, track actions and maintain visibility across everyday food-safety activities.
            </p>
          </div>

          {/* Tab selector */}
          <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 rounded-xl max-w-md">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'OVERVIEW' ? 'bg-[#062E21] text-white shadow-xs' : 'text-neutral-600 hover:text-[#062E21]'
              }`}
            >
              Core Modules
            </button>
            <button
              onClick={() => setActiveTab('INTERACTIVE_PREVIEW')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'INTERACTIVE_PREVIEW' ? 'bg-[#062E21] text-white shadow-xs' : 'text-neutral-600 hover:text-[#062E21]'
              }`}
            >
              Interactive Simulator
            </button>
            <button
              onClick={() => setActiveTab('ARCHITECTURE')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'ARCHITECTURE' ? 'bg-[#062E21] text-white shadow-xs' : 'text-neutral-600 hover:text-[#062E21]'
              }`}
            >
              Security Architecture
            </button>
          </div>
        </div>
      </section>

      {/* Purpose Callout Box */}
      <section className="py-6 bg-[#F8FAFC] border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-white border border-emerald-900/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                The Guiding Principle
              </span>
              <p className="text-sm font-bold text-[#062E21]">
                "Technology supports your people by making compliance work more visible and organized; it does not replace responsible food-safety decisions."
              </p>
            </div>
            <button
              onClick={() => onOpenEnquiry('Digital Compliance Early Access')}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 shrink-0 cursor-pointer"
            >
              Inquire About Digital Tools
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-emerald-900/10 shadow-xs hover:border-emerald-500 hover:shadow-xl transition-all duration-300 space-y-4 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062E21] to-[#0E5C3A] text-white border border-emerald-500/40 flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 text-emerald-300" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-normal">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                      Key Highlights
                    </span>
                    <ul className="space-y-1.5">
                      {mod.features.map((f, fIdx) => (
                        <li key={fIdx} className="text-xs text-neutral-700 flex items-center gap-2 font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xl bg-white group">
            <img
              src="/src/assets/images/digital_compliance_dashboard_preview_1791962116109.jpg"
              alt="Quality assurance tablet application used on food line"
              referrerPolicy="no-referrer"
              className="w-full max-h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE WALKTHROUGH */}
      {activeTab === 'INTERACTIVE_PREVIEW' && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Interactive GMP Walk Inspector */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-900/10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    Live Interactive Simulation
                  </span>
                  <h3 className="text-lg font-bold text-[#062E21]">
                    Digital Daily Hygiene & GMP Walk Inspection
                  </h3>
                </div>
                <div className="text-xs font-mono px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-bold">
                  LINE: BAKING 02
                </div>
              </div>

              <p className="text-xs text-neutral-600 font-normal">
                Click any checklist row to toggle pass/fail status and see how instant evidence capture tracks corrective action triggers:
              </p>

              <div className="space-y-3">
                {demoChecks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      item.passed 
                        ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400' 
                        : 'bg-rose-50/60 border-rose-200 hover:border-rose-400'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.passed ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        <span className="text-xs font-bold text-[#062E21]">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 pl-4 font-normal">{item.note}</p>
                    </div>

                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider shrink-0 ${
                      item.passed 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : 'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}>
                      {item.passed ? 'Compliant' : 'Action Required'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-emerald-900/10 flex items-center justify-between text-xs">
                <span className="text-neutral-700 font-medium">
                  Passing Items: <strong className="font-mono text-[#062E21]">{demoChecks.filter(c => c.passed).length} / {demoChecks.length}</strong>
                </span>
                <span className="text-neutral-500 font-normal">
                  Simulated Inspector: Shift Lead Quality (Demo)
                </span>
              </div>
            </div>

            {/* Side summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#062E21] uppercase tracking-wider flex items-center gap-2">
                  <Logo variant="icon-only" size="sm" className="w-4 h-4" />
                  <span>How Digital Records Protect Your Plant</span>
                </h4>
                <div className="space-y-3 text-xs text-neutral-600 leading-relaxed font-normal">
                  <p>
                    Paper logs frequently suffer from missing signatures, post-dated entries, water splashes, and misplaced clipboards during crunch times.
                  </p>
                  <p>
                    By transitioning routine checks into structured digital inspection entries, shift supervisors create timestamped, verifiable audit trails that satisfy certification bodies under ISO 22000 and BRCGS requirements.
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-900/10">
                  <button
                    onClick={() => onOpenEnquiry('Digital Inspection Demo')}
                    className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 text-center cursor-pointer"
                  >
                    Request Facility Pilot
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* TAB 3: ARCHITECTURE & DATA INTEGRITY */}
      {activeTab === 'ARCHITECTURE' && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-emerald-900/10 shadow-xs space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Platform Readiness & Engineering
              </span>
              <h3 className="text-2xl font-bold text-[#062E21]">
                Multi-Tenant Isolation & Defensible Data Architecture
              </h3>
              <p className="text-sm text-neutral-600 font-normal">
                Designed to comply with international client confidentiality agreements, data segregation protocols, and regulatory record retention mandates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl border border-emerald-900/10 bg-[#F8FAFC] space-y-3">
                <Lock className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-[#062E21]">Tenant-Level Data Isolation</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Every client organization's audit findings, HACCP plans, and corrective actions are isolated through strict organizational boundaries. No cross-tenant leakage.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-900/10 bg-[#F8FAFC] space-y-3">
                <Database className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-[#062E21]">Immutable Audit Trail</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Every status transition, CAPA approval, and procedure revision is recorded with UTC timestamp, author identity, and prior values.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-900/10 bg-[#F8FAFC] space-y-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
                <h4 className="text-sm font-bold text-[#062E21]">Strict Source Traceability</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Knowledge retrieval is anchored exclusively to approved company standard operating procedures and verified statutory gazettes—preventing hallucinated compliance answers.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-emerald-900/10 text-xs text-neutral-700 flex items-center justify-between flex-wrap gap-4">
              <span className="font-medium">Looking to pilot ESSOR digital compliance support in your food operations?</span>
              <button
                onClick={() => onOpenEnquiry('Digital Compliance Enterprise Pilot')}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer"
              >
                Schedule Technical Architecture Call
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
