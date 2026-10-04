import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Bookmark, Briefcase, Bell } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate, savedJobIds, alerts, isAuthenticated } = useApp();

  if (!isAuthenticated) return null;

  const unreadAlerts = alerts.filter(a => !a.isRead).length;

  const items = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'Saved', path: '/saved', icon: Bookmark, badge: savedJobIds.length },
    { label: 'Tracker', path: '/applications', icon: Briefcase },
    { label: 'Alerts', path: '/alerts', icon: Bell, badge: unreadAlerts }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 lg:hidden px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path !== '/home' && currentPath.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-orange-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
