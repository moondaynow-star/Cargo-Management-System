import React from 'react';

interface RoleBadgeProps {
  role: string;
}

/** Subtle, professional role tags. Unknown roles fall back to neutral. */
const roleClasses: Record<string, string> = {
  BRANCH: 'bg-info-light text-info border-info/20',
  'LEAD MANAGER': 'bg-violet-50 text-violet-700 border-violet-200',
  'SUPER HUB': 'bg-success-light text-emerald-700 border-success/25',
  OPERATIONS: 'bg-warning-light text-warning border-warning/25',
  HUB: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-control border text-[10.5px] font-semibold uppercase tracking-wide whitespace-nowrap ${
      roleClasses[role] ?? 'bg-slate-100 text-slate-600 border-slate-200'
    }`}
  >
    {role}
  </span>
);
