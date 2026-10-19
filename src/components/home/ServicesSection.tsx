import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';

// Direct image imports for reliable Vite bundling
import auditImg from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';
import packagingImg from '../../assets/images/packaging_line_audit_1792395423537.jpg';
import labImg from '../../assets/images/food_factory_lab_testing_1791965811882.jpg';
import produceImg from '../../assets/images/fresh_produce_inspection_1792395403170.jpg';
import trainingImg from '../../assets/images/corporate_training_seminar_1792395440966.jpg';
import kitchenImg from '../../assets/images/kitchen_hygiene_audit_1792394924443.jpg';

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
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Map service index or slug to high quality contextual images
  const serviceImages: Record<number, string> = {
    0: auditImg,      // Audit readiness / FSSAI / ISO 22000
    1: packagingImg,  // Managed compliance / packaging line
    2: trainingImg,   // Training & capability
    3: labImg,        // Laboratory & testing
    4: produceImg,    // Quality systems & fresh produce
    5: kitchenImg     // Kitchen & food service hygiene
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services-section"
      className="py-14 sm:py-20 bg-white border-b border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold uppercase tracking-wider text-[#2E7D32] border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Our Core Compliance Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Clear, Hands-On Food Safety Support for Your Plant
          </h2>
          <p className="text-base text-neutral-600 mt-2 font-normal">
            Choose exactly what you need today—from initial FSSAI licensing and audit readiness to daily factory floor hygiene checks, microbiology testing, and certified staff training.
          </p>
        </div>

        {/* 3-Column Responsive Grid with High-Impact Imagery */}
        <div 
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((srv, idx) => {
            const cardImg = serviceImages[idx] || auditImg;

            return (
              <div
                key={srv.id}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-[#2E7D32] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Thumbnail Image */}
                <div className="relative h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={cardImg}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white px-2.5 py-0.5 rounded-md bg-[#042A1D]/90 backdrop-blur-xs shadow-xs">
                      0{idx + 1}.
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 bg-white/95 px-2 py-0.5 rounded-md shadow-xs">
                      {srv.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#2E7D32] transition-colors leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-neutral-600">
                      {srv.shortDescription}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-neutral-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        Key Deliverables:
                      </span>
                      {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="text-[12px] text-neutral-700 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/services/${srv.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#2E7D32] transition-colors cursor-pointer"
                    >
                      <span>Learn Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#2E7D32]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenEnquiry(srv.slug)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-[#2E7D32] hover:text-white text-xs font-bold text-[#2E7D32] border border-emerald-300 hover:border-[#2E7D32] transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Brochure Promises */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50/60 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">
              Need a Custom Compliance Assessment for Your Facility?
            </h4>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
              We tailor our audit preparation and hygiene visits to your facility size, processing line, and target standard requirements (ISO 22000, FSSC 22000, BRCGS, HACCP, GMP).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry()}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#042A1D] hover:bg-[#2E7D32] active:scale-[0.98] rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Speak to a Lead Specialist
          </button>
        </div>

      </div>
    </section>
  );
};
