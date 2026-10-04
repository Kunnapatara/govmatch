import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  Bookmark,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Search,
  Trash2
} from 'lucide-react';

export const SavedJobsPage: React.FC = () => {
  const { jobs, savedJobIds, toggleSaveJob, navigate } = useApp();

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-orange-600" />
            <span>Candidate Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Saved Federal Jobs
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Tracked vacancy announcements and eligibility analyses. Closed jobs are permanently retained for your career records.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-xl border border-stone-200 self-start sm:self-auto">
          {savedJobs.length} Saved Opportunities
        </span>
      </div>

      {/* Empty State */}
      {savedJobs.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">No saved jobs yet</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Jobs you save will appear here. Save vacancies to monitor requirement match shifts or track application deadlines.
            </p>
          </div>
          <button
            onClick={() => navigate('/discover')}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Discover Federal Jobs</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map(job => {
            const isClosed = job.status === 'closed';

            return (
              <div
                key={job.id}
                className={`bg-white border rounded-3xl p-5 sm:p-6 shadow-2xs transition-all space-y-4 flex flex-col justify-between ${
                  isClosed ? 'border-stone-300 opacity-80' : 'border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge type="match" status={job.matchStatus} size="sm" />
                        <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                          {job.grade}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          {job.series.split(' ')[0]}
                        </span>
                      </div>
                      <h3
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="text-base sm:text-lg font-bold text-stone-900 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        {job.title}
                      </h3>
                      <p className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-stone-400" />
                        <span>{job.agency}</span>
                        <span className="text-stone-300">•</span>
                        <span>{job.location}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Remove from saved jobs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Closed Banner if announcement closed */}
                  {isClosed ? (
                    <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                      <div>
                        <span className="font-bold text-stone-900">Closed — Applications are no longer accepted.</span>
                        <p className="text-[11px] text-stone-500">Announcement closed on {job.closingDate}. Kept for historical reference.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
                      <span>Closing Date: <strong className="text-stone-800">{job.closingDate}</strong></span>
                      <span>Salary: <strong className="text-stone-800 font-mono">${job.salary.min.toLocaleString()}</strong></span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="text-xs text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => navigate(`/jobs/${job.id}/analysis`)}
                    className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
