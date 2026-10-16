import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { ENGAGEMENT_STAGES } from '../../data/initialData';
import { Logo } from '../common/Logo';

interface ProcessPageProps {
  onOpenEnquiry: (service?: string) => void;
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenEnquiry, onNavigate }) => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Our Engagement Methodology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              From first assessment to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                continuous compliance.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Whether you need help with an upcoming audit, a certification requirement, a customer request or everyday food safety, we can support the next practical step.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Stages Deep Breakdown */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {ENGAGEMENT_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs hover:border-emerald-500 hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
            >
              <div className="md:col-span-1 flex justify-start md:justify-center">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062E21] to-[#0E5C3A] text-white border border-emerald-500/40 font-black text-base flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  0{stage.step}
                </span>
              </div>

              <div className="md:col-span-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    STAGE 0{stage.step}
                  </span>
                  <span aria-hidden="true" className="text-emerald-300">·</span>
                  <span className="text-xs font-bold text-neutral-500">
                    {stage.description}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {stage.details}
                </p>
              </div>

              <div className="md:col-span-5 bg-[#F8FAFC] p-5 rounded-2xl border border-emerald-900/10 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Target Outcome & Deliverable
                </span>
                <p className="text-xs font-bold text-[#062E21] leading-snug">
                  {stage.outcome}
                </p>
                <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Defensible evidence for auditor review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flexible Engagement Callout */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#041F16] via-[#062E21] to-[#0A3828] text-white border border-emerald-500/30 shadow-xl shadow-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Logo variant="icon-only" size="sm" className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                A Flexible Engagement Model
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Start with one requirement and expand only where it creates genuine value.
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              You are never locked into an all-or-nothing consulting contract. Many clients begin with a targeted 3-day Gap Assessment or Mock Audit, expanding into full Implementation or Managed Support only after seeing the tangible operational impact.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('Flexible Process Scope')}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Initiate Stage 1: Gap Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
