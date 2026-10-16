import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { ServiceItem } from '../../types';
import { STANDARDS_BADGES } from '../../data/initialData';

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
    <div className="w-full bg-[#fafbf9]">
      
      {/* Services Header */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              ESSOR Service Portfolio
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
              Support for every stage of your compliance journey
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Choose the support you need today—from a focused audit-readiness assignment to ongoing food-safety support and team development.
            </p>
          </div>
        </div>
      </section>

      {/* Distinction & Advisory Boundary Notice */}
      <section className="py-6 bg-[#F4F6F3] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3.5 p-4 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-600">
            <ShieldCheck className="w-5 h-5 text-[#547565] shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 font-semibold block mb-0.5">
                Our Advisory Scope & Professional Boundaries:
              </strong>
              ESSOR Compliance Solutions provides preparatory gap assessments, implementation coaching, mock audits, and managed compliance routines. We do not issue formal certification certificates or conduct official certification audits; official third-party certification is awarded exclusively by independent accredited certification bodies.
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs hover:border-[#142B3A] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#547565]">
                    SERVICE 0{idx + 1}
                  </span>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    {srv.category.replace('_', ' ')}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#142B3A]">
                  {srv.title}
                </h2>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {srv.fullDescription}
                </p>

                {srv.applicableStandards && srv.applicableStandards.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Applicable Standards / Frameworks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.applicableStandards.map(std => (
                        <span key={std} className="px-2.5 py-1 text-xs font-bold text-[#142B3A] bg-neutral-100 rounded">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 bg-[#FAFAFA] p-6 rounded-lg border border-neutral-200/80 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Core Deliverables & Outcomes
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {srv.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="text-xs text-neutral-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#547565] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      if (srv.slug === 'training-capability') onNavigate('/training');
                      else if (srv.slug === 'digital-compliance') onNavigate('/digital-compliance');
                      else onNavigate(`/services/${srv.slug}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142B3A] hover:text-[#547565] transition-colors"
                  >
                    <span>Detailed Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(srv.slug)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors"
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
        <div className="mt-16 p-8 rounded-xl bg-[#142B3A] text-white">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D9B76A]">
              Our Operating Principle
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              We adapt the scope to your current system, your people and the requirement you need to meet.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
              No two food plants share identical processing risks, equipment age, or team maturity. We tailor our consulting intensity and documentation depth to solve your immediate compliance challenges without creating unnecessary administrative drag.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#142B3A] bg-[#F5E4B5] hover:bg-[#ffeec2] rounded-lg transition-colors"
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
