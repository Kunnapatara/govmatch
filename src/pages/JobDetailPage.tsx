import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  ArrowRight,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface JobDetailPageProps {
  jobId: string;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId }) => {
  const { jobs, savedJobIds, toggleSaveJob, navigate, openBillingModal, isJobAnalysisUnlocked } = useApp();

  const job = jobs.find(j => j.id === jobId) || jobs[0];
  const isSaved = savedJobIds.includes(job.id);
  const isUnlocked = isJobAnalysisUnlocked(job.id);

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/discover')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Discover</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge type="match" status={job.matchStatus} size="md" />
              <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                {job.grade}
              </span>
              <span className="text-xs text-stone-600 font-medium">
                {job.series}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {job.title}
            </h1>

            <p className="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-stone-400" />
              <span>{job.agency}</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500 font-normal">{job.department}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700'
              }`}
              title={isSaved ? 'Job Saved' : 'Save Job'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-orange-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Official Source Banner */}
        <OfficialSourceBanner job={job} />

        {/* Primary Action Bar */}
        <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-orange-950 font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Federal Requirement & Evidence Analysis</span>
            </div>
            <p className="text-stone-600 text-xs">
              {isUnlocked
                ? 'Your full requirement mapping and eligibility assessment is unlocked.'
                : 'Examine each specialized experience line mapped against your verified evidence.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/jobs/${job.id}/analysis`)}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>{isUnlocked ? 'View Analysis' : 'Analyze This Job'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={job.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                e.preventDefault();
                alert(`Directing to official USAJOBS application portal for announcement ${job.announcementNumber}.`);
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Apply on USAJOBS</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>
        </div>

        {/* Key Job Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5 font-medium">Salary Range</span>
            <span className="font-bold text-stone-900 font-mono text-sm">
              ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
            </span>
            <span className="text-[10px] text-stone-500 block">{job.salary.rate}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5 font-medium">Location</span>
            <span className="font-bold text-stone-900 block truncate">{job.location}</span>
            <span className="text-[10px] text-emerald-800 font-semibold">
              {job.isRemote ? 'Remote Available' : 'On-Site / Hybrid'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5 font-medium">Work Schedule</span>
            <span className="font-bold text-stone-900 block">{job.workSchedule}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5 font-medium">Security Clearance</span>
            <span className="font-bold text-stone-900 block">{job.securityClearance}</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Announcement Summary</h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          {job.summary}
        </p>
      </section>

      {/* Major Duties Section */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Major Duties</h2>
        <ul className="space-y-2 text-xs sm:text-sm text-stone-700 list-disc list-inside">
          {job.duties.map((duty, idx) => (
            <li key={idx} className="leading-relaxed">{duty}</li>
          ))}
        </ul>
      </section>

      {/* Official Requirements Breakdown Preview */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Qualifications & Requirements</h2>
            <p className="text-xs text-stone-500">
              Extracted from official USAJOBS announcement.
            </p>
          </div>
          <button
            onClick={() => navigate(`/jobs/${job.id}/analysis`)}
            className="text-xs font-semibold text-orange-600 hover:underline cursor-pointer"
          >
            View Evidence Mapping →
          </button>
        </div>

        <div className="space-y-3">
          {job.requirements.map(req => (
            <div
              key={req.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-stone-700 bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px]">
                  {req.category}
                </span>
                <StatusBadge type="match" status={req.assessment} size="sm" />
              </div>
              <p className="text-stone-900 font-medium text-xs sm:text-sm leading-relaxed">
                {req.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents & Who May Apply */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-600" />
            <span>Required Documents</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-700">
            {job.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-2xs space-y-3">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-orange-600" />
            <span>Who May Apply</span>
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            {job.whoMayApply}
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Hiring Paths Included
            </span>
            <div className="flex flex-wrap gap-1.5">
              {job.hiringPath.map((path, idx) => (
                <span key={idx} className="px-2 py-1 bg-stone-100 rounded-md text-[11px] font-medium text-stone-800">
                  {path}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
