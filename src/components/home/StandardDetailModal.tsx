import React, { useEffect } from 'react';
import { AuditStandard } from '../../data/standardsData';
import { CertificationBadge } from './CertificationBadge';
import {
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  FileText,
  Clock,
  ArrowRight,
  Factory
} from 'lucide-react';

interface StandardDetailModalProps {
  standard: AuditStandard | null;
  allStandards: AuditStandard[];
  isOpen: boolean;
  onClose: () => void;
  onSelectStandard: (std: AuditStandard) => void;
  onOpenEnquiry: (standardName: string) => void;
  onNavigateToDetail?: (slug: string) => void;
}

export const StandardDetailModal: React.FC<StandardDetailModalProps> = ({
  standard,
  allStandards,
  isOpen,
  onClose,
  onSelectStandard,
  onOpenEnquiry,
  onNavigateToDetail
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !standard) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, standard]);

  if (!isOpen || !standard) return null;

  const currentIndex = allStandards.findIndex((s) => s.id === standard.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allStandards.length) % allStandards.length;
    onSelectStandard(allStandards[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allStandards.length;
    onSelectStandard(allStandards[nextIndex]);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ESSOR Compliance Team, I would like to consult with a lead auditor regarding audit readiness and gap assessment for ${standard.name} at our food facility.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-standard-title"
      >
        {/* Top Header with Dark Pine & Emerald Branding */}
        <div className="bg-gradient-to-r from-[#012542] via-[#042A1D] to-[#012B53] text-white p-5 sm:p-6 relative border-b border-white/10 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <CertificationBadge badgeType={standard.badgeType} size="lg" className="shrink-0" />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-[#A4D65E] border border-emerald-400/30">
                    {standard.categoryLabel}
                  </span>
                  {standard.gfsiBenchmarked && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-200 border border-sky-400/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-sky-300" />
                      GFSI Benchmarked
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-emerald-200/80">
                    {standard.edition}
                  </span>
                </div>
                <h3 id="modal-standard-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {standard.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-300 font-normal max-w-2xl">
                  {standard.tagline}
                </p>
              </div>
            </div>

            {/* Quick Navigation and Close Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous standard (Left Arrow)"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Previous standard"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                title="Next standard (Right Arrow)"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Next standard"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close modal (Esc)"
                className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white transition-colors ml-1 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-neutral-800 text-sm">
          {/* 1. Overview */}
          <div className="bg-[#F8FAF9] p-4 sm:p-5 rounded-2xl border border-neutral-200/80">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#042A1D] flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#3E7D25]" />
              Standard Overview &amp; Scope
            </h4>
            <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
              {standard.fullOverview}
            </p>
            <div className="mt-3 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <Clock className="w-4 h-4 text-[#3E7D25]" />
                Typical Readiness Timeline: <span className="text-[#3E7D25] font-black">{standard.typicalTimeline}</span>
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <ShieldCheck className="w-4 h-4 text-[#0E7490]" />
                Commercial Value: <span className="text-neutral-700 font-medium">{standard.commercialValue}</span>
              </span>
            </div>
          </div>

          {/* 2. Target Food Sectors */}
          <div>
            <h4 className="text-xs font-black tracking-widest uppercase text-neutral-500 flex items-center gap-2 mb-2.5">
              <Factory className="w-4 h-4 text-[#3E7D25]" />
              Applicable Food &amp; Packaging Sectors
            </h4>
            <div className="flex flex-wrap gap-2">
              {standard.targetIndustries.map((sec, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#042A1D] border border-emerald-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7D25]" />
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Mandatory Key Clauses & Prerequisite Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
              <h4 className="text-xs font-black tracking-widest uppercase text-neutral-900 flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#3E7D25]" />
                Core Clauses &amp; Mandatory Elements
              </h4>
              <ul className="space-y-2 text-xs text-neutral-700">
                {standard.keyClauses.map((clause, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E7D25] mt-1.5 shrink-0" />
                    <span className="leading-snug">{clause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
              <h4 className="text-xs font-black tracking-widest uppercase text-neutral-900 flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[#0E7490]" />
                Required Documentation Checklist
              </h4>
              <ul className="space-y-2 text-xs text-neutral-700">
                {standard.mandatoryDocumentation.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="leading-snug">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. ESSOR 4-Phase Audit Readiness Roadmap */}
          <div className="border border-emerald-200/80 rounded-2xl p-5 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3E7D25]">
                  ESSOR Guaranteed Methodology
                </span>
                <h4 className="text-sm font-extrabold text-neutral-900">
                  4-Phase Audit Readiness &amp; Certification Roadmap for {standard.code}
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                100% First-Pass Focus
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {standard.essorRoadmap.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="w-6 h-6 rounded-lg bg-[#042A1D] text-[#A4D65E] font-black text-xs flex items-center justify-center">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Phase {step.step}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-neutral-900 leading-snug mb-1">
                      {step.phase}
                    </h5>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {step.action}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7D25] block">
                      Deliverable:
                    </span>
                    <span className="text-[10.5px] font-medium text-neutral-800 leading-tight block">
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <span className="font-bold text-neutral-900">Need immediate audit preparation?</span>
            <span className="hidden md:inline">Our lead auditors assess your facility within 48 hours.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {onNavigateToDetail && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToDetail(standard.slug);
                }}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <span>Full Standard Guide &amp; Checklist</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              </button>
            )}

            <a
              href={`https://wa.me/916395843850?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-300 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Lead Auditor</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenEnquiry(standard.name);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#042A1D] to-[#3E7D25] hover:from-[#032016] hover:to-[#2e611c] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Book Gap Assessment</span>
              <ArrowRight className="w-4 h-4 text-[#A4D65E]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
