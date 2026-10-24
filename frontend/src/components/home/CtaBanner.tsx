import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { Logo } from '../common/Logo';

gsap.registerPlugin(ScrollTrigger);

interface CtaBannerProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            once: true
          }
        });
      }

      if (buttonsRef.current) {
        gsap.from(buttonsRef.current.children, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 90%',
            once: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="cta-section"
      ref={sectionRef} 
      className="py-14 sm:py-20 bg-gradient-to-b from-[#F4F8F5] via-white to-[#F8FAF9] text-neutral-900 relative overflow-hidden border-t border-emerald-900/10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div ref={contentRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Crest Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-2xs">
          <Logo variant="icon-only" size="sm" className="w-4 h-4" />
          <span>Confidential Assessment &amp; Plant Readiness</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Let&apos;s Strengthen Your{' '}
          <span className="text-[#3E7D25]">
            Food Safety &amp; Compliance Posture.
          </span>
        </h2>

        <p className="text-neutral-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Share your target standard, upcoming audit date, or team training goals. Our lead auditors will structure a pragmatic, cost-effective plan tailored to your processing facility.
        </p>

        <div ref={buttonsRef} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onOpenEnquiry()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] active:scale-[0.98] rounded-xl transition-all shadow-md group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#A4D65E]" />
            <span>Discuss Plant Requirements</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="https://wa.me/916395843850?text=Hi%20ESSOR%20Team%2C%20I%20would%20like%20to%20consult%20regarding%20Food%20Safety%20%26%20Audit%20Services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shadow-md active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 bg-white hover:bg-neutral-50 rounded-xl transition-all border border-neutral-300 shadow-2xs cursor-pointer"
          >
            <span>Contact Directory</span>
          </button>
        </div>

        {/* Quick Contact Micro-strip */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#3E7D25]" />
            <a href="mailto:business@essorcompliance.com" className="hover:text-[#3E7D25] transition-colors font-semibold text-neutral-900">
              business@essorcompliance.com
            </a>
          </div>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#3E7D25]" />
            <a href="tel:+916395843850" className="hover:text-[#3E7D25] transition-colors font-bold text-neutral-900">
              +91 6395843850
            </a>
          </div>
          <span className="hidden sm:inline text-neutral-300">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3E7D25]" />
            <span className="text-neutral-900 font-semibold">Doon IT Park, Dehradun</span>
          </div>
        </div>

      </div>
    </section>
  );
};
