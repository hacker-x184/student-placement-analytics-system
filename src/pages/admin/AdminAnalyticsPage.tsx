import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Building2,
  PieChart,
  ArrowUpRight,
  Download,
  Filter,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const AdminAnalyticsPage: React.FC<Props> = ({ onNavigate }) => {
  const departmentStats = [
    { name: 'Computer Science & Engineering', placedPct: 94.2, totalStudents: 320, placed: 301, avgCtc: '₹14.8 LPA' },
    { name: 'Information Technology', placedPct: 91.5, totalStudents: 240, placed: 220, avgCtc: '₹13.2 LPA' },
    { name: 'Electronics & Communication', placedPct: 82.0, totalStudents: 280, placed: 230, avgCtc: '₹10.5 LPA' },
    { name: 'Mechanical Engineering', placedPct: 74.5, totalStudents: 200, placed: 149, avgCtc: '₹7.8 LPA' },
    { name: 'Civil Engineering', placedPct: 68.0, totalStudents: 150, placed: 102, avgCtc: '₹6.5 LPA' },
  ];

  const ctcDistribution = [
    { range: '25+ LPA (Super Dream)', count: 68, percentage: 6.8, color: '#057642' },
    { range: '15–25 LPA (Dream)', count: 245, percentage: 24.5, color: '#0A66C2' },
    { range: '10–15 LPA (Tier-1)', count: 380, percentage: 38.0, color: '#378FE9' },
    { range: '6–10 LPA (Standard)', count: 240, percentage: 24.0, color: '#88C0F7' },
    { range: '<6 LPA (Core)', count: 67, percentage: 6.7, color: '#D9DEE3' },
  ];

  const topRecruiters = [
    { name: 'TechNova Global', hires: 64, avgPackage: '₹15.2 LPA' },
    { name: 'Deloitte India', hires: 52, avgPackage: '₹10.5 LPA' },
    { name: 'Amazon AWS', hires: 41, avgPackage: '₹18.0 LPA' },
    { name: 'Google India', hires: 28, avgPackage: '₹32.5 LPA' },
    { name: 'Microsoft', hires: 24, avgPackage: '₹28.0 LPA' },
  ];

  const skillDemandAnalysis = [
    { skill: 'Python / Backend APIs', marketDemand: 95, studentProficiency: 88 },
    { skill: 'React & Modern Frontend', marketDemand: 92, studentProficiency: 84 },
    { skill: 'Cloud & Kubernetes', marketDemand: 88, studentProficiency: 62 },
    { skill: 'Data Analytics & SQL', marketDemand: 85, studentProficiency: 79 },
    { skill: 'System Design & Scalability', marketDemand: 82, studentProficiency: 58 },
  ];

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-analytics-page">
      {/* Top Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Campus Placement Analytics &amp; Hiring Intelligence
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Comprehensive institutional analytics, department placement velocity, compensation brackets, and industry skill demand trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Exporting Official Institutional Report')}
          >
            Export Comprehensive Report
          </Button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Overall Placement Rate
          </span>
          <div className="text-[26px] font-bold text-[#057642]">84.2%</div>
          <span className="text-[11px] font-semibold text-[#057642] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +5.4% YoY Growth
          </span>
        </div>

        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Average Compensation (CTC)
          </span>
          <div className="text-[26px] font-bold text-[#0A66C2]">₹11.8 LPA</div>
          <span className="text-[11px] text-[#5E6670]">Median: ₹9.5 LPA</span>
        </div>

        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Participating Recruiters
          </span>
          <div className="text-[26px] font-bold text-[#1D2226]">148 Companies</div>
          <span className="text-[11px] font-semibold text-[#057642]">38 Tier-1 Recruiters</span>
        </div>

        <div className="p-4 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
            Highest Compensation (CTC)
          </span>
          <div className="text-[26px] font-bold text-[#1D2226]">₹48.5 LPA</div>
          <span className="text-[11px] text-[#5E6670]">International/Product Tier</span>
        </div>
      </div>

      {/* Charts Grid 1: Department Placement Performance & CTC Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Placement Velocity (7 cols) */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-[16px] font-bold text-[#1D2226]">
                Placement Velocity by Academic Department
              </h2>
              <p className="text-[12px] text-[#5E6670]">
                Percentage of registered eligible batch placed with active offers.
              </p>
            </div>

            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="font-semibold text-[#1D2226]">{dept.name}</span>
                    <span className="font-bold text-[#057642]">{dept.placedPct}%</span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-2.5 bg-[#E8ECEF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A66C2] rounded-full transition-all duration-500"
                      style={{ width: `${dept.placedPct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-[#7A828A]">
                    <span>{dept.placed} of {dept.totalStudents} Students Placed</span>
                    <span>Avg: <strong className="text-[#1D2226]">{dept.avgCtc}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTC Distribution Brackets (5 cols) */}
        <div className="lg:col-span-5">
          <Card variant="default" className="p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-[16px] font-bold text-[#1D2226]">
                CTC Package Distribution
              </h2>
              <p className="text-[12px] text-[#5E6670]">
                Share of campus offers categorized by annual compensation tiers.
              </p>
            </div>

            <div className="space-y-3.5">
              {ctcDistribution.map((item) => (
                <div key={item.range} className="space-y-1">
                  <div className="flex justify-between text-[12px]">
                    <span className="font-semibold text-[#1D2226]">{item.range}</span>
                    <span className="font-bold text-[#1D2226]">
                      {item.count} Offers ({item.percentage}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#E8ECEF] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#D9DEE3] text-[12px] text-[#5E6670] flex items-center justify-between">
              <span>Dream Tier (15+ LPA):</span>
              <strong className="text-[#057642]">31.3% of all offers</strong>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts Grid 2: Top Recruiter Hiring Volume & Skill Demand Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Recruiters by Hires (6 cols) */}
        <div className="lg:col-span-6">
          <Card variant="default" className="p-5 sm:p-6 space-y-4">
            <h2 className="text-[16px] font-bold text-[#1D2226]">
              Top Institutional Recruiters (Hire Volume)
            </h2>

            <div className="divide-y divide-[#D9DEE3] border border-[#D9DEE3] rounded-[6px] overflow-hidden text-[13px]">
              {topRecruiters.map((r, idx) => (
                <div key={r.name} className="p-3.5 flex items-center justify-between bg-white hover:bg-[#F8FAFB]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#F3F6F8] text-[#5E6670] font-bold text-[11px] flex items-center justify-center border border-[#D9DEE3]">
                      #{idx + 1}
                    </span>
                    <div className="font-bold text-[#1D2226]">{r.name}</div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-[#0A66C2]">{r.hires} Hires</span>
                    <span className="text-[11px] text-[#7A828A] block">Avg: {r.avgPackage}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Skill Demand vs Student Readiness (6 cols) */}
        <div className="lg:col-span-6">
          <Card variant="default" className="p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-[16px] font-bold text-[#1D2226]">
                Recruiter Demand vs. Student Proficiency Index
              </h2>
              <p className="text-[12px] text-[#5E6670]">
                Identifying curriculum gaps to maximize Day-1 campus placement conversions.
              </p>
            </div>

            <div className="space-y-3.5">
              {skillDemandAnalysis.map((item) => (
                <div key={item.skill} className="space-y-1 text-[12px]">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#1D2226]">{item.skill}</span>
                    <span className="text-[#5E6670]">
                      Demand: <strong className="text-[#0A66C2]">{item.marketDemand}%</strong> | Student Pool: <strong className={item.studentProficiency < 70 ? 'text-[#CC1016]' : 'text-[#057642]'}>{item.studentProficiency}%</strong>
                    </span>
                  </div>

                  {/* Dual Bar */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-1.5 bg-[#E8F3FF] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A66C2] rounded-full" style={{ width: `${item.marketDemand}%` }} />
                    </div>
                    <div className="h-1.5 bg-[#E8ECEF] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.studentProficiency < 70 ? 'bg-[#CC1016]' : 'bg-[#057642]'}`}
                        style={{ width: `${item.studentProficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
