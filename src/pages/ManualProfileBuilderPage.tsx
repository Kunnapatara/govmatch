import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Edit3,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Plus,
  Trash2
} from 'lucide-react';

export const ManualProfileBuilderPage: React.FC = () => {
  const { profile, updateProfile, navigate, addToast } = useApp();
  const [activeSection, setActiveSection] = useState<'experience' | 'education' | 'skills' | 'clearance' | 'preferences'>('experience');

  // Form states
  const [newExp, setNewExp] = useState({
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: 'Present',
    hoursPerWeek: 40,
    federalGradeEquivalent: 'GS-12 Equivalent',
    duties: ''
  });

  const [newEdu, setNewEdu] = useState({
    degree: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    gpa: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');

  const [clearanceVal, setClearanceVal] = useState(profile.securityClearance);
  const [citizenshipVal, setCitizenshipVal] = useState(profile.citizenship);
  const [veteranVal, setVeteranVal] = useState(profile.veteranPreference);

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.title || !newExp.organization) return;

    const newRecord = {
      id: `exp-${Date.now()}`,
      title: newExp.title,
      organization: newExp.organization,
      location: newExp.location || 'Washington, DC',
      startDate: newExp.startDate || '2024-01',
      endDate: newExp.endDate || 'Present',
      hoursPerWeek: Number(newExp.hoursPerWeek) || 40,
      federalGradeEquivalent: newExp.federalGradeEquivalent,
      keyDuties: newExp.duties.split('\n').filter(d => d.trim().length > 0)
    };

    updateProfile({
      experiences: [newRecord, ...profile.experiences]
    });

    setNewExp({
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      hoursPerWeek: 40,
      federalGradeEquivalent: 'GS-12 Equivalent',
      duties: ''
    });

    addToast({
      type: 'success',
      title: 'Experience Record Added'
    });
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.degree || !newEdu.institution) return;

    const newRecord = {
      id: `edu-${Date.now()}`,
      degree: newEdu.degree,
      fieldOfStudy: newEdu.fieldOfStudy,
      institution: newEdu.institution,
      graduationYear: newEdu.graduationYear || '2022',
      gpa: newEdu.gpa
    };

    updateProfile({
      educations: [newRecord, ...profile.educations]
    });

    setNewEdu({
      degree: '',
      fieldOfStudy: '',
      institution: '',
      graduationYear: '',
      gpa: ''
    });

    addToast({
      type: 'success',
      title: 'Education Record Added'
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!profile.skills.includes(newSkill.trim())) {
      updateProfile({
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.trim()) return;
    updateProfile({
      certifications: [...profile.certifications, newCert.trim()]
    });
    setNewCert('');
  };

  const handleSaveClearance = () => {
    updateProfile({
      securityClearance: clearanceVal,
      citizenship: citizenshipVal,
      veteranPreference: veteranVal
    });
    addToast({
      type: 'success',
      title: 'Clearance & Eligibility Preferences Saved'
    });
  };

  const sections = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & KSAs', icon: Layers },
    { id: 'clearance', label: 'Clearance & Veterans', icon: ShieldCheck },
    { id: 'preferences', label: 'Target Preferences', icon: Sliders }
  ];

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <Edit3 className="w-3.5 h-3.5 text-orange-600" />
            <span>Manual Profile Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Build Career Profile Manually
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Specify precise federal hours per week, specialized duties, and classification equivalents.
          </p>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer self-start sm:self-auto"
        >
          ← Return to Profile
        </button>
      </div>

      {/* Progressive Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100/80 rounded-2xl border border-stone-200">
        {sections.map(sec => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-stone-400'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION: EXPERIENCE */}
      {activeSection === 'experience' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Add Federal-Grade Experience</h2>
            <p className="text-xs text-stone-500">
              USAJOBS requires exact dates, hours per week, and specialized duties to credit time-in-grade.
            </p>
          </div>

          <form onSubmit={handleAddExperience} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operations Project Lead"
                  value={newExp.title}
                  onChange={e => setNewExp({ ...newExp, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Organization / Employer</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Federal Contractor or Public Agency"
                  value={newExp.organization}
                  onChange={e => setNewExp({ ...newExp, organization: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Start Date (YYYY-MM)</label>
                <input
                  type="text"
                  placeholder="2022-03"
                  value={newExp.startDate}
                  onChange={e => setNewExp({ ...newExp, startDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">End Date (YYYY-MM or Present)</label>
                <input
                  type="text"
                  value={newExp.endDate}
                  onChange={e => setNewExp({ ...newExp, endDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Hours Per Week</label>
                <input
                  type="number"
                  value={newExp.hoursPerWeek}
                  onChange={e => setNewExp({ ...newExp, hoursPerWeek: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Federal Grade Equivalent</label>
                <select
                  value={newExp.federalGradeEquivalent}
                  onChange={e => setNewExp({ ...newExp, federalGradeEquivalent: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="GS-9 Equivalent">GS-9 Equivalent</option>
                  <option value="GS-11 Equivalent">GS-11 Equivalent</option>
                  <option value="GS-12 Equivalent">GS-12 Equivalent</option>
                  <option value="GS-13 Equivalent">GS-13 Equivalent</option>
                  <option value="GS-14 Equivalent">GS-14 Equivalent</option>
                  <option value="GS-15 Equivalent">GS-15 Equivalent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Key Specialized Duties (One per line)</label>
              <textarea
                rows={3}
                placeholder="Managed procurement contracts adhering to federal acquisition regulations...&#10;Led team of 8 analysts on data validation..."
                value={newExp.duties}
                onChange={e => setNewExp({ ...newExp, duties: e.target.value })}
                className="w-full p-3 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Position to Profile</span>
            </button>
          </form>

          {/* List of current experiences */}
          <div className="pt-6 border-t border-stone-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Current Experiences Recorded ({profile.experiences.length})</h3>
            {profile.experiences.map(item => (
              <div key={item.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex justify-between items-start">
                <div>
                  <p className="font-bold text-stone-900">{item.title}</p>
                  <p className="text-stone-600">{item.organization} • {item.startDate} to {item.endDate} ({item.hoursPerWeek} hrs/wk)</p>
                </div>
                <span className="font-mono text-[11px] bg-white border border-stone-200 px-2 py-0.5 rounded">
                  {item.federalGradeEquivalent}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: EDUCATION */}
      {activeSection === 'education' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Add Accredited Education</h2>
            <p className="text-xs text-stone-500">
              Degrees and coursework can substitute for or augment specialized experience under OPM guidelines.
            </p>
          </div>

          <form onSubmit={handleAddEducation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Degree Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Public Administration (MPA)"
                  value={newEdu.degree}
                  onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Field of Study</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Public Policy Analysis"
                  value={newEdu.fieldOfStudy}
                  onChange={e => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Institution</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. George Washington University"
                  value={newEdu.institution}
                  onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Graduation Year</label>
                <input
                  type="text"
                  placeholder="2020"
                  value={newEdu.graduationYear}
                  onChange={e => setNewEdu({ ...newEdu, graduationYear: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Degree to Profile</span>
            </button>
          </form>
        </div>
      )}

      {/* SECTION: SKILLS & CERTS */}
      {activeSection === 'skills' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Skills, KSAs & Certifications</h2>
            <p className="text-xs text-stone-500">
              Selective factors and Knowledge, Skills, and Abilities mentioned in federal announcements.
            </p>
          </div>

          <div className="space-y-4">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. FAR Regulations, Python, Power BI)..."
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                + Add Skill
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-800 flex items-center gap-1.5">
                  <span>{s}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 space-y-4">
            <h3 className="text-sm font-bold text-stone-900">Certifications</h3>
            <form onSubmit={handleAddCert} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Project Management Professional (PMP), Lean Six Sigma..."
                value={newCert}
                onChange={e => setNewCert(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                + Add Certification
              </button>
            </form>

            <div className="space-y-2">
              {profile.certifications.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: CLEARANCE & VETERANS */}
      {activeSection === 'clearance' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Security Clearance & Federal Eligibility Authorities</h2>
            <p className="text-xs text-stone-500">
              Clearances and hiring paths determine whether you are eligible to apply under non-competitive authorities.
            </p>
          </div>

          <div className="space-y-4 max-w-lg">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Security Clearance Level</label>
              <select
                value={clearanceVal}
                onChange={e => setClearanceVal(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="None / Public Trust Eligible">None / Public Trust Eligible</option>
                <option value="Confidential">Confidential</option>
                <option value="Active Secret (DoD / 2023)">Active Secret (DoD / 2023)</option>
                <option value="Active Top Secret">Active Top Secret</option>
                <option value="Top Secret / SCI Eligible">Top Secret / SCI Eligible</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Veterans’ Preference Authority</label>
              <select
                value={veteranVal}
                onChange={e => setVeteranVal(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="No Preference Claimed">No Preference Claimed (Non-veteran)</option>
                <option value="5-Point Preference (TP)">5-Point Preference (TP)</option>
                <option value="10-Point Preference (CPS)">10-Point Preference (CPS - 30%+ service connected)</option>
                <option value="10-Point Preference (CP)">10-Point Preference (CP)</option>
                <option value="Sole Survivorship (SSP)">Sole Survivorship (SSP)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Citizenship Status</label>
              <input
                type="text"
                value={citizenshipVal}
                onChange={e => setCitizenshipVal(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveClearance}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Save Clearance & Eligibility Info
            </button>
          </div>
        </div>
      )}

      {/* SECTION: TARGET PREFERENCES */}
      {activeSection === 'preferences' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Federal Job Search Preferences</h2>
            <p className="text-xs text-stone-500">
              Filter automated match notifications according to target grades and agencies.
            </p>
          </div>

          <div className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Target Pay Grades</label>
              <div className="flex gap-2">
                {['GS-11', 'GS-12', 'GS-13', 'GS-14'].map(g => (
                  <span key={g} className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 font-bold">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Target Job Series</label>
              <div className="space-y-1 text-stone-700">
                <div className="p-2 bg-stone-50 rounded-lg">0343 Management and Program Analysis</div>
                <div className="p-2 bg-stone-50 rounded-lg">1102 Contracting</div>
                <div className="p-2 bg-stone-50 rounded-lg">2210 Information Technology Management</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/discover')}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl"
              >
                Go to Discover with Current Preferences →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
