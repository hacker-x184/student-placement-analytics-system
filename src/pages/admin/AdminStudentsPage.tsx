import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import {
  GraduationCap,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  BookOpen,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

interface StudentRosterItem {
  id: string;
  name: string;
  email: string;
  department: string;
  batch: string;
  cgpa: number;
  backlogs: number;
  skills: string[];
  placementStatus: 'Placed' | 'In Process' | 'Seeking';
  placedCompany?: string;
  placedPackage?: string;
}

const INITIAL_STUDENTS: StudentRosterItem[] = [
  {
    id: 'stu-1',
    name: 'Rahul Sharma',
    email: 'rahul.s@college.edu',
    department: 'Computer Science & Engineering',
    batch: '2026',
    cgpa: 9.2,
    backlogs: 0,
    skills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL'],
    placementStatus: 'Placed',
    placedCompany: 'Google India',
    placedPackage: '₹32.0 LPA',
  },
  {
    id: 'stu-2',
    name: 'Lucky Sharma',
    email: 'lucky.s@college.edu',
    department: 'Computer Science & Engineering',
    batch: '2027',
    cgpa: 8.7,
    backlogs: 0,
    skills: ['Python', 'React', 'SQL', 'FastAPI', 'Docker'],
    placementStatus: 'In Process',
  },
  {
    id: 'stu-3',
    name: 'Priya Shah',
    email: 'priya.s@college.edu',
    department: 'Information Technology',
    batch: '2026',
    cgpa: 8.9,
    backlogs: 0,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    placementStatus: 'Placed',
    placedCompany: 'Microsoft',
    placedPackage: '₹28.5 LPA',
  },
  {
    id: 'stu-4',
    name: 'Aman Verma',
    email: 'aman.v@college.edu',
    department: 'Electronics & Communication',
    batch: '2026',
    cgpa: 8.4,
    backlogs: 0,
    skills: ['Embedded C', 'Python', 'Verilog', 'IoT'],
    placementStatus: 'Placed',
    placedCompany: 'Qualcomm',
    placedPackage: '₹22.0 LPA',
  },
  {
    id: 'stu-5',
    name: 'Sneha Roy',
    email: 'sneha.r@college.edu',
    department: 'Computer Science & Engineering',
    batch: '2027',
    cgpa: 8.9,
    backlogs: 0,
    skills: ['React', 'Next.js', 'TypeScript', 'Figma'],
    placementStatus: 'In Process',
  },
  {
    id: 'stu-6',
    name: 'Vikram Singh',
    email: 'vikram.s@college.edu',
    department: 'Mechanical Engineering',
    batch: '2026',
    cgpa: 7.8,
    backlogs: 0,
    skills: ['SolidWorks', 'AutoCAD', 'Ansys', 'Python'],
    placementStatus: 'Seeking',
  },
  {
    id: 'stu-7',
    name: 'Kunal Singhania',
    email: 'kunal.s@college.edu',
    department: 'Information Technology',
    batch: '2026',
    cgpa: 8.6,
    backlogs: 0,
    skills: ['Python', 'SQL', 'Data Analytics', 'Tableau'],
    placementStatus: 'In Process',
  },
];

export const AdminStudentsPage: React.FC<Props> = ({ onNavigate }) => {
  const [students] = useState<StudentRosterItem[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedStudent, setSelectedStudent] = useState<StudentRosterItem | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesDept = deptFilter === 'All' || s.department.toLowerCase().includes(deptFilter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.placementStatus === statusFilter;
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-students-page">
      {/* Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Student Roster &amp; Academic Placement Directory
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Audit institutional student records, department eligibility, backlog status, and placement allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate?.('/admin/placements')}
          >
            Placement Register
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.('/admin/analytics')}
          >
            Analytics Workspace
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, email or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 text-[12px] font-medium bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none text-[#1D2226] cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">CSE</option>
            <option value="Information Technology">IT</option>
            <option value="Electronics">ECE</option>
            <option value="Mechanical">Mechanical</option>
          </select>

          {(['All', 'Placed', 'In Process', 'Seeking'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-[6px] transition-colors cursor-pointer ${
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

      {/* Students Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department &amp; Batch</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Backlogs</th>
                <th className="py-3 px-4">Placement Status</th>
                <th className="py-3 px-4">Allocation / Company</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#5E6670]">
                    No student records found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-[#F8FAFB] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={stu.name} size="sm" />
                        <div>
                          <div className="font-bold text-[#1D2226]">{stu.name}</div>
                          <div className="text-[11px] text-[#7A828A]">{stu.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670]">
                      <div className="font-medium text-[#1D2226]">{stu.department}</div>
                      <div className="text-[11px] text-[#7A828A]">Class of {stu.batch}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#1D2226]">
                      {stu.cgpa.toFixed(1)} / 10
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[12px] font-semibold ${stu.backlogs === 0 ? 'text-[#057642]' : 'text-[#CC1016]'}`}>
                        {stu.backlogs === 0 ? '0 (Clear)' : `${stu.backlogs} Backlog`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={stu.placementStatus === 'Placed' ? 'success' : stu.placementStatus === 'In Process' ? 'info' : 'warning'}
                        size="sm"
                      >
                        {stu.placementStatus}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      {stu.placedCompany ? (
                        <div>
                          <span className="font-semibold text-[#1D2226]">{stu.placedCompany}</span>
                          <span className="text-[11px] font-bold text-[#057642] block">{stu.placedPackage}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#7A828A]">Under Evaluation</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="xs"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedStudent(stu)}
                      >
                        Dossier
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Dossier Modal */}
      {selectedStudent && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedStudent(null)}
          title={`Institutional Student Dossier: ${selectedStudent.name}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <div className="flex items-center gap-3 p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3]">
              <Avatar name={selectedStudent.name} size="md" />
              <div className="flex-1">
                <div className="font-bold text-[15px] text-[#1D2226]">{selectedStudent.name}</div>
                <div className="text-[12px] text-[#5E6670]">{selectedStudent.email}</div>
                <div className="text-[11px] text-[#7A828A]">
                  {selectedStudent.department} • Batch {selectedStudent.batch}
                </div>
              </div>
              <Badge
                variant={selectedStudent.placementStatus === 'Placed' ? 'success' : 'info'}
                size="sm"
              >
                {selectedStudent.placementStatus}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-[#D9DEE3] rounded-[6px]">
                <span className="text-[11px] text-[#7A828A] block">Cumulative CGPA</span>
                <span className="text-[15px] font-bold text-[#1D2226]">{selectedStudent.cgpa} / 10</span>
              </div>
              <div className="p-3 border border-[#D9DEE3] rounded-[6px]">
                <span className="text-[11px] text-[#7A828A] block">Backlog Audit</span>
                <span className="text-[15px] font-bold text-[#057642]">
                  {selectedStudent.backlogs === 0 ? 'Clear (0)' : `${selectedStudent.backlogs}`}
                </span>
              </div>
            </div>

            {selectedStudent.placedCompany && (
              <div className="p-3 bg-[#E7F5EE] border border-[#A3E0C2] rounded-[6px] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#057642]">
                  Verified Campus Placement
                </span>
                <div className="text-[14px] font-bold text-[#1D2226]">
                  {selectedStudent.placedCompany} — {selectedStudent.placedPackage}
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
                Verified Technical Proficiencies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[4px] text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D9DEE3]">
              <Button variant="primary" size="sm" onClick={() => setSelectedStudent(null)}>
                Close Dossier
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
