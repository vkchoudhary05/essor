import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHY_ESSOR_POINTS } from '../../data/initialData';
import { CheckCircle2, Sparkles, Award } from 'lucide-react';
import { Logo } from '../common/Logo';

gsap.registerPlugin(ScrollTrigger);

export const WhyEssorSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          x: -35,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (cardsGridRef.current) {
        gsap.from(cardsGridRef.current.children, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-essor-section"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-white border-b border-[#D4AF37]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider text-[#876212]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Why ESSOR Compliance</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1713] tracking-tight leading-tight">
              Designed for practical,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B38728] via-[#D4AF37] to-[#876212]">
                continuous compliance
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Our support is centered on making requirements work in the real operation—through people, controls, evidence and follow-through.
            </p>

            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-xl group bg-[#FAF0D4]/30">
              <img
                src="/src/assets/images/audit_readiness_inspection_1791962115904.jpg"
                alt="Food safety inspection on processing line"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-4 bg-[#10241D] text-white text-[11px] font-semibold flex items-center justify-between border-t border-[#D4AF37]/30">
                <div className="flex items-center gap-2">
                  <Logo variant="icon-only" size="sm" className="w-4 h-4 scale-75" />
                  <span className="text-[#F5DC9A]">Direct factory floor coaching and physical evidence verification</span>
                </div>
                <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
              </div>
            </div>
          </div>

          <div ref={cardsGridRef} className="home-content-grid lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_ESSOR_POINTS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#D4AF37]/35 bg-[#FAF9F5] hover:bg-white hover:border-[#D4AF37] hover:shadow-lg transition-all space-y-3 group hover:-translate-y-1"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#FAF0D4] text-[#876212] group-hover:bg-[#0A1310] group-hover:text-[#F5DC9A] transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0B1713] uppercase tracking-wide">
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
