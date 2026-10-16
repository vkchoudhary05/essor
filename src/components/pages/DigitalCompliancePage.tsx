import React, { useState } from 'react';
import { 
  Cpu, 
  BarChart3, 
  CheckSquare, 
  Search, 
  AlertCircle, 
  Bell, 
  FolderCheck, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  Lock, 
  Database,
  Sparkles,
  RefreshCw
} from 'lucide-react';

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
    <div className="w-full bg-[#fafbf9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              Digital Compliance Support
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
              Make compliance easier to manage
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Digital tools can help your team organize evidence, track actions and maintain visibility across everyday food-safety activities.
            </p>
          </div>

          {/* Tab selector */}
          <div className="mt-8 flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg max-w-md">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'OVERVIEW' ? 'bg-white text-[#142B3A] shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Core Capabilities
            </button>
            <button
              onClick={() => setActiveTab('INTERACTIVE_PREVIEW')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'INTERACTIVE_PREVIEW' ? 'bg-white text-[#142B3A] shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Interactive Walkthrough
            </button>
            <button
              onClick={() => setActiveTab('ARCHITECTURE')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'ARCHITECTURE' ? 'bg-white text-[#142B3A] shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Architecture & Security
            </button>
          </div>
        </div>
      </section>

      {/* Purpose Callout Box (Verbatim from Brochure Page 7) */}
      <section className="py-6 bg-[#F4F6F3] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#547565]">
                The Guiding Purpose
              </span>
              <p className="text-sm font-semibold text-[#142B3A]">
                "Technology supports your people by making compliance work more visible and organized; it does not replace responsible food-safety decisions."
              </p>
            </div>
            <button
              onClick={() => onOpenEnquiry('Digital Compliance Early Access')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shrink-0"
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
                  className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs hover:border-[#142B3A] transition-all space-y-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0e271d] text-[#F5E4B5] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#142B3A]">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                      Key Highlights
                    </span>
                    <ul className="space-y-1.5">
                      {mod.features.map((f, fIdx) => (
                        <li key={fIdx} className="text-xs text-neutral-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#547565] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
            <img
              src="/src/assets/images/digital_compliance_dashboard_preview_1791962116109.jpg"
              alt="Quality assurance tablet application used on food line"
              referrerPolicy="no-referrer"
              className="w-full max-h-96 object-cover"
            />
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE WALKTHROUGH */}
      {activeTab === 'INTERACTIVE_PREVIEW' && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Interactive GMP Walk Inspector */}
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#547565]">
                    Live Interactive Simulation
                  </span>
                  <h3 className="text-lg font-bold text-[#142B3A]">
                    Digital Daily Hygiene & GMP Walk Inspection
                  </h3>
                </div>
                <div className="text-xs font-mono px-2 py-1 bg-neutral-100 rounded text-neutral-600">
                  LINE: BAKING 02
                </div>
              </div>

              <p className="text-xs text-neutral-600">
                Click any checklist row to toggle pass/fail status and see how instant evidence capture tracks corrective action triggers:
              </p>

              <div className="space-y-3">
                {demoChecks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      item.passed 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : 'bg-amber-50/60 border-amber-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.passed ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                        <span className="text-xs font-semibold text-neutral-900">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 pl-4">{item.note}</p>
                    </div>

                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded uppercase tracking-wider shrink-0 ${
                      item.passed 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.passed ? 'Compliant' : 'Action Required'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                <span className="text-neutral-600">
                  Passing Items: <strong className="font-mono text-neutral-900">{demoChecks.filter(c => c.passed).length} / {demoChecks.length}</strong>
                </span>
                <span className="text-neutral-500">
                  Simulated Inspector: Shift Lead Quality (Demo)
                </span>
              </div>
            </div>

            {/* Side summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#142B3A] uppercase tracking-wider">
                  How Digital Records Protect Your Plant
                </h4>
                <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                  <p>
                    Paper logs frequently suffer from missing signatures, post-dated entries, water splashes, and misplaced clipboards during crunch times.
                  </p>
                  <p>
                    By transitioning routine checks into structured digital inspection entries, shift supervisors create timestamped, verifiable audit trails that satisfy certification bodies under ISO 22000 and BRCGS requirements.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onOpenEnquiry('Digital Inspection Demo')}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors text-center"
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
          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-xs space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
                Platform Readiness & Engineering
              </span>
              <h3 className="text-2xl font-bold text-[#142B3A]">
                Multi-Tenant Isolation & Defensible Data Architecture
              </h3>
              <p className="text-sm text-neutral-600">
                Designed to comply with international client confidentiality agreements, data segregation protocols, and regulatory record retention mandates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
                <Lock className="w-6 h-6 text-[#142B3A]" />
                <h4 className="text-sm font-bold text-neutral-900">Tenant-Level Data Isolation</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every client organization's audit findings, HACCP plans, and corrective actions are isolated through strict organizational boundaries. No cross-tenant leakage.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
                <Database className="w-6 h-6 text-[#547565]" />
                <h4 className="text-sm font-bold text-neutral-900">Immutable Audit Trail</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every status transition, CAPA approval, and procedure revision is recorded with UTC timestamp, author identity, and prior values.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#9B7527]" />
                <h4 className="text-sm font-bold text-neutral-900">Strict Source Traceability</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Knowledge retrieval is anchored exclusively to approved company standard operating procedures and verified statutory gazettes—preventing hallucinated compliance answers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#F8F8F5] border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between flex-wrap gap-3">
              <span>Looking to pilot ESSOR digital compliance support in your food operations?</span>
              <button
                onClick={() => onOpenEnquiry('Digital Compliance Enterprise Pilot')}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#142B3A] bg-[#F5E4B5] hover:bg-[#ffeec2] rounded-lg"
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
