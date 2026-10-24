export interface AuditStandard {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: 'GFSI' | 'ISO' | 'HYGIENE' | 'SPECIALIZED';
  categoryLabel: string;
  badgeType: string;
  edition: string;
  gfsiBenchmarked: boolean;
  accentColor: string;
  tagline: string;
  shortDescription: string;
  fullOverview: string;
  targetIndustries: string[];
  keyClauses: string[];
  mandatoryDocumentation: string[];
  essorRoadmap: {
    step: number;
    phase: string;
    action: string;
    deliverable: string;
  }[];
  auditTypes: string[];
  typicalTimeline: string;
  commercialValue: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const AUDIT_STANDARDS: AuditStandard[] = [
  {
    id: 'fssc-22000',
    slug: 'fssc-22000',
    code: 'FSSC 22000',
    name: 'FSSC 22000 (Version 6.0)',
    category: 'GFSI',
    categoryLabel: 'GFSI Benchmarked',
    badgeType: 'fssc',
    edition: 'Version 6.0 (Mandatory as of April 2024)',
    gfsiBenchmarked: true,
    accentColor: '#0E7490',
    tagline: 'Comprehensive GFSI-benchmarked food safety certification scheme built on ISO 22000 and sector PRPs.',
    shortDescription: 'The gold standard for global food manufacturers, retail brand suppliers, and international food exporters.',
    fullOverview: 'FSSC 22000 is an internationally recognized, GFSI-benchmarked food safety certification system based on the ISO 22000 standard, sector-specific Prerequisite Programs (PRPs such as ISO/TS 22002-1), and FSSC Additional Requirements (including Food Defense, Food Fraud Mitigation, Equipment Design, and Allergen Management). It is widely demanded by multinational retailers, tier-1 supermarket chains, and multinational QSR brands worldwide.',
    targetIndustries: [
      'Food & Beverage Processing Plants',
      'Dairy & Ice Cream Manufacturers',
      'Bakery, Confectionery & Snacks',
      'Meat, Poultry & Seafood Processors',
      'Food Packaging Material Converters',
      'Pet Food & Animal Feed Manufacturers'
    ],
    keyClauses: [
      'ISO 22000:2018 FSMS Core (Context, Leadership, Planning, Operations, Performance Evaluation)',
      'Sector PRPs (ISO/TS 22002-1 for Food Mfg, ISO/TS 22002-4 for Packaging)',
      'FSSC Additional Req: Food Fraud Vulnerability Assessment (VACCP)',
      'FSSC Additional Req: Food Defense Threat Assessment (TACCP)',
      'FSSC Additional Req: Hygienic Equipment Design & Environmental Monitoring (EMP)',
      'FSSC Additional Req: Allergen Management Plan & Cross-Contact Validation'
    ],
    mandatoryDocumentation: [
      'Food Safety Policy & Measurable FSMS Objectives',
      'HACCP / Hazard Control Plan (CCPs, OPRPs, Critical Limits)',
      'Environmental Monitoring Program (EMP) Sampling Schedule & Swab Records',
      'Food Defense & Food Fraud Vulnerability Assessments and Mitigation Plans',
      'Allergen Matrix, Cleaning Validation & Positive Swab Logs',
      'Annual Mock Recall & 100% Mass-Balance Reconciliation Log'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Baseline Diagnostic Gap Assessment',
        action: 'On-site technical walkthrough of processing lines, sanitary zoning, drainage, ventilation, and review of existing PRP registers.',
        deliverable: 'Clause-by-clause FSSC v6 Gap Matrix with prioritised RAG action items.'
      },
      {
        step: 2,
        phase: 'Documentation & Hazard Plan Restructuring',
        action: 'Development or overhaul of HACCP, TACCP, VACCP manuals, OPRP monitoring logs, and allergen segregation protocols.',
        deliverable: 'Complete, audit-ready FSSC 22000 documentation dossier and registers.'
      },
      {
        step: 3,
        phase: 'Shopfloor Implementation & Mock Audit',
        action: 'Floor training of operators, hygiene marshals, and internal auditors, followed by a rigorous 2-day unannounced simulation mock audit.',
        deliverable: 'Mock Audit Non-Conformance Report (NCR) and rapid Corrective Action Plan.'
      },
      {
        step: 4,
        phase: 'Certification Body Support & Final Closure',
        action: 'Lead auditor presence during Stage 1 and Stage 2 CB visits, assistance in root-cause analysis (5-Why/Fishbone) for any audit findings.',
        deliverable: '100% CAPA acceptance by accredited Certification Body and certificate recommendation.'
      }
    ],
    auditTypes: ['Initial Stage 1 & Stage 2', 'Annual Surveillance', '3-Year Recertification', 'Mandatory Unannounced Audit'],
    typicalTimeline: '6 to 12 Weeks (depending on facility scale)',
    commercialValue: 'Unlocks tier-1 international retail supplier status, export approval to North America, Europe, GCC, and eliminates multiple supplier audits.'
  },
  {
    id: 'iso-22000',
    slug: 'iso-22000',
    code: 'ISO 22000',
    name: 'ISO 22000:2018 Food Safety',
    category: 'ISO',
    categoryLabel: 'ISO International Scheme',
    badgeType: 'iso22000',
    edition: 'ISO 22000:2018 High-Level Structure (Annex SL)',
    gfsiBenchmarked: false,
    accentColor: '#15803D',
    tagline: 'Global international standard for food safety management systems across the entire food chain from farm to fork.',
    shortDescription: 'Ideal for food manufacturers, logistics providers, caterers, and packaging converters needing a globally respected FSMS.',
    fullOverview: 'ISO 22000:2018 sets international requirements for food safety management systems (FSMS). Built around the High-Level Structure (Annex SL), it integrates the principles of Hazard Analysis and Critical Control Points (HACCP) developed by Codex Alimentarius with dynamic Plan-Do-Check-Act (PDCA) cycles operating at two levels: organizational management and operational food safety.',
    targetIndustries: [
      'Food & Ingredient Processors',
      'Cloud Kitchens, Catering & QSR Chains',
      'Cold Chain Logistics & Warehousing',
      'Grain Mills, Edible Oil Refineries & Spices',
      'Primary Agricultural Packhouses'
    ],
    keyClauses: [
      'Clause 4: Context of the Organization & Food Chain Interaction',
      'Clause 6: Risk-Based Thinking & Planning for Changes',
      'Clause 7.4: Internal & External Interactive Communication',
      'Clause 8.2: Prerequisite Programs (PRPs)',
      'Clause 8.5: Hazard Control Plan (HACCP / OPRP Distinction & Validation)',
      'Clause 9 & 10: FSMS Performance Evaluation, Internal Audit & Improvement'
    ],
    mandatoryDocumentation: [
      'Documented FSMS Scope & Food Safety Policy',
      'Raw Material, Ingredient & Contact-Surface Specifications',
      'Process Flowcharts & On-Site Verification Records',
      'Hazard Identification & Severity/Likelihood Assessment Matrix',
      'OPRP & CCP Monitoring Logs, Calibrations & Verification Tests',
      'Withdrawal / Recall Procedures & Emergency Preparedness Protocols'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Context Analysis & Gap Audit',
        action: 'Map organizational context, interested party needs, statutory obligations, and baseline hygiene status.',
        deliverable: 'ISO 22000 Readiness Diagnostic Scorecard.'
      },
      {
        step: 2,
        phase: 'Two-Tier PDCA Framework Design',
        action: 'Formulate food safety objectives, establish PRP checklists, and define clear OPRP vs CCP monitoring criteria.',
        deliverable: 'Customized ISO 22000:2018 Manual, SOPs, and Hazard Control Plan.'
      },
      {
        step: 3,
        phase: 'Internal Audit & Management Review Meeting',
        action: 'Conduct mandatory complete internal audit and lead structured Management Review Meeting (MRM) with senior leadership.',
        deliverable: 'Internal Audit Report, CAPA register, and signed MRM minutes.'
      },
      {
        step: 4,
        phase: 'External CB Audit Navigation',
        action: 'Pre-audit readiness validation, document review readiness, and on-site support during Stage 1 and Stage 2 certification.',
        deliverable: 'Successful Stage 2 recommendation and closure of any minor observations.'
      }
    ],
    auditTypes: ['Initial Certification (Stage 1 & 2)', 'Surveillance Audits', 'Recertification'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Universal international credibility, regulatory compliance proof across domestic and export markets, systematic reduction of food safety hazards.'
  },
  {
    id: 'brcgs-food',
    slug: 'brcgs',
    code: 'BRCGS',
    name: 'BRCGS Food Safety (Issue 9)',
    category: 'GFSI',
    categoryLabel: 'GFSI Benchmarked',
    badgeType: 'brcgs',
    edition: 'BRCGS Food Safety Issue 9 (August 2022 onwards)',
    gfsiBenchmarked: true,
    accentColor: '#166534',
    tagline: 'Leading global standard for food safety certification, recognized by premier retailers in the UK, Europe, and Americas.',
    shortDescription: 'The premier choice for export-driven food plants targeting UK, US, and European private-label supermarket programs.',
    fullOverview: 'BRCGS (Brand Reputation Compliance Global Standards) Food Safety Issue 9 is one of the most prescriptive and rigorous GFSI-benchmarked schemes in the world. It emphasizes senior management commitment, a fully validated HACCP food safety plan, food safety culture transformation, environmental monitoring, core microbiological criteria, and unannounced audit rigor.',
    targetIndustries: [
      'Processed & Packaged Foods for Export',
      'Private-Label Food Manufacturers for Retailers',
      'Frozen Foods, Ready Meals & IQF Produce',
      'Tea, Coffee, Spices & Herb Blenders',
      'Confectionery, Chocolate & Baked Goods'
    ],
    keyClauses: [
      'Section 1: Senior Management Commitment & Food Safety Culture Plan',
      'Section 2: The Food Safety Plan – HACCP (Codex Alimentarius Principles)',
      'Section 3: Food Safety & Quality Management System',
      'Section 4: Site Standards (Building Fabric, Drainage, Physical Security)',
      'Section 5: Product Control (Allergens, Labelling, Metal Detection, X-Ray)',
      'Section 6: Process Control & Weight Verification',
      'Section 7: Personnel Training, Protective Clothing & Medical Screening'
    ],
    mandatoryDocumentation: [
      'Food Safety Culture Plan with measurable activities and annual reviews',
      'Senior Management Review Minutes and Monthly KPI Dashboards',
      'Codex HACCP Manual with validated critical limits for every CCP',
      'Allergen Management Plan and Cleaning Validation Test Swabs',
      'Foreign Body Risk Assessment & Metal Detector / Magnet Verification Logs',
      'Product Authenticity & Vulnerability Assessment Plan'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'BRCGS Prescriptive Gap Audit',
        action: 'Line-by-line inspection against all Fundamental Requirements (e.g. 1.1, 2.1, 3.4, 3.8, 4.1, 5.3, 6.1, 7.1).',
        deliverable: 'BRCGS Issue 9 Gap Analysis Matrix with site infrastructure recommendations.'
      },
      {
        step: 2,
        phase: 'Food Safety Culture & HACCP Overhaul',
        action: 'Design the required Food Safety Culture strategic plan, re-engineer HACCP flow diagrams, and calibrate testing regimens.',
        deliverable: 'Audit-ready BRCGS documentation suite, HACCP manual, and staff culture survey.'
      },
      {
        step: 3,
        phase: 'Trial Audit & Pre-assessment Simulation',
        action: 'Simulated BRCGS audit testing foreign body controls, unannounced hygiene inspections, and vertical traceability exercises in under 4 hours.',
        deliverable: 'Mock Audit Score (targeting Grade A/AA) and pre-audit corrective actions.'
      },
      {
        step: 4,
        phase: 'Official Audit Accompanying & CAPA Support',
        action: 'Technical support during the 2-to-3-day external CB audit; fast generation of root-cause and CAPA evidence within the 28-day window.',
        deliverable: 'Grade A or AA BRCGS Certificate issuance.'
      }
    ],
    auditTypes: ['Announced Certification', 'Unannounced Mandatory Certification', 'Surveillance', 'Retailer Code Add-on Audits'],
    typicalTimeline: '8 to 16 Weeks',
    commercialValue: 'Direct entry into British, European, American, and Australian supermarket shelves (Tesco, Walmart, Marks & Spencer, Sainsbury’s).'
  },
  {
    id: 'haccp',
    slug: 'haccp',
    code: 'HACCP',
    name: 'HACCP (Codex Alimentarius)',
    category: 'HYGIENE',
    categoryLabel: 'Foundational Safety',
    badgeType: 'haccp',
    edition: 'CXC 1-1969 (Revised 2020/2023 - General Principles of Food Hygiene)',
    gfsiBenchmarked: false,
    accentColor: '#B45309',
    tagline: 'Systematic preventative approach to biological, chemical, physical, and allergen food safety hazards.',
    shortDescription: 'The bedrock of every credible food business, mandated by food authorities and international export bodies.',
    fullOverview: 'Hazard Analysis and Critical Control Points (HACCP) is a scientifically grounded, systematic approach to identifying, evaluating, and controlling food safety hazards. Built on the 7 Core Principles and 12 Application Steps codified by the Codex Alimentarius Commission, HACCP is the baseline requirement for food processors, flight kitchens, cloud kitchens, and export packaging facilities.',
    targetIndustries: [
      'Food Manufacturers & Processors of all scales',
      'Hotels, Restaurant Chains & Cloud Kitchens',
      'Flight Catering & Cruise Line Food Prep',
      'Meat & Fish Processing Plants',
      'Beverage Bottling & Dairy Facilities'
    ],
    keyClauses: [
      'Principle 1: Conduct a Hazard Analysis (Biological, Chemical, Physical, Allergens)',
      'Principle 2: Determine Critical Control Points (CCPs) via Decision Tree',
      'Principle 3: Establish Validated Critical Limits for each CCP',
      'Principle 4: Establish a Monitoring System for each CCP',
      'Principle 5: Establish Corrective Actions for deviations',
      'Principle 6: Establish Verification Procedures (Swabs, Lab tests, Audits)',
      'Principle 7: Establish Documentation and Record-Keeping'
    ],
    mandatoryDocumentation: [
      'Multidisciplinary HACCP Team Charter and Training Certifications',
      'Product Description, Shelf Life & Intended Consumer Use Sheets',
      'Verified Process Flow Diagrams signed off on site',
      'Hazard Identification, Risk Rating & CCP Determination Worksheets',
      'CCP Monitoring Log Sheets & Daily Calibration Logs',
      'Deviation Reports, Root Cause Records & Product Disposition Logs'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Product Line Hazard Profiling',
        action: 'Review ingredients, formulation, processing steps, temperature steps, and storage parameters for each product family.',
        deliverable: 'Comprehensive Hazard Profile and Codex Decision Tree Analysis.'
      },
      {
        step: 2,
        phase: 'Critical Limit Scientific Validation',
        action: 'Establish and scientifically validate critical limits (e.g. pasteurization time/temp, metal detector test piece sensitivity, pH/water activity).',
        deliverable: 'Complete HACCP Plan & Validated Monitoring Standard Operating Procedures.'
      },
      {
        step: 3,
        phase: 'CCP Monitoring Execution & Calibration',
        action: 'Set up real-world log sheets, sensor calibrations, staff training, and verification protocols on the manufacturing floor.',
        deliverable: 'Operational CCP recording system with zero gap tolerance.'
      },
      {
        step: 4,
        phase: 'Verification Audit & Certification Assistance',
        action: 'HACCP system verification audit, testing deviation handling, and audit presentation to regulatory or CB inspectors.',
        deliverable: 'Accredited HACCP System Certificate readiness.'
      }
    ],
    auditTypes: ['HACCP Certification Audit', 'Customer Technical Audit', 'Regulatory Inspection'],
    typicalTimeline: '3 to 6 Weeks',
    commercialValue: 'Compliance with food safety laws, prevention of foodborne outbreaks, product liability protection, and customer trust.'
  },
  {
    id: 'gmp-ghp',
    slug: 'gmp-ghp',
    code: 'GMP / GHP',
    name: 'GMP & GHP (Good Manufacturing & Hygiene Practices)',
    category: 'HYGIENE',
    categoryLabel: 'Prerequisite Programs',
    badgeType: 'gmp',
    edition: 'WHO / US FDA 21 CFR Part 117 / Codex CXC 1-1969',
    gfsiBenchmarked: false,
    accentColor: '#047857',
    tagline: 'Foundational prerequisite hygiene practices ensuring hygienic production environments, clean equipment, and sanitary personnel.',
    shortDescription: 'The essential physical and operational prerequisite required before any higher certification (ISO/FSSC/BRCGS).',
    fullOverview: 'Good Manufacturing Practices (GMP) and Good Hygiene Practices (GHP) form the physical, sanitary, and operational foundation of food safety. Without robust GMP/GHP, higher-level management systems cannot succeed. It covers sanitary facility layout, wall/floor coving, pest control, personnel hygiene, water potability, sanitation schedules, and chemical management.',
    targetIndustries: [
      'Food Startups, SMEs & Industrial Processors',
      'Central Kitchens & Commissaries',
      'Nutraceuticals, Functional Foods & Supplements',
      'Food Packaging, Wrappers & Foil Manufacturers',
      'Cold Stores, Warehouses & Distribution Centers'
    ],
    keyClauses: [
      'Facility Design, Sanitary Zoning & Cross-Contamination Barriers',
      'Surface Sanitation: Master Cleaning Schedule & Chemical Dilution SOPs',
      'Water, Ice & Steam Quality Testing against IS 10500 standards',
      'Integrated Pest Management (IPM) & Fly Catcher Catch Logs',
      'Personnel Hygiene: Handwash stations, Cleanroom gowning, Health checks',
      'Waste Management, Drainage Slopes & Effluent Separation'
    ],
    mandatoryDocumentation: [
      'Master Sanitation Schedule (MSS) & Pre-Operational Inspection Logs',
      'Water Potability Quarterly Test Certificates (Chemical & Microbiological)',
      'Integrated Pest Management Layout, Bait Station Trend Logs & MSDS',
      'Staff Medical Fitness Certificates & Daily Grooming Checklists',
      'Glass & Brittle Plastic Register and Monthly Audit Inspection Records',
      'Equipment Preventive Maintenance & Food-Grade Lubricant Approvals'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Shopfloor Sanitary Inspection',
        action: 'Deep physical walkthrough inspecting civil fabric, drainage traps, lighting lux, handwashing stations, and staff gowning.',
        deliverable: 'Visual GMP Defect Punch List with photographic evidence and fixes.'
      },
      {
        step: 2,
        phase: 'Sanitation & Hygiene Program Setup',
        action: 'Write Master Cleaning Schedules, CIP/COP procedures, chemical dilution charts, and pest control vendor contracts.',
        deliverable: 'Complete GHP/GMP Manual and Daily Operator Monitoring Checklists.'
      },
      {
        step: 3,
        phase: 'Hygiene Culture & Staff Gowning Drills',
        action: 'Interactive training for workers in regional languages covering hand washing, hairnets, beard covers, illness reporting.',
        deliverable: 'Trained, compliant shopfloor workforce and training log.'
      },
      {
        step: 4,
        phase: 'GMP Certification Audit Support',
        action: 'Conduct formal pre-certification hygiene walkthrough and assist during external certification body inspection.',
        deliverable: 'GMP/GHP Compliance Certificate from accredited auditing body.'
      }
    ],
    auditTypes: ['Third-party GMP Audit', 'Hygiene Rating Audit', 'Supplier Hygiene Evaluation'],
    typicalTimeline: '2 to 4 Weeks',
    commercialValue: 'Elimination of customer complaints, dramatic reduction in batch spoilage, full compliance with statutory hygiene laws.'
  },
  {
    id: 'sqf-code',
    slug: 'sqf',
    code: 'SQF',
    name: 'SQF Code (Edition 9)',
    category: 'GFSI',
    categoryLabel: 'GFSI Benchmarked',
    badgeType: 'sqf',
    edition: 'SQF Food Safety Code Edition 9',
    gfsiBenchmarked: true,
    accentColor: '#1D4ED8',
    tagline: 'Rigorous GFSI-recognized food safety and quality management code favored by top North American retail and foodservice buyers.',
    shortDescription: 'Crucial for Indian and Asian food processors exporting to US and Canadian supermarket giants (Costco, Kroger, Walmart).',
    fullOverview: 'The Safe Quality Food (SQF) Program is a comprehensive food safety and quality management certification system, benchmarked by GFSI. SQF Edition 9 uses a site-specific, risk-based approach tailored to primary production, manufacturing, packaging, and distribution, with unique emphasis on SQF Practitioner leadership, approved supplier programs, and unannounced audit compliance.',
    targetIndustries: [
      'Food Exporters to the USA & Canada',
      'Fresh Cut Produce & Fruit Packhouses',
      'Dairy, Cheese & Cultured Products',
      'Edible Oils, Fats & Margarines',
      'Snack Foods, Extruded Foods & Cereals'
    ],
    keyClauses: [
      'Module 2: SQF System Elements (Management Commitment, Specifications, HACCP, Food Defense)',
      'Designation & Training of qualified SQF Practitioner',
      'Module 11: Good Manufacturing Practices for Processing of Food Products',
      'Environmental Monitoring Program (EMP) for pathogen seekers',
      'Approved Supplier Program with Mandatory Performance Metrics',
      'Annual Unannounced Audit Readiness Protocol'
    ],
    mandatoryDocumentation: [
      'Documented SQF Practitioner appointment letter and HACCP credentials',
      'SQF System Manual & Register of Controlled Documents',
      'Approved Supplier Register with COAs, Audits & Specifications',
      'Finished Product Specifications & Regulatory Compliance Sheets',
      'Environmental Pathogen Swabbing Log (Listeria / Salmonella mapping)',
      'Internal Audit Schedule covering 100% of SQF Code modules'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'SQF Code Gap & Practitioner Alignment',
        action: 'Review existing food safety controls against SQF Module 2 and relevant industry module (e.g. Module 11).',
        deliverable: 'SQF Edition 9 Gap Matrix and Practitioner Roadmap.'
      },
      {
        step: 2,
        phase: 'System Documentation & EMP Architecture',
        action: 'Formulate SQF procedures, establish pathogen monitoring zones (Zone 1 to Zone 4), and supplier verification protocols.',
        deliverable: 'Complete SQF Edition 9 Manual, EMP protocol, and allergen controls.'
      },
      {
        step: 3,
        phase: 'Mock Unannounced Audit Simulation',
        action: 'Conduct full mock audit without prior staff warning, evaluating desk audits, floor conditions, and recall drills.',
        deliverable: 'Pre-Audit Scoring & Gap Correction Action Items.'
      },
      {
        step: 4,
        phase: 'Official Certification & Desk Audit Liaison',
        action: 'Support during Document Review (Desk Audit) and on-site Facility Audit, facilitating fast response to any non-conformities.',
        deliverable: 'SQF Certificate with High Rating (Good/Excellent).'
      }
    ],
    auditTypes: ['Initial Desk & Facility Audit', 'Annual Surveillance', 'Mandatory 3-Year Unannounced Audit'],
    typicalTimeline: '8 to 14 Weeks',
    commercialValue: 'Direct access to North American retail and foodservice supply chains; satisfying Costco, Walmart US, and Sysco supplier vendor codes.'
  },
  {
    id: 'us-fda-fsma',
    slug: 'us-fda-fsma',
    code: 'US FDA FSMA',
    name: 'US FDA FSMA & PCQI / HARPC',
    category: 'HYGIENE',
    categoryLabel: 'US Regulatory Compliance',
    badgeType: 'usfda',
    edition: '21 CFR Part 117 (Current Good Manufacturing Practice & Preventive Controls for Human Food)',
    gfsiBenchmarked: false,
    accentColor: '#1E3A8A',
    tagline: 'Statutory compliance for food manufacturers exporting to the United States under the Food Safety Modernization Act.',
    shortDescription: 'Mandatory for every food, spice, beverage, or ingredient exporter shipping into the United States of America.',
    fullOverview: 'The FDA Food Safety Modernization Act (FSMA) shifted the focus from responding to contamination to preventing it. Under 21 CFR Part 117, food facilities exporting to the USA must implement Hazard Analysis and Risk-Based Preventive Controls (HARPC). A Food Safety Plan must be developed and overseen by a qualified Preventive Controls Qualified Individual (PCQI).',
    targetIndustries: [
      'All Food & Beverage Exporters to the USA',
      'Spice, Herb & Seasoning Exporters',
      'Basmati Rice & Grain Processing Mills',
      'Frozen Seafood & Shrimp Exporters',
      'Pickles, Chutneys, Pastes & Sauce Exporters'
    ],
    keyClauses: [
      'Subpart B: Current Good Manufacturing Practice (cGMP)',
      'Subpart C: Hazard Analysis and Risk-Based Preventive Controls (HARPC)',
      'Process Controls (validated cooking, pasteurization, refrigeration)',
      'Food Allergen Controls (cross-contact prevention & correct labelling)',
      'Sanitation Controls (pathogen harborage eradication)',
      'Supply-Chain Applied Controls (raw material verification)',
      'Recall Plan (mandatory for every facility subject to preventive controls)'
    ],
    mandatoryDocumentation: [
      'FDA Facility Registration Number & Unique Facility Identifier (DUNS / UFI)',
      'FSMA Food Safety Plan signed and dated by certified PCQI',
      'Process, Allergen, Sanitation & Supply-Chain Preventive Controls Log',
      'Validation Studies for Process Preventive Controls (Thermal Death Time / F-Values)',
      'Foreign Supplier Verification Program (FSVP) dossiers for US importers',
      'Mock Recall Records verifying trace-back within FDA required timeframes'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Export Portfolio HARPC Review',
        action: 'Review formulations, packaging labels, and US FDA compliance history for each SKU designated for American export.',
        deliverable: 'Product-by-product FSMA Hazard & Regulatory Review.'
      },
      {
        step: 2,
        phase: 'HARPC Food Safety Plan Formulation',
        action: 'Draft the official Food Safety Plan including Process, Allergen, Sanitation, and Supply-Chain controls by certified PCQI.',
        deliverable: 'Official FDA-Compliant Food Safety Plan dossier.'
      },
      {
        step: 3,
        phase: 'US Label & Allergen Declaration Review',
        action: 'Check product labelling against FALCPA and FASTER Act (Big 9 Allergens including Sesame) and FDA nutrition facts requirements.',
        deliverable: '100% compliant export packaging proof.'
      },
      {
        step: 4,
        phase: 'FDA Inspection Readiness & FSVP Support',
        action: 'Prepare plant management for potential unannounced FDA foreign inspection and coordinate with US Importer for FSVP records.',
        deliverable: 'Inspection-ready plant dossier and zero Import Alert status.'
      }
    ],
    auditTypes: ['US FDA Foreign Facility Inspection', 'Third-Party FSVP Audit', 'US Importer Technical Audit'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Zero customs detention at US ports of entry, smooth clearance with US Customs and Border Protection, protecting multi-million export orders.'
  },
  {
    id: 'halal',
    slug: 'halal',
    code: 'HALAL',
    name: 'Halal Certification Readiness',
    category: 'SPECIALIZED',
    categoryLabel: 'Dietary & Religious',
    badgeType: 'halal',
    edition: 'GSO 2055-1, JAKIM Malaysia, MUI Indonesia & Global Standards',
    gfsiBenchmarked: false,
    accentColor: '#15803D',
    tagline: 'Comprehensive Halal compliance framework ensuring ingredient permissibility, segregation, and audit readiness.',
    shortDescription: 'Required for food, beverage, and flavour exporters supplying the GCC, Middle East, Southeast Asia, and domestic Muslim communities.',
    fullOverview: 'Halal food compliance guarantees that all raw materials, additives, processing aids, cleaning chemicals, and packaging materials conform to Islamic Shariah requirements. It prohibits Najs (impurities), pork derivatives, non-dhabihah animal components, and intoxicating substances. Facilities must demonstrate strict segregation, dedicated equipment or certified ritual cleansing (Samak/Sertu).',
    targetIndustries: [
      'Meat & Poultry Slaughterhouses & Processors',
      'Food Flavours, Fragrances & Seasoning Blenders',
      'Gelatin, Emulsifiers, Enzymes & Food Additives',
      'Confectionery, Chocolates, Cookies & Biscuits',
      'Dairy, Ghee, Butter & Milk Powder Plants'
    ],
    keyClauses: [
      'Raw Material & Additive Permissibility (No E-numbers derived from non-halal animal sources)',
      'Processing Line Dedication & Cross-Contamination Prevention',
      'Equipment Cleaning & Ritual Sanitation Protocols (Sertu/Samak where required)',
      'Internal Halal Committee (IHC) Appointment & Halal Assurance System (HAS)',
      'Warehousing & Logistics Segregation for Halal Products',
      'Packaging Material Permissibility (no porcine/animal fat slip agents)'
    ],
    mandatoryDocumentation: [
      'Internal Halal Committee (IHC) Charter and meeting records',
      'Halal Assurance System (HAS) Manual & Halal Policy Statement',
      'Master Raw Material Matrix with valid Halal Certificates for 100% of ingredients',
      'Manufacturing Process Flowchart identifying all Halal Control Points (HCP)',
      'Cleaning and Sanitation SOPs using Halal-approved cleaning chemicals',
      'Traceability Records verifying segregation from receiving to shipping'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Ingredient & Additive Screening',
        action: 'Meticulous verification of every raw material, enzyme, flavouring, glycerin, emulsifier, and packaging slip agent against Halal permissibility.',
        deliverable: 'Halal Ingredient Approval Matrix and substitution recommendations.'
      },
      {
        step: 2,
        phase: 'Halal Assurance System (HAS) Setup',
        action: 'Draft the site Halal Assurance Manual, establish the Internal Halal Committee, and define Halal Control Points (HCPs).',
        deliverable: 'Complete HAS Manual and training of internal committee.'
      },
      {
        step: 3,
        phase: 'Sanitary Segregation & Processing Verification',
        action: 'Verify physical separation of raw materials, dedicated storage racks, and documented cleaning procedures.',
        deliverable: 'Factory floor Halal compliance readiness verification.'
      },
      {
        step: 4,
        phase: 'Shariah & Technical Audit Support',
        action: 'Liaison with accredited Halal Certification Bodies (GSO/JAKIM recognized) and assistance during on-site Shariah and technical audits.',
        deliverable: 'Issuance of accredited Halal Certificate for export products.'
      }
    ],
    auditTypes: ['Initial Halal Audit', 'Annual Surveillance Audit', 'Ingredient Halal Validation Audit'],
    typicalTimeline: '3 to 6 Weeks',
    commercialValue: 'Access to the $2.2+ Trillion global Islamic food economy, compliance with Gulf/GCC mandatory import decrees, and customer trust.'
  },
  {
    id: 'kosher',
    slug: 'kosher',
    code: 'KOSHER',
    name: 'Kosher Certification Readiness',
    category: 'SPECIALIZED',
    categoryLabel: 'Dietary & Religious',
    badgeType: 'kosher',
    edition: 'Kashrut Dietary Laws (Orthodox Union, Star-K, OK, KOF-K Standards)',
    gfsiBenchmarked: false,
    accentColor: '#1E3A8A',
    tagline: 'Meticulous Kashrut compliance consulting for ingredient verification, equipment kosherization, and rabbinical audits.',
    shortDescription: 'Essential for exporters of food ingredients, spices, teas, and packaged products targeting North America, Israel, and Europe.',
    fullOverview: 'Kosher certification confirms that ingredients and production processes adhere to Jewish dietary law (Kashrut). It regulates meat and dairy separation (Fleishig and Milchig), non-meat/non-dairy items (Pareve), acceptable enzymes, insect infestation avoidance in grains/herbs, and equipment kosherization (kashering) under the supervision of a Rabbinic Field Representative.',
    targetIndustries: [
      'Bulk Ingredients, Extracts & Essential Oils',
      'Dehydrated Vegetables, Onion, Garlic & Herbs',
      'Tea & Coffee Processors & Packers',
      'Grains, Rice, Pulses & Flours',
      'Fruit Purees, Concentrates & Aseptic Pastes'
    ],
    keyClauses: [
      'Pareve / Dairy / Meat Classification & Segregation',
      'Approved Ingredient Matrix (Schedule A - approved raw materials)',
      'Approved Product Matrix (Schedule B - certified finished goods)',
      'Equipment Kosherization (Boiling water / Steam purging protocols under Rabbinical direction)',
      'Steam & Condensate Recycling controls (avoiding cross-contamination via closed boilers)',
      'Insect Infestation Prevention & Microscopic Screening protocols'
    ],
    mandatoryDocumentation: [
      'Schedule A (Complete list of all raw materials, manufacturers, and Kosher certs)',
      'Schedule B (List of finished items with designated Kosher symbol - Pareve/Dairy)',
      'Process Flowcharts showing shared tanks, pipes, and pasteurizers',
      'Kashering Logs (boiler temperatures, holding times, cleanout verification)',
      'Receiving Inspection Logs verifying Kosher logos on incoming raw ingredient boxes'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Raw Material Schedule A Formulation',
        action: 'Review suppliers and obtain valid Kosher Letters of Certification (LOC) for every component, processing aid, and boiler chemical.',
        deliverable: 'Complete Schedule A documentation dossier.'
      },
      {
        step: 2,
        phase: 'Plant Thermal & Piping Layout Review',
        action: 'Assess heat exchangers, shared CIP systems, and condensate return lines to prevent thermal cross-contamination.',
        deliverable: 'Piping & instrumentation Kosher feasibility report.'
      },
      {
        step: 3,
        phase: 'Rabbinic Pre-Visit Preparation',
        action: 'Prepare equipment cleanout schedules, ensure English ingredient labelling, and train QA managers on Kashrut rules.',
        deliverable: 'Audit-ready facility and personnel.'
      },
      {
        step: 4,
        phase: 'Rabbinical Inspection & Certification Coordination',
        action: 'Host the Rabbinic Field Representative, facilitate the physical inspection, and complete contract signing.',
        deliverable: 'Issuance of official Kosher Certificate with authorized symbol usage.'
      }
    ],
    auditTypes: ['Initial Rabbinic Inspection', 'Annual Re-inspection', 'Periodic Unannounced Rabbinic Visits'],
    typicalTimeline: '3 to 6 Weeks',
    commercialValue: 'Premium market placement in US/European supermarkets, high consumer trust across kosher and allergen-conscious buyers.'
  },
  {
    id: 'fssai-fostac',
    slug: 'fssai',
    code: 'FSSAI FoSTaC',
    name: 'FSSAI Licensing & FoSTaC Compliance',
    category: 'HYGIENE',
    categoryLabel: 'Indian Statutory Mandate',
    badgeType: 'fssai',
    edition: 'Food Safety and Standards (Licensing & Registration) Regulations',
    gfsiBenchmarked: false,
    accentColor: '#EA580C',
    tagline: 'Statutory compliance support for central/state FSSAI licensing, mandatory FoSTaC Food Safety Supervisors, and hygiene rating audits.',
    shortDescription: 'The compulsory regulatory authorization required for every food business operator (FBO) operating in India.',
    fullOverview: 'The Food Safety and Standards Authority of India (FSSAI) is the apex regulatory body governing food safety in India. Under FSS Act 2006, every food manufacturing, handling, or distribution facility must hold a valid Central or State FSSAI License, comply with Schedule 4 sanitary conditions, maintain mandatory FoSTaC-trained Food Safety Supervisors, and file annual returns (Form D1/D2).',
    targetIndustries: [
      'Every Food Business Operator (FBO) in India',
      'Food Processing & Packaging Plants',
      'Distributors, Wholesalers & C&F Agents',
      'Hotels, Caterers, Cloud Kitchens & Restaurants',
      'Direct-to-Consumer (D2C) Food Brands & E-commerce'
    ],
    keyClauses: [
      'Schedule 4: General Hygienic and Sanitary Practices for Food Manufacturers',
      'FSSAI FoSTaC Food Safety Supervisor Mandate (1 per 25 food handlers)',
      'Mandatory Water Testing in FSSAI-Notified NABL Accredited Labs (IS 10500)',
      'Periodic Product Testing (Chemical, Microbiological, Heavy Metals, Pesticides)',
      'Food Safety Display Boards (FSDB) & Recall Procedure Implementation',
      'Annual Returns (FoSCoS D-1 Form) & Statutory Product Approvals'
    ],
    mandatoryDocumentation: [
      'Valid FSSAI Central / State License on FoSCoS portal',
      'Certified FoSTaC Food Safety Supervisor Certificates for on-site staff',
      'NABL Laboratory Test Reports for raw materials, finished products & water',
      'Schedule 4 Hygiene Checklist self-inspection records',
      'Medical Fitness Certificates & Typhoid vaccinations for all food handlers',
      'Pest Control Contract and monthly treatment logs'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'FoSCoS License Audit & Gap Assessment',
        action: 'Review existing license categories, processing capacities, food product categories, and statutory compliance status.',
        deliverable: 'FSSAI Regulatory Health Check Report.'
      },
      {
        step: 2,
        phase: 'Schedule 4 Sanitation Implementation',
        action: 'Implement Schedule 4 sanitary requirements across plant floors, hygiene stations, insect screens, and waste disposal.',
        deliverable: 'Schedule 4 Compliance Dossier and signed internal records.'
      },
      {
        step: 3,
        phase: 'FoSTaC Supervisor Training & Certification',
        action: 'Conduct official FoSTaC training programs for production supervisors and QA leads to satisfy regulatory mandates.',
        deliverable: 'Government-recognized FoSTaC certificates for personnel.'
      },
      {
        step: 4,
        phase: 'Hygiene Rating & Regulatory Inspection Readiness',
        action: 'Prepare the site for third-party Hygiene Rating audits and FSSAI Food Safety Officer (FSO) inspections.',
        deliverable: '5-Star Hygiene Rating Certificate and uncompromised compliance.'
      }
    ],
    auditTypes: ['FSSAI Hygiene Rating Audit', 'FSO Statutory Regulatory Inspection', 'License Renewal & Capacity Modification Audit'],
    typicalTimeline: '2 to 4 Weeks',
    commercialValue: 'Uninterrupted legal operation in India, protection against heavy penalties and license suspensions, enhanced consumer trust.'
  },
  {
    id: 'iso-9001',
    slug: 'iso-9001',
    code: 'ISO 9001',
    name: 'ISO 9001:2015 Quality Management',
    category: 'ISO',
    categoryLabel: 'ISO International Scheme',
    badgeType: 'iso9001',
    edition: 'ISO 9001:2015 Quality Management Systems',
    gfsiBenchmarked: false,
    accentColor: '#2563EB',
    tagline: 'The global benchmark for quality management systems ensuring consistent product quality, customer satisfaction, and continuous improvement.',
    shortDescription: 'Ideal for food packaging, equipment manufacturers, ingredient suppliers, and integrated operations.',
    fullOverview: 'ISO 9001:2015 is the world’s most widely adopted quality management framework. For food companies, food packaging producers, and food machinery fabricators, it guarantees consistent batch-to-batch quality, rigorous supplier qualification, documented standard operating procedures, customer complaint resolution, and management accountability.',
    targetIndustries: [
      'Food Packaging & Film Converters',
      'Food Processing Machinery & Stainless Steel Fabricators',
      'Food Ingredient & Chemical Supply Chains',
      'Integrated Agribusiness & Commodity Traded Produce',
      'Laboratory & Food Testing Facilities'
    ],
    keyClauses: [
      'Clause 4: Context of the Organization & Interested Parties',
      'Clause 5: Leadership & Customer-Focused Commitment',
      'Clause 6: Planning – Risk and Opportunities Management',
      'Clause 7: Resource Management, Competence & Calibrations',
      'Clause 8: Operation – Design, Purchasing, Production & Release',
      'Clause 9 & 10: Performance Evaluation, Internal Audits & Non-conformities'
    ],
    mandatoryDocumentation: [
      'Quality Manual & Documented Quality Policy',
      'Quality Objectives with Measurable KPI Dashboards',
      'Risk & Opportunity Assessment Matrix',
      'Supplier Evaluation & Approved Vendor Performance Matrix',
      'Equipment Calibration Certificates & In-Process Inspection Records',
      'Customer Feedback & Corrective Action (CAPA) Log'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Quality Gap Assessment & Process Mapping',
        action: 'Map core business processes from order receipt to manufacturing, QA release, and shipping.',
        deliverable: 'ISO 9001 Process Interaction Matrix.'
      },
      {
        step: 2,
        phase: 'Documentation & KPI Dashboard Architecture',
        action: 'Establish quality objectives, SOPs, work instructions, and calibration intervals.',
        deliverable: 'Complete Quality Manual and operational registers.'
      },
      {
        step: 3,
        phase: 'Internal Audit & Management Review',
        action: 'Train internal auditors, carry out full system internal audit, and conduct formal Management Review.',
        deliverable: 'Internal Audit Report and CAPA logs.'
      },
      {
        step: 4,
        phase: 'Stage 1 & Stage 2 Certification Support',
        action: 'Coordinate with accredited CB, represent the company during audits, and resolve any findings.',
        deliverable: 'ISO 9001:2015 Certificate from accredited Certification Body.'
      }
    ],
    auditTypes: ['Initial Certification', 'Annual Surveillance', 'Triennial Recertification'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Enhanced tender eligibility, operational waste reduction, institutionalized quality culture, and international client acceptance.'
  },
  {
    id: 'usda-organic',
    slug: 'usda-organic',
    code: 'USDA ORGANIC',
    name: 'USDA Organic & NPOP Certification',
    category: 'SPECIALIZED',
    categoryLabel: 'Dietary & Specialized',
    badgeType: 'organic',
    edition: 'USDA National Organic Program (NOP) & India NPOP',
    gfsiBenchmarked: false,
    accentColor: '#15803D',
    tagline: 'Rigorous organic integrity compliance ensuring 100% synthetic chemical prohibition, non-GMO status, and batch traceability.',
    shortDescription: 'Compulsory for organic farms, processing plants, tea estates, spices, and grains claiming organic status.',
    fullOverview: 'Organic certification under the USDA National Organic Program (NOP) and Indian National Programme for Organic Production (NPOP) verifies that agricultural produce and processed foods are cultivated and manufactured without prohibited synthetic pesticides, chemical fertilizers, sewage sludge, irradiation, or genetic engineering. Stringent buffer zones and zero commingling are mandatory.',
    targetIndustries: [
      'Organic Tea, Coffee & Herbal Infusion Estates',
      'Organic Spices, Turmeric, Ginger & Herb Processors',
      'Organic Pulses, Grains, Flour & Millets',
      'Organic Honey, Jaggery & Sweetener Producers',
      'Organic Cold-Pressed Oils & Superfoods'
    ],
    keyClauses: [
      'Organic System Plan (OSP) formulation and maintenance',
      'Prohibited Substance Exclusion (3-year field transition records)',
      'Physical Segregation & Prevention of Commingling with conventional stock',
      'Sanitizer & Cleaning Chemical Verification (OMRI / NOP allowed list)',
      'Pest Management without prohibited synthetic insecticides',
      'Complete Traceability & Mass-Balance Reconciliation across all organic lots'
    ],
    mandatoryDocumentation: [
      'Organic System Plan (OSP) detailing handling and processing',
      'Organic Certificates & Transaction Certificates (TC) for all incoming raw stock',
      'Cleanout & Flush Logs before running organic batches on shared machinery',
      'Pest Control Materials list and authorization records',
      'Organic Labeling Proofs complying with USDA Organic seal rules',
      'Mass-Balance reconciliation matching raw crop purchased to finished bags sold'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Organic Feasibility & Supply Chain Trace',
        action: 'Audit farmer group certifications, procurement records, and processing facility separation.',
        deliverable: 'Organic Feasibility & Segregation Assessment.'
      },
      {
        step: 2,
        phase: 'Organic System Plan (OSP) Drafting',
        action: 'Formulate the official OSP document, cleaning flush protocols, and packaging compliance.',
        deliverable: 'Complete Organic System Plan dossier.'
      },
      {
        step: 3,
        phase: 'Shopfloor Cleanout & Traceability Drill',
        action: 'Train operators on purge runs, organic labeling, and execute a 100% mass-balance audit.',
        deliverable: 'Demonstrated mass-balance proof.'
      },
      {
        step: 4,
        phase: 'Certifier Inspection & Transaction Support',
        action: 'Support during on-site audit by accredited certifier (e.g. OneCert, Aditi, Control Union) and Transaction Certificate setup.',
        deliverable: 'USDA / NPOP Organic Certificate recommendation.'
      }
    ],
    auditTypes: ['Annual On-site Organic Inspection', 'Unannounced Sampling Inspection'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Premium retail price realization (20% - 80% markup), export eligibility to USA and EU organic markets.'
  },
  {
    id: 'ifs-food',
    slug: 'ifs-food',
    code: 'IFS Food',
    name: 'IFS Food (Version 8)',
    category: 'GFSI',
    categoryLabel: 'GFSI Benchmarked',
    badgeType: 'ifs',
    edition: 'IFS Food Standard Version 8',
    gfsiBenchmarked: true,
    accentColor: '#0369A1',
    tagline: 'Leading GFSI-benchmarked audit standard for food manufacturers supplying European and continental retail chains.',
    shortDescription: 'Essential for food exporters supplying private-label products to German, French, Italian, and Spanish retailers.',
    fullOverview: 'IFS Food is a GFSI-recognized standard for auditing food manufacturers with a strong focus on food safety, process quality, and customer specifications. Widely required by retailers across Germany, France, Austria, and Italy (such as Lidl, Aldi, Carrefour, and Metro), IFS uses a distinctive percentage-based scoring system (Foundation Level vs Higher Level).',
    targetIndustries: [
      'Food Processors exporting to Germany, France & Western Europe',
      'Private-Label Food Manufacturers for EU Retailers',
      'Frozen Vegetables, Fruits & Culinary Herbs',
      'Bakery, Pastas, Sauces & Condiments'
    ],
    keyClauses: [
      'Governance & Commitment (Food Safety Culture)',
      'Food Safety & Quality Management System (HACCP Codex)',
      'Resource Management (Hygiene training & sanitary facilities)',
      'Operational Processes (Customer specifications, recipe control, foreign bodies)',
      'Measurements, Analyses & Improvements (Internal audits, product testing, recall)',
      'Food Defense Assessment & Site Security'
    ],
    mandatoryDocumentation: [
      'Food Safety & Quality Policy endorsed by Board of Directors',
      'Documented HACCP Study based on Codex Alimentarius',
      'Raw Material, Packaging & Finished Good Technical Specs',
      'Customer Specific Requirements (CSR) Compliance Register',
      'Environmental Monitoring Program (EMP) Results',
      'IFS Knock-Out (KO) Requirements compliance proofs'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'IFS KO Requirements Diagnostic',
        action: 'Evaluate the 10 Knock-Out (KO) requirements where failure causes immediate audit collapse.',
        deliverable: 'IFS KO Readiness Matrix.'
      },
      {
        step: 2,
        phase: 'System Documentation & HACCP Alignment',
        action: 'Align quality records, food defense plan, and customer recipe verification with IFS v8.',
        deliverable: 'IFS Food v8 Manual and registers.'
      },
      {
        step: 3,
        phase: 'Mock Audit & Scoring Simulation',
        action: 'Simulated audit targeting >= 95% score for IFS Higher Level Certification.',
        deliverable: 'Pre-Audit Scorecard and remedial actions.'
      },
      {
        step: 4,
        phase: 'Official CB Audit Guidance',
        action: 'Liaison with accredited certification body and CAPA resolution in the IFS portal.',
        deliverable: 'IFS Food Version 8 Certificate at Higher Level.'
      }
    ],
    auditTypes: ['Announced Certification', 'Unannounced Certification', 'Surveillance'],
    typicalTimeline: '6 to 12 Weeks',
    commercialValue: 'Direct acceptance by Lidl, Aldi, Rewe, Edeka, Carrefour and major European retail buyers.'
  },
  {
    id: 'iso-14001',
    slug: 'iso-14001',
    code: 'ISO 14001',
    name: 'ISO 14001:2015 Environment',
    category: 'ISO',
    categoryLabel: 'ISO International Scheme',
    badgeType: 'iso14001',
    edition: 'ISO 14001:2015 Environmental Management',
    gfsiBenchmarked: false,
    accentColor: '#15803D',
    tagline: 'International standard for environmental management systems helping food plants reduce waste, conserve water, and satisfy ESG mandates.',
    shortDescription: 'Crucial for sustainable food plants, breweries, dairies, and export processors meeting global green mandates.',
    fullOverview: 'ISO 14001:2015 provides an environmental management system (EMS) framework for food and beverage companies. It enables plants to identify environmental aspects (effluent discharge, water consumption, boiler emissions, packaging waste), maintain legal compliance with Pollution Control Boards, reduce carbon footprints, and fulfill corporate ESG requirements.',
    targetIndustries: [
      'Breweries, Distilleries & Beverage Bottling Plants',
      'Large-scale Dairy & Milk Processing Facilities',
      'Edible Oil Extraction & Refining Plants',
      'Snack & Grain Mills with High Energy Usage',
      'Export Plants facing European Corporate Due Diligence Rules'
    ],
    keyClauses: [
      'Environmental Aspects & Impacts Evaluation (Life Cycle Perspective)',
      'Statutory Compliance Obligations (State Pollution Control Board consents)',
      'Environmental Objectives & Operational Planning',
      'Emergency Preparedness & Response (Chemical spills, ammonia leaks)',
      'Effluent Treatment Plant (ETP) & Air Emission Monitoring',
      'Resource Conservation (Water balance, energy efficiency, solid waste recycling)'
    ],
    mandatoryDocumentation: [
      'Environmental Aspects & Impacts Register',
      'Legal & Other Requirements Register (Consent to Operate / CPCB norms)',
      'ETP Operating Logs, Treated Water Test Reports & Flow Meter Readings',
      'Hazardous & Solid Waste Storage, Disposal Manifests (Form 10 / State SPCB)',
      'Emergency Response Plans for Hazardous Chemical / Fuel Spills',
      'Internal EMS Audit Reports and Management Review Minutes'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Environmental Aspects & Legal Compliance Audit',
        action: 'Identify emission points, wastewater discharge, diesel storage, and state pollution consent validity.',
        deliverable: 'Comprehensive Environmental Aspects Register.'
      },
      {
        step: 2,
        phase: 'EMS Procedures & Waste Management Setup',
        action: 'Formulate spill response procedures, water conservation programs, and waste disposal manifests.',
        deliverable: 'Complete ISO 14001 Manual and Operational Control Procedures.'
      },
      {
        step: 3,
        phase: 'Mock Drill & Internal EMS Audit',
        action: 'Execute chemical spill response drill, calibrate meters, and perform mandatory internal audit.',
        deliverable: 'Internal Audit Findings & CAPA resolution.'
      },
      {
        step: 4,
        phase: 'Stage 1 & 2 Certification Support',
        action: 'Liaise with CB auditors, provide technical justifications, and ensure certification recommendation.',
        deliverable: 'ISO 14001:2015 Environmental Management Certificate.'
      }
    ],
    auditTypes: ['Initial Certification', 'Annual Surveillance', 'Recertification'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Compliance with environmental laws, energy & water cost savings, superior ESG ratings for retail vendor qualification.'
  },
  {
    id: 'iso-45001',
    slug: 'iso-45001',
    code: 'ISO 45001',
    name: 'ISO 45001:2018 Safety',
    category: 'ISO',
    categoryLabel: 'ISO International Scheme',
    badgeType: 'iso45001',
    edition: 'ISO 45001:2018 Occupational Health & Safety',
    gfsiBenchmarked: false,
    accentColor: '#DC2626',
    tagline: 'Global standard for occupational health and safety protecting food plant operators from machinery, thermal, chemical, and ergonomic hazards.',
    shortDescription: 'Essential for processing plants aiming for zero shopfloor injuries, employee safety, and statutory factory compliance.',
    fullOverview: 'ISO 45001:2018 provides a framework for managing occupational health and safety (OH&S) risks. In food manufacturing environments, workers face high-risk hazards such as slippery wet floors, high-speed automated packaging machinery, sub-zero cold rooms, pressurized boilers, ammonia refrigeration lines, and heavy manual lifting. ISO 45001 prevents workplace incidents and fosters a culture of safety.',
    targetIndustries: [
      'Industrial Food Processing & Automated Packaging Facilities',
      'Cold Storage, Frozen Food & Deep-Chill Logistics',
      'Meat, Poultry & Fish Processing Plants',
      'Bakeries with High-Heat Ovens & Flour Dust Environments',
      'Beverage Bottling with High-Pressure Steam & Line Speeds'
    ],
    keyClauses: [
      'Hazard Identification & Risk Assessment (HIRA)',
      'Worker Consultation & Health/Safety Committee Participation',
      'Permit-to-Work (PTW) System (Confined space, hot work, height work)',
      'Machine Guarding, LOTO (Lockout/Tagout) & Safety Interlocks',
      'PPE Selection, Maintenance & Training',
      'Accident, Near-Miss & Incident Investigation Protocols'
    ],
    mandatoryDocumentation: [
      'OH&S Policy & Measurable Safety Objectives',
      'Comprehensive HIRA (Hazard Identification & Risk Assessment) Matrix',
      'Permit to Work (PTW) Records and LOTO Procedures',
      'Factory Act Statutory Compliance Register (Pressure vessel testing, crane fitness)',
      'First Aid Log, Accident / Near-Miss Reporting Register',
      'Emergency Evacuation Drill Records & Fire Hydrant Inspection Logs'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Shopfloor Hazard Walkthrough (HIRA)',
        action: 'Inspect factory floor machines, electrical panels, ammonia lines, chemical handling, and ergonomic risks.',
        deliverable: 'Complete HIRA Risk Register with corrective priorities.'
      },
      {
        step: 2,
        phase: 'Safety Procedures & PTW Architecture',
        action: 'Establish Lockout/Tagout (LOTO), hot work permits, confined space entry, and PPE protocols.',
        deliverable: 'ISO 45001 Safety Manual & Standard Operating Procedures.'
      },
      {
        step: 3,
        phase: 'Safety Committee Training & Fire Drills',
        action: 'Form the plant safety committee, train fire wardens and first aiders, and execute live evacuation drill.',
        deliverable: 'Trained safety workforce and verified emergency preparedness.'
      },
      {
        step: 4,
        phase: 'Certification Body Audit Assistance',
        action: 'Represent the plant during external OH&S audits and close any audit findings.',
        deliverable: 'ISO 45001:2018 Certification recommendation.'
      }
    ],
    auditTypes: ['Initial Certification', 'Annual Surveillance', 'Recertification'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Zero workplace fatalities, lower worker compensation premiums, high employee morale, and factory compliance.'
  },
  {
    id: 'non-gmo-verified',
    slug: 'non-gmo-verified',
    code: 'NON GMO VERIFIED',
    name: 'Non-GMO Project Verification',
    category: 'SPECIALIZED',
    categoryLabel: 'Dietary & Specialized',
    badgeType: 'nongmo',
    edition: 'Non-GMO Project Standard (Current Version)',
    gfsiBenchmarked: false,
    accentColor: '#D97706',
    tagline: 'North America’s most trusted third-party verification for non-GMO foods, requiring rigorous PCR testing and traceability.',
    shortDescription: 'Demanded by health-food retailers in the US and Canada for soybeans, corn, grains, canola, and honey.',
    fullOverview: 'The Non-GMO Project Verification is North America’s premier third-party verification program for products produced without genetic engineering. For food exporters in India and Asia supplying basmati rice, soybeans, spices, guar gum, and herbal extracts, Non-GMO Project butterfly seal verification demonstrates rigorous identity preservation, seed testing, and zero contamination.',
    targetIndustries: [
      'Basmati Rice, Millets & Specialty Grain Exporters',
      'Soybean, Tofu & Soy Lecithin Processors',
      'Guar Gum, Hydrocolloids & Texture Ingredients',
      'Spices, Herbs, Botanicals & Essential Oils',
      'Honey, Sweeteners & Specialty Condiments'
    ],
    keyClauses: [
      'High-Risk, Monitored-Risk & Low-Risk Crop Ingredient Categorization',
      'Testing Plan using ISO 17025 accredited PCR testing labs',
      'Threshold of 0.9% for human food and 0.25% for seed',
      'Identity Preservation (IP) system from farm receiving to finished package',
      'Segregation & Flush protocols on shared harvesting and milling equipment',
      'Annual Documentation Verification by Technical Administrator'
    ],
    mandatoryDocumentation: [
      'Master Ingredient Formula Worksheet detailing origin of every input',
      'Non-GMO affidavits and PCR test certificates from ISO 17025 labs',
      'Identity Preservation (IP) Standard Operating Procedures',
      'Cleanout & Flush records for grain elevators, conveyors, and mills',
      'Packaging artwork proof showing authorized Non-GMO Project butterfly seal',
      'Annual mass-balance audit verifying non-GMO inputs equal outputs'
    ],
    essorRoadmap: [
      {
        step: 1,
        phase: 'Ingredient Risk Classification',
        action: 'Categorize every ingredient into high-risk (corn, soy, canola, cotton, papaya, sugar beet) or low-risk inputs.',
        deliverable: 'Non-GMO Risk Assessment Schedule.'
      },
      {
        step: 2,
        phase: 'Identity Preservation (IP) Protocol Design',
        action: 'Establish grain cleaning flushes, lot numbering, and ISO 17025 PCR sampling protocol.',
        deliverable: 'Customized IP Manual and Testing Matrix.'
      },
      {
        step: 3,
        phase: 'Technical Administrator Dossier Submission',
        action: 'Assemble supporting testing certificates and affidavits for submission to certifiers (e.g. FoodChain ID, SCS Global).',
        deliverable: 'Complete verification dossier submission.'
      },
      {
        step: 4,
        phase: 'Verification Approval & Seal Authorization',
        action: 'Facilitate fast turnaround for clarificatory queries and obtain official authorization to print the Non-GMO butterfly.',
        deliverable: 'Non-GMO Project Certificate of Verification.'
      }
    ],
    auditTypes: ['Annual Document Review', 'On-Site Verification Audit for High-Risk Processing'],
    typicalTimeline: '4 to 8 Weeks',
    commercialValue: 'Premium retail consumer trust in North American natural food channels (Whole Foods, Sprouts, Trader Joe’s).'
  }
];

export function getStandardBySlug(slug: string): AuditStandard | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  return AUDIT_STANDARDS.find(
    (s) => s.slug.toLowerCase() === clean || s.id.toLowerCase() === clean || s.code.toLowerCase().replace(/[^a-z0-9]/g, '-') === clean
  );
}

export function getRelatedStandards(standard: AuditStandard, limit = 3): AuditStandard[] {
  return AUDIT_STANDARDS
    .filter((s) => s.id !== standard.id)
    .sort((a, b) => {
      if (a.category === standard.category && b.category !== standard.category) return -1;
      if (b.category === standard.category && a.category !== standard.category) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getStandardFaqs(standard: AuditStandard): { question: string; answer: string }[] {
  if (standard.faqs && standard.faqs.length > 0) {
    return standard.faqs;
  }

  // Schema-optimized comprehensive standard-specific Q&As
  return [
    {
      question: `What is ${standard.code} and why is it essential for food businesses in India?`,
      answer: `${standard.name} is a globally recognized certification and compliance benchmark. For Indian food processors, packaging converters, and exporters, holding ${standard.code} certification verifies that products meet rigorous international safety, hygiene, and traceability criteria, significantly reducing customer rejection risks and satisfying statutory regulations.`
    },
    {
      question: `How long does it take to prepare for and pass a ${standard.code} audit?`,
      answer: `Typical timeline is ${standard.typicalTimeline}. With ESSOR's structured 4-phase roadmap—covering baseline diagnostic gap analysis, HACCP/PRP documentation overhaul, employee shopfloor coaching, and mock audit simulations—facilities achieve 100% audit readiness and first-time pass rates.`
    },
    {
      question: `What are the mandatory documents required for ${standard.code} certification?`,
      answer: `Key documentation includes: ${standard.mandatoryDocumentation.slice(0, 4).join(', ')}, plus internal audit registers, management review minutes, and calibration certificates.`
    },
    {
      question: `How does ESSOR support our food processing unit during the certification body audit?`,
      answer: `ESSOR deploys qualified Lead Auditors on-site during Stage 1 and Stage 2 third-party certification audits. We facilitate auditor technical queries, assist in closing any minor observations using 5-Why root cause analysis, and ensure 100% CAPA acceptance by accredited Certification Bodies.`
    }
  ];
}
