import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Search,
  Scale,
  Compass
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

export const LandingPage: React.FC = () => {
  const { navigate } = useApp();

  const workflowSteps = [
    {
      step: '01',
      title: 'Your Experience',
      desc: 'Ground your background in specific achievements, dates, grades, and hours per week.'
    },
    {
      step: '02',
      title: 'Evidence',
      desc: 'Extract verifiable evidence statements linked directly to your resume or transcripts.'
    },
    {
      step: '03',
      title: 'Federal Requirements',
      desc: 'Parse specialized experience, selective placement factors, and OPM classification standards.'
    },
    {
      step: '04',
      title: 'Understand Your Match',
      desc: 'Review explainable alignment: see what is confirmed, what has gaps, and what needs info.'
    },
    {
      step: '05',
      title: 'Prepare',
      desc: 'Organize required documents, clarify ambiguous points, and review mandatory disclosures.'
    },
    {
      step: '06',
      title: 'Apply on USAJOBS',
      desc: 'Submit your tailored federal application directly on the official federal portal with confidence.'
    }
  ];

  return (
    <div className="py-8 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span>Personal Federal Career Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] mb-6 font-sans">
          Know before you apply.
        </h1>

        <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          See how your experience connects to federal opportunities — and what still needs to be verified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Your Career Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/discover')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm sm:text-base border border-stone-200/90 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-stone-500" />
            <span>Explore Federal Jobs</span>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Evidence First. Your Decision.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4 text-stone-400" />
            <span>Official USAJOBS Job Intelligence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-orange-600" />
            <span>No Exaggerated Claims</span>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              How Federal Career Intelligence Works
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              A structured preparation pipeline designed around official OPM standards and USAJOBS qualifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/70 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                      STEP {step.step}
                    </span>
                    {idx < workflowSteps.length - 1 && (
                      <span className="text-stone-300 text-xs hidden lg:block">→</span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-stone-900 mb-1.5">{step.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What GOVMATCH is and is NOT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>What GOVMATCH is</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>An intelligence and preparation layer around official federal job announcements.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>An evidence-driven auditor that maps your specific background against specialized experience lines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>A decision-support tool that explicitly shows what is missing before you submit on USAJOBS.</span>
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
              <span>What GOVMATCH is NOT</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <span className="text-stone-400 font-bold">✕</span>
                <span>Not an automated bot that spams applications or fabricates resumes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-stone-400 font-bold">✕</span>
                <span>Not a generic AI chatbot answering with vague summaries.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-stone-400 font-bold">✕</span>
                <span>Not a recruiter marketplace or social network.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Locked Status Demo Component Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h3 className="text-xl font-bold text-stone-900 mb-2">Rigorous Match Vocabulary</h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mb-6">
          We never use misleading percentage scores. We tell you exactly where you stand.
        </p>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-2xs flex flex-wrap items-center justify-center gap-3">
          <StatusBadge type="match" status="good" />
          <StatusBadge type="match" status="gaps" />
          <StatusBadge type="match" status="info" />
          <StatusBadge type="match" status="issue" />
          <div className="hidden sm:block w-px h-6 bg-stone-200 mx-2" />
          <StatusBadge type="evidence" status="confirmed" />
          <StatusBadge type="evidence" status="review" />
          <StatusBadge type="evidence" status="missing" />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
            Build your evidence vault today.
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto mb-6">
            Compare your experience against real federal announcements before finalizing your USAJOBS submission.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};
