import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, LayoutDashboard, ClipboardCheck, AlertOctagon, Sparkles, QrCode } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DigitalComplianceSectionProps {
  onNavigate: (path: string) => void;
}

export const DigitalComplianceSection: React.FC<DigitalComplianceSectionProps> = ({
  onNavigate
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const modulesGridRef = useRef<HTMLDivElement>(null);
  const tabletImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text & badges
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          y: 35,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // 4 digital module cards
      if (modulesGridRef.current) {
        gsap.from(modulesGridRef.current.children, {
          opacity: 0,
          scale: 0.95,
          y: 25,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: modulesGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Tablet preview 3D perspective entrance
      if (tabletImageRef.current) {
        gsap.from(tabletImageRef.current, {
          opacity: 0,
          scale: 0.92,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabletImageRef.current,
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
      id="digital-platform-section"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-white border-b border-[#D4AF37]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div ref={leftColRef} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#D4AF37]/45 text-xs font-bold uppercase tracking-wider text-[#876212]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Digital Platform & Registry</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1713] tracking-tight leading-tight">
              Make food safety compliance intuitive to manage
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Digital tools can help your team organize evidence, track actions and maintain visibility across everyday food-safety activities.
            </p>

            <div ref={modulesGridRef} className="home-content-grid grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF9F5] hover:bg-white hover:border-[#D4AF37] hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-[#FAF0D4] text-[#876212] group-hover:bg-[#0A1310] group-hover:text-[#F5DC9A] transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B1713]">Compliance Dashboard</h3>
                </div>
                <p className="text-[11px] text-neutral-600">Action tracking, audit schedules, document readiness</p>
              </div>

              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF9F5] hover:bg-white hover:border-[#D4AF37] hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-[#FAF0D4] text-[#876212] group-hover:bg-[#0A1310] group-hover:text-[#F5DC9A] transition-colors">
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B1713]">Digital Inspections</h3>
                </div>
                <p className="text-[11px] text-neutral-600">GMP walk observations, owners, due dates & photo proof</p>
              </div>

              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF9F5] hover:bg-white hover:border-[#D4AF37] hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-[#FAF0D4] text-[#876212] group-hover:bg-[#0A1310] group-hover:text-[#F5DC9A] transition-colors">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B1713]">Instant Registry</h3>
                </div>
                <p className="text-[11px] text-neutral-600">Tamper-proof certificate QR verification</p>
              </div>

              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF9F5] hover:bg-white hover:border-[#D4AF37] hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-[#FAF0D4] text-[#876212] group-hover:bg-[#0A1310] group-hover:text-[#F5DC9A] transition-colors">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B1713]">Complaint Workflow</h3>
                </div>
                <p className="text-[11px] text-neutral-600">Intake, RCA investigation, CAPA closure and verification</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF0D4]/70 border border-[#D4AF37]/40 text-xs text-[#0B1713]">
              <strong className="text-[#876212]">Our Guiding Principle: </strong> 
              Technology supports your people by making compliance work more visible and organized; it does not replace responsible food-safety decisions.
            </div>

            <div>
              <button
                onClick={() => onNavigate('/digital-compliance')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A1310] bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer group"
              >
                <span>Explore Digital Modules</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div ref={tabletImageRef} className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl bg-[#FAF0D4]/30 group ring-1 ring-[#D4AF37]/30 hover:ring-[#D4AF37]/70 transition-all duration-500">
              <img
                src="/src/assets/images/digital_compliance_dashboard_preview_1791962116109.jpg"
                alt="Digital food safety compliance dashboard on tablet"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
