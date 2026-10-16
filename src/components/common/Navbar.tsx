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
  ArrowUp
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
    { label: 'About', path: '/about', icon: Award },
    { label: 'Services', path: '/services', icon: Layers },
    { label: 'Training', path: '/training', icon: GraduationCap },
    { label: 'Verify Credential', path: '/verify-certificate', icon: ShieldCheck, badge: 'Live' },
    { label: 'Our Process', path: '/our-process', icon: Compass },
    { label: 'Digital Tools', path: '/digital-compliance', icon: Cpu },
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
          background: 'linear-gradient(90deg, #166534 0%, #22C55E 50%, #BBF7D0 100%)',
          boxShadow: '0 0 8px rgba(74, 222, 128, 0.55)'
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 1. TOP MICRO-UTILITY STRIP (Executive accredited banner)                  */}
      {/* ========================================================================= */}
      <div className="bg-[#14532D] text-green-50 text-[11px] py-1.5 border-b border-green-200/20 hidden sm:block relative z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-green-200 font-semibold">GFSI & BRCGS</span> Accredited Practice
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400 hidden xl:inline">
              Global Compliance, Auditing & Technical Advisory
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:enquiries@essorcompliance.com"
              className="hidden lg:flex items-center gap-1 text-green-50 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-green-300" />
              <span className="font-medium">enquiries@essorcompliance.com</span>
            </a>
            <span className="hidden lg:inline text-neutral-700">|</span>
            <a 
              href="tel:+442079460920" 
              className="flex items-center gap-1 text-green-50 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-green-300" />
              <span className="font-medium">+44 20 7946 0920</span>
            </a>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => handleLinkClick('/login')}
              className="flex items-center gap-1 text-green-100 hover:text-white transition-colors font-medium cursor-pointer"
            >
              <Lock className="w-3 h-3 text-green-300" />
              <span>Portals Login</span>
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
            ? 'bg-[#FAF9F5]/92 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-lg shadow-black/5 py-2' 
            : 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-neutral-200/80 py-3.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 xl:gap-4">
            
            {/* Brand Logo */}
            <div 
              onClick={() => handleLinkClick('/')}
              className="cursor-pointer shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl p-1 -ml-1 transition-transform duration-300 active:scale-95"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleLinkClick('/')}
              aria-label="ESSOR Compliance Solutions Home"
            >
              <Logo size="md" />
            </div>

            {/* Desktop Navigation: Trending Floating Island Pill Menu */}
            <nav 
              className="hidden xl:flex min-w-0 items-center p-1 rounded-full bg-white/90 border border-neutral-200 shadow-sm backdrop-blur-md text-xs font-semibold transition-all duration-300"
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
                        ? 'bg-[#0A1310] text-[#F5DC9A] shadow-xs scale-100' 
                        : 'text-neutral-700 hover:text-[#0B1713] hover:bg-neutral-100/90 hover:scale-102'
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
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FAF0D4] text-[#876212] border border-[#D4AF37]/30">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Quick Action Buttons */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">
              {/* Portals Login Pill */}
              <button
                onClick={() => handleLinkClick('/login')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-neutral-800 hover:text-black bg-white hover:bg-neutral-100 border border-neutral-200 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                title="Access Auditor, Client, or Trainer Portal"
              >
                <Lock className="w-3.5 h-3.5 text-[#C49A32]" />
                <span>Portals</span>
              </button>

              {/* Discuss Requirements CTA */}
              <button
                onClick={() => onOpenEnquiry()}
                className="group relative inline-flex items-center gap-2 whitespace-nowrap px-3.5 2xl:px-4.5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#166534] via-[#15803D] to-[#4ADE80] hover:brightness-105 active:scale-95 transition-all duration-300 shadow-md shadow-green-700/20 ring-1 ring-green-100/70 cursor-pointer"
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
        <div className="bg-[#0A1310] px-5 py-2.5 flex items-center justify-between text-xs text-neutral-300 border-b border-[#D4AF37]/30">
          <span className="flex items-center gap-1.5 text-[#F5DC9A] font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Accredited GFSI Practice</span>
          </span>
          <span className="text-[10px] text-neutral-400">Ver. 2026</span>
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
                    ? 'bg-[#0A1310] text-[#F5DC9A] shadow-xs'
                    : isVerify
                    ? 'bg-[#FAF0D4]/70 text-[#876212] border border-[#D4AF37]/40 hover:bg-[#FAF0D4]'
                    : 'text-neutral-800 hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${
                    isActive 
                      ? 'bg-[#182C24] text-[#D4AF37]' 
                      : isVerify 
                      ? 'bg-white text-[#C49A32]' 
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
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                </div>
              </button>
            );
          })}

          {/* Quick Access to Portals */}
          <div 
            style={{
              transitionDelay: mobileMenuOpen ? `${navLinks.length * 40 + 100}ms` : '0ms'
            }}
            className={`pt-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
              Secure Portals
            </div>
            <button
              onClick={() => handleLinkClick('/login')}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-white border border-neutral-200 text-sm font-semibold text-neutral-800 hover:border-[#D4AF37] transition-all cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-neutral-100 text-[#C49A32]">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div>Portals Sign In</div>
                  <div className="text-[10px] text-neutral-500 font-normal">Auditor, Client, Trainer</div>
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
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#0A1310] bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] shadow-md shadow-[#D4AF37]/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Discuss Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Direct Phone Assistance */}
          <a
            href="tel:+442079460920"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#876212]" />
            <span>24/7 Advisory: +44 20 7946 0920</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SMOOTH BACK TO TOP FLOATING BUTTON                                     */}
      {/* ========================================================================= */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#0A1310] text-[#F5DC9A] border border-[#D4AF37]/50 shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:bg-black hover:scale-110 active:scale-90 ${
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
