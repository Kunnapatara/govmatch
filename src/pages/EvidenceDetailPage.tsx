import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EvidenceStatus } from '../types';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Edit3,
  ArrowLeft,
  Briefcase,
  ExternalLink,
  Info
} from 'lucide-react';

interface EvidenceDetailPageProps {
  evidenceId: string;
}

export const EvidenceDetailPage: React.FC<EvidenceDetailPageProps> = ({ evidenceId }) => {
  const { evidenceItems, updateEvidenceStatus, updateEvidenceStatement, removeEvidence, jobs, navigate } = useApp();
  
  const item = evidenceItems.find(e => e.id === evidenceId) || evidenceItems[0];
  const [isEditing, setIsEditing] = useState(false);
  const [statementText, setStatementText] = useState(item?.statement || '');
  const [notesText, setNotesText] = useState(item?.notes || '');

  if (!item) {
    return (
      <div className="py-12 max-w-lg mx-auto text-center space-y-4">
        <p className="text-stone-700 font-bold">Evidence record not found.</p>
        <button
          onClick={() => navigate('/evidence')}
          className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs"
        >
          Return to Evidence Vault
        </button>
      </div>
    );
  }

  // Find related federal jobs that require this evidence
  const relatedJobs = jobs.filter(job =>
    job.requirements.some(req => req.linkedEvidenceIds.includes(item.id))
  );

  const handleSaveEdit = () => {
    updateEvidenceStatement(item.id, statementText, notesText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to remove this evidence record? Linked federal requirement matches will revert to "Need More Info".')) {
      removeEvidence(item.id);
      navigate('/evidence');
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/evidence')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Evidence Vault</span>
      </button>

      {/* Main Evidence Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
              {item.category}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500">ID: {item.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge type="evidence" status={item.verificationStatus} size="md" />
          </div>
        </div>

        {/* Statement Content */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Evidence Statement
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Statement</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                rows={3}
                value={statementText}
                onChange={e => setStatementText(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 bg-white"
              />
              <div>
                <label className="text-xs text-stone-600 block mb-1">Verification Notes</label>
                <input
                  type="text"
                  value={notesText}
                  onChange={e => setNotesText(e.target.value)}
                  className="w-full p-2 text-xs border border-stone-300 rounded-xl bg-white"
                />
              </div>
            </div>
          ) : (
            <p className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed bg-stone-50/70 border border-stone-200/60 p-4 sm:p-5 rounded-2xl">
              "{item.statement}"
            </p>
          )}
        </div>

        {/* Provenance & Source Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Primary Source</span>
            <span className="font-bold text-stone-900">{item.source}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Source Location</span>
            <span className="font-bold text-stone-900">{item.sourceLocation}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Last Verified</span>
            <span className="font-bold text-stone-900">{item.updatedAt}</span>
          </div>
        </div>

        {/* Verification Controls: Confirm, Mark for Review, Remove */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateEvidenceStatus(item.id, 'confirmed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                item.verificationStatus === 'confirmed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm Evidence</span>
            </button>

            <button
              onClick={() => updateEvidenceStatus(item.id, 'review')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                item.verificationStatus === 'review'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Mark for Review</span>
            </button>
          </div>

          <button
            onClick={handleDelete}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Linked Federal Requirements Section */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-600" />
          <span>Linked Federal Requirements</span>
        </h3>
        <p className="text-xs text-stone-500">
          This evidence is currently mapped into the qualification logic for the following federal vacancies:
        </p>

        {relatedJobs.length === 0 ? (
          <p className="text-xs text-stone-500 italic p-4 bg-stone-50 rounded-2xl">
            This evidence statement is not currently mapped to active saved jobs. It remains available in your vault for future match queries.
          </p>
        ) : (
          <div className="space-y-3">
            {relatedJobs.map(job => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-bold text-stone-900">{job.title} — {job.grade}</p>
                  <p className="text-stone-600">{job.agency} • Announcement #{job.announcementNumber}</p>
                </div>
                <button
                  onClick={() => navigate(`/jobs/${job.id}/analysis`)}
                  className="px-3 py-1.5 bg-white border border-stone-200 hover:border-orange-300 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Match</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
