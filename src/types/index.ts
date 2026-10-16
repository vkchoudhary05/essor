export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'OPERATIONS_MANAGER' 
  | 'TRAINER' 
  | 'AUDITOR_CONSULTANT' 
  | 'CLIENT_ADMIN' 
  | 'CLIENT_STAFF' 
  | 'PARTICIPANT'
  | 'SALES'
  | 'CONTENT_MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string; // Scoped if client user
  siteId?: string;
  isActive: boolean;
  avatarUrl?: string;
  phone?: string;
  lastLoginAt?: string;
}

export type AdminUser = User;

export interface ClientSite {
  id: string;
  organizationId: string;
  name: string;
  siteCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  applicableStandards: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Organization {
  id: string;
  legalName: string;
  code: string;
  industry: string;
  businessType: string;
  primaryEmail: string;
  primaryPhone: string;
  headquartersAddress: string;
  assignedAccountManager: string;
  status: 'ACTIVE' | 'ONBOARDING' | 'SUSPENDED' | 'ARCHIVED';
  sites: ClientSite[];
  serviceAgreements: string[];
  createdAt: string;
  updatedAt: string;
}

// TRAINING & CERTIFICATE TYPES
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
export type AssessmentStatus = 'PASSED' | 'FAILED' | 'PENDING';
export type CompletionStatus = 'ENROLLED' | 'ATTENDED' | 'ASSESSED' | 'SUBMITTED_FOR_APPROVAL' | 'APPROVED' | 'REJECTED';
export type CertificateStatus = 'ISSUED' | 'REVOKED' | 'REISSUED';

export interface ParticipantEnrollment {
  id: string;
  sessionId: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  organizationId?: string;
  organizationName?: string;
  attendance: AttendanceStatus;
  attendanceMarkedAt?: string;
  attendanceMarkedBy?: string;
  assessmentScore?: number; // 0 - 100
  assessmentStatus: AssessmentStatus;
  assessmentRemarks?: string;
  completionStatus: CompletionStatus;
  approvedBy?: string;
  approvedAt?: string;
  certificateId?: string;
  certificateNumber?: string;
  enrolledAt: string;
}

export interface TrainingSession {
  id: string;
  sessionCode: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  trainerId: string;
  trainerName: string;
  organizationId?: string; // Optional if corporate on-site
  organizationName?: string;
  deliveryType: 'Open-enrolment' | 'College / student programs' | 'On-site corporate' | 'Virtual' | 'Customized client curriculum';
  startDate: string; // ISO
  endDate: string;
  venueOrLink: string;
  status: 'DRAFT' | 'PUBLISHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  maxSeats: number;
  enrollments: ParticipantEnrollment[];
  attendanceThresholdPercent: number; // e.g. 80%
  passingAssessmentScore: number; // e.g. 70
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // e.g. ECS-CERT-2026-0089
  verificationToken: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  organizationName?: string;
  courseId: string;
  courseTitle: string;
  sessionId: string;
  completionDate: string;
  durationHours: number;
  gradeScore?: number;
  issueDate: string;
  issuedByName: string;
  issuedByRole: string;
  status: CertificateStatus;
  revocationReason?: string;
  reissuedFromCertNumber?: string;
  verificationCount: number;
  pdfStorageKey?: string;
  createdAt: string;
  updatedAt: string;
}

// COMPANY VISIT & DIGITAL INSPECTION TYPES
export type VisitLifecycle = 
  | 'PLANNED'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'SUBMITTED_FOR_REVIEW'
  | 'APPROVED'
  | 'CLOSED'
  | 'CANCELLED';

export type ComplianceAnswer = 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE' | 'NOT_INSPECTED';
export type FindingSeverity = 'CRITICAL' | 'MAJOR' | 'MINOR' | 'OBSERVATION';

export interface InspectionCheckItem {
  id: string;
  section: string;
  question: string;
  guidance?: string;
  response: ComplianceAnswer;
  observation?: string;
  severity?: FindingSeverity;
  evidenceNotes?: string;
  evidencePhotoName?: string;
  correctiveActionRequired?: boolean;
}

export interface CompanyVisit {
  id: string;
  visitReference: string; // e.g. ECS-VST-2026-012
  organizationId: string;
  organizationName: string;
  siteId: string;
  siteName: string;
  siteAddress: string;
  consultantId: string;
  consultantName: string;
  scheduledDate: string;
  visitType: 'AUDIT_GAP_ASSESSMENT' | 'MOCK_AUDIT' | 'MONTHLY_GMP_REVIEW' | 'SUPPLIER_AUDIT' | 'SPECIALIZED_INSPECTION';
  standardsScope: string[];
  status: VisitLifecycle;
  startTime?: string;
  endTime?: string;
  clientRepPresent?: string;
  consultantSummaryNotes?: string;
  checklistResponses: InspectionCheckItem[];
  findingsCount: {
    critical: number;
    major: number;
    minor: number;
    observations: number;
  };
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reportStorageKey?: string;
  createdAt: string;
  updatedAt: string;
}

// CAPA / CORRECTIVE ACTION TYPES
export type CAPALifecycle = 
  | 'OPEN'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'SUBMITTED_FOR_REVIEW'
  | 'CLOSED'
  | 'REJECTED_FOR_REWORK';

export interface CAPAEvidence {
  id: string;
  uploadedBy: string;
  uploadedByRole: string;
  filename: string;
  notes: string;
  createdAt: string;
}

export interface CorrectiveAction {
  id: string;
  referenceNumber: string; // e.g. CAPA-2026-034
  organizationId: string;
  organizationName: string;
  siteId: string;
  siteName: string;
  sourceVisitId?: string;
  sourceVisitRef?: string;
  findingTitle: string;
  findingDescription: string;
  severity: FindingSeverity;
  standardClause?: string;
  rootCauseAnalysis?: string;
  immediateCorrection?: string;
  preventiveActionPlan?: string;
  responsiblePerson: string;
  responsibleEmail: string;
  dueDate: string;
  status: CAPALifecycle;
  evidenceList: CAPAEvidence[];
  reviewerComments?: string;
  closedBy?: string;
  closedAt?: string;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
}

// DOCUMENTS & REPORTS
export interface ComplianceDocument {
  id: string;
  organizationId?: string; // Optional if global
  title: string;
  category: 'POLICY' | 'SOP' | 'AUDIT_REPORT' | 'CERTIFICATE' | 'TRAINING_MATERIAL' | 'EVIDENCE';
  filename: string;
  fileSizeKb: number;
  fileType: string;
  uploadedByName: string;
  version: string;
  isConfidential: boolean;
  createdAt: string;
}

// IN-APP NOTIFICATIONS
export interface InAppNotification {
  id: string;
  recipientEmail: string;
  recipientRole: UserRole;
  title: string;
  message: string;
  category: 'TRAINING' | 'VISIT' | 'CAPA' | 'CERTIFICATE' | 'SYSTEM';
  linkPath?: string;
  isRead: boolean;
  createdAt: string;
}

// Original service and CMS types
export type ServiceCategory = 
  | 'AUDIT_READINESS'
  | 'MANAGED_SUPPORT'
  | 'TRAINING'
  | 'DIGITAL_COMPLIANCE'
  | 'QUALITY_MANAGEMENT'
  | 'SPECIALIZED_REQUIREMENTS';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  applicableStandards?: string[];
  displayOrder: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  updatedAt: string;
}

export type TrainingDeliveryMode = 
  | 'Open-enrolment'
  | 'College / student programs'
  | 'On-site corporate'
  | 'Virtual'
  | 'Customized client curriculum';

export interface TrainingCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  targetAudience: string;
  keyTopics: string[];
  deliveryModes: TrainingDeliveryMode[];
  duration?: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  displayOrder: number;
  updatedAt: string;
}

export type EnquiryStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL_SENT'
  | 'CONVERTED'
  | 'CLOSED'
  | 'SPAM';

export interface EnquiryNote {
  id: string;
  enquiryId: string;
  authorName: string;
  authorEmail: string;
  note: string;
  createdAt: string;
}

export interface EnquiryStatusHistory {
  id: string;
  enquiryId: string;
  previousStatus: EnquiryStatus;
  newStatus: EnquiryStatus;
  changedByName: string;
  changedByEmail: string;
  reason?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  industry?: string;
  serviceId?: string;
  serviceTitle?: string;
  auditStandard?: string;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'EITHER';
  message: string;
  status: EnquiryStatus;
  assignedTo?: string;
  sourcePage: string;
  privacyAcknowledged: boolean;
  notes: EnquiryNote[];
  statusHistory: EnquiryStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  actorEmail: string;
  actorName: string;
  action: string;
  entityType: 'ENQUIRY' | 'SERVICE' | 'TRAINING' | 'SESSION' | 'CERTIFICATE' | 'VISIT' | 'CAPA' | 'ORGANIZATION' | 'CMS_CONTENT' | 'USER' | 'SETTINGS';
  entityId: string;
  summary: string;
  timestamp: string;
}

export interface CMSContent {
  companyName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  purpose: string;
  vision: string;
  mission: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  linkedinUrl: string;
  disclaimer: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiesPolicy: string;
}
