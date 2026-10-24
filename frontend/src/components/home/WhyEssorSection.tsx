import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import auditImage from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';

gsap.registerPlugin(ScrollTrigger);

const WHY_ESSOR_BROCHURE_POINTS = [
  {
    title: 'Highly Competitive & Transparent Pricing',
    description: 'Affordable compliance plans suited to food manufacturers of all sizes without hidden advisory fees.'
  },
  {
    title: 'Friendly, Approachable Lead Auditors',
    description: 'Down-to-earth specialists who work side-by-side with your line operators and floor supervisors.'
  },
  {
    title: 'Fast Turnaround & Rapid Action Closure',
    description: 'We identify compliance gaps rapidly and resolve audit non-conformities within 48 hours.'
  },
  {
    title: 'Well-Documented Evidence & Defensible SOPs',
    description: 'Clean, practical documentation generated naturally by daily plant operations rather than panic paperwork.'
  },
  {
    title: 'Continual Improvement & Cost Reduction',
    description: 'Cut operational costs by eliminating raw material wastage, product rework, and recall liabilities.'
  },
  {
    title: 'Widen Global Market Opportunities',
    description: 'Unlock export licenses, tier-1 supermarket retail vendor approvals, and global supply contracts.'
  }
];

export const WhyEssorSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }

      if (cardsGridRef.current) {
        const cards = Array.from(cardsGridRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-essor-section" 
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-white border-b border-emerald-900/10 relative overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>Why Food Processors Choose ESSOR</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Designed for Practical,{' '}
              <span className="text-[#3E7D25]">
                Continuous Compliance
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              At ESSOR Compliance Solutions, we put our customers first, delivering practical solutions that go beyond certification readiness to create lasting business value.
            </p>

            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl group bg-white">
              <img
                src={auditImage}
                alt="Food safety inspection on processing line"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-4 bg-[#012B53] text-white text-[11px] font-semibold flex items-center justify-between border-t border-emerald-700/30">
                <div className="flex items-center gap-2">
                  <Logo variant="icon-only" size="sm" className="w-5 h-5" />
                  <span className="text-[#A4D65E]">Direct factory floor coaching &amp; evidence verification</span>
                </div>
                <Award className="w-4 h-4 text-[#A4D65E] shrink-0" />
              </div>
            </div>
          </div>

          <div ref={cardsGridRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_ESSOR_BROCHURE_POINTS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-neutral-200 bg-[#F8FAF9] hover:bg-white hover:border-[#3E7D25] hover:shadow-lg transition-all space-y-2.5 group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-[#3E7D25] group-hover:bg-[#3E7D25] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
