import React from 'react';
import { BarChart3, Download, Info } from 'lucide-react';
import { Button } from '../../../../components/common/Button';

export interface AnalyticsHeaderProps {
  onExportReport?: () => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ onExportReport }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#004ac6]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Placement Analytics
            </h1>
          </div>
        </div>
        <p className="text-sm text-[#434655] mt-1.5 font-normal">
          Institutional recruitment benchmarks, performance distributions, and hiring trends across departments and batches.
        </p>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8f9ff] border border-[#e2e8f0] text-xs text-[#737686]">
          <Info className="w-3.5 h-3.5 text-[#004ac6]" />
          <span>Active Institutional Dataset • Verified 2026-27</span>
        </div>
      </div>
    </div>
  );
};
