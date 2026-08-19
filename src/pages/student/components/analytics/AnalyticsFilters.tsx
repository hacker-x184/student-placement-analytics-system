import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { AnalyticsFilterParams } from '../../../../types';

export interface AnalyticsFiltersProps {
  filters: AnalyticsFilterParams;
  onFilterChange: (key: keyof AnalyticsFilterParams, value: string) => void;
  onResetFilters: () => void;
}

const BATCH_OPTIONS = [
  'All Batches',
  'Batch 2027',
  'Batch 2026',
  'Batch 2025',
  'Batch 2024',
];

const BRANCH_OPTIONS = [
  'All Branches',
  'Computer Science (CSE)',
  'Information Technology (IT)',
  'Electronics & Comm (ECE)',
  'Electrical Eng (EE)',
  'Mechanical Eng (ME)',
  'Civil Eng (CE)',
];

const YEAR_OPTIONS = [
  'All Years',
  '2026-27',
  '2025-26',
  '2024-25',
  '2023-24',
];

export const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const isFiltered = Boolean(
    (filters.batch && filters.batch !== 'All' && filters.batch !== 'All Batches') ||
    (filters.branch && filters.branch !== 'All' && filters.branch !== 'All Branches') ||
    (filters.year && filters.year !== 'All' && filters.year !== 'All Years')
  );

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-[0px_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Label */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#0b1c30] shrink-0">
          <Filter className="w-4 h-4 text-[#004ac6]" />
          <span>Analytics Filter Criteria:</span>
        </div>

        {/* Dropdown Filters Group */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-3xl">
          {/* 1. Batch Filter */}
          <div>
            <label htmlFor="filter-batch-select" className="block text-[11px] font-semibold text-[#737686] mb-1">
              Batch
            </label>
            <select
              id="filter-batch-select"
              value={filters.batch || 'All Batches'}
              onChange={(e) => onFilterChange('batch', e.target.value)}
              className="w-full text-xs bg-[#f8f9ff] text-[#0b1c30] border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004ac6] focus:bg-white font-medium"
            >
              {BATCH_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Branch / Department Filter */}
          <div>
            <label htmlFor="filter-branch-select" className="block text-[11px] font-semibold text-[#737686] mb-1">
              Branch / Department
            </label>
            <select
              id="filter-branch-select"
              value={filters.branch || 'All Branches'}
              onChange={(e) => onFilterChange('branch', e.target.value)}
              className="w-full text-xs bg-[#f8f9ff] text-[#0b1c30] border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004ac6] focus:bg-white font-medium"
            >
              {BRANCH_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Year / Academic Cycle Filter */}
          <div>
            <label htmlFor="filter-year-select" className="block text-[11px] font-semibold text-[#737686] mb-1">
              Academic Cycle Year
            </label>
            <select
              id="filter-year-select"
              value={filters.year || 'All Years'}
              onChange={(e) => onFilterChange('year', e.target.value)}
              className="w-full text-xs bg-[#f8f9ff] text-[#0b1c30] border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004ac6] focus:bg-white font-medium"
            >
              {YEAR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Action */}
        <div className="flex items-end shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!isFiltered}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isFiltered
                ? 'bg-rose-50 text-[#ba1a1a] hover:bg-rose-100 border border-rose-200 cursor-pointer'
                : 'bg-transparent text-[#737686] opacity-40 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
