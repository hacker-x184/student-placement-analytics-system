import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Users,
  Eye,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

interface RecruiterRecord {
  id: string;
  name: string;
  industry: string;
  location: string;
  activeJobs: number;
  totalPlaced: number;
  avgPackage: string;
  hiringStatus: 'Active Drive' | 'Completed' | 'Upcoming';
  tier: 'Dream' | 'Super Dream' | 'Core';
}

const INITIAL_COMPANIES: RecruiterRecord[] = [
  {
    id: 'comp-1',
    name: 'Google India',
    industry: 'Internet & Cloud Services',
    location: 'Bengaluru / Hyderabad',
    activeJobs: 3,
    totalPlaced: 18,
    avgPackage: '₹32.5 LPA',
    hiringStatus: 'Active Drive',
    tier: 'Super Dream',
  },
  {
    id: 'comp-2',
    name: 'Microsoft',
    industry: 'Enterprise Software & Azure',
    location: 'Hyderabad / Noida',
    activeJobs: 2,
    totalPlaced: 24,
    avgPackage: '₹28.0 LPA',
    hiringStatus: 'Active Drive',
    tier: 'Super Dream',
  },
  {
    id: 'comp-3',
    name: 'TechNova Solutions',
    industry: 'Cloud Infrastructure & AI',
    location: 'Bengaluru, India',
    activeJobs: 4,
    totalPlaced: 32,
    avgPackage: '₹15.2 LPA',
    hiringStatus: 'Active Drive',
    tier: 'Dream',
  },
  {
    id: 'comp-4',
    name: 'Qualcomm',
    industry: 'Semiconductors & Wireless',
    location: 'Bengaluru / Chennai',
    activeJobs: 1,
    totalPlaced: 12,
    avgPackage: '₹22.0 LPA',
    hiringStatus: 'Completed',
    tier: 'Super Dream',
  },
  {
    id: 'comp-5',
    name: 'Deloitte India',
    industry: 'Consulting & Technology Advisory',
    location: 'Mumbai / Gurugram',
    activeJobs: 2,
    totalPlaced: 45,
    avgPackage: '₹10.5 LPA',
    hiringStatus: 'Upcoming',
    tier: 'Core',
  },
];

export const AdminCompaniesPage: React.FC<Props> = ({ onNavigate }) => {
  const [companies] = useState<RecruiterRecord[]>(INITIAL_COMPANIES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<RecruiterRecord | null>(null);

  const filteredCompanies = companies.filter((c) => {
    const matchesStatus = statusFilter === 'All' || c.hiringStatus === statusFilter;
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-companies-page">
      {/* Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Corporate Recruitment Partners
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Directory of verified corporate recruiters, campus drive statuses, and placement allocations.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate?.('/admin/jobs')}
        >
          View Campus Drives
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, industry or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['All', 'Active Drive', 'Completed', 'Upcoming'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-[12px] font-semibold rounded-[6px] transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0A66C2] text-white shadow-xs'
                  : 'bg-[#F3F6F8] text-[#5E6670] hover:bg-[#E8F3FF] hover:text-[#0A66C2]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Industry &amp; Tier</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Active Drives</th>
                <th className="py-3 px-4">Total Placed</th>
                <th className="py-3 px-4">Avg Package</th>
                <th className="py-3 px-4">Drive Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredCompanies.map((comp) => (
                <tr key={comp.id} className="hover:bg-[#F8FAFB] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[6px] bg-[#E8F3FF] text-[#0A66C2] font-bold text-[13px] flex items-center justify-center border border-[#B3D7FF] shrink-0">
                        {comp.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="font-bold text-[#1D2226]">{comp.name}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#5E6670]">
                    <div className="font-medium text-[#1D2226]">{comp.industry}</div>
                    <span className="text-[10px] font-bold text-[#0A66C2] bg-[#E8F3FF] px-1.5 py-0.2 rounded">
                      {comp.tier} Tier
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5E6670] text-[12px]">
                    {comp.location}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#0A66C2]">
                    {comp.activeJobs} Roles
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1D2226]">
                    {comp.totalPlaced} Students
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#057642]">
                    {comp.avgPackage}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={comp.hiringStatus === 'Active Drive' ? 'success' : comp.hiringStatus === 'Upcoming' ? 'info' : 'neutral'}
                      size="sm"
                    >
                      {comp.hiringStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => setSelectedCompany(comp)}
                    >
                      View Partner
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Partner Modal */}
      {selectedCompany && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCompany(null)}
          title={`Corporate Partner: ${selectedCompany.name}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <div className="p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Industry Domain:</span>
                <span className="font-bold text-[#1D2226]">{selectedCompany.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Placement Tier:</span>
                <span className="font-bold text-[#0A66C2]">{selectedCompany.tier} Tier</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Historical Institutional Hires:</span>
                <span className="font-bold text-[#057642]">{selectedCompany.totalPlaced} Offers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Average Campus Compensation:</span>
                <span className="font-bold text-[#1D2226]">{selectedCompany.avgPackage}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D9DEE3]">
              <Button variant="primary" size="sm" onClick={() => setSelectedCompany(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
