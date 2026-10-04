export type EvidenceStatus = 'confirmed' | 'review' | 'missing';

export type MatchStatus = 'good' | 'gaps' | 'info' | 'issue';

export type EligibilityStatus = 'looks_good' | 'needs_review' | 'need_info' | 'possible_issue';

export type ReadinessStatus = 'ready' | 'almost_ready' | 'not_ready';

export type JobLifecycle = 'new' | 'open' | 'updated' | 'expiring' | 'closed' | 'cancelled' | 'reopened';

export interface EvidenceItem {
  id: string;
  statement: string;
  category: 'Experience' | 'Education' | 'Skills' | 'Certification' | 'Projects' | 'Other';
  source: 'Resume' | 'LinkedIn Export' | 'SF-50' | 'Transcript' | 'Manual Profile';
  sourceLocation: string; // e.g. "Resume — Page 3"
  verificationStatus: EvidenceStatus;
  linkedRequirements: string[]; // requirement texts or IDs
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FederalRequirement {
  id: string;
  text: string;
  category: 'Experience' | 'Education' | 'Skills' | 'Certification' | 'Specialized Exp' | 'Hiring Path' | 'Security Clearance' | 'Documents' | 'Other';
  source: string; // e.g. "USAJOBS Qualifications Section"
  importance: 'mandatory' | 'selective' | 'preferred';
  assessment: MatchStatus;
  linkedEvidenceIds: string[];
  explanation: string;
  gapOrClarification?: string;
}

export interface FederalJob {
  id: string;
  announcementNumber: string;
  title: string;
  agency: string;
  department: string;
  grade: string; // e.g. "GS-12", "GS-13", "GS-14"
  series: string; // e.g. "0343 Management and Program Analysis"
  location: string;
  isRemote: boolean;
  salary: {
    min: number;
    max: number;
    rate: string;
  };
  workSchedule: string; // e.g. "Full-time - Permanent"
  hiringPath: string[]; // e.g. ["Open to the public", "Veterans", "Federal employees"]
  securityClearance: string; // e.g. "Secret", "Public Trust", "Top Secret"
  openingDate: string;
  closingDate: string;
  status: JobLifecycle;
  updateReason?: string;
  announcementVersion: string;
  officialUrl: string;
  summary: string;
  duties: string[];
  requirements: FederalRequirement[];
  requiredDocuments: string[];
  whoMayApply: string;
  applicationInstructions: string;
  matchStatus: MatchStatus;
  matchReasonSummary: string;
  analyzedAt: string;
}

export interface ExperienceRecord {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string; // "Present" or date
  hoursPerWeek: number;
  seriesOrEquivalent?: string;
  federalGradeEquivalent?: string;
  keyDuties: string[];
}

export interface EducationRecord {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
}

export interface CareerProfile {
  name: string;
  currentTitle: string;
  email: string;
  phone: string;
  location: string;
  citizenship: string;
  veteranPreference: string;
  scheduleA: boolean;
  securityClearance: string;
  summary: string;
  experiences: ExperienceRecord[];
  educations: EducationRecord[];
  skills: string[];
  certifications: string[];
  projects: { id: string; name: string; description: string; duration: string }[];
  achievements: string[];
  languages: { language: string; proficiency: string }[];
  preferences: {
    targetGrades: string[];
    targetSeries: string[];
    preferredAgencies: string[];
    remoteOnly: boolean;
    relocation: boolean;
    desiredLocations: string[];
  };
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  agency: string;
  grade: string;
  announcementNumber: string;
  applicationDate: string;
  closingDate: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offer' | 'Closed';
  nextAction: string;
  documentsSubmitted: string[];
  notes: string;
  outcome?: string;
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
}

export interface JobAlert {
  id: string;
  jobId: string;
  jobTitle: string;
  agency: string;
  grade: string;
  location: string;
  matchStatus: MatchStatus;
  why: string;
  date: string;
  isRead: boolean;
  isSaved: boolean;
}

export type PlanType = 'free' | 'job_analysis' | 'career_pass' | 'monthly';

export type BillingStatus = 'free' | 'checkout' | 'processing' | 'active' | 'expired' | 'cancelled' | 'failed';

export interface BillingState {
  currentPlan: PlanType;
  billingStatus: BillingStatus;
  remainingFreeAnalyses: number;
  unlockedJobs: string[];
  subscriptionRenewalDate?: string;
}
