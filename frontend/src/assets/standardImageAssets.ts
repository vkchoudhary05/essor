// Direct Vite-bundled visual assets for guaranteed 100% offline & live deployment reliability
import heroFoodSafetyFacility from './images/hero_food_safety_facility_1791962115935.jpg';
import packagingLineImage from './images/packaging_line_audit_1792395423537.jpg';
import auditInspectionImage from './images/audit_readiness_inspection_1791962115904.jpg';
import labTestingImage from './images/food_factory_lab_testing_1791965811882.jpg';
import freshProduceImage from './images/fresh_produce_inspection_1792395403170.jpg';
import kitchenHygieneAudit from './images/kitchen_hygiene_audit_1792394924443.jpg';
import foodFacilityBg from './images/food_facility_bg_1792303509784.jpg';
import certifiedAuditorImage from './images/certified_food_training_auditor_1791965812713.jpg';
import teamConsultingOperations from './images/team_consulting_operations_1791962117427.jpg';

export interface StandardVisual {
  hero: string;
  caption: string;
  sector: string;
}

export const STANDARD_LOCAL_IMAGES: Record<string, StandardVisual> = {
  'fssc-22000': {
    hero: heroFoodSafetyFacility,
    caption: 'Automated Stainless Steel Processing Line with Sanitary Zoning',
    sector: 'Global Food Processing Plants'
  },
  'iso-22000': {
    hero: auditInspectionImage,
    caption: 'Food Safety Management System (FSMS) & CCP Monitoring',
    sector: 'Multi-Category Food & Beverage'
  },
  'brcgs': {
    hero: packagingLineImage,
    caption: 'Export-Grade High Care Manufacturing Unit',
    sector: 'Tier-1 Retail Food Exporters'
  },
  'haccp': {
    hero: kitchenHygieneAudit,
    caption: 'Thermal Pasteurization & Hazard Critical Control Points (CCPs)',
    sector: 'Food Processing & Commercial Kitchens'
  },
  'gmp-ghp': {
    hero: foodFacilityBg,
    caption: 'Cleanroom Hygiene Stations & Sanitary Zoning',
    sector: 'Manufacturing & Processing Facilities'
  },
  'sqf': {
    hero: packagingLineImage,
    caption: 'Retail Supply Chain & End-to-End Packaging Line',
    sector: 'Wholesale & Primary Processors'
  },
  'us-fda-fsma': {
    hero: auditInspectionImage,
    caption: 'US FDA Foreign Supplier Verification (FSVP) & Export Inspection',
    sector: 'Food Exporters to the United States'
  },
  'halal': {
    hero: freshProduceImage,
    caption: 'Segregated Ingredients & Dedicated Sanitized Halal Processing Line',
    sector: 'Domestic & GCC Halal Food Markets'
  },
  'kosher': {
    hero: freshProduceImage,
    caption: 'Ingredient Quarantine & Kosher Supervised Plant Sanitization',
    sector: 'Kosher-Certified Processed Foods'
  },
  'fssai': {
    hero: certifiedAuditorImage,
    caption: 'FSSAI Hygiene Rating Audit & FoSTaC Food Safety Supervisor Check',
    sector: 'Mandatory for All Food Operators in India'
  },
  'iso-9001': {
    hero: labTestingImage,
    caption: 'Statistical Quality Control & Industrial Standardization',
    sector: 'Quality-Driven Manufacturing Plants'
  },
  'usda-organic': {
    hero: freshProduceImage,
    caption: 'Certified Organic Farming & Chemical-Free Grain Milling',
    sector: 'Organic Spices, Grains, Tea & Honey Exporters'
  },
  'ifs-food': {
    hero: heroFoodSafetyFacility,
    caption: 'European Supermarket Quality Assurance & High-Risk Food Prep',
    sector: 'Suppliers to European Retail Chains'
  },
  'iso-14001': {
    hero: foodFacilityBg,
    caption: 'Eco-Friendly Plant Operations, Waste Minimization & Green Audits',
    sector: 'Sustainable Food & Packaging Converters'
  },
  'iso-45001': {
    hero: certifiedAuditorImage,
    caption: 'Worker PPE, Machine Guards & Safe Food Factory Operations',
    sector: 'Occupational Health & Worker Protection'
  },
  'non-gmo-verified': {
    hero: labTestingImage,
    caption: 'PCR Laboratory DNA Testing & Grain Identity Preservation (IP)',
    sector: 'Basmati Rice, Soya, Guar Gum & Millets'
  }
};

export const DEFAULT_STANDARD_VISUAL: StandardVisual = {
  hero: heroFoodSafetyFacility,
  caption: 'Modern Certified Food Processing & Quality Assurance Facility',
  sector: 'Food & Beverage Manufacturing'
};

export const AUDIT_CHECKPOINT_IMAGES = {
  zoning: foodFacilityBg,
  swabTesting: labTestingImage,
  traceability: packagingLineImage
};
