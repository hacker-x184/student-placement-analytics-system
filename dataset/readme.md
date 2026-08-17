# Dataset

This folder contains the datasets used for the Student Placement Analytics System.

## Structure

- `raw/` — original datasets, kept unchanged
- `processed/` — cleaned and transformed datasets used for analytics and ML

## Data Sources

The dataset should contain student, placement, job/company, and skill-related information required by the analytics and ML pipeline.

## Data Preparation

The workflow will be:

1. Collect raw dataset
2. Inspect columns and data types
3. Handle missing values
4. Remove duplicates
5. Validate data ranges
6. Clean categorical values
7. Create the processed dataset
8. Use the processed dataset for analytics and ML

# Important

The raw dataset must not be modified directly.

Unknown, not provided, and not applicable values should be distinguished where possible instead of automatically treating them as zero.