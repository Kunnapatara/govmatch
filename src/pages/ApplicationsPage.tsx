import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { ApplicationRecord } from '../types';

export const ApplicationsPage: React.FC = () => {
  const { applications, navigate } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredApps = applications.filter(app => {
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!app.jobTitle.toLowerCase().includes(q) && !app.agency.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const getStatusBadge = (status: ApplicationRecord['status']) => {
    switch (status) {
      case 'Interview':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Under Review':
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 'Offer':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Closed':
        return 'bg-stone-200 text-stone-800 border-stone-300';
      case 'Applied':
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5 text-orange-600" />
            <span>Federal Hiring Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Track referral statuses, HR specialist reviews, and interview milestones for submitted federal vacancies.
          </p>
        </div>

        <button
          onClick={() => navigate('/discover')}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Track New Vacancy</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tracked applications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'Applied', 'Under Review', 'Interview', 'Offer', 'Closed'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'all' ? 'All' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredApps.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">No applications tracked</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Applications you track will appear here. After submitting on USAJOBS, track milestones and interview panels.
            </p>
          </div>
          <button
            onClick={() => navigate('/discover')}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs cursor-pointer"
          >
            Find Federal Vacancies
          </button>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW (Section 29: Columns: Job | Agency | Date | Status | Next Action) */}
          <div className="hidden md:block bg-white border border-stone-200/90 rounded-3xl shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Job</th>
                  <th className="py-4 px-6">Agency</th>
                  <th className="py-4 px-6">Applied Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Next Action</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {filteredApps.map(app => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className="hover:bg-stone-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                      <div>
                        <span>{app.jobTitle}</span>
                        <span className="ml-2 font-mono text-[11px] font-normal text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {app.grade}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-stone-600">
                      {app.agency}
                    </td>
                    <td className="py-4 px-6 text-stone-500 font-mono">
                      {app.applicationDate}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[11px] border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-stone-700 max-w-xs truncate">
                      {app.nextAction}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-orange-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Details →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW (Section 29: Mobile should convert these to cards) */}
          <div className="md:hidden space-y-4">
            {filteredApps.map(app => (
              <div
                key={app.id}
                onClick={() => navigate(`/applications/${app.id}`)}
                className="bg-white border border-stone-200 rounded-3xl p-5 shadow-2xs space-y-3 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                      {app.grade}
                    </span>
                    <h3 className="font-bold text-base text-stone-900 mt-1">{app.jobTitle}</h3>
                    <p className="text-xs text-stone-600">{app.agency}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${getStatusBadge(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                  <div className="flex justify-between text-stone-500">
                    <span>Applied:</span>
                    <span className="font-mono text-stone-800">{app.applicationDate}</span>
                  </div>
                  <div className="text-stone-700 pt-1 border-t border-stone-200/50">
                    <span className="font-semibold text-stone-900">Next Action: </span>
                    <span>{app.nextAction}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                    <span>View Application Record</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
