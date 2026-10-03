import React from 'react';

interface ClientTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { key: string; label: string; count?: number }[];
}

export const ClientTabs: React.FC<ClientTabsProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="border-b border-border">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              relative px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors
              focus-ring
              ${
                activeTab === tab.key
                  ? 'text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`
                    text-[10px] px-1.5 py-0.5 rounded-full font-medium
                    ${
                      activeTab === tab.key
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-100 text-text-muted'
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {/* Active indicator */}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
