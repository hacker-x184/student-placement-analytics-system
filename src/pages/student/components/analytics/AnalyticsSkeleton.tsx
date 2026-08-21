import React from 'react';
import { Skeleton } from '../../../../components/common/Skeleton';

export const AnalyticsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <Skeleton className="h-8 w-48 rounded-lg" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
        </div>
      </div>

      {/* 6 KPI Cards Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`kpi-skel-${i}`}
            className="bg-white rounded-lg border border-[#e2e8f0] p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-7 w-28 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        ))}
      </div>

      {/* Grid of Chart Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`chart-skel-${i}`}
            className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-4 min-h-[340px]"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="h-3 w-64 rounded" />
              </div>
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-60 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
