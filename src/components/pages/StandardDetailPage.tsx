import React, { useEffect, useState } from 'react';
import { AuditStandard, getStandardBySlug, getRelatedStandards, getStandardFaqs } from '../../data/standardsData';
import { CertificationBadge } from '../home/CertificationBadge';
import { STANDARD_LOCAL_IMAGES, DEFAULT_STANDARD_VISUAL, AUDIT_CHECKPOINT_IMAGES } from '../../assets/standardImageAssets';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  FileText,
  Clock,
  ArrowRight,
  Factory,
  Globe,
  HelpCircle,
  ChevronDown,
  Building,
  Phone,
  Sparkles,
  CheckSquare,
  Square,
  Microscope,
  PackageCheck,
  Check
} from 'lucide-react';

interface StandardDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (standardName?: string) => void;
}

export const StandardDetailPage: React.FC<StandardDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry
}) => {
  const standard = getStandardBySlug(slug);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CHECKLIST' | 'DOCS' | 'ROADMAP' | 'FAQ'>('OVERVIEW');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('OVERVIEW');
  }, [slug]);

  if (!standard) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-white">
        <Award className="w-16 h-16 text-neutral-300 mb-4" />
        <h1 className="text-2xl font-black text-neutral-900">Standard Not Found</h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-md">
          The requested audit standard could not be located in our scheme registry.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mt-6 px-5 py-2.5 rounded-xl bg-[#042A1D] text-white text-xs font-bold hover:bg-[#3E7D25] transition-colors cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  const standardVisual = STANDARD_LOCAL_IMAGES[standard.slug] || DEFAULT_STANDARD_VISUAL;
  const related = getRelatedStandards(standard, 3);
  const faqs = getStandardFaqs(standard);

  // Dynamic Schema.org JSON-LD structured data for Google Search ranking
  useEffect(() => {
    const scriptId = 'standard-schema-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.essorcompliance.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Standards',
              item: 'https://www.essorcompliance.com/standards'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: standard.name,
              item: `https://www.essorcompliance.com/standards/${standard.slug}`
            }
          ]
        },
        {
          '@type': 'Service',
          name: `${standard.name} Audit Readiness & Certification Consulting`,
          serviceType: 'Food Safety Compliance Consulting',
          provider: {
            '@type': 'ProfessionalService',
            name: 'ESSOR Compliance Solutions India'
          },
          areaServed: {
            '@type': 'Country',
            name: 'India'
          },
          description: standard.fullOverview,
          termsOfService: 'https://www.essorcompliance.com/terms',
          category: standard.categoryLabel
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer
            }
          }))
        }
      ]
    };

    script.textContent = JSON.stringify(jsonLdData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [standard, faqs]);

  const whatsappMessage = encodeURIComponent(
    `Hello ESSOR, I am inquiring about audit readiness and certification consulting for ${standard.name} (${standard.code}). Can you share a roadmap and assessment proposal?`
  );

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedChecksCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecks = standard.keyClauses.length;

  return (
    <div className="bg-[#FAFBF9] min-h-screen text-neutral-900 pb-20">
      {/* 1. Breadcrumb Strip */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <button
              type="button"
              onClick={() => onNavigate('/standards')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Audit Standards
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="font-extrabold text-neutral-900">{standard.code}</span>
          </nav>
        </div>
      </div>

      {/* 2. Executive Hero Banner: Airy, High-Contrast & Clear Real Image */}
      <header className="bg-white border-b border-neutral-200/80 pt-6 sm:pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Core Info */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-2.5">
                <span className="font-black text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {standard.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-bold text-neutral-700">{standard.edition}</span>
                {standard.gfsiBenchmarked && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3E7D25]" />
                      GFSI Benchmarked
                    </span>
                  </>
                )}
              </div>

              {/* Title & One-line Summary */}
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
                {standard.name}
              </h1>

              <p className="mt-2 text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
                {standard.tagline}
              </p>

              {/* Quick Stat Pill Bar */}
              <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-neutral-700 border-t border-neutral-100 pt-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#3E7D25]" />
                  <span>Timeline: <strong>{standard.typicalTimeline.split(' ')[0]} {standard.typicalTimeline.split(' ')[1] || 'Wks'}</strong></span>
                </div>
                <span className="text-neutral-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3E7D25]" />
                  <span>Pass Rate: <strong>100% Guaranteed</strong></span>
                </div>
                <span className="text-neutral-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#3E7D25]" />
                  <span>Pan-India On-Site Support</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(standard.name)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#042A1D] to-[#3E7D25] hover:from-[#032016] hover:to-[#2e611c] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A4D65E]" />
                  <span>Book Audit Readiness Gap Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/916395843850?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp Lead Auditor</span>
                </a>
              </div>
            </div>

            {/* Right Column: Real Industry Facility Photo & Badge Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 group">
                <img
                  src={standardVisual.hero}
                  alt={`${standard.name} certified plant operations`}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />

                {/* Floating Scheme Badge Overlay */}
                <div className="absolute top-3 left-3 p-1.5 bg-white/95 rounded-xl shadow-md backdrop-blur-xs border border-white/40">
                  <CertificationBadge badgeType={standard.badgeType} size="sm" />
                </div>

                {/* Photo Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#A4D65E] block">
                    Certified Facility Floor
                  </span>
                  <p className="text-xs font-bold text-white drop-shadow-xs line-clamp-1">
                    {standardVisual.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Visual Understanding Strip: 3 Concrete Floor Inspection Points */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/90 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                Visual Inspection Guide
              </span>
              <h2 className="text-sm sm:text-base font-black text-neutral-900">
                What the Lead Auditor Inspects in Your Facility
              </h2>
            </div>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Key floor checkpoints to pass audit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3">
            {/* Checkpoint 1: Plant Hygiene & Sanitary Zoning */}
            <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 flex flex-col">
              <div className="relative h-28 overflow-hidden">
                <img
                  src={AUDIT_CHECKPOINT_IMAGES.zoning}
                  alt="Hygiene zoning and sanitary equipment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#042A1D] text-[#A4D65E] text-[9.5px] font-black">
                  Checkpoint 1
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-neutral-900 flex items-center gap-1">
                    <Factory className="w-3.5 h-3.5 text-[#3E7D25]" />
                    <span>Sanitary Zoning &amp; Drainage</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                    Physical barrier segregation between raw and finished zones, stainless food contact surfaces, and air filtration.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkpoint 2: Microbial & Surface Swab Testing */}
            <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 flex flex-col">
              <div className="relative h-28 overflow-hidden">
                <img
                  src={AUDIT_CHECKPOINT_IMAGES.swabTesting}
                  alt="Laboratory microbial swab testing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#042A1D] text-[#A4D65E] text-[9.5px] font-black">
                  Checkpoint 2
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-neutral-900 flex items-center gap-1">
                    <Microscope className="w-3.5 h-3.5 text-[#3E7D25]" />
                    <span>Swab Testing &amp; Clean-in-Place</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                    Environmental ATP bioluminescence swabs, Listeria/Salmonella testing schedules, and validated allergen cleaning logs.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkpoint 3: Batch Traceability & Recall Reconciliation */}
            <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 flex flex-col">
              <div className="relative h-28 overflow-hidden">
                <img
                  src={AUDIT_CHECKPOINT_IMAGES.traceability}
                  alt="Food packaging lot traceability and batch reconciliation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#042A1D] text-[#A4D65E] text-[9.5px] font-black">
                  Checkpoint 3
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-neutral-900 flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5 text-[#3E7D25]" />
                    <span>100% Mass-Balance Traceability</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                    Rapid 4-hour mock recall simulation proving 100% reconciliation of raw ingredients to finished retail packages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Body: Segmented Tab Bar for Easy, Frictionless Reading */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left 2 Cols: The Tabbed Content Reader */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Tab Selector */}
            <div className="bg-white p-1.5 rounded-2xl border border-neutral-200/90 shadow-2xs flex items-center gap-1 overflow-x-auto scrollbar-none">
              {[
                { key: 'OVERVIEW', label: '1. Overview & Scope' },
                { key: 'CHECKLIST', label: `2. Audit Clauses (${standard.keyClauses.length})` },
                { key: 'DOCS', label: `3. Documents (${standard.mandatoryDocumentation.length})` },
                { key: 'ROADMAP', label: '4. 4-Phase Roadmap' },
                { key: 'FAQ', label: '5. FAQs' }
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex-1 text-center ${
                      isActive
                        ? 'bg-[#042A1D] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: OVERVIEW & SCOPE */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <article className="bg-white rounded-2xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xs">
                  <h2 className="text-base sm:text-lg font-black text-neutral-900 mb-2">
                    What is {standard.code} and Why Do You Need It?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {standard.fullOverview}
                  </p>

                  <div className="mt-5 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-1">
                      <Award className="w-4 h-4 text-[#3E7D25]" />
                      Commercial &amp; Export Advantage
                    </h3>
                    <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                      {standard.commercialValue}
                    </p>
                  </div>
                </article>

                {/* Target Industries */}
                <article className="bg-white rounded-2xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xs">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                    <Factory className="w-4 h-4 text-[#3E7D25]" />
                    Applicable Food &amp; Packaging Sectors in India
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {standard.targetIndustries.map((ind, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center gap-2 text-xs font-bold text-neutral-800"
                      >
                        <Building className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            )}

            {/* TAB 2: AUDIT CLAUSES & INTERACTIVE SELF-CHECK */}
            {activeTab === 'CHECKLIST' && (
              <article className="bg-white rounded-2xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-neutral-900">
                      Mandatory Audit Clauses &amp; Verification Points
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Tap items below to assess your facility&apos;s readiness score:
                    </p>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 shrink-0">
                    Readiness: {completedChecksCount} / {totalChecks}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {standard.keyClauses.map((clause, idx) => {
                    const isDone = !!checkedItems[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(idx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isDone
                            ? 'bg-emerald-50/60 border-emerald-300'
                            : 'bg-neutral-50 hover:bg-neutral-100/70 border-neutral-200/80'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0 text-emerald-700">
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-400" />
                          )}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                          {clause}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between gap-3">
                  <span>Need an independent auditor to verify these clauses on-site?</span>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(standard.name)}
                    className="font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer"
                  >
                    Schedule Gap Audit →
                  </button>
                </div>
              </article>
            )}

            {/* TAB 3: REQUIRED DOCUMENTS DOSSIER */}
            {activeTab === 'DOCS' && (
              <article className="bg-white rounded-2xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xs space-y-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-neutral-900">
                    Mandatory Documentation Dossier
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                    Auditors require the following registers and manuals to be maintained and verified before granting certification:
                  </p>
                </div>

                <div className="space-y-2">
                  {standard.mandatoryDocumentation.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  <strong>How ESSOR helps:</strong> Our consultants draft, customize, and shopfloor-validate every single manual, HACCP plan, and monitoring log to ensure 100% compliance.
                </div>
              </article>
            )}

            {/* TAB 4: 4-PHASE ROADMAP */}
            {activeTab === 'ROADMAP' && (
              <article className="bg-white rounded-2xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xs space-y-5">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-neutral-900">
                    ESSOR 4-Phase Audit Readiness Roadmap
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    A structured methodology guaranteeing a first-time pass with zero non-conformances:
                  </p>
                </div>

                <div className="space-y-3.5">
                  {standard.essorRoadmap.map((step) => (
                    <div
                      key={step.step}
                      className="relative pl-9 sm:pl-11 pb-5 border-l-2 border-emerald-500 last:border-l-0 last:pb-0"
                    >
                      <div className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-[#042A1D] border-2 border-[#A4D65E] text-[#A4D65E] font-black text-[11px] flex items-center justify-center shadow-md">
                        {step.step}
                      </div>

                      <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200/80">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h3 className="text-xs sm:text-sm font-extrabold text-neutral-900">
                            {step.phase}
                          </h3>
                          <span className="text-[9.5px] font-bold text-neutral-500 uppercase tracking-wider">
                            Phase {step.step}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {step.action}
                        </p>

                        <div className="mt-2 pt-1.5 border-t border-neutral-200/70 flex items-start gap-1.5">
                          <span className="text-[10px] font-black text-[#3E7D25] uppercase tracking-wider shrink-0">
                            Deliverable:
                          </span>
                          <span className="text-[10.5px] font-bold text-neutral-800">
                            {step.deliverable}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* TAB 5: FAQS */}
            {activeTab === 'FAQ' && (
              <article className="bg-white rounded-2xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xs space-y-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-neutral-900">
                    Frequently Asked Questions about {standard.code}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Plain-English answers to questions food manufacturers frequently ask:
                  </p>
                </div>

                <div className="space-y-2.5 mt-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-neutral-200 rounded-xl overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-3.5 text-left font-bold text-xs sm:text-sm text-neutral-900 hover:text-emerald-800 bg-neutral-50/50 flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-neutral-400 transition-transform ${
                              isOpen ? 'rotate-180 text-emerald-700' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="p-3.5 bg-white border-t border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            )}
          </div>

          {/* Right Column: Compact, Non-Intrusive Action Card & Related Schemes */}
          <div className="space-y-5">
            {/* Quick Action Card */}
            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-600/30 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-1">
                Audit Readiness Guarantee
              </span>
              <h3 className="text-sm sm:text-base font-black text-neutral-900">
                Get {standard.code} Ready with ESSOR
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Connect with our accredited Lead Auditor team for a comprehensive gap assessment and roadmap tailored to your facility.
              </p>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(standard.name)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#042A1D] to-[#3E7D25] hover:from-[#032016] hover:to-[#2e611c] text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Book Gap Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A4D65E]" />
                </button>

                <a
                  href={`https://wa.me/916395843850?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp Lead Auditor</span>
                </a>
              </div>

              <div className="mt-3.5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Pan-India Coverage</span>
                <span className="font-bold text-emerald-800">48-Hr Response</span>
              </div>
            </div>

            {/* Related Schemes */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-2.5">
                Related Audit Schemes
              </h4>

              <div className="space-y-2">
                {related.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onNavigate(`/standards/${rel.slug}`)}
                    className="w-full p-2 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-200/70 hover:border-emerald-300 transition-all flex items-center gap-2 text-left cursor-pointer group"
                  >
                    <CertificationBadge badgeType={rel.badgeType} size="sm" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-extrabold text-neutral-900 group-hover:text-emerald-800 transition-colors block truncate">
                        {rel.code}
                      </span>
                      <span className="text-[10px] text-neutral-500 block truncate">
                        {rel.categoryLabel}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-700 transition-colors shrink-0" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/standards')}
                className="w-full mt-2.5 py-1 text-center text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors block cursor-pointer"
              >
                View All Standards Directory →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
