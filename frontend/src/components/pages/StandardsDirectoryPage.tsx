import React, { useState, useEffect } from 'react';
import { AUDIT_STANDARDS, AuditStandard } from '../../data/standardsData';
import { CertificationBadge } from '../home/CertificationBadge';
import { STANDARD_LOCAL_IMAGES, DEFAULT_STANDARD_VISUAL } from '../../assets/standardImageAssets';
import {
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  Globe,
  FileCheck2,
  Building,
  Clock,
  MessageCircle,
  PhoneCall
} from 'lucide-react';

interface StandardsDirectoryPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (standardName?: string) => void;
}

export const StandardsDirectoryPage: React.FC<StandardsDirectoryPageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'GFSI' | 'ISO' | 'HYGIENE' | 'SPECIALIZED'>('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  return (
    <div className="bg-[#FAFBF9] min-h-screen text-neutral-900 pb-20">
      {/* 1. Breadcrumbs Strip */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-500">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400" />
            <span className="font-extrabold text-neutral-900">Audit Standards Directory</span>
          </nav>
        </div>
      </div>

      {/* 2. Page Hero Banner: Clean, Airy & Professional */}
      <header className="bg-white border-b border-neutral-200/80 pt-6 sm:pt-8 pb-6 sm:pb-10 px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 sm:mb-3">
              <Award className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>Official Scheme Registry · 16 Standards</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
              Food Safety Standards &amp; Certification Directory
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
              Explore dedicated technical roadmaps, mandatory documentation dossiers, audit syllabi, and compliance checklists for every internationally benchmarked scheme in India.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry('Comparative Scheme Diagnostic')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#042A1D] to-[#3E7D25] hover:from-[#032016] hover:to-[#2e611c] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A4D65E]" />
                <span>Request Scheme Comparison</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/916395843850?text=Hello%20ESSOR%20Team%2C%20I%20would%20like%20guidance%20on%20which%20food%20safety%20certification%20standard%20is%20required%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Talk to Lead Auditor</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Interactive Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#042A1D] text-white shadow-xs ring-1 ring-[#042A1D]'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/90'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#A4D65E]' : 'text-neutral-500'}`} />
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
      </div>

      {/* 4. Standards Grid: 2 COLUMNS ON MOBILE as requested (grid-cols-2), 3-4 on desktop */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs text-neutral-500 font-bold">
            Showing {filteredStandards.length} Standards in {categories.find(c => c.key === activeCategory)?.label}
          </span>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Click any card to inspect full technical syllabus &amp; checklist
          </span>
        </div>

        {/* 2 columns on mobile screen (grid-cols-2) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {filteredStandards.map((std) => {
            const visual = STANDARD_LOCAL_IMAGES[std.slug] || DEFAULT_STANDARD_VISUAL;
            return (
              <article
                key={std.id}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs hover:shadow-xl hover:border-[#3E7D25] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Vite-Bundled Real Facility Photo with Emblem Overlay */}
                <div 
                  onClick={() => onNavigate(`/standards/${std.slug}`)}
                  className="relative h-24 xs:h-28 sm:h-36 overflow-hidden cursor-pointer bg-neutral-100"
                >
                  <img
                    src={visual.hero}
                    alt={`${std.name} certified plant operations`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/25 to-transparent pointer-events-none" />

                  {/* Emblem floating tag */}
                  <div className="absolute top-2 left-2 p-1 bg-white/95 rounded-xl shadow-xs backdrop-blur-xs border border-white/40">
                    <CertificationBadge badgeType={std.badgeType} size="sm" />
                  </div>

                  {/* Category Pill on top right */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-emerald-900 bg-white/95 px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                      {std.category === 'SPECIALIZED' ? 'Special' : std.categoryLabel.split(' ')[0]}
                    </span>
                  </div>

                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-1.5 left-2 right-2 text-white">
                    <span className="text-[9px] sm:text-[10px] font-bold text-neutral-200 drop-shadow-xs line-clamp-1">
                      {visual.caption}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div 
                  onClick={() => onNavigate(`/standards/${std.slug}`)}
                  className="p-2.5 sm:p-4 cursor-pointer flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-black uppercase text-[#3E7D25] tracking-wider truncate">
                      {std.code}
                    </div>

                    <h3 className="text-xs sm:text-base font-black text-neutral-900 group-hover:text-emerald-800 transition-colors line-clamp-1 mt-0.5 leading-snug">
                      {std.name}
                    </h3>

                    <p className="mt-1 text-[10px] sm:text-xs text-neutral-600 line-clamp-2 leading-snug">
                      {std.tagline}
                    </p>

                    {/* Sectors on tablet/desktop */}
                    <div className="mt-2 hidden sm:flex flex-wrap gap-1">
                      {std.targetIndustries.slice(0, 2).map((ind, i) => (
                        <span
                          key={i}
                          className="text-[9.5px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 truncate max-w-[120px]"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline & Pass Rate */}
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
                <div className="px-2.5 sm:px-4 py-2 sm:py-3 bg-neutral-50/70 border-t border-neutral-100 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/standards/${std.slug}`)}
                    className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-[#042A1D] hover:bg-[#3E7D25] text-white text-[10.5px] sm:text-xs font-black flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 text-[#A4D65E]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(std.name)}
                    className="hidden sm:block py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-neutral-200 transition-colors cursor-pointer"
                  >
                    Audit
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#042A1D] via-[#053726] to-[#042A1D] text-white flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
          <div>
            <span className="text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider text-[#A4D65E] block mb-1">
              Multi-Scheme Advisory
            </span>
            <h2 className="text-base sm:text-2xl font-black text-white">
              Unsure Which Standard Your Retailers Require?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              Our lead food safety consultants evaluate your facility, buyer manuals, and export destinations to recommend the exact certification.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry('Multi-Standard Scheme Diagnostic')}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#A4D65E] hover:bg-[#91c54e] text-[#042A1D] font-black text-xs shadow-lg transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <span>Book Facility Gap Audit</span>
            <ArrowRight className="w-4 h-4 text-[#042A1D]" />
          </button>
        </div>
      </main>
    </div>
  );
};
