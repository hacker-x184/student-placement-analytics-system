import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Toast } from '../../components/common/Toast';
import {
  Calendar,
  Clock,
  Video,
  User,
  Briefcase,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

interface InterviewItem {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  date: string;
  time: string;
  interviewType: 'Technical Round 1' | 'System Design' | 'HR Final Round' | 'Coding Assessment';
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  meetingLink: string;
  interviewer: string;
}

const INITIAL_INTERVIEWS: InterviewItem[] = [
  {
    id: 'int-1',
    candidateName: 'Lucky Sharma',
    candidateEmail: 'lucky.s@college.edu',
    jobTitle: 'Software Engineer',
    date: '2026-08-20',
    time: '10:30 AM – 11:30 AM',
    interviewType: 'Technical Round 1',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewer: 'Arun Kumar (Lead Architect)',
  },
  {
    id: 'int-2',
    candidateName: 'Priya Patel',
    candidateEmail: 'priya.p@college.edu',
    jobTitle: 'Software Engineer',
    date: '2026-08-20',
    time: '02:00 PM – 03:00 PM',
    interviewType: 'System Design',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
    interviewer: 'Vikram Mehta (Engineering Manager)',
  },
  {
    id: 'int-3',
    candidateName: 'Rohan Verma',
    candidateEmail: 'rohan.v@college.edu',
    jobTitle: 'Frontend Engineer',
    date: '2026-08-19',
    time: '11:00 AM – 12:00 PM',
    interviewType: 'Coding Assessment',
    status: 'Completed',
    meetingLink: 'https://meet.google.com/qwe-rtyu-iop',
    interviewer: 'Sanjana Rao (Staff Frontend Eng)',
  },
  {
    id: 'int-4',
    candidateName: 'Ananya Deshmukh',
    candidateEmail: 'ananya.d@college.edu',
    jobTitle: 'Data Analyst',
    date: '2026-08-18',
    time: '04:00 PM – 04:45 PM',
    interviewType: 'HR Final Round',
    status: 'Completed',
    meetingLink: 'https://meet.google.com/zxc-vbnm-lkj',
    interviewer: 'Kavita Singh (Talent Partner)',
  },
];

export const CompanyInterviewsPage: React.FC<Props> = ({ onNavigate }) => {
  const [interviews, setInterviews] = useState<InterviewItem[]>(INITIAL_INTERVIEWS);
  const [filterTab, setFilterTab] = useState<'Upcoming' | 'Completed' | 'All'>('Upcoming');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Schedule / Reschedule Modal
  const [modalMode, setModalMode] = useState<'schedule' | 'reschedule' | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<InterviewItem | null>(null);
  const [formData, setFormData] = useState({
    candidateName: '',
    jobTitle: 'Software Engineer',
    date: '2026-08-22',
    time: '11:00 AM',
    interviewType: 'Technical Round 1',
    interviewer: 'Arun Kumar',
    meetingLink: 'https://meet.google.com/new-session',
  });

  const [toastMessage, setToastMessage] = useState<{ title: string; message: string; variant?: 'success' | 'warning' } | null>(null);

  const handleOpenSchedule = () => {
    setFormData({
      candidateName: '',
      jobTitle: 'Software Engineer',
      date: '2026-08-22',
      time: '11:00 AM',
      interviewType: 'Technical Round 1',
      interviewer: 'Arun Kumar',
      meetingLink: 'https://meet.google.com/new-session',
    });
    setModalMode('schedule');
  };

  const handleOpenReschedule = (int: InterviewItem) => {
    setSelectedInterview(int);
    setFormData({
      candidateName: int.candidateName,
      jobTitle: int.jobTitle,
      date: int.date,
      time: int.time,
      interviewType: int.interviewType,
      interviewer: int.interviewer,
      meetingLink: int.meetingLink,
    });
    setModalMode('reschedule');
  };

  const handleSaveInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName.trim()) return;

    if (modalMode === 'schedule') {
      const newInt: InterviewItem = {
        id: `int-${Date.now()}`,
        candidateName: formData.candidateName,
        candidateEmail: `${formData.candidateName.toLowerCase().replace(' ', '.')}@college.edu`,
        jobTitle: formData.jobTitle,
        date: formData.date,
        time: formData.time,
        interviewType: formData.interviewType as any,
        status: 'Scheduled',
        meetingLink: formData.meetingLink,
        interviewer: formData.interviewer,
      };
      setInterviews((prev) => [newInt, ...prev]);
      setToastMessage({
        title: 'Interview Scheduled',
        message: `Evaluation invite sent to ${formData.candidateName}.`,
        variant: 'success',
      });
    } else if (modalMode === 'reschedule' && selectedInterview) {
      setInterviews((prev) =>
        prev.map((i) =>
          i.id === selectedInterview.id
            ? {
                ...i,
                date: formData.date,
                time: formData.time,
                interviewType: formData.interviewType as any,
                status: 'Rescheduled',
              }
            : i
        )
      );
      setToastMessage({
        title: 'Interview Rescheduled',
        message: `Slot updated for ${selectedInterview.candidateName}.`,
        variant: 'success',
      });
    }
    setModalMode(null);
  };

  const filteredInterviews = interviews.filter((i) => {
    const matchesTab =
      filterTab === 'All' ||
      (filterTab === 'Upcoming' && (i.status === 'Scheduled' || i.status === 'Rescheduled')) ||
      (filterTab === 'Completed' && i.status === 'Completed');

    const matchesSearch =
      !searchQuery ||
      i.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.interviewer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="company-interviews-page">
      {toastMessage && (
        <Toast
          variant={toastMessage.variant || 'success'}
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Top Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Interview Schedule &amp; Panel Assessments
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Coordinate technical panels, system design evaluations, and HR rounds with the college placement cell.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenSchedule}
        >
          Schedule Interview
        </Button>
      </div>

      {/* Filter Strip */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate, role or interviewer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['Upcoming', 'Completed', 'All'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1 text-[12px] font-semibold rounded-[6px] transition-colors cursor-pointer ${
                filterTab === tab
                  ? 'bg-[#0A66C2] text-white shadow-xs'
                  : 'bg-[#F3F6F8] text-[#5E6670] hover:bg-[#E8F3FF] hover:text-[#0A66C2]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Interviews Table / List */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Date &amp; Time</th>
                <th className="py-3 px-4">Evaluation Round</th>
                <th className="py-3 px-4">Panel Interviewer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredInterviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#5E6670]">
                    No interviews found for the selected view.
                  </td>
                </tr>
              ) : (
                filteredInterviews.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFB] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1D2226]">{item.candidateName}</div>
                      <div className="text-[11px] text-[#7A828A]">{item.candidateEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1D2226]">
                      {item.jobTitle}
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670]">
                      <div className="font-semibold text-[#1D2226] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#7A828A]" />
                        {item.date}
                      </div>
                      <div className="text-[11px] text-[#7A828A] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[4px] text-[11px] font-semibold">
                        {item.interviewType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670] text-[12px]">
                      {item.interviewer}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={item.status === 'Completed' ? 'success' : item.status === 'Rescheduled' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={item.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-[#0A66C2] hover:bg-[#E8F3FF] rounded-[4px] inline-flex items-center gap-1 text-[11px] font-semibold"
                          title="Join Meeting"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Join</span>
                        </a>
                        <Button
                          variant="secondary"
                          size="xs"
                          onClick={() => handleOpenReschedule(item)}
                        >
                          Reschedule
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Schedule / Reschedule Modal */}
      {modalMode && (
        <Modal
          isOpen={true}
          onClose={() => setModalMode(null)}
          title={modalMode === 'schedule' ? 'Schedule Candidate Interview' : `Reschedule: ${formData.candidateName}`}
          size="md"
        >
          <form onSubmit={handleSaveInterview} className="space-y-4 text-[13px]">
            <Input
              label="Candidate Name *"
              value={formData.candidateName}
              onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
              placeholder="e.g. Lucky Sharma"
              disabled={modalMode === 'reschedule'}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                  Evaluation Round
                </label>
                <select
                  value={formData.interviewType}
                  onChange={(e) => setFormData({ ...formData, interviewType: e.target.value as any })}
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2]"
                >
                  <option>Technical Round 1</option>
                  <option>System Design</option>
                  <option>Coding Assessment</option>
                  <option>HR Final Round</option>
                </select>
              </div>

              <Input
                label="Assigned Panelist"
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                placeholder="e.g. Arun Kumar"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Interview Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <Input
                label="Time Slot"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="10:30 AM"
              />
            </div>

            <Input
              label="Video Conference URL"
              value={formData.meetingLink}
              onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D9DEE3]">
              <Button variant="ghost" size="sm" onClick={() => setModalMode(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {modalMode === 'schedule' ? 'Send Invitation' : 'Save Slot'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
