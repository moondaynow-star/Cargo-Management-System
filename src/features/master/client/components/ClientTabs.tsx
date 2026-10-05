import React from 'react';

interface ClientTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { key: string; label: string }[];
}

/** Left-aligned uppercase tabs sitting directly under the navy page title bar. */
export const ClientTabs: React.FC<ClientTabsProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex border-b border-border px-5 gap-1" role="tablist">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active}
            onClick={() => onTabChange(tab.key)}
            className={`relative px-4 h-11 text-[12px] font-semibold uppercase tracking-wider transition-colors focus-ring ${
              active ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab.label}
            {active && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" />}
          </button>
        );
      })}
    </div>
  );
};
