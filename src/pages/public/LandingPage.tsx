import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Sparkles,
  Building2,
  CheckCircle2,
  GraduationCap,
  Layers,
  Search,
  MapPin,
  Briefcase,
  Users,
  Award,
  Code2,
  Database,
  Cpu,
  Palette,
  Coins,
  Megaphone,
  Check,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { JobCard } from '../../components/common/JobCard';
import { CompanyCard } from '../../components/common/CompanyCard';
import { INITIAL_JOBS, INITIAL_COMPANIES } from '../../data/mockData';
import { Job, Company } from '../../types';

export interface LandingPageProps {
  onNavigate?: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');

  const specializations = [
    { id: 'Software Engineering', name: 'Software Engineering', count: '14 roles', icon: Code2 },
    { id: 'Data & Analytics', name: 'Data & Analytics', count: '8 roles', icon: Database },
    { id: 'AI & Machine Learning', name: 'AI & Machine Learning', count: '6 roles', icon: Cpu },
    { id: 'Product & Design', name: 'Product & Design', count: '5 roles', icon: Palette },
    { id: 'Finance', name: 'Finance', count: '4 roles', icon: Coins },
    { id: 'Marketing & Sales', name: 'Marketing & Sales', count: '4 roles', icon: Megaphone },
  ];

  const popularSearches = ['Software Engineer', 'Data Analyst', 'Frontend', 'Python', 'Bangalore', 'Remote'];

  const filteredJobs = INITIAL_JOBS.filter((job) => {
    const matchesSpec =
      selectedSpecialization === 'All' ||
      (selectedSpecialization === 'Software Engineering' && (job.category === 'Technology' || job.title.includes('Software') || job.title.includes('Developer'))) ||
      (selectedSpecialization === 'Data & Analytics' && (job.title.includes('Data') || job.title.includes('Analyst') || job.requiredSkills.includes('SQL') || job.requiredSkills.includes('Data Analytics'))) ||
      (selectedSpecialization === 'AI & Machine Learning' && (job.title.includes('Machine Learning') || job.title.includes('AI') || job.requiredSkills.includes('Machine Learning') || job.requiredSkills.includes('TensorFlow'))) ||
      (selectedSpecialization === 'Product & Design' && (job.category === 'Design' || job.title.includes('Design') || job.title.includes('Product') || job.requiredSkills.includes('Figma'))) ||
      (selectedSpecialization === 'Finance' && (job.category === 'Finance' || job.title.includes('Finance') || job.title.includes('Quantitative'))) ||
      (selectedSpecialization === 'Marketing & Sales' && (job.title.includes('Marketing') || job.title.includes('Sales') || job.title.includes('Growth')));

    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      !locationQuery ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase());

    return matchesSpec && matchesSearch && matchesLocation;
  }).slice(0, 4);

  const featuredCompanies = INITIAL_COMPANIES.slice(0, 4);

  const handleJobAction = (job: Job) => {
    onNavigate?.('/login');
  };

  const handleCompanyAction = (company: Company) => {
    onNavigate?.('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobsSection = document.getElementById('latest-opportunities-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-2 sm:py-6 space-y-16 max-w-[1280px] mx-auto w-full">
      {/* 1. HERO SECTION */}
      <section className="pt-2 pb-4" aria-labelledby="hero-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Positioning, Headlines, Search Bar */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] text-[12px] font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CAREER &amp; HIRING INTELLIGENCE PLATFORM</span>
            </div>

            <div className="space-y-2">
              <h1
                id="hero-heading"
                className="text-[36px] sm:text-[44px] lg:text-[48px] font-bold text-[#1D2226] tracking-tight leading-[1.15]"
              >
                Your career.
                <br />
                Your opportunities.
                <br />
                <span className="text-[#0A66C2]">One place.</span>
              </h1>
              <p className="text-[15px] sm:text-[16px] text-[#5E6670] leading-relaxed max-w-xl font-normal pt-1">
                Discover jobs, connect with companies, track your placement journey, and make smarter career decisions with CareerLens.
              </p>
            </div>

            {/* HERO SEARCH BAR (Desktop: horizontal, Mobile: stacked) */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white border border-[#D9DEE3] rounded-[8px] p-2 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] focus-within:border-[#0A66C2] transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-[#D9DEE3]">
                  <Search className="w-4 h-4 text-[#7A828A] shrink-0" />
                  <input
                    id="hero-search-query"
                    type="text"
                    placeholder="Search jobs, skills or companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-[13px] bg-transparent outline-none text-[#1D2226] placeholder-[#7A828A]"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 sm:w-44">
                  <MapPin className="w-4 h-4 text-[#7A828A] shrink-0" />
                  <input
                    id="hero-search-location"
                    type="text"
                    placeholder="Location (e.g. Bangalore)"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full text-[13px] bg-transparent outline-none text-[#1D2226] placeholder-[#7A828A]"
                  />
                </div>

                <Button
                  id="hero-search-submit-btn"
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shrink-0"
                >
                  Search Jobs
                </Button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#5E6670]">
              <span className="font-semibold text-[#1D2226]">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    const el = document.getElementById('latest-opportunities-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2 py-0.5 bg-[#F3F6F8] hover:bg-[#E8F3FF] hover:text-[#0A66C2] rounded-[4px] border border-[#D9DEE3] text-[#5E6670] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                id="hero-explore-jobs-btn"
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  const el = document.getElementById('latest-opportunities-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate?.('/register');
                }}
              >
                Explore All Opportunities
              </Button>

              <Button
                id="hero-company-btn"
                variant="ghost"
                size="md"
                onClick={() => onNavigate?.('/register')}
              >
                I'm a Company →
              </Button>
            </div>

            {/* Trust Markers */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-[12px] font-medium text-[#5E6670] border-t border-[#D9DEE3]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#057642]" />
                <span>Verified Companies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#057642]" />
                <span>Career Readiness Insights</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#057642]" />
                <span>Active Hiring Cycles</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic CareerLens Opportunity Preview */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#D9DEE3] rounded-[10px] p-5 sm:p-6 shadow-[0px_4px_16px_rgba(0,0,0,0.06)] space-y-4">
              {/* Top Navigation Bar of the preview */}
              <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#057642]" />
                  <span className="text-[13px] font-semibold text-[#1D2226]">
                    CareerLens Opportunity Preview
                  </span>
                </div>
                <Badge variant="success" size="sm">
                  Active Opportunity
                </Badge>
              </div>

              {/* Main Featured Opportunity Card */}
              <div className="bg-[#F8FAFB] border border-[#D9DEE3] rounded-[8px] p-4 sm:p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] flex items-center justify-center font-bold text-[14px] shrink-0">
                      TN
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#1D2226] leading-tight">
                        Software Development Engineer
                      </h4>
                      <p className="text-[13px] text-[#5E6670] mt-0.5">
                        TechNova Solutions • Bangalore • Full-Time
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    98% Match
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#D9DEE3] text-[12px]">
                  <div>
                    <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                      Package
                    </span>
                    <span className="text-[13px] font-bold text-[#1D2226]">₹12–15 LPA</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                      Experience
                    </span>
                    <span className="text-[13px] font-semibold text-[#5E6670]">Entry / 0-2 yrs</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                    Required Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-white text-[#1D2226] text-[11px] font-medium rounded-[4px] border border-[#D9DEE3]">
                      Python
                    </span>
                    <span className="px-2 py-0.5 bg-white text-[#1D2226] text-[11px] font-medium rounded-[4px] border border-[#D9DEE3]">
                      React
                    </span>
                    <span className="px-2 py-0.5 bg-white text-[#1D2226] text-[11px] font-medium rounded-[4px] border border-[#D9DEE3]">
                      SQL
                    </span>
                    <span className="px-2 py-0.5 bg-white text-[#1D2226] text-[11px] font-medium rounded-[4px] border border-[#D9DEE3]">
                      Cloud
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Button
                    id="preview-view-btn"
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => onNavigate?.('/login')}
                  >
                    View Opportunity
                  </Button>
                </div>
              </div>

              {/* Small Secondary Panel: Recommended for you */}
              <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[6px] bg-[#E8F3FF] text-[#0A66C2] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1D2226]">Recommended for you</p>
                    <p className="text-[11px] text-[#5E6670]">2 new opportunities match your profile</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate?.('/login')}
                  className="text-[12px] font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ECOSYSTEM / STATS BAR */}
      <section className="bg-white border border-[#D9DEE3] rounded-[8px] p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#D9DEE3]">
          <div className="space-y-1 pt-2 md:pt-0">
            <p className="text-[28px] lg:text-[32px] font-bold text-[#1D2226] tracking-tight">150+</p>
            <p className="text-[12px] font-medium text-[#5E6670] uppercase tracking-wider">Verified Companies</p>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <p className="text-[28px] lg:text-[32px] font-bold text-[#057642] tracking-tight">94.2%</p>
            <p className="text-[12px] font-medium text-[#5E6670] uppercase tracking-wider">Placement Rate</p>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <p className="text-[28px] lg:text-[32px] font-bold text-[#0A66C2] tracking-tight">1,200+</p>
            <p className="text-[12px] font-medium text-[#5E6670] uppercase tracking-wider">Career Offers</p>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <p className="text-[28px] lg:text-[32px] font-bold text-[#1D2226] tracking-tight">₹14.8 LPA</p>
            <p className="text-[12px] font-medium text-[#5E6670] uppercase tracking-wider">Average Package</p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES: Explore opportunities by specialization */}
      <section className="space-y-4" aria-labelledby="specializations-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 id="specializations-heading" className="text-[20px] font-bold text-[#1D2226] tracking-tight">
              Explore opportunities by specialization
            </h2>
            <p className="text-[13px] text-[#5E6670]">
              Filter verified roles and talent pathways across top technical and business domains.
            </p>
          </div>
          <button
            onClick={() => setSelectedSpecialization('All')}
            className={`text-[12px] font-semibold ${selectedSpecialization === 'All' ? 'text-[#0A66C2]' : 'text-[#5E6670] hover:text-[#1D2226]'}`}
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {specializations.map((spec) => {
            const Icon = spec.icon;
            const isSelected = selectedSpecialization === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialization(isSelected ? 'All' : spec.id)}
                className={`p-3.5 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E8F3FF] border-[#0A66C2] text-[#0A66C2]'
                    : 'bg-white border-[#D9DEE3] text-[#1D2226] hover:border-[#B2BAC2]'
                }`}
              >
                <div className="w-7 h-7 rounded-[4px] bg-[#F3F6F8] flex items-center justify-center text-[#0A66C2] mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-snug">{spec.name}</p>
                  <p className="text-[11px] text-[#5E6670] mt-0.5">{spec.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. LATEST OPPORTUNITIES (Using unified JobCard) */}
      <section id="latest-opportunities-section" className="space-y-5" aria-labelledby="jobs-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="jobs-heading" className="text-[20px] font-bold text-[#1D2226] tracking-tight">
              Latest Opportunities
            </h2>
            <p className="text-[13px] text-[#5E6670]">
              Explore roles from companies hiring across technology, business and emerging industries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate?.('/register')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View All Opportunities
            </Button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleJobAction}
                onApply={handleJobAction}
                onToggleSave={handleJobAction}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-10 bg-white border border-[#D9DEE3] rounded-[8px] text-[13px] text-[#5E6670]">
              No active opportunities found matching your criteria. Try resetting the filters above.
            </div>
          )}
        </div>
      </section>

      {/* 5. COMPANIES HIRING ON CAREERLENS (Using unified CompanyCard) */}
      <section id="featured-companies-section" className="space-y-5" aria-labelledby="companies-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="companies-heading" className="text-[20px] font-bold text-[#1D2226] tracking-tight">
              Companies hiring on CareerLens
            </h2>
            <p className="text-[13px] text-[#5E6670]">
              Connect directly with verified tech enterprises, startups, and high-growth recruiters.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate?.('/register')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Company Directory
          </Button>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onViewCompany={handleCompanyAction}
              onViewDrives={handleCompanyAction}
            />
          ))}
        </div>
      </section>

      {/* 6. CAREER INTELLIGENCE (Differentiating Feature) */}
      <section id="career-intelligence-section" className="bg-white border border-[#D9DEE3] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#E8F3FF] text-[#0A66C2] text-[12px] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Intelligence Engine</span>
            </div>
            <h3 className="text-[24px] font-bold text-[#1D2226] tracking-tight">
              More than job search.
            </h3>
            <p className="text-[14px] text-[#5E6670] leading-relaxed">
              Understand your career readiness, discover skill gaps and make better career decisions with benchmarked profile analytics.
            </p>

            {/* Key Value Points */}
            <div className="space-y-2.5 text-[13px] text-[#1D2226]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#057642] shrink-0" />
                <span>Skill gap discovery against verified job requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#057642] shrink-0" />
                <span>Targeted learning &amp; project roadmap suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#057642] shrink-0" />
                <span>Industry salary percentiles &amp; placement readiness indicators</span>
              </div>
            </div>
          </div>

          {/* Career Intelligence Visual Dashboard Preview */}
          <div className="lg:col-span-6 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[8px] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#0A66C2]" />
                <span className="text-[13px] font-semibold text-[#1D2226]">Career Readiness Overview</span>
              </div>
              <span className="text-[11px] text-[#7A828A]">Demonstrative Preview</span>
            </div>

            {/* Metric Strip: Readiness, Skills, Internships, Projects */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white border border-[#D9DEE3] rounded-[6px] p-2.5">
                <p className="text-[11px] text-[#5E6670] uppercase tracking-wider font-semibold">Readiness</p>
                <p className="text-[18px] font-bold text-[#057642] mt-0.5">82%</p>
              </div>
              <div className="bg-white border border-[#D9DEE3] rounded-[6px] p-2.5">
                <p className="text-[11px] text-[#5E6670] uppercase tracking-wider font-semibold">Skills</p>
                <p className="text-[18px] font-bold text-[#0A66C2] mt-0.5">8</p>
              </div>
              <div className="bg-white border border-[#D9DEE3] rounded-[6px] p-2.5">
                <p className="text-[11px] text-[#5E6670] uppercase tracking-wider font-semibold">Internships</p>
                <p className="text-[18px] font-bold text-[#1D2226] mt-0.5">2</p>
              </div>
              <div className="bg-white border border-[#D9DEE3] rounded-[6px] p-2.5">
                <p className="text-[11px] text-[#5E6670] uppercase tracking-wider font-semibold">Projects</p>
                <p className="text-[18px] font-bold text-[#1D2226] mt-0.5">4</p>
              </div>
            </div>

            {/* Visual Skill Gap Progress */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-[12px] font-semibold mb-1">
                  <span className="text-[#1D2226]">Full Stack Web Engineering</span>
                  <span className="text-[#057642]">88% Match</span>
                </div>
                <div className="w-full bg-[#D9DEE3] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#057642] h-full rounded-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] font-semibold mb-1">
                  <span className="text-[#1D2226]">AI &amp; Data Pipeline Architecture</span>
                  <span className="text-[#0A66C2]">82% Match</span>
                </div>
                <div className="w-full bg-[#D9DEE3] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0A66C2] h-full rounded-full w-[82%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] font-semibold mb-1">
                  <span className="text-[#1D2226]">Cloud DevOps &amp; Infrastructure</span>
                  <span className="text-[#915907]">68% Match (Gap: Kubernetes)</span>
                </div>
                <div className="w-full bg-[#D9DEE3] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#915907] h-full rounded-full w-[68%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THREE-SIDED PLATFORM */}
      <section className="space-y-6" aria-labelledby="three-sided-heading">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h2 id="three-sided-heading" className="text-[22px] font-bold text-[#1D2226] tracking-tight">
            One platform. Three sides of the career ecosystem.
          </h2>
          <p className="text-[13px] text-[#5E6670]">
            A seamless environment built for students, employers, and placement authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STUDENTS */}
          <Card
            id="ecosystem-card-students"
            variant="default"
            className="p-6 flex flex-col justify-between space-y-4 hover:border-[#B2BAC2] transition-colors"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#1D2226]">
                STUDENTS
              </h3>
              <ul className="space-y-2 text-[13px] text-[#5E6670]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Discover opportunities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Track applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Build career readiness</span>
                </li>
              </ul>
            </div>
            <div className="text-[12px] font-semibold text-[#0A66C2] pt-2 border-t border-[#D9DEE3]">
              Candidate Career Hub
            </div>
          </Card>

          {/* COMPANIES */}
          <Card
            id="ecosystem-card-companies"
            variant="default"
            className="p-6 flex flex-col justify-between space-y-4 hover:border-[#B2BAC2] transition-colors"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#1D2226]">
                COMPANIES
              </h3>
              <ul className="space-y-2 text-[13px] text-[#5E6670]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Find talent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Post jobs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Manage hiring</span>
                </li>
              </ul>
            </div>
            <div className="text-[12px] font-semibold text-[#0A66C2] pt-2 border-t border-[#D9DEE3]">
              Enterprise Recruitment Suite
            </div>
          </Card>

          {/* COLLEGES */}
          <Card
            id="ecosystem-card-colleges"
            variant="default"
            className="p-6 flex flex-col justify-between space-y-4 hover:border-[#B2BAC2] transition-colors"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#1D2226]">
                COLLEGES
              </h3>
              <ul className="space-y-2 text-[13px] text-[#5E6670]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Manage placements</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Understand outcomes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>Track placement intelligence</span>
                </li>
              </ul>
            </div>
            <div className="text-[12px] font-semibold text-[#0A66C2] pt-2 border-t border-[#D9DEE3]">
              Institutional Command &amp; Analytics
            </div>
          </Card>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION (CTA) */}
      <section className="text-center bg-[#E8F3FF] border border-[#B3D7FF] rounded-[8px] p-8 sm:p-12 space-y-4">
        <h3 className="text-[24px] sm:text-[28px] font-bold text-[#1D2226] tracking-tight">
          See Your Career Clearly.
        </h3>
        <p className="text-[14px] text-[#5E6670] max-w-lg mx-auto font-normal">
          Discover opportunities, connect with top hiring partners, and make confident career decisions with CareerLens.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            id="footer-get-started-btn"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate?.('/register')}
          >
            Get Started
          </Button>
          <Button
            id="footer-login-btn"
            variant="secondary"
            size="md"
            onClick={() => onNavigate?.('/login')}
          >
            Sign In
          </Button>
        </div>
      </section>
    </div>
  );
};
