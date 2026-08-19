import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import {
  Award,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Building2,
  Calendar,
  Download,
  DollarSign,
  FileCheck,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

interface PlacementRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  department: string;
  company: string;
  jobTitle: string;
  packageValue: number; // in LPA
  packageDisplay: string;
  placementDate: string;
  offerLetterStatus: 'Verified' | 'Pending Verification';
}

const INITIAL_PLACEMENTS: PlacementRecord[] = [
  {
    id: 'plc-1',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.s@college.edu',
    department: 'Computer Science & Engineering',
    company: 'Google India',
    jobTitle: 'Software Engineer',
    packageValue: 32.0,
    packageDisplay: '₹32.0 LPA',
    placementDate: '2026-08-10',
    offerLetterStatus: 'Verified',
  },
  {
    id: 'plc-2',
    studentName: 'Priya Shah',
    studentEmail: 'priya.s@college.edu',
    department: 'Information Technology',
    company: 'Microsoft',
    jobTitle: 'Full Stack Engineer',
    packageValue: 28.5,
    packageDisplay: '₹28.5 LPA',
    placementDate: '2026-08-12',
    offerLetterStatus: 'Verified',
  },
  {
    id: 'plc-3',
    studentName: 'Aman Verma',
    studentEmail: 'aman.v@college.edu',
    department: 'Electronics & Communication',
    company: 'Qualcomm',
    jobTitle: 'Hardware Systems Engineer',
    packageValue: 22.0,
    packageDisplay: '₹22.0 LPA',
    placementDate: '2026-08-14',
    offerLetterStatus: 'Verified',
  },
  {
    id: 'plc-4',
    studentName: 'Ananya Deshmukh',
    studentEmail: 'ananya.d@college.edu',
    department: 'Electronics & Communication',
    company: 'TechNova Global',
    jobTitle: 'Data Analyst',
    packageValue: 11.0,
    packageDisplay: '₹11.0 LPA',
    placementDate: '2026-08-15',
    offerLetterStatus: 'Verified',
  },
  {
    id: 'plc-5',
    studentName: 'Siddharth Nair',
    studentEmail: 'sid.n@college.edu',
    department: 'Computer Science & Engineering',
    company: 'Amazon AWS',
    jobTitle: 'Cloud Support Associate',
    packageValue: 18.0,
    packageDisplay: '₹18.0 LPA',
    placementDate: '2026-08-16',
    offerLetterStatus: 'Verified',
  },
  {
    id: 'plc-6',
    studentName: 'Deepak Chawla',
    studentEmail: 'deepak.c@college.edu',
    department: 'Information Technology',
    company: 'Deloitte India',
    jobTitle: 'Tech Consultant',
    packageValue: 10.5,
    packageDisplay: '₹10.5 LPA',
    placementDate: '2026-08-17',
    offerLetterStatus: 'Pending Verification',
  },
];

export const AdminPlacementsPage: React.FC<Props> = ({ onNavigate }) => {
  const [placements] = useState<PlacementRecord[]>(INITIAL_PLACEMENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<PlacementRecord | null>(null);

  const filteredPlacements = placements.filter((p) => {
    const matchesDept = deptFilter === 'All' || p.department.toLowerCase().includes(deptFilter.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-placements-page">
      {/* Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Institutional Placement Register &amp; Verified Records
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Official repository of issued campus placement offer letters, verified CTC allocations, and institutional archives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Official Placement Report exported as CSV.')}
          >
            Export Register
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.('/admin/analytics')}
          >
            Placement Analytics
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Total Placed Offers
          </span>
          <div className="text-[24px] font-bold text-[#1D2226]">1,280</div>
          <span className="text-[11px] font-semibold text-[#057642]">
            +14% vs Previous Academic Year
          </span>
        </div>

        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Average Institutional CTC
          </span>
          <div className="text-[24px] font-bold text-[#0A66C2]">₹11.8 LPA</div>
          <span className="text-[11px] text-[#5E6670]">Median: ₹9.5 LPA</span>
        </div>

        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Highest Institutional CTC
          </span>
          <div className="text-[24px] font-bold text-[#057642]">₹48.5 LPA</div>
          <span className="text-[11px] text-[#5E6670]">Super Dream Tier (Google)</span>
        </div>

        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Placement Completion
          </span>
          <div className="text-[24px] font-bold text-[#1D2226]">84.2%</div>
          <span className="text-[11px] font-semibold text-[#057642]">On track for 90%+ target</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student, recruiter or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 text-[12px] font-medium bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none text-[#1D2226] cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics &amp; Comm</option>
          </select>
        </div>
      </div>

      {/* Placements Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Placed Student</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Recruiter</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Compensation (CTC)</th>
                <th className="py-3 px-4">Placement Date</th>
                <th className="py-3 px-4">Offer Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredPlacements.map((plc) => (
                <tr key={plc.id} className="hover:bg-[#F8FAFB] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={plc.studentName} size="sm" />
                      <div>
                        <div className="font-bold text-[#1D2226]">{plc.studentName}</div>
                        <div className="text-[11px] text-[#7A828A]">{plc.studentEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#5E6670]">
                    {plc.department}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1D2226]">
                    {plc.company}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#1D2226]">
                    {plc.jobTitle}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#057642]">
                    {plc.packageDisplay}
                  </td>
                  <td className="py-3.5 px-4 text-[#5E6670] text-[12px]">
                    {plc.placementDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={plc.offerLetterStatus === 'Verified' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {plc.offerLetterStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => setSelectedRecord(plc)}
                    >
                      Audit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Audit Modal */}
      {selectedRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecord(null)}
          title={`Verified Placement Record: ${selectedRecord.studentName}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <div className="p-3.5 bg-[#E7F5EE] border border-[#A3E0C2] rounded-[6px] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-[#057642]" />
                <div>
                  <div className="font-bold text-[#1D2226] text-[14px]">
                    {selectedRecord.company} — {selectedRecord.packageDisplay}
                  </div>
                  <div className="text-[11px] text-[#057642]">
                    Verified Offer Letter on Institutional Record
                  </div>
                </div>
              </div>
              <Badge variant="success" size="sm">
                Verified
              </Badge>
            </div>

            <div className="p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Student Name:</span>
                <span className="font-bold text-[#1D2226]">{selectedRecord.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Institutional Email:</span>
                <span className="text-[#1D2226]">{selectedRecord.studentEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Department:</span>
                <span className="text-[#1D2226]">{selectedRecord.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Placement Date:</span>
                <span className="text-[#1D2226]">{selectedRecord.placementDate}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D9DEE3]">
              <Button variant="primary" size="sm" onClick={() => setSelectedRecord(null)}>
                Close Audit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
