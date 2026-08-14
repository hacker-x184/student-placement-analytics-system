from database import *
def create_table():
    if __name__ == "__main__":
        create_table_student()
        create_table_company()
        create_table_job()
        create_table_application()
        create_table_placement()

        print("All tables created successfully!")
create_table()
db_query("""
    INSERT INTO students
    (name, email, phone, gender, branch, batch_year, cgpa,
     backlogs, internships, projects, certifications, skills,
     placement_status, portfolio_url, github_url, leetcode_url, linkedin_url)
    VALUES
    (%s, %s, %s, %s, %s, %s, %s,
     %s, %s, %s, %s, %s,
     %s, %s, %s, %s, %s)
""", (
    "Inzamam",
    "inzamam@example.com",
    "9876543210",
    "Male",
    "CSE",
    2027,
    8.5,
    0,
    1,
    3,
    2,
    "Python, C, Java, SQL",
    "Not Placed",
    "https://example.com",
    "https://github.com/example",
    "https://leetcode.com/example",
    "https://linkedin.com/in/example"
))