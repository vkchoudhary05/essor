import React from 'react';
import { ArrowRight, Target, Eye, Compass, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CMSContent } from '../../types';
import { TEAM_CAPABILITIES } from '../../data/initialData';

interface AboutPageProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ cms, onNavigate, onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#fafbf9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              About ESSOR Compliance Solutions
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
              Built around practical food-safety execution.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              We help organizations strengthen food-safety systems, prepare for audits, develop people and maintain compliance in everyday operations.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose, Vision, Mission Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* OUR PURPOSE */}
          <div className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0e271d] text-[#F5E4B5] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#142B3A]">
              Our Purpose
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {cms.purpose}
            </p>
          </div>

          {/* VISION */}
          <div className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#142B3A] text-white flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#142B3A]">
              Vision
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {cms.vision}
            </p>
          </div>

          {/* MISSION */}
          <div className="p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#547565] text-white flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#142B3A]">
              Mission
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {cms.mission}
            </p>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-[#F4F6F3] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
                Our Working Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B3A] tracking-tight">
                Moving beyond the pre-audit panic cycle
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Too many food processing plants operate under cyclic audit pressure—frantically updating log sheets, repainting corridors, and scrambling for certificates two weeks before an external inspection.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                ESSOR was founded to replace that reactive stress with <strong>disciplined, continuous compliance</strong>. When hygiene routines, calibration registers, and corrective action workflows are embedded into daily floor routines, audits become a validation of everyday excellence rather than a corporate crisis.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#547565] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong>Evidence-based implementation:</strong> Verifiable documentation generated naturally by daily operations.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#547565] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong>Continuous improvement:</strong> Root-cause analysis that eliminates repeat customer complaints.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#547565] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong>Client-centric delivery:</strong> Scope adapted to your manufacturing reality and shift patterns.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
                <img
                  src="/src/assets/images/team_consulting_operations_1791962117427.jpg"
                  alt="ESSOR consulting team conducting technical review"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Capabilities Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565] mb-2">
              Our Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B3A] tracking-tight">
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
                className="p-6 rounded-xl border border-neutral-200 bg-[#FAFAFA] space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#547565]">
                  GROUP 0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#142B3A]">
                  {member.group}
                </h3>
                <p className="text-xs font-semibold text-[#547565]">
                  {member.subtitle}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {member.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 p-8 rounded-xl bg-[#142B3A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">
                Ready to review your facility's compliance posture?
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Schedule a confidential introductory discussion with our consulting practice.
              </p>
            </div>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#142B3A] bg-[#F5E4B5] hover:bg-[#ffeec2] rounded-lg transition-colors whitespace-nowrap shrink-0"
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
