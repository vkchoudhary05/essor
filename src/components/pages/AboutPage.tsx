import React from 'react';
import { ArrowRight, Target, Eye, Compass, Award, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { CMSContent } from '../../types';
import { TEAM_CAPABILITIES } from '../../data/initialData';
import { Logo } from '../common/Logo';
import teamImage from '../../assets/images/team_consulting_operations_1791962117427.jpg';

interface AboutPageProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ cms, onNavigate, onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>About ESSOR Compliance Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              Built around practical,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                continuous compliance.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              We help food manufacturing and processing enterprises strengthen food-safety systems, prepare for stringent GFSI audits, develop technical capabilities and maintain compliance across daily factory floor operations.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose, Vision, Mission Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* OUR PURPOSE */}
          <div className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-4 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062E21] to-[#0E5C3A] text-white border border-emerald-500/40 flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-emerald-300" />
            </div>
            <h2 className="text-xl font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
              Our Purpose
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {cms.purpose}
            </p>
          </div>

          {/* VISION */}
          <div className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-4 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#041F16] to-[#062E21] text-white border border-emerald-500/40 flex items-center justify-center shadow-md">
              <Eye className="w-6 h-6 text-emerald-300" />
            </div>
            <h2 className="text-xl font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
              Vision
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {cms.vision}
            </p>
          </div>

          {/* MISSION */}
          <div className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-4 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E5C3A] to-[#15803D] text-white border border-emerald-400/40 flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
              Mission
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {cms.mission}
            </p>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-white border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Our Working Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062E21] tracking-tight leading-tight">
                Moving beyond the pre-audit panic cycle
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Too many food processing plants operate under cyclic audit pressure—frantically updating log sheets, repainting corridors, and scrambling for certificates two weeks before an external inspection.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                ESSOR was founded to replace that reactive stress with <strong className="text-[#062E21]">disciplined, continuous compliance</strong>. When hygiene routines, calibration registers, and corrective action workflows are embedded into daily floor routines, audits become a validation of everyday excellence rather than a corporate crisis.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-[#062E21]">Evidence-based implementation:</strong> Verifiable documentation generated naturally by daily operations.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-[#062E21]">Continuous improvement:</strong> Root-cause analysis that eliminates repeat customer complaints.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-[#062E21]">Client-centric delivery:</strong> Scope adapted to your manufacturing reality and shift patterns.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xl bg-white group">
              <img
  src={teamImage}
  alt="ESSOR consulting team conducting technical review"
  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
/>
                <div className="p-4 bg-[#062E21] text-white text-xs flex items-center justify-between border-t border-emerald-700/30">
                  <div className="flex items-center gap-2">
                    <Logo variant="icon-only" size="sm" className="w-5 h-5" />
                    <span className="text-emerald-200 font-semibold">Field Advisory & Multi-Disciplinary Auditing</span>
                  </div>
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Capabilities Overview */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Our Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062E21] tracking-tight">
              Experience that strengthens audit readiness
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-normal">
              Our team brings practical food-safety and compliance expertise to help clients prepare, respond and continuously improve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_CAPABILITIES.map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-emerald-900/10 bg-white hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 group hover:-translate-y-1"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-md bg-[#062E21] text-emerald-300 flex items-center justify-center text-[10px]">
                    0{idx + 1}
                  </span>
                  <span>CAPABILITY PILLAR</span>
                </div>
                <h3 className="text-base font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
                  {member.group}
                </h3>
                <p className="text-xs font-semibold text-emerald-800">
                  {member.subtitle}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {member.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#041F16] via-[#062E21] to-[#0A3828] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/30 shadow-xl shadow-emerald-950/20">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Logo variant="icon-only" size="sm" className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  Confidential Advisory
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Ready to review your facility's compliance posture?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                Schedule a confidential introductory discussion with our consulting practice.
              </p>
            </div>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Discuss Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
