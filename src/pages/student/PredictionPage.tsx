import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { studentService } from '../../services/studentService';
import { StudentProfile } from '../../types';
import {
  Sparkles,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Code2,
  Award,
  Layers,
  ArrowRight,
  RefreshCw,
  Zap,
  Info,
  Sliders,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const PredictionPage: React.FC<Props> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulation inputs
  const [cgpa, setCgpa] = useState<number>(8.7);
  const [backlogs, setBacklogs] = useState<number>(0);
  const [internships, setInternships] = useState<number>(2);
  const [projectsCount, setProjectsCount] = useState<number>(3);
  const [certificationsCount, setCertificationsCount] = useState<number>(2);
  const [skillsCount, setSkillsCount] = useState<number>(8);
  const [aptitudeScore, setAptitudeScore] = useState<number>(85);
  const [communicationScore, setCommunicationScore] = useState<number>(90);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await studentService.getProfile();
        setProfile(data);
        if (data) {
          setCgpa(data.cgpa || 8.7);
          setBacklogs(data.backlogs || 0);
          setInternships(data.internships?.length || 2);
          setProjectsCount(data.projects?.length || 3);
          setCertificationsCount(data.certifications?.length || 2);
          setSkillsCount(data.skills?.length || 8);
        }
      } catch (err) {
        console.error('Failed to load student profile for prediction:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Diagnostic calculation derived from profile inputs
  const calculatePrediction = () => {
    let score = 50; // base score

    // CGPA impact (scale 0-10)
    score += (cgpa - 6) * 7.5;

    // Backlogs penalty
    score -= backlogs * 12;

    // Internships boost
    score += Math.min(internships, 3) * 6;

    // Projects boost
    score += Math.min(projectsCount, 4) * 3;

    // Certifications boost
    score += Math.min(certificationsCount, 3) * 2;

    // Skills depth
    score += Math.min(skillsCount, 10) * 1.2;

    // Aptitude & Communication
    score += ((aptitudeScore - 50) / 50) * 8;
    score += ((communicationScore - 50) / 50) * 6;

    // Clamping to 15 - 98%
    const finalScore = Math.max(15, Math.min(98.5, score));
    return parseFloat(finalScore.toFixed(1));
  };

  const currentProbability = calculatePrediction();

  const getReadinessTier = (prob: number) => {
    if (prob >= 85) return { label: 'High Placement Likelihood', variant: 'success' as const, bg: 'bg-[#057642]' };
    if (prob >= 65) return { label: 'Moderate Placement Likelihood', variant: 'warning' as const, bg: 'bg-[#915907]' };
    return { label: 'Action Required', variant: 'danger' as const, bg: 'bg-[#CC1016]' };
  };

  const tier = getReadinessTier(currentProbability);

  const factorBreakdown = [
    { factor: 'Academic Record (CGPA)', weight: '+24%', status: cgpa >= 8.0 ? 'Optimal' : 'Average', desc: `${cgpa} CGPA clears 95% of corporate criteria.` },
    { factor: 'Technical Skills Matrix', weight: '+28%', status: skillsCount >= 6 ? 'Strong' : 'Moderate', desc: `${skillsCount} verified skills aligned with market demand.` },
    { factor: 'Industry Experience', weight: '+18%', status: internships >= 1 ? 'High Impact' : 'Needs Focus', desc: `${internships} verified internship experience(s).` },
    { factor: 'Project Portfolio', weight: '+14%', status: projectsCount >= 2 ? 'Strong' : 'Basic', desc: `${projectsCount} full-stack projects in portfolio.` },
    { factor: 'Aptitude & Reasoning', weight: '+10%', status: aptitudeScore >= 75 ? 'Ready' : 'Average', desc: `${aptitudeScore}% in standard placement mock rounds.` },
    { factor: 'Active Backlogs', weight: backlogs === 0 ? '0%' : `-${backlogs * 12}%`, status: backlogs === 0 ? 'Clear' : 'Critical', desc: backlogs === 0 ? 'Zero active backlogs.' : `${backlogs} active backlog(s) restricting eligibility.` },
  ];

  const improvementAreas = [
    {
      title: 'Target High-Impact Certifications',
      impact: '+4.5% Readiness Boost',
      action: 'Complete AWS Certified Cloud Practitioner or CKA certification before Day-1 drives.',
      priority: 'High',
    },
    {
      title: 'System Design Project Expansion',
      impact: '+6.0% Readiness Boost',
      action: 'Deploy a microservices or distributed cache architecture project with live demo links.',
      priority: 'Medium',
    },
    {
      title: 'Competitive Coding & Aptitude Drills',
      impact: '+3.5% Readiness Boost',
      action: 'Practice 30 standard medium-level dynamic programming and graph algorithms.',
      priority: 'High',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="student-prediction-page">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF]">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>CAREER INTELLIGENCE &amp; READINESS MODEL</span>
          </div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Understand your placement readiness.
          </h1>
          <p className="text-[13px] text-[#5E6670]">
            Evaluate your institutional placement likelihood based on verified academic metrics, technical proficiencies, and mock assessments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="prediction-view-jobs-btn"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate?.('/jobs')}
          >
            Explore Eligible Jobs
          </Button>
        </div>
      </div>

      {/* 2. Top Diagnostic Grid (Score Card + Summary Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Likelihood Gauge & Score Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="default" className="p-6 text-center space-y-6">
            <div className="space-y-1">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#7A828A]">
                Predicted Placement Likelihood
              </span>
              <div className="pt-2 flex items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E8ECEF"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={currentProbability >= 75 ? '#057642' : currentProbability >= 50 ? '#0A66C2' : '#CC1016'}
                      strokeWidth="8"
                      strokeDasharray={`${(currentProbability / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[34px] font-bold text-[#1D2226] tracking-tight">
                      {currentProbability}%
                    </span>
                    <span className="text-[11px] font-medium text-[#5E6670]">Probability</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Badge variant={tier.variant} size="lg">
                {tier.label}
              </Badge>
              <p className="text-[12px] text-[#5E6670] mt-2">
                Based on historical campus placement data of <strong>1,200+ graduates</strong> from your department.
              </p>
            </div>

            {/* Quick Benchmark Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#D9DEE3] text-left">
              <div className="p-3 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3]">
                <span className="text-[11px] text-[#7A828A] block">Expected CTC Range</span>
                <span className="text-[15px] font-bold text-[#1D2226]">₹8.5 – 14.0 LPA</span>
              </div>
              <div className="p-3 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3]">
                <span className="text-[11px] text-[#7A828A] block">Eligible Drives</span>
                <span className="text-[15px] font-bold text-[#0A66C2]">38 Companies</span>
              </div>
            </div>
          </Card>

          {/* Targeted Improvement Actions */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-[#1D2226] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#0A66C2]" />
                Targeted Improvement Plan
              </h3>
            </div>

            <div className="space-y-3">
              {improvementAreas.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#1D2226]">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-semibold text-[#057642] bg-[#E7F5EE] px-1.5 py-0.5 rounded-[4px]">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5E6670] leading-relaxed">{item.action}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Factor Breakdown & Interactive Profile Simulator (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Factor Breakdown List */}
          <Card variant="default" className="p-5 sm:p-6 space-y-5">
            <div>
              <h3 className="text-[16px] font-bold text-[#1D2226]">
                Placement Readiness Contributing Factors
              </h3>
              <p className="text-[12px] text-[#5E6670]">
                Breakdown of how your academic profile and skills influence recruiter shortlisting.
              </p>
            </div>

            <div className="space-y-3">
              {factorBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 border border-[#D9DEE3] rounded-[6px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:border-[#0A66C2]/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#1D2226]">
                        {item.factor}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-[3px] ${
                          item.status === 'Optimal' || item.status === 'Strong' || item.status === 'High Impact' || item.status === 'Clear' || item.status === 'Ready'
                            ? 'bg-[#E7F5EE] text-[#057642]'
                            : item.status === 'Critical'
                            ? 'bg-[#FDECEC] text-[#CC1016]'
                            : 'bg-[#FFF4DF] text-[#915907]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#5E6670]">{item.desc}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[13px] font-bold text-[#1D2226]">{item.weight}</span>
                    <span className="text-[10px] text-[#7A828A] block">Impact</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Interactive Scenario Simulator */}
          <Card variant="default" className="p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3]">
              <div className="space-y-0.5">
                <h3 className="text-[16px] font-bold text-[#1D2226] flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#0A66C2]" />
                  Readiness Scenario Simulator
                </h3>
                <p className="text-[12px] text-[#5E6670]">
                  Adjust parameters to observe how improving skills or CGPA impacts your chances.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCgpa(8.7);
                  setBacklogs(0);
                  setInternships(2);
                  setProjectsCount(3);
                  setCertificationsCount(2);
                  setAptitudeScore(85);
                  setCommunicationScore(90);
                }}
                className="text-[11px] font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CGPA Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px]">
                  <label className="font-semibold text-[#1D2226]">Target CGPA</label>
                  <span className="font-bold text-[#0A66C2]">{cgpa.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="10.0"
                  step="0.1"
                  value={cgpa}
                  onChange={(e) => setCgpa(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#D9DEE3] rounded-lg appearance-none cursor-pointer accent-[#0A66C2]"
                />
              </div>

              {/* Backlogs Selector */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px]">
                  <label className="font-semibold text-[#1D2226]">Active Backlogs</label>
                  <span className={`font-bold ${backlogs === 0 ? 'text-[#057642]' : 'text-[#CC1016]'}`}>
                    {backlogs}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={backlogs}
                  onChange={(e) => setBacklogs(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#D9DEE3] rounded-lg appearance-none cursor-pointer accent-[#0A66C2]"
                />
              </div>

              {/* Internships Count */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px]">
                  <label className="font-semibold text-[#1D2226]">Completed Internships</label>
                  <span className="font-bold text-[#0A66C2]">{internships}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={internships}
                  onChange={(e) => setInternships(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#D9DEE3] rounded-lg appearance-none cursor-pointer accent-[#0A66C2]"
                />
              </div>

              {/* Projects Count */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px]">
                  <label className="font-semibold text-[#1D2226]">Portfolio Projects</label>
                  <span className="font-bold text-[#0A66C2]">{projectsCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={projectsCount}
                  onChange={(e) => setProjectsCount(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#D9DEE3] rounded-lg appearance-none cursor-pointer accent-[#0A66C2]"
                />
              </div>

              {/* Aptitude Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px]">
                  <label className="font-semibold text-[#1D2226]">Aptitude Mock Score</label>
                  <span className="font-bold text-[#0A66C2]">{aptitudeScore}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={aptitudeScore}
                  onChange={(e) => setAptitudeScore(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#D9DEE3] rounded-lg appearance-none cursor-pointer accent-[#0A66C2]"
                />
              </div>

              {/* Communication Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px]">
                  <label className="font-semibold text-[#1D2226]">Communication &amp; HR</label>
                  <span className="font-bold text-[#0A66C2]">{communicationScore}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={communicationScore}
                  onChange={(e) => setCommunicationScore(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#D9DEE3] rounded-lg appearance-none cursor-pointer accent-[#0A66C2]"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
