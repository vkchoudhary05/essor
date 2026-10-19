import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from 'lucide-react';
import { TEAM_CAPABILITIES } from '../../data/initialData';
import { Logo } from '../common/Logo';
import teamImage from '../../assets/images/team_consulting_operations_1791962117427.jpg';

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
      className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Our Team & Lead Assessors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#012B53] tracking-tight leading-tight">
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
            <div className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xl group relative bg-white">
         <img
  src={teamImage}
  alt="ESSOR consulting team conducting technical review in facility conference room"
  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
/>
              <div className="p-4 bg-[#012B53] text-white space-y-1 border-t border-emerald-700/30">
                <div className="flex items-center gap-2">
                  <Logo variant="icon-only" size="sm" className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
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
                className="p-5 rounded-2xl bg-white border border-emerald-900/10 shadow-xs space-y-2 hover:border-emerald-500 hover:shadow-md transition-all group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#012B53] text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shadow-xs">
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/80">
                    Pillar
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-[#012B53] group-hover:text-emerald-700 transition-colors">
                  {member.group}
                </h3>
                <p className="text-xs font-semibold text-emerald-800">
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
            className="text-xs font-bold uppercase tracking-wider text-[#012B53] hover:text-emerald-700 inline-flex items-center gap-1.5 cursor-pointer group"
          >
            <span>Read Full Team Capability Profile & Advisory Standards</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
