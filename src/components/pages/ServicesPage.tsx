import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, CheckCircle2, Sparkles, Layers, Award, FileSearch, GraduationCap } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Logo } from '../common/Logo';

// Direct imports for reliable Vite bundling
import auditImg from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';
import packagingImg from '../../assets/images/packaging_line_audit_1792395423537.jpg';
import labImg from '../../assets/images/food_factory_lab_testing_1791965811882.jpg';
import produceImg from '../../assets/images/fresh_produce_inspection_1792395403170.jpg';
import trainingImg from '../../assets/images/corporate_training_seminar_1792395440966.jpg';
import kitchenImg from '../../assets/images/kitchen_hygiene_audit_1792394924443.jpg';

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
  const servicePhotos: Record<number, string> = {
    0: auditImg,
    1: packagingImg,
    2: trainingImg,
    3: labImg,
    4: produceImg,
    5: kitchenImg
  };

  const auditTypes = [
    {
      name: 'Gap Audit',
      desc: 'Identifies gaps between existing management systems and applicable standard requirements, providing a clear roadmap for compliance and certification readiness.'
    },
    {
      name: 'Internal Audit',
      desc: 'Evaluates the effectiveness of management systems, verifies conformity with requirements, and identifies opportunities for improvement prior to external audits.'
    },
    {
      name: 'Process Audit',
      desc: 'Intense focus on selected manufacturing processes from top to bottom, reviewing all critical control points, CCP limits, and parameters.'
    },
    {
      name: 'Product Audit',
      desc: 'Evaluates actual product, parts, or food components against specifications, client requirements, and regulatory criteria.'
    },
    {
      name: 'Supplier / Vendor Audit',
      desc: 'Verifies physically on-site at supplier premises that they comply with quality, environmental, food safety, and on-time delivery criteria.'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAF9]">
      
      {/* Services Header */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>ESSOR Service Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Support For Every Stage Of Your{' '}
              <span className="text-[#3E7D25]">
                Compliance Journey.
              </span>
            </h1>
            <p className="text-xs font-black tracking-widest uppercase text-neutral-900">
              SIMPLIFYING COMPLIANCE. STRENGTHENING FOOD SAFETY. BUILDING TRUST.
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              From focused audit-readiness and pre-inspection gap evaluations to daily factory floor hygiene checks, accredited corporate training, and digital compliance management.
            </p>
          </div>

          {/* 3 Core Pillars from Page 4 of Brochure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
            <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-neutral-200 flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#012B53] text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#A4D65E]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">1. Food Safety Certifications</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  ISO 22000, FSSC 22000, BRCGS, HACCP, GMP, Halal, Kosher, and Non-GMO readiness.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-neutral-200 flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#012B53] text-white flex items-center justify-center shrink-0">
                <FileSearch className="w-5 h-5 text-[#A4D65E]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">2. Auditing Services</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  First-party internal, second-party supplier, process, and gap assessments with rapid CAPA closure.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-neutral-200 flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#3E7D25] text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">3. Corporate Trainings</h3>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Lead auditor, internal auditor, HACCP, and hygiene workshops with verifiable certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distinction Notice */}
      <section className="py-4 bg-[#F8FAF9] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 shadow-2xs text-left">
            <ShieldCheck className="w-5 h-5 text-[#3E7D25] shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900 font-bold block mb-0.5">
                Our Advisory Scope &amp; Professional Independence:
              </strong>
              ESSOR Compliance Solutions provides preparatory gap assessments, implementation coaching, mock audits, and managed compliance routines. Official third-party certification is awarded exclusively by independent accredited certification bodies.
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid with Visual Images */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {services.map((srv, idx) => {
            const photo = servicePhotos[idx] || auditImg;

            return (
              <div
                key={srv.id}
                className="rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-[#3E7D25] hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch overflow-hidden group text-left"
              >
                {/* Visual Image Column */}
                <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden bg-neutral-100">
                  <img
                    src={photo}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white px-2.5 py-0.5 rounded-md bg-[#012B53]/90 backdrop-blur-xs">
                      0{idx + 1}.
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 bg-white/95 px-2 py-0.5 rounded-md shadow-xs">
                      {srv.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Service Details Column */}
                <div className="lg:col-span-8 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors">
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
                            <span key={std} className="px-2.5 py-1 text-xs font-bold text-neutral-900 bg-emerald-50 border border-emerald-200 rounded-lg">
                              {std}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 pt-3 border-t border-neutral-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#3E7D25]" />
                        <span>Core Deliverables:</span>
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {srv.deliverables.slice(0, 4).map((item, dIdx) => (
                          <li key={dIdx} className="text-xs text-neutral-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7D25] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        if (srv.slug === 'training-capability') onNavigate('/training');
                        else if (srv.slug === 'digital-compliance') onNavigate('/digital-compliance');
                        else onNavigate(`/services/${srv.slug}`);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#3E7D25] transition-colors cursor-pointer group/btn"
                    >
                      <span>Detailed Breakdown</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#3E7D25] transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(srv.slug)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] active:scale-[0.98] rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <span>Request Proposal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5 Auditing Types from Page 11 of Brochure */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-neutral-200 shadow-md text-left">
          <div className="max-w-3xl mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3E7D25]">
              Audit Types &amp; Scope (From Brochure Page 11)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
              Structured Audit Services We Conduct
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              ESSOR is committed to conducting audits with objectivity, impartiality, and professional integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditTypes.map((at, aIdx) => (
              <div key={aIdx} className="p-4 rounded-xl bg-[#F8FAF9] border border-neutral-200 space-y-2">
                <span className="text-xs font-mono font-bold text-[#3E7D25] px-2 py-0.5 rounded bg-white border border-neutral-200 inline-block">
                  Audit 0{aIdx + 1}
                </span>
                <h4 className="text-sm font-bold text-neutral-900">{at.name}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{at.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Callout */}
        <div className="mt-12 p-8 rounded-2xl bg-[#051F14] text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A4D65E]">
              Custom Audit Readiness Assignment
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white">
              Need a factory floor gap audit for your upcoming inspection?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
              We visit your plant in person, inspect all lines, identify findings, and guide your team to 100% compliance.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry()}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#3E7D25] hover:bg-[#256629] active:scale-[0.98] rounded-xl transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            Speak to a Lead Specialist
          </button>
        </div>
      </section>

    </div>
  );
};
