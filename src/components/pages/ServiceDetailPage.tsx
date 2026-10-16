import React from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Logo } from '../common/Logo';

interface ServiceDetailPageProps {
  slug: string;
  service?: ServiceItem;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (serviceSlug?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  service,
  onNavigate,
  onOpenEnquiry
}) => {
  if (!service) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-[#062E21]">Service Not Found</h2>
        <p className="text-xs text-neutral-600">The requested service category could not be located in our active service catalogue.</p>
        <button
          onClick={() => onNavigate('/services')}
          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] rounded-xl shadow-md cursor-pointer"
        >
          Return to Services
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Top Breadcrumb & Header */}
      <section className="py-14 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-emerald-700 mb-6 transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Services</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{service.category.replace('_', ' ')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Scope & Deliverables */}
          <div className="lg:col-span-8 space-y-10">
            
            <div className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-6">
              <div className="flex items-center gap-2">
                <Logo variant="icon-only" size="sm" className="w-5 h-5" />
                <h2 className="text-xl font-bold text-[#062E21]">
                  Deliverables & Practical Outcomes
                </h2>
              </div>
              <p className="text-sm text-neutral-600 font-normal">
                Our engagement produces verified operational evidence and permanent organizational capability:
              </p>

              <div className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-emerald-900/10 hover:border-emerald-500 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-[#062E21] block">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicable Standards & Protocols */}
            {service.applicableStandards && service.applicableStandards.length > 0 && (
              <div className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#062E21]">
                  Covered Standards & Global Schemes
                </h3>
                <p className="text-xs text-neutral-600 font-normal">
                  We support organizations seeking audit-readiness across the following recognised benchmarks:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.applicableStandards.map(std => (
                    <span key={std} className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#062E21]">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Advisory Boundary Reminder */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-[#062E21] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <h4 className="font-bold uppercase tracking-wider text-emerald-900">
                  Notice on Certification Decisions
                </h4>
              </div>
              <p className="leading-relaxed text-neutral-700 font-normal">
                ESSOR provides independent consulting, gap assessments, internal audit training, and technical advisory services. We do not issue formal certification credentials or perform accredited certification audits. Third-party certifications are granted solely by independent accredited certification bodies following their official assessment protocols.
              </p>
            </div>
          </div>

          {/* Right Column: CTA card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 sm:p-7 rounded-2xl bg-white border border-emerald-900/10 shadow-xl space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Consulting Engagement</span>
              </div>
              <h3 className="text-xl font-bold text-[#062E21]">
                Request a Scoping Review
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Share your manufacturing plant profile and audit timeline with our lead food-safety specialists to receive a customized assignment proposal.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onOpenEnquiry(service.slug)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer"
                >
                  <span>Discuss Your Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('/our-process')}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#062E21] hover:text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-900/10 rounded-xl transition-all text-center cursor-pointer"
                >
                  View 6-Stage Process
                </button>
              </div>

              <div className="pt-4 border-t border-emerald-900/10 text-[11px] text-neutral-600 space-y-1.5 font-medium">
                <div className="flex items-center gap-1.5 text-emerald-800">✓ Tailored to factory shift schedules</div>
                <div className="flex items-center gap-1.5 text-emerald-800">✓ Pragmatic evidence-based deliverables</div>
                <div className="flex items-center gap-1.5 text-emerald-800">✓ Direct Lead Auditor guidance</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
