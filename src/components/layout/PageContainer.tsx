import React from 'react';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
  actions,
}) => {
  return (
    <div className="bg-white rounded-lg border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Page title bar - dark navy inspired by Image 1 */}
      <div className="flex items-center justify-between px-6 py-3 bg-primary rounded-t-lg min-h-[44px]">
        <h1 className="text-[15px] font-bold text-white uppercase tracking-wider">
          {title}
        </h1>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Content area */}
      <div>{children}</div>
    </div>
  );
};
