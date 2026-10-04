import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  FileCheck2,
  Info
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

export const ResumeImportPage: React.FC = () => {
  const { navigate, addEvidence, addToast } = useApp();
  const [step, setStep] = useState<'upload' | 'parsing' | 'review' | 'confirmed'>('upload');
  const [selectedFileName, setSelectedFileName] = useState<string>('Morgan_Vance_Federal_Resume_2026.pdf');
  const [fileType, setFileType] = useState<'pdf' | 'docx'>('pdf');

  // Extracted items for user review
  const [extractedStatements, setExtractedStatements] = useState([
    {
      id: 'ext-1',
      statement: 'Led a cross-functional project involving 12 employees over 8 months to modernize grant workflow tracking.',
      category: 'Experience' as const,
      sourceLocation: 'Resume — Page 3, Apex Solutions Group',
      selected: true
    },
    {
      id: 'ext-2',
      statement: 'Managed procurement contracts valued at $3.2M adhering to federal acquisition guidelines and audit standards.',
      category: 'Experience' as const,
      sourceLocation: 'Resume — Page 2, Apex Solutions Group',
      selected: true
    },
    {
      id: 'ext-3',
      statement: 'Engineered KPI dashboard in Power BI / Tableau utilized by executive directors to review throughput.',
      category: 'Skills' as const,
      sourceLocation: 'Resume — Page 4, Technical Proficiencies',
      selected: true
    },
    {
      id: 'ext-4',
      statement: 'Conducted risk assessments and compliance reviews across 4 regional program offices.',
      category: 'Experience' as const,
      sourceLocation: 'Resume — Page 3, Internal Controls',
      selected: true
    }
  ]);

  const handleSimulateUpload = (type: 'pdf' | 'docx') => {
    setFileType(type);
    setSelectedFileName(type === 'pdf' ? 'Morgan_Vance_Federal_Resume_2026.pdf' : 'Morgan_Vance_Executive_Resume.docx');
    setStep('parsing');
    setTimeout(() => {
      setStep('review');
    }, 1400);
  };

  const handleConfirmImport = () => {
    // Add selected extracted statements into evidence vault with initial 'review' status
    extractedStatements
      .filter(item => item.selected)
      .forEach(item => {
        addEvidence({
          statement: item.statement,
          category: item.category,
          source: 'Resume',
          sourceLocation: item.sourceLocation,
          verificationStatus: 'review', // Never automatically treat extracted info as verified confirmed
          linkedRequirements: [],
          notes: `Extracted from ${selectedFileName}. Requires manual confirmation.`
        });
      });

    setStep('confirmed');
    addToast({
      type: 'info',
      title: 'Resume Statements Extracted',
      message: 'Items added to Evidence Vault marked for review.'
    });
  };

  return (
    <div className="py-6 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5 text-orange-600" />
              <span>Resume Extraction Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Import Resume
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Extract concrete duties, hours, and achievements into structured evidence cards.
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="text-xs text-stone-600 hover:text-stone-900 font-semibold self-start sm:self-auto cursor-pointer"
          >
            ← Back to Profile
          </button>
        </div>

        {/* Conceptual Flow Indicator */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold">
            <div className={`p-2 rounded-xl ${step === 'upload' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'}`}>
              1. Upload Resume
            </div>
            <div className={`p-2 rounded-xl ${step === 'parsing' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'}`}>
              2. Extract Information
            </div>
            <div className={`p-2 rounded-xl ${step === 'review' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'}`}>
              3. Review
            </div>
            <div className={`p-2 rounded-xl ${step === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-700'}`}>
              4. Confirm
            </div>
            <div className="p-2 rounded-xl bg-stone-100 text-stone-400 hidden sm:block">
              5. Add to Vault
            </div>
          </div>
        </div>
      </div>

      {/* Trust Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-950">Evidence Integrity Policy:</span> GOVMATCH never automatically treats extracted text as verified evidence. Every statement extracted from your resume is placed in <strong className="font-bold">⚠ Review</strong> status so you can verify source accuracy before matching against federal jobs.
        </div>
      </div>

      {/* STEP 1: UPLOAD AREA */}
      {step === 'upload' && (
        <div className="bg-white border-2 border-dashed border-stone-300 rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Upload className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-stone-900">Upload your federal or standard resume</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Supports PDF (.pdf) and Microsoft Word (.docx). Multi-page federal resumes up to 10 pages are supported.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleSimulateUpload('pdf')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Simulate Upload: Resume.pdf</span>
            </button>
            <button
              onClick={() => handleSimulateUpload('docx')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Simulate Upload: Resume.docx</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-400 pt-2">
            Your file is parsed locally in memory. No resume data is sold, scraped, or public.
          </p>
        </div>
      )}

      {/* STEP 2: PARSING STATE */}
      {step === 'parsing' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto" />
          <h2 className="text-lg font-bold text-stone-900">Parsing {selectedFileName}...</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Extracting dates, hours per week, specialized duties, and measurable achievements according to OPM classification patterns.
          </p>
        </div>
      )}

      {/* STEP 3: REVIEW EXTRACTED INFORMATION */}
      {step === 'review' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Review Extracted Statements
              </h2>
              <p className="text-xs text-stone-500">
                Found in <span className="font-mono text-stone-700 font-semibold">{selectedFileName}</span>. Select statements to transfer to your Evidence Vault.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              ⚠ Review Status on Import
            </span>
          </div>

          <div className="space-y-3">
            {extractedStatements.map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all text-xs space-y-2 ${
                  item.selected ? 'bg-orange-50/20 border-orange-200' : 'bg-stone-50 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={e => {
                        const checked = e.target.checked;
                        setExtractedStatements(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, selected: checked } : i))
                        );
                      }}
                      className="mt-1 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <p className="font-semibold text-stone-900 leading-relaxed text-sm">
                        {item.statement}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-stone-500">
                        <span className="bg-white border border-stone-200 px-2 py-0.5 rounded font-medium text-stone-700">
                          {item.category}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-stone-600">{item.sourceLocation}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge type="evidence" status="review" size="sm" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <button
              onClick={() => setStep('upload')}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
            >
              Cancel / Re-upload
            </button>

            <button
              onClick={handleConfirmImport}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Add to Evidence Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMED */}
      {step === 'confirmed' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-stone-900">Statements Successfully Added to Vault</h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
              Your resume statements are now saved. Next, visit your Evidence Vault to confirm each item before evaluating federal announcements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/evidence')}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Open Evidence Vault
            </button>
            <button
              onClick={() => navigate('/discover')}
              className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs cursor-pointer"
            >
              Explore Matching Jobs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
