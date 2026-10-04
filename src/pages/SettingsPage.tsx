import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  User,
  Sliders,
  Bell,
  Lock,
  CreditCard,
  Download,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    updateProfile,
    billing,
    openBillingModal,
    simulateBillingStatus,
    addToast,
    logout
  } = useApp();

  const [activeTab, setActiveTab] = useState<'account' | 'alerts' | 'privacy' | 'billing' | 'data'>('account');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `govmatch_profile_${profile.name.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      type: 'success',
      title: 'Profile Data Exported',
      message: 'Your candidate dossier JSON was downloaded.'
    });
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your GOVMATCH account? All career evidence, saved jobs, and tracked applications will be permanently erased.')) {
      logout();
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5 text-orange-600" />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Manage your account credentials, notifications, billing entitlements, and data sovereignty.
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100/80 rounded-2xl border border-stone-200">
        {[
          { id: 'account', label: 'Account & Profile', icon: User },
          { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
          { id: 'alerts', label: 'Notifications & Alerts', icon: Bell },
          { id: 'privacy', label: 'Privacy & Security', icon: Lock },
          { id: 'data', label: 'Data & Sovereignty', icon: Download }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: ACCOUNT */}
      {activeTab === 'account' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Account Credentials</h2>
            <p className="text-xs text-stone-500">Your contact info and federal notification delivery address.</p>
          </div>

          <div className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={profile.name}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={profile.email}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Phone Number</label>
              <input
                type="text"
                defaultValue={profile.phone}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB: BILLING & PLANS */}
      {activeTab === 'billing' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Billing & Entitlements</h2>
              <p className="text-xs text-stone-500">Official pricing for candidate federal job intelligence.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-orange-50 border border-orange-200 text-orange-800 rounded-full">
              {billing.currentPlan === 'career_pass'
                ? 'Career Pass Active ($39.99 / 3 mos)'
                : billing.currentPlan === 'monthly'
                ? 'Monthly Plan Active ($19.99 / mo)'
                : `Free Plan (${billing.remainingFreeAnalyses} analyses remaining)`}
            </span>
          </div>

          {/* Current Entitlement Overview */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 text-sm">Active Plan Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Current Plan</span>
                <span className="font-bold text-stone-900 capitalize">
                  {billing.currentPlan === 'career_pass' ? 'Career Pass' : billing.currentPlan}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Analyses Remaining</span>
                <span className="font-bold text-stone-900">
                  {billing.currentPlan === 'career_pass' || billing.currentPlan === 'monthly'
                    ? 'Unlimited'
                    : `${billing.remainingFreeAnalyses} this month`}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block mb-0.5">Status</span>
                <span className="font-bold text-emerald-800 uppercase tracking-wider font-mono">
                  {billing.billingStatus}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBillingModal()}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Change Plan / View Pricing</span>
              </button>
            </div>
          </div>

          {/* Plan Comparison Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block">Single Job Analysis</span>
              <p className="text-xl font-bold text-stone-900">$9.99 <span className="text-xs font-normal text-stone-500">/ job</span></p>
              <p className="text-stone-600">Full requirement mapping for 1 targeted vacancy.</p>
            </div>

            <div className="p-4 rounded-2xl border-2 border-orange-400 bg-orange-50/20 space-y-2">
              <span className="font-bold text-orange-950 block">Career Pass (3 Months)</span>
              <p className="text-xl font-bold text-stone-900">$39.99 <span className="text-xs font-normal text-stone-500">/ 3 mos</span></p>
              <p className="text-stone-600">For candidates actively searching and applying.</p>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block">Monthly Access</span>
              <p className="text-xl font-bold text-stone-900">$19.99 <span className="text-xs font-normal text-stone-500">/ mo</span></p>
              <p className="text-stone-600">For continuous career monitoring.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NOTIFICATIONS */}
      {activeTab === 'alerts' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Notifications & Alert Preferences</h2>
            <p className="text-xs text-stone-500">Configure how and when you receive federal match notices.</p>
          </div>

          <div className="space-y-4 max-w-lg text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Instant Job Match Notifications</span>
                <span className="text-stone-500">Receive alert when a vacancy matches 4+ requirements.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Weekly Vacancy Digest</span>
                <span className="text-stone-500">Summary of closing dates and amended announcements.</span>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={e => setWeeklyDigest(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
            </label>
          </div>
        </div>
      )}

      {/* TAB: PRIVACY */}
      {activeTab === 'privacy' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Privacy & Security Policies</h2>
            <p className="text-xs text-stone-500">Our commitments to candidate privacy.</p>
          </div>

          <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900">No Public Profile or Social Scraping:</span>
              <p>Your resume statements and transcripts are private to your session. GOVMATCH never shares candidate dossiers with third-party recruiters or employers.</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900">Official USAJOBS Separation:</span>
              <p>Applications are submitted strictly by you through USAJOBS. GOVMATCH never stores federal portal passwords or attempts automated submission.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: DATA & DANGER ZONE */}
      {activeTab === 'data' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">Data Sovereignty & Account Deletion</h2>
            <p className="text-xs text-stone-500">Export your data or permanently delete your record.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-stone-900 block">Export Candidate Dossier (JSON)</span>
                <span className="text-stone-500">Download complete structured career profile, evidence items, and notes.</span>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data</span>
              </button>
            </div>

            {/* Danger Zone: clearly separated as per Section 7 */}
            <div className="pt-6 border-t border-rose-100">
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-rose-950 block text-sm">Danger Zone: Delete Account</span>
                  <span className="text-rose-800">
                    Permanently delete your career profile, evidence vault items, and application history. This action cannot be reversed.
                  </span>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-2xs whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
