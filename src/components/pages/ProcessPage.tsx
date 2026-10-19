import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ClipboardList, GraduationCap, Wrench, FileSearch, Users2, SearchCheck, BadgeCheck, RefreshCw } from 'lucide-react';
import { ENGAGEMENT_STAGES } from '../../data/initialData';
import { Logo } from '../common/Logo';

// Direct imports for reliable Vite bundling
import auditImage from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';
import packagingImage from '../../assets/images/packaging_line_audit_1792395423537.jpg';

interface ProcessPageProps {
  onOpenEnquiry: (service?: string) => void;
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<'8STEP' | '6STAGES'>('8STEP');

  const brochureSteps = [
    {
      num: 'Step 01',
      title: 'Gap Analysis',
      icon: ClipboardList,
      phase: 'Baseline Evaluation',
      desc: 'Comprehensive review of existing infrastructure, equipment sanitary design, and SOP documentation against target standard requirements.',
      deliverable: 'Prioritized compliance gap matrix with corrective actions.'
    },
    {
      num: 'Step 02',
      title: 'Training',
      icon: GraduationCap,
      phase: 'Capability Development',
      desc: 'Customized workshops for floor workers, supervisors, and QA teams covering GMP, GHP, CCP monitoring, and hygiene habits.',
      deliverable: 'Competent staff and verifiable training records.'
    },
    {
      num: 'Step 03',
      title: 'Implementation',
      icon: Wrench,
      phase: 'Floor Integration',
      desc: 'Deploying operational controls, cleaning logs, temperature records, allergen segregation, and pest controls into daily workflows.',
      deliverable: 'Embedded daily records with zero paperwork panic.'
    },
    {
      num: 'Step 04',
      title: 'Internal Audit',
      icon: FileSearch,
      phase: 'Verification',
      desc: 'Independent internal audit simulating accredited registrar rigor across all processing shifts and storage facilities.',
      deliverable: 'Internal audit report and root-cause analysis.'
    },
    {
      num: 'Step 05',
      title: 'Management Review',
      icon: Users2,
      phase: 'Governance',
      desc: 'Leadership review of internal audit findings, customer complaints, supplier metrics, and resource allocation.',
      deliverable: 'Signed management review minutes & continuous improvement plan.'
    },
    {
      num: 'Step 06',
      title: 'Audit By Registrar',
      icon: SearchCheck,
      phase: 'External Inspection',
      desc: 'Third-party assessment by independent accredited certification body. ESSOR provides on-site technical defense and audit support.',
      deliverable: 'Confident audit facilitation with minimal findings.'
    },
    {
      num: 'Step 07',
      title: 'Certificate Achieved',
      icon: BadgeCheck,
      phase: 'Milestone',
      desc: 'Rapid 48-hour closure of any non-conformities leading to official accredited certificate issuance.',
      deliverable: 'Accredited certificate issued for client commercial use.'
    },
    {
      num: 'Step 08',
      title: 'Regular Surveillance',
      icon: RefreshCw,
      phase: 'Continuous Compliance',
      desc: 'Ongoing monthly check-ins, unannounced mock audits, and annual surveillance audit preparation to keep standards active.',
      deliverable: 'Year-round audit readiness with zero pre-audit stress.'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAF9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>Simplified Certification Methodology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Simplified Process to Achieve{' '}
              <span className="text-[#3E7D25]">
                Food Safety Certification.
              </span>
            </h1>
            <p className="text-xs font-black tracking-widest uppercase text-neutral-900">
              SIMPLIFYING COMPLIANCE. STRENGTHENING FOOD SAFETY. BUILDING TRUST.
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Our audit-support expertise helps organizations prepare systematically for certification and surveillance audits through comprehensive gap assessments, mock audits, documentation reviews, and corrective action guidance.
            </p>
          </div>

          {/* Toggle between 8-Step Lifecycle (Brochure Page 3) and Detailed Engagement Stages */}
          <div className="mt-8 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('8STEP')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === '8STEP'
                  ? 'bg-[#012B53] text-white shadow-sm'
                  : 'bg-[#F8FAF9] text-neutral-700 border border-neutral-200 hover:border-[#3E7D25]'
              }`}
            >
              8-Step Certification Cycle (Brochure Page 3)
            </button>
            <button
              onClick={() => setActiveTab('6STAGES')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === '6STAGES'
                  ? 'bg-[#012B53] text-white shadow-sm'
                  : 'bg-[#F8FAF9] text-neutral-700 border border-neutral-200 hover:border-[#3E7D25]'
              }`}
            >
              Detailed Field Engagement Stages
            </button>
          </div>
        </div>
      </section>

      {/* Main Process Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {activeTab === '8STEP' ? (
          /* 8-Step Brochure Flow */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brochureSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-[#3E7D25] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#3E7D25] border border-emerald-200">
                          {step.num}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center group-hover:bg-[#3E7D25] group-hover:text-white transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                          {step.phase}
                        </span>
                        <h3 className="text-lg font-bold text-neutral-900 mt-0.5 group-hover:text-[#3E7D25] transition-colors">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-neutral-100 text-xs text-neutral-700">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7D25] shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-tight">{step.deliverable}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* 6 Stages Deep Breakdown */
          <div className="space-y-6">
            {ENGAGEMENT_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-[#3E7D25] hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
              >
                <div className="md:col-span-1 flex justify-start md:justify-center">
                  <span className="w-12 h-12 rounded-xl bg-[#012B53] text-white font-black text-base flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#3E7D25] transition-colors">
                    0{stage.step}
                  </span>
                </div>

                <div className="md:col-span-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#3E7D25] px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      STAGE 0{stage.step}
                    </span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-xs font-bold text-neutral-500">
                      {stage.description}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {stage.details}
                  </p>
                </div>

                <div className="md:col-span-5 bg-[#F8FAF9] p-5 rounded-2xl border border-neutral-200 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3E7D25] block">
                    Target Outcome &amp; Deliverable
                  </span>
                  <p className="text-xs font-bold text-neutral-900 leading-snug">
                    {stage.outcome}
                  </p>
                  <div className="pt-2 text-[11px] text-[#3E7D25] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3E7D25] shrink-0" />
                    <span>Defensible evidence for auditor review</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visual Callout with Packaging & Audit Photos */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#051F14] text-white border border-emerald-500/30 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <Logo variant="icon-only" size="sm" className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#A4D65E]">
                Flexible Engagement Model
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Start with one requirement and expand only where it creates genuine value.
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              You are never locked into an all-or-nothing consulting contract. Many food processors begin with a targeted 2-day Gap Assessment, expanding into full implementation or annual surveillance support once they experience our practical floor results.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry('Gap Assessment')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#3E7D25] hover:bg-[#256629] active:scale-[0.98] rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Initiate Step 1: Gap Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 rounded-xl overflow-hidden shadow-lg border border-white/20">
            <img
              src={auditImage}
              alt="Auditor on factory floor conducting gap review"
              className="w-full h-56 object-cover"
            />
          </div>
        </div>

      </section>

    </div>
  );
};
