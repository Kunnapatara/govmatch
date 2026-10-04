import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  ShieldCheck,
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';
import { ReadinessStatus } from '../types';

interface ApplicationReadinessPageProps {
  jobId: string;
}

export const ApplicationReadinessPage: React.FC<ApplicationReadinessPageProps> = ({ jobId }) => {
  const { jobs, profile, evidenceItems, navigate } = useApp();
  const job = jobs.find(j => j.id === jobId) || jobs[0];

  const readinessChecklist = [
    {
      title: 'Career Profile',
      status: '✓ Ready' as const,
      badgeStatus: 'ready' as ReadinessStatus,
      description: 'Profile contains complete work history, verified degree credentials, and citizenship status.',
      actionNeeded: null
    },
    {
      title: 'Evidence',
      status: '✓ Ready' as const,
      badgeStatus: 'ready' as ReadinessStatus,
      description: `${evidenceItems.filter(e => e.verificationStatus === 'confirmed').length} confirmed evidence records mapped to qualification requirements.`,
      actionNeeded: null
    },
    {
      title: 'Federal Resume',
      status: '✓ Ready' as const,
      badgeStatus: 'ready' as ReadinessStatus,
      description: 'Resume formats adhere to federal standards with weekly hours, grade equivalents, and start/end dates.',
      actionNeeded: null
    },
    {
      title: 'Specialized Experience',
      status: '⚠ Almost Ready' as const,
      badgeStatus: 'almost_ready' as ReadinessStatus,
      description: '4 of 5 specialized experience statements confirmed; 1 contractor supervisory item marked for review.',
      actionNeeded: 'Clarify supervisory responsibility on Resume Page 2.'
    },
    {
      title: 'Required Documents',
      status: '○ Not Ready Yet' as const,
      badgeStatus: 'not_ready' as ReadinessStatus,
      description: 'Transcripts and DD-214 are in repository, but agency-specific clearance memorandum is unattached.',
      actionNeeded: 'Attach SF-50 or Agency Clearance Memorandum before submitting on USAJOBS.'
    }
  ];

  const overallReadiness: ReadinessStatus = 'almost_ready';

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/jobs/${job.id}/eligibility`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Eligibility</span>
        </button>

        {/* Sub-page Nav */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => navigate(`/jobs/${job.id}/analysis`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Analysis
          </button>
          <button
            onClick={() => navigate(`/jobs/${job.id}/eligibility`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Eligibility
          </button>
          <span className="bg-white text-stone-900 px-3 py-1 rounded-lg font-bold shadow-2xs">
            Readiness
          </span>
          <button
            onClick={() => navigate(`/jobs/${job.id}/application-prep`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Prep
          </button>
        </div>
      </div>

      {/* Main Readiness Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
              <FileCheck2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Pre-Submission Audit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Application Readiness
            </h1>
            <p className="text-sm font-semibold text-stone-800 mt-1">
              {job.title} — {job.grade} ({job.agency})
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <StatusBadge type="readiness" status={overallReadiness} size="lg" />
            <p className="text-xs font-semibold text-amber-800">
              2 items need attention
            </p>
          </div>
        </div>

        {/* Readiness Checklist Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold pt-2">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="block text-emerald-700 font-bold">✓ Ready</span>
            <span className="text-[11px] text-stone-600">Career Profile</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="block text-emerald-700 font-bold">✓ Ready</span>
            <span className="text-[11px] text-stone-600">Evidence Vault</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="block text-emerald-700 font-bold">✓ Ready</span>
            <span className="text-[11px] text-stone-600">Federal Resume</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <span className="block text-amber-700 font-bold">⚠ Almost Ready</span>
            <span className="text-[11px] text-stone-600">Specialized Exp.</span>
          </div>
          <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-stone-700">
            <span className="block text-stone-500 font-bold">○ Not Ready Yet</span>
            <span className="text-[11px] text-stone-600">Documents</span>
          </div>
        </div>
      </div>

      {/* Actionable Missing Items Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900">
          Readiness Audit & Action Items
        </h2>

        <div className="space-y-3">
          {readinessChecklist.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-bold text-base text-stone-900">{item.title}</h3>
                </div>
                <StatusBadge type="readiness" status={item.badgeStatus} size="sm" />
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {item.description}
              </p>

              {item.actionNeeded && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900">Action Required: </span>
                    <span className="text-amber-800">{item.actionNeeded}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Primary Action Button: Prepare Application */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-stone-900">Next Step: Application Preparation</h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Assemble the exact evidence statements, document checklist, and final review before applying on USAJOBS.
          </p>
        </div>
        <button
          onClick={() => navigate(`/jobs/${job.id}/application-prep`)}
          className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Prepare Application</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
