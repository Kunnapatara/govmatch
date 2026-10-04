import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  Compass,
  Search,
  Filter,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  X,
  MapPin,
  Building2,
  DollarSign,
  Calendar
} from 'lucide-react';

export const DiscoverJobsPage: React.FC = () => {
  const { jobs, savedJobIds, toggleSaveJob, navigate } = useApp();

  // Search & Filter State
  const [keyword, setKeyword] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedClearance, setSelectedClearance] = useState('all');
  const [selectedHiringPath, setSelectedHiringPath] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // List of agencies and options
  const agencies = Array.from(new Set(jobs.map(j => j.agency)));
  const grades = ['GS-11', 'GS-12', 'GS-13', 'GS-14'];
  const seriesList = ['0343', '1102', '2210', '0301'];

  const filteredJobs = jobs.filter(job => {
    if (keyword) {
      const q = keyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchAgency = job.agency.toLowerCase().includes(q);
      const matchSummary = job.summary.toLowerCase().includes(q);
      const matchAnnouncement = job.announcementNumber.toLowerCase().includes(q);
      if (!matchTitle && !matchAgency && !matchSummary && !matchAnnouncement) return false;
    }
    if (selectedAgency !== 'all' && job.agency !== selectedAgency) return false;
    if (selectedGrade !== 'all' && job.grade !== selectedGrade) return false;
    if (selectedSeries !== 'all' && !job.series.startsWith(selectedSeries)) return false;
    if (remoteOnly && !job.isRemote) return false;
    if (selectedClearance !== 'all' && !job.securityClearance.includes(selectedClearance)) return false;
    if (selectedHiringPath !== 'all' && !job.hiringPath.includes(selectedHiringPath)) return false;

    return true;
  });

  const resetFilters = () => {
    setKeyword('');
    setSelectedAgency('all');
    setSelectedGrade('all');
    setSelectedSeries('all');
    setRemoteOnly(false);
    setSelectedClearance('all');
    setSelectedHiringPath('all');
  };

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            <span>USAJOBS Intelligence Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Discover Federal Jobs
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Live vacancies with instant requirement alignment against your verified evidence vault.
          </p>
        </div>

        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden px-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-stone-600" />
          <span>Filters ({[selectedAgency !== 'all', selectedGrade !== 'all', remoteOnly].filter(Boolean).length})</span>
        </button>
      </div>

      {/* Main Layout: Filters sidebar + Job Card Stream */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Filters Sidebar (4 cols on desktop) */}
        <aside
          className={`md:col-span-4 bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5 h-fit ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-600" />
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Refine Search</h2>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-orange-600 hover:underline font-semibold cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">Keyword / Announcement #</label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Title, series, or skills..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Agency Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">Federal Agency</label>
            <select
              value={selectedAgency}
              onChange={e => setSelectedAgency(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Federal Agencies</option>
              {agencies.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Pay Grade Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">Pay Grade</label>
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All GS Grades</option>
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Series Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">Job Series</label>
            <select
              value={selectedSeries}
              onChange={e => setSelectedSeries(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Series</option>
              <option value="0343">0343 — Management & Program Analysis</option>
              <option value="1102">1102 — Contracting</option>
              <option value="2210">2210 — IT Management & Cybersecurity</option>
              <option value="0301">0301 — General Administration</option>
            </select>
          </div>

          {/* Remote Toggle */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-800 block">Remote Opportunities</span>
              <span className="text-[11px] text-stone-500">Telework / 100% Remote</span>
            </div>
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={e => setRemoteOnly(e.target.checked)}
              className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
            />
          </div>

          {/* Security Clearance */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-700">Clearance Requirement</label>
            <select
              value={selectedClearance}
              onChange={e => setSelectedClearance(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Any Clearance</option>
              <option value="Public Trust">Public Trust</option>
              <option value="Secret">Secret</option>
              <option value="Top Secret">Top Secret</option>
            </select>
          </div>

          {/* Hiring Path */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-700">Hiring Path</label>
            <select
              value={selectedHiringPath}
              onChange={e => setSelectedHiringPath(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Hiring Paths</option>
              <option value="Open to the public">Open to the public</option>
              <option value="Veterans">Veterans</option>
              <option value="Federal employees">Federal employees</option>
              <option value="Direct Hire Authority">Direct Hire Authority</option>
            </select>
          </div>
        </aside>

        {/* Job Cards Stream (8 cols on desktop) */}
        <main className="md:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-semibold text-stone-500">
              Showing <span className="font-bold text-stone-900">{filteredJobs.length}</span> federal announcements
            </p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3">
              <p className="text-sm font-bold text-stone-800">No federal jobs match these filters.</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your grade filter or clearing the agency restriction.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isSaved = savedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  className="bg-white border border-stone-200/90 hover:border-stone-300 rounded-3xl p-5 sm:p-6 shadow-2xs transition-all space-y-4"
                >
                  {/* Top Bar: Title & Save button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge type="match" status={job.matchStatus} size="sm" />
                        <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                          {job.grade}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          Series {job.series.split(' ')[0]}
                        </span>
                        {job.isRemote && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Remote Eligible
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="text-base sm:text-lg font-bold text-stone-900 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        {job.title}
                      </h3>

                      <p className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-stone-400" />
                        <span>{job.agency}</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-stone-500">{job.location}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                        isSaved
                          ? 'bg-orange-50 border-orange-200 text-orange-600'
                          : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700'
                      }`}
                      title={isSaved ? 'Job Saved' : 'Save Job'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-600' : ''}`} />
                    </button>
                  </div>

                  {/* Summary & Key Meta */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 px-3 bg-stone-50/70 border border-stone-200/60 rounded-2xl text-[11px] text-stone-600">
                    <div>
                      <span className="text-stone-400 block">Salary</span>
                      <strong className="text-stone-800 font-medium font-mono">
                        ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Closing Date</span>
                      <strong className="text-stone-800 font-medium">{job.closingDate}</strong>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-stone-400 block">Clearance</span>
                      <strong className="text-stone-800 font-medium">{job.securityClearance}</strong>
                    </div>
                  </div>

                  {/* Official Source Banner Component */}
                  <OfficialSourceBanner job={job} compact />

                  {/* Bottom Action Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-100">
                    <span className="text-[11px] text-stone-500">
                      Matched to your profile: <strong className="text-stone-700">{job.matchReasonSummary.slice(0, 60)}...</strong>
                    </span>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer"
                      >
                        Full Details
                      </button>
                      <button
                        onClick={() => navigate(`/jobs/${job.id}/analysis`)}
                        className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Analyze Match</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
};
