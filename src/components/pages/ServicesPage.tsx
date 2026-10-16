import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Logo } from '../common/Logo';

interface ServicesPageProps {
  services: ServiceItem[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onNavigate,
  onOpenEnquiry
}) => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Services Header */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ESSOR Service Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              Support for every stage of your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                compliance journey.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Choose the support you need today—from a focused audit-readiness assignment to ongoing food-safety advisory, laboratory verification, and team development.
            </p>
          </div>
        </div>
      </section>

      {/* Distinction & Advisory Boundary Notice */}
      <section className="py-6 bg-[#F8FAFC] border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-emerald-900/10 text-xs text-neutral-700 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#062E21] font-bold block mb-0.5">
                Our Advisory Scope & Professional Boundaries:
              </strong>
              ESSOR Compliance Solutions provides preparatory gap assessments, implementation coaching, mock audits, and managed compliance routines. We do not issue formal certification certificates or conduct official certification audits; official third-party certification is awarded exclusively by independent accredited certification bodies.
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs hover:border-emerald-500 hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    SERVICE 0{idx + 1}
                  </span>
                  <span aria-hidden="true" className="text-emerald-300">·</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {srv.category.replace('_', ' ')}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
                  {srv.title}
                </h2>

                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {srv.fullDescription}
                </p>

                {srv.applicableStandards && srv.applicableStandards.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-neutral-700 block mb-1.5 uppercase tracking-wider">
                      Applicable Frameworks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.applicableStandards.map(std => (
                        <span key={std} className="px-2.5 py-1 text-xs font-bold text-[#062E21] bg-emerald-50/70 border border-emerald-200 rounded-lg">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 bg-[#F8FAFC] p-6 rounded-2xl border border-emerald-900/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Core Deliverables & Outcomes</span>
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {srv.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="text-xs text-neutral-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-emerald-900/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      if (srv.slug === 'training-capability') onNavigate('/training');
                      else if (srv.slug === 'digital-compliance') onNavigate('/digital-compliance');
                      else onNavigate(`/services/${srv.slug}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#062E21] hover:text-emerald-700 transition-colors cursor-pointer group"
                  >
                    <span>Detailed Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(srv.slug)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adaptive Scope Callout */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#041F16] via-[#062E21] to-[#0A3828] text-white border border-emerald-500/30 shadow-xl shadow-emerald-950/20">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <Logo variant="icon-only" size="sm" className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Our Operating Principle
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              We adapt the scope to your current system, your people and the requirement you need to meet.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1 font-normal">
              No two food plants share identical processing risks, equipment age, or team maturity. We tailor our consulting intensity and documentation depth to solve your immediate compliance challenges without creating unnecessary administrative drag.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 cursor-pointer"
              >
                <span>Discuss Tailored Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
