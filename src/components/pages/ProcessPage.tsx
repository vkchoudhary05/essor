import React from 'react';
import { ArrowRight, Compass, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { ENGAGEMENT_STAGES } from '../../data/initialData';

interface ProcessPageProps {
  onOpenEnquiry: (service?: string) => void;
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenEnquiry, onNavigate }) => {
  return (
    <div className="w-full bg-[#fafbf9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              Our Engagement Methodology
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
              From first assessment to continuous compliance
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Whether you need help with an upcoming audit, a certification requirement, a customer request or everyday food safety, we can support the next practical step.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Stages Deep Breakdown */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {ENGAGEMENT_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs hover:border-[#142B3A] transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-1 flex justify-start md:justify-center">
                <span className="w-12 h-12 rounded-full bg-[#142B3A] text-[#F5E4B5] font-extrabold text-base flex items-center justify-center shrink-0">
                  0{stage.step}
                </span>
              </div>

              <div className="md:col-span-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
                    Stage 0{stage.step}
                  </span>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span className="text-xs font-medium text-neutral-500">
                    {stage.description}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#142B3A]">
                  {stage.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {stage.details}
                </p>
              </div>

              <div className="md:col-span-5 bg-[#F8F8F5] p-5 rounded-lg border border-neutral-200/80 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Target Outcome & Deliverable
                </span>
                <p className="text-xs font-semibold text-neutral-900 leading-snug">
                  {stage.outcome}
                </p>
                <div className="pt-2 text-[11px] text-[#547565] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Defensible evidence for auditor review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flexible Engagement Callout from Brochure Page 8 */}
        <div className="mt-14 p-8 rounded-xl bg-white border border-neutral-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#547565]">
              A Flexible Engagement Model
            </span>
            <h4 className="text-xl font-bold text-[#142B3A]">
              Start with one requirement and expand only where it creates genuine value.
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              You are never locked into an all-or-nothing consulting contract. Many clients begin with a targeted 3-day Gap Assessment or Mock Audit, expanding into full Implementation or Managed Support only after seeing the tangible operational impact.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('Flexible Process Scope')}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Initiate Stage 1: Gap Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
