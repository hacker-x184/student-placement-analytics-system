-- ============================================================
-- STUDENT PLACEMENT ANALYTICS SYSTEM
-- Database Schema
-- PostgreSQL
-- ============================================================


-- ============================================================
-- 1. STUDENTS
-- ============================================================

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),

    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    branch VARCHAR(100) NOT NULL,
    batch_year INT NOT NULL,

    cgpa NUMERIC(4,2)
        CHECK (cgpa >= 0 AND cgpa <= 10),

    backlogs INT DEFAULT 0
        CHECK (backlogs >= 0),

    aptitude_score NUMERIC(5,2),
    communication_score NUMERIC(5,2),

    internships INT DEFAULT 0
        CHECK (internships >= 0),

    projects INT DEFAULT 0
        CHECK (projects >= 0),

    certifications INT DEFAULT 0
        CHECK (certifications >= 0),

    skills TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. COMPANIES
-- ============================================================

CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,

    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    website TEXT,
    tier VARCHAR(50),
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. JOBS
-- ============================================================

CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,

    company_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    required_skills TEXT,

    min_cgpa NUMERIC(4,2)
        CHECK (min_cgpa >= 0 AND min_cgpa <= 10),

    package_ctc NUMERIC(10,2)
        CHECK (package_ctc >= 0),

    application_deadline DATE,

    status VARCHAR(50) DEFAULT 'Open',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_jobs_company
        FOREIGN KEY (company_id)
        REFERENCES companies(company_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 4. APPLICATIONS
-- ============================================================

CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,
    job_id INT NOT NULL,

    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(50) DEFAULT 'Applied',

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_applications_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_applications_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(job_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_student_job
        UNIQUE (student_id, job_id)
);


-- ============================================================
-- 5. PLACEMENTS
-- ============================================================

CREATE TABLE placements (
    placement_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,
    job_id INT NOT NULL,
    application_id INT,

    offer_date DATE,

    final_package NUMERIC(10,2)
        CHECK (final_package >= 0),

    status VARCHAR(50) DEFAULT 'Placed',

    CONSTRAINT fk_placements_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_placements_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(job_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_placements_application
        FOREIGN KEY (application_id)
        REFERENCES applications(application_id)
        ON DELETE SET NULL,

    CONSTRAINT unique_student_placement
        UNIQUE (student_id)
);


-- ============================================================
-- 6. SKILLS
-- ============================================================

CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,

    skill_name VARCHAR(100) UNIQUE NOT NULL
);


-- ============================================================
-- 7. STUDENT_SKILLS
-- ============================================================

CREATE TABLE student_skills (
    student_id INT NOT NULL,
    skill_id INT NOT NULL,

    PRIMARY KEY (student_id, skill_id),

    CONSTRAINT fk_student_skills_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_student_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(skill_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 8. JOB_SKILLS
-- ============================================================

CREATE TABLE job_skills (
    job_id INT NOT NULL,
    skill_id INT NOT NULL,

    PRIMARY KEY (job_id, skill_id),

    CONSTRAINT fk_job_skills_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(job_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_job_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(skill_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 9. CERTIFICATIONS
-- ============================================================

CREATE TABLE certifications (
    certification_id SERIAL PRIMARY KEY,

    certification_name VARCHAR(255) UNIQUE NOT NULL,

    issuing_organization VARCHAR(255)
);


-- ============================================================
-- 10. STUDENT_CERTIFICATIONS
-- ============================================================

CREATE TABLE student_certifications (
    student_id INT NOT NULL,
    certification_id INT NOT NULL,

    PRIMARY KEY (student_id, certification_id),

    CONSTRAINT fk_student_certifications_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_student_certifications_certification
        FOREIGN KEY (certification_id)
        REFERENCES certifications(certification_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 11. PROJECTS
-- ============================================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,

    project_title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT,
    project_url TEXT,

    CONSTRAINT fk_projects_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 12. INTERNSHIPS
-- ============================================================

CREATE TABLE internships (
    internship_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,

    company_name VARCHAR(255),
    role VARCHAR(255),

    start_date DATE,
    end_date DATE,

    description TEXT,
    technologies TEXT,

    CONSTRAINT fk_internships_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_students_branch
    ON students(branch);

CREATE INDEX idx_students_batch
    ON students(batch_year);

CREATE INDEX idx_jobs_company
    ON jobs(company_id);

CREATE INDEX idx_jobs_status
    ON jobs(status);

CREATE INDEX idx_applications_student
    ON applications(student_id);

CREATE INDEX idx_applications_job
    ON applications(job_id);

CREATE INDEX idx_placements_student
    ON placements(student_id);

CREATE INDEX idx_placements_job
    ON placements(job_id);

CREATE INDEX idx_student_skills_skill
    ON student_skills(skill_id);

CREATE INDEX idx_job_skills_skill
    ON job_skills(skill_id);