import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  services: ServiceItem[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onNavigate,
  onOpenEnquiry
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const railTweenRef = useRef<gsap.core.Tween | null>(null);

  const moveRail = (direction: -1 | 1) => {
    const tween = railTweenRef.current;
    if (!tween) return;
    const step = 1 / Math.max(services.length * 2, 1);
    tween.progress((tween.progress() + direction * step + 1) % 1);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Staggered service cards reveal
      if (cardsGridRef.current) {
        gsap.from(cardsGridRef.current.children, {
          opacity: 0,
          y: 45,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        if (services.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const distance = cardsGridRef.current.scrollWidth / 2;
          railTweenRef.current = gsap.to(cardsGridRef.current, {
            x: -distance,
            duration: 38,
            ease: 'none',
            repeat: -1
          });
        }
      }

      // Bottom banner reveal
      if (bannerRef.current) {
        gsap.from(bannerRef.current, {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <section 
      id="services-section"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-white border-b border-[#D4AF37]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div ref={headerRef} className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#D4AF37]/45 text-xs font-bold uppercase tracking-wider text-[#876212] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Consulting & Managed Execution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1713] tracking-tight leading-tight">
            Support for every stage of your compliance journey
          </h2>
          <p className="text-base text-neutral-600 mt-2 font-normal">
            Choose the support you need today—from a focused audit-readiness assignment to ongoing food-safety support and team development.
          </p>
        </div>

        {services.length > 1 && (
          <div className="flex items-center justify-end gap-2 -mt-3 mb-3" aria-label="Service carousel controls">
            <span className="mr-2 text-[11px] font-medium text-neutral-500 hidden sm:inline">Explore services</span>
            <button
              type="button"
              onClick={() => moveRail(-1)}
              aria-label="Show previous services"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-green-200 bg-white text-green-800 shadow-sm transition hover:bg-green-50 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => moveRail(1)}
              aria-label="Show next services"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-green-200 bg-white text-green-800 shadow-sm transition hover:bg-green-50 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            ref={cardsGridRef}
            className="home-content-grid flex w-max gap-5 py-2"
            onMouseEnter={() => railTweenRef.current?.pause()}
            onMouseLeave={() => railTweenRef.current?.play()}
          >
          {services.length > 0 ? [...services, ...services].map((srv, idx) => (
            <div
              key={`${srv.id}-${idx}`}
              className="group w-[290px] sm:w-[320px] shrink-0 p-6 rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] hover:bg-white hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#876212] px-2.5 py-0.5 rounded-md bg-[#FAF0D4] border border-[#D4AF37]/30">
                    0{(idx % services.length) + 1}.
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    {srv.category.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B1713] group-hover:text-[#876212] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs leading-relaxed text-neutral-600">
                  {srv.shortDescription}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-[#D4AF37]/20">
                  {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                    <li key={dIdx} className="text-[12px] text-neutral-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B38] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/services/${srv.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1713] hover:text-[#876212] transition-colors cursor-pointer group/link"
                >
                  <span>View Service Scope</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#876212] transition-transform group-hover/link:translate-x-1" />
                </button>

                <button
                  onClick={() => onOpenEnquiry(srv.slug)}
                  className="text-xs font-bold text-[#876212] hover:text-[#0B1713] underline underline-offset-2 cursor-pointer"
                >
                  Enquire
                </button>
              </div>
            </div>
          )) : (
            <div className="w-[320px] rounded-2xl border border-[#D4AF37]/30 bg-[#FAF9F5] px-6 py-8 text-center">
              <p className="text-sm font-semibold text-[#0B1713]">Our service catalogue is loading.</p>
              <p className="mt-1 text-xs text-neutral-600">You can still contact our food-safety team to discuss your requirements.</p>
              <button
                onClick={() => onOpenEnquiry()}
                className="mt-4 text-xs font-bold text-[#876212] underline underline-offset-4 cursor-pointer"
              >
                Discuss your requirements
              </button>
            </div>
          )}
          </div>
        </div>

        <div ref={bannerRef} className="mt-12 p-6 rounded-2xl bg-[#FAF0D4]/40 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#0B1713]">
              Our Adaptive Scope Role
            </h4>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
              We adapt the scope to your current system, your people, and the requirement you need to meet—ensuring practical progress without disrupting commercial output.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A1310] bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-[#D4AF37]/20 shrink-0 cursor-pointer"
          >
            Browse All Services
          </button>
        </div>

      </div>
    </section>
  );
};
