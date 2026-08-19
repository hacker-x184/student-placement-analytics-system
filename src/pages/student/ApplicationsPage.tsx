import React, { useState, useEffect, useMemo } from 'react';
import { Application, ApplicationStatus } from '../../types';
import { applicationService, ApplicationFilterParams } from '../../services/applicationService';
import { ApplicationMetrics } from './components/applications/ApplicationMetrics';
import { ApplicationDetailsModal } from './components/applications/ApplicationDetailsModal';
import { ApplicationsSkeleton } from './components/applications/ApplicationsSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Toast } from '../../components/common/Toast';
import {
  Briefcase,
  Building2,
  Calendar,
  Search,
  X,
  ExternalLink,
  Eye,
  CheckCircle2,
  BookmarkCheck,
  Video,
  XCircle,
  Clock,
  ArrowRight,
  MapPin,
  Filter,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const ApplicationsPage: React.FC<Props> = ({ onNavigate }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await applicationService.getApplications();
      setApplications(data);
    } catch (err: any) {
      console.error('Failed to fetch applications:', err);
      setError(
        err?.message || 'Unable to retrieve your applications. Please check your network connection.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filtered applications based on search and status
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // 1. Status Filter
      if (statusFilter !== 'All') {
        const target = statusFilter.toLowerCase();
        const appStatus = app.status.toLowerCase();
        if (target === 'interview') {
          if (
            appStatus !== 'interview' &&
            appStatus !== 'technical interview' &&
            appStatus !== 'hr final round'
          ) {
            return false;
          }
        } else if (target === 'selected') {
          if (appStatus !== 'selected' && appStatus !== 'offered') {
            return false;
          }
        } else if (target === 'applied') {
          if (appStatus !== 'applied' && appStatus !== 'under review') {
            return false;
          }
        } else if (appStatus !== target) {
          return false;
        }
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = app.jobTitle.toLowerCase().includes(q);
        const matchCompany = app.company.toLowerCase().includes(q);
        const matchLocation = app.location ? app.location.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchCompany && !matchLocation) {
          return false;
        }
      }

      return true;
    });
  }, [applications, statusFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Selected':
      case 'Offered':
        return (
          <Badge variant="success" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Selected
          </Badge>
        );
      case 'Interview':
      case 'Technical Interview':
      case 'HR Final Round':
        return (
          <Badge variant="warning" size="sm" icon={<Video className="w-3.5 h-3.5" />}>
            Interview
          </Badge>
        );
      case 'Shortlisted':
        return (
          <Badge variant="secondary" size="sm" icon={<BookmarkCheck className="w-3.5 h-3.5" />}>
            Shortlisted
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge variant="danger" size="sm" icon={<XCircle className="w-3.5 h-3.5" />}>
            Rejected
          </Badge>
        );
      case 'Applied':
      case 'Under Review':
      default:
        return (
          <Badge variant="neutral" size="sm" icon={<Clock className="w-3.5 h-3.5" />}>
            Applied
          </Badge>
        );
    }
  };

  const handleOpenDetails = (app: Application) => {
    setSelectedApplication(app);
  };

  if (isLoading) {
    return (
      <div id="applications-loading-page" className="space-y-6 max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              My Applications
            </h1>
            <p className="text-sm text-[#434655] mt-1">Loading application records...</p>
          </div>
        </div>
        <ApplicationsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <ErrorState
          title="Applications Unavailable"
          message={error}
          onRetry={fetchApplications}
        />
      </div>
    );
  }

  const hasNoApplicationsAtAll = applications.length === 0;

  return (
    <div id="student-applications-page" className="space-y-6 max-w-[1280px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          variant="info"
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
          duration={4000}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            My Applications
          </h1>
          <p className="text-sm text-[#434655] mt-1 font-normal">
            Track your active campus recruitment drives, review stage evaluations, and access interview appointments.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button
            id="btn-browse-more-jobs"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate?.('/jobs')}
          >
            Browse Recruitment Drives
          </Button>
        </div>
      </div>

      {hasNoApplicationsAtAll ? (
        /* Empty State when no applications exist */
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 sm:p-12 shadow-[0px_1px_3px_rgba(15,23,42,0.05)]">
          <EmptyState
            title="No applications yet"
            description="You haven't submitted applications to any campus placement opportunities yet. Explore active company drives and apply with your registered profile."
            actionText="Browse Jobs"
            onAction={() => onNavigate?.('/jobs')}
          />
        </div>
      ) : (
        <>
          {/* 1. KPI Metrics Bar */}
          <ApplicationMetrics
            applications={applications}
            selectedStatus={statusFilter}
            onSelectStatus={(s) => setStatusFilter(s)}
          />

          {/* 2. Filter & Search Control Panel */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#737686] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-applications-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, company name, or location..."
                className="w-full pl-9 pr-8 py-2 text-xs text-[#0b1c30] bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004ac6] focus:bg-white placeholder-[#737686]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#0b1c30]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter Tabs / Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {['All', 'Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'].map((status) => {
                const isActive = statusFilter.toLowerCase() === status.toLowerCase();
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#004ac6] text-white shadow-xs'
                        : 'bg-[#f8f9ff] text-[#434655] hover:bg-[#eff4ff] hover:text-[#004ac6] border border-[#e2e8f0]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}

              {(searchQuery || statusFilter !== 'All') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#ba1a1a] hover:bg-rose-50 transition-colors ml-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* 3. Applications Results View */}
          {filteredApplications.length === 0 ? (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 text-center shadow-xs">
              <EmptyState
                title="No matching applications"
                description={`No application records match your search "${searchQuery}" or status filter "${statusFilter}".`}
                actionText="Clear Filters"
                onAction={handleResetFilters}
              />
            </div>
          ) : (
            <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.03)] overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-[#e2e8f0]">
                  <thead className="bg-[#f8fafc] text-[#434655] uppercase font-semibold">
                    <tr>
                      <th className="py-3.5 px-5">Role & Company</th>
                      <th className="py-3.5 px-4">Package & Location</th>
                      <th className="py-3.5 px-4">Applied Date</th>
                      <th className="py-3.5 px-4">Current Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9] bg-white">
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        onClick={() => handleOpenDetails(app)}
                        className="hover:bg-[#f8f9ff] transition-colors cursor-pointer group"
                      >
                        {/* 1. Role & Company */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#004ac6] font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                              {app.companyInitial || app.company.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-[#0b1c30] group-hover:text-[#004ac6] transition-colors truncate">
                                {app.jobTitle}
                              </p>
                              <p className="text-xs text-[#434655] font-medium truncate">
                                {app.company}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 2. Package & Location */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <span className="font-bold text-[#0b1c30] text-xs block">
                              {app.package || 'Competitive CTC'}
                            </span>
                            <span className="text-[11px] text-[#737686] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#737686]" />
                              {app.location || 'Multiple / Campus'}
                            </span>
                          </div>
                        </td>

                        {/* 3. Applied Date */}
                        <td className="py-4 px-4 text-[#434655]">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#737686]" />
                            <span>{app.appliedDate}</span>
                          </div>
                        </td>

                        {/* 4. Current Status */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(app.status)}
                          </div>
                        </td>

                        {/* 5. Actions */}
                        <td className="py-4 px-5 text-right">
                          <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              id={`btn-view-application-${app.id}`}
                              variant="outline"
                              size="sm"
                              leftIcon={<Eye className="w-3.5 h-3.5" />}
                              onClick={() => handleOpenDetails(app)}
                            >
                              Details
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="md:hidden divide-y divide-[#e2e8f0]">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleOpenDetails(app)}
                    className="p-4 hover:bg-[#f8f9ff] transition-colors space-y-3 cursor-pointer"
                  >
                    {/* Header: Avatar, Job Title, Company, and Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#004ac6] font-bold text-sm shrink-0">
                          {app.companyInitial || app.company.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-[#0b1c30] truncate">
                            {app.jobTitle}
                          </h4>
                          <p className="text-xs text-[#434655] font-medium truncate">{app.company}</p>
                        </div>
                      </div>
                      <div className="shrink-0">{getStatusBadge(app.status)}</div>
                    </div>

                    {/* Metadata Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-[#f8f9ff] px-3 rounded-lg border border-[#e2e8f0]">
                      <div>
                        <span className="text-[10px] text-[#737686] uppercase font-semibold block">
                          Package
                        </span>
                        <span className="font-bold text-[#0b1c30]">
                          {app.package || 'Competitive'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#737686] uppercase font-semibold block">
                          Applied
                        </span>
                        <span className="font-medium text-[#434655]">{app.appliedDate}</span>
                      </div>
                    </div>

                    {/* View Details Action */}
                    <div className="flex items-center justify-end pt-1">
                      <span className="text-xs font-bold text-[#004ac6] flex items-center gap-1">
                        <span>View Progress Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Application Details Modal with Progress Timeline */}
      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
        onNavigateToJob={(jobId) => onNavigate?.(`/jobs/${jobId}`)}
      />
    </div>
  );
};
