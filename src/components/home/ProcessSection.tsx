import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ClipboardList, 
  FileCheck2, 
  SearchCheck, 
  Award,
  GraduationCap,
  Wrench,
  FileSearch,
  Users2,
  BadgeCheck,
  RefreshCw
} from 'lucide-react';

// Direct image import for Vite bundling
import packagingImage from '../../assets/images/packaging_line_audit_1792395423537.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  onNavigate: (path: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  const [activeView, setActiveView] = useState<'4STEP' | '8STEP'>('4STEP');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      if (stepsGridRef.current) {
        const cards = Array.from(stepsGridRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsGridRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeView]);

  const fourSteps = [
    {
      num: '01',
      title: 'Facility & Document Gap Review',
      phase: 'Diagnostic Evaluation',
      icon: ClipboardList,
      desc: 'Our lead auditor conducts a thorough on-site plant inspection and document evaluation against your target standard (FSSAI, ISO 22000, HACCP, or BRCGS).',
      outcome: 'Clear, prioritized checklist of exact physical & documentation action items.'
    },
    {
      num: '02',
      title: 'SOP Documentation & Staff Training',
      phase: 'Floor Coaching & Systems',
      icon: FileCheck2,
      desc: 'We draft simple, defensible Standard Operating Procedures (SOPs) and coach floor supervisors and line operators on hygiene habits and CCP logs.',
      outcome: 'Audit-ready manuals and a confident, well-trained factory floor team.'
    },
    {
      num: '03',
      title: 'Mock Audit & Traceability Drill',
      phase: 'Realistic Simulation',
      icon: SearchCheck,
      desc: 'We simulate the real audit experience with your team, testing mock recall runs, cleaning logs, temperature records, and CCP critical limits.',
      outcome: 'Zero surprises during official inspection; all non-conformances resolved in advance.'
    },
    {
      num: '04',
      title: 'Official Audit Support & Fast Closure',
      phase: 'Certification & Passing',
      icon: Award,
      desc: 'During the official audit by FSSAI or certification bodies, our specialists provide technical defense and close any findings within 48 hours.',
      outcome: 'Guaranteed first-time audit pass and official certificate issuance.'
    }
  ];

  // 8-Step Lifecycle from Page 3 of Brochure
  const eightSteps = [
    { num: 'Step 01', title: 'Gap Analysis', icon: ClipboardList, desc: 'Identify baseline gaps against standard requirements' },
    { num: 'Step 02', title: 'Training', icon: GraduationCap, desc: 'Train personnel on food hygiene, GMP, and CCP requirements' },
    { num: 'Step 03', title: 'Implementation', icon: Wrench, desc: 'Embed controls, SOPs, and records into daily operations' },
    { num: 'Step 04', title: 'Internal Audit', icon: FileSearch, desc: 'Rigorous internal verification to identify any findings' },
    { num: 'Step 05', title: 'Management Review', icon: Users2, desc: 'Leadership evaluation of effectiveness & continual improvement' },
    { num: 'Step 06', title: 'Audit By Registrar', icon: SearchCheck, desc: 'Independent assessment by accredited certification body' },
    { num: 'Step 07', title: 'Certificate Achieved', icon: BadgeCheck, desc: 'Official compliance certification issued successfully' },
    { num: 'Step 08', title: 'Regular Surveillance', icon: RefreshCw, desc: 'Continuous compliance maintenance & annual surveillance' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="process-section"
      className="py-16 sm:py-20 bg-white border-y border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>Simplified Certification Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              A Straightforward Path to Passing Every Audit
            </h2>
            <p className="text-base text-neutral-600 mt-2 font-normal">
              No endless theoretical manuals or confusing jargon. We work directly on your factory floor to make compliance simple, fast, and stress-free.
            </p>
          </div>

          {/* Toggle between 4-Step Floor Roadmap and Brochure's 8-Step Lifecycle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200 shrink-0">
            <button
              type="button"
              onClick={() => setActiveView('4STEP')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === '4STEP'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              4-Step Floor Roadmap
            </button>
            <button
              type="button"
              onClick={() => setActiveView('8STEP')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === '8STEP'
                  ? 'bg-[#3E7D25] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              8-Step Full Lifecycle
            </button>
          </div>
        </div>

        {/* 4-Step Roadmap View */}
        {activeView === '4STEP' ? (
          <div 
            ref={stepsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {fourSteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-neutral-200 bg-[#F8FAF9] p-6 hover:border-[#3E7D25] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-mono text-neutral-900">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white text-[#3E7D25] border border-emerald-200 flex items-center justify-center shadow-xs group-hover:bg-[#3E7D25] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3E7D25] block">
                        {step.phase}
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 mt-1 group-hover:text-[#3E7D25] transition-colors leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-200/80">
                    <div className="flex items-start gap-2 text-xs text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-[#3E7D25] shrink-0 mt-0.5" />
                      <span className="font-medium text-[11px] leading-tight">
                        <strong>Outcome:</strong> {step.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 8-Step Lifecycle View from Page 3 of Brochure */
          <div 
            ref={stepsGridRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
          >
            {eightSteps.map((s, idx) => {
              const IconComponent = s.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-[#F8FAF9] border border-neutral-200 hover:border-[#3E7D25] hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-900">
                      {s.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#3E7D25] flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1.5">{s.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Visual Callout Bar with Packaging Line Image */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-[#012B53]/15 shadow-xl bg-gradient-to-br from-[#012542] via-[#012B53] to-[#0C5A91] text-white grid grid-cols-1 md:grid-cols-12 items-center text-left">
          <div className="md:col-span-8 p-6 sm:p-8 space-y-2">
            <span className="text-[15px] font-bold uppercase tracking-wider text-[#A4D65E]">
              Zero-Stress Factory Floor Readiness
            </span>
            <h4 className="text-lg sm:text-xl font-bold !text-white">
              Facing an Upcoming FSSAI, ISO 22000, or Customer Supplier Audit?
            </h4>
            <p className="text-xs sm:text-sm !text-white max-w-xl font-medium leading-relaxed">
              We conduct a preliminary 48-hour gap inspection to uncover every finding before the official audit team arrives.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/our-process')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#75B72B] via-[#4C8E20] to-[#3E7D25] hover:from-[#A4D65E] hover:via-[#75B72B] hover:to-[#4C8E20] text-[#012542] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Explore Full Methodology
              </button>
            </div>
          </div>
          <div className="md:col-span-4 h-48 md:h-full relative overflow-hidden">
            <img
              src={packagingImage}
              alt="Food packaging line audit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
