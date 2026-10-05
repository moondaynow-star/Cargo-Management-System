import React from 'react';
import { PageHeader } from './PageHeader';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * The page card: navy title bar + body. It fills the usable viewport height so
 * the pagination footer (mt-auto) sits at the bottom of the card.
 */
export const PageContainer: React.FC<PageContainerProps> = ({ title, children, actions }) => {
  return (
    <div className="flex flex-col min-h-[var(--page-min-h)] bg-white rounded-card border border-border overflow-hidden">
      <PageHeader title={title} actions={actions} />
      <div className="flex flex-col flex-1 min-w-0">{children}</div>
    </div>
  );
};
