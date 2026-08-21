import React from 'react';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { Badge } from '../../../../components/common/Badge';
import { Send } from 'lucide-react';

export interface NoticeItem {
  id: string;
  title: string;
  audience: string;
  date: string;
  status: string;
}

export interface BroadcastNoticesTabProps {
  noticeTitle: string;
  noticeBody: string;
  targetAudience: string;
  pastNotices: NoticeItem[];
  onTitleChange: (val: string) => void;
  onBodyChange: (val: string) => void;
  onAudienceChange: (val: string) => void;
  onSendBroadcast: (e: React.FormEvent) => void;
}

export const BroadcastNoticesTab: React.FC<BroadcastNoticesTabProps> = ({
  noticeTitle,
  noticeBody,
  targetAudience,
  pastNotices,
  onTitleChange,
  onBodyChange,
  onAudienceChange,
  onSendBroadcast,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* New Broadcast Form */}
      <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Broadcast Campus Notice</h3>
        <p className="text-xs text-slate-500">
          Instantly send verified circulars to student inboxes and student dashboard banner.
        </p>

        <form onSubmit={onSendBroadcast} className="space-y-3.5">
          <Input
            label="Circular Subject *"
            placeholder="e.g. Schedule Update for Amazon Campus Drive"
            value={noticeTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Cohort
            </label>
            <select
              value={targetAudience}
              onChange={(e) => onAudienceChange(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700"
            >
              <option value="All Final Year Students">All Final Year Students (840)</option>
              <option value="Computer Science & IT">Computer Science & IT (400)</option>
              <option value="Unplaced Students Only">Unplaced Students Only (129)</option>
              <option value="Eligible Tier 1 Candidates">
                Eligible Tier 1 Candidates (CGPA ≥ 8.0)
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notice Body *
            </label>
            <textarea
              rows={4}
              placeholder="Type the detailed circular contents, interview timings, or venue instructions..."
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={noticeBody}
              onChange={(e) => onBodyChange(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            leftIcon={<Send className="w-4 h-4" />}
          >
            Broadcast Circular
          </Button>
        </form>
      </div>

      {/* Past Broadcasts List */}
      <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Circulars & Bulletins</h3>
        <div className="divide-y divide-slate-100">
          {pastNotices.map((n) => (
            <div
              key={n.id}
              className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {n.audience} • {n.date}
                </p>
              </div>
              <Badge variant="success" size="sm">
                {n.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
