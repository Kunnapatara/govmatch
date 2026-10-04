import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import {
  Bell,
  Check,
  Bookmark,
  Trash2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertRead, dismissAlert, toggleSaveJob, savedJobIds, navigate } = useApp();

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold mb-2">
            <Bell className="w-3.5 h-3.5 text-orange-600" />
            <span>Opportunity Notifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Job Match Alerts
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Real-time notifications when new federal openings match your verified experience and target grades.
          </p>
        </div>

        {unreadCount > 0 && (
          <span className="px-3.5 py-1.5 bg-orange-100 text-orange-900 border border-orange-200 rounded-xl text-xs font-bold self-start sm:self-auto">
            {unreadCount} Unread Match Alerts
          </span>
        )}
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">No active job alerts</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              New jobs matching your profile will appear here. When new vacancies are published on USAJOBS matching your evidence, we'll notify you.
            </p>
          </div>
          <button
            onClick={() => navigate('/discover')}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Explore Open Vacancies
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => {
            const isSaved = savedJobIds.includes(alert.jobId);

            return (
              <div
                key={alert.id}
                className={`bg-white border rounded-3xl p-5 sm:p-6 shadow-2xs transition-all space-y-4 ${
                  !alert.isRead
                    ? 'border-orange-200 ring-2 ring-orange-100'
                    : 'border-stone-200/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        New Match Alert
                      </span>
                      <span className="text-xs font-mono text-stone-400">•</span>
                      <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                        {alert.grade}
                      </span>
                      <span className="text-xs text-stone-500">
                        {alert.date}
                      </span>
                    </div>

                    <h3
                      onClick={() => {
                        markAlertRead(alert.id);
                        navigate(`/jobs/${alert.jobId}`);
                      }}
                      className="text-base sm:text-lg font-bold text-stone-900 hover:text-orange-600 cursor-pointer transition-colors"
                    >
                      {alert.jobTitle}
                    </h3>

                    <p className="text-xs text-stone-600 flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      <span>{alert.agency}</span>
                      <span className="text-stone-300">•</span>
                      <span>{alert.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start">
                    <StatusBadge type="match" status={alert.matchStatus} size="sm" />
                  </div>
                </div>

                {/* Why it matched */}
                <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 text-xs text-stone-700 space-y-1">
                  <span className="font-bold text-stone-900 block">Why it matched:</span>
                  <p className="text-stone-700 leading-relaxed">{alert.why}</p>
                </div>

                {/* Actions: Mark read, Save, Open job, Dismiss */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    {!alert.isRead && (
                      <button
                        onClick={() => markAlertRead(alert.id)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 text-stone-500" />
                        <span>Mark Read</span>
                      </button>
                    )}

                    <button
                      onClick={() => toggleSaveJob(alert.jobId)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isSaved
                          ? 'bg-orange-50 border border-orange-200 text-orange-700 font-semibold'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-orange-600 text-orange-600' : 'text-stone-500'}`} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      markAlertRead(alert.id);
                      navigate(`/jobs/${alert.jobId}/analysis`);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Analyze Match</span>
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
