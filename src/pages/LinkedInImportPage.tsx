import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Info,
  ExternalLink
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

export const LinkedInImportPage: React.FC = () => {
  const { navigate, addEvidence, addToast } = useApp();
  const [step, setStep] = useState<'instructions' | 'parsing' | 'review' | 'completed'>('instructions');

  const [extractedFromExport, setExtractedFromExport] = useState([
    {
      id: 'li-1',
      statement: 'Coordinated stakeholder engagement across 5 state partner agencies and municipal stakeholders.',
      category: 'Experience' as const,
      sourceLocation: 'Positions.csv — Row 2',
      selected: true
    },
    {
      id: 'li-2',
      statement: 'Facilitated Agile sprint ceremonies and backlog grooming for enterprise data platform rollout.',
      category: 'Experience' as const,
      sourceLocation: 'Recommendations_Received.csv — Row 4',
      selected: true
    }
  ]);

  const handleSimulateUpload = () => {
    setStep('parsing');
    setTimeout(() => {
      setStep('review');
    }, 1200);
  };

  const handleConfirm = () => {
    extractedFromExport
      .filter(item => item.selected)
      .forEach(item => {
        addEvidence({
          statement: item.statement,
          category: item.category,
          source: 'LinkedIn Export',
          sourceLocation: item.sourceLocation,
          verificationStatus: 'review',
          linkedRequirements: [],
          notes: 'Extracted from user LinkedIn Data Archive zip. Requires manual confirmation.'
        });
      });

    setStep('completed');
    addToast({
      type: 'info',
      title: 'LinkedIn Data Imported',
      message: 'Items placed in Review status in your Evidence Vault.'
    });
  };

  return (
    <div className="py-6 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />
              <span>Data Archive Ingestion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              LinkedIn Data Export Import
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Import your own official LinkedIn data archive. No account scraping or passwords required.
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="text-xs text-stone-600 hover:text-stone-900 font-semibold self-start sm:self-auto cursor-pointer"
          >
            ← Back to Profile
          </button>
        </div>

        {/* Conceptual flow steps */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold">
            <div className={`p-2 rounded-xl ${step === 'instructions' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'}`}>
              1. Export Data
            </div>
            <div className={`p-2 rounded-xl ${step === 'parsing' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'}`}>
              2. Upload Export
            </div>
            <div className={`p-2 rounded-xl ${step === 'review' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'}`}>
              3. Review
            </div>
            <div className={`p-2 rounded-xl ${step === 'completed' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-700'}`}>
              4. Confirm
            </div>
            <div className="p-2 rounded-xl bg-stone-100 text-stone-400 hidden sm:block">
              5. Add to Vault
            </div>
          </div>
        </div>
      </div>

      {/* Security & Credentials Privacy Guarantee */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-emerald-900">Privacy & Credential Safety:</span> GOVMATCH never requests your LinkedIn password, credentials, or performs third-party web scraping. You provide your own official data export package directly.
        </div>
      </div>

      {/* STEP 1: INSTRUCTIONS & UPLOAD */}
      {step === 'instructions' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              How to obtain your LinkedIn Data Export
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <li>On LinkedIn, go to <span className="font-semibold text-stone-900">Settings & Privacy → Data Privacy</span>.</li>
              <li>Select <span className="font-semibold text-stone-900">Get a copy of your data</span>.</li>
              <li>Choose the download archive containing your Positions, Education, and Skills.</li>
              <li>Upload the resulting ZIP archive or CSV files below.</li>
            </ol>
          </div>

          <div className="bg-white border-2 border-dashed border-stone-300 rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900">Upload LinkedIn Data Export (.zip or .csv)</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                Select your official export file (Positions.csv or Complete_LinkedInDataExport.zip).
              </p>
            </div>

            <button
              onClick={handleSimulateUpload}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-2xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Simulate Upload Archive (LinkedIn_Export_2026.zip)</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PARSING */}
      {step === 'parsing' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto" />
          <h2 className="text-lg font-bold text-stone-900">Processing LinkedIn Export...</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Extracting career positions, dates, and recommendation text.
          </p>
        </div>
      )}

      {/* STEP 3: REVIEW */}
      {step === 'review' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Review LinkedIn Extracted Items</h2>
              <p className="text-xs text-stone-500">
                Extracted from your export. Will be placed in <strong className="font-semibold text-amber-800">⚠ Review</strong> status for your verification.
              </p>
            </div>
            <StatusBadge type="evidence" status="review" size="sm" />
          </div>

          <div className="space-y-3">
            {extractedFromExport.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 text-xs space-y-2"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={e => {
                      const checked = e.target.checked;
                      setExtractedFromExport(prev =>
                        prev.map(i => (i.id === item.id ? { ...i, selected: checked } : i))
                      );
                    }}
                    className="mt-1 rounded text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{item.statement}</p>
                    <p className="text-[11px] text-stone-500 mt-1">Source Location: {item.sourceLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-stone-100">
            <button
              onClick={() => setStep('instructions')}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Confirm & Add to Evidence Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: COMPLETED */}
      {step === 'completed' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">LinkedIn Evidence Statements Imported</h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
              Items have been added to your vault with ⚠ Review status. You can now verify them against official position descriptions.
            </p>
          </div>
          <button
            onClick={() => navigate('/evidence')}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Go to Evidence Vault
          </button>
        </div>
      )}
    </div>
  );
};
