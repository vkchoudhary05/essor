import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, ShieldCheck, Sparkles } from 'lucide-react';
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
          y: 35,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (buttonsRef.current) {
        gsap.from(buttonsRef.current.children, {
          opacity: 0,
          scale: 0.94,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: buttonsRef.current,
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
      id="cta-section"
      ref={sectionRef} 
      className="py-14 sm:py-16 bg-gradient-to-br from-[#12271F] via-[#0F221B] to-[#0A1813] text-white relative overflow-hidden border-t border-[#D4AF37]/30"
    >
      {/* Ambient background gold glow and grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div ref={contentRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        
        {/* Monogram Crest Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11221C] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-widest text-[#F5DC9A] shadow-lg shadow-black/40">
          <Logo variant="icon-only" size="sm" className="w-4 h-4 scale-75" />
          <span>Confidential Technical Review & Readiness</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
          Let's strengthen your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4D8] via-[#F5DC9A] to-[#D4AF37]">
            food safety & compliance posture.
          </span>
        </h2>

        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Share your current requirement, upcoming audit or food-safety challenge with us. Our lead specialists can identify the practical next step for your manufacturing operation.
        </p>

        <div ref={buttonsRef} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenEnquiry()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0A1310] bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-xl shadow-[#D4AF37]/25 ring-1 ring-[#FFF2D6]/40 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#0A1310]" />
            <span>Discuss Your Requirements</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5DC9A] bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-[#D4AF37]/40 shadow-sm cursor-pointer"
          >
            <span>Contact Directory</span>
          </button>
        </div>

        {/* Quick Contact Micro-strip */}
        <div className="pt-8 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <span className="hover:text-[#F5DC9A] transition-colors">enquiries@essorcompliance.com</span>
          </div>
          <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span className="hover:text-[#F5DC9A] transition-colors">+91 (0) 80 4567 8900</span>
          </div>
          <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#F5DC9A] font-semibold">ISO 17020 & GFSI Technical Alignment</span>
          </div>
        </div>

      </div>
    </section>
  );
};
