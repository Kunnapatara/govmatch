import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
  ExternalLink,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface JobAnalysisPageProps {
  jobId: string;
}

export const JobAnalysisPage: React.FC<JobAnalysisPageProps> = ({ jobId }) => {
  const {
    jobs,
    evidenceItems,
    isJobAnalysisUnlocked,
    consumeFreeAnalysis,
    openBillingModal,
    navigate,
    billing
  } = useApp();

  const job = jobs.find(j => j.id === jobId) || jobs[0];
  const isUnlocked = isJobAnalysisUnlocked(job.id);

  // Requirement expanded states
  const [expandedReqs, setExpandedReqs] = useState<Record<string, boolean>>({
    [job.requirements[0]?.id || '']: true
  });

  const toggleReq = (reqId: string) => {
    setExpandedReqs(prev => ({ ...prev, [reqId]: !prev[reqId] }));
  };

  // Requirement breakdown tallies
  const supportedCount = job.requirements.filter(r => r.assessment === 'good').length;
  const partialCount = job.requirements.filter(r => r.assessment === 'gaps').length;
  const unknownCount = job.requirements.filter(r => r.assessment === 'info').length;
  const blockerCount = job.requirements.filter(r => r.assessment === 'issue').length;

  const handleUnlockWithFreeOrModal = () => {
    const success = consumeFreeAnalysis(job.id);
    if (!success) {
      openBillingModal(job.id, 'job_analysis');
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Navigation Breadcrumb / Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Job Details</span>
        </button>

        {/* Secondary Sub-page Nav: Analysis | Eligibility | Readiness | Prep */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
          <span className="bg-white text-stone-900 px-3 py-1 rounded-lg font-bold shadow-2xs">
            Analysis
          </span>
          <button
            onClick={() => navigate(`/jobs/${job.id}/eligibility`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Eligibility
          </button>
          <button
            onClick={() => navigate(`/jobs/${job.id}/readiness`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Readiness
          </button>
          <button
            onClick={() => navigate(`/jobs/${job.id}/application-prep`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Prep
          </button>
        </div>
      </div>

      {/* Main Analysis Header Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Personal Federal Career Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Your Job Analysis
            </h1>
            <p className="text-base font-bold text-stone-800">
              {job.title} — <span className="font-mono">{job.grade}</span>
            </p>
            <p className="text-xs text-stone-500 font-medium">
              {job.agency} • Announcement #{job.announcementNumber}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 self-start">
            <StatusBadge type="match" status={job.matchStatus} size="lg" />
            <span className="text-[11px] text-stone-500 font-medium">
              Analyzed {job.analyzedAt} • {job.announcementVersion.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Official source banner */}
        <OfficialSourceBanner job={job} compact />

        {/* Section: WHY YOU MATCH SUMMARY BAR */}
        <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Why You Match Summary
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-lg font-black text-emerald-700 block font-mono">{supportedCount}</span>
              <span className="font-semibold text-stone-800 block">supported</span>
              <span className="text-[11px] text-stone-500">by verified evidence</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-lg font-black text-amber-700 block font-mono">{partialCount}</span>
              <span className="font-semibold text-stone-800 block">partially supported</span>
              <span className="text-[11px] text-stone-500">clarification needed</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-lg font-black text-sky-700 block font-mono">{unknownCount}</span>
              <span className="font-semibold text-stone-800 block">unknown</span>
              <span className="text-[11px] text-stone-500">need more info</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-stone-200">
              <span className="text-lg font-black text-rose-700 block font-mono">{blockerCount}</span>
              <span className="font-semibold text-stone-800 block">potential blocker</span>
              <span className="text-[11px] text-stone-500">no evidence found</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAYWALL / UNLOCK PREVIEW STATE IF LOCKED */}
      {!isUnlocked && (
        <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div className="max-w-lg mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Unlock Detailed Requirement → Evidence Mapping
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Examine each specialized qualification statement, inspect exact resume source citations, discover hidden qualification blockers, and evaluate readiness before USAJOBS application.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-md mx-auto text-xs text-stone-700 space-y-1.5 text-left">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full requirement-by-requirement evidence mapping</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Gap audit & potential blocker identification</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Eligibility assessment & Application preparation checklist</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {billing.remainingFreeAnalyses > 0 ? (
              <button
                onClick={handleUnlockWithFreeOrModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Unlock with Free Allowance ({billing.remainingFreeAnalyses} left)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => openBillingModal(job.id, 'job_analysis')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Purchase Single Analysis ($9.99)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => openBillingModal(job.id, 'career_pass')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Unlimited Career Pass ($39.99 / 3 mos)</span>
            </button>
          </div>
        </div>
      )}

      {/* REQUIREMENT → EVIDENCE VIEW (EXPANDABLE) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Requirement-by-Requirement Evidence Mapping
            </h2>
            <p className="text-xs text-stone-500">
              Federal Requirement → Your Evidence → Source → Match Decision
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500 font-semibold">
            {job.requirements.length} Requirements Evaluated
          </span>
        </div>

        <div className="space-y-4">
          {job.requirements.map(req => {
            const isExpanded = !!expandedReqs[req.id];
            const linkedEvidence = evidenceItems.filter(e => req.linkedEvidenceIds.includes(e.id));

            return (
              <div
                key={req.id}
                className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4 transition-all"
              >
                {/* Header Row: Category, Text, Assessment, Expand toggle */}
                <div
                  onClick={() => toggleReq(req.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                        {req.category}
                      </span>
                      <span className="text-[11px] font-medium text-stone-400">
                        {req.importance === 'mandatory' ? 'Mandatory Factor' : req.importance === 'selective' ? 'Selective Placement Factor' : 'Preferred'}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                      {req.text}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge type="match" status={req.assessment} size="sm" />
                    <button className="p-1 rounded-lg text-stone-400 hover:text-stone-700">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-stone-100 space-y-4 animate-in fade-in duration-150">
                    {/* Visual Pathway Diagram */}
                    <div className="p-3 rounded-2xl bg-stone-50/70 border border-stone-200/70 text-xs text-stone-700">
                      <span className="font-bold text-stone-900 block mb-1">Decision Pathway:</span>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
                        <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                          {req.source}
                        </span>
                        <span className="text-stone-400">→</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                          {linkedEvidence.length} Evidence Statements
                        </span>
                        <span className="text-stone-400">→</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                          Classification Alignment
                        </span>
                        <span className="text-stone-400">→</span>
                        <StatusBadge type="match" status={req.assessment} size="sm" />
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        Assessment Explanation:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50/50 p-3 rounded-xl border border-stone-200/60">
                        {req.explanation}
                      </p>
                    </div>

                    {/* Gap or Clarification Warning */}
                    {req.gapOrClarification && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-amber-900">Evidence Clarification Needed:</span>
                          <p className="text-amber-800 mt-0.5">{req.gapOrClarification}</p>
                        </div>
                      </div>
                    )}

                    {/* Mapped Evidence Cards */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                        Mapped Evidence in Your Vault ({linkedEvidence.length}):
                      </span>

                      {linkedEvidence.length === 0 ? (
                        <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200 text-xs text-rose-900 flex items-center justify-between">
                          <span>No supporting evidence currently registered in your vault.</span>
                          <button
                            onClick={() => navigate('/evidence')}
                            className="text-[11px] font-bold text-orange-600 hover:underline cursor-pointer"
                          >
                            + Add Evidence
                          </button>
                        </div>
                      ) : (
                        linkedEvidence.map(ev => (
                          <div
                            key={ev.id}
                            className="p-3.5 rounded-2xl bg-white border border-stone-200 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-stone-800 font-mono text-[11px]">
                                {ev.sourceLocation}
                              </span>
                              <StatusBadge type="evidence" status={ev.verificationStatus} size="sm" />
                            </div>
                            <p className="text-stone-900 font-medium text-xs leading-relaxed">
                              "{ev.statement}"
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA to next workflow step: Eligibility */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-stone-900">Next Step: Official Eligibility Assessment</h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Evaluate time-in-grade, specialized experience duration, and hiring path conditions.
          </p>
        </div>
        <button
          onClick={() => navigate(`/jobs/${job.id}/eligibility`)}
          className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Evaluate Eligibility</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
