import React from 'react';
import { Skeleton } from '../../../../components/common/Skeleton';

export const ApplicationsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Metrics Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-3.5 bg-white border border-[#e2e8f0] rounded-xl space-y-2"
          >
            <div className="flex justify-between items-center">
              <Skeleton width="60%" height="12px" />
              <Skeleton width="20px" height="20px" rounded="md" />
            </div>
            <Skeleton width="40%" height="24px" />
          </div>
        ))}
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-between gap-4">
        <Skeleton width="300px" height="38px" rounded="lg" />
        <div className="flex items-center gap-2">
          <Skeleton width="80px" height="38px" rounded="lg" />
          <Skeleton width="80px" height="38px" rounded="lg" />
        </div>
      </div>

      {/* Table Skeletons */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4"><Skeleton width="120px" height="14px" /></div>
            <div className="col-span-3"><Skeleton width="90px" height="14px" /></div>
            <div className="col-span-3"><Skeleton width="100px" height="14px" /></div>
            <div className="col-span-2 text-right"><Skeleton width="60px" height="14px" /></div>
          </div>
        </div>

        <div className="divide-y divide-[#f1f5f9]">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="p-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 flex items-center gap-3">
                <Skeleton width="40px" height="40px" rounded="lg" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton width="80%" height="14px" />
                  <Skeleton width="50%" height="12px" />
                </div>
              </div>
              <div className="col-span-3 space-y-1">
                <Skeleton width="70%" height="14px" />
                <Skeleton width="40%" height="11px" />
              </div>
              <div className="col-span-3">
                <Skeleton width="100px" height="24px" rounded="full" />
              </div>
              <div className="col-span-2 flex justify-end">
                <Skeleton width="75px" height="32px" rounded="lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
