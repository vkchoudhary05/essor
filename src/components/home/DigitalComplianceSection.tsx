import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, LayoutDashboard, ClipboardCheck, AlertOctagon, Sparkles, QrCode } from 'lucide-react';
import dashboardImage from '../../assets/images/digital_compliance_dashboard_preview_1791962116109.jpg';

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
      className="py-16 sm:py-20 bg-white border-b border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div ref={leftColRef} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Digital Platform & Registry</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#012B53] tracking-tight leading-tight">
              Make food safety compliance intuitive to manage
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Digital tools can help your team organize evidence, track actions and maintain visibility across everyday food-safety activities.
            </p>

            <div ref={modulesGridRef} className="home-content-grid grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-emerald-900/10 bg-[#F8FAFC] hover:bg-white hover:border-emerald-500 hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 group-hover:bg-[#012B53] group-hover:text-emerald-300 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#012B53]">Compliance Dashboard</h3>
                </div>
                <p className="text-[11px] text-neutral-600">Action tracking, audit schedules, document readiness</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/10 bg-[#F8FAFC] hover:bg-white hover:border-emerald-500 hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 group-hover:bg-[#012B53] group-hover:text-emerald-300 transition-colors">
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#012B53]">Digital Inspections</h3>
                </div>
                <p className="text-[11px] text-neutral-600">GMP walk observations, owners, due dates & photo proof</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/10 bg-[#F8FAFC] hover:bg-white hover:border-emerald-500 hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 group-hover:bg-[#012B53] group-hover:text-emerald-300 transition-colors">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#012B53]">Instant Registry</h3>
                </div>
                <p className="text-[11px] text-neutral-600">Tamper-proof certificate QR verification</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/10 bg-[#F8FAFC] hover:bg-white hover:border-emerald-500 hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-800 group-hover:bg-[#012B53] group-hover:text-emerald-300 transition-colors">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#012B53]">Complaint Workflow</h3>
                </div>
                <p className="text-[11px] text-neutral-600">Intake, RCA investigation, CAPA closure and verification</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-[#012B53]">
              <strong className="text-emerald-900">Our Guiding Principle: </strong> 
              Technology supports your people by making compliance work more visible and organized; it does not replace responsible food-safety decisions.
            </div>

            <div>
              <button
                onClick={() => onNavigate('/digital-compliance')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer group"
              >
                <span>Explore Digital Modules</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div ref={tabletImageRef} className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-2xl bg-[#012B53] group ring-1 ring-emerald-500/20 hover:ring-emerald-500/60 transition-all duration-500">
              <div className="aspect-[16/10] relative overflow-hidden bg-emerald-950/40">
                <img
                  src={dashboardImage}
                  alt="Digital food safety compliance dashboard on tablet"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
