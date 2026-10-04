import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { IslandHeader } from './components/ui/IslandHeader';
import { MobileBottomNav } from './components/ui/MobileBottomNav';
import { BillingModal } from './components/ui/BillingModal';
import { ToastContainer } from './components/ui/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { CareerProfilePage } from './pages/CareerProfilePage';
import { ResumeImportPage } from './pages/ResumeImportPage';
import { LinkedInImportPage } from './pages/LinkedInImportPage';
import { ManualProfileBuilderPage } from './pages/ManualProfileBuilderPage';
import { EvidenceVaultPage } from './pages/EvidenceVaultPage';
import { EvidenceDetailPage } from './pages/EvidenceDetailPage';
import { DiscoverJobsPage } from './pages/DiscoverJobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { JobAnalysisPage } from './pages/JobAnalysisPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { ApplicationReadinessPage } from './pages/ApplicationReadinessPage';
import { ApplicationPrepPage } from './pages/ApplicationPrepPage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppRouter: React.FC = () => {
  const { currentPath } = useApp();

  const renderCurrentPage = () => {
    const path = currentPath;

    if (path === '/' || path === '') return <LandingPage />;
    if (path === '/signup') return <SignupPage />;
    if (path === '/login') return <LoginPage />;
    if (path === '/home') return <HomePage />;
    if (path === '/profile') return <CareerProfilePage />;
    if (path === '/profile/import/resume') return <ResumeImportPage />;
    if (path === '/profile/import/linkedin') return <LinkedInImportPage />;
    if (path === '/profile/build') return <ManualProfileBuilderPage />;
    if (path === '/evidence') return <EvidenceVaultPage />;
    if (path.startsWith('/evidence/')) {
      const id = path.replace('/evidence/', '');
      return <EvidenceDetailPage evidenceId={id} />;
    }
    if (path === '/discover') return <DiscoverJobsPage />;
    if (path.startsWith('/jobs/')) {
      const parts = path.split('/').filter(Boolean); // ['jobs', ':id', 'subpath?']
      const jobId = parts[1] || 'va-0343-gs12';
      const sub = parts[2];
      if (sub === 'analysis') return <JobAnalysisPage jobId={jobId} />;
      if (sub === 'eligibility') return <EligibilityPage jobId={jobId} />;
      if (sub === 'readiness') return <ApplicationReadinessPage jobId={jobId} />;
      if (sub === 'application-prep') return <ApplicationPrepPage jobId={jobId} />;
      return <JobDetailPage jobId={jobId} />;
    }
    if (path === '/saved') return <SavedJobsPage />;
    if (path === '/applications') return <ApplicationsPage />;
    if (path.startsWith('/applications/')) {
      const appId = path.replace('/applications/', '');
      return <ApplicationDetailPage applicationId={appId} />;
    }
    if (path === '/alerts') return <AlertsPage />;
    if (path === '/settings') return <SettingsPage />;

    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Island Floating Header */}
      <IslandHeader />

      {/* Main Content View */}
      <main className="flex-1 pb-24 lg:pb-12">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200/80 py-8 px-4 sm:px-6 text-xs text-stone-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-extrabold text-stone-900 text-sm tracking-tight">
              GOV<span className="text-orange-600">MATCH</span>
            </span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span>Personal Federal Career Intelligence</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="font-medium text-stone-700">Evidence first. Your decision.</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-stone-400 max-w-md">
            USAJOBS is the official job and application destination of the United States Federal Government. GOVMATCH is an independent intelligence and preparation layer.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Billing & Subscription Modal */}
      <BillingModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
