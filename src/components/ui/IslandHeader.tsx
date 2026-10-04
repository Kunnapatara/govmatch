import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Bookmark,
  Briefcase,
  Bell,
  User,
  ShieldCheck,
  Settings,
  Sparkles,
  Menu,
  X,
  FileCheck2,
  ChevronDown,
  LogOut,
  ArrowRight
} from 'lucide-react';

export const IslandHeader: React.FC = () => {
  const { currentPath, navigate, alerts, savedJobIds, billing, openBillingModal, isAuthenticated, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  const navLinks = [
    { label: 'Home', path: '/home', icon: Briefcase },
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'Saved', path: '/saved', count: savedJobIds.length, icon: Bookmark },
    { label: 'Applications', path: '/applications', icon: Briefcase },
    { label: 'Alerts', path: '/alerts', count: unreadAlertsCount, icon: Bell }
  ];

  const secondaryLinks = [
    { label: 'Career Profile', path: '/profile', icon: User },
    { label: 'Evidence Vault', path: '/evidence', icon: FileCheck2 },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto w-full transition-all">
      <div className="bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-sm px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between transition-all">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNav(isAuthenticated ? '/home' : '/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-orange-600 transition-colors">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg text-stone-900 font-sans">
                  GOV<span className="text-orange-600">MATCH</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-stone-100 text-stone-600 rounded">
                  FED
                </span>
              </div>
              <p className="text-[10px] text-stone-500 tracking-tight font-medium hidden sm:block -mt-0.5">
                Evidence first. Your decision.
              </p>
            </div>
          </button>

          {/* Desktop Primary Nav */}
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = currentPath === link.path || (link.path !== '/home' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {typeof link.count === 'number' && link.count > 0 && (
                      <span
                        className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-orange-500 text-white' : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {link.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* Evidence Vault Quick Access (Desktop) */}
              <button
                onClick={() => handleNav('/evidence')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors border border-stone-200/70"
                title="Evidence Vault"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                <span>Evidence</span>
              </button>

              {/* Plan / Analysis Entitlement Pill */}
              <button
                onClick={() => openBillingModal()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-50 border border-orange-200 text-orange-800 hover:bg-orange-100 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>
                  {billing.currentPlan === 'career_pass'
                    ? 'Career Pass Active'
                    : billing.currentPlan === 'monthly'
                    ? 'Monthly Active'
                    : `${billing.remainingFreeAnalyses} Free Analyses`}
                </span>
              </button>

              {/* Profile & Secondary Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200 cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-xs">
                    MV
                  </div>
                  <span className="hidden md:inline text-xs font-medium text-stone-800">Morgan</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-semibold text-stone-900">Morgan Vance</p>
                      <p className="text-[11px] text-stone-500 truncate">morgan.vance@example.com</p>
                    </div>

                    <div className="py-1">
                      {secondaryLinks.map(link => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.path}
                            onClick={() => handleNav(link.path)}
                            className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900 flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Icon className="w-4 h-4 text-stone-500" />
                            <span>{link.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        onClick={() => openBillingModal()}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-orange-700 hover:bg-orange-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Upgrade / Plans</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Drawer Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('/login')}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('/signup')}
                className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-orange-600 text-white hover:bg-orange-700 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              Primary Navigation
            </p>
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.count === 'number' && link.count > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-orange-500 text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-stone-100 pt-3 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              Federal Workspace
            </p>
            {secondaryLinks.map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <Icon className="w-4 h-4 text-stone-500" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick plan upgrade in mobile drawer */}
          <div className="border-t border-stone-100 pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBillingModal();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 font-medium text-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>
                  {billing.currentPlan === 'career_pass'
                    ? 'Career Pass Active'
                    : `${billing.remainingFreeAnalyses} Free Analyses Remaining`}
                </span>
              </div>
              <span className="font-bold text-orange-700">View Plans →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
