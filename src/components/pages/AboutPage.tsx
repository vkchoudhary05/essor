import React from 'react';
import { ArrowRight, Target, Eye, Compass, Award, ShieldCheck, CheckCircle2, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { CMSContent } from '../../types';
import { TEAM_CAPABILITIES } from '../../data/initialData';
import { Logo } from '../common/Logo';

// Direct imports for reliable Vite bundling
import teamImage from '../../assets/images/team_consulting_operations_1791962117427.jpg';
import produceImage from '../../assets/images/fresh_produce_inspection_1792395403170.jpg';
import auditImage from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';

interface AboutPageProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ cms, onNavigate, onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#F8FAF9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>About ESSOR Compliance Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Built Around Practical,{' '}
              <span className="text-[#3E7D25]">
                Continuous Compliance.
              </span>
            </h1>
            <p className="text-xs font-black tracking-widest uppercase text-neutral-900">
              SIMPLIFYING COMPLIANCE. STRENGTHENING FOOD SAFETY. BUILDING TRUST.
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              We take pleasure in introducing ESSOR Compliance Solutions as your trusted partner in strengthening food safety, quality, and compliance practices. ESSOR is committed to guiding businesses in designing, implementing, improving, and maintaining effective management systems in line with applicable standards and industry requirements.
            </p>
          </div>

          {/* 6 Core Value Badges from Page 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
            {[
              'Simple and Hassle free',
              'Quick & fast turn around',
              'Well documented',
              'Guaranteed Results',
              'Total customer Satisfaction',
              'Affordable Price'
            ].map((promise, pIdx) => (
              <div 
                key={pIdx}
                className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAF9] border border-neutral-200 text-xs font-bold text-neutral-900 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#3E7D25] shrink-0" />
                <span className="leading-snug">{promise}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Photo Showcase: Real On-Site Operations */}
      <section className="py-12 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md group">
              <div className="h-56 overflow-hidden">
                <img
                  src={produceImage}
                  alt="Fresh produce and raw material inspection"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7D25]">Raw Ingredient Quality</span>
                <h4 className="text-sm font-bold text-neutral-900 mt-0.5">Farm-to-Fork Receiving Checks</h4>
                <p className="text-xs text-neutral-600 mt-1">Pesticide residues, freshness testing, and hygiene grading.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md group">
              <div className="h-56 overflow-hidden">
                <img
                  src={auditImage}
                  alt="Food safety auditor in food factory inspecting equipment"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7D25]">Factory Floor Audits</span>
                <h4 className="text-sm font-bold text-neutral-900 mt-0.5">Sanitation &amp; CCP Monitoring</h4>
                <p className="text-xs text-neutral-600 mt-1">Stainless steel machinery inspection and calibration registers.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md group">
              <div className="h-56 overflow-hidden">
                <img
                  src={teamImage}
                  alt="ESSOR consulting team conducting technical review"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7D25]">Advisory &amp; Documentation</span>
                <h4 className="text-sm font-bold text-neutral-900 mt-0.5">Technical Defense &amp; CAPA</h4>
                <p className="text-xs text-neutral-600 mt-1">Structured audit closure, root-cause analysis, and team coaching.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose, Vision, Mission Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          {/* OUR PURPOSE */}
          <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4 hover:border-[#3E7D25] hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#012B53] text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-[#A4D65E]" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors">
              Our Purpose
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {cms.purpose || 'To protect consumer health and empower food manufacturing enterprises with accessible, practical food safety systems.'}
            </p>
          </div>

          {/* VISION */}
          <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4 hover:border-[#3E7D25] hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#012B53] text-white flex items-center justify-center shadow-md">
              <Eye className="w-6 h-6 text-[#A4D65E]" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors">
              Vision
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {cms.vision || 'To be the benchmark partner in food safety management systems, celebrated for integrity, rapid turnaround, and measurable business protection.'}
            </p>
          </div>

          {/* MISSION */}
          <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4 hover:border-[#3E7D25] hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#3E7D25] text-white flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors">
              Mission
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {cms.mission || 'We deliver hands-on audit readiness, accredited training, and continuous compliance support that eliminates audit stress and builds enduring market trust.'}
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Us & Working Philosophy */}
      <section className="py-16 bg-white border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span>Why Food Processors Choose ESSOR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Moving Beyond the Pre-Audit Panic Cycle
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                At ESSOR Compliance Solutions, we put our customers first, delivering practical solutions that go beyond certification readiness to create lasting business value. Our audit-support expertise helps organizations prepare systematically for certification and surveillance audits through comprehensive gap assessments, mock audits, documentation reviews, and corrective action guidance.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3E7D25] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-neutral-900">Highly competitive &amp; transparent pricing:</strong> Affordable plans suited to facility scale.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3E7D25] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-neutral-900">Approachable, down-to-earth auditors:</strong> Practical floor-level advice with zero condescension.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3E7D25] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-neutral-900">Better operational performance &amp; reduced costs:</strong> Prevent food waste, recalls, and customer penalties.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3E7D25] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700"><strong className="text-neutral-900">Expanded market opportunities:</strong> Unlock export markets and tier-1 retail vendor approvals.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-[#051F14] text-white p-8 space-y-6">
                <div>
                  <Logo size="md" theme="dark" />
                  <p className="text-xs text-[#A4D65E] font-bold uppercase tracking-wider mt-3">
                    Compliance For A Safer Tomorrow
                  </p>
                </div>

                <div className="space-y-3 text-xs text-white/90">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                    <span>Doon IT Park, Sahastradhara Road, Dehradun, Uttarakhand, India</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#A4D65E] shrink-0" />
                    <span>+91 6395843850 (Direct / WhatsApp)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#A4D65E] shrink-0" />
                    <span>business@essorcompliance.com</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="w-full py-3 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Schedule Introductory Discussion
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Capabilities Overview */}
      <section className="py-20 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>Multi-Disciplinary Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Experience That Strengthens Audit Readiness
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-normal">
              Our specialists bring deep sector knowledge across dairy, RTE, confectionery, beverages, packaging, and commercial food service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {TEAM_CAPABILITIES.map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-[#3E7D25] hover:shadow-lg transition-all space-y-3 group"
              >
                <div className="text-xs font-mono font-bold text-[#3E7D25] flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-md bg-[#012B53] text-white flex items-center justify-center text-[10px]">
                    0{idx + 1}
                  </span>
                  <span>CAPABILITY PILLAR</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors">
                  {member.group}
                </h3>
                <p className="text-xs font-semibold text-[#3E7D25]">
                  {member.subtitle}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {member.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
