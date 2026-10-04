import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Upload,
  FileSpreadsheet,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  Globe,
  Sliders,
  Plus
} from 'lucide-react';

export const CareerProfilePage: React.FC = () => {
  const { profile, updateProfile, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'skills' | 'preferences'>('overview');
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summaryText, setSummaryText] = useState(profile.summary);

  // Completeness category indicators
  const categoriesCompleteness = [
    { name: 'Experience', status: '✓ Complete', tone: 'emerald' },
    { name: 'Education', status: '✓ Complete', tone: 'emerald' },
    { name: 'Skills', status: '✓ Complete', tone: 'emerald' },
    { name: 'Certifications', status: '⚠ Partial', tone: 'amber' },
    { name: 'Projects', status: '✓ Complete', tone: 'emerald' },
    { name: 'Security Clearance', status: '✓ Complete', tone: 'emerald' },
    { name: 'Preferences', status: '⚠ Partial', tone: 'amber' },
    { name: 'Languages', status: '✓ Complete', tone: 'emerald' }
  ];

  const handleSaveSummary = () => {
    updateProfile({ summary: summaryText });
    setIsEditingSummary(false);
  };

  return (
    <div className="py-6 sm:py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header & Import Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>Candidate Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Your Career Profile
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Structured qualifications and specialized experience lines mapped for federal classification review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/profile/import/resume')}
            className="px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 hover:bg-orange-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-orange-600" />
            <span>Import Resume</span>
          </button>
          <button
            onClick={() => navigate('/profile/import/linkedin')}
            className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-stone-600" />
            <span>LinkedIn Export</span>
          </button>
          <button
            onClick={() => navigate('/profile/build')}
            className="px-3.5 py-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-300" />
            <span>Manual Builder</span>
          </button>
        </div>
      </div>

      {/* Profile Completeness Checklist by Category */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900">
              Profile Completeness by Category
            </h2>
            <p className="text-xs text-stone-500">
              Federal qualifications require concrete hours per week, specialized duties, and accredited transcripts.
            </p>
          </div>
          <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-full self-start sm:self-auto">
            7 of 8 Categories Verified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {categoriesCompleteness.map(cat => (
            <div
              key={cat.name}
              className="p-3 rounded-2xl bg-stone-50/70 border border-stone-200/70 flex items-center justify-between text-xs"
            >
              <span className="font-semibold text-stone-800">{cat.name}</span>
              <span
                className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  cat.tone === 'emerald'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                {cat.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Candidate Dossier Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-8">
        {/* Candidate Core Identity */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-2xl border border-orange-200 shrink-0">
              MV
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-stone-900">{profile.name}</h2>
              <p className="text-xs sm:text-sm font-medium text-stone-700">{profile.currentTitle}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-1">
                <span>{profile.email}</span>
                <span>•</span>
                <span>{profile.phone}</span>
                <span>•</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Federal Eligibility Metadata Badges */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2 text-xs text-stone-700 min-w-[240px]">
            <div className="flex justify-between">
              <span className="text-stone-500">Citizenship:</span>
              <span className="font-semibold text-stone-900">{profile.citizenship}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Clearance:</span>
              <span className="font-semibold text-emerald-800">{profile.securityClearance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Veterans Preference:</span>
              <span className="font-semibold text-stone-900">{profile.veteranPreference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Schedule A:</span>
              <span className="font-semibold text-stone-900">{profile.scheduleA ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Executive Federal Career Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Federal Executive Summary
            </h3>
            {!isEditingSummary ? (
              <button
                onClick={() => setIsEditingSummary(true)}
                className="text-xs text-orange-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Summary</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveSummary}
                  className="px-3 py-1 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingSummary(false)}
                  className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditingSummary ? (
            <textarea
              rows={4}
              value={summaryText}
              onChange={e => setSummaryText(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            />
          ) : (
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50/60 border border-stone-200/60 p-4 rounded-2xl">
              {profile.summary}
            </p>
          )}
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-orange-600" />
              <span>Specialized Work Experience</span>
            </h3>
            <button
              onClick={() => navigate('/profile/build')}
              className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-4">
            {profile.experiences.map(exp => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/70 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-stone-900">{exp.title}</h4>
                    <p className="text-xs font-medium text-stone-600">{exp.organization} • {exp.location}</p>
                  </div>
                  <div className="text-right self-start sm:self-auto">
                    <span className="text-xs font-mono font-semibold text-stone-700 bg-white px-2 py-1 rounded-md border border-stone-200">
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <p className="text-[11px] text-stone-500 mt-1 font-medium">
                      {exp.hoursPerWeek} hrs/week • {exp.federalGradeEquivalent}
                    </p>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside">
                  {exp.keyDuties.map((duty, idx) => (
                    <li key={idx} className="leading-relaxed">{duty}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>Education</span>
            </h3>

            <div className="space-y-3">
              {profile.educations.map(edu => (
                <div key={edu.id} className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/70 text-xs space-y-1">
                  <p className="font-bold text-stone-900">{edu.degree}</p>
                  <p className="text-stone-700">{edu.fieldOfStudy}</p>
                  <p className="text-stone-500">{edu.institution} • Graduated {edu.graduationYear} {edu.gpa ? `• GPA ${edu.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Clearance */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-600" />
              <span>Certifications & Credentials</span>
            </h3>

            <div className="space-y-2">
              {profile.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-stone-50/70 border border-stone-200/70 text-xs flex items-center justify-between">
                  <span className="font-medium text-stone-800">{cert}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Knowledge Areas */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-600" />
            <span>Federal Competencies & KSAs</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
