import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Building2, 
  Compass, 
  Microscope, 
  QrCode, 
  ChevronUp, 
  Sparkles,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { scrollToElement } from '../../hooks/useSmoothScroll';
import { Logo } from './Logo';

interface SectionGuide {
  id: string;
  targetId: string;
  number: string;
  title: string;
  shortDesc: string;
  pillar: string;
  icon: React.ReactNode;
}

const BUSINESS_STAGES: SectionGuide[] = [
  {
    id: 'hero',
    targetId: '#top',
    number: '01',
    title: 'Consult & Core Pillars',
    shortDesc: 'Practical food safety execution & 3 operating pillars',
    pillar: 'Pillar 1: Consult',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    id: 'sectors',
    targetId: '#sectors-showcase',
    number: '02',
    title: 'Facility Environments',
    shortDesc: 'Processing cleanrooms, dairy, bakery, meat & packaging',
    pillar: 'Facility Scope',
    icon: <Building2 className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    id: 'services',
    targetId: '#services-section',
    number: '03',
    title: 'Compliance Services',
    shortDesc: 'Gap assessment, audit readiness & SOP engineering',
    pillar: 'Pillar 1 & 2',
    icon: <Layers className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    id: 'roadmap',
    targetId: '#process-section',
    number: '04',
    title: '6-Stage Roadmap',
    shortDesc: 'From first assessment to continuous compliance',
    pillar: 'Execution Path',
    icon: <Compass className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    id: 'why-essor',
    targetId: '#why-essor-section',
    number: '05',
    title: 'Floor Verification',
    shortDesc: 'Physical factory floor proof & lead auditor coaching',
    pillar: 'Pillar 2: Managed',
    icon: <Check className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    id: 'academy',
    targetId: '#training-section',
    number: '06',
    title: 'Lab & Team Academy',
    shortDesc: 'Microbiology testing & workforce capability programs',
    pillar: 'Capability Academy',
    icon: <Microscope className="w-3.5 h-3.5 text-emerald-400" />
  },
  {
    id: 'digital',
    targetId: '#digital-platform-section',
    number: '07',
    title: 'Digital Platform',
    shortDesc: 'Instant tamper-proof certificate QR verification',
    pillar: 'Pillar 3: Platform',
    icon: <QrCode className="w-3.5 h-3.5 text-emerald-400" />
  }
];

interface BusinessScrollNavigatorProps {
  onOpenEnquiry: (service?: string) => void;
}

export const BusinessScrollNavigator: React.FC<BusinessScrollNavigatorProps> = ({
  onOpenEnquiry
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show guide only after scrolling past the first 250px of hero
      setIsVisible(scrollY > 250);

      // Determine active section based on scroll position
      const offsets = BUSINESS_STAGES.map((stage) => {
        if (stage.targetId === '#top') return 0;
        const el = document.querySelector(stage.targetId);
        if (!el) return Infinity;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      });

      const viewportCenter = window.scrollY + window.innerHeight * 0.35;
      let currentIndex = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (viewportCenter >= offsets[i] - 100) {
          currentIndex = i;
        }
      }
      setActiveStageIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const currentStage = BUSINESS_STAGES[activeStageIndex] || BUSINESS_STAGES[0];

  const handleJumpTo = (targetId: string) => {
    if (targetId === '#top') {
      scrollToElement('body', 0);
    } else {
      scrollToElement(targetId, -85);
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Floating Modern Pill Dock */}
      <aside 
        aria-label="Interactive Business Roadmap Guide"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-xl w-full transition-all duration-300"
      >
        <div className="bg-[#041F16]/95 backdrop-blur-md text-white border border-emerald-500/40 rounded-2xl shadow-2xl shadow-emerald-950/60 p-2 sm:p-2.5 flex items-center justify-between gap-3 ring-1 ring-emerald-400/25">
          
          {/* Active Business Stage Info */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 text-left flex-1 min-w-0 pl-1.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#062E21] border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs group-hover:border-emerald-400 transition-colors">
              {currentStage.icon}
            </div>
            
            <div className="min-w-0 truncate">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                <span>{currentStage.pillar}</span>
                <span className="text-emerald-500/60">·</span>
                <span className="text-neutral-300">Stage {currentStage.number} / 07</span>
              </div>
              <p className="text-xs font-bold text-white truncate group-hover:text-emerald-200 transition-colors">
                {currentStage.title}: <span className="font-normal text-neutral-300 hidden sm:inline">{currentStage.shortDesc}</span>
              </p>
            </div>
          </button>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Full Roadmap Drawer Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-emerald-200 border border-emerald-500/30 text-[11px] font-bold tracking-tight flex items-center gap-1 transition-all cursor-pointer"
              title="Expand Business Roadmap Guide"
            >
              <span>{isExpanded ? 'Close' : 'Roadmap'}</span>
              <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Consultation CTA */}
            <button
              onClick={() => onOpenEnquiry()}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] text-white font-bold text-[11px] uppercase tracking-wider transition-all shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span className="hidden xs:inline">Audit Prep</span>
              <span className="xs:hidden">Enquire</span>
            </button>
          </div>
        </div>

        {/* Expanded Business Map Modal / Drawer */}
        {isExpanded && (
          <div className="mt-2 p-3 sm:p-4 rounded-2xl bg-[#041F16]/95 backdrop-blur-xl border border-emerald-500/50 shadow-2xl text-white space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-800/50">
              <div className="flex items-center gap-2">
                <Logo variant="icon-only" size="sm" className="w-4 h-4 scale-75" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  ESSOR Business Blueprint & Page Journey
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-neutral-300 leading-relaxed">
              Explore how ESSOR helps organizations strengthen food safety from diagnostic gap assessment to daily operations and digital credentials:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-[50vh] overflow-y-auto pr-1">
              {BUSINESS_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleJumpTo(stage.targetId)}
                    className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#062E21] border-emerald-400 ring-1 ring-emerald-400/40 shadow-sm'
                        : 'bg-white/5 border-emerald-500/20 hover:bg-white/10 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 shrink-0 mt-0.5">
                      {stage.number}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{stage.title}</span>
                        {isActive && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-[#041F16] font-black uppercase">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-300 line-clamp-1 mt-0.5">
                        {stage.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-emerald-800/40 flex items-center justify-between text-[11px]">
              <span className="text-neutral-400">Click any step to smoothly glide there</span>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenEnquiry();
                }}
                className="text-emerald-300 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Discuss with Lead Auditor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
