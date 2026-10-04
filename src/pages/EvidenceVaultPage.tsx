import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EvidenceStatus } from '../types';
import {
  ShieldCheck,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  ExternalLink,
  Edit2
} from 'lucide-react';

export const EvidenceVaultPage: React.FC = () => {
  const { evidenceItems, updateEvidenceStatus, navigate } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | EvidenceStatus>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Summary counts
  const confirmedCount = evidenceItems.filter(e => e.verificationStatus === 'confirmed').length;
  const reviewCount = evidenceItems.filter(e => e.verificationStatus === 'review').length;
  const missingCount = evidenceItems.filter(e => e.verificationStatus === 'missing').length;

  const filteredItems = evidenceItems.filter(item => {
    if (filterStatus !== 'all' && item.verificationStatus !== filterStatus) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesStatement = item.statement.toLowerCase().includes(q);
      const matchesSource = item.sourceLocation.toLowerCase().includes(q);
      if (!matchesStatement && !matchesSource) return false;
    }
    return true;
  });

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>Verification Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Your Evidence
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Verifiable career claims extracted from your resume, SF-50, and transcripts. Ground truth for all federal job matching.
          </p>
        </div>

        {/* Summary Metric Pills: ✓ Confirmed 12 | ⚠ Review 3 | ○ Missing 2 */}
        <div className="flex flex-wrap items-center gap-2 bg-stone-50 border border-stone-200 p-2 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setFilterStatus(filterStatus === 'confirmed' ? 'all' : 'confirmed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'confirmed'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100'
            }`}
          >
            <span>✓ Confirmed</span>
            <span className="font-mono">{confirmedCount}</span>
          </button>

          <button
            onClick={() => setFilterStatus(filterStatus === 'review' ? 'all' : 'review')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'review'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
            }`}
          >
            <span>⚠ Review</span>
            <span className="font-mono">{reviewCount}</span>
          </button>

          <button
            onClick={() => setFilterStatus(filterStatus === 'missing' ? 'all' : 'missing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'missing'
                ? 'bg-stone-800 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200'
            }`}
          >
            <span>○ Missing</span>
            <span className="font-mono">{missingCount}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search evidence statements..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs border border-stone-200 rounded-xl bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Categories</option>
            <option value="Experience">Experience</option>
            <option value="Education">Education</option>
            <option value="Skills">Skills</option>
            <option value="Certification">Certification</option>
            <option value="Other">Other / Clearance</option>
          </select>

          <button
            onClick={() => navigate('/profile/import/resume')}
            className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Evidence</span>
          </button>
        </div>
      </div>

      {/* Evidence Cards List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-stone-700">No evidence statements match your current filter.</p>
          <p className="text-xs text-stone-500">
            Add evidence from your experience so GOVMATCH can explain how your background connects to federal requirements.
          </p>
          <button
            onClick={() => {
              setFilterStatus('all');
              setFilterCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white border border-stone-200/90 hover:border-stone-300 rounded-3xl p-5 shadow-2xs flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <StatusBadge type="evidence" status={item.verificationStatus} size="sm" />
                </div>

                <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-relaxed">
                  "{item.statement}"
                </p>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    <span>Source: <strong className="text-stone-900">{item.sourceLocation}</strong></span>
                  </div>
                  {item.notes && (
                    <p className="text-[11px] text-stone-500 italic">{item.notes}</p>
                  )}
                </div>

                {item.linkedRequirements.length > 0 && (
                  <div className="text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-700">Linked to: </span>
                    <span>{item.linkedRequirements.join(' • ')}</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Controls */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/evidence/${item.id}`)}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Review Evidence</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </button>

                {item.verificationStatus === 'review' ? (
                  <button
                    onClick={() => updateEvidenceStatus(item.id, 'confirmed')}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm ✓
                  </button>
                ) : item.verificationStatus === 'confirmed' ? (
                  <button
                    onClick={() => updateEvidenceStatus(item.id, 'review')}
                    className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 text-[11px] font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Mark Review ⚠
                  </button>
                ) : (
                  <button
                    onClick={() => updateEvidenceStatus(item.id, 'confirmed')}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg cursor-pointer"
                  >
                    Add Evidence
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
