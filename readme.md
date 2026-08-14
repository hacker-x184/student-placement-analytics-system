# Student Placement Analytics System

A team-based web application for managing student placement data, analyzing placement trends, predicting placement outcomes, and generating skill/job recommendations.

## 🎯 Project Goal

**Manage → Analyze → Predict → Recommend**

## 🚀 Project Versions

### V1 — Placement Management (MVP)
- Student registration
- Company management
- Job management
- Job applications
- Placement records
- Authentication
- Database CRUD operations

### V2 — Placement Analytics
- Placement percentage
- Department-wise placement
- Average/highest package
- CGPA vs placement
- Internship vs placement
- Skills vs placement
- Company hiring analysis
- Batch/year trends

### V3 — Placement Prediction
Machine-learning based placement probability using:
- CGPA
- Backlogs
- Internships
- Projects
- Certifications
- Skills
- Aptitude score
- Communication score
- Branch
- Batch year

Example:
```json
{
  "placement_probability": 0.86,
  "prediction": "Likely"
}
```

### V4 — Intelligent Recommendations
- Skill-gap analysis
- Suitable job recommendations
- Missing skill identification
- Improvement suggestions

## 🛠️ Technology Stack

| Area | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, FastAPI |
| Database | PostgreSQL / MySQL |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib, Seaborn |
| Machine Learning | Scikit-learn |
| API | REST API |
| Version Control | Git + GitHub |

> **Note:** n8n is not used in this version. Automation, where required, will be handled through Python/FastAPI.

## 🏗️ System Architecture

```text
Frontend (HTML/CSS/JS)
        ↓
FastAPI REST API
        ↓
 ┌──────┴────────┐
 ↓               ↓
Database      Pandas/NumPy
                 ↓
            Scikit-learn
                 ↓
       Prediction/Recommendation
                 ↓
              FastAPI
                 ↓
             Frontend
```

## 🗄️ Database

Five main tables:

```text
students
companies
jobs
applications
placements
```

Main relationships:

```text
companies
    │
    └── jobs
          │
          └── applications ── students

students ── placements ── companies
                  │
                  └── jobs
```

Complete schema:
`docs/Student_Placement_Analytics_Database.md`

## 👥 Team Responsibilities

### Inzamam — Analytics & ML
- Dataset design
- Pandas and NumPy
- Data preprocessing
- Statistical analysis
- Visualization
- Scikit-learn
- Placement prediction
- Skill-gap analysis
- Job recommendation

### Zaid — Backend & Database
- Database design
- SQL
- PostgreSQL/MySQL
- Constraints
- FastAPI
- REST APIs
- CRUD
- Authentication
- Frontend-backend integration

### Lucky — Frontend
- HTML/CSS/JavaScript
- UI/UX
- Login/Register
- Dashboard
- Student profile
- Companies
- Jobs
- Applications
- Placement pages
- Analytics/prediction UI
- API integration

## 📁 Project Structure

```text
student-placement-analytics-system/
│
├── frontend/
├── backend/
├── analytics/
│   ├── preprocessing.py
│   ├── analysis.py
│   ├── visualization.py
│   └── ml/
├── dataset/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   └── Student_Placement_Analytics_Database.md
├── .gitignore
└── README.md
```

## 🔄 Development Flow

```text
Requirements
     ↓
Database Design
     ↓
SQL Tables + Constraints
     ↓
FastAPI Backend
     ↓
Frontend
     ↓
Frontend ↔ API ↔ Database
     ↓
Analytics
     ↓
ML Prediction
     ↓
Recommendations
     ↓
Testing + Documentation
```

## 🔐 Security

Never commit:
- `.env`
- Database passwords
- API keys
- Secret keys
- Personal credentials

Use `.env.example` for placeholder configuration.

## 🌿 Git Workflow

Use separate branches:

```text
main
├── lucky-frontend
├── zaid-backend-database
└── inzamam-analytics-ml
```

Example:

```bash
git checkout -b inzamam-analytics-ml
git add .
git commit -m "Add analytics module"
git push origin inzamam-analytics-ml
```

Then create a Pull Request and merge into `main` after review.

## 📊 Future Scope

- Advanced ML models
- Better job recommendation
- Skill-gap scoring
- Resume analysis
- Placement trend forecasting
- Admin analytics dashboard
- Python/FastAPI notifications
- Cloud deployment

## 📌 Project Philosophy

> **Manage → Analyze → Predict → Recommend**
