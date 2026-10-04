import React from 'react';
import { EvidenceStatus, MatchStatus, EligibilityStatus, ReadinessStatus } from '../../types';

interface StatusBadgeProps {
  type: 'evidence' | 'match' | 'eligibility' | 'readiness';
  status: EvidenceStatus | MatchStatus | EligibilityStatus | ReadinessStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  status,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  let label = '';
  let colorClass = '';
  let dotColor = '';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium gap-1 rounded-full',
    md: 'text-xs md:text-sm px-2.5 py-1 font-medium gap-1.5 rounded-full',
    lg: 'text-sm md:text-base px-3.5 py-1.5 font-semibold gap-2 rounded-full'
  }[size];

  if (type === 'evidence') {
    switch (status as EvidenceStatus) {
      case 'confirmed':
        label = '✓ Confirmed';
        colorClass = 'bg-emerald-50 text-emerald-800 border border-emerald-200/80';
        break;
      case 'review':
        label = '⚠ Review';
        colorClass = 'bg-amber-50 text-amber-800 border border-amber-200/80';
        break;
      case 'missing':
      default:
        label = '○ Missing';
        colorClass = 'bg-stone-100 text-stone-600 border border-stone-200';
        break;
    }
  } else if (type === 'match') {
    switch (status as MatchStatus) {
      case 'good':
        label = 'Good Match';
        dotColor = 'bg-emerald-500';
        colorClass = 'bg-emerald-50 text-emerald-900 border border-emerald-200';
        break;
      case 'gaps':
        label = 'Some Gaps';
        dotColor = 'bg-amber-500';
        colorClass = 'bg-amber-50 text-amber-900 border border-amber-200';
        break;
      case 'info':
        label = 'Need More Info';
        dotColor = 'bg-sky-500';
        colorClass = 'bg-sky-50 text-sky-900 border border-sky-200';
        break;
      case 'issue':
      default:
        label = 'Possible Issue';
        dotColor = 'bg-rose-500';
        colorClass = 'bg-rose-50 text-rose-900 border border-rose-200';
        break;
    }
  } else if (type === 'eligibility') {
    switch (status as EligibilityStatus) {
      case 'looks_good':
        label = '✓ Looks Good';
        colorClass = 'bg-emerald-50 text-emerald-800 border border-emerald-200';
        break;
      case 'needs_review':
        label = '⚠ Needs Review';
        colorClass = 'bg-amber-50 text-amber-800 border border-amber-200';
        break;
      case 'need_info':
        label = '? Need More Info';
        colorClass = 'bg-sky-50 text-sky-800 border border-sky-200';
        break;
      case 'possible_issue':
      default:
        label = '! Possible Issue';
        colorClass = 'bg-rose-50 text-rose-800 border border-rose-200';
        break;
    }
  } else if (type === 'readiness') {
    switch (status as ReadinessStatus) {
      case 'ready':
        label = '✓ Ready';
        colorClass = 'bg-emerald-50 text-emerald-800 border border-emerald-200';
        break;
      case 'almost_ready':
        label = '⚠ Almost Ready';
        colorClass = 'bg-amber-50 text-amber-800 border border-amber-200';
        break;
      case 'not_ready':
      default:
        label = '○ Not Ready Yet';
        colorClass = 'bg-stone-100 text-stone-700 border border-stone-200';
        break;
    }
  }

  // For Match, we render the locked colored circle: 🟢 🟡 🔵 🔴 or dot
  if (type === 'match') {
    return (
      <span
        className={`inline-flex items-center tracking-tight transition-colors shadow-2xs ${sizeClasses} ${colorClass} ${className}`}
        role="status"
        aria-label={`Match status: ${label}`}
      >
        {showIcon && (
          <span
            className={`rounded-full shrink-0 ${
              size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'
            } ${dotColor}`}
            aria-hidden="true"
          />
        )}
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center tracking-tight transition-colors shadow-2xs ${sizeClasses} ${colorClass} ${className}`}
      role="status"
      aria-label={`${type} status: ${label}`}
    >
      <span>{label}</span>
    </span>
  );
};
