import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  ChevronRight, 
  Sparkles,
  Phone,
  Mail,
  Layers,
  GraduationCap,
  Compass,
  Cpu,
  PhoneCall,
  X,
  Award,
  ArrowUp,
  MapPin
} from 'lucide-react';
import { scrollToElement } from '../../hooks/useSmoothScroll';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (initialService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenEnquiry
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Smooth scroll progress & sticky state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      setShowBackToTop(scrollY > 400);

      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll cleanly when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', path: '/services', icon: Layers },
    { label: 'Training', path: '/training', icon: GraduationCap },
    { label: 'Our Process', path: '/our-process', icon: Compass },
    { label: 'Digital Tools', path: '/digital-compliance', icon: Cpu },
    { label: 'Verify Certificate', path: '/verify-certificate', icon: ShieldCheck, badge: 'Live' },
    { label: 'About', path: '/about', icon: Award },
    { label: 'Contact', path: '/contact', icon: PhoneCall }
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const scrollToTop = () => {
    scrollToElement('body', 0);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 0. SMOOTH SCROLL PROGRESS INDICATOR BAR                                   */}
      {/* ========================================================================= */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #012B53 0%, #0C5A91 40%, #16A34A 80%, #A4D65E 100%)',
          boxShadow: '0 0 10px rgba(34, 197, 94, 0.45)'
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 1. TOP MICRO-UTILITY STRIP (Smooth Right-to-Left Ticker Tape)             */}
      {/* ========================================================================= */}
      <div 
        className="bg-[#012542] text-emerald-50 text-[11px] py-2 border-b border-[#75B72B]/30 relative z-40 overflow-hidden select-none"
        role="region"
        aria-label="Live Compliance Announcement and Contact Ticker"
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Static industry context */}
          <div className="hidden md:flex shrink-0 items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15 shadow-xs z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide whitespace-nowrap">
              FOOD BUSINESS COMPLIANCE
            </span>
          </div>

          {/* Marquee Viewport with Edge Fade Gradients */}
          <div className="relative flex-1 overflow-hidden min-w-0">
            {/* Left fade vignette */}
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-[#012542] to-transparent z-10 pointer-events-none" />
            {/* Right fade vignette */}
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-l from-[#012542] to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Moving Track (Right to Left) */}
            <div className="animate-nav-ticker flex items-center py-0.5 whitespace-nowrap">
              {/* Copy 1 */}
              <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
                {/* Contact Phone */}
                <a
                  href="tel:+916395843850"
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors group/item cursor-pointer"
                  title="Call or WhatsApp: +91 63958 43850"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                    Speak to an Expert
                  </span>
                  <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover/item:scale-110 transition-transform shrink-0" />
                  <span className="font-bold text-white tracking-wide underline decoration-emerald-500/40 underline-offset-2">
                    +91 63958 43850
                  </span>
                </a>

                <span className="text-emerald-700/80">â—†</span>

                {/* Business Email */}
                <a
                  href="mailto:business@essorcompliance.com"
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors group/item cursor-pointer"
                  title="Business & Advisory: business@essorcompliance.com"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/30">
                    Audit &amp; Compliance
                  </span>
                  <Mail className="w-3.5 h-3.5 text-white group-hover/item:scale-110 transition-transform shrink-0" />
                  <span className="font-semibold text-white group-hover/item:underline underline-offset-2">
                    business@essorcompliance.com
                  </span>
                </a>

                <span className="text-emerald-700/80">â—†</span>

                {/* Training Email */}
                <a
                  href="mailto:training@essorcompliance.com"
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors group/item cursor-pointer"
                  title="Training Programs: training@essorcompliance.com"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                    Team Training
                  </span>
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-300 group-hover/item:scale-110 transition-transform shrink-0" />
                  <span className="font-semibold text-emerald-100 group-hover/item:text-white underline decoration-emerald-500/40 underline-offset-2">
                    training@essorcompliance.com
                  </span>
                </a>

                <span className="text-emerald-700/80">â—†</span>

                {/* Corporate Address */}
                <span className="inline-flex items-center gap-2 text-emerald-100">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-900/70 text-emerald-200 border border-emerald-700/50">
                    Serving Food Businesses
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-normal text-emerald-200/90">
                    Manufacturers · Dairy · Spices · Bakery · Packaging
                  </span>
                </span>

                <span className="text-emerald-700/80">â—†</span>

                {/* Standards text */}
                <span className="inline-flex items-center gap-2 text-emerald-100">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                    Food Safety Standards
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-bold text-white">FSSAI, ISO 22000 & BRCGS Readiness</span>
                  <span className="text-emerald-300/80">Â· ISO 22000 Â· FSSC 22000 Â· HACCP Â· US FDA FSMA</span>
                </span>

                <span className="text-emerald-700/80">â—†</span>

                {/* Deliverables summary text */}
                <span className="inline-flex items-center gap-2 text-emerald-100">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="font-medium text-emerald-100">
                    Gap Assessment Â· Mock Audits Â· HACCP Systems & Team Training
                  </span>
                </span>

                <span className="text-emerald-700/80">â—†</span>

                {/* Consultation prompt text */}
                <span className="inline-flex items-center gap-2 text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">48-Hour Preliminary Readiness Assessment</span>
                  <span className="text-emerald-300/80">for Food Processors, Packagers & Exporters</span>
                </span>
              </div>

              {/* Copy 2 (Seamless Infinite Loop) */}
              <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
                {/* Contact Phone */}
                <a
                  href="tel:+916395843850"
                  tabIndex={-1}
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors group/item cursor-pointer"
                  title="Call or WhatsApp: +91 63958 43850"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                    Call / WhatsApp
                  </span>
                  <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover/item:scale-110 transition-transform shrink-0" />
                  <span className="font-bold text-white tracking-wide underline decoration-emerald-500/40 underline-offset-2">
                    +91 63958 43850
                  </span>
                </a>

                <span className="text-emerald-700/80">â—†</span>

                {/* Business Email */}
                <a
                  href="mailto:business@essorcompliance.com"
                  tabIndex={-1}
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors group/item cursor-pointer"
                  title="Business & Advisory: business@essorcompliance.com"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/30">
                    Business Inquiries
                  </span>
                  <Mail className="w-3.5 h-3.5 text-white group-hover/item:scale-110 transition-transform shrink-0" />
                  <span className="font-semibold text-white group-hover/item:underline underline-offset-2">
                    business@essorcompliance.com
                  </span>
                </a>

                <span className="text-emerald-700/80">â—†</span>

                {/* Training Email */}
                <a
                  href="mailto:training@essorcompliance.com"
                  tabIndex={-1}
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors group/item cursor-pointer"
                  title="Training Programs: training@essorcompliance.com"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                    Training Academy
                  </span>
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-300 group-hover/item:scale-110 transition-transform shrink-0" />
                  <span className="font-semibold text-emerald-100 group-hover/item:text-white underline decoration-emerald-500/40 underline-offset-2">
                    training@essorcompliance.com
                  </span>
                </a>

                <span className="text-emerald-700/80">â—†</span>

                {/* Corporate Address */}
                <span className="inline-flex items-center gap-2 text-emerald-100">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-900/70 text-emerald-200 border border-emerald-700/50">
                    Serving Food Businesses
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-normal text-emerald-200/90">
                    Manufacturers · Dairy · Spices · Bakery · Packaging
                  </span>
                </span>

                <span className="text-emerald-700/80">â—†</span>

                {/* Standards text */}
                <span className="inline-flex items-center gap-2 text-emerald-100">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/25 text-emerald-300 border border-emerald-500/40">
                    Food Safety Standards
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-bold text-white">FSSAI, ISO 22000 & BRCGS Readiness</span>
                  <span className="text-emerald-300/80">Â· ISO 22000 Â· FSSC 22000 Â· HACCP Â· US FDA FSMA</span>
                </span>

                <span className="text-emerald-700/80">â—†</span>

                {/* Deliverables summary text */}
                <span className="inline-flex items-center gap-2 text-emerald-100">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="font-medium text-emerald-100">
                    Gap Assessment Â· Mock Audits Â· HACCP Systems & Team Training
                  </span>
                </span>

                <span className="text-emerald-700/80">â—†</span>

                {/* Consultation prompt text */}
                <span className="inline-flex items-center gap-2 text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">48-Hour Preliminary Readiness Assessment</span>
                  <span className="text-emerald-300/80">for Food Processors, Packagers & Exporters</span>
                </span>
              </div>
            </div>
          </div>

          {/* Static business-focused contact action */}
          <div className="shrink-0 z-10 flex items-center">
            <button
              onClick={() => onOpenEnquiry('Audit & Certification Readiness')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#75B72B] hover:bg-[#A4D65E] text-[#012542] border border-[#B5DE7A] text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              title="Request a plant-readiness consultation"
            >
              <PhoneCall className="w-3 h-3" />
              <span className="hidden sm:inline">Business</span>
              <span>Consultation</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN FLOATING / STICKY GLASS HEADER                                    */}
      {/* ========================================================================= */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-emerald-900/10 shadow-lg shadow-emerald-950/5 py-2.5' 
            : 'bg-[#F8FAFC]/95 backdrop-blur-md border-b border-emerald-900/8 py-3.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 xl:gap-4">
            
            {/* Brand Logo */}
            <div 
              onClick={() => handleLinkClick('/')}
              className="cursor-pointer shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-xl p-1 -ml-1 transition-transform duration-300 active:scale-95"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleLinkClick('/')}
              aria-label="ESSOR Compliance Solutions Home"
            >
              <Logo size="md" />
            </div>

            {/* Desktop Navigation: Trending Floating Island Pill Menu */}
            <nav 
              className="hidden xl:flex min-w-0 items-center p-2 rounded-full bg-white/95 border border-emerald-900/10 shadow-xs backdrop-blur-md text-sm font-semibold transition-all duration-300"
              aria-label="Primary Navigation"
            >
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                const isVerify = link.path === '/verify-certificate';
                
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`relative flex items-center gap-1.5 px-2.5 2xl:px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#012B53] text-white shadow-sm scale-100' 
                        : 'text-neutral-700 hover:text-[#012B53] hover:bg-emerald-50/80 hover:scale-102'
                    }`}
                  >
                    {isVerify && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                    <span>{link.label}</span>
                    {link.badge && !isActive && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-[#064E3B] border border-emerald-200">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Quick Action Buttons */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">
              {/* Secure client, trainer and consultant workspace */}
              <button
                onClick={() => handleLinkClick('/login')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#012B53] hover:text-[#0C5A91] bg-white hover:bg-[#F3F8EC] border border-[#012B53]/15 shadow-2xs transition-all duration-200 active:scale-95 cursor-pointer"
                title="Access the ESSOR client and team portal"
              >
                <Lock className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span>Portal Login</span>
              </button>

              {/* Discuss Requirements CTA */}
              <button
                onClick={() => onOpenEnquiry()}
                className="group relative inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] active:scale-95 transition-all duration-300 shadow-md shadow-emerald-900/20 ring-1 ring-emerald-400/30 cursor-pointer"
              >
                <span>Discuss requirements</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile Animated Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative inline-flex items-center justify-center p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#0B1713] border border-neutral-300 shadow-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span 
                    className={`h-0.5 w-full bg-[#0B1713] rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                      mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`} 
                  />
                  <span 
                    className={`h-0.5 w-full bg-[#0B1713] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`} 
                  />
                  <span 
                    className={`h-0.5 w-full bg-[#0B1713] rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`} 
                  />
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. TRENDING MOBILE DRAWER: SILKY SMOOTH OPENING ANIMATION                 */}
      {/* ========================================================================= */}
      {/* Backdrop with Progressive Blur */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sliding Sheet Container with Spring Easing */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#FAF9F5] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden flex flex-col will-change-transform ${
          mobileMenuOpen 
            ? 'translate-x-0 opacity-100 pointer-events-auto' 
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200 bg-white">
          <div onClick={() => handleLinkClick('/')} className="cursor-pointer">
            <Logo size="sm" />
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer active:scale-90"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Accredited Trust Banner in Drawer */}
        <div className="bg-[#012B53] px-5 py-2.5 flex items-center justify-between text-xs text-neutral-300 border-b border-emerald-700/40">
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accredited GFSI Practice</span>
          </span>
          <span className="text-[10px] text-emerald-300/80">Ver. 2026</span>
        </div>

        {/* Scrollable Navigation Links List with Staggered Slide In */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
            Navigation
          </div>

          {navLinks.map((link, idx) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            const Icon = link.icon;
            const isVerify = link.path === '/verify-certificate';

            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                style={{
                  transitionDelay: mobileMenuOpen ? `${idx * 40 + 80}ms` : '0ms'
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer transform ${
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                } ${
                  isActive
                    ? 'bg-[#012B53] text-white shadow-xs'
                    : isVerify
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
                    : 'text-neutral-800 hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${
                    isActive 
                      ? 'bg-emerald-900/60 text-emerald-300' 
                      : isVerify 
                      ? 'bg-white text-emerald-700' 
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {link.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                </div>
              </button>
            );
          })}

          {/* Secure portal access on mobile */}
          <div 
            style={{
              transitionDelay: mobileMenuOpen ? `${navLinks.length * 40 + 100}ms` : '0ms'
            }}
            className={`pt-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
              ESSOR Portal
            </div>
            <button
              onClick={() => handleLinkClick('/login')}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-white border border-[#012B53]/15 text-sm font-semibold text-[#012B53] hover:border-[#3E7D25] transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-[#F3F8EC] text-[#3E7D25]">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div>Portal Login</div>
                  <div className="text-[10px] text-neutral-500 font-normal">For clients, consultants and trainers</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div 
          style={{
            transitionDelay: mobileMenuOpen ? '420ms' : '0ms'
          }}
          className={`p-4 border-t border-neutral-200 bg-white space-y-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {/* Big CTA */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEnquiry();
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] shadow-md shadow-emerald-950/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Discuss Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Direct Phone & Email Assistance for Mobile */}
          <div className="space-y-1.5 pt-1">
            <a
              href="tel:+916395843850"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call / WhatsApp: +91 63958 43850</span>
            </a>

            <div className="grid grid-cols-1 gap-1.5 pt-1">
              <a
                href="mailto:business@essorcompliance.com"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="font-semibold text-emerald-900">Business:</span>
                </span>
                <span className="text-[11px] text-neutral-600">business@essorcompliance.com</span>
              </a>

              <a
                href="mailto:training@essorcompliance.com"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#012B53] shrink-0" />
                  <span className="font-bold text-neutral-900">Training:</span>
                </span>
                <span className="text-[11px] text-neutral-600">training@essorcompliance.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SMOOTH BACK TO TOP FLOATING BUTTON                                     */}
      {/* ========================================================================= */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#012B53] text-emerald-300 border border-emerald-500/40 shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:bg-[#012542] hover:scale-110 active:scale-90 ${
          showBackToTop ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll back to top"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
};
