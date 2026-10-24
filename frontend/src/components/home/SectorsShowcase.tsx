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

// Direct image imports for reliable Vite bundling
import heroFacilityImage from '../../assets/images/hero_food_safety_facility_1791962115935.jpg';
import produceImage from '../../assets/images/fresh_produce_inspection_1792395403170.jpg';
import packagingImage from '../../assets/images/packaging_line_audit_1792395423537.jpg';
import auditImage from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';
import kitchenImage from '../../assets/images/kitchen_hygiene_audit_1792394924443.jpg';

gsap.registerPlugin(ScrollTrigger);

interface SectorItem {
  id: string;
  name: string;
  category: string;
  description: string;
  keyHazards: string[];
  applicableStandards: string[];
  complianceHighlight: string;
  image: string;
}

const SECTORS: SectorItem[] = [
  {
    id: 'fresh-produce',
    name: 'Fresh Harvest & Agricultural Produce',
    category: 'Farm-to-Fork Receiving & Packing',
    description: 'Post-harvest sanitization, pesticide residue monitoring, temperature grading, water potability validation, and foreign material exclusion for fresh fruit and vegetable packhouses.',
    keyHazards: ['Pesticide residue exceedances', 'Agricultural wash water pathogens (E. coli, Salmonella)', 'Soil / stone foreign debris', 'Broken cold chain'],
    applicableStandards: ['ISO 22000', 'GLOBALG.A.P.', 'FSSAI Schedule 4', 'USDA Organic'],
    complianceHighlight: 'Wash-water chlorine/peracetic acid ppm tracking and automated microbial water testing.',
    image: produceImage
  },
  {
    id: 'packaging-materials',
    name: 'Food Packaging & Contact Materials',
    category: 'Primary & Secondary Food Contact',
    description: 'Migration testing, non-intentionally added substances (NIAS), cleanroom printing ink compliance, pest exclusion, and sensory taint/odor assessments for packaging manufacturers.',
    keyHazards: ['Chemical solvent migration into food', 'Foreign body / plastic sliver contamination', 'Dust/pest ingress'],
    applicableStandards: ['BRCGS Packaging Materials', 'FSSC 22000 Packaging', 'ISO 22002-4'],
    complianceHighlight: 'Total overall migration limits (OML) verification and cleanroom pest zoning.',
    image: packagingImage
  },
  {
    id: 'dairy-beverage',
    name: 'Dairy, Beverage & Liquid Processing',
    category: 'High Volume Liquid Processing',
    description: 'Clean-in-place (CIP) validation, pasteurization holding tubes, microbiological pathogen barrier controls, and allergen segregation for dairy and aseptic beverage plants.',
    keyHazards: ['Pasteurization thermal kill limits', 'CIP chemical residues', 'Listeria in wet drains', 'Allergen cross-contact'],
    applicableStandards: ['FSSC 22000', 'ISO 22000', 'FSSAI Schedule 4', 'US FDA PMO'],
    complianceHighlight: 'Continuous temperature/flow data logger logging and automated CIP chemical concentration verification.',
    image: heroFacilityImage
  },
  {
    id: 'high-care-rte',
    name: 'Ready-to-Eat (RTE) & Cleanrooms',
    category: 'Strict Hygiene & Pathogen Segregation',
    description: 'Positive pressure cleanrooms, HEPA air filtration validation, physical hygiene barriers, boot scrubbing stations, and daily environmental pathogen surveillance.',
    keyHazards: ['Post-lethality Listeria monocytogenes', 'Airborne condensation dripping', 'Employee cross-traffic contamination'],
    applicableStandards: ['BRCGS Food Safety Issue 9', 'FSSC 22000', 'ISO 22002-1 PRP', 'HACCP'],
    complianceHighlight: 'Zone 1 to Zone 4 environmental swabbing regimes with rapid ATP verification cycles.',
    image: auditImage
  },
  {
    id: 'bakery-kitchen',
    name: 'Bakeries, Commercial Kitchens & Catering',
    category: 'Allergen, Baking & Food Service',
    description: 'Physical foreign material prevention, cross-contact allergen segregation, hot holding temperatures, hand hygiene audits, and shelf-life verification.',
    keyHazards: ['Multi-allergen cross-contact (nuts, gluten, milk)', 'Temperature danger zone holding', 'Foreign matter from mixers'],
    applicableStandards: ['HACCP', 'GMP / GHP', 'FSSAI Hygiene Rating', 'ISO 22000'],
    complianceHighlight: 'Validated quantitative allergen swab testing and digital cooking temperature logs.',
    image: kitchenImage
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
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true
          }
        });
      }

      if (imageCardRef.current) {
        gsap.from(imageCardRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.98,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageCardRef.current,
            start: 'top 80%',
            once: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      className="py-16 sm:py-20 bg-white border-b border-emerald-900/10 relative overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div ref={headerRef} className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25] mb-3">
            <Building2 className="w-4 h-4 text-[#3E7D25]" />
            <span>Facility Scope &amp; Processing Environments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Compliance Architecture Tailored to Your Production Floor
          </h2>
          <p className="text-base text-neutral-600 mt-2 font-normal">
            Food safety risks differ vastly between a high-care cleanroom and a dry milling or packaging plant. ESSOR consultants apply commodity-specific engineering protocols, PRP verifications, and CCP monitoring tailored to your exact manufacturing line.
          </p>
        </div>

        {/* Feature Grid: Hero Image + Interactive Sector Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Food Facility Showcase Photo */}
          <div className="lg:col-span-6 space-y-6">
            <div ref={imageCardRef} className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900 group">
              <img
                src={selectedSector.image}
                alt={selectedSector.name}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#012B53]/90 border border-emerald-500/40 text-[10px] uppercase tracking-widest text-[#A4D65E] font-bold">
                  <Logo variant="icon-only" size="sm" className="w-4 h-4" />
                  <span>{selectedSector.category}</span>
                </div>
                <h3 className="text-lg font-bold !text-[#A4D65E]">
                  {selectedSector.name}
                </h3>
                <p className="text-xs !text-[#A4D65E] leading-relaxed max-w-xl">
                  {selectedSector.complianceHighlight}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar Under Image */}
            <div ref={metricsRef} className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8FAF9] border border-neutral-200 text-center">
              <div>
                <div className="text-xl font-extrabold text-neutral-900">100%</div>
                <div className="text-[11px] text-neutral-600 font-medium">Audit Prep Record</div>
              </div>
              <div className="border-x border-neutral-200">
                <div className="text-xl font-extrabold text-[#3E7D25]">16+</div>
                <div className="text-[11px] text-neutral-600 font-medium">Standards Schemes</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-neutral-900">&lt; 48h</div>
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
                        ? 'bg-[#012B53] text-white shadow-sm ring-1 ring-[#012B53]'
                        : 'bg-[#F8FAF9] text-neutral-700 border border-neutral-200 hover:border-[#3E7D25] hover:bg-white'
                    }`}
                  >
                    <span>{sector.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Sector Detail Panel */}
            <div 
              ref={panelRef}
              className="p-6 sm:p-8 rounded-2xl bg-[#F8FAF9] border border-neutral-200 shadow-sm space-y-5"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7D25] block">
                  Sector Specialization
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">
                  {selectedSector.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {selectedSector.description}
                </p>
              </div>

              {/* Critical Hazards Managed */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3E7D25]" />
                  <span>Key Hazards Addressed:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSector.keyHazards.map((hazard, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7D25] shrink-0 mt-0.5" />
                      <span>{hazard}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicable Standards */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                  Applicable Scheme Frameworks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSector.applicableStandards.map((std, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-neutral-200 text-neutral-900"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(selectedSector.name)}
                  className="px-5 py-2.5 rounded-xl bg-[#3E7D25] hover:bg-[#256629] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Request Facility Assessment
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/services/audit-readiness')}
                  className="text-xs font-bold text-neutral-900 hover:text-[#3E7D25] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn Audit Prep</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
