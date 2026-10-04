import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OfficialSourceBanner } from '../components/ui/OfficialSourceBanner';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  CheckSquare,
  Square,
  HelpCircle,
  FileCheck2,
  Send
} from 'lucide-react';

interface ApplicationPrepPageProps {
  jobId: string;
}

export const ApplicationPrepPage: React.FC<ApplicationPrepPageProps> = ({ jobId }) => {
  const { jobs, evidenceItems, addApplication, navigate, addToast } = useApp();
  const job = jobs.find(j => j.id === jobId) || jobs[0];

  // User interactive confirmation checkboxes for prep
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'doc-0': true,
    'doc-1': true
  });

  const [verifiedClarifications, setVerifiedClarifications] = useState<Record<string, boolean>>({
    'clar-1': true
  });

  const [activeTab, setActiveTab] = useState<'checklist' | 'evidence' | 'verify' | 'documents' | 'final'>('checklist');

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClarification = (id: string) => {
    setVerifiedClarifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartTracking = () => {
    addApplication({
      jobId: job.id,
      jobTitle: job.title,
      agency: job.agency,
      grade: job.grade,
      announcementNumber: job.announcementNumber,
      applicationDate: new Date().toISOString().split('T')[0],
      closingDate: job.closingDate,
      status: 'Applied',
      nextAction: 'Monitor HR specialist referral in USAJOBS portal.',
      documentsSubmitted: job.requiredDocuments,
      notes: 'Applied via USAJOBS using tailored federal evidence package.',
      timeline: [
        {
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          title: 'Application Package Prepared',
          description: 'Verified evidence mapped to qualifications.'
        }
      ]
    });
    navigate('/applications');
  };

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/jobs/${job.id}/readiness`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Readiness</span>
        </button>

        {/* Sub-page Nav */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => navigate(`/jobs/${job.id}/analysis`)}
            className="text-stone-600 hover:text-stone-900 px-3 py-1 rounded-lg cursor-pointer"
          >
            Analysis
          </button>
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
          <span className="bg-white text-stone-900 px-3 py-1 rounded-lg font-bold shadow-2xs">
            Prep
          </span>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>Pre-Submission Assembly</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Application Preparation
          </h1>
          <p className="text-sm font-semibold text-stone-800 mt-1">
            {job.title} — {job.grade} ({job.agency})
          </p>
          <p className="text-xs text-stone-500 mt-0.5">
            Prepare your supporting evidence and verify ambiguous claims before final USAJOBS submission.
          </p>
        </div>

        {/* Core Integrity Callout */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900">Zero Fabrication Standard:</span> GOVMATCH never inflates dates, fabricates skills, or exaggerates supervisory scope. All prepared statements match your verified evidence record.
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
          {[
            { id: 'checklist', label: '1. Requirements' },
            { id: 'evidence', label: '2. Evidence to Use' },
            { id: 'verify', label: '3. Verify Ambiguities' },
            { id: 'documents', label: '4. Documents' },
            { id: 'final', label: '5. Final Review' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: REQUIREMENTS CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-stone-900">Requirements Coverage Checklist</h2>
          <p className="text-xs text-stone-500">
            Check each qualification statement before finalizing your resume bullet points.
          </p>

          <div className="space-y-3 pt-2">
            {job.requirements.map(req => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-700 font-mono text-[11px]">
                    {req.category}
                  </span>
                  <StatusBadge type="match" status={req.assessment} size="sm" />
                </div>
                <p className="text-stone-900 font-semibold text-sm leading-relaxed">
                  {req.text}
                </p>
                <p className="text-stone-600 leading-normal bg-white p-2.5 rounded-xl border border-stone-200/60">
                  {req.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={() => setActiveTab('evidence')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Evidence to Use</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: EVIDENCE TO USE */}
      {activeTab === 'evidence' && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-stone-900">Recommended Evidence Statements to Use</h2>
          <p className="text-xs text-stone-500">
            Include these exact verified points in your USAJOBS resume to ensure rating credit by the federal staffing specialist.
          </p>

          <div className="space-y-3 pt-2">
            {evidenceItems.slice(0, 4).map(ev => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-stone-500 font-bold">{ev.sourceLocation}</span>
                  <StatusBadge type="evidence" status={ev.verificationStatus} size="sm" />
                </div>
                <p className="font-bold text-stone-900 text-sm">"{ev.statement}"</p>
                <p className="text-[11px] text-stone-500">
                  Direct citation for the announcement's specialized experience requirement.
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveTab('checklist')}
              className="px-4 py-2 text-stone-600 text-xs font-semibold"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Verify Ambiguities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: INFORMATION TO VERIFY */}
      {activeTab === 'verify' && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-stone-900">Information to Verify</h2>
          <p className="text-xs text-stone-500">
            Federal staffing specialists disallow ambiguous claims. Confirm these points are clearly documented in your resume.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!verifiedClarifications['clar-1']}
                  onChange={() => toggleClarification('clar-1')}
                  className="mt-1 rounded text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                />
                <div className="space-y-1">
                  <p className="font-bold text-stone-900 text-sm">
                    Hours Per Week and Date Format (Month/Year)
                  </p>
                  <p className="text-stone-600">
                    Did you specify "40 hours per week" for all private sector and contractor positions? Federal HR cannot credit experience without explicit hours per week.
                  </p>
                </div>
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!verifiedClarifications['clar-2']}
                  onChange={() => toggleClarification('clar-2')}
                  className="mt-1 rounded text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                />
                <div className="space-y-1">
                  <p className="font-bold text-stone-900 text-sm">
                    Dollar Values & Procurement Scope
                  </p>
                  <p className="text-stone-600">
                    Ensure $3.2M procurement contract oversight and FAR compliance statements are explicitly listed in your work duties.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveTab('evidence')}
              className="px-4 py-2 text-stone-600 text-xs font-semibold"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Documents Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: REQUIRED DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-stone-900">Mandatory Document Attachments</h2>
          <p className="text-xs text-stone-500">
            Failure to submit any required document will result in loss of consideration. Check off each document as ready:
          </p>

          <div className="space-y-3 pt-2">
            {job.requiredDocuments.map((doc, idx) => {
              const docId = `doc-${idx}`;
              const isChecked = !!checkedDocs[docId];
              return (
                <div
                  key={idx}
                  onClick={() => toggleDoc(docId)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                    <span className="font-semibold text-sm">{doc}</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-stone-500">
                    {isChecked ? 'Ready to upload' : 'Unchecked'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveTab('verify')}
              className="px-4 py-2 text-stone-600 text-xs font-semibold"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveTab('final')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Final Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: FINAL REVIEW & USAJOBS APPLICATION */}
      {activeTab === 'final' && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-stone-900">Final Pre-Submission Review</h2>
            <p className="text-xs text-stone-600">
              You are ready to submit your application on the official federal destination: <strong className="text-stone-900">USAJOBS.gov</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-950 space-y-2">
            <p className="font-bold text-orange-900">Important Reminders Before Submitting:</p>
            <ul className="list-disc list-inside space-y-1 text-orange-900">
              <li>Announcement closing date: <strong className="font-semibold">{job.closingDate} at 11:59 PM ET</strong>.</li>
              <li>Official Announcement Number: <strong className="font-mono font-semibold">{job.announcementNumber}</strong>.</li>
              <li>Ensure attached documents finish uploading completely in USAJOBS before clicking "Submit Application".</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
            <a
              href={job.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                e.preventDefault();
                alert(`Directing to official USAJOBS application portal for announcement ${job.announcementNumber}.`);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Application on USAJOBS</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleStartTracking}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Track in Application Tracker</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
