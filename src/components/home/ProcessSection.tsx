import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ENGAGEMENT_STAGES } from '../../data/initialData';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  onNavigate: (path: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Sequential stage card entrance
      if (stepsGridRef.current) {
        gsap.from(stepsGridRef.current.children, {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Bottom CTA button
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="process-section"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-[#FAF9F5] border-y border-[#D4AF37]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div ref={headerRef} className="max-w-3xl mb-9">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#D4AF37]/45 text-xs font-bold uppercase tracking-wider text-[#876212] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The 6-Stage Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1713] tracking-tight leading-tight">
            From first assessment to continuous compliance
          </h2>
          <p className="text-base text-neutral-600 mt-2 font-normal">
            Whether you need help with an upcoming audit, a certification requirement, a customer request or everyday food safety, we can support the next practical step.
          </p>
        </div>

        <div ref={stepsGridRef} className="home-content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGAGEMENT_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs space-y-3 relative overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Subtle gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FAF0D4]/60 to-transparent rounded-bl-3xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0C1A15] to-[#0A1310] text-[#F5DC9A] border border-[#D4AF37]/50 font-black text-sm flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:border-[#F5DC9A] transition-all">
                  {stage.step}
                </span>
                <h3 className="text-base font-bold text-[#0B1713] group-hover:text-[#876212] transition-colors">
                  {stage.title}
                </h3>
              </div>

              <div className="text-xs font-bold text-[#876212] flex items-center gap-1">
                <span>{stage.description}</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                {stage.details}
              </p>

              <div className="pt-3 border-t border-[#D4AF37]/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#876212] block mb-0.5">
                  Expected Outcome
                </span>
                <p className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                  <span>{stage.outcome}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-12">
          <button
            onClick={() => onNavigate('/our-process')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF0D4]/40 border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider text-[#0B1713] transition-all cursor-pointer shadow-sm hover:shadow-md group active:scale-[0.98]"
          >
            <span>Learn How We Implement Each Stage</span>
            <ChevronRight className="w-4 h-4 text-[#876212] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
