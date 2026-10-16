import { ServiceItem, TrainingCourse, Enquiry, CMSContent, AdminUser } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'audit-readiness',
    title: 'Audit & Certification Readiness',
    category: 'AUDIT_READINESS',
    shortDescription: 'Gap assessment, documentation, implementation, mock audits, audit support and NC/CAPA closure.',
    fullDescription: 'End-to-end support before, during and after an audit, with emphasis on evidence, implementation and structured closure. We guide organizations across international food safety standards, management systems, and specialized buyer protocols.',
    deliverables: [
      'Evidence availability reviews and baseline gap assessments',
      'Food safety management system documentation & SOP development',
      'Operational implementation coaching & team readiness',
      'Realistic mock audits simulating certification body rigor',
      'Official audit coordination & technical rebuttal assistance',
      'Non-conformity (NC) root cause analysis and CAPA verification closure'
    ],
    applicableStandards: [
      'FSSC 22000',
      'ISO 22000',
      'HACCP',
      'GMP / GHP',
      'BRCGS',
      'SQF',
      'IFS Food'
    ],
    displayOrder: 1,
    status: 'PUBLISHED',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'srv-2',
    slug: 'managed-support',
    title: 'Managed Food-Safety Support',
    category: 'MANAGED_SUPPORT',
    shortDescription: 'Ongoing GMP/hygiene checks, supplier assurance, complaints, CAPA and food-safety team support.',
    fullDescription: 'For teams that want additional operational support, we help maintain routines, evidence, actions and review cycles between audits so compliance remains active in everyday operations.',
    deliverables: [
      'Monthly readiness reviews with findings registers and management-review inputs',
      'GMP & Hygiene checklists, workplace observations, trend identification, and action tracking',
      'Supplier assurance: qualification protocols, risk-based supplier audits, and follow-up',
      'Customer complaint logging, root-cause investigation, trend analysis, and escalation protocols',
      'CAPA support: root-cause analysis, corrective action execution, verification, and closure evidence',
      'Food-safety team support: agendas, meeting cadence, KPI follow-up, and practical coaching'
    ],
    displayOrder: 2,
    status: 'PUBLISHED',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'srv-3',
    slug: 'training-capability',
    title: 'Training & Capability',
    category: 'TRAINING',
    shortDescription: 'Food-safety, HACCP, GMP, internal auditing, regulatory and specialist training.',
    fullDescription: 'Practical programs designed to strengthen awareness, technical knowledge and day-to-day food-safety capability across manufacturing, operations, and quality assurance personnel.',
    deliverables: [
      'Open-enrolment and college/student career readiness programs',
      'On-site corporate workshops aligned with factory floor realities',
      'Virtual interactive sessions for multi-site and distributed teams',
      'Customized client curriculum tailored to product risks and audit schemes',
      'Practical role-based competency evaluations and post-training impact reviews'
    ],
    displayOrder: 3,
    status: 'PUBLISHED',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'srv-4',
    slug: 'digital-compliance',
    title: 'Digital Compliance Support',
    category: 'DIGITAL_COMPLIANCE',
    shortDescription: 'Dashboards, digital inspections, action tracking, complaint workflows and document readiness.',
    fullDescription: 'Digital tools can help your team organize evidence, track actions and maintain visibility across everyday food-safety activities. Technology supports your people by making compliance work visible and organized; it does not replace responsible food-safety decisions.',
    deliverables: [
      'Compliance Dashboard: Visibility of actions, audits, documents, CAPA, and key indicators',
      'Digital Inspections: Record GMP observations, owners, due dates, evidence, and actions',
      'Knowledge Assistant: Fast, indexed retrieval of approved internal procedures and manuals',
      'Complaint Workflow: Structured intake, RCA, corrective actions, and verification tracking',
      'Regulatory Awareness: Surfacing relevant statutory updates and compliance action items',
      'Audit Document Readiness: Support checklists and automated evidence workflows'
    ],
    displayOrder: 4,
    status: 'PUBLISHED',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'srv-5',
    slug: 'quality-management',
    title: 'Quality & Management Systems',
    category: 'QUALITY_MANAGEMENT',
    shortDescription: 'Support related to ISO and other management-system requirements.',
    fullDescription: 'Structured consulting and implementation support for integrated management systems, ensuring seamless harmony between food safety, quality management, environmental impact, and occupational safety.',
    deliverables: [
      'ISO 9001 (Quality Management Systems) alignment and documentation',
      'ISO 14001 (Environmental Management Systems) procedures and compliance register',
      'ISO 45001 (Occupational Health & Safety) hazard assessment and operational controls',
      'GMO / Non-GMO verification protocols, segregation procedures, and supplier validation',
      'Integrated management system (IMS) internal audit preparation and gap mitigation'
    ],
    applicableStandards: [
      'ISO 9001',
      'ISO 14001',
      'ISO 45001',
      'GMO / Non-GMO'
    ],
    displayOrder: 5,
    status: 'PUBLISHED',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'srv-6',
    slug: 'specialized-requirements',
    title: 'Specialized Requirements',
    category: 'SPECIALIZED_REQUIREMENTS',
    shortDescription: 'Support for customer, regulatory and specialized food-safety requirements.',
    fullDescription: 'Tailored consulting for customer-specific audit codes, export compliance mandates, religious dietary standards, and allergen-free certifications.',
    deliverables: [
      'GFCO (Gluten-Free Certification Organization) scheme readiness and allergen segregation',
      'Halal compliance frameworks, raw material traceability, and slaughter/process audits',
      'Kosher compliance protocols, ingredient verification, and rabbinical audit support',
      'Export Inspection Council / Agency (EIA) regulatory readiness for food exporters',
      'Custom customer code-of-practice assessments and retailer technical standard readiness'
    ],
    applicableStandards: [
      'GFCO',
      'Halal',
      'Kosher',
      'EIA (Export Inspection Agency)'
    ],
    displayOrder: 6,
    status: 'PUBLISHED',
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_COURSES: TrainingCourse[] = [
  {
    id: 'crs-1',
    slug: 'food-safety-hygiene-fundamentals',
    title: 'Food Safety & Hygiene Fundamentals',
    category: 'Core Hygiene & Safety',
    summary: 'Essential food hygiene practices, biological, chemical, and physical hazards, personal hygiene routines, and temperature control basics.',
    targetAudience: 'Production supervisors, line operators, warehouse personnel, food handlers',
    keyTopics: ['Cross-contamination vectors', 'Personal hygiene standards', 'Time and temperature abuse', 'Sanitation basics', 'First-line defect reporting'],
    deliveryModes: ['Open-enrolment', 'College / student programs', 'On-site corporate', 'Virtual', 'Customized client curriculum'],
    duration: '1-2 Days (Configurable)',
    status: 'PUBLISHED',
    displayOrder: 1,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-2',
    slug: 'gmp-ghp-mastery',
    title: 'GMP / GHP Implementation',
    category: 'Core Hygiene & Safety',
    summary: 'Practical execution of Good Manufacturing Practices and Good Hygiene Practices on the processing floor.',
    targetAudience: 'Plant managers, hygiene officers, shift supervisors, maintenance leads',
    keyTopics: ['Zoning and sanitary facility design', 'Cleaning and sanitization verification', 'Water and air quality checks', 'Foreign body prevention', 'Daily GMP walk inspection protocols'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Customized client curriculum'],
    duration: '2 Days',
    status: 'PUBLISHED',
    displayOrder: 2,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-3',
    slug: 'fssc-22000-internal-auditor',
    title: 'FSSC Awareness & Internal Auditor',
    category: 'Audit & Certification',
    summary: 'Detailed breakdown of ISO 22000, sector-specific PRPs (ISO/TS 22002 series), and FSSC additional requirements with hands-on internal auditing exercises.',
    targetAudience: 'Quality managers, internal audit teams, food safety team leaders',
    keyTopics: ['FSSC Version 6 updates', 'PRP gap assessment techniques', 'Food defense and fraud vulnerability plans', 'Audit interview and evidence gathering', 'Audit report writing and NC classification'],
    deliveryModes: ['Open-enrolment', 'On-site corporate', 'Virtual'],
    duration: '2-3 Days',
    status: 'PUBLISHED',
    displayOrder: 3,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-4',
    slug: 'iso-22000-awareness-internal-auditor',
    title: 'ISO 22000 Awareness & Internal Auditor',
    category: 'Audit & Certification',
    summary: 'Mastering the Plan-Do-Check-Act cycle, hazard control plans (HACCP/OPRPs), and ISO 19011 audit guidelines for food safety management systems.',
    targetAudience: 'Quality heads, department internal auditors, compliance managers',
    keyTopics: ['Context of organization & risk-based thinking', 'OPRP vs CCP determination', 'Validation of control measures', 'Non-conformance escalation', 'Management review preparation'],
    deliveryModes: ['Open-enrolment', 'On-site corporate', 'Virtual'],
    duration: '2 Days',
    status: 'PUBLISHED',
    displayOrder: 4,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-5',
    slug: 'haccp-implementation-team-training',
    title: 'HACCP Implementation / Team Training',
    category: 'Core Hygiene & Safety',
    summary: 'The 12 steps and 7 Codex principles of Hazard Analysis and Critical Control Points, from flow diagrams to monitoring and corrective actions.',
    targetAudience: 'Food Safety (HACCP) team members, process engineers, QA executives',
    keyTopics: ['Product descriptions and intended use', 'Comprehensive hazard identification', 'Critical limit establishment', 'Monitoring system calibration', 'HACCP plan verification and re-validation'],
    deliveryModes: ['On-site corporate', 'Customized client curriculum', 'Virtual'],
    duration: '2 Days',
    status: 'PUBLISHED',
    displayOrder: 5,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-6',
    slug: 'fssai-laws-and-regulations',
    title: 'FSSAI Laws & Regulations',
    category: 'Regulatory Compliance',
    summary: 'Navigating statutory regulations, licensing, labeling standards, contaminant limits, FoSTaC compliance, and inspection readiness in India.',
    targetAudience: 'Regulatory affairs managers, legal counsel, compliance executives, plant heads',
    keyTopics: ['Food Safety and Standards Act 2006 framework', 'Licensing and registration nuances', 'Labeling and display amendments', 'Sampling procedures and legal rights', 'Annual returns and testing frequencies'],
    deliveryModes: ['Open-enrolment', 'On-site corporate', 'Virtual'],
    duration: '1-2 Days',
    status: 'PUBLISHED',
    displayOrder: 6,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-7',
    slug: 'brcgs-awareness-internal-auditor',
    title: 'BRCGS Awareness & Internal Auditor',
    category: 'Audit & Certification',
    summary: 'In-depth coverage of the BRCGS Global Food Safety Standard requirements, fundamental clauses, senior management commitment, and protocol expectations.',
    targetAudience: 'QA managers, export manufacturers, BRCGS site coordinators',
    keyTopics: ['Senior management commitment & culture', 'Environmental monitoring protocols', 'Pest and foreign material controls', 'Audit grading and non-conformity clearance timeline'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Open-enrolment'],
    duration: '2-3 Days',
    status: 'PUBLISHED',
    displayOrder: 7,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-8',
    slug: 'food-microbiology-and-safety',
    title: 'Food Microbiology & Food Safety',
    category: 'Technical & Science',
    summary: 'Understanding critical food pathogens (Salmonella, Listeria, E. coli, Clostridium), environmental monitoring sampling plans, and laboratory test result interpretation.',
    targetAudience: 'Microbiologists, lab chemists, sanitation supervisors, technical directors',
    keyTopics: ['Pathogen ecology and survival kinetics', 'Environmental monitoring (EMP) zone mapping', 'Rapid testing vs reference culture methods', 'Investigation of out-of-spec test findings'],
    deliveryModes: ['College / student programs', 'On-site corporate', 'Virtual'],
    duration: '2 Days',
    status: 'PUBLISHED',
    displayOrder: 8,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-9',
    slug: 'allergen-management',
    title: 'Allergen Management',
    category: 'Operational Risk',
    summary: 'Robust identification, supply chain verification, cleaning validation (ATP/ELISA), production scheduling, and preventive cross-contact controls for major food allergens.',
    targetAudience: 'R&D technologists, production managers, packaging coordinators, sanitation crew',
    keyTopics: ['Major allergen lists across domestic and export markets', 'Cleaning validation vs verification', 'Rework policies and color-coded segregation', 'Precautionary allergen labeling (PAL)'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Customized client curriculum'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 9,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-10',
    slug: 'pest-control-management',
    title: 'Pest Control Management',
    category: 'Operational Risk',
    summary: 'Evaluating Integrated Pest Management (IPM) contractors, bait station layout, insect light traps, trend analysis, and proactive exclusion tactics.',
    targetAudience: 'Facility managers, sanitation leads, third-party contractor coordinators',
    keyTopics: ['Building design & proofing against pests', 'Chemical usage restrictions and MSDS compliance', 'Trend analysis of catch counts', 'Auditor expectations for pest registers'],
    deliveryModes: ['On-site corporate', 'Virtual'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 10,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-11',
    slug: 'food-defense-and-food-fraud',
    title: 'Food Defense & Food Fraud (VACCP / TACCP)',
    category: 'Operational Risk',
    summary: 'Vulnerability assessment against economically motivated adulteration (EMA) and threat assessment for intentional contamination.',
    targetAudience: 'Procurement heads, security managers, executive food safety teams',
    keyTopics: ['TACCP & VACCP methodologies', 'Raw material supply vulnerability mapping', 'Physical site security & access restrictions', 'Mitigation strategy documentation'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Customized client curriculum'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 11,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-12',
    slug: 'root-cause-analysis-and-capa',
    title: 'Root Cause Analysis & Corrective and Preventive Action',
    category: 'Operational Risk',
    summary: 'Systematic problem solving using 5-Whys, Fishbone diagrams, and failure mode analysis to eliminate repeat non-conformities and customer complaints.',
    targetAudience: 'Department heads, process engineers, quality control specialists',
    keyTopics: ['Correction vs Corrective Action', '5-Whys discipline without jumping to human error', 'Verification of effectiveness over 30/60/90 days', 'Evidence compilation for certification auditors'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Open-enrolment'],
    duration: '1-2 Days',
    status: 'PUBLISHED',
    displayOrder: 12,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-13',
    slug: 'food-safety-risk-assessment',
    title: 'Food Safety Risk Assessment',
    category: 'Technical & Science',
    summary: 'Quantitative and qualitative risk matrices, severity vs probability scoring, and risk treatment prioritization across raw materials, processes, and finished goods.',
    targetAudience: 'Operations directors, HACCP team leaders, compliance analysts',
    keyTopics: ['Risk matrices and threshold definitions', 'Supplier risk scoring algorithms', 'Process change risk evaluations', 'Continuous risk register maintenance'],
    deliveryModes: ['Virtual', 'Customized client curriculum'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 13,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-14',
    slug: 'labelling-and-packaging-compliance',
    title: 'Labelling & Packaging Compliance',
    category: 'Regulatory Compliance',
    summary: 'Nutritional declarations, ingredient order, claims substantiation, allergen warnings, QR code mandates, and migration limits for food contact materials.',
    targetAudience: 'Packaging technologists, marketing teams, legal and regulatory reviewers',
    keyTopics: ['FSSAI, FDA, and EU food labeling alignment', 'Front-of-pack labeling developments', 'Migration test reports for packaging plastics', 'Batch coding and shelf-life declaration compliance'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Open-enrolment'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 14,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-15',
    slug: 'traceability-and-product-recall',
    title: 'Traceability & Product Recall',
    category: 'Operational Risk',
    summary: 'Designing one-up / one-down traceability systems, mass balance reconciliations, mock recall execution, and crisis communication protocols.',
    targetAudience: 'Supply chain managers, IT leads, warehouse heads, recall team members',
    keyTopics: ['Mass balance calculation standards (aiming for 99.5%+ accuracy)', '4-hour mock recall simulation drills', 'Regulatory notification triggers', 'Customer recall notification workflows'],
    deliveryModes: ['On-site corporate', 'Virtual', 'Customized client curriculum'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 15,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'crs-16',
    slug: 'food-safety-culture',
    title: 'Food Safety Culture',
    category: 'Operational Risk',
    summary: 'Transforming food safety from a policing function to shared organizational ownership, psychological safety, leadership engagement, and behavioral measurement.',
    targetAudience: 'C-suite leaders, plant directors, HR heads, operations managers',
    keyTopics: ['GFSI Food Safety Culture dimensions', 'Employee perception surveys and behavioral audits', 'Recognition and transparent reporting incentives', 'Sustaining culture through shift handovers and routine talks'],
    deliveryModes: ['On-site corporate', 'Customized client curriculum', 'Virtual'],
    duration: '1 Day',
    status: 'PUBLISHED',
    displayOrder: 16,
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_CMS: CMSContent = {
  companyName: 'ESSOR Compliance Solutions',
  tagline: 'Your Partner in Food Safety & Continuous Compliance',
  heroHeadline: 'Built around measurable compliance in everyday operations.',
  heroSubheadline: 'We help organizations strengthen food-safety systems, prepare for audits, develop people and maintain compliance in everyday operations.',
  purpose: 'We are committed to helping organizations build robust and audit-ready food-safety systems. Through expert assessment, structured implementation, team capability development, and ongoing compliance support, we enable our clients to meet applicable standards, address gaps effectively, and maintain readiness beyond the audit cycle.',
  vision: 'Build trust through food-safety expertise, create recurring value through managed compliance, and scale delivery through an AI-enabled compliance platform.',
  mission: 'Help growing manufacturers and exporters move from audit pressure to disciplined, continuous compliance.',
  contactEmail: 'business@essorcompliance.com',
  businessEmail: 'business@essorcompliance.com',
  trainingEmail: 'training@essorcompliance.com',
  contactPhone: '+91 6395843850',
  officeAddress: 'IT Park, Sahastradhara Road, Dehradun, Uttarakhand 248013, India',
  linkedinUrl: 'https://linkedin.com/company/essor-compliance-solutions',
  disclaimer: 'ESSOR Compliance Solutions provides independent consulting, gap assessments, training, and operational compliance support. ESSOR is not an accredited certification body and does not grant official certification credentials; third-party certification audits are conducted independently by accredited certification bodies.',
  privacyPolicy: 'ESSOR Compliance Solutions is committed to respecting your business and personal privacy. We collect information solely to provide compliance consulting, process service enquiries, and deliver tailored training proposals. We do not sell or monetize personal or corporate client data to third parties.',
  termsOfService: 'Engagements with ESSOR Compliance Solutions are governed by agreed statements of work and service contracts. Client advisory materials, gap analyses, and readiness assessments represent professional opinions based on applicable food safety standards at the time of evaluation.',
  cookiesPolicy: 'We utilize essential session cookies to ensure secure navigation and form submission across our web platform. We do not deploy invasive third-party ad tracking cookies.'
};

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Vivek Baliyan (Lead Administrator)',
    email: 'iamvivekbaliyan07@gmail.com',
    role: 'SUPER_ADMIN',
    isActive: true,
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 'usr-2',
    name: 'Aditi Sharma (Compliance Manager)',
    email: 'aditi.sharma@essorcompliance.com',
    role: 'ADMIN',
    isActive: true
  },
  {
    id: 'usr-3',
    name: 'Rajesh Verma (Lead Food Safety Consultant)',
    email: 'rajesh.verma@essorcompliance.com',
    role: 'SALES',
    isActive: true
  },
  {
    id: 'usr-4',
    name: 'Pooja Nair (Training Coordinator)',
    email: 'pooja.nair@essorcompliance.com',
    role: 'CONTENT_MANAGER',
    isActive: true
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    referenceNumber: 'ECS-2026-0041',
    name: 'Sunil Mehta',
    email: 's.mehta@agronutriexports.com',
    phone: '+91 98201 44512',
    companyName: 'AgroNutri Global Exports Ltd.',
    industry: 'Spices & Processed Agriculture',
    serviceId: 'srv-1',
    serviceTitle: 'Audit & Certification Readiness',
    auditStandard: 'BRCGS & FSSC 22000',
    preferredContactMethod: 'EMAIL',
    message: 'We are expanding our seasoning blending facility and need a gap assessment and complete mock audit ahead of a BRCGS unannounced surveillance audit in Q3.',
    status: 'QUALIFIED',
    assignedTo: 'rajesh.verma@essorcompliance.com',
    sourcePage: '/services/audit-readiness',
    privacyAcknowledged: true,
    notes: [
      {
        id: 'note-1',
        enquiryId: 'enq-101',
        authorName: 'Rajesh Verma',
        authorEmail: 'rajesh.verma@essorcompliance.com',
        note: 'Completed preliminary phone call. Client operates 2 processing lines in Pune. Scope document prepared.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ],
    statusHistory: [
      {
        id: 'hist-1',
        enquiryId: 'enq-101',
        previousStatus: 'NEW',
        newStatus: 'CONTACTED',
        changedByName: 'Rajesh Verma',
        changedByEmail: 'rajesh.verma@essorcompliance.com',
        reason: 'Initial intake discovery call scheduled',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'hist-2',
        enquiryId: 'enq-101',
        previousStatus: 'CONTACTED',
        newStatus: 'QUALIFIED',
        changedByName: 'Rajesh Verma',
        changedByEmail: 'rajesh.verma@essorcompliance.com',
        reason: 'Requirements match Audit Readiness Scope A',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'enq-102',
    referenceNumber: 'ECS-2026-0042',
    name: 'Kavita Sundaram',
    email: 'kavita@primebakes.in',
    phone: '+91 97412 88910',
    companyName: 'PrimeBakes Confectionery LLP',
    industry: 'Bakery & Confectionery',
    serviceId: 'srv-2',
    serviceTitle: 'Managed Food-Safety Support',
    auditStandard: 'FSSAI & GMP',
    preferredContactMethod: 'PHONE',
    message: 'Seeking monthly managed food safety reviews and allergen management protocol overhaul across our two commercial baking bakeries.',
    status: 'NEW',
    sourcePage: '/services/managed-support',
    privacyAcknowledged: true,
    notes: [],
    statusHistory: [],
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'enq-103',
    referenceNumber: 'ECS-2026-0043',
    name: 'Deepak Saxena',
    email: 'd.saxena@oceanicfrozen.com',
    companyName: 'Oceanic Frozen Seafoods Ltd.',
    industry: 'Seafood & Cold Chain',
    serviceId: 'srv-3',
    serviceTitle: 'Training & Capability',
    auditStandard: 'HACCP & Allergen',
    preferredContactMethod: 'EMAIL',
    message: 'Requesting on-site corporate training quote for 35 shift leaders on HACCP Implementation and Root Cause Analysis.',
    status: 'PROPOSAL_SENT',
    assignedTo: 'pooja.nair@essorcompliance.com',
    sourcePage: '/training',
    privacyAcknowledged: true,
    notes: [
      {
        id: 'note-2',
        enquiryId: 'enq-103',
        authorName: 'Pooja Nair',
        authorEmail: 'pooja.nair@essorcompliance.com',
        note: 'Sent proposal for 2-day on-site corporate package with practical cold-chain case studies.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ],
    statusHistory: [
      {
        id: 'hist-3',
        enquiryId: 'enq-103',
        previousStatus: 'NEW',
        newStatus: 'PROPOSAL_SENT',
        changedByName: 'Pooja Nair',
        changedByEmail: 'pooja.nair@essorcompliance.com',
        reason: 'Quotation delivered to client procurement',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const ENGAGEMENT_STAGES = [
  {
    step: 1,
    title: 'Gap Assessment',
    description: 'Baseline the current system.',
    details: 'On-site or document-led evaluation against target standards. We identify exact procedural and physical gaps without sugarcoating findings.',
    outcome: 'Clear findings register and prioritized action roadmap.'
  },
  {
    step: 2,
    title: 'Documentation',
    description: 'Strengthen policies, procedures and records.',
    details: 'Drafting and refining policies, SOPs, work instructions, HACCP plans, and logging templates tailored to your genuine factory floor workflow.',
    outcome: 'Defensible, audit-ready management system documentation.'
  },
  {
    step: 3,
    title: 'Implementation',
    description: 'Train people and deploy controls.',
    details: 'Practical coaching of shift supervisors and operators. Embedding routine hygiene, monitoring limits, and logging discipline into daily tasks.',
    outcome: 'Workforce competency and verifiable operational records.'
  },
  {
    step: 4,
    title: 'Mock Audit',
    description: 'Test evidence-based readiness.',
    details: 'Rigorous simulation under real certification body audit conditions, stress-testing evidence retrieval times, auditor interviews, and traceability drills.',
    outcome: 'Pre-audit punch list resolved before official examiners arrive.'
  },
  {
    step: 5,
    title: 'Official Audit',
    description: 'Coordinate evidence and responses.',
    details: 'On-site technical support during official certification or buyer audits, facilitating evidence presentation and clarifying technical context.',
    outcome: 'Professional, calm audit representation and accurate record defense.'
  },
  {
    step: 6,
    title: 'NC / CAPA',
    description: 'Root cause, correction and preventive action.',
    details: 'Formulating rigorous root-cause analyses, immediate corrections, and systemic preventive actions that satisfy certification bodies within deadline.',
    outcome: 'Permanent closure of non-conformities and continuous improvement.'
  }
];

export const WHY_ESSOR_POINTS = [
  {
    title: 'One Connected Team',
    description: 'Consulting, managed support, training and digital workflows can work together around your needs, preventing fragmented vendor overhead.'
  },
  {
    title: 'Execution-First',
    description: 'Focus on practical controls, evidence, implementation discipline and closure rather than theoretical binders that gather dust.'
  },
  {
    title: 'Ongoing Support',
    description: 'Support can continue between certification cycles when your team needs it, preventing last-minute pre-audit panic.'
  },
  {
    title: 'Capability Building',
    description: 'Training and coaching help strengthen internal ownership, building long-term institutional resilience inside your own workforce.'
  },
  {
    title: 'Audit-Aware',
    description: 'Readiness assessments, mock audits, findings registers and follow-up informed by real auditor expectations and standard updates.'
  },
  {
    title: 'Client-Centric',
    description: 'Scope and delivery can be adapted to your operation, people and priorities, respecting your production schedule and constraints.'
  }
];

export const TEAM_CAPABILITIES = [
  {
    group: 'Experienced Lead Auditors',
    subtitle: 'Structured audit preparation, evidence review and audit execution.',
    detail: 'Seasoned professionals with extensive field experience across accredited certification bodies, understanding auditor psychology and evidence rigor.'
  },
  {
    group: 'Food Safety Audit Experts',
    subtitle: 'Implementation discipline, findings, root-cause analysis and CAPA closure.',
    detail: 'Specialists who excel at translating complex audit findings into pragmatic corrective action plans that prevent recurring non-conformances.'
  },
  {
    group: 'Food Technologists',
    subtitle: 'Food-industry and food-safety knowledge supporting practical implementation.',
    detail: 'Deep technical grounding in food microbiology, thermal processing, preservation methods, shelf-life validation, and factory floor operations.'
  },
  {
    group: 'IIM & IIT Alumni',
    subtitle: 'Management, analytical and technology perspectives.',
    detail: 'Strategic oversight combining operational research, modern digital workflows, and business discipline with food regulatory compliance.'
  }
];

export const STANDARDS_BADGES = [
  { name: 'FSSC 22000', category: 'Food Safety' },
  { name: 'ISO 22000', category: 'Food Safety' },
  { name: 'HACCP', category: 'Food Safety' },
  { name: 'GMP / GHP', category: 'Food Safety' },
  { name: 'BRCGS', category: 'Food Safety' },
  { name: 'SQF', category: 'Food Safety' },
  { name: 'IFS Food', category: 'Food Safety' },
  { name: 'ISO 9001', category: 'Quality' },
  { name: 'ISO 14001', category: 'Environment' },
  { name: 'ISO 45001', category: 'Safety' },
  { name: 'USDA ORGANIC', category: 'Specialized' },
  { name: 'HALAL', category: 'Specialized' },
  { name: 'KOSHER', category: 'Specialized' },
  { name: 'NON GMO VERIFIED', category: 'Specialized' }
];
