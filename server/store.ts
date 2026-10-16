import fs from 'fs';
import path from 'path';
import { 
  User, 
  Organization, 
  CompanyVisit, 
  TrainingSession, 
  Certificate, 
  CorrectiveAction, 
  Enquiry, 
  ServiceItem, 
  TrainingCourse, 
  CMSContent, 
  AuditLog, 
  ComplianceDocument,
  InAppNotification,
  UserRole
} from '../src/types';
import { 
  INITIAL_SERVICES, 
  INITIAL_COURSES, 
  INITIAL_ENQUIRIES, 
  INITIAL_CMS 
} from '../src/data/initialData';

const DATA_DIR = path.resolve(process.cwd(), '.data');
const STORE_FILE = path.join(DATA_DIR, 'essor_store.json');

export interface ServerState {
  users: User[];
  currentUser: User;
  organizations: Organization[];
  visits: CompanyVisit[];
  sessions: TrainingSession[];
  certificates: Certificate[];
  capas: CorrectiveAction[];
  enquiries: Enquiry[];
  services: ServiceItem[];
  courses: TrainingCourse[];
  cms: CMSContent;
  documents: ComplianceDocument[];
  notifications: InAppNotification[];
  auditLogs: AuditLog[];
}

const DEFAULT_USERS: User[] = [
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

const DEFAULT_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-1',
    legalName: 'AgroNutri Global Exports Ltd.',
    code: 'AGRO-01',
    industry: 'Spices, Seasonings & Ready-to-Cook Blends',
    businessType: 'Export Food Manufacturer',
    primaryEmail: 'quality.assurance@agronutriexports.com',
    primaryPhone: '+91 20 4910 8800',
    headquartersAddress: 'Plot 45, Chakan Industrial Area Phase II, Pune, Maharashtra 410501',
    assignedAccountManager: 'Aditi Sharma',
    status: 'ACTIVE',
    serviceAgreements: [
      'BRCGS Food Safety Issue 9 Certification Readiness',
      'Continuous Managed Compliance - Monthly GMP Reviews',
      'Corporate Allergen Control & Validation Workshop'
    ],
    sites: [
      {
        id: 'site-1',
        organizationId: 'org-1',
        name: 'Pune Spices Processing & Blending Unit 1',
        siteCode: 'AGRO-PUN-01',
        address: 'Plot 45, Chakan Phase II',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        contactName: 'Sunil Mehta (QA Director)',
        contactEmail: 's.mehta@agronutriexports.com',
        contactPhone: '+91 98220 11223',
        applicableStandards: ['BRCGS Food Safety', 'FSSC 22000', 'FSSAI Schedule 4', 'US FDA FSMA'],
        isActive: true,
        createdAt: '2025-11-10T08:00:00Z'
      },
      {
        id: 'site-2',
        organizationId: 'org-1',
        name: 'Nashik Dehydrated Vegetables & Cryo-Grinding Unit',
        siteCode: 'AGRO-NSK-02',
        address: 'Gat No. 112, Dindori Agro-Processing Zone',
        city: 'Nashik',
        state: 'Maharashtra',
        country: 'India',
        contactName: 'Kavita Deshmukh (Plant QA Lead)',
        contactEmail: 'k.deshmukh@agronutriexports.com',
        contactPhone: '+91 94231 44556',
        applicableStandards: ['ISO 22000', 'HACCP', 'Halal Export Standard'],
        isActive: true,
        createdAt: '2026-01-15T09:30:00Z'
      }
    ],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2026-03-28T14:00:00Z'
  },
  {
    id: 'org-2',
    legalName: 'PrimeBakes Confectionery LLP',
    code: 'PRIME-02',
    industry: 'Commercial Bakery, Pastries & Frozen Dough',
    businessType: 'Retail & Quick Service Supply',
    primaryEmail: 'compliance@primebakes.com',
    primaryPhone: '+91 80 2839 0044',
    headquartersAddress: '7th Cross, Peenya Industrial Area 3rd Stage, Bengaluru, Karnataka 560058',
    assignedAccountManager: 'Vikram Sen',
    status: 'ACTIVE',
    serviceAgreements: [
      'FSSC 22000 Version 6 Transition & Gap Assessment',
      'Hygiene Rating Verification'
    ],
    sites: [
      {
        id: 'site-3',
        organizationId: 'org-2',
        name: 'Bengaluru Central Bakery Works',
        siteCode: 'PRIME-BLR-01',
        address: 'Peenya 3rd Stage',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        contactName: 'Naveen Kumar',
        contactEmail: 'naveen.k@primebakes.com',
        contactPhone: '+91 99000 88771',
        applicableStandards: ['FSSC 22000', 'FSSAI Hygiene Rating', 'GMP'],
        isActive: true,
        createdAt: '2026-02-01T11:00:00Z'
      }
    ],
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-03-25T11:00:00Z'
  }
];

const DEFAULT_SESSIONS: TrainingSession[] = [
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
        enrolledAt: '2026-03-10T11:00:00Z'
      }
    ],
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-23T10:00:00Z'
  }
];

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'ECS-CERT-2026-0089',
    verificationToken: 'vtf-89a3f2b1-2026',
    participantId: 'usr-8',
    participantName: 'Neha Verma',
    participantEmail: 'neha.verma@agronutriexports.com',
    organizationName: 'AgroNutri Global Exports Ltd.',
    courseId: 'crs-3',
    courseTitle: 'FSSC Awareness & Internal Auditor',
    sessionId: 'sess-101',
    completionDate: '2026-03-22T17:00:00Z',
    durationHours: 16,
    gradeScore: 92,
    issueDate: '2026-03-23T10:00:00Z',
    issuedByName: 'Vivek Baliyan',
    issuedByRole: 'Principal Lead Auditor',
    status: 'ISSUED',
    verificationCount: 7,
    createdAt: '2026-03-23T10:00:00Z',
    updatedAt: '2026-03-23T10:00:00Z'
  }
];

const DEFAULT_VISITS: CompanyVisit[] = [
  {
    id: 'vst-1',
    visitReference: 'ECS-VST-2026-012',
    organizationId: 'org-1',
    organizationName: 'AgroNutri Global Exports Ltd.',
    siteId: 'site-1',
    siteName: 'Pune Spices Processing & Blending Unit 1',
    siteAddress: 'Plot 45, Chakan Phase II, Pune',
    consultantId: 'usr-5',
    consultantName: 'Rajesh Verma',
    scheduledDate: '2026-03-28T09:30:00Z',
    visitType: 'MOCK_AUDIT',
    standardsScope: ['BRCGS Food Safety Issue 9', 'FSSC 22000 V6'],
    status: 'APPROVED',
    startTime: '09:30',
    endTime: '17:15',
    clientRepPresent: 'Sunil Mehta (QA Director) & Anand Joshi (Shift QA Lead)',
    consultantSummaryNotes: 'Facility demonstrates high GMP discipline in dry blending zones. Two major non-conformances flagged regarding metal detector challenge frequency and wall coving seals.',
    findingsCount: { critical: 0, major: 1, minor: 1, observations: 3 },
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
      }
    ],
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-29T11:00:00Z'
  }
];

const DEFAULT_CAPA: CorrectiveAction[] = [
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
  }
];

export class ServerStore {
  private static state: ServerState | null = null;

  private static getInitialState(): ServerState {
    return {
      users: DEFAULT_USERS,
      currentUser: DEFAULT_USERS[0],
      organizations: DEFAULT_ORGANIZATIONS,
      visits: DEFAULT_VISITS,
      sessions: DEFAULT_SESSIONS,
      certificates: DEFAULT_CERTIFICATES,
      capas: DEFAULT_CAPA,
      enquiries: INITIAL_ENQUIRIES,
      services: INITIAL_SERVICES,
      courses: INITIAL_COURSES,
      cms: INITIAL_CMS,
      documents: [
        {
          id: 'doc-1',
          organizationId: 'org-1',
          title: 'Allergen Control Protocol & Validation Study V3',
          category: 'SOP',
          filename: 'SOP-QA-042_Allergen_Validation.pdf',
          fileSizeKb: 1420,
          fileType: 'application/pdf',
          uploadedByName: 'Sunil Mehta',
          version: '3.1',
          isConfidential: true,
          createdAt: '2026-02-14T09:00:00Z'
        }
      ],
      notifications: [
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
        }
      ],
      auditLogs: [
        {
          id: 'log-1',
          actorName: 'System Bootstrap',
          actorEmail: 'system@essorcompliance.com',
          action: 'INITIALIZE',
          entityType: 'SETTINGS',
          entityId: 'global',
          summary: 'Backend server initialized with operational data',
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  static getState(): ServerState {
    if (this.state) return this.state;

    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        this.state = JSON.parse(raw);
        return this.state!;
      }
    } catch (e) {
      console.warn('Failed to read from server store file, using default seed', e);
    }

    this.state = this.getInitialState();
    this.saveState();
    return this.state;
  }

  static saveState(): void {
    if (!this.state) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write server store to disk', e);
    }
  }

  static logAction(actor: User, action: string, entityType: any, entityId: string, summary: string): void {
    const s = this.getState();
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
    s.auditLogs.unshift(newLog);
    if (s.auditLogs.length > 500) s.auditLogs.pop();
    this.saveState();
  }
}
