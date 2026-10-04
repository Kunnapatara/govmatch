import { FederalJob, EvidenceItem, CareerProfile, ApplicationRecord, JobAlert } from '../types';

export const initialEvidenceItems: EvidenceItem[] = [
  {
    id: 'ev-1',
    statement: 'Led a cross-functional project involving 12 employees over 8 months to modernize grant workflow tracking.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 3',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Project Leadership & Cross-Functional Team Oversight', 'Program Evaluation Methods'],
    notes: 'Verified against resume section: Senior Operations Lead at Apex Solutions.',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-20',
  },
  {
    id: 'ev-2',
    statement: 'Managed procurement contracts valued at $3.2M adhering to federal acquisition guidelines and audit standards.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 2',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Experience managing procurement activities', 'Contract Oversight & Compliance'],
    notes: 'Includes vendor negotiation, statement of work drafting, and milestone tracking.',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-22',
  },
  {
    id: 'ev-3',
    statement: 'Master of Public Administration (MPA) with concentration in Public Policy & Program Evaluation.',
    category: 'Education',
    source: 'Transcript',
    sourceLocation: 'Official Transcript — Page 1',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Education Substitution (Master’s or equivalent degree)', 'Advanced Quantitative Analysis'],
    notes: 'Accredited institution, GPA 3.88.',
    createdAt: '2026-09-12',
    updatedAt: '2026-09-12',
  },
  {
    id: 'ev-4',
    statement: 'Engineered KPI dashboard in Power BI / Tableau utilized by executive directors to review operational throughput.',
    category: 'Skills',
    source: 'Resume',
    sourceLocation: 'Resume — Page 4',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Data Visualization & Performance Metrics Reporting'],
    notes: 'Weekly automated refreshes and data pipeline maintenance.',
    createdAt: '2026-09-16',
    updatedAt: '2026-09-16',
  },
  {
    id: 'ev-5',
    statement: 'Conducted risk assessments and compliance reviews across 4 regional program offices.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 3',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Internal Controls & Program Risk Mitigation'],
    notes: 'Identified 9 high-risk workflow bottlenecks and authored corrective action plan.',
    createdAt: '2026-09-18',
    updatedAt: '2026-09-18',
  },
  {
    id: 'ev-6',
    statement: 'Secret Security Clearance granted in 2023, currently active under Department of Defense reciprocal jurisdiction.',
    category: 'Other',
    source: 'SF-50',
    sourceLocation: 'Verification Document #SC-991',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Security Clearance Requirement: Secret'],
    notes: 'Re-investigation date not until late 2028.',
    createdAt: '2026-09-10',
    updatedAt: '2026-09-10',
  },
  {
    id: 'ev-7',
    statement: 'Project Management Professional (PMP) Certification #2884910, Project Management Institute.',
    category: 'Certification',
    source: 'Manual Profile',
    sourceLocation: 'PMI Registry Verification',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Professional Project Management Credential'],
    notes: 'Valid through November 2027.',
    createdAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    id: 'ev-8',
    statement: 'Coordinated stakeholder engagement across 5 state partner agencies and municipal stakeholders.',
    category: 'Experience',
    source: 'LinkedIn Export',
    sourceLocation: 'Positions Archive — 2024-02',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Interagency Collaboration & Communication'],
    notes: 'Organized quarterly working group meetings and published joint guidance.',
    createdAt: '2026-09-22',
    updatedAt: '2026-09-22',
  },
  {
    id: 'ev-9',
    statement: 'Authored 14 comprehensive technical and policy briefing papers for agency leadership.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 1',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Executive Written Communications & Briefings'],
    notes: 'Briefed SES-level directorates on budget allocation strategies.',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-15',
  },
  {
    id: 'ev-10',
    statement: 'Managed $1.8M annual operating budget, performing monthly variance analysis and spend projections.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 2',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Budget Formulation & Financial Execution'],
    notes: 'Prevented end-of-year funding lapse by reallocating surplus.',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-15',
  },
  {
    id: 'ev-11',
    statement: 'Proficient in Python and SQL for quantitative data cleaning and federal dataset synthesis.',
    category: 'Skills',
    source: 'Resume',
    sourceLocation: 'Resume — Page 4',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Quantitative Data Synthesis & Scripting'],
    notes: 'Wrote automated scripts for cleaning public census and labor data.',
    createdAt: '2026-09-17',
    updatedAt: '2026-09-17',
  },
  {
    id: 'ev-12',
    statement: 'Drafted Standard Operating Procedures (SOPs) adopted by 40+ operational staff members.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 3',
    verificationStatus: 'confirmed',
    linkedRequirements: ['Policy Implementation & SOP Development'],
    notes: 'Reduced onboarding time by 3 weeks according to internal review.',
    createdAt: '2026-09-19',
    updatedAt: '2026-09-19',
  },
  {
    id: 'ev-13',
    statement: 'Facilitated Agile sprint ceremonies and backlog grooming for enterprise data platform rollout.',
    category: 'Experience',
    source: 'LinkedIn Export',
    sourceLocation: 'LinkedIn Export — Recommendations Section',
    verificationStatus: 'review',
    linkedRequirements: ['Agile / Scrum Methodologies'],
    notes: 'Mentioned in peer recommendation but exact dates and formal role title are unspecified.',
    createdAt: '2026-09-22',
    updatedAt: '2026-09-24',
  },
  {
    id: 'ev-14',
    statement: 'Certified Information Systems Security Professional (CISSP) training completed.',
    category: 'Certification',
    source: 'Manual Profile',
    sourceLocation: 'User Self-Reported Entry',
    verificationStatus: 'review',
    linkedRequirements: ['Cybersecurity Certification'],
    notes: 'Bootcamp completion certificate provided, but official exam voucher not yet passed or uploaded.',
    createdAt: '2026-09-25',
    updatedAt: '2026-09-25',
  },
  {
    id: 'ev-15',
    statement: 'Two years of specialized supervisory experience overseeing government contractor staff.',
    category: 'Experience',
    source: 'Resume',
    sourceLocation: 'Resume — Page 2',
    verificationStatus: 'review',
    linkedRequirements: ['Specialized Supervisory Experience (1+ year at GS-12 equivalent)'],
    notes: 'Team size indicated (4 contractors), but exact weekly hours and official supervisor designation require clarification.',
    createdAt: '2026-09-20',
    updatedAt: '2026-09-26',
  },
  {
    id: 'ev-16',
    statement: 'Federal Acquisition Certification in Contracting (FAC-C) Level II or DAWIA Level II equivalent.',
    category: 'Certification',
    source: 'Manual Profile',
    sourceLocation: 'Unverified requirement mapping',
    verificationStatus: 'missing',
    linkedRequirements: ['FAC-C Level II Certification (Mandatory for GS-1102-13)'],
    notes: 'No FAC-C or DAWIA warrant certificate uploaded in user profile.',
    createdAt: '2026-09-27',
    updatedAt: '2026-09-27',
  },
  {
    id: 'ev-17',
    statement: '1 year of specialized experience at next lower grade conducting formal Congressional testimony preparation.',
    category: 'Experience',
    source: 'Manual Profile',
    sourceLocation: 'Unverified requirement mapping',
    verificationStatus: 'missing',
    linkedRequirements: ['Congressional Hearing Preparation & Legislative Affairs'],
    notes: 'No documentation found in current resume or export.',
    createdAt: '2026-09-27',
    updatedAt: '2026-09-27',
  },
];

export const initialCareerProfile: CareerProfile = {
  name: 'Morgan Vance',
  currentTitle: 'Senior Program & Operations Specialist',
  email: 'morgan.vance@example.com',
  phone: '(202) 555-0184',
  location: 'Washington, DC (Open to Remote / Hybrid)',
  citizenship: 'U.S. Citizen',
  veteranPreference: '10-Point Preference (CPS)',
  scheduleA: false,
  securityClearance: 'Active Secret (DoD / 2023)',
  summary: 'Results-driven program and operations specialist with 7+ years of experience in cross-functional project leadership, federal procurement compliance, budget oversight, and quantitative operational analysis. Extensive track record presenting actionable intelligence to executive stakeholders.',
  experiences: [
    {
      id: 'exp-1',
      title: 'Senior Operations & Program Lead',
      organization: 'Apex Solutions Group (Federal Contractor)',
      location: 'Arlington, VA (Hybrid)',
      startDate: '2022-03',
      endDate: 'Present',
      hoursPerWeek: 40,
      seriesOrEquivalent: '0343 Management & Program Analysis',
      federalGradeEquivalent: 'GS-12 Equivalent',
      keyDuties: [
        'Direct multidisciplinary project teams executing federal grant modernizations valued at over $3.2M.',
        'Author high-level briefings, SOPs, and quarterly variance reports for government program managers.',
        'Design and maintain automated Power BI dashboards tracking SLA adherence across 4 regional divisions.',
        'Ensure full compliance with FAR, internal control frameworks, and Federal budget execution guidelines.'
      ]
    },
    {
      id: 'exp-2',
      title: 'Program Analyst & Operations Coordinator',
      organization: 'Beacon Strategic Advisory',
      location: 'Washington, DC',
      startDate: '2019-06',
      endDate: '2022-02',
      hoursPerWeek: 40,
      seriesOrEquivalent: '0343 Management & Program Analysis',
      federalGradeEquivalent: 'GS-11 Equivalent',
      keyDuties: [
        'Conducted quantitative workflow reviews that identified $240K in annual operational efficiencies.',
        'Monitored contractor deliverable schedules, invoices, and milestone acceptance criteria.',
        'Synthesized data from multiple legacy federal databases using SQL and statistical modeling.'
      ]
    }
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'Master of Public Administration (MPA)',
      fieldOfStudy: 'Public Policy Analysis & Program Evaluation',
      institution: 'George Washington University',
      graduationYear: '2019',
      gpa: '3.88'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Arts (BA)',
      fieldOfStudy: 'Political Science & Economics',
      institution: 'University of Virginia',
      graduationYear: '2017',
      gpa: '3.72'
    }
  ],
  skills: [
    'Federal Acquisition Regulations (FAR)',
    'Program Evaluation',
    'Power BI & Tableau',
    'SQL & Python (Data Analysis)',
    'Budget Formulation & Execution',
    'Stakeholder Management',
    'SOP Authoring',
    'Risk Assessment & Internal Controls'
  ],
  certifications: [
    'Project Management Professional (PMP) — PMI #2884910',
    'Lean Six Sigma Green Belt',
    'Secret Clearance (Active DoD Reciprocity)'
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Federal Grant Workflow Automation',
      description: 'Led end-to-end restructuring of intake and audit processes, shrinking turnaround by 32%.',
      duration: '8 months (2023 - 2024)'
    },
    {
      id: 'proj-2',
      name: 'Regional Compliance Audit Review',
      description: 'Conducted comprehensive internal control assessment across 4 satellite regional facilities.',
      duration: '6 months (2022)'
    }
  ],
  achievements: [
    'Awarded Apex Federal Excellence Award for leadership during agency data migration (2024)',
    'Graduated Pi Alpha Alpha Honor Society for Public Affairs and Administration (2019)'
  ],
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Spanish', proficiency: 'Professional Working' }
  ],
  preferences: {
    targetGrades: ['GS-12', 'GS-13', 'GS-14'],
    targetSeries: ['0343 Management & Program Analysis', '0301 General Administration', '1102 Contracting', '2210 Information Technology Management'],
    preferredAgencies: [
      'Department of Veterans Affairs',
      'Department of the Treasury',
      'Department of Homeland Security',
      'General Services Administration',
      'Environmental Protection Agency'
    ],
    remoteOnly: false,
    relocation: false,
    desiredLocations: ['Washington, DC', 'Remote', 'Arlington, VA', 'Alexandria, VA']
  }
};

export const initialFederalJobs: FederalJob[] = [
  {
    id: 'va-0343-gs12',
    announcementNumber: 'VHA-26-1249821-DE',
    title: 'Program Analyst',
    agency: 'Department of Veterans Affairs',
    department: 'Veterans Health Administration',
    grade: 'GS-12',
    series: '0343 Management and Program Analysis',
    location: 'Washington, District of Columbia',
    isRemote: true,
    salary: {
      min: 99200,
      max: 128956,
      rate: 'Per Year'
    },
    workSchedule: 'Full-time - Permanent',
    hiringPath: ['Open to the public', 'Veterans', 'Military spouses'],
    securityClearance: 'Secret',
    openingDate: '2026-09-28',
    closingDate: '2026-10-18',
    status: 'open',
    announcementVersion: 'Version 2.1 (Updated Oct 1, 2026)',
    officialUrl: 'https://www.usajobs.gov/job/mock-va-0343-gs12',
    summary: 'Serves as a Program Analyst in the VHA Office of Operations, providing expert management evaluations, data analysis, and program monitoring across nationwide regional medical centers.',
    duties: [
      'Conduct comprehensive qualitative and quantitative analyses of healthcare program operational efficiency.',
      'Formulate recommendations to executive management regarding budget resource allocations and staff distribution.',
      'Develop automated tracking dashboards and KPI reporting pipelines for senior leadership.',
      'Coordinate cross-functional work groups across regional medical centers to standardize operating procedures.'
    ],
    requirements: [
      {
        id: 'va-req-1',
        text: 'Experience managing procurement activities and monitoring contractor compliance under federal or institutional frameworks.',
        category: 'Experience',
        source: 'USAJOBS Qualifications Section — Specialized Experience',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-2'],
        explanation: 'Your profile provides verified evidence of managing $3.2M procurement contracts adhering to federal acquisition guidelines on Resume Page 2.'
      },
      {
        id: 'va-req-2',
        text: 'Experience leading cross-functional teams and managing project milestones to achieve operational goals.',
        category: 'Experience',
        source: 'USAJOBS Qualifications Section — Specialized Experience',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-1', 'ev-7'],
        explanation: 'Verified leadership of 12 employees across 8 months plus active PMP certification confirms this requirement.'
      },
      {
        id: 'va-req-3',
        text: 'Demonstrated ability to develop executive dashboards, analyze operational datasets, and present findings.',
        category: 'Skills',
        source: 'USAJOBS Knowledge, Skills, and Abilities (KSAs)',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-4', 'ev-11'],
        explanation: 'Verified experience with Power BI, Tableau, SQL, and executive-level throughput reporting on Resume Page 4.'
      },
      {
        id: 'va-req-4',
        text: 'One year of specialized experience equivalent to at least the GS-11 grade level in the federal service.',
        category: 'Specialized Exp',
        source: 'USAJOBS Specialized Experience Requirement',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-1', 'ev-2'],
        explanation: 'Over 4 years of documented operations lead experience at GS-11/12 equivalent level verified in profile.'
      },
      {
        id: 'va-req-5',
        text: 'Possession of an active Secret Security Clearance or ability to obtain one prior to appointment.',
        category: 'Security Clearance',
        source: 'USAJOBS Conditions of Employment',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-6'],
        explanation: 'Active DoD Secret Clearance verified in profile with SF-50 documentation.'
      },
      {
        id: 'va-req-6',
        text: 'Experience drafting Standard Operating Procedures (SOPs) and policy directives for organizational units.',
        category: 'Experience',
        source: 'USAJOBS Duties Section',
        importance: 'preferred',
        assessment: 'good',
        linkedEvidenceIds: ['ev-12'],
        explanation: 'Documented authoring of SOPs adopted across 40+ operational staff verified on Resume Page 3.'
      }
    ],
    requiredDocuments: [
      'Federal Resume (showing hours per week, series/grade equivalency, start and end dates)',
      'College Transcripts (Official or Unofficial showing MPA degree)',
      'DD-214 Member 4 Copy or Statement of Service (for Veterans Preference claim)',
      'Proof of Security Clearance (SF-50 or Agency Clearance Memorandum)'
    ],
    whoMayApply: 'U.S. citizens, nationals, or those who owe allegiance to the U.S. Open to the public and preference-eligible veterans.',
    applicationInstructions: 'Submit full resume and supporting transcripts through USAJOBS before 11:59 PM Eastern Time on closing date.',
    matchStatus: 'good',
    matchReasonSummary: 'Strong verified alignment across 5 mandatory specialized experience requirements, active Secret clearance, and relevant MPA graduate degree.',
    analyzedAt: '2026-10-02'
  },
  {
    id: 'treasury-0343-gs14',
    announcementNumber: 'TREAS-26-88319-MP',
    title: 'Senior Management & Program Analyst',
    agency: 'Department of the Treasury',
    department: 'Bureau of the Fiscal Service',
    grade: 'GS-14',
    series: '0343 Management and Program Analysis',
    location: 'Washington, District of Columbia',
    isRemote: false,
    salary: {
      min: 139395,
      max: 181216,
      rate: 'Per Year'
    },
    workSchedule: 'Full-time - Permanent',
    hiringPath: ['Federal employees', 'Veterans', 'Special authorities'],
    securityClearance: 'Secret',
    openingDate: '2026-09-24',
    closingDate: '2026-10-14',
    status: 'updated',
    updateReason: 'Announcement amendment #1: Extended closing date and updated supervisory experience criteria.',
    announcementVersion: 'Version 2.0 (Amended Oct 2, 2026)',
    officialUrl: 'https://www.usajobs.gov/job/mock-treasury-0343-gs14',
    summary: 'Serves as Senior Management Analyst advising bureau executives on macro financial policy, enterprise risk management, and statutory program oversight under the Chief Financial Officers Act.',
    duties: [
      'Lead comprehensive evaluations of nationwide treasury disbursement programs and internal control structures.',
      'Represent the Bureau in interagency working groups with OMB, GAO, and federal inspector general offices.',
      'Supervise subordinate analysts and direct multidisciplinary review teams.',
      'Prepare testimony and formal briefing binders for congressional oversight hearings.'
    ],
    requirements: [
      {
        id: 'tr-req-1',
        text: 'At least one full year of specialized experience equivalent to the GS-13 grade level in federal service.',
        category: 'Specialized Exp',
        source: 'USAJOBS Qualifications Section',
        importance: 'mandatory',
        assessment: 'gaps',
        linkedEvidenceIds: ['ev-1', 'ev-15'],
        explanation: 'Your profile documents experience at the GS-12 equivalent level. Promotion to GS-14 typically mandates 52 weeks of documented GS-13 specialized experience.',
        gapOrClarification: 'Review whether past senior contractor responsibilities fully meet GS-13 level complexity.'
      },
      {
        id: 'tr-req-2',
        text: 'Demonstrated supervisory experience overseeing staff performance, resource allocation, and formal appraisal reviews.',
        category: 'Experience',
        source: 'USAJOBS Conditions of Employment',
        importance: 'mandatory',
        assessment: 'gaps',
        linkedEvidenceIds: ['ev-15'],
        explanation: 'Evidence item #15 notes supervision of 4 contractor personnel, but official supervisory authority and formal performance rating duties are marked for review.',
        gapOrClarification: 'Formal federal supervisory credit requires documentation of official performance rating responsibility.'
      },
      {
        id: 'tr-req-3',
        text: 'Experience preparing formal briefing binders, testimony, or responses to congressional inquiries and GAO audits.',
        category: 'Experience',
        source: 'USAJOBS Duties Section',
        importance: 'mandatory',
        assessment: 'issue',
        linkedEvidenceIds: ['ev-17'],
        explanation: 'No verified evidence of congressional testimony or GAO audit response preparation found in your profile.',
        gapOrClarification: 'This is a mandatory requirement. You will need to document any past legislative liaison or oversight work.'
      },
      {
        id: 'tr-req-4',
        text: 'Advanced degree in Public Administration, Public Policy, Business, or Finance.',
        category: 'Education',
        source: 'USAJOBS Education Substitution',
        importance: 'preferred',
        assessment: 'good',
        linkedEvidenceIds: ['ev-3'],
        explanation: 'Verified Master of Public Administration (MPA) degree directly satisfies this criteria.'
      },
      {
        id: 'tr-req-5',
        text: 'Active Secret Security Clearance.',
        category: 'Security Clearance',
        source: 'USAJOBS Conditions of Employment',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-6'],
        explanation: 'Verified Active DoD Secret Clearance on record.'
      }
    ],
    requiredDocuments: [
      'Federal Resume with exact hours and equivalent grades',
      'SF-50 Notice of Personnel Action showing current or highest permanent GS grade',
      'Most recent annual performance appraisal',
      'Master’s degree transcript'
    ],
    whoMayApply: 'Current permanent federal competitive service employees, former federal employees with reinstatement eligibility, and eligible Veterans under VEOA.',
    applicationInstructions: 'Apply via USAJOBS with all required federal documentation attached prior to 11:59 PM ET.',
    matchStatus: 'gaps',
    matchReasonSummary: 'Strong general policy and quantitative credentials, but gaps identified regarding 52 weeks at GS-13 level and direct congressional hearing preparation.',
    analyzedAt: '2026-10-03'
  },
  {
    id: 'dhs-2210-gs13',
    announcementNumber: 'DHS-CISA-26-90412-DH',
    title: 'IT Specialist (INFOSEC / Policy)',
    agency: 'Department of Homeland Security',
    department: 'Cybersecurity and Infrastructure Security Agency (CISA)',
    grade: 'GS-13',
    series: '2210 Information Technology Management',
    location: 'Arlington, Virginia',
    isRemote: true,
    salary: {
      min: 117962,
      max: 153354,
      rate: 'Per Year'
    },
    workSchedule: 'Full-time - Permanent',
    hiringPath: ['Open to the public', 'Direct Hire Authority'],
    securityClearance: 'Top Secret / SCI Eligible',
    openingDate: '2026-09-15',
    closingDate: '2026-10-25',
    status: 'open',
    announcementVersion: 'Version 1.0 (Direct Hire)',
    officialUrl: 'https://www.usajobs.gov/job/mock-dhs-2210-gs13',
    summary: 'CISA is seeking an IT Specialist to advise on national critical infrastructure cyber governance, federal cybersecurity maturity metrics, and cross-sector incident response coordination.',
    duties: [
      'Evaluate federal civilian executive branch (FCEB) agency compliance with Binding Operational Directives.',
      'Architect risk frameworks aligning NIST SP 800-53 with operational technology domains.',
      'Collaborate with private sector critical infrastructure owners to synthesize threat telemetry.'
    ],
    requirements: [
      {
        id: 'dhs-req-1',
        text: 'Demonstrated experience interpreting and implementing NIST Risk Management Framework (RMF) or FISMA guidelines.',
        category: 'Skills',
        source: 'USAJOBS Qualifications Section',
        importance: 'mandatory',
        assessment: 'info',
        linkedEvidenceIds: ['ev-5'],
        explanation: 'Your profile documents general risk assessment and internal control reviews, but specific NIST/FISMA compliance experience is unverified.',
        gapOrClarification: 'Clarify whether your compliance reviews at Apex involved NIST 800-53 or federal cyber standards.'
      },
      {
        id: 'dhs-req-2',
        text: 'Industry cybersecurity credential such as CISSP, CISM, or Security+.',
        category: 'Certification',
        source: 'USAJOBS Selective Placement Factor',
        importance: 'selective',
        assessment: 'info',
        linkedEvidenceIds: ['ev-14'],
        explanation: 'Your profile includes a self-reported CISSP bootcamp entry that is currently flagged for review.',
        gapOrClarification: 'Upload official CISSP certification number and expiration date to verify.'
      },
      {
        id: 'dhs-req-3',
        text: 'Eligibility for Top Secret / Sensitive Compartmented Information (TS/SCI) clearance.',
        category: 'Security Clearance',
        source: 'USAJOBS Conditions of Employment',
        importance: 'mandatory',
        assessment: 'info',
        linkedEvidenceIds: ['ev-6'],
        explanation: 'You hold an active Secret clearance. Upgrading to TS/SCI requires passing a Tier 5 background investigation.',
        gapOrClarification: 'Confirmed Secret clearance is a solid foundation, but agency must sponsor Tier 5 upgrade.'
      },
      {
        id: 'dhs-req-4',
        text: 'Data synthesis and quantitative technical reporting capabilities.',
        category: 'Skills',
        source: 'USAJOBS KSAs',
        importance: 'preferred',
        assessment: 'good',
        linkedEvidenceIds: ['ev-4', 'ev-11'],
        explanation: 'Verified background with SQL, Python, and Tableau for telemetry analysis directly satisfies this item.'
      }
    ],
    requiredDocuments: [
      'Resume',
      'Cybersecurity certifications / exam score transcripts',
      'DD-214 (if claiming Veterans Preference)'
    ],
    whoMayApply: 'Open to all U.S. citizens through Direct Hire Authority. Veterans’ preference rules do not apply under Direct Hire, but veterans are encouraged to apply.',
    applicationInstructions: 'Submit electronic application on USAJOBS. Direct Hire selections may occur on a rolling basis.',
    matchStatus: 'info',
    matchReasonSummary: 'Strong analytical and programming background; further information needed regarding specific NIST RMF cybersecurity frameworks and CISSP certification completion.',
    analyzedAt: '2026-10-01'
  },
  {
    id: 'gsa-1102-gs12',
    announcementNumber: 'GSA-FAS-26-4410-DE',
    title: 'Contract Specialist',
    agency: 'General Services Administration',
    department: 'Federal Acquisition Service',
    grade: 'GS-12',
    series: '1102 Contracting',
    location: 'Washington, District of Columbia',
    isRemote: true,
    salary: {
      min: 99200,
      max: 128956,
      rate: 'Per Year'
    },
    workSchedule: 'Full-time - Permanent',
    hiringPath: ['Open to the public', 'Veterans'],
    securityClearance: 'Public Trust',
    openingDate: '2026-09-20',
    closingDate: '2026-10-10',
    status: 'expiring',
    announcementVersion: 'Version 1.2 (Closing soon)',
    officialUrl: 'https://www.usajobs.gov/job/mock-gsa-1102-gs12',
    summary: 'Administers pre-award and post-award contracting functions for major government-wide IT and professional services schedules under the Federal Acquisition Regulation (FAR).',
    duties: [
      'Solicit, negotiate, award, and administer complex commercial and non-commercial contracts.',
      'Conduct price and cost analyses on contractor proposals.',
      'Ensure strict contractor adherence to terms, deliverable milestones, and billing rules.'
    ],
    requirements: [
      {
        id: 'gsa-req-1',
        text: 'Experience managing procurement activities and drafting statements of work under FAR.',
        category: 'Experience',
        source: 'USAJOBS Specialized Experience',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-2'],
        explanation: 'Documented oversight of $3.2M procurement actions under federal guidelines on Resume Page 2.'
      },
      {
        id: 'gsa-req-2',
        text: 'FAC-C Level II or DAWIA Level II certification or proof of completing mandatory contracting curriculum.',
        category: 'Certification',
        source: 'USAJOBS Mandatory Selective Placement Factor',
        importance: 'mandatory',
        assessment: 'issue',
        linkedEvidenceIds: ['ev-16'],
        explanation: 'No verified FAC-C Level II certification on record in your profile.',
        gapOrClarification: 'This is a strict selective placement factor for GS-1102-12 at GSA. Applicants without the certification or qualifying course equivalencies are disqualified.'
      },
      {
        id: 'gsa-req-3',
        text: 'Bachelor’s degree from an accredited 4-year educational institution.',
        category: 'Education',
        source: 'USAJOBS Basic Requirement',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-3'],
        explanation: 'Verified BA and MPA degrees on record.'
      }
    ],
    requiredDocuments: [
      'Resume',
      'FAC-C or DAWIA Certificate',
      'Transcripts with 24 semester hours of business coursework'
    ],
    whoMayApply: 'Open to all U.S. citizens.',
    applicationInstructions: 'Submit on USAJOBS. Mandatory selective factor certificate must be attached.',
    matchStatus: 'issue',
    matchReasonSummary: 'Strong procurement management experience, but missing the mandatory FAC-C Level II certification selective placement factor required for this grade.',
    analyzedAt: '2026-10-02'
  },
  {
    id: 'epa-0301-gs13',
    announcementNumber: 'EPA-R3-26-7714-DE',
    title: 'Interagency Operations & Program Specialist',
    agency: 'Environmental Protection Agency',
    department: 'Office of the Regional Administrator',
    grade: 'GS-13',
    series: '0301 Miscellaneous Administration and Program',
    location: 'Philadelphia, Pennsylvania',
    isRemote: true,
    salary: {
      min: 117962,
      max: 153354,
      rate: 'Per Year'
    },
    workSchedule: 'Full-time - Permanent',
    hiringPath: ['Open to the public', 'Veterans'],
    securityClearance: 'Public Trust',
    openingDate: '2026-08-15',
    closingDate: '2026-09-15',
    status: 'closed',
    announcementVersion: 'Version 1.0 (Archived)',
    officialUrl: 'https://www.usajobs.gov/job/mock-epa-0301-gs13',
    summary: 'Coordinate intergovernmental resilience initiatives across Mid-Atlantic state environmental authorities and federal partners.',
    duties: [
      'Coordinate regional environmental partnership initiatives.',
      'Prepare quarterly executive reviews for regional administrator.'
    ],
    requirements: [
      {
        id: 'epa-req-1',
        text: 'Experience coordinating interagency stakeholders across state and federal jurisdictions.',
        category: 'Experience',
        source: 'USAJOBS Specialized Experience',
        importance: 'mandatory',
        assessment: 'good',
        linkedEvidenceIds: ['ev-8'],
        explanation: 'Verified experience coordinating 5 state agencies on LinkedIn Export.'
      }
    ],
    requiredDocuments: ['Resume', 'Transcripts'],
    whoMayApply: 'U.S. Citizens',
    applicationInstructions: 'Closed. No longer accepting applications.',
    matchStatus: 'good',
    matchReasonSummary: 'Strong verified match on stakeholder coordination and interagency briefings.',
    analyzedAt: '2026-09-01'
  }
];

export const initialApplications: ApplicationRecord[] = [
  {
    id: 'app-1',
    jobId: 'va-0343-gs12',
    jobTitle: 'Program Analyst',
    agency: 'Department of Veterans Affairs',
    grade: 'GS-12',
    announcementNumber: 'VHA-26-1249821-DE',
    applicationDate: '2026-09-29',
    closingDate: '2026-10-18',
    status: 'Under Review',
    nextAction: 'Monitor HR specialist referral notification in USAJOBS portal.',
    documentsSubmitted: [
      'Federal Resume (Vance_Morgan_2026.pdf)',
      'Official Transcript — George Washington University (MPA)',
      'DD-214 Member 4 Copy',
      'PMP Credential Verification'
    ],
    notes: 'Submitted via USAJOBS with 4-page tailored federal resume emphasizing grant modernization and $3.2M procurement.',
    timeline: [
      {
        date: '2026-09-29 14:22',
        title: 'Application Submitted on USAJOBS',
        description: 'Successfully received by Department of Veterans Affairs HR system.'
      },
      {
        date: '2026-09-30 09:10',
        title: 'Initial Intake Verification Passed',
        description: 'Basic qualification filters met; application routed to staffing specialist.'
      }
    ]
  },
  {
    id: 'app-2',
    jobId: 'dhs-2210-gs13',
    jobTitle: 'IT Specialist (INFOSEC / Policy)',
    agency: 'Department of Homeland Security',
    grade: 'GS-13',
    announcementNumber: 'DHS-CISA-26-90412-DH',
    applicationDate: '2026-09-26',
    closingDate: '2026-10-25',
    status: 'Applied',
    nextAction: 'Prepare NIST 800-53 evidence documentation for potential hiring manager panel.',
    documentsSubmitted: [
      'Federal Resume — IT Emphasis',
      'SF-50 Clearance Memo'
    ],
    notes: 'Direct Hire application submitted. Highlighted Python data pipelines and compliance reviews.',
    timeline: [
      {
        date: '2026-09-26 18:45',
        title: 'Direct Hire Package Uploaded',
        description: 'Transmitted to CISA human capital talent portal.'
      }
    ]
  },
  {
    id: 'app-3',
    jobId: 'epa-0301-gs13',
    jobTitle: 'Interagency Operations & Program Specialist',
    agency: 'Environmental Protection Agency',
    grade: 'GS-13',
    announcementNumber: 'EPA-R3-26-7714-DE',
    applicationDate: '2026-08-20',
    closingDate: '2026-09-15',
    status: 'Interview',
    nextAction: 'Panel interview completed Oct 1. Awaiting selection decision.',
    documentsSubmitted: ['Resume', 'Transcripts', 'DD-214'],
    notes: 'Completed 45-minute panel interview with Regional Deputy Director.',
    timeline: [
      {
        date: '2026-08-20',
        title: 'Application Submitted',
        description: 'Submitted on USAJOBS.'
      },
      {
        date: '2026-09-18',
        title: 'Referred to Selecting Official',
        description: 'HR categorized as Best Qualified category.'
      },
      {
        date: '2026-10-01',
        title: 'First Round Interview Conducted',
        description: 'Panel of 3 branch chiefs.'
      }
    ]
  }
];

export const initialAlerts: JobAlert[] = [
  {
    id: 'alt-1',
    jobId: 'va-0343-gs12',
    jobTitle: 'Program Analyst',
    agency: 'Department of Veterans Affairs',
    grade: 'GS-12',
    location: 'Remote / Washington, DC',
    matchStatus: 'good',
    why: 'Your experience matches 5 of 5 major requirements including procurement and cross-functional leadership.',
    date: '2026-10-02',
    isRead: false,
    isSaved: true
  },
  {
    id: 'alt-2',
    jobId: 'treasury-0343-gs14',
    jobTitle: 'Senior Management & Program Analyst',
    agency: 'Department of the Treasury',
    grade: 'GS-14',
    location: 'Washington, DC',
    matchStatus: 'gaps',
    why: 'Matches public administration credentials and budget oversight, but requires verification of GS-13 specialized time-in-grade.',
    date: '2026-10-02',
    isRead: false,
    isSaved: false
  },
  {
    id: 'alt-3',
    jobId: 'dhs-2210-gs13',
    jobTitle: 'IT Specialist (INFOSEC / Policy)',
    agency: 'Department of Homeland Security',
    grade: 'GS-13',
    location: 'Arlington, VA (Remote)',
    matchStatus: 'info',
    why: 'New Direct Hire opening matching your data synthesis skills. Verification of cybersecurity credential recommended.',
    date: '2026-10-01',
    isRead: true,
    isSaved: true
  }
];
