import React from 'react';
import { Skeleton } from '../../../../components/common/Skeleton';

export const JobsSkeleton: React.FC = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse"
      aria-busy="true"
      aria-label="Loading available recruitment drives"
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <Skeleton variant="rectangular" width={48} height={48} className="rounded-lg shrink-0" />
                <div className="space-y-1.5 min-w-0">
                  <Skeleton variant="text" width={140} height={18} />
                  <Skeleton variant="text" width={100} height={14} />
                </div>
              </div>
              <Skeleton variant="rectangular" width={64} height={22} className="rounded-full shrink-0" />
            </div>

            {/* Metric grid */}
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 py-3 border-y border-[#e2e8f0]">
              <div className="space-y-1">
                <Skeleton variant="text" width={50} height={10} />
                <Skeleton variant="text" width={80} height={14} />
              </div>
              <div className="space-y-1">
                <Skeleton variant="text" width={50} height={10} />
                <Skeleton variant="text" width={75} height={14} />
              </div>
              <div className="space-y-1">
                <Skeleton variant="text" width={60} height={10} />
                <Skeleton variant="text" width={50} height={14} />
              </div>
              <div className="space-y-1">
                <Skeleton variant="text" width={55} height={10} />
                <Skeleton variant="text" width={70} height={14} />
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Skeleton variant="rectangular" width={55} height={20} className="rounded" />
              <Skeleton variant="rectangular" width={65} height={20} className="rounded" />
              <Skeleton variant="rectangular" width={60} height={20} className="rounded" />
              <Skeleton variant="rectangular" width={45} height={20} className="rounded" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-2 border-t border-[#e2e8f0]">
            <Skeleton variant="rectangular" width="100%" height={36} className="rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
