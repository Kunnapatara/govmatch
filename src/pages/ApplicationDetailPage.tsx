import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  ArrowLeft,
  Edit3,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { ApplicationRecord } from '../types';

interface ApplicationDetailPageProps {
  applicationId: string;
}

export const ApplicationDetailPage: React.FC<ApplicationDetailPageProps> = ({ applicationId }) => {
  const { applications, updateApplicationStatus, navigate, addToast } = useApp();

  const app = applications.find(a => a.id === applicationId) || applications[0];

  const [currentStatus, setCurrentStatus] = useState<ApplicationRecord['status']>(app?.status || 'Applied');
  const [newNote, setNewNote] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  if (!app) {
    return (
      <div className="py-12 max-w-lg mx-auto text-center space-y-4">
        <p className="text-stone-700 font-bold">Application record not found.</p>
        <button
          onClick={() => navigate('/applications')}
          className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs"
        >
          Return to Tracker
        </button>
      </div>
    );
  }

  const handleStatusChange = (status: ApplicationRecord['status']) => {
    setCurrentStatus(status);
    updateApplicationStatus(app.id, status);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    updateApplicationStatus(app.id, currentStatus, newNote.trim());
    setNewNote('');
    setIsEditingNotes(false);
  };

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/applications')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Applications</span>
      </button>

      {/* Main Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                {app.grade}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs font-mono text-stone-500">#{app.announcementNumber}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {app.jobTitle}
            </h1>

            <p className="text-sm font-semibold text-stone-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-stone-400" />
              <span>{app.agency}</span>
            </p>
          </div>

          {/* Quick status selector */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-1.5 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Application Status
            </span>
            <select
              value={currentStatus}
              onChange={e => handleStatusChange(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white font-bold text-stone-900 focus:ring-2 focus:ring-orange-500"
            >
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Next Action Box */}
        <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs text-orange-950 flex items-start gap-3">
          <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-orange-900">Current Next Action:</span>
            <p className="text-stone-700 mt-0.5">{app.nextAction}</p>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Applied Date</span>
            <span className="font-bold text-stone-900 font-mono">{app.applicationDate}</span>
          </div>
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Announcement Closes</span>
            <span className="font-bold text-stone-900 font-mono">{app.closingDate}</span>
          </div>
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Documents Attached</span>
            <span className="font-bold text-stone-900">{app.documentsSubmitted.length} files</span>
          </div>
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block mb-0.5">Current Stage</span>
            <span className="font-bold text-emerald-800">{app.status}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Notes & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Notes & Documents (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          {/* Candidate Notes Card */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-orange-600" />
                <span>Application Notes & Follow-up</span>
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 leading-relaxed whitespace-pre-line">
              {app.notes || 'No custom notes recorded.'}
            </div>

            <form onSubmit={handleAddNote} className="space-y-2 pt-2">
              <label className="text-xs font-bold text-stone-700 block">Add New Note / Follow-up Update</label>
              <textarea
                rows={2}
                placeholder="e.g. Received email from HR staffing specialist requesting updated DD-214 copy..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                className="w-full p-3 text-xs border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 cursor-pointer"
              >
                + Append Note
              </button>
            </form>
          </div>

          {/* Attached Documents List */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Documents Transmitted on USAJOBS</span>
            </h2>

            <div className="space-y-2">
              {app.documentsSubmitted.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between"
                >
                  <span className="font-semibold text-stone-800">{doc}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Transmitted
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Outcome (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Federal Hiring Timeline</span>
            </h2>

            <div className="space-y-4 pt-2">
              {app.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 pb-2 border-l-2 border-orange-200 last:border-transparent">
                  <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-orange-600 ring-4 ring-white" />
                  <span className="text-[10px] font-mono text-stone-400 block">{event.date}</span>
                  <h3 className="text-xs font-bold text-stone-900 mt-0.5">{event.title}</h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
