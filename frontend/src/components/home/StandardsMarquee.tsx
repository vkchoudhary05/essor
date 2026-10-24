import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AUDIT_STANDARDS, AuditStandard } from '../../data/standardsData';
import { CertificationBadge } from './CertificationBadge';
import { StandardDetailModal } from './StandardDetailModal';
import {
  Award,
  ShieldCheck,
  ArrowRight,
  Layers,
  Globe,
  FileCheck2
} from 'lucide-react';

interface StandardsMarqueeProps {
  onNavigate?: (path: string) => void;
  onOpenEnquiry?: (standardName?: string) => void;
}

export const StandardsMarquee: React.FC<StandardsMarqueeProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [selectedStandard, setSelectedStandard] = useState<AuditStandard | null>(null);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'GFSI' | 'ISO' | 'HYGIENE' | 'SPECIALIZED'>('ALL');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const categories = [
    { key: 'ALL', label: 'All Standards', count: AUDIT_STANDARDS.length, icon: Layers },
    { key: 'GFSI', label: 'GFSI Benchmarked', count: AUDIT_STANDARDS.filter(s => s.category === 'GFSI').length, icon: ShieldCheck },
    { key: 'ISO', label: 'ISO Schemes', count: AUDIT_STANDARDS.filter(s => s.category === 'ISO').length, icon: Globe },
    { key: 'HYGIENE', label: 'Hygiene & Statutory', count: AUDIT_STANDARDS.filter(s => s.category === 'HYGIENE').length, icon: FileCheck2 },
    { key: 'SPECIALIZED', label: 'Specialized & Dietary', count: AUDIT_STANDARDS.filter(s => s.category === 'SPECIALIZED').length, icon: Award }
  ] as const;

  const filteredStandards = AUDIT_STANDARDS.filter((std) => {
    return activeCategory === 'ALL' || std.category === activeCategory;
  });

  // Check scroll boundary to update button states
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, filteredStandards]);

  // Reset scroll to start when category changes
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (std: AuditStandard) => {
    if (onNavigate) {
      onNavigate(`/standards/${std.slug}`);
    } else {
      setSelectedStandard(std);
    }
  };

  return (
    <section 
      id="audit-standards" 
      className="py-10 sm:py-16 bg-gradient-to-b from-[#F8FAF9] via-white to-[#F8FAF9] border-b border-emerald-900/10 relative overflow-hidden"
      aria-label="Audit Standards and Certifications Supported"
      onMouseLeave={() => {
        handleMouseUpOrLeave();
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-[#A4D65E]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative">
        {/* Section Header: Compact & High Impact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 shadow-2xs mb-1.5">
              <Award className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span className="text-[10px] sm:text-[10.5px] font-black tracking-widest uppercase text-[#3E7D25]">
                Audit Standards &amp; Certifications
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
              Audit Schemes &amp; Accreditation Readiness
            </h2>

            <p className="mt-0.5 text-xs sm:text-sm text-neutral-600 font-medium max-w-2xl">
              GFSI Benchmarked · ISO Schemes · Halal &amp; Kosher · US FDA FSMA · FSSAI Statutory.
              <span className="text-neutral-500 hidden sm:inline ml-1">Swipe to explore all 16 schemes.</span>
            </p>
          </div>

          {/* Directory Link */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/standards')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 px-2.5 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors mr-0.5 cursor-pointer hidden sm:flex items-center gap-1"
              >
                <span>Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        </div>

        {/* Category Filter Segmented Tabs (Compact, Zero-Waste) */}
        <div className="mb-4 sm:mb-6 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#042A1D] text-white shadow-xs ring-1 ring-[#042A1D]'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/90'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[9.5px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-[#A4D65E] text-[#042A1D]' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Swipeable Carousel Viewport with Edge Fade Gradients */}
        <div className="relative">
          {/* Left subtle fade mask */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-2 w-8 sm:w-12 bg-gradient-to-r from-[#F8FAF9] to-transparent z-10 pointer-events-none" />
          )}

          {/* Right subtle fade mask */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-2 w-8 sm:w-12 bg-gradient-to-l from-[#F8FAF9] to-transparent z-10 pointer-events-none" />
          )}

          {/* The Horizontal Scroll Track: 2 to 3 cards fit nicely on mobile */}
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className="flex gap-2.5 sm:gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredStandards.map((std) => (
              <article
                key={std.id}
                className="w-[155px] xs:w-[170px] sm:w-[220px] md:w-[260px] lg:w-[280px] shrink-0 snap-start bg-white rounded-2xl border border-neutral-200/90 shadow-2xs hover:shadow-xl hover:border-[#3E7D25] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Accent line on hover */}
                <div className="h-1 bg-gradient-to-r from-emerald-600 to-[#A4D65E] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Main Body */}
                <div 
                  onClick={() => handleCardClick(std)}
                  className="p-3 sm:p-4 cursor-pointer flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Emblem & Unboxed Metadata */}
                    <div className="flex items-start justify-between gap-1.5 mb-2.5">
                      <div className="p-1 sm:p-2 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200/80 group-hover:scale-105 transition-transform shadow-2xs">
                        <div className="sm:hidden">
                          <CertificationBadge badgeType={std.badgeType} size="sm" />
                        </div>
                        <div className="hidden sm:block">
                          <CertificationBadge badgeType={std.badgeType} size="md" />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-200 inline-block">
                          {std.category === 'SPECIALIZED' ? 'Special' : std.categoryLabel.split(' ')[0]}
                        </span>
                        {std.gfsiBenchmarked && (
                          <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-700">
                            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#3E7D25]" />
                            GFSI
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Standard Code & Title */}
                    <div className="text-[10px] sm:text-[11px] font-black uppercase text-[#3E7D25] tracking-wider truncate">
                      {std.code}
                    </div>

                    <h3 className="text-xs sm:text-sm font-black text-neutral-900 group-hover:text-emerald-800 transition-colors line-clamp-1 mt-0.5 leading-snug">
                      {std.name}
                    </h3>

                    <p className="mt-1 sm:mt-1.5 text-[10.5px] sm:text-xs text-neutral-600 line-clamp-2 leading-snug">
                      {std.tagline}
                    </p>

                    {/* Key Sectors - hidden on tiny mobile, visible on sm: */}
                    <div className="mt-2 hidden sm:flex flex-wrap gap-1">
                      {std.targetIndustries.slice(0, 2).map((ind, i) => (
                        <span
                          key={i}
                          className="text-[9.5px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 truncate max-w-[110px]"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline strip */}
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[9.5px] sm:text-[11px] text-neutral-500">
                    <span className="truncate mr-1">
                      Prep: <strong className="text-neutral-900 font-bold">{std.typicalTimeline.split(' ')[0]} {std.typicalTimeline.split(' ')[1] || 'Wks'}</strong>
                    </span>
                    <span className="text-[#3E7D25] font-black shrink-0">
                      100% Pass
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-neutral-50/70 border-t border-neutral-100 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/standards/${std.slug}`);
                      } else {
                        setSelectedStandard(std);
                      }
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg sm:rounded-xl bg-[#042A1D] hover:bg-[#3E7D25] text-white text-[10.5px] sm:text-xs font-black flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 text-[#A4D65E]" />
                  </button>

                  {onOpenEnquiry && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEnquiry(std.name);
                      }}
                      className="hidden sm:block py-1.5 px-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-neutral-200 transition-colors cursor-pointer"
                    >
                      Audit
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Clean Footer Status (Filled progress bar line removed as requested) */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 font-medium px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{filteredStandards.length} Schemes · Swipe left or right</span>
            </span>
            <span className="font-bold text-emerald-800">
              100% Audit Readiness
            </span>
          </div>
        </div>
      </div>

      {/* Modal Quick View */}
      <StandardDetailModal
        standard={selectedStandard}
        allStandards={AUDIT_STANDARDS}
        isOpen={!!selectedStandard}
        onClose={() => setSelectedStandard(null)}
        onSelectStandard={(std) => setSelectedStandard(std)}
        onOpenEnquiry={(stdName) => onOpenEnquiry?.(stdName)}
        onNavigateToDetail={(slug) => {
          setSelectedStandard(null);
          onNavigate?.(`/standards/${slug}`);
        }}
      />
    </section>
  );
};
