import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'line' | 'pills';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'line',
  className = '',
}) => {
  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-1.5 p-1 bg-[#eff4ff] rounded-lg border border-[#dce9ff] ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-white text-[#004ac6] shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
                  : 'text-[#434655] hover:text-[#0b1c30] hover:bg-white/50'
              }`}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#eff4ff] text-[#004ac6]' : 'bg-[#d3e4fe] text-[#434655]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`border-b border-[#e2e8f0] w-full ${className}`}>
      <nav className="-mb-px flex space-x-6 overflow-x-auto scrollbar-none" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                isActive
                  ? 'border-[#2563eb] text-[#004ac6]'
                  : 'border-transparent text-[#434655] hover:text-[#0b1c30] hover:border-[#c3c6d7]'
              }`}
            >
              {tab.icon && (
                <span className={isActive ? 'text-[#004ac6]' : 'text-[#737686]'}>
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-[#eff4ff] text-[#004ac6]'
                      : 'bg-[#f1f5f9] text-[#737686]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
