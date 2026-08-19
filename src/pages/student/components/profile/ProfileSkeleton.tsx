import React from 'react';
import { Skeleton } from '../../../../components/common/Skeleton';
import { Card } from '../../../../components/common/Card';

export const ProfileSkeleton: React.FC = () => {
  return (
    <div
      className="space-y-6 animate-pulse"
      aria-busy="true"
      aria-label="Loading student profile"
    >
      {/* 1. Header Skeleton */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 sm:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Skeleton variant="rectangular" width={72} height={72} className="rounded-xl shrink-0" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="text" width={180} height={24} />
                <Skeleton variant="rectangular" width={90} height={20} className="rounded-full" />
              </div>
              <Skeleton variant="text" width={220} height={16} />
              <Skeleton variant="text" width={140} height={12} />
            </div>
          </div>
          <Skeleton variant="rectangular" width={130} height={40} className="rounded-lg shrink-0" />
        </div>

        {/* Completion Bar Skeleton */}
        <div className="pt-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="space-y-1.5 w-full max-w-sm">
            <Skeleton variant="text" width={140} height={16} />
            <Skeleton variant="text" width={240} height={12} />
          </div>
          <Skeleton variant="rectangular" width={180} height={10} className="rounded-full" />
        </div>
      </div>

      {/* 2. Personal & Academic Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default" padding="md" headerTitle="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton variant="text" width={80} height={12} />
                <Skeleton variant="text" width={140} height={18} />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="default" padding="md" headerTitle="Academic Information">
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#f8f9ff] p-3 rounded-lg space-y-1.5">
                <Skeleton variant="text" width={70} height={12} />
                <Skeleton variant="text" width={100} height={18} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 3. Skills Skeleton */}
      <Card variant="default" padding="md" headerTitle="Technical Skills & Competencies">
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={90 + (i % 4) * 20}
              height={32}
              className="rounded-lg"
            />
          ))}
        </div>
      </Card>

      {/* 4. Projects Skeleton */}
      <Card variant="default" padding="md" headerTitle="Technical Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[1, 2].map((i) => (
            <div key={i} className="border border-[#e2e8f0] rounded-xl p-4 space-y-3">
              <Skeleton variant="text" width={180} height={18} />
              <Skeleton variant="text" width="95%" height={14} />
              <Skeleton variant="text" width="80%" height={14} />
              <div className="flex gap-1.5 pt-1">
                <Skeleton variant="rectangular" width={60} height={20} className="rounded" />
                <Skeleton variant="rectangular" width={60} height={20} className="rounded" />
                <Skeleton variant="rectangular" width={60} height={20} className="rounded" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Internships & Certifications Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default" padding="md" headerTitle="Work & Internship Experience">
          <div className="space-y-3 pt-2">
            {[1, 2].map((i) => (
              <div key={i} className="border border-[#e2e8f0] rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <Skeleton variant="text" width={140} height={16} />
                  <Skeleton variant="rectangular" width={80} height={20} className="rounded-md" />
                </div>
                <Skeleton variant="text" width={110} height={12} />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="default" padding="md" headerTitle="Certifications & Accreditations">
          <div className="space-y-3 pt-2">
            {[1, 2].map((i) => (
              <div key={i} className="border border-[#e2e8f0] rounded-xl p-4 space-y-2">
                <Skeleton variant="text" width={160} height={16} />
                <Skeleton variant="text" width={100} height={12} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
