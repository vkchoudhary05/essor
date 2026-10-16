import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from 'lucide-react';
import { TEAM_CAPABILITIES } from '../../data/initialData';
import { Logo } from '../common/Logo';

gsap.registerPlugin(ScrollTrigger);

interface TeamShowcaseProps {
  onNavigate: (path: string) => void;
}

export const TeamShowcase: React.FC<TeamShowcaseProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const capabilityGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (photoRef.current) {
        gsap.from(photoRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (capabilityGridRef.current) {
        gsap.from(capabilityGridRef.current.children, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: capabilityGridRef.current,
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
      id="team-showcase"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-[#FAF9F5] border-t border-[#D4AF37]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#D4AF37]/45 text-xs font-bold uppercase tracking-wider text-[#876212] mb-3">
            <Users className="w-4 h-4 text-[#C29B38]" />
            <span>Our Team & Lead Assessors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1713] tracking-tight leading-tight">
            Consulting experience that strengthens audit readiness
          </h2>
          <p className="text-base text-neutral-600 mt-2 font-normal">
            Our team brings practical food-safety and compliance expertise to help clients prepare, respond and continuously improve.
          </p>
        </div>

        {/* Feature Split: Team Photo + Capability Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Real Advisory Team Photography */}
          <div ref={photoRef} className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/45 shadow-xl group relative bg-[#FAF0D4]/30">
              <img
                src="/src/assets/images/team_consulting_operations_1791962117427.jpg"
                alt="ESSOR consulting team conducting technical review in facility conference room"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-4 bg-[#10241D] text-white space-y-1 border-t border-[#D4AF37]/30">
                <div className="flex items-center gap-2">
                  <Logo variant="icon-only" size="sm" className="w-3.5 h-3.5 scale-75" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5DC9A]">
                    Technical Review & Advisory Governance
                  </span>
                </div>
                <p className="text-xs text-neutral-300">
                  Pre-audit multi-disciplinary review team covering HACCP validations, microbiology, engineering sanitary designs, and regulatory compliance.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Capability */}
          <div ref={capabilityGridRef} className="home-content-grid lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM_CAPABILITIES.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs space-y-2 hover:border-[#D4AF37] hover:shadow-md transition-all group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#0C1A15] text-[#F5DC9A] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs shadow-xs">
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#876212] px-2 py-0.5 rounded bg-[#FAF0D4]">
                    Pillar
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-[#0B1713] group-hover:text-[#876212] transition-colors">
                  {member.group}
                </h3>
                <p className="text-xs font-semibold text-[#876212]">
                  {member.subtitle}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                  {member.detail}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Read Full Profile Link */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('/team')}
            className="text-xs font-bold uppercase tracking-wider text-[#0B1713] hover:text-[#876212] inline-flex items-center gap-1.5 cursor-pointer group"
          >
            <span>Read Full Team Capability Profile & Advisory Standards</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#876212] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
