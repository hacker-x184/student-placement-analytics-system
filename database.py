import psycopg2 as sql
mydb = sql.connect(
    host="localhost",
    database="student_placement_analytics",
    user="postgres",      # PostgreSQL username
    password="1234",      # Your PostgreSQL password
    port="5001"           # Default PostgreSQL port
)
cursor = mydb.cursor()
def create_table_student():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            student_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            phone VARCHAR(20),
            gender VARCHAR(20),
            dob DATE,
            branch VARCHAR(100),
            batch_year INT,
            cgpa DECIMAL(4,2) CHECK (cgpa >= 0 AND cgpa <= 10),
            backlogs INT DEFAULT 0 CHECK (backlogs >= 0),
            internships INT DEFAULT 0 CHECK (internships >= 0),
            projects INT DEFAULT 0 CHECK (projects >= 0),
            certifications INT DEFAULT 0 CHECK (certifications >= 0),
            skills TEXT,
            placement_status VARCHAR(30) DEFAULT 'Not Placed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            portfolio_url VARCHAR(500),
            github_url VARCHAR(500),
            leetcode_url VARCHAR(500),
            linkedin_url VARCHAR(500)
        );
    """)
    mydb.commit()
def create_table_company():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS companies (
            company_id SERIAL PRIMARY KEY,
            company_name VARCHAR(150) NOT NULL,
            industry VARCHAR(100),
            location VARCHAR(150),
            website VARCHAR(500),
            contact_email VARCHAR(150),

            minimum_cgpa DECIMAL(4,2)
                CHECK (minimum_cgpa >= 0 AND minimum_cgpa <= 10),

            minimum_backlogs INT DEFAULT 0
                CHECK (minimum_backlogs >= 0),

            description TEXT,

            company_type VARCHAR(50),

            last_year_hiring INT DEFAULT 0
                CHECK (last_year_hiring >= 0),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    mydb.commit()
def create_table_job():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS jobs (
            job_id SERIAL PRIMARY KEY,
            company_id INT NOT NULL,
            job_title VARCHAR(150) NOT NULL,
            job_type VARCHAR(50),
            description TEXT,
            required_skills TEXT,
            min_cgpa DECIMAL(4,2)
                CHECK (min_cgpa >= 0 AND min_cgpa <= 10),
            max_backlogs INT DEFAULT 0
                CHECK (max_backlogs >= 0),
            min_internships INT DEFAULT 0
                CHECK (min_internships >= 0),
            min_projects INT DEFAULT 0
                CHECK (min_projects >= 0),
            package DECIMAL(10,2)
                CHECK (package >= 0),
            location VARCHAR(150),
            application_deadline DATE,
            status VARCHAR(30) DEFAULT 'Open',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_job_company
                FOREIGN KEY (company_id)
                REFERENCES companies(company_id)
                ON DELETE CASCADE
        );
    """)

    mydb.commit()
def create_table_application():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            application_id SERIAL PRIMARY KEY,

            student_id INT NOT NULL,
            job_id INT NOT NULL,

            applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(50) DEFAULT 'Applied',

            resume_url VARCHAR(500),

            aptitude_score DECIMAL(5,2),
            technical_score DECIMAL(5,2),
            interview_score DECIMAL(5,2),

            final_result VARCHAR(50),
            remarks TEXT,

            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            eligibility_status VARCHAR(30) DEFAULT 'Pending',
            eligibility_reason TEXT,

            CONSTRAINT fk_application_student
                FOREIGN KEY (student_id)
                REFERENCES students(student_id)
                ON DELETE CASCADE,

            CONSTRAINT fk_application_job
                FOREIGN KEY (job_id)
                REFERENCES jobs(job_id)
                ON DELETE CASCADE,

            CONSTRAINT unique_student_job
                UNIQUE (student_id, job_id)
        )
    """)

    mydb.commit()
def create_table_placement():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS placements (
            placement_id SERIAL PRIMARY KEY,

            student_id INT NOT NULL,
            company_id INT NOT NULL,
            job_id INT NOT NULL,

            placement_date DATE,
            package DECIMAL(10,2)
                CHECK (package >= 0),

            placement_type VARCHAR(50),
            job_role VARCHAR(150),
            joining_date DATE,

            placement_status VARCHAR(50) DEFAULT 'Confirmed',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_placement_student
                FOREIGN KEY (student_id)
                REFERENCES students(student_id)
                ON DELETE CASCADE,

            CONSTRAINT fk_placement_company
                FOREIGN KEY (company_id)
                REFERENCES companies(company_id)
                ON DELETE CASCADE,

            CONSTRAINT fk_placement_job
                FOREIGN KEY (job_id)
                REFERENCES jobs(job_id)
                ON DELETE CASCADE
        )
    """)

    mydb.commit()
def db_query(query, params=None):
    cursor.execute(query, params)

    if query.strip().upper().startswith("SELECT"):
        return cursor.fetchall()
    else:
        mydb.commit()
        return "Query executed successfully."