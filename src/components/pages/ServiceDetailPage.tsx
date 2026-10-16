import React from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ShieldCheck, FileCheck, Layers, AlertCircle } from 'lucide-react';
import { ServiceItem } from '../../types';

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
        <h2 className="text-xl font-bold text-neutral-900">Service Not Found</h2>
        <p className="text-xs text-neutral-600">The requested service category could not be located in our active service catalogue.</p>
        <button
          onClick={() => onNavigate('/services')}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] rounded-lg"
        >
          Return to Services
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafbf9]">
      
      {/* Top Breadcrumb & Header */}
      <section className="py-14 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#142B3A] mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              {service.category.replace('_', ' ')}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
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
            
            <div className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#142B3A]">
                Deliverables & Practical Outcomes
              </h2>
              <p className="text-sm text-neutral-600">
                Our engagement produces verified operational evidence and permanent organizational capability:
              </p>

              <div className="space-y-4">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                    <CheckCircle2 className="w-5 h-5 text-[#547565] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-neutral-900 block">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicable Standards & Protocols */}
            {service.applicableStandards && service.applicableStandards.length > 0 && (
              <div className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#142B3A]">
                  Covered Standards & Global Schemes
                </h3>
                <p className="text-xs text-neutral-600">
                  We support organizations seeking audit-readiness across the following recognised benchmarks:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.applicableStandards.map(std => (
                    <span key={std} className="px-3 py-1.5 rounded-md bg-[#F4F6F3] border border-neutral-200 text-xs font-bold text-[#142B3A]">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Advisory Boundary Reminder */}
            <div className="p-6 rounded-xl bg-[#FAF0D7] border border-[#E8D49F] text-xs text-neutral-800 space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#9B7527]">
                Notice on Certification Decisions
              </h4>
              <p className="leading-relaxed">
                ESSOR provides independent consulting, gap assessments, internal audit training, and technical advisory services. We do not issue formal certification credentials or perform accredited certification audits. Third-party certifications are granted solely by independent accredited certification bodies following their official assessment protocols.
              </p>
            </div>
          </div>

          {/* Right Column: CTA card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 rounded-xl bg-white border border-neutral-200 shadow-md space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
                Consulting Engagement
              </span>
              <h3 className="text-xl font-bold text-[#142B3A]">
                Request a Scoping Review
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Share your manufacturing plant profile and audit timeline with our lead food-safety specialists to receive a customized assignment proposal.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onOpenEnquiry(service.slug)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shadow-sm"
                >
                  <span>Discuss Your Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('/our-process')}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-center"
                >
                  View 6-Stage Process
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 space-y-1">
                <div>✓ Tailored to factory shift schedules</div>
                <div>✓ Pragmatic evidence-based deliverables</div>
                <div>✓ Direct Lead Auditor guidance</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
