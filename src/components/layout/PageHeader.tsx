import React from 'react';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

/** Navy title bar at the top of a page card (e.g. "USER MANAGEMENT"). */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => (
  <div className="flex items-center justify-between px-5 bg-primary min-h-[var(--page-title-h)] flex-shrink-0">
    <h1 className="text-[14px] font-bold text-white uppercase tracking-wider">{title}</h1>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);
