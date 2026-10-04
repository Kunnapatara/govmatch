import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { EligibilityStatus } from '../types';

interface EligibilityPageProps {
  jobId: string;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ jobId }) => {
  const { jobs, profile, navigate } = useApp();
  const job = jobs.find(j => j.id === jobId) || jobs[0];

  // Specific eligibility condition assessments
  const eligibilityConditions: {
    title: string;
    category: string;
    status: EligibilityStatus;
    requirementText: string;
    candidateEvidenceText: string;
    guidance: string;
  }[] = [
    {
      title: 'Time-in-Grade & Grade Equivalency',
      category: 'OPM Classification Standard',
      status: job.grade === 'GS-14' ? 'needs_review' : 'looks_good',
      requirementText: `Requires 52 weeks of specialized experience equivalent to at least the next lower grade level (${job.grade === 'GS-14' ? 'GS-13' : 'GS-11'}).`,
      candidateEvidenceText: job.grade === 'GS-14'
        ? 'Your profile documents 4+ years at GS-12 equivalent, but documentation of 52 weeks at the GS-13 level requires clarification.'
        : 'Your profile documents over 2 years at the GS-11 equivalent level at Beacon Advisory and Apex Solutions (40 hrs/week).',
      guidance: job.grade === 'GS-14'
        ? 'Review past contracts to verify if duties matched GS-13 complexity.'
        : 'Looks Good based on the information currently available.'
    },
    {
      title: 'Citizenship Requirement',
      category: 'Statutory Eligibility',
      status: 'looks_good',
      requirementText: 'Must be a U.S. citizen or national.',
      candidateEvidenceText: `Confirmed citizenship: ${profile.citizenship}.`,
      guidance: 'Looks Good based on the information currently available.'
    },
    {
      title: 'Security Clearance Adjudication',
      category: 'Condition of Employment',
      status: job.securityClearance.includes('Top Secret') ? 'need_info' : 'looks_good',
      requirementText: `Must possess or be eligible for ${job.securityClearance} clearance.`,
      candidateEvidenceText: `You hold an Active Secret clearance (DoD 2023 reciprocity).`,
      guidance: job.securityClearance.includes('Top Secret')
        ? 'Upgrading from Secret to Top Secret / SCI requires agency sponsorship of a Tier 5 background investigation.'
        : 'Looks Good based on active clearance documentation.'
    },
    {
      title: 'Hiring Path / Selective Authority',
      category: 'Hiring Authority',
      status: job.hiringPath.includes('Open to the public') ? 'looks_good' : 'needs_review',
      requirementText: `Announcement open to: ${job.hiringPath.join(', ')}.`,
      candidateEvidenceText: job.hiringPath.includes('Open to the public')
        ? 'Position is open to all U.S. citizens in the competitive service.'
        : 'Position restricted to current federal employees or eligible veterans under VEOA / VRA.',
      guidance: job.hiringPath.includes('Open to the public')
        ? 'Looks Good. Public competition applies.'
        : 'Confirm whether your DD-214 or former SF-50 satisfies the non-competitive appointing authority.'
    },
    {
      title: 'Education or Coursework Substitution',
      category: 'Basic Qualification',
      status: 'looks_good',
      requirementText: 'Graduate degree substitution or business credit hour requirement.',
      candidateEvidenceText: 'Master of Public Administration (MPA) degree on record with official transcript.',
      guidance: 'Looks Good based on accredited degree records.'
    }
  ];

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/jobs/${job.id}/analysis`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Match Analysis</span>
        </button>

        {/* Sub-page Nav */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => navigate(`/jobs/${job.id}/analysis`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Analysis
          </button>
          <span className="bg-white text-stone-900 px-3 py-1 rounded-lg font-bold shadow-2xs">
            Eligibility
          </span>
          <button
            onClick={() => navigate(`/jobs/${job.id}/readiness`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Readiness
          </button>
          <button
            onClick={() => navigate(`/jobs/${job.id}/application-prep`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Prep
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5 text-orange-600" />
              <span>OPM Qualifications Audit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Eligibility Assessment
            </h1>
            <p className="text-sm font-semibold text-stone-800 mt-1">
              {job.title} — {job.grade} ({job.agency})
            </p>
          </div>

          <div className="text-right self-start sm:self-auto">
            <span className="text-xs font-mono text-stone-500 block">Announcement</span>
            <span className="text-xs font-mono font-bold text-stone-800">#{job.announcementNumber}</span>
          </div>
        </div>

        {/* Locked Vocabulary Reminder Callout */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">
              Official Federal Qualification Notice:
            </p>
            <p className="text-amber-800">
              GOVMATCH evaluates eligibility using objective standard vocabulary: <strong className="font-semibold">Looks Good</strong>, <strong className="font-semibold">Needs Review</strong>, <strong className="font-semibold">Need More Info</strong>, and <strong className="font-semibold">Possible Issue</strong>. We never state "You are eligible" because final qualification determinations rest solely with the hiring agency's human resources specialist.
            </p>
            <p className="text-amber-900 font-bold pt-0.5">
              Review the official USAJOBS announcement before applying.
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility Conditions List */}
      <div className="space-y-4">
        {eligibilityConditions.map((cond, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  {cond.category}
                </span>
                <h3 className="text-base font-bold text-stone-900">{cond.title}</h3>
              </div>
              <StatusBadge type="eligibility" status={cond.status} size="md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
                <span className="font-bold text-stone-700 block">USAJOBS Announcement Criteria:</span>
                <p className="text-stone-800">{cond.requirementText}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
                <span className="font-bold text-stone-700 block">Candidate Evidence on Record:</span>
                <p className="text-stone-800">{cond.candidateEvidenceText}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50/50 border border-stone-200/50 text-xs text-stone-700">
              <span className="font-semibold text-stone-900">Analysis: </span>
              <span>{cond.guidance}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to Application Readiness */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-stone-900">Next Step: Application Readiness</h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Audit required documents, SF-50 attachments, and resume formatting checklists.
          </p>
        </div>
        <button
          onClick={() => navigate(`/jobs/${job.id}/readiness`)}
          className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Check Readiness</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
