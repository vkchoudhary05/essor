import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2,
  ArrowRight,
  Award,
  ShieldCheck
} from 'lucide-react';
import { Logo } from '../common/Logo';

gsap.registerPlugin(ScrollTrigger);

interface SectorItem {
  id: string;
  name: string;
  category: string;
  description: string;
  keyHazards: string[];
  applicableStandards: string[];
  complianceHighlight: string;
}

const SECTORS: SectorItem[] = [
  {
    id: 'dairy-beverage',
    name: 'Dairy, Beverage & Liquid Processing',
    category: 'High Volume Liquid Processing',
    description: 'Clean-in-place (CIP) validation, pasteurization holding tubes, microbiological pathogen barrier controls, and allergen segregation for dairy and aseptic beverage plants.',
    keyHazards: ['Pasteurization thermal kill limits', 'CIP chemical residues', 'Listeria in wet drains', 'Allergen cross-contact'],
    applicableStandards: ['FSSC 22000', 'ISO 22000', 'FSSAI Schedule 4', 'US FDA PMO'],
    complianceHighlight: 'Continuous temperature/flow data logger logging and automated CIP chemical concentration verification.'
  },
  {
    id: 'high-care-rte',
    name: 'Ready-to-Eat (RTE) & High-Care Facilities',
    category: 'Strict Hygiene & Pathogen Segregation',
    description: 'Positive pressure cleanrooms, HEPA air filtration validation, physical hygiene barriers, boot scrubbing stations, and daily environmental pathogen surveillance.',
    keyHazards: ['Post-lethality Listeria monocytogenes', 'Airborne condensation dripping', 'Employee cross-traffic contamination'],
    applicableStandards: ['BRCGS Food Safety', 'FSSC 22000', 'ISO 22002-1 PRP', 'HACCP Team Verification'],
    complianceHighlight: 'Zone 1 to Zone 4 environmental swabbing regimes with rapid ATP and PCR verification cycles.'
  },
  {
    id: 'bakery-snack',
    name: 'Bakery, Confectionery & Dry Goods',
    category: 'Allergen & Foreign Body Control',
    description: 'Physical foreign material prevention, in-line metal detection, X-ray inspection, sieve integrity checks, allergen cleaning validation, and humidity/aW water activity limits.',
    keyHazards: ['Multi-allergen switchovers (peanut/tree nuts/milk)', 'Metal fragments from mixers', 'Salmonella in dry powders'],
    applicableStandards: ['FSSC 22000', 'BRCGS Category 10', 'HACCP', 'GMP/GHP'],
    complianceHighlight: 'Validated quantitative ELISA allergen swab testing and 0.8mm ferrous/non-ferrous metal detection tests.'
  },
  {
    id: 'meat-poultry-seafood',
    name: 'Meat, Poultry & Cold-Chain Logistics',
    category: 'Cold-Chain & Temperature Critical',
    description: 'Continuous cold-chain temperature telemetry (-18°C frozen / 0–4°C chilled), carcass chilling kinetics, evisceration sanitation, and complete forward/backward traceability.',
    keyHazards: ['Temperature abuse & bacterial outgrowth', 'Salmonella / Campylobacter species', 'Chemical sanitizer residues'],
    applicableStandards: ['FSSC 22000', 'US FDA Seafood HACCP', 'FSSAI Regulatory Standards', 'BRCGS Storage & Distribution'],
    complianceHighlight: 'Real-time wireless temperature monitoring nodes with 100% two-hour mock recall audit compliance.'
  },
  {
    id: 'packaging-materials',
    name: 'Food Packaging & Contact Materials',
    category: 'Primary & Secondary Food Contact',
    description: 'Migration testing, non-intentionally added substances (NIAS), cleanroom printing ink compliance, pest exclusion, and sensory taint/odor assessments for packaging manufacturers.',
    keyHazards: ['Chemical solvent migration into food', 'Foreign body / plastic sliver contamination', 'Dust/pest ingress'],
    applicableStandards: ['BRCGS Packaging Materials', 'FSSC 22000 Packaging', 'ISO 22002-4'],
    complianceHighlight: 'Total overall migration limits (OML) verification and GMP cleanroom pest zoning.'
  }
];

interface SectorsShowcaseProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
}

export const SectorsShowcase: React.FC<SectorsShowcaseProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorItem>(SECTORS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Facility Image Card reveal with slight scale
      if (imageCardRef.current) {
        gsap.from(imageCardRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Metrics strip stagger
      if (metricsRef.current) {
        gsap.from(metricsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Tabs and Deep dive panel
      if (tabsRef.current && panelRef.current) {
        gsap.from([tabsRef.current, panelRef.current], {
          opacity: 0,
          x: 30,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate panel when tab changes
  const handleSelectSector = (sector: SectorItem) => {
    setSelectedSector(sector);
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  return (
    <section 
      id="sectors-showcase" 
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-white border-b border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div ref={headerRef} className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Facility Scope & Processing Environments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062E21] tracking-tight leading-tight">
            Specialized compliance architecture tailored to your production floor
          </h2>
          <p className="text-base text-neutral-600 mt-3 font-normal">
            Food safety risks differ vastly between a high-care cleanroom and a dry milling plant. ESSOR consultants apply commodity-specific engineering protocols, PRP verifications, and CCP monitoring tailored to your exact manufacturing line.
          </p>
        </div>

        {/* Feature Grid: Hero Facility Image + Interactive Sector Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Stainless-Steel Food Facility Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div ref={imageCardRef} className="relative rounded-2xl overflow-hidden shadow-xl border border-emerald-900/15 bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_food_safety_facility_1791962115935.jpg"
                alt="State of the art automated food processing and packaging facility with stainless steel conveyors"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#062E21]/90 border border-emerald-500/40 text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
                  <Logo variant="icon-only" size="sm" className="w-4 h-4" />
                  <span>Field Environment Benchmark</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Hygienic Design & Physical Infrastructure Verification
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
                  Every site visit audits sanitary welds, positive-pressure HVAC zoning, CIP drainage slopes, and physical segregations before paperwork review.
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar Under Image */}
            <div ref={metricsRef} className="home-content-grid grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-emerald-900/10 text-center">
              <div>
                <div className="text-xl font-extrabold text-[#062E21]">100%</div>
                <div className="text-[11px] text-neutral-600 font-medium">Audit Prep Record</div>
              </div>
              <div className="border-x border-emerald-900/10">
                <div className="text-xl font-extrabold text-emerald-700">16+</div>
                <div className="text-[11px] text-neutral-600 font-medium">Standards Schemes</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#062E21]">&lt; 48h</div>
                <div className="text-[11px] text-neutral-600 font-medium">CAPA Resolution Engine</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sector Tabs and Deep Dive Card */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Sector Selector Tabs */}
            <div ref={tabsRef} className="flex flex-wrap gap-2">
              {SECTORS.map((sector) => {
                const isSelected = selectedSector.id === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => handleSelectSector(sector)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#062E21] text-white border border-emerald-500 shadow-md ring-1 ring-emerald-400/40 scale-[1.02]'
                        : 'bg-[#F8FAFC] hover:bg-emerald-50/60 text-neutral-700 border border-neutral-200 hover:border-emerald-300'
                    }`}
                  >
                    {sector.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Sector Deep Dive Panel */}
            <div ref={panelRef} className="p-6 rounded-2xl border border-emerald-900/10 bg-[#F8FAFC] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    {selectedSector.category}
                  </span>
                  <h4 className="text-base font-bold text-[#062E21] mt-0.5">
                    {selectedSector.name}
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Protocol</span>
                </span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                {selectedSector.description}
              </p>

              {/* Critical Hazards & Controls */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  Critical Hazards Handled:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSector.keyHazards.map((hazard, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-700 bg-white p-2 rounded-lg border border-emerald-900/10 hover:border-emerald-500 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{hazard}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicable Schemes */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-neutral-500">Frameworks:</span>
                {selectedSector.applicableStandards.map((std, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-0.5 rounded-md bg-white border border-emerald-900/15 text-[11px] font-bold text-[#062E21]">
                    {std}
                  </span>
                ))}
              </div>

              {/* Audit Highlight */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-[#062E21] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-emerald-900">Compliance Highlight: </strong>
                  {selectedSector.complianceHighlight}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onOpenEnquiry(selectedSector.name)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#062E21] hover:text-emerald-700 cursor-pointer group"
                >
                  <span>Request Facility Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('/services')}
                  className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  View All Services
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
