import { 
  User, 
  UserRole, 
  Organization, 
  ClientSite, 
  TrainingSession, 
  ParticipantEnrollment, 
  Certificate, 
  CompanyVisit, 
  InspectionCheckItem, 
  CorrectiveAction, 
  CAPAEvidence, 
  ComplianceDocument, 
  InAppNotification, 
  AuditLog, 
  ServiceItem, 
  TrainingCourse, 
  Enquiry, 
  EnquiryStatus,
  EnquiryNote,
  CMSContent 
} from '../types';

import { 
  INITIAL_SERVICES, 
  INITIAL_COURSES, 
  INITIAL_ENQUIRIES, 
  INITIAL_CMS 
} from '../data/initialData';

const STORAGE_KEYS = {
  SERVICES: 'essor_services_v2',
  COURSES: 'essor_courses_v2',
  ENQUIRIES: 'essor_enquiries_v2',
  CMS: 'essor_cms_v2',
  USERS: 'essor_users_v2',
  CURRENT_USER: 'essor_current_user_v2',
  ORGANIZATIONS: 'essor_organizations_v2',
  SESSIONS: 'essor_sessions_v2',
  CERTIFICATES: 'essor_certificates_v2',
  VISITS: 'essor_visits_v2',
  CAPA: 'essor_capa_v2',
  DOCUMENTS: 'essor_documents_v2',
  NOTIFICATIONS: 'essor_notifications_v2',
  AUDIT_LOGS: 'essor_audit_logs_v2'
};

function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to read ${key} from storage`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write ${key} to storage`, e);
  }
}

// SEED DATA FOR PRODUCTION-ORIENTED WORKFLOWS
const SEED_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-1',
    legalName: 'AgroNutri Global Exports Ltd.',
    code: 'AGRONUTRI',
    industry: 'Spices, Seasonings & Export Agri-Food',
    businessType: 'Food Manufacturer & Exporter',
    primaryEmail: 'compliance@agronutriexports.com',
    primaryPhone: '+91 22 2840 9901',
    headquartersAddress: 'AgroNutri Towers, MIDC Industrial Area, Pune 411019, Maharashtra',
    assignedAccountManager: 'Rajesh Verma',
    status: 'ACTIVE',
    serviceAgreements: ['FSSC 22000 Readiness', 'BRCGS Managed Compliance', 'Corporate Training'],
    sites: [
      {
        id: 'site-1',
        organizationId: 'org-1',
        name: 'Pune Spices Processing & Blending Unit 1',
        siteCode: 'AGRO-PUN-01',
        address: 'Plot A-14, Chakan MIDC Phase 2',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        contactName: 'Sunil Mehta (QA Director)',
        contactEmail: 's.mehta@agronutriexports.com',
        contactPhone: '+91 98201 44512',
        applicableStandards: ['FSSC 22000', 'BRCGS', 'HACCP', 'FSSAI'],
        isActive: true,
        createdAt: '2026-01-10T08:00:00Z'
      },
      {
        id: 'site-2',
        organizationId: 'org-1',
        name: 'Nashik Dehydration & Packaging Facility',
        siteCode: 'AGRO-NSK-02',
        address: 'Plot 42, Ambad Industrial Estate',
        city: 'Nashik',
        state: 'Maharashtra',
        country: 'India',
        contactName: 'Vikas Deshmukh (Plant Manager)',
        contactEmail: 'v.deshmukh@agronutriexports.com',
        contactPhone: '+91 98230 11200',
        applicableStandards: ['ISO 22000', 'HACCP', 'GMP'],
        isActive: true,
        createdAt: '2026-02-01T09:30:00Z'
      }
    ],
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'org-2',
    legalName: 'PrimeBakes Confectionery LLP',
    code: 'PRIMEBAKES',
    industry: 'Commercial Bakery, Pastry & Biscuits',
    businessType: 'Contract Food Processor',
    primaryEmail: 'qa@primebakes.in',
    primaryPhone: '+91 80 4112 5560',
    headquartersAddress: 'Peenya Industrial Estate, Bengaluru 560058, Karnataka',
    assignedAccountManager: 'Vikram Sen',
    status: 'ACTIVE',
    serviceAgreements: ['Monthly Managed GMP Reviews', 'Allergen Control Protocol'],
    sites: [
      {
        id: 'site-3',
        organizationId: 'org-2',
        name: 'Bengaluru Central Bakery Works',
        siteCode: 'PB-BLR-01',
        address: '14/B, 2nd Cross, Peenya 3rd Phase',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        contactName: 'Kavita Sundaram',
        contactEmail: 'kavita@primebakes.in',
        contactPhone: '+91 97412 88910',
        applicableStandards: ['FSSAI', 'GMP', 'ISO 22000'],
        isActive: true,
        createdAt: '2026-02-15T09:00:00Z'
      }
    ],
    createdAt: '2026-02-15T09:00:00Z',
    updatedAt: '2026-03-10T11:00:00Z'
  }
];

const SEED_USERS: User[] = [
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
    name: 'Aditi Sharma (Operations Head)',
    email: 'aditi.sharma@essorcompliance.com',
    role: 'ADMIN',
    isActive: true
  },
  {
    id: 'usr-3',
    name: 'Vikram Sen (Lead Scheduler)',
    email: 'vikram.sen@essorcompliance.com',
    role: 'OPERATIONS_MANAGER',
    isActive: true
  },
  {
    id: 'usr-4',
    name: 'Dr. Priya Rao (Principal Food Technologist)',
    email: 'priya.rao@essorcompliance.com',
    role: 'TRAINER',
    isActive: true
  },
  {
    id: 'usr-5',
    name: 'Rajesh Verma (Lead Auditor)',
    email: 'rajesh.verma@essorcompliance.com',
    role: 'AUDITOR_CONSULTANT',
    isActive: true
  },
  {
    id: 'usr-6',
    name: 'Sunil Mehta (QA Director, AgroNutri)',
    email: 's.mehta@agronutriexports.com',
    role: 'CLIENT_ADMIN',
    organizationId: 'org-1',
    isActive: true
  },
  {
    id: 'usr-7',
    name: 'Anand Joshi (Shift QA Lead, AgroNutri)',
    email: 'a.joshi@agronutriexports.com',
    role: 'CLIENT_STAFF',
    organizationId: 'org-1',
    siteId: 'site-1',
    isActive: true
  },
  {
    id: 'usr-8',
    name: 'Neha Verma (Trainee / QA Specialist)',
    email: 'neha.verma@agronutriexports.com',
    role: 'PARTICIPANT',
    organizationId: 'org-1',
    isActive: true
  }
];

const SEED_SESSIONS: TrainingSession[] = [
  {
    id: 'sess-101',
    sessionCode: 'ESSOR-TRN-2026-018',
    courseId: 'crs-3',
    courseTitle: 'FSSC Awareness & Internal Auditor',
    courseCategory: 'Audit & Certification',
    trainerId: 'usr-4',
    trainerName: 'Dr. Priya Rao',
    organizationId: 'org-1',
    organizationName: 'AgroNutri Global Exports Ltd.',
    deliveryType: 'On-site corporate',
    startDate: '2026-03-20T09:00:00Z',
    endDate: '2026-03-22T17:00:00Z',
    venueOrLink: 'Conference Room 2, AgroNutri Pune Plant',
    status: 'COMPLETED',
    maxSeats: 25,
    attendanceThresholdPercent: 80,
    passingAssessmentScore: 70,
    enrollments: [
      {
        id: 'enr-1',
        sessionId: 'sess-101',
        participantId: 'usr-8',
        participantName: 'Neha Verma',
        participantEmail: 'neha.verma@agronutriexports.com',
        organizationId: 'org-1',
        organizationName: 'AgroNutri Global Exports Ltd.',
        attendance: 'PRESENT',
        attendanceMarkedAt: '2026-03-22T16:00:00Z',
        attendanceMarkedBy: 'Dr. Priya Rao',
        assessmentScore: 92,
        assessmentStatus: 'PASSED',
        assessmentRemarks: 'Excellent understanding of FSSC Version 6 additional requirements and PRPs.',
        completionStatus: 'APPROVED',
        approvedBy: 'Vivek Baliyan',
        approvedAt: '2026-03-23T10:00:00Z',
        certificateId: 'cert-1',
        certificateNumber: 'ECS-CERT-2026-0089',
        enrolledAt: '2026-03-12T09:00:00Z'
      },
      {
        id: 'enr-2',
        sessionId: 'sess-101',
        participantId: 'usr-7',
        participantName: 'Anand Joshi',
        participantEmail: 'a.joshi@agronutriexports.com',
        organizationId: 'org-1',
        organizationName: 'AgroNutri Global Exports Ltd.',
        attendance: 'PRESENT',
        attendanceMarkedAt: '2026-03-22T16:00:00Z',
        attendanceMarkedBy: 'Dr. Priya Rao',
        assessmentScore: 84,
        assessmentStatus: 'PASSED',
        assessmentRemarks: 'Demonstrated solid internal audit interview skills and evidence logging.',
        completionStatus: 'APPROVED',
        approvedBy: 'Vivek Baliyan',
        approvedAt: '2026-03-23T10:00:00Z',
        certificateId: 'cert-2',
        certificateNumber: 'ECS-CERT-2026-0090',
        enrolledAt: '2026-03-12T09:00:00Z'
      }
    ],
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-23T10:00:00Z'
  },
  {
    id: 'sess-102',
    sessionCode: 'ESSOR-TRN-2026-024',
    courseId: 'crs-9',
    courseTitle: 'Allergen Management & Cross-Contact Prevention',
    courseCategory: 'Operational Risk',
    trainerId: 'usr-4',
    trainerName: 'Dr. Priya Rao',
    organizationId: 'org-2',
    organizationName: 'PrimeBakes Confectionery LLP',
    deliveryType: 'Virtual',
    startDate: '2026-04-18T10:00:00Z',
    endDate: '2026-04-19T16:00:00Z',
    venueOrLink: 'https://meet.google.com/essor-allergen-training',
    status: 'PUBLISHED',
    maxSeats: 30,
    attendanceThresholdPercent: 85,
    passingAssessmentScore: 75,
    enrollments: [],
    createdAt: '2026-03-25T14:00:00Z',
    updatedAt: '2026-03-25T14:00:00Z'
  }
];

const SEED_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-sample-aarav',
    certificateNumber: 'ECSFSM-LA241116',
    verificationToken: 'vtf-la241116-fsm-iso22000',
    participantId: 'usr-aarav',
    participantName: 'Aarav Sharma',
    participantEmail: 'aarav.sharma@dairyprocessing.in',
    organizationName: 'Global Dairy & Beverage Processing Ltd.',
    courseId: 'crs-3',
    courseTitle: 'Food Safety Management Systems Lead Auditor and HACCP Implementation',
    sessionId: 'sess-101',
    completionDate: '2024-11-16T17:00:00Z',
    durationHours: 40,
    gradeScore: 96,
    issueDate: '2024-11-16T10:00:00Z',
    issuedByName: 'Vivek Baliyan',
    issuedByRole: 'Principal Lead Auditor',
    status: 'ISSUED',
    verificationCount: 128,
    createdAt: '2024-11-16T10:00:00Z',
    updatedAt: '2024-11-16T10:00:00Z'
  },
  {
    id: 'cert-1',
    certificateNumber: 'ECS-CERT-2026-0089',
    verificationToken: 'vtf-88a91c49-2026-fssc',
    participantId: 'usr-8',
    participantName: 'Neha Verma',
    participantEmail: 'neha.verma@agronutriexports.com',
    organizationName: 'AgroNutri Global Exports Ltd.',
    courseId: 'crs-3',
    courseTitle: 'FSSC Awareness & Internal Auditor',
    sessionId: 'sess-101',
    completionDate: '2026-03-22T17:00:00Z',
    durationHours: 24,
    gradeScore: 92,
    issueDate: '2026-03-23T10:00:00Z',
    issuedByName: 'Vivek Baliyan',
    issuedByRole: 'Principal Lead Auditor',
    status: 'ISSUED',
    verificationCount: 14,
    createdAt: '2026-03-23T10:00:00Z',
    updatedAt: '2026-03-23T10:00:00Z'
  },
  {
    id: 'cert-2',
    certificateNumber: 'ECS-CERT-2026-0090',
    verificationToken: 'vtf-77d20b12-2026-fssc',
    participantId: 'usr-7',
    participantName: 'Anand Joshi',
    participantEmail: 'a.joshi@agronutriexports.com',
    organizationName: 'AgroNutri Global Exports Ltd.',
    courseId: 'crs-3',
    courseTitle: 'FSSC Awareness & Internal Auditor',
    sessionId: 'sess-101',
    completionDate: '2026-03-22T17:00:00Z',
    durationHours: 24,
    gradeScore: 84,
    issueDate: '2026-03-23T10:00:00Z',
    issuedByName: 'Vivek Baliyan',
    issuedByRole: 'Principal Lead Auditor',
    status: 'ISSUED',
    verificationCount: 6,
    createdAt: '2026-03-23T10:00:00Z',
    updatedAt: '2026-03-23T10:00:00Z'
  }
];

const SEED_VISITS: CompanyVisit[] = [
  {
    id: 'vst-1',
    visitReference: 'ECS-VST-2026-012',
    organizationId: 'org-1',
    organizationName: 'AgroNutri Global Exports Ltd.',
    siteId: 'site-1',
    siteName: 'Pune Spices Processing & Blending Unit 1',
    siteAddress: 'Plot A-14, Chakan MIDC Phase 2, Pune',
    consultantId: 'usr-5',
    consultantName: 'Rajesh Verma',
    scheduledDate: '2026-03-28T09:00:00Z',
    visitType: 'AUDIT_GAP_ASSESSMENT',
    standardsScope: ['BRCGS Global Standard Food Safety Issue 9', 'FSSC 22000'],
    status: 'APPROVED',
    startTime: '09:15',
    endTime: '17:30',
    clientRepPresent: 'Sunil Mehta (QA Director) & Anand Joshi (Shift Lead)',
    consultantSummaryNotes: 'Comprehensive baseline evaluation ahead of official BRCGS unannounced surveillance. Facility exhibits strong senior commitment. Key areas requiring immediate corrective action before audit: CCP-1 metal detector reject arm test frequency verification, environmental sampling swabs for dry zones, and contractor pest station bait mapping.',
    findingsCount: {
      critical: 0,
      major: 1,
      minor: 3,
      observations: 2
    },
    reviewNotes: 'Reviewed by Lead Auditor Vivek Baliyan. Corrective actions created and assigned.',
    reviewedBy: 'Vivek Baliyan',
    reviewedAt: '2026-03-29T11:00:00Z',
    checklistResponses: [
      {
        id: 'chk-1',
        section: '1. Senior Management Commitment & Food Safety Culture',
        question: 'Has management established clear food safety objectives, monthly review cadence, and an active confidential reporting channel for food safety concerns?',
        response: 'COMPLIANT',
        observation: 'Monthly food safety committee minutes reviewed for Q4 2025 and Jan-Feb 2026. Whistleblower policy posted at staff entrance.'
      },
      {
        id: 'chk-2',
        section: '2. Hazard Analysis & Critical Control Points (HACCP / OPRP)',
        question: 'Are Critical Limits validated for CCP-1 (Rare Earth Magnet & Metal Detection on Powder Conveyor 3)?',
        response: 'NON_COMPLIANT',
        severity: 'MAJOR',
        observation: 'Reject mechanism tested only with 2.0mm Ferrous; test protocol lacks documented verification with 2.5mm Non-Ferrous and 3.0mm Stainless Steel test pieces during shift handover.',
        correctiveActionRequired: true
      },
      {
        id: 'chk-3',
        section: '3. Site Standards & Structural Cleanliness',
        question: 'Are all walls, floor drains, and pipe penetrations sealed to prevent moisture ingress and pest harborage?',
        response: 'NON_COMPLIANT',
        severity: 'MINOR',
        observation: 'Floor-to-wall epoxy coving in raw spice warehouse bay 2 shows 15cm hairline crack with minor moisture pooling.',
        correctiveActionRequired: true
      },
      {
        id: 'chk-4',
        section: '4. Allergen Management Protocols',
        question: 'Are allergen-containing raw materials (mustard, celery) segregated with dedicated scoops, color-coded bins, and positive airflow isolation?',
        response: 'COMPLIANT',
        observation: 'Yellow tagged storage racking and dedicated allergen staging room verified.'
      },
      {
        id: 'chk-5',
        section: '5. Foreign Body & Glass / Brittle Plastic Control',
        question: 'Is the glass register audited every shift, and are all overhead lighting fixtures fitted with shatter-proof diffusers?',
        response: 'COMPLIANT',
        observation: 'Complete register maintained; no unprotected glass located in open product zones.'
      }
    ],
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-29T11:00:00Z'
  },
  {
    id: 'vst-2',
    visitReference: 'ECS-VST-2026-015',
    organizationId: 'org-2',
    organizationName: 'PrimeBakes Confectionery LLP',
    siteId: 'site-3',
    siteName: 'Bengaluru Central Bakery Works',
    siteAddress: 'Peenya Industrial Estate, Bengaluru',
    consultantId: 'usr-5',
    consultantName: 'Rajesh Verma',
    scheduledDate: '2026-04-12T10:00:00Z',
    visitType: 'MONTHLY_GMP_REVIEW',
    standardsScope: ['GMP', 'FSSAI Schedule 4'],
    status: 'CONFIRMED',
    checklistResponses: [],
    findingsCount: { critical: 0, major: 0, minor: 0, observations: 0 },
    createdAt: '2026-03-26T12:00:00Z',
    updatedAt: '2026-03-26T12:00:00Z'
  }
];

const SEED_CAPA: CorrectiveAction[] = [
  {
    id: 'capa-1',
    referenceNumber: 'CAPA-2026-034',
    organizationId: 'org-1',
    organizationName: 'AgroNutri Global Exports Ltd.',
    siteId: 'site-1',
    siteName: 'Pune Spices Processing & Blending Unit 1',
    sourceVisitId: 'vst-1',
    sourceVisitRef: 'ECS-VST-2026-012',
    findingTitle: 'CCP-1 Metal Detector Multi-Specimen Challenge Frequency',
    findingDescription: 'Metal detector challenge on powder conveyor 3 lacked testing with 2.5mm Non-Ferrous and 3.0mm Stainless Steel test pieces at shift changes.',
    severity: 'MAJOR',
    standardClause: 'BRCGS Clause 2.12 & FSSC Requirement 2.5.4',
    rootCauseAnalysis: 'Operator training syllabus previously covered only ferrous challenge pieces. Shift log sheet did not have dedicated columns for 3-metal specimen verification.',
    immediateCorrection: 'Updated hourly CCP log sheet to mandate recording Fe 2.0mm, Non-Fe 2.5mm, and SS 3.0mm challenge results.',
    preventiveActionPlan: 'Procured certified test rods and trained 14 operators on line 3. Instituted QA supervisor verification twice per shift.',
    responsiblePerson: 'Anand Joshi (Shift QA Lead)',
    responsibleEmail: 'a.joshi@agronutriexports.com',
    dueDate: '2026-04-10T18:00:00Z',
    status: 'SUBMITTED_FOR_REVIEW',
    isOverdue: false,
    evidenceList: [
      {
        id: 'ev-1',
        uploadedBy: 'Anand Joshi',
        uploadedByRole: 'CLIENT_STAFF',
        filename: 'Revised_CCP_Hourly_LogSheet_Line3.pdf',
        notes: 'Attached scanned signed log sheet showing 3-piece test implementation over 7 consecutive days with zero failures.',
        createdAt: '2026-04-02T14:30:00Z'
      }
    ],
    createdAt: '2026-03-28T16:00:00Z',
    updatedAt: '2026-04-02T14:30:00Z'
  },
  {
    id: 'capa-2',
    referenceNumber: 'CAPA-2026-035',
    organizationId: 'org-1',
    organizationName: 'AgroNutri Global Exports Ltd.',
    siteId: 'site-1',
    siteName: 'Pune Spices Processing & Blending Unit 1',
    sourceVisitId: 'vst-1',
    sourceVisitRef: 'ECS-VST-2026-012',
    findingTitle: 'Raw Spice Warehouse Floor-to-Wall Epoxy Seal Rupture',
    findingDescription: 'Hairline crack in wall coving with potential moisture seepage in storage bay 2.',
    severity: 'MINOR',
    standardClause: 'GMP Sanitary Facility Design',
    responsiblePerson: 'Sunil Mehta (QA Director)',
    responsibleEmail: 's.mehta@agronutriexports.com',
    dueDate: '2026-04-15T18:00:00Z',
    status: 'IN_PROGRESS',
    isOverdue: false,
    evidenceList: [],
    createdAt: '2026-03-28T16:00:00Z',
    updatedAt: '2026-03-28T16:00:00Z'
  }
];

const SEED_DOCUMENTS: ComplianceDocument[] = [
  {
    id: 'doc-1',
    organizationId: 'org-1',
    title: 'FSSC 22000 Comprehensive Gap Assessment & Action Plan',
    category: 'AUDIT_REPORT',
    filename: 'AgroNutri_FSSC_Gap_Assessment_Report_2026.pdf',
    fileSizeKb: 1420,
    fileType: 'application/pdf',
    uploadedByName: 'Rajesh Verma (Lead Auditor)',
    version: '1.0',
    isConfidential: true,
    createdAt: '2026-03-29T12:00:00Z'
  },
  {
    id: 'doc-2',
    organizationId: 'org-1',
    title: 'Allergen Cleaning Validation & Swab Test Protocol SOP',
    category: 'SOP',
    filename: 'SOP_QA_042_Allergen_Sanitation_Validation.pdf',
    fileSizeKb: 890,
    fileType: 'application/pdf',
    uploadedByName: 'Dr. Priya Rao',
    version: '2.1',
    isConfidential: true,
    createdAt: '2026-03-15T10:00:00Z'
  }
];

export class StorageService {
  // ORGANIZATIONS & SITES
  static getOrganizations(): Organization[] {
    return safeGet<Organization[]>(STORAGE_KEYS.ORGANIZATIONS, SEED_ORGANIZATIONS);
  }

  static getOrganizationById(id: string): Organization | undefined {
    return this.getOrganizations().find(o => o.id === id);
  }

  static saveOrganization(org: Organization, actor: User): Organization {
    const list = this.getOrganizations();
    const idx = list.findIndex(o => o.id === org.id);
    const updated = { ...org, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
      this.logAction(actor, 'UPDATE', 'ORGANIZATION', org.id, `Updated client organization: ${org.legalName}`);
    } else {
      list.push(updated);
      this.logAction(actor, 'CREATE', 'ORGANIZATION', org.id, `Created client organization: ${org.legalName}`);
    }
    safeSet(STORAGE_KEYS.ORGANIZATIONS, list);
    return updated;
  }

  // TRAINING SESSIONS & ENROLLMENT
  static getSessions(): TrainingSession[] {
    return safeGet<TrainingSession[]>(STORAGE_KEYS.SESSIONS, SEED_SESSIONS);
  }

  static getSessionById(id: string): TrainingSession | undefined {
    return this.getSessions().find(s => s.id === id);
  }

  static saveSession(session: TrainingSession, actor: User): TrainingSession {
    const list = this.getSessions();
    const idx = list.findIndex(s => s.id === session.id);
    const updated = { ...session, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
      this.logAction(actor, 'UPDATE', 'SESSION', session.id, `Updated training session: ${session.sessionCode}`);
    } else {
      list.push(updated);
      this.logAction(actor, 'CREATE', 'SESSION', session.id, `Created training session: ${session.sessionCode}`);
    }
    safeSet(STORAGE_KEYS.SESSIONS, list);
    return updated;
  }

  static enrollParticipant(sessionId: string, enrollment: Omit<ParticipantEnrollment, 'id' | 'enrolledAt'>, actor: User): TrainingSession {
    const sessions = this.getSessions();
    const target = sessions.find(s => s.id === sessionId);
    if (!target) throw new Error('Session not found');

    const newEnr: ParticipantEnrollment = {
      id: `enr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...enrollment,
      enrolledAt: new Date().toISOString()
    };
    target.enrollments.push(newEnr);
    target.updatedAt = new Date().toISOString();
    safeSet(STORAGE_KEYS.SESSIONS, sessions);
    this.logAction(actor, 'ENROLL', 'SESSION', sessionId, `Enrolled participant ${enrollment.participantName} in ${target.sessionCode}`);
    return target;
  }

  static recordAttendance(sessionId: string, enrollmentId: string, status: any, actor: User): TrainingSession {
    const sessions = this.getSessions();
    const target = sessions.find(s => s.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = target.enrollments.find(e => e.id === enrollmentId);
    if (!enr) throw new Error('Participant enrollment not found');

    enr.attendance = status;
    enr.attendanceMarkedAt = new Date().toISOString();
    enr.attendanceMarkedBy = actor.name;
    enr.completionStatus = 'ATTENDED';
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.SESSIONS, sessions);
    this.logAction(actor, 'ATTENDANCE', 'SESSION', sessionId, `Recorded attendance ${status} for ${enr.participantName}`);
    return target;
  }

  static recordAssessment(sessionId: string, enrollmentId: string, score: number, remarks: string, actor: User): TrainingSession {
    const sessions = this.getSessions();
    const target = sessions.find(s => s.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = target.enrollments.find(e => e.id === enrollmentId);
    if (!enr) throw new Error('Participant enrollment not found');

    enr.assessmentScore = score;
    enr.assessmentRemarks = remarks;
    enr.assessmentStatus = score >= target.passingAssessmentScore ? 'PASSED' : 'FAILED';
    enr.completionStatus = score >= target.passingAssessmentScore ? 'SUBMITTED_FOR_APPROVAL' : 'ASSESSED';
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.SESSIONS, sessions);
    this.logAction(actor, 'ASSESSMENT', 'SESSION', sessionId, `Recorded score ${score}% for ${enr.participantName}`);
    return target;
  }

  static approveCompletionAndIssueCertificate(sessionId: string, enrollmentId: string, actor: User): { session: TrainingSession; certificate: Certificate } {
    const sessions = this.getSessions();
    const target = sessions.find(s => s.id === sessionId);
    if (!target) throw new Error('Session not found');

    const enr = target.enrollments.find(e => e.id === enrollmentId);
    if (!enr) throw new Error('Participant enrollment not found');

    if (enr.completionStatus === 'APPROVED' && enr.certificateId) {
      const existingCert = this.getCertificates().find(c => c.id === enr.certificateId);
      if (existingCert) return { session: target, certificate: existingCert };
    }

    const certificates = this.getCertificates();
    const currentYear = new Date().getFullYear();
    const certNum = `ECS-CERT-${currentYear}-${(certificates.length + 91).toString().padStart(4, '0')}`;
    const token = `vtf-${Math.random().toString(36).substring(2, 10)}-${currentYear}`;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      verificationToken: token,
      participantId: enr.participantId,
      participantName: enr.participantName,
      participantEmail: enr.participantEmail,
      organizationName: enr.organizationName || target.organizationName,
      courseId: target.courseId,
      courseTitle: target.courseTitle,
      sessionId: target.id,
      completionDate: new Date().toISOString(),
      durationHours: 16,
      gradeScore: enr.assessmentScore,
      issueDate: new Date().toISOString(),
      issuedByName: actor.name,
      issuedByRole: actor.role === 'SUPER_ADMIN' ? 'Principal Lead Auditor' : 'Executive Director of Compliance',
      status: 'ISSUED',
      verificationCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    certificates.unshift(newCert);
    safeSet(STORAGE_KEYS.CERTIFICATES, certificates);

    enr.completionStatus = 'APPROVED';
    enr.approvedBy = actor.name;
    enr.approvedAt = new Date().toISOString();
    enr.certificateId = newCert.id;
    enr.certificateNumber = newCert.certificateNumber;
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.SESSIONS, sessions);
    this.logAction(actor, 'ISSUE_CERTIFICATE', 'CERTIFICATE', newCert.id, `Issued certificate ${newCert.certificateNumber} to ${enr.participantName}`);

    return { session: target, certificate: newCert };
  }

  // CERTIFICATES
  static getCertificates(): Certificate[] {
    return safeGet<Certificate[]>(STORAGE_KEYS.CERTIFICATES, SEED_CERTIFICATES);
  }

  static getCertificateByNumber(certNumber: string): Certificate | undefined {
    return this.getCertificates().find(c => c.certificateNumber.toLowerCase() === certNumber.trim().toLowerCase());
  }

  static verifyCertificate(certNumber: string): Certificate | undefined {
    const list = this.getCertificates();
    let target = list.find(c => c.certificateNumber.toLowerCase() === certNumber.trim().toLowerCase());
    if (!target) {
      target = SEED_CERTIFICATES.find(c => c.certificateNumber.toLowerCase() === certNumber.trim().toLowerCase());
      if (target) {
        list.unshift(target);
      }
    }
    if (target) {
      target.verificationCount = (target.verificationCount || 0) + 1;
      target.updatedAt = new Date().toISOString();
      safeSet(STORAGE_KEYS.CERTIFICATES, list);
    }
    return target;
  }

  static revokeCertificate(certId: string, reason: string, actor: User): Certificate {
    const list = this.getCertificates();
    const target = list.find(c => c.id === certId);
    if (!target) throw new Error('Certificate not found');

    target.status = 'REVOKED';
    target.revocationReason = reason;
    target.updatedAt = new Date().toISOString();
    safeSet(STORAGE_KEYS.CERTIFICATES, list);
    this.logAction(actor, 'REVOKE', 'CERTIFICATE', certId, `Revoked certificate ${target.certificateNumber}: ${reason}`);
    return target;
  }

  // COMPANY VISITS
  static getVisits(): CompanyVisit[] {
    return safeGet<CompanyVisit[]>(STORAGE_KEYS.VISITS, SEED_VISITS);
  }

  static getVisitById(id: string): CompanyVisit | undefined {
    return this.getVisits().find(v => v.id === id);
  }

  static saveVisit(visit: CompanyVisit, actor: User): CompanyVisit {
    const list = this.getVisits();
    const idx = list.findIndex(v => v.id === visit.id);
    const updated = { ...visit, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
      this.logAction(actor, 'UPDATE', 'VISIT', visit.id, `Updated visit ${visit.visitReference}`);
    } else {
      list.push(updated);
      this.logAction(actor, 'CREATE', 'VISIT', visit.id, `Created visit ${visit.visitReference}`);
    }
    safeSet(STORAGE_KEYS.VISITS, list);
    return updated;
  }

  static submitVisitInspection(visitId: string, checklist: InspectionCheckItem[], summaryNotes: string, repPresent: string, actor: User): CompanyVisit {
    const list = this.getVisits();
    const target = list.find(v => v.id === visitId);
    if (!target) throw new Error('Visit not found');

    target.checklistResponses = checklist;
    target.consultantSummaryNotes = summaryNotes;
    target.clientRepPresent = repPresent;
    target.status = 'SUBMITTED_FOR_REVIEW';
    target.endTime = new Date().toTimeString().slice(0, 5);

    // Recalculate findings
    let crit = 0, maj = 0, min = 0, obs = 0;
    checklist.forEach(item => {
      if (item.response === 'NON_COMPLIANT') {
        if (item.severity === 'CRITICAL') crit++;
        else if (item.severity === 'MAJOR') maj++;
        else if (item.severity === 'MINOR') min++;
        else obs++;
      }
    });
    target.findingsCount = { critical: crit, major: maj, minor: min, observations: obs };
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.VISITS, list);
    this.logAction(actor, 'SUBMIT_INSPECTION', 'VISIT', visitId, `Submitted inspection checklist for ${target.visitReference}`);
    return target;
  }

  static approveVisitReport(visitId: string, reviewNotes: string, actor: User): CompanyVisit {
    const list = this.getVisits();
    const target = list.find(v => v.id === visitId);
    if (!target) throw new Error('Visit not found');

    target.status = 'APPROVED';
    target.reviewNotes = reviewNotes;
    target.reviewedBy = actor.name;
    target.reviewedAt = new Date().toISOString();
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.VISITS, list);
    this.logAction(actor, 'APPROVE_REPORT', 'VISIT', visitId, `Approved official visit report for ${target.visitReference}`);
    return target;
  }

  // CORRECTIVE ACTIONS (CAPA)
  static getCAPAs(): CorrectiveAction[] {
    return safeGet<CorrectiveAction[]>(STORAGE_KEYS.CAPA, SEED_CAPA);
  }

  static getCAPAById(id: string): CorrectiveAction | undefined {
    return this.getCAPAs().find(c => c.id === id);
  }

  static saveCAPA(capa: CorrectiveAction, actor: User): CorrectiveAction {
    const list = this.getCAPAs();
    const idx = list.findIndex(c => c.id === capa.id);
    const updated = { ...capa, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
      this.logAction(actor, 'UPDATE', 'CAPA', capa.id, `Updated CAPA ${capa.referenceNumber}`);
    } else {
      list.push(updated);
      this.logAction(actor, 'CREATE', 'CAPA', capa.id, `Created CAPA ${capa.referenceNumber}`);
    }
    safeSet(STORAGE_KEYS.CAPA, list);
    return updated;
  }

  static submitCAPAEvidence(capaId: string, evidence: Omit<CAPAEvidence, 'id' | 'createdAt'>, actor: User): CorrectiveAction {
    const list = this.getCAPAs();
    const target = list.find(c => c.id === capaId);
    if (!target) throw new Error('CAPA not found');

    const newEv: CAPAEvidence = {
      id: `ev-${Date.now()}`,
      ...evidence,
      createdAt: new Date().toISOString()
    };
    target.evidenceList.push(newEv);
    target.status = 'SUBMITTED_FOR_REVIEW';
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.CAPA, list);
    this.logAction(actor, 'SUBMIT_EVIDENCE', 'CAPA', capaId, `Submitted corrective action evidence for ${target.referenceNumber}`);
    return target;
  }

  static closeCAPA(capaId: string, comments: string, actor: User): CorrectiveAction {
    const list = this.getCAPAs();
    const target = list.find(c => c.id === capaId);
    if (!target) throw new Error('CAPA not found');

    target.status = 'CLOSED';
    target.reviewerComments = comments;
    target.closedBy = actor.name;
    target.closedAt = new Date().toISOString();
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.CAPA, list);
    this.logAction(actor, 'CLOSE_CAPA', 'CAPA', capaId, `Approved closure of ${target.referenceNumber}`);
    return target;
  }

  static reviewCAPA(capaId: string, decision: 'APPROVED' | 'REJECTED', comments: string, actor: User): CorrectiveAction {
    const list = this.getCAPAs();
    const target = list.find(c => c.id === capaId);
    if (!target) throw new Error('CAPA not found');

    if (decision === 'APPROVED') {
      target.status = 'CLOSED';
      target.closedBy = actor.name;
      target.closedAt = new Date().toISOString();
    } else {
      target.status = 'REJECTED_FOR_REWORK';
    }
    target.reviewerComments = comments;
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.CAPA, list);
    this.logAction(actor, 'REVIEW_CAPA', 'CAPA', capaId, `${decision === 'APPROVED' ? 'Approved & closed' : 'Requested rework for'} CAPA ${target.referenceNumber}`);
    return target;
  }

  // DOCUMENTS
  static getDocuments(): ComplianceDocument[] {
    return safeGet<ComplianceDocument[]>(STORAGE_KEYS.DOCUMENTS, SEED_DOCUMENTS);
  }

  // NOTIFICATIONS
  static getNotifications(userEmail?: string): InAppNotification[] {
    const list = safeGet<InAppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-1',
        recipientEmail: 's.mehta@agronutriexports.com',
        recipientRole: 'CLIENT_ADMIN',
        title: 'Inspection Report Approved',
        message: 'Visit report ECS-VST-2026-012 has been officially approved. Review findings and open CAPAs.',
        category: 'VISIT',
        linkPath: '/client',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'notif-2',
        recipientEmail: 'neha.verma@agronutriexports.com',
        recipientRole: 'PARTICIPANT',
        title: 'Certificate Issued',
        message: 'Your certificate for FSSC Awareness & Internal Auditor (ECS-CERT-2026-0089) is ready for download.',
        category: 'CERTIFICATE',
        linkPath: '/participant',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ]);

    if (!userEmail) return list;
    return list.filter(n => n.recipientEmail === userEmail || n.recipientEmail === '*');
  }

  // USERS & AUTH
  static getUsers(): User[] {
    return safeGet<User[]>(STORAGE_KEYS.USERS, SEED_USERS);
  }

  static getCurrentUser(): User {
    return safeGet<User>(STORAGE_KEYS.CURRENT_USER, SEED_USERS[0]);
  }

  static setCurrentUser(user: User): void {
    safeSet(STORAGE_KEYS.CURRENT_USER, user);
  }

  static switchUserByRole(role: UserRole): User {
    const users = this.getUsers();
    let matching = users.find(u => u.role === role);
    if (!matching) {
      matching = {
        id: `usr-${Date.now()}`,
        name: `${role} Demo User`,
        email: `${role.toLowerCase()}@essorcompliance.com`,
        role,
        isActive: true
      };
    }
    this.setCurrentUser(matching);
    return matching;
  }

  static switchRole(role: UserRole): User {
    return this.switchUserByRole(role);
  }

  // SERVICES, TRAINING COURSES, CMS, ENQUIRIES, AUDIT LOGS
  static getServices(): ServiceItem[] {
    return safeGet<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }

  static saveService(service: ServiceItem, actor: User): ServiceItem {
    const list = this.getServices();
    const idx = list.findIndex(s => s.id === service.id);
    const updated = { ...service, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
      this.logAction(actor, 'UPDATE', 'SERVICE', service.id, `Updated service "${service.title}"`);
    } else {
      list.push(updated);
      this.logAction(actor, 'CREATE', 'SERVICE', service.id, `Created service "${service.title}"`);
    }
    safeSet(STORAGE_KEYS.SERVICES, list);
    return updated;
  }

  static getCourses(): TrainingCourse[] {
    return safeGet<TrainingCourse[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  }

  static saveCourse(course: TrainingCourse, actor: User): TrainingCourse {
    const list = this.getCourses();
    const idx = list.findIndex(c => c.id === course.id);
    const updated = { ...course, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
      this.logAction(actor, 'UPDATE', 'TRAINING', course.id, `Updated training program "${course.title}"`);
    } else {
      list.push(updated);
      this.logAction(actor, 'CREATE', 'TRAINING', course.id, `Created training program "${course.title}"`);
    }
    safeSet(STORAGE_KEYS.COURSES, list);
    return updated;
  }

  static getEnquiries(): Enquiry[] {
    return safeGet<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  }

  static getCMSContent(): CMSContent {
    return safeGet<CMSContent>(STORAGE_KEYS.CMS, INITIAL_CMS);
  }

  static saveCMSContent(content: CMSContent, actor: User): CMSContent {
    safeSet(STORAGE_KEYS.CMS, content);
    this.logAction(actor, 'UPDATE', 'CMS_CONTENT', 'global', 'Updated global CMS and contact settings');
    return content;
  }

  static createEnquiry(payload: any): { enquiry: Enquiry; referenceNumber: string } {
    const enquiries = this.getEnquiries();
    const currentYear = new Date().getFullYear();
    const nextNum = (enquiries.length + 45).toString().padStart(4, '0');
    const referenceNumber = `ECS-${currentYear}-${nextNum}`;

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      referenceNumber,
      ...payload,
      status: 'NEW',
      notes: [],
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          enquiryId: `enq-${Date.now()}`,
          previousStatus: 'NEW',
          newStatus: 'NEW',
          changedByName: 'System Intake',
          changedByEmail: 'system@essorcompliance.com',
          reason: 'Initial enquiry submitted through public website portal',
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    enquiries.unshift(newEnquiry);
    safeSet(STORAGE_KEYS.ENQUIRIES, enquiries);
    return { enquiry: newEnquiry, referenceNumber };
  }

  static updateEnquiryStatus(enquiryId: string, status: EnquiryStatus, actor: User, reason?: string): Enquiry {
    const list = this.getEnquiries();
    const target = list.find(e => e.id === enquiryId);
    if (!target) throw new Error('Enquiry not found');

    const prev = target.status;
    target.status = status;
    target.updatedAt = new Date().toISOString();
    target.statusHistory.unshift({
      id: `hist-${Date.now()}`,
      enquiryId,
      previousStatus: prev,
      newStatus: status,
      changedByName: actor.name,
      changedByEmail: actor.email,
      reason: reason || `Status updated to ${status}`,
      createdAt: new Date().toISOString()
    });

    safeSet(STORAGE_KEYS.ENQUIRIES, list);
    this.logAction(actor, 'UPDATE_STATUS', 'ENQUIRY', enquiryId, `Updated enquiry ${target.referenceNumber} status from ${prev} to ${status}`);
    return target;
  }

  static addEnquiryNote(enquiryId: string, noteText: string, actor: User): Enquiry {
    const list = this.getEnquiries();
    const target = list.find(e => e.id === enquiryId);
    if (!target) throw new Error('Enquiry not found');

    const newNote: EnquiryNote = {
      id: `note-${Date.now()}`,
      enquiryId,
      authorName: actor.name,
      authorEmail: actor.email,
      note: noteText,
      createdAt: new Date().toISOString()
    };
    target.notes.unshift(newNote);
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.ENQUIRIES, list);
    this.logAction(actor, 'ADD_NOTE', 'ENQUIRY', enquiryId, `Added internal follow-up note to ${target.referenceNumber}`);
    return target;
  }

  static assignEnquiry(enquiryId: string, assignedTo: string, actor: User): Enquiry {
    const list = this.getEnquiries();
    const target = list.find(e => e.id === enquiryId);
    if (!target) throw new Error('Enquiry not found');

    target.assignedTo = assignedTo;
    target.updatedAt = new Date().toISOString();

    safeSet(STORAGE_KEYS.ENQUIRIES, list);
    this.logAction(actor, 'ASSIGN', 'ENQUIRY', enquiryId, `Assigned enquiry ${target.referenceNumber} to ${assignedTo}`);
    return target;
  }

  static getAuditLogs(): AuditLog[] {
    return safeGet<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, [
      {
        id: 'log-1',
        actorName: 'System Bootstrap',
        actorEmail: 'system@essorcompliance.com',
        action: 'INITIALIZE',
        entityType: 'SETTINGS',
        entityId: 'global',
        summary: 'Platform initialized with seed organizations, courses, and lead registers',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]);
  }

  static logAction(actor: User, action: string, entityType: any, entityId: string, summary: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actorName: actor.name,
      actorEmail: actor.email,
      action,
      entityType,
      entityId,
      summary,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    if (logs.length > 300) logs.pop();
    safeSet(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  static exportEnquiriesToCSV(): string {
    const enquiries = this.getEnquiries();
    const headers = ['Reference Number', 'Date', 'Company', 'Contact', 'Email', 'Phone', 'Service', 'Status', 'Assigned To'];
    const rows = enquiries.map(e => [
      `"${e.referenceNumber}"`,
      `"${new Date(e.createdAt).toLocaleDateString()}"`,
      `"${(e.companyName || '').replace(/"/g, '""')}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.serviceTitle || '').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.assignedTo || 'Unassigned').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}
