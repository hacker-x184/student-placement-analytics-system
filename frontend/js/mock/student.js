/** Development-only sample content. It is never returned by the API layer. */
export const studentMock = Object.freeze({
  profile: { name: "Aarav Mehta", email: "aarav.mehta@example.edu", branch: "Computer Science", batchYear: 2026, cgpa: 8.42, backlogs: 0, aptitude: 82, communication: 78, completion: 86, skills: ["Python", "SQL", "JavaScript", "Data Structures"], softSkills: ["Communication", "Teamwork", "Problem solving"], certifications: ["Google Data Analytics", "AWS Cloud Foundations"], projects: [{ title: "Campus Connect", summary: "A student event coordination platform built with HTML, CSS, and JavaScript." }, { title: "Retail Insights", summary: "Sales analysis dashboard using Python, Pandas, and SQL." }], internships: [{ company: "Northstar Labs", role: "Data Analytics Intern", period: "May–Jul 2025" }] },
  dashboard: { applications: 12, interviews: 4, offers: 1, probability: 78, activity: ["Application submitted to Vertex Systems", "Profile completeness improved to 86%", "Interview scheduled with CloudPeak"] },
  jobs: [
    { id: "job-101", company: "Vertex Systems", title: "Graduate Software Engineer", sector: "Technology", package: "₹9.5 LPA", minCgpa: 7.5, skills: ["JavaScript", "SQL", "Data Structures"], deadline: "12 Sep 2026", eligible: true, match: 88 },
    { id: "job-102", company: "CloudPeak", title: "Data Analyst", sector: "Analytics", package: "₹8 LPA", minCgpa: 7, skills: ["Python", "SQL", "Excel"], deadline: "18 Sep 2026", eligible: true, match: 82 },
    { id: "job-103", company: "Aster Finance", title: "Business Analyst", sector: "Finance", package: "₹7.2 LPA", minCgpa: 7.5, skills: ["SQL", "Communication", "Power BI"], deadline: "24 Sep 2026", eligible: true, match: 74 },
    { id: "job-104", company: "Orbit Mobility", title: "Platform Engineer", sector: "Technology", package: "₹12 LPA", minCgpa: 8.5, skills: ["Java", "AWS", "Docker"], deadline: "29 Sep 2026", eligible: false, match: 49 }
  ],
  applications: [
    { company: "Vertex Systems", job: "Graduate Software Engineer", date: "04 Sep 2026", status: "Interview", updated: "Today" },
    { company: "CloudPeak", job: "Data Analyst", date: "02 Sep 2026", status: "Shortlisted", updated: "Yesterday" },
    { company: "Aster Finance", job: "Business Analyst", date: "30 Aug 2026", status: "Under Review", updated: "03 Sep 2026" },
    { company: "Nexus Digital", job: "Frontend Intern", date: "18 Aug 2026", status: "Rejected", updated: "27 Aug 2026" }
  ],
  prediction: { probability: 78, classification: "Likely", factors: ["Strong CGPA", "Relevant technical skills", "Active application progress"], improvements: ["Strengthen cloud fundamentals", "Practice interview communication", "Add a deployed project to your portfolio"] },
  recommendations: [{ title: "Data Engineer", company: "CloudPeak", match: 89, matched: ["Python", "SQL", "Data Structures"], missing: ["AWS", "Docker", "Spark"] }, { title: "Graduate Software Engineer", company: "Vertex Systems", match: 88, matched: ["JavaScript", "SQL", "Data Structures"], missing: ["System design", "Testing"] }]
});
