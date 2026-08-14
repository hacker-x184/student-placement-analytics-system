# Analytics Data Requirements

## 1. Student Data

Required fields:

- student_id
- branch
- batch_year
- cgpa
- backlogs
- aptitude_score
- communication_score
- internships
- projects
- certifications
- skills

## 2. Placement Data

Required fields:

- student_id
- job_id
- application_id
- final_package
- placement_status
- offer_date

## 3. Job & Company Data

Required fields:

### Company
- company_id
- company_name
- sector
- tier

### Job
- job_id
- company_id
- title
- required_skills
- min_cgpa
- package_ctc
- status
- application_deadline

## 4. Skills Data

Required:

- student_id
- skill
- job_id
- required_skill

Used for:
- Skill analysis
- Skill gap detection
- Job matching
- Skill priority analysis

## 5. Analytics KPIs

The system should calculate:

- Overall placement percentage
- Placement percentage by branch
- Placement percentage by batch
- Average package
- Highest package
- Lowest package
- Company-wise placements
- Skill-wise demand
- CGPA vs placement relationship
- Internship vs placement relationship
- Project count vs placement relationship
- Certification vs placement relationship

## 6. ML Features

Initial features:

- CGPA
- Backlogs
- Aptitude score
- Communication score
- Internships
- Projects
- Certifications
- Branch
- Batch year
- Skills

## 7. ML Target

Target:

`placement_status`

Possible values:

- Placed
- Not Placed

The ML model will predict the student's placement probability/status based on the selected features.