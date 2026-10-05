import React from 'react';

export type StatusValue = 'Enable' | 'Disable';

interface StatusBadgeProps {
  status: StatusValue;
}

const dotClass: Record<StatusValue, string> = {
  Enable: 'bg-success',
  Disable: 'bg-danger',
};

/** Compact "● Enable" / "● Disable" presentation (no pill). */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className="inline-flex items-center gap-2 text-[13px] text-text-primary">
    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass[status]}`} />
    {status}
  </span>
);
