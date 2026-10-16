import React from 'react';
import { Users, ShieldCheck, ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { TEAM_CAPABILITIES } from '../../data/initialData';
import { Logo } from '../common/Logo';

interface TeamPageProps {
  onOpenEnquiry: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner with Real Operations Photography */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Our Team Expertise & Lead Assessors</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
                Consulting experience that strengthens{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                  audit readiness.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                Our team brings practical food-safety and compliance expertise to help clients prepare, respond and continuously improve across all processing sectors.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-[#062E21]">
                <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  IRCA & Exemplar Global Certified
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Food Technology Specialists
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xl group bg-white">
                <img
                  src="/src/assets/images/team_consulting_operations_1791962117427.jpg"
                  alt="ESSOR consulting team conducting technical review"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-3.5 bg-[#062E21] text-white text-[11px] text-center font-bold flex items-center justify-center gap-2 border-t border-emerald-700/30">
                  <Logo variant="icon-only" size="sm" className="w-4 h-4" />
                  <span className="text-emerald-200">Multi-disciplinary technical audit review & HACCP validation team</span>
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
              className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-4 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                  CAPABILITY GROUP 0{idx + 1}
                </span>
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#062E21] to-[#0E5C3A] text-white border border-emerald-500/40 flex items-center justify-center font-bold text-xs shadow-md">
                  ✓
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
                {cap.group}
              </h2>

              <p className="text-xs font-bold text-emerald-800">
                {cap.subtitle}
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed pt-2 font-normal">
                {cap.detail}
              </p>

              <div className="pt-4 border-t border-emerald-900/10 flex items-center gap-2 text-xs text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Field-tested expertise across food processing sectors</span>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory / Personnel Disclosure Policy */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-emerald-900/10 text-xs text-neutral-600 space-y-2 shadow-2xs">
          <h4 className="font-bold uppercase tracking-wider text-[#062E21]">
            Advisory Team Deployment Policy:
          </h4>
          <p className="leading-relaxed font-normal">
            ESSOR Compliance Solutions deploys verified Lead Auditors, Food Technologists, and Technical Project Managers based on the exact scope, commodity risks, and certification schemes of each assignment. In adherence to enterprise consulting governance, individual consultant bios, conflict-of-interest declarations, and formal credentials are shared directly in client project proposals following scope agreement.
          </p>
        </div>

        {/* CTA banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#041F16] via-[#062E21] to-[#0A3828] text-white border border-emerald-500/30 shadow-xl shadow-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Logo variant="icon-only" size="sm" className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Technical Assessor Network</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Consult with our Lead Food Safety Specialists
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Discuss your facility's upcoming audit with experienced technical assessors.
            </p>
          </div>
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 shrink-0 cursor-pointer"
          >
            <span>Request Specialist Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
