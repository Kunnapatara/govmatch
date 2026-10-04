import React from 'react';
import { ExternalLink, AlertTriangle, Clock, ShieldCheck, Info } from 'lucide-react';
import { FederalJob } from '../../types';

interface OfficialSourceBannerProps {
  job: FederalJob;
  compact?: boolean;
}

export const OfficialSourceBanner: React.FC<OfficialSourceBannerProps> = ({ job, compact = false }) => {
  return (
    <div className="space-y-2">
      {/* Official USAJOBS Notice */}
      <div className={`bg-stone-50 border border-stone-200/90 rounded-xl ${compact ? 'p-2.5 text-xs' : 'p-3.5 text-sm'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-stone-700`}>
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-stone-200/70 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div>
            <span className="font-semibold text-stone-900 mr-2">Official USAJOBS announcement:</span>
            <span className="font-mono text-stone-600 text-xs">#{job.announcementNumber}</span>
            <span className="hidden sm:inline text-stone-400 mx-2">•</span>
            <span className="text-stone-500 text-xs">{job.announcementVersion}</span>
          </div>
        </div>

        <a
          href={job.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            // Provide transparent feedback that this links to USAJOBS
            alert(`Directing to official USAJOBS listing for announcement ${job.announcementNumber} (${job.agency}).`);
          }}
          className="inline-flex items-center gap-1.5 font-medium text-orange-600 hover:text-orange-700 transition-colors text-xs whitespace-nowrap self-start sm:self-auto py-1 px-2.5 bg-white border border-stone-200 rounded-lg shadow-2xs hover:border-orange-300"
        >
          <span>View official announcement</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Lifecycle Status Notices */}
      {job.status === 'updated' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs md:text-sm text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">⚠ Job updated</span>
            <p className="text-amber-800 text-xs mt-0.5">{job.updateReason || 'The federal agency updated the duties or qualification terms for this job announcement.'}</p>
            <p className="text-amber-700 text-xs mt-1 italic">Your match has been re-analyzed against announcement {job.announcementVersion}.</p>
          </div>
        </div>
      )}

      {job.status === 'closed' && (
        <div className="bg-stone-100 border border-stone-300 rounded-xl p-3 text-xs md:text-sm text-stone-800 flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Closed — Applications are no longer accepted.</span>
            <p className="text-stone-600 text-xs mt-0.5">This announcement closed on {job.closingDate}. Kept in your records for historical reference and eligibility continuity.</p>
          </div>
        </div>
      )}

      {job.status === 'expiring' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 text-xs text-orange-900 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span><strong className="font-semibold">Closing soon:</strong> This announcement closes on {job.closingDate}. Submit on USAJOBS before 11:59 PM ET.</span>
        </div>
      )}
    </div>
  );
};
