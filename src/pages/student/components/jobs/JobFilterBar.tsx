import React from 'react';
import { SearchInput } from '../../../../components/common/SearchInput';
import { Button } from '../../../../components/common/Button';
import { Select } from '../../../../components/common/Select';
import { Filter, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { BRANCH_OPTIONS } from '../../../../utils/constants';

export interface FilterState {
  search: string;
  branch: string;
  minCgpa: number | '';
  jobType: string;
  status: string;
  sortBy: 'deadline' | 'package_desc' | 'cgpa_asc' | 'match_desc';
}

export interface JobFilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const JobFilterBar: React.FC<JobFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const branchOptions = [
    { value: 'All', label: 'All Departments / Branches' },
    ...BRANCH_OPTIONS.map((b) => ({ value: b, label: b })),
    { value: 'CS', label: 'Computer Science (CS)' },
    { value: 'IT', label: 'Information Technology (IT)' },
    { value: 'ECE', label: 'Electronics & Communication (ECE)' },
  ];

  const cgpaOptions = [
    { value: '', label: 'All Minimum CGPA Criteria' },
    { value: '6.0', label: 'CGPA ≤ 6.0 (Open Eligibility)' },
    { value: '7.0', label: 'CGPA ≤ 7.0' },
    { value: '7.5', label: 'CGPA ≤ 7.5' },
    { value: '8.0', label: 'CGPA ≤ 8.0' },
    { value: '8.5', label: 'CGPA ≤ 8.5' },
  ];

  const statusOptions = [
    { value: 'All', label: 'All Drive Statuses' },
    { value: 'Active', label: 'Active Drives Only' },
    { value: 'Closed', label: 'Archived / Closed Drives' },
  ];

  const jobTypeOptions = [
    { value: 'All', label: 'All Work Arrangements' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' },
  ];

  const sortOptions = [
    { value: 'deadline', label: 'Sort: Status & Drive Date' },
    { value: 'package_desc', label: 'Sort: Package (Highest to Lowest)' },
    { value: 'cgpa_asc', label: 'Sort: CGPA Requirement (Low to High)' },
    { value: 'match_desc', label: 'Sort: Profile Match Score' },
  ];

  // Calculate number of active non-default filters
  const activeFiltersCount = [
    filters.search.trim() !== '',
    filters.branch !== 'All',
    filters.minCgpa !== '',
    filters.jobType !== 'All',
    filters.status !== 'All',
  ].filter(Boolean).length;

  return (
    <div
      id="jobs-filter-panel"
      className="bg-white border border-[#e2e8f0] rounded-xl p-4 sm:p-5 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] space-y-4"
    >
      {/* Search Input Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1">
          <SearchInput
            id="job-search-input"
            value={filters.search}
            onChange={(val) => onFilterChange('search', val)}
            placeholder="Search by job title, hiring company, required tech skills (e.g. Python, React)..."
            inputSize="md"
          />
        </div>

        {/* Sort Select */}
        <div className="w-full md:w-64 shrink-0">
          <Select
            id="job-sort-select"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
            size="md"
          />
        </div>
      </div>

      {/* Secondary Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {/* Department / Branch */}
        <Select
          id="filter-branch-select"
          options={branchOptions}
          value={filters.branch}
          onChange={(e) => onFilterChange('branch', e.target.value)}
          size="sm"
        />

        {/* Min CGPA Requirement */}
        <Select
          id="filter-cgpa-select"
          options={cgpaOptions}
          value={filters.minCgpa.toString()}
          onChange={(e) =>
            onFilterChange('minCgpa', e.target.value === '' ? '' : parseFloat(e.target.value))
          }
          size="sm"
        />

        {/* Work Arrangement */}
        <Select
          id="filter-jobtype-select"
          options={jobTypeOptions}
          value={filters.jobType}
          onChange={(e) => onFilterChange('jobType', e.target.value)}
          size="sm"
        />

        {/* Status */}
        <Select
          id="filter-status-select"
          options={statusOptions}
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          size="sm"
        />
      </div>

      {/* Filter Summary & Reset Action */}
      <div className="pt-3 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#434655]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#004ac6]" />
          <span>
            Found <strong className="font-bold text-[#0b1c30]">{totalResults}</strong> matching placement drives
          </span>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eff4ff] text-[#004ac6] border border-[#dce9ff]">
              {activeFiltersCount} active {activeFiltersCount === 1 ? 'filter' : 'filters'}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            id="btn-reset-filters"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004ac6] hover:text-[#003da6] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
