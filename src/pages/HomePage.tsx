import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  Compass,
  ArrowRight,
  Bookmark,
  Briefcase,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  FileCheck2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { jobs, savedJobIds, toggleSaveJob, navigate, applications, evidenceItems, profile, openBillingModal } = useApp();

  const newMatches = jobs.filter(j => j.status === 'open' || j.status === 'expiring');
  const updatedJobs = jobs.filter(j => j.status === 'updated');
  const recentApplications = applications.slice(0, 3);

  // Evidence counts
  const confirmedEvidence = evidenceItems.filter(e => e.verificationStatus === 'confirmed').length;
  const reviewEvidence = evidenceItems.filter(e => e.verificationStatus === 'review').length;
  const missingEvidence = evidenceItems.filter(e => e.verificationStatus === 'missing').length;

  return (
    <div className="py-6 sm:py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Banner / Question: What should I care about today? */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>Federal Intelligence Briefing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              What should I care about today?
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Good morning, {profile.name.split(' ')[0]}. Here is how your {confirmedEvidence} confirmed evidence items map against current federal vacancy announcements.
            </p>
          </div>

          {/* Quick Match Status Tally Bar */}
          <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 flex flex-wrap items-center gap-4 sm:gap-6 self-start lg:self-auto">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-0.5">Your Matches</p>
              <p className="text-xl font-black text-stone-900">12 new federal jobs</p>
            </div>
            <div className="h-8 w-px bg-stone-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <StatusBadge type="match" status="good" size="sm" />
              <span className="text-xs font-bold text-stone-800">3</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge type="match" status="gaps" size="sm" />
              <span className="text-xs font-bold text-stone-800">5</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge type="match" status="info" size="sm" />
              <span className="text-xs font-bold text-stone-800">4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Column (New Matches & Updated Jobs), Right Column (Readiness & Recent Apps) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-8">
          {/* SECTION: NEW MATCHES */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  New Matches
                </h2>
                <p className="text-xs text-stone-500">
                  Vacancies matching your verified experience and grade preferences.
                </p>
              </div>
              <button
                onClick={() => navigate('/discover')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View all in Discover</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {newMatches.map(job => {
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white border border-stone-200/90 hover:border-stone-300 rounded-3xl p-5 sm:p-6 shadow-2xs transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <StatusBadge type="match" status={job.matchStatus} size="sm" />
                          <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                            {job.grade}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">
                            {job.series}
                          </span>
                        </div>
                        <h3
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="text-base sm:text-lg font-bold text-stone-900 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-stone-600 mt-0.5 font-medium">
                          {job.agency} • <span className="text-stone-500">{job.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start">
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-orange-50 border-orange-200 text-orange-600'
                              : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save job'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-600' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Short Match Reason */}
                    <div className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/60 text-xs text-stone-700 flex items-start gap-2.5">
                      <span className="font-semibold text-stone-900 shrink-0">Why it matches:</span>
                      <span className="text-stone-600">{job.matchReasonSummary}</span>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
                      <div className="text-[11px] text-stone-500">
                        Closes: <strong className="text-stone-700">{job.closingDate}</strong> • Version: {job.announcementVersion.split(' ')[0]}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="px-3.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Job Details
                        </button>
                        <button
                          onClick={() => navigate(`/jobs/${job.id}/analysis`)}
                          className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Analyze Match</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION: RECENTLY UPDATED JOBS */}
          {updatedJobs.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Recently Updated Announcements</span>
                </h2>
                <p className="text-xs text-stone-500">
                  Federal announcements with amendments, date extensions, or revised criteria.
                </p>
              </div>

              <div className="space-y-4">
                {updatedJobs.map(job => (
                  <div
                    key={job.id}
                    className="bg-white border-2 border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold text-[11px] rounded-md border border-amber-200 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-700" />
                            <span>⚠ Job updated</span>
                          </span>
                          <span className="text-xs font-mono text-stone-500">#{job.announcementNumber}</span>
                        </div>
                        <h3
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="text-base sm:text-lg font-bold text-stone-900 hover:text-orange-600 cursor-pointer"
                        >
                          {job.title} — {job.grade}
                        </h3>
                        <p className="text-xs text-stone-600">{job.agency}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                      <p className="font-semibold text-amber-900">What changed:</p>
                      <p className="text-amber-800">{job.updateReason}</p>
                      <p className="text-amber-700 italic pt-1 text-[11px]">
                        Your match has been automatically re-analyzed against the amended criteria.
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => navigate(`/jobs/${job.id}/analysis`)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer"
                      >
                        Review Re-Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (4 cols on desktop): Application Readiness & Recent Tracker Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* CARD: APPLICATION READINESS */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-stone-900">Application Readiness</h2>
              <StatusBadge type="readiness" status="almost_ready" size="sm" />
            </div>

            <p className="text-xs text-stone-600">
              Readiness status for your target role: <strong className="text-stone-900">Program Analyst (GS-12)</strong>.
            </p>

            {/* Checklist elements */}
            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 font-medium">Career Profile</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 font-medium">Evidence Vault</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 font-medium">Federal Resume</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 font-medium">Specialized Experience</span>
                <span className="text-amber-700 font-bold">⚠ Almost Ready</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-700 font-medium">Required Documents</span>
                <span className="text-stone-500 font-bold">○ Not Ready Yet</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/jobs/va-0343-gs12/readiness')}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Full Readiness Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD: EVIDENCE SUMMARY */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-stone-900">Evidence Vault</h2>
              <button
                onClick={() => navigate('/evidence')}
                className="text-xs text-orange-600 font-semibold hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <span className="block text-lg font-bold text-emerald-900">{confirmedEvidence}</span>
                <span className="text-[11px] font-semibold text-emerald-800">✓ Confirmed</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="block text-lg font-bold text-amber-900">{reviewEvidence}</span>
                <span className="text-[11px] font-semibold text-amber-800">⚠ Review</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-stone-100 border border-stone-200">
                <span className="block text-lg font-bold text-stone-700">{missingEvidence}</span>
                <span className="text-[11px] font-semibold text-stone-600">○ Missing</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/profile/import/resume')}
              className="w-full py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              + Import New Evidence
            </button>
          </div>

          {/* CARD: RECENT APPLICATIONS */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-stone-900">Application Tracker</h2>
              <button
                onClick={() => navigate('/applications')}
                className="text-xs text-orange-600 font-semibold hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {recentApplications.map(app => (
                <div
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="p-3 rounded-2xl bg-stone-50/70 hover:bg-stone-100 border border-stone-200/60 cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-xs text-stone-900 leading-tight">
                      {app.jobTitle}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      app.status === 'Interview'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : app.status === 'Under Review'
                        ? 'bg-sky-100 text-sky-900 border border-sky-200'
                        : 'bg-stone-200 text-stone-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {app.agency} • Applied {app.applicationDate}
                  </p>
                  <p className="text-[11px] text-stone-700 font-medium truncate">
                    Next: {app.nextAction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
