import React from 'react';
import { Skeleton } from '../../../../components/common/Skeleton';
import { Card } from '../../../../components/common/Card';

export const JobDetailsSkeleton: React.FC = () => {
  return (
    <div
      className="space-y-6 animate-pulse max-w-[1280px] mx-auto"
      aria-busy="true"
      aria-label="Loading job drive details"
    >
      {/* Back Button Skeleton */}
      <Skeleton variant="text" width={140} height={20} />

      {/* Header Banner Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Skeleton variant="rectangular" width={64} height={64} className="rounded-xl shrink-0" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="text" width={220} height={24} />
                <Skeleton variant="rectangular" width={80} height={20} className="rounded-full" />
              </div>
              <Skeleton variant="text" width={160} height={16} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton variant="rectangular" width={100} height={40} className="rounded-lg" />
            <Skeleton variant="rectangular" width={130} height={40} className="rounded-lg" />
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-[#e2e8f0]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#f8f9ff] p-3 rounded-lg space-y-1.5 border border-[#e2e8f0]">
              <Skeleton variant="text" width={60} height={10} />
              <Skeleton variant="text" width={90} height={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Description, Responsibilities, Skills, Selection Rounds */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="default" padding="md" headerTitle="Role Overview & Specifications">
            <div className="space-y-3 pt-2">
              <Skeleton variant="text" width="100%" height={14} />
              <Skeleton variant="text" width="95%" height={14} />
              <Skeleton variant="text" width="90%" height={14} />
              <Skeleton variant="text" width="70%" height={14} />
            </div>
          </Card>

          <Card variant="default" padding="md" headerTitle="Key Responsibilities & Scope">
            <div className="space-y-2.5 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Skeleton variant="rectangular" width={16} height={16} className="rounded shrink-0 mt-0.5" />
                  <Skeleton variant="text" width="90%" height={14} />
                </div>
              ))}
            </div>
          </Card>

          <Card variant="default" padding="md" headerTitle="Required & Preferred Skills">
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Skeleton variant="text" width={100} height={12} />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} variant="rectangular" width={70} height={26} className="rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Eligibility Card & Company Snapshot */}
        <div className="space-y-6">
          <Card variant="default" padding="md" headerTitle="Recruitment Eligibility Criteria">
            <div className="space-y-4 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-[#e2e8f0] last:border-0 last:pb-0">
                  <Skeleton variant="text" width={80} height={10} />
                  <Skeleton variant="text" width={140} height={16} />
                </div>
              ))}
            </div>
          </Card>

          <Card variant="default" padding="md" headerTitle="Hiring Organization">
            <div className="space-y-3 pt-2">
              <Skeleton variant="text" width={120} height={16} />
              <Skeleton variant="text" width="100%" height={12} />
              <Skeleton variant="text" width="90%" height={12} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
