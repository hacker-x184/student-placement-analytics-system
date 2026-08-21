import React from 'react';
import { Badge } from '../../../../components/common/Badge';

export interface BatchItem {
  year: string;
  students: number;
  placed: number;
  status: string;
  isCurrent: boolean;
}

const DEFAULT_BATCHES: BatchItem[] = [
  { year: '2024', students: 840, placed: 711, status: 'Active (Current Season)', isCurrent: true },
  { year: '2023', students: 810, placed: 681, status: 'Archived (Completed)', isCurrent: false },
  { year: '2022', students: 760, placed: 624, status: 'Archived (Completed)', isCurrent: false },
  { year: '2025', students: 890, placed: 0, status: 'Pre-Registration Open', isCurrent: false },
];

export const CohortBatchesTab: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-slate-900">Academic Batches in System</h3>
      <p className="text-xs text-slate-500">
        Manage multi-year student rosters and placement archival.
      </p>

      <div className="space-y-3">
        {DEFAULT_BATCHES.map((b) => (
          <div
            key={b.year}
            className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900">Class of {b.year}</span>
                {b.isCurrent && <Badge variant="secondary" size="sm">Active Drive</Badge>}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {b.students} Enrolled Students • {b.placed} Placements Logged
              </p>
            </div>
            <Badge variant={b.isCurrent ? 'success' : 'neutral'} size="sm">
              {b.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
