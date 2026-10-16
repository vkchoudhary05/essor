import React from 'react';
import { Users, Award, ShieldCheck, ArrowRight, CheckCircle2, GraduationCap, Building2 } from 'lucide-react';
import { TEAM_CAPABILITIES } from '../../data/initialData';

interface TeamPageProps {
  onOpenEnquiry: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#fafbf9]">
      
      {/* Header Banner with Real Operations Photography */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#547565]">
                <Users className="w-4 h-4 text-[#547565]" />
                <span>Our Team Expertise & Lead Assessors</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
                Consulting experience that strengthens audit readiness
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                Our team brings practical food-safety and compliance expertise to help clients prepare, respond and continuously improve across all processing sectors.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-700">
                <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-md">
                  <ShieldCheck className="w-4 h-4 text-[#547565]" />
                  IRCA & Exemplar Global Certified
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-md">
                  <GraduationCap className="w-4 h-4 text-[#547565]" />
                  Food Technology Specialists
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xl group">
                <img
                  src="/src/assets/images/team_consulting_operations_1791962117427.jpg"
                  alt="ESSOR consulting team conducting technical review"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-3 bg-neutral-900 text-white text-[11px] text-center font-medium">
                  Multi-disciplinary technical audit review & HACCP validation team
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Capability Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEAM_CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4 hover:border-[#142B3A] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#547565]">
                  CAPABILITY GROUP 0{idx + 1}
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#0e271d] text-[#F5E4B5] flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#142B3A]">
                {cap.group}
              </h2>

              <p className="text-xs font-semibold text-[#547565]">
                {cap.subtitle}
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed pt-2">
                {cap.detail}
              </p>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-[#547565] shrink-0" />
                <span>Field-tested expertise across food processing sectors</span>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory / Personnel Disclosure Policy required by master prompt */}
        <div className="mt-14 p-6 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-neutral-900">
            Advisory Team Deployment Policy:
          </h4>
          <p className="leading-relaxed">
            ESSOR Compliance Solutions deploys verified Lead Auditors, Food Technologists, and Technical Project Managers based on the exact scope, commodity risks, and certification schemes of each assignment. In adherence to enterprise consulting governance, individual consultant bios, conflict-of-interest declarations, and formal credentials are shared directly in client project proposals following scope agreement.
          </p>
        </div>

        {/* CTA banner */}
        <div className="mt-12 p-8 rounded-xl bg-[#142B3A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">
              Consult with our Lead Food Safety Specialists
            </h3>
            <p className="text-xs text-neutral-300">
              Discuss your facility's upcoming audit with experienced technical assessors.
            </p>
          </div>
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#142B3A] bg-[#F5E4B5] hover:bg-[#ffeec2] rounded-lg transition-colors shrink-0"
          >
            <span>Request Specialist Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
