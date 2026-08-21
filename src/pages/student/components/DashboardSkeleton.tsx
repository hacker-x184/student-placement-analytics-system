import React from 'react';
import { Skeleton } from '../../../components/common/Skeleton';
import { Card } from '../../../components/common/Card';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse" aria-busy="true" aria-label="Loading student dashboard">
      {/* 1. Header Skeleton */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-3 w-full max-w-lg">
          <div className="flex gap-2">
            <Skeleton variant="rectangular" width={180} height={22} className="rounded-full" />
            <Skeleton variant="rectangular" width={110} height={22} className="rounded-full" />
          </div>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="90%" height={16} />
        </div>
        <Skeleton variant="rectangular" width={220} height={42} className="rounded-lg shrink-0" />
      </div>

      {/* 2. KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-[#e2e8f0] p-5 space-y-3">
            <div className="flex justify-between items-start">
              <Skeleton variant="text" width={90} height={14} />
              <Skeleton variant="rectangular" width={36} height={36} className="rounded-lg" />
            </div>
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={140} height={14} />
          </div>
        ))}
      </div>

      {/* 3. Main Dashboard 12-Column Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recent Applications Skeleton */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-[#e2e8f0] flex justify-between items-center">
              <div className="space-y-1.5">
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={240} height={14} />
              </div>
              <Skeleton variant="rectangular" width={120} height={32} className="rounded-md" />
            </div>
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="rectangular" width={36} height={36} className="rounded-lg shrink-0" />
                    <div className="space-y-1">
                      <Skeleton variant="text" width={180} height={16} />
                      <Skeleton variant="text" width={120} height={12} />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Jobs Skeleton */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-[#e2e8f0] flex justify-between items-center">
              <div className="space-y-1.5">
                <Skeleton variant="text" width={180} height={20} />
                <Skeleton variant="text" width={280} height={14} />
              </div>
              <Skeleton variant="rectangular" width={100} height={32} className="rounded-md" />
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((card) => (
                <div key={card} className="bg-white rounded-lg border border-[#e2e8f0] p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <Skeleton variant="rectangular" width={36} height={36} className="rounded-lg" />
                    <Skeleton variant="rectangular" width={60} height={20} className="rounded-full" />
                  </div>
                  <Skeleton variant="text" width={120} height={16} />
                  <Skeleton variant="text" width={80} height={12} />
                  <div className="pt-2 flex justify-between">
                    <Skeleton variant="text" width={70} height={14} />
                    <Skeleton variant="rectangular" width={70} height={28} className="rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 4 Cols */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="default" padding="none">
            <div className="p-5 border-b border-[#e2e8f0]">
              <Skeleton variant="text" width={160} height={18} />
              <Skeleton variant="text" width={200} height={12} className="mt-1" />
            </div>
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((act) => (
                <div key={act} className="p-3 bg-[#f8f9ff] rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton variant="text" width={120} height={14} />
                    <Skeleton variant="rectangular" width={60} height={18} className="rounded-full" />
                  </div>
                  <Skeleton variant="text" width={90} height={12} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
