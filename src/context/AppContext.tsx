import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FederalJob,
  EvidenceItem,
  CareerProfile,
  ApplicationRecord,
  JobAlert,
  BillingState,
  PlanType,
  EvidenceStatus
} from '../types';
import {
  initialFederalJobs,
  initialEvidenceItems,
  initialCareerProfile,
  initialApplications,
  initialAlerts
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  // Navigation
  currentPath: string;
  navigate: (path: string) => void;
  
  // Auth state
  isAuthenticated: boolean;
  login: (email?: string) => void;
  logout: () => void;
  
  // Profile
  profile: CareerProfile;
  updateProfile: (updated: Partial<CareerProfile>) => void;
  
  // Evidence
  evidenceItems: EvidenceItem[];
  addEvidence: (item: Omit<EvidenceItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvidenceStatus: (id: string, status: EvidenceStatus) => void;
  updateEvidenceStatement: (id: string, statement: string, notes?: string) => void;
  removeEvidence: (id: string) => void;
  
  // Jobs
  jobs: FederalJob[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  
  // Applications
  applications: ApplicationRecord[];
  addApplication: (app: Omit<ApplicationRecord, 'id'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationRecord['status'], note?: string) => void;
  
  // Alerts
  alerts: JobAlert[];
  markAlertRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  
  // Billing
  billing: BillingState;
  openBillingModal: (targetJobId?: string, preferredPlan?: PlanType) => void;
  closeBillingModal: () => void;
  isBillingModalOpen: boolean;
  billingTargetJobId?: string;
  selectedBillingPlan: PlanType;
  setSelectedBillingPlan: (plan: PlanType) => void;
  upgradePlan: (plan: PlanType, jobId?: string) => void;
  simulateBillingStatus: (status: BillingState['billingStatus']) => void;
  consumeFreeAnalysis: (jobId: string) => boolean;
  isJobAnalysisUnlocked: (jobId: string) => boolean;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Client Path Router State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      return pathname === '/' ? '/' : pathname;
    }
    return '/';
  });

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const login = (email?: string) => {
    setIsAuthenticated(true);
    if (email) {
      setProfile(prev => ({ ...prev, email }));
    }
    addToast({
      type: 'success',
      title: 'Welcome to GOVMATCH',
      message: 'You are signed in to your Federal Career Intelligence workspace.'
    });
    navigate('/home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out.'
    });
    navigate('/');
  };

  // Profile State
  const [profile, setProfile] = useState<CareerProfile>(initialCareerProfile);

  const updateProfile = (updated: Partial<CareerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    addToast({
      type: 'success',
      title: 'Career Profile Updated',
      message: 'Changes saved to your career profile.'
    });
  };

  // Evidence State
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(initialEvidenceItems);

  const addEvidence = (item: Omit<EvidenceItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = `ev-${Date.now().toString().slice(-4)}`;
    const newItem: EvidenceItem = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setEvidenceItems(prev => [newItem, ...prev]);
    addToast({
      type: 'success',
      title: 'Evidence Added',
      message: 'Evidence statement saved and ready for requirement mapping.'
    });
  };

  const updateEvidenceStatus = (id: string, status: EvidenceStatus) => {
    setEvidenceItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, verificationStatus: status, updatedAt: new Date().toISOString().split('T')[0] }
          : item
      )
    );
    const label = status === 'confirmed' ? 'Confirmed' : status === 'review' ? 'Marked for Review' : 'Marked Missing';
    addToast({
      type: 'info',
      title: `Evidence ${label}`,
      message: 'Requirement match evaluations updated.'
    });
  };

  const updateEvidenceStatement = (id: string, statement: string, notes?: string) => {
    setEvidenceItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              statement,
              notes: notes ?? item.notes,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );
    addToast({
      type: 'success',
      title: 'Evidence Statement Updated'
    });
  };

  const removeEvidence = (id: string) => {
    setEvidenceItems(prev => prev.filter(item => item.id !== id));
    addToast({
      type: 'warning',
      title: 'Evidence Removed',
      message: 'Evidence statement deleted from your vault.'
    });
  };

  // Jobs & Saved Jobs
  const [jobs] = useState<FederalJob[]>(initialFederalJobs);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([
    'va-0343-gs12',
    'dhs-2210-gs13',
    'epa-0301-gs13'
  ]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Job Removed from Saved',
          message: 'Removed from your saved federal jobs list.'
        });
        return prev.filter(id => id !== jobId);
      } else {
        addToast({
          type: 'success',
          title: 'Job Saved',
          message: 'Saved to your federal career list.'
        });
        return [...prev, jobId];
      }
    });
  };

  // Applications Tracker
  const [applications, setApplications] = useState<ApplicationRecord[]>(initialApplications);

  const addApplication = (app: Omit<ApplicationRecord, 'id'>) => {
    const newId = `app-${Date.now().toString().slice(-4)}`;
    const newRecord: ApplicationRecord = {
      ...app,
      id: newId
    };
    setApplications(prev => [newRecord, ...prev]);
    addToast({
      type: 'success',
      title: 'Application Added to Tracker',
      message: `Now tracking ${app.jobTitle} at ${app.agency}.`
    });
  };

  const updateApplicationStatus = (id: string, status: ApplicationRecord['status'], note?: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === id) {
          const newTimelineItem = {
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            title: `Status updated to ${status}`,
            description: note || `Application state moved to ${status}.`
          };
          return {
            ...app,
            status,
            notes: note ? `${app.notes}\n[${new Date().toLocaleDateString()}] ${note}` : app.notes,
            timeline: [newTimelineItem, ...app.timeline]
          };
        }
        return app;
      })
    );
    addToast({
      type: 'info',
      title: 'Status Updated',
      message: `Application moved to ${status}.`
    });
  };

  // Alerts
  const [alerts, setAlerts] = useState<JobAlert[]>(initialAlerts);

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    addToast({
      type: 'info',
      title: 'Alert Dismissed'
    });
  };

  // Billing & Entitlements State
  const [billing, setBilling] = useState<BillingState>({
    currentPlan: 'free',
    billingStatus: 'free',
    remainingFreeAnalyses: 3,
    unlockedJobs: ['va-0343-gs12'], // first one unlocked for demonstration
    subscriptionRenewalDate: undefined
  });

  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [billingTargetJobId, setBillingTargetJobId] = useState<string | undefined>();
  const [selectedBillingPlan, setSelectedBillingPlan] = useState<PlanType>('career_pass');

  const openBillingModal = (targetJobId?: string, preferredPlan?: PlanType) => {
    setBillingTargetJobId(targetJobId);
    if (preferredPlan) {
      setSelectedBillingPlan(preferredPlan);
    } else if (targetJobId) {
      setSelectedBillingPlan('job_analysis');
    } else {
      setSelectedBillingPlan('career_pass');
    }
    setIsBillingModalOpen(true);
  };

  const closeBillingModal = () => {
    setIsBillingModalOpen(false);
  };

  const isJobAnalysisUnlocked = (jobId: string) => {
    if (billing.currentPlan === 'career_pass' || billing.currentPlan === 'monthly') {
      return true;
    }
    return billing.unlockedJobs.includes(jobId);
  };

  const consumeFreeAnalysis = (jobId: string): boolean => {
    if (isJobAnalysisUnlocked(jobId)) {
      return true;
    }
    if (billing.remainingFreeAnalyses > 0) {
      setBilling(prev => ({
        ...prev,
        remainingFreeAnalyses: prev.remainingFreeAnalyses - 1,
        unlockedJobs: [...prev.unlockedJobs, jobId]
      }));
      addToast({
        type: 'info',
        title: 'Analysis Unlocked',
        message: `Unlocked with free allowance (${billing.remainingFreeAnalyses - 1} remaining this month).`
      });
      return true;
    }
    return false;
  };

  const upgradePlan = (plan: PlanType, jobId?: string) => {
    if (plan === 'job_analysis' && jobId) {
      setBilling(prev => ({
        ...prev,
        unlockedJobs: Array.from(new Set([...prev.unlockedJobs, jobId])),
        billingStatus: 'active'
      }));
      addToast({
        type: 'success',
        title: 'Job Analysis Unlocked',
        message: 'Comprehensive requirement mapping and eligibility assessment unlocked for this job.'
      });
    } else if (plan === 'career_pass') {
      setBilling(prev => ({
        ...prev,
        currentPlan: 'career_pass',
        billingStatus: 'active',
        subscriptionRenewalDate: 'Jan 3, 2027'
      }));
      addToast({
        type: 'success',
        title: 'Career Pass Activated',
        message: 'Unlimited federal job analyses, evidence mapping, and application prep enabled.'
      });
    } else if (plan === 'monthly') {
      setBilling(prev => ({
        ...prev,
        currentPlan: 'monthly',
        billingStatus: 'active',
        subscriptionRenewalDate: 'Nov 3, 2026'
      }));
      addToast({
        type: 'success',
        title: 'Monthly Subscription Activated',
        message: 'Continuous federal career intelligence unlocked.'
      });
    }
    closeBillingModal();
  };

  const simulateBillingStatus = (status: BillingState['billingStatus']) => {
    setBilling(prev => ({ ...prev, billingStatus: status }));
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        isAuthenticated,
        login,
        logout,
        profile,
        updateProfile,
        evidenceItems,
        addEvidence,
        updateEvidenceStatus,
        updateEvidenceStatement,
        removeEvidence,
        jobs,
        savedJobIds,
        toggleSaveJob,
        applications,
        addApplication,
        updateApplicationStatus,
        alerts,
        markAlertRead,
        dismissAlert,
        billing,
        openBillingModal,
        closeBillingModal,
        isBillingModalOpen,
        billingTargetJobId,
        selectedBillingPlan,
        setSelectedBillingPlan,
        upgradePlan,
        simulateBillingStatus,
        consumeFreeAnalysis,
        isJobAnalysisUnlocked,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
