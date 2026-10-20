import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Send,
  MessageCircle,
  Award,
  Maximize2,
  Microscope,
  Factory,
  Apple,
  Boxes,
  GraduationCap
} from 'lucide-react';
import { CMSContent } from '../../types';
import { BackendApiService } from '../../services/api';

// Realistic Visual Assets directly imported for Vite Live bundling
import { CertificatePreview } from '../common/CertificatePreview';
import heroFoodSafetyFacility from '../../assets/images/hero_food_safety_facility_1791962115935.jpg';
import freshProduceImage from '../../assets/images/fresh_produce_inspection_1792395403170.jpg';
import packagingLineImage from '../../assets/images/packaging_line_audit_1792395423537.jpg';
import corporateSeminarImage from '../../assets/images/corporate_training_seminar_1792395440966.jpg';
import auditInspectionImage from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';
import labTestingImage from '../../assets/images/food_factory_lab_testing_1791965811882.jpg';

interface HeroSectionProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (initialService?: string) => void;
  onOpenCertModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenCertModal
}) => {
  // Visual tab state
  const [activeVisualTab, setActiveVisualTab] = useState<'CERTIFICATE' | 'PRODUCE' | 'PACKAGING' | 'AUDIT' | 'LAB' | 'TRAINING'>('CERTIFICATE');

  // Callback Form State
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbService, setCbService] = useState('FSSAI & Regulatory Licensing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // GSAP Animation Refs
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const visualCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (trustBadgeRef.current) {
        tl.fromTo(
          trustBadgeRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.3'
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
      }

      if (benefitsRef.current && benefitsRef.current.children.length > 0) {
        tl.fromTo(
          benefitsRef.current.children,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        );
      }

      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );
      }

      if (visualCardRef.current) {
        tl.fromTo(
          visualCardRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          '-=0.5'
        );
      }

      if (statsRef.current && statsRef.current.children.length > 0) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleQuickCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      setSubmitError('Please enter your name and phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');
      await BackendApiService.createEnquiry({
        name: cbName.trim(),
        email: `${cbPhone.replace(/\D/g, '')}@lead.callback`,
        phone: cbPhone.trim(),
        company: 'Requested Quick Phone Callback',
        serviceRequested: cbService,
        facilityType: 'Food Processing / Manufacturing',
        message: `Quick Callback requested for ${cbService}. Contact telephone: ${cbPhone}`
      });
      setSubmitSuccess(true);
      setCbName('');
      setCbPhone('');
      setTimeout(() => {
        setShowCallbackForm(false);
        setSubmitSuccess(false);
      }, 3500);
    } catch {
      setSubmitError('Unable to submit request. Please call +91 6395843850 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F8F5] pt-3 pb-7 sm:pt-10 sm:pb-24 border-b border-[#012B53]/10">
      {/* Full-width food-manufacturing backdrop, balanced to remain crisp and recognizable on mobile and desktop without zoom distortion */}
      <img
        src={heroFoodSafetyFacility}
        alt="Modern food manufacturing facility maintained for safety and quality"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center pointer-events-none select-none"
      />
      {/* Soft gradient wash: ensures text legibility while keeping the real facility background visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/92 via-[#F8FAFC]/80 to-[#F8FAFC]/90 md:bg-gradient-to-r md:from-[#F8FAFC]/90 md:via-[#F8FAFC]/65 md:to-[#012B53]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#F8FAFC]/30" />
      
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#75B72B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-white/70 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive hero container: natural height on mobile without forced zoom stretch */}
        <div className="grid grid-cols-1 content-center items-center py-2.5 sm:py-8 lg:min-h-[calc(100svh-3rem)]">
          
          {/* Left Column: Direct, Simple, Understandable Headline & Actions */}
          <div className="max-w-3xl space-y-2.5 sm:space-y-6 text-left">
            
            {/* Brochure Tagline Badge */}
            <div 
              ref={trustBadgeRef}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-emerald-300 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#75B72B]" aria-hidden="true" />
              <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-neutral-900">
                SIMPLIFYING COMPLIANCE · STRENGTHENING FOOD SAFETY
              </span>
            </div>

            {/* Clear, High-Contrast Main Headline */}
            <h1 
              ref={titleRef}
              className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-[1.15]"
            >
              Prepare for Every Food Safety Audit with{' '}
              <span className="text-[#3E7D25] font-black">
                Confidence.
              </span>{' '}
            </h1>

            {/* Business Subheading in Simple Non-Jargon Language */}
            <p 
              ref={descRef}
              className="relative z-20 block max-w-2xl rounded-xl border border-white/90 bg-white/95 px-3 py-2.5 text-xs sm:text-base font-medium leading-relaxed text-neutral-800 shadow-md sm:px-5 sm:py-4 sm:text-lg"
            >
              ESSOR helps food businesses build audit-ready systems for <strong className="font-bold text-[#3E7D25]">FSSAI, HACCP, ISO 22000 and BRCGS</strong>. Get practical guidance, organised documentation and on-site support your team can use with confidence.
            </p>

            {/* Highlights: compact on mobile to keep hero viewport-friendly */}
            <div 
              ref={benefitsRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2.5 pt-0.5 sm:pt-1"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3E7D25] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900">Practical On-Site Support</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3E7D25] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900">Clear Audit Roadmap</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3E7D25] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900">Documented Systems</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3E7D25] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900">Confident, Trained Teams</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#3E7D25] shrink-0" />
                <span className="text-xs font-bold text-neutral-900">Affordable Pricing</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#3E7D25] shrink-0" />
                <span className="text-xs font-bold text-neutral-900">QR Verifiable Certs</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div 
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1 sm:pt-2"
            >
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#012B53] via-[#012B53] to-[#3E7D25] hover:opacity-95 shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Your Audit Readiness Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant Call / WhatsApp */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:+916395843850"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold text-neutral-900 bg-white hover:bg-emerald-50 border border-emerald-600/30 shadow-xs transition-all active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3E7D25]" />
                  <span>Call: 6395843850</span>
                </a>

                <a
                  href="https://wa.me/916395843850?text=Hi%20ESSOR%20Team%2C%20I%20would%20like%20to%20consult%20regarding%20Food%20Safety%20%26%20Audit%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all active:scale-[0.98]"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="hidden sm:flex pt-2 sm:pt-3 border-t border-neutral-200 text-[11px] sm:text-xs text-neutral-700 flex-wrap items-center gap-y-1.5 gap-x-4">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span className="font-bold text-neutral-900">+91 6395843850</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#3E7D25]" />
                <a href="mailto:business@essorcompliance.com" className="hover:text-emerald-700 font-semibold text-neutral-800 transition-colors">
                  business@essorcompliance.com
                </a>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span className="font-medium text-neutral-800">Doon IT Park, Dehradun</span>
              </div>
            </div>

          </div>

          {/* Detailed service choices live in the dedicated Services section below the hero. */}
          <div ref={visualCardRef} className="hidden">

            {/* Simple service overview replaces the certificate preview for a faster, less cluttered first impression. */}
            <div className="overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-xl">
              <div className="relative h-48 sm:h-56">
                <img
                  src={auditInspectionImage}
                  alt="Food safety professional reviewing hygiene standards on a production floor"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012B53]/95 via-[#012B53]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">How we help</span>
                  <h2 className="mt-1 text-xl font-black leading-tight">Clear support for safer food operations.</h2>
                </div>
              </div>

              <div className="grid divide-y divide-emerald-900/10">
                <button
                  type="button"
                  onClick={() => onNavigate('/services/audit-readiness')}
                  className="group flex items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-emerald-50 cursor-pointer"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#3E7D25]"><ShieldCheck className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-neutral-900">Audit readiness</span><span className="block text-xs text-neutral-600">Identify gaps and prepare with confidence.</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#3E7D25] transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry('Plant Hygiene & Food Safety')}
                  className="group flex items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-emerald-50 cursor-pointer"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#012B53]"><Factory className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-neutral-900">Plant hygiene</span><span className="block text-xs text-neutral-600">Practical on-site systems that work.</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#3E7D25] transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/training')}
                  className="group flex items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-emerald-50 cursor-pointer"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><GraduationCap className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-neutral-900">Team training</span><span className="block text-xs text-neutral-600">Build capability across every shift.</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#3E7D25] transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
            
            {/* Visual Card with Tabs */}
            <div className="hidden">
              
              {/* Tab Selector Header (Scrollable tabs so users see every aspect of the business) */}
              <div className="p-2 bg-[#012B53] text-white flex items-center gap-1 overflow-x-auto text-xs font-bold no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveVisualTab('CERTIFICATE')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeVisualTab === 'CERTIFICATE' 
                      ? 'bg-[#3E7D25] text-white font-extrabold shadow-xs' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Certificate Sample</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisualTab('PRODUCE')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeVisualTab === 'PRODUCE' 
                      ? 'bg-[#3E7D25] text-white font-extrabold shadow-xs' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Apple className="w-3.5 h-3.5" />
                  <span>Produce Quality</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisualTab('PACKAGING')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeVisualTab === 'PACKAGING' 
                      ? 'bg-[#3E7D25] text-white font-extrabold shadow-xs' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Boxes className="w-3.5 h-3.5" />
                  <span>Packaging Line</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisualTab('AUDIT')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeVisualTab === 'AUDIT' 
                      ? 'bg-[#3E7D25] text-white font-extrabold shadow-xs' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Factory className="w-3.5 h-3.5" />
                  <span>Plant Floor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisualTab('LAB')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeVisualTab === 'LAB' 
                      ? 'bg-[#3E7D25] text-white font-extrabold shadow-xs' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Microscope className="w-3.5 h-3.5" />
                  <span>Microbiology Lab</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisualTab('TRAINING')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    activeVisualTab === 'TRAINING' 
                      ? 'bg-[#3E7D25] text-white font-extrabold shadow-xs' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Training Class</span>
                </button>
              </div>

              {/* Tab 1: Certificate Sample Preview */}
              {activeVisualTab === 'CERTIFICATE' && (
                <div className="relative group bg-neutral-900 cursor-pointer" onClick={() => onOpenCertModal?.()}>
                  <CertificatePreview compact className="h-72 sm:h-80 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black">
                            Sample Credential
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-200">
                            ECSFSM-LA241116
                          </span>
                        </div>
                        <p className="text-xs text-white/90 mt-1 font-semibold">
                          Aarav Sharma · Lead Food Safety Auditor (ISO 22000)
                        </p>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-bold text-white flex items-center gap-1.5 border border-white/30">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Fresh Produce Quality Inspection */}
              {activeVisualTab === 'PRODUCE' && (
                <div className="relative group bg-neutral-900">
                  <img
                    src={freshProduceImage}
                    alt="Fresh produce harvest and vegetable quality safety inspection"
                    className="w-full h-72 sm:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                          Harvest &amp; Produce Quality
                        </span>
                        <p className="text-xs text-white/90 mt-1 font-semibold">
                          Raw material inspection, pesticide residues, and freshness sorting
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('/services/audit-readiness')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs cursor-pointer"
                      >
                        Explore Audit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Packaging & Processing Line */}
              {activeVisualTab === 'PACKAGING' && (
                <div className="relative group bg-neutral-900">
                  <img
                    src={packagingLineImage}
                    alt="Automated packaging conveyor line food safety audit"
                    className="w-full h-72 sm:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white">
                          Packaging Line Audit
                        </span>
                        <p className="text-xs text-white/90 mt-1 font-semibold">
                          Automated conveyors, seal integrity, and foreign body control
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('/services/managed-support')}
                        className="px-3 py-1.5 rounded-lg bg-[#3E7D25] hover:bg-[#256629] text-xs font-bold text-white shadow-xs cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: On-Site Plant Floor Audit */}
              {activeVisualTab === 'AUDIT' && (
                <div className="relative group bg-neutral-900">
                  <img
                    src={auditInspectionImage}
                    alt="ESSOR Auditor inspecting stainless steel food equipment"
                    className="w-full h-72 sm:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                          On-Site Factory Hygiene
                        </span>
                        <p className="text-xs text-white/90 mt-1 font-semibold">
                          Sanitation verification, machinery inspection, and physical PRP gap closure
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('/services/audit-readiness')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs cursor-pointer"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Microbial Lab Verification */}
              {activeVisualTab === 'LAB' && (
                <div className="relative group bg-neutral-900">
                  <img
                    src={labTestingImage}
                    alt="Microbiology laboratory test for food pathogens"
                    className="w-full h-72 sm:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-500 text-white">
                          Microbiology Testing
                        </span>
                        <p className="text-xs text-white/90 mt-1 font-semibold">
                          Pathogen swab screening, shelf-life studies, and water potability testing
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry('Microbiology Testing')}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white shadow-xs cursor-pointer"
                      >
                        Book Lab Test
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Corporate Training Seminar */}
              {activeVisualTab === 'TRAINING' && (
                <div className="relative group bg-neutral-900">
                  <img
                    src={corporateSeminarImage}
                    alt="Corporate Food Safety Training Workshop"
                    className="w-full h-72 sm:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-500 text-white">
                          Workforce Training
                        </span>
                        <p className="text-xs text-white/90 mt-1 font-semibold">
                          HACCP &amp; ISO 22000 interactive workshops with verifiable certifications
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('/training')}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-xs cursor-pointer"
                      >
                        Browse Courses
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Card Footer: Verification Link */}
              <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs">
                <span className="text-neutral-700 font-medium">
                  Official Registry ID: <strong className="text-neutral-900 font-bold">ECSFSM-LA241116</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/verify-certificate?cert=ECSFSM-LA241116')}
                  className="text-[#3E7D25] hover:text-neutral-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Test Live QR Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Quick Callback Drawer Trigger */}
            <div className="p-3.5 rounded-xl bg-white border border-emerald-900/10 shadow-xs flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-neutral-900 block">Need an immediate audit consultation?</span>
                <span className="text-[11px] text-neutral-600">Our food safety specialists respond within 24 hours.</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCallbackForm(!showCallbackForm)}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-[#3E7D25] hover:text-white text-xs font-bold text-[#3E7D25] border border-emerald-300 transition-all cursor-pointer shrink-0"
              >
                {showCallbackForm ? 'Close Form' : 'Request Callback'}
              </button>
            </div>

            {/* Quick Callback Inline Form */}
            {showCallbackForm && (
              <form onSubmit={handleQuickCallback} className="p-4 rounded-xl bg-white border-2 border-[#3E7D25] shadow-md space-y-3">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Request 15-Minute Audit Callback
                </h4>
                
                {submitSuccess ? (
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Callback requested! Our lead specialist will call you shortly.</span>
                  </div>
                ) : (
                  <>
                    {submitError && (
                      <p className="text-xs text-red-600">{submitError}</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={cbName}
                        onChange={(e) => setCbName(e.target.value)}
                        required
                        className="px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#3E7D25]"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={cbPhone}
                        onChange={(e) => setCbPhone(e.target.value)}
                        required
                        className="px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#3E7D25]"
                      />
                    </div>
                    <select
                      value={cbService}
                      onChange={(e) => setCbService(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#3E7D25] bg-white"
                    >
                      <option value="FSSAI & Regulatory Licensing">FSSAI &amp; Regulatory Licensing</option>
                      <option value="ISO 22000 / FSSC 22000 Readiness">ISO 22000 / FSSC 22000 Readiness</option>
                      <option value="BRCGS Food Safety Issue 9">BRCGS Food Safety Issue 9</option>
                      <option value="HACCP & GMP Plant Audit">HACCP &amp; GMP Plant Audit</option>
                      <option value="Microbiology Lab Swab Testing">Microbiology Lab Swab Testing</option>
                      <option value="Workforce Certified Training">Workforce Certified Training</option>
                    </select>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-lg bg-[#3E7D25] hover:bg-[#256629] text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : 'Confirm Callback Request'}</span>
                    </button>
                  </>
                )}
              </form>
            )}

          </div>

        </div>

        {/* Bottom Trust Metric Badges */}
        <div 
          ref={statsRef}
          className="mt-6 pt-5 sm:mt-14 sm:pt-8 border-t border-emerald-900/10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4"
        >
          <div className="p-2.5 sm:p-4 rounded-xl bg-white border border-emerald-900/10 shadow-2xs">
            <span className="text-xl sm:text-3xl font-black text-neutral-900 block">1,850+</span>
            <span className="text-[10px] sm:text-xs text-neutral-600 font-medium">Audits &amp; Assessments Prepared</span>
          </div>
          <div className="p-2.5 sm:p-4 rounded-xl bg-white border border-emerald-900/10 shadow-2xs">
            <span className="text-xl sm:text-3xl font-black text-[#3E7D25] block">99.4%</span>
            <span className="text-[10px] sm:text-xs text-neutral-600 font-medium">First-Time Audit Pass Rate</span>
          </div>
          <div className="p-2.5 sm:p-4 rounded-xl bg-white border border-emerald-900/10 shadow-2xs">
            <span className="text-xl sm:text-3xl font-black text-neutral-900 block">16+</span>
            <span className="text-[10px] sm:text-xs text-neutral-600 font-medium">Accredited Training Modules</span>
          </div>
          <div className="p-2.5 sm:p-4 rounded-xl bg-white border border-emerald-900/10 shadow-2xs">
            <span className="text-xl sm:text-3xl font-black text-[#3E7D25] block">&lt;24 Hrs</span>
            <span className="text-[10px] sm:text-xs text-neutral-600 font-medium">Emergency Audit Support Response</span>
          </div>
        </div>

      </div>
    </section>
  );
};
