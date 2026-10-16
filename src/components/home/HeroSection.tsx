import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Building,
  Check,
  ChevronDown
} from 'lucide-react';
import { CMSContent } from '../../types';
import { Logo } from '../common/Logo';
import { scrollToElement } from '../../hooks/useSmoothScroll';

interface HeroSectionProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (initialService?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  cms,
  onNavigate,
  onOpenEnquiry
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineWordsRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const pillarCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Typewriter / rotating ticker text for compliance execution
  const dynamicWords = [
    'practical execution',
    'zero-defect audits',
    'BRCGS & FSSC standards',
    'measurable compliance'
  ];
  const [wordIndex, setWordIndex] = useState(0);
  // Start with meaningful copy instead of an empty typewriter slot. This keeps
  // the hero message readable on the first frame and for reduced-motion users.
  const [displayedText, setDisplayedText] = useState('practical execution');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth Typewriter effect for headline dynamic text
  useEffect(() => {
    const currentWord = dynamicWords[wordIndex];
    let typingSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && displayedText === currentWord) {
      typingSpeed = 2200; // Pause at end of word
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  // GSAP Animations on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Badge slide in with spring
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // 2. Headline subtle reveal
      if (headlineWordsRef.current) {
        gsap.from(headlineWordsRef.current, {
          y: 28,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.15
        });
      }

      // 3. Description slide & fade
      if (descRef.current) {
        gsap.from(descRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.35
        });
      }

      // 4. CTA buttons stagger
      if (ctaGroupRef.current) {
        const buttons = ctaGroupRef.current.children;
        gsap.from(buttons, {
          y: 18,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          delay: 0.5
        });
      }

      // 5. Metrics count-up & stagger
      if (metricsRef.current) {
        const metricItems = metricsRef.current.children;
        gsap.from(metricItems, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.7
        });
      }

      // 6. Right visual card scale & shine
      if (visualRef.current) {
        gsap.from(visualRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.4
        });
      }

      // 7. ScrollTrigger for Three Pillars Cards
      if (pillarsSectionRef.current) {
        gsap.from(pillarCardsRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToPillars = () => {
    scrollToElement('#operational-pillars', -70);
  };

  const pillars = [
    {
      id: 'pillar-1',
      number: 'Pillar 01',
      title: 'Consult',
      tagline: 'Audit readiness & SOP implementation',
      description: 'End-to-end audit readiness, deep gap analysis, and tailored SOP architecture engineered for GFSI, BRCGS, FSSC 22000, and ISO standards.',
      image: '/src/assets/images/audit_readiness_inspection_1791962115904.jpg',
      alt: 'Senior Lead Auditor inspecting food processing facility compliance and SOP implementation',
      highlights: [
        'GFSI, BRCGS & FSSC 22000 gap assessments',
        'Custom SOP, HACCP & food safety plan drafting',
        'Mock audit drills with rapid non-conformance closure'
      ],
      linkText: 'Explore Consulting',
      action: () => onNavigate('/services')
    },
    {
      id: 'pillar-2',
      number: 'Pillar 02',
      title: 'Managed',
      tagline: 'Continuous hygiene & CAPA cycles',
      description: 'Ongoing technical oversight, routine sanitation audits, microbiological sampling, and systematic Corrective & Preventive Action (CAPA) tracking.',
      image: '/src/assets/images/food_factory_lab_testing_1791965811882.jpg',
      alt: 'Food science specialist conducting laboratory microbial culture testing',
      highlights: [
        'Scheduled on-site plant verification visits',
        'Swab & environmental microbial monitoring',
        'Root-cause analysis and verified corrective actions'
      ],
      linkText: 'View Managed Programs',
      action: () => onNavigate('/our-process')
    },
    {
      id: 'pillar-3',
      number: 'Pillar 03',
      title: 'Digital Platform',
      tagline: 'Automated workflows & instant registry',
      description: 'Secure centralized software for audit scheduling, evidence vaulting, and instant public QR-code certificate verification.',
      image: '/src/assets/images/digital_compliance_dashboard_preview_1791962116109.jpg',
      alt: 'Digital compliance tablet dashboard showing audit records and certificate registry',
      highlights: [
        'Instant QR-verifiable certificate registry',
        'Multi-facility audit logs & evidence repository',
        'Role-based auditor, client, and executive portals'
      ],
      linkText: 'Open Digital Platform',
      action: () => onNavigate('/digital-compliance')
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#F8FAFC] border-b border-neutral-200/80 overflow-hidden">
      
      {/* Background Decorative Gradient Aura */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 1. TOP HERO: CLEAN, POWERFUL BUSINESS PROPOSITION WITH GSAP ANIMATIONS    */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Business Focus & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Business Categorization Label */}
            <div 
              ref={badgeRef}
              className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#062E21] text-emerald-100 text-[10px] sm:text-xs font-semibold tracking-wide border border-emerald-500/30 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Food Safety Consulting</span>
              <span className="text-emerald-400">·</span>
              <span className="text-white">Managed Compliance</span>
              <span className="text-emerald-400">·</span>
              <span className="text-emerald-200">Verified Certification</span>
            </div>

            {/* Clear, Strong Headline with Dynamic Typewriter & GSAP Stagger */}
            <h1 
              ref={headlineWordsRef}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#062E21] tracking-tight leading-[1.14]"
            >
              Built around{' '}
              <span className="inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                  {displayedText}
                </span>
                <span className="inline-block w-[3px] h-[0.9em] ml-1 bg-emerald-600 align-middle animate-pulse" />
              </span>
              <br className="hidden sm:inline" />
              {' '}in everyday operations.
            </h1>

            {/* Clear Business Description */}
            <p 
              ref={descRef}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal"
            >
              We help organizations strengthen food-safety systems, prepare for audits, develop people and maintain compliance in everyday operations.
            </p>

            {/* Bring the hero image directly after the intro on phones. */}
            <div className="lg:hidden relative rounded-2xl overflow-hidden border border-emerald-100 shadow-lg bg-emerald-50">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="/src/assets/images/hero_food_safety_facility_1791962115935.jpg"
                  alt="Food safety auditor reviewing a clean food production facility"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">On-site plant inspection</p>
                  <p className="text-xs font-bold mt-0.5">BRCGS · FSSC 22000 · ISO 22000 · HACCP</p>
                </div>
              </div>
              <div className="bg-[#062E21] px-3.5 py-2 flex items-center gap-2 text-[10px] font-medium text-emerald-100">
                <Building className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Manufacturing, packaging & cold chains</span>
              </div>
            </div>

            {/* CTAs: 3 Explicit Actions with Staggered Entrance */}
            <div 
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              {/* Primary Action */}
              <button
                onClick={() => onOpenEnquiry()}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] transition-all duration-200 shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer hover:scale-[1.02]"
              >
                <span>Discuss Your Requirements</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Action */}
              <button
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide text-[#062E21] bg-white hover:bg-emerald-50/80 transition-all duration-200 border border-emerald-900/15 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Our Services</span>
                <ChevronRight className="w-4 h-4 text-emerald-700" />
              </button>

              {/* Tertiary Action: Direct Credential Verification */}
              <button
                onClick={() => onNavigate('/verify-certificate')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide text-neutral-700 hover:text-[#062E21] hover:bg-emerald-50/70 transition-colors cursor-pointer"
                title="Search and verify official certificates"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verify Credential</span>
              </button>
            </div>

            {/* Business Metrics Bar with GSAP Entrance */}
            <div 
              ref={metricsRef}
              className="pt-6 border-t border-neutral-200 grid grid-cols-3 gap-6 max-w-xl"
            >
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-[#062E21] transition-colors group-hover:text-emerald-700">
                  99.4%
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">First-Time Audit Pass</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-[#062E21] transition-colors group-hover:text-emerald-700">
                  1,850+
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">Audits Prepared</div>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-[#062E21] transition-colors group-hover:text-emerald-700">
                  GFSI
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">Global Benchmark Alignment</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Real Photography (Clean & Authoritative) */}
          <div className="hidden lg:block lg:col-span-5">
            <div 
              ref={visualRef}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-emerald-900/15 bg-white group"
            >
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-emerald-50/40">
                <img
                  src="/src/assets/images/hero_food_safety_facility_1791962115935.jpg"
                  alt="Lead food safety auditor conducting plant audit in cleanroom facility"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                {/* Clean Top Monogram Seal */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#062E21]/90 backdrop-blur-sm border border-emerald-500/40 text-white shadow-md">
                  <Logo variant="icon-only" size="sm" className="w-5 h-5" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">
                    ESSOR Accredited
                  </span>
                </div>

                {/* Clean Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                    On-Site Plant Inspection
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    BRCGS · FSSC 22000 · ISO 22000 · HACCP Execution
                  </p>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-[#062E21] px-4 py-2.5 flex items-center justify-between text-xs text-neutral-300 border-t border-emerald-700/30">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-100">Manufacturing, Packaging & Cold Chains</span>
                </span>
                <span className="text-emerald-300 font-semibold text-[11px]">Commercial Ready</span>
              </div>
            </div>
          </div>

        </div>

        {/* Smooth Scroll Cue to Operational Pillars */}
        <div className="flex justify-center pt-8">
          <button
            onClick={scrollToPillars}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-emerald-900/10 shadow-2xs text-xs font-semibold text-neutral-700 hover:text-[#062E21] hover:border-emerald-500 transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
            aria-label="Scroll smoothly to Three Pillars"
          >
            <span>Explore The 3 Operational Pillars</span>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-700 transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. THE THREE PILLARS: CLEAN, EDITORIAL, PHOTOGRAPHIC (NOT SIMPLE TEXT)    */}
      {/* ========================================================================= */}
      <div 
        ref={pillarsSectionRef} 
        id="operational-pillars" 
        className="bg-white border-t border-neutral-200/80 py-10 sm:py-12 lg:py-14 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          
          {/* Header of the Pillars Section */}
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Core Operational Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062E21] tracking-tight">
              Three Pillars of Food Safety Delivery
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              A comprehensive system connecting strategic preparation, day-to-day hygiene controls, and instant digital credentialing.
            </p>
          </div>

          {/* The 3 Cards Grid with GSAP Scroll Trigger Entrance */}
          <div className="home-content-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                ref={(el) => {
                  pillarCardsRef.current[idx] = el;
                }}
                className="group flex flex-col rounded-xl bg-[#F8FAFC] border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500 transition-all duration-300"
              >
                {/* Real Photographic Card Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-emerald-50/40">
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Pillar Number Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#062E21]/90 backdrop-blur-xs text-emerald-300 text-[10px] font-bold tracking-wider uppercase border border-emerald-500/40 shadow-xs">
                    {pillar.number}
                  </div>

                  {/* Title & Tagline overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium mt-0.5">
                      {pillar.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-neutral-200">
                      <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide">
                        What We Deliver:
                      </div>
                      <ul className="space-y-1.5">
                        {pillar.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-2">
                    <button
                      onClick={pillar.action}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#062E21] hover:text-white border border-neutral-300 hover:border-[#062E21] text-xs font-bold text-[#062E21] transition-all duration-200 cursor-pointer group/btn shadow-2xs"
                    >
                      <span>{pillar.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};
