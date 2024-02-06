# Student Management System

## Introduction

The Student Management System is a TypeScript-based backend application designed to manage student records efficiently. It provides functionalities for adding, updating, deleting, and retrieving student information. Additionally, the system allows searching, filtering, sorting, and pagination of student records to facilitate easy access and management.

## Features

### 1. CRUD Operations

- **Create:** Add a new student record with the required fields such as name, email, enrollment date, and major.
- **Read:** Retrieve student records either individually by ID or as a list of all students.
- **Update:** Modify existing student records by updating fields such as name, email, major, etc.
- **Delete:** Remove a student record from the system based on the provided ID.

### 2. Search and Filter

- Search for students by their name, allowing partial matching to find relevant records.
- Filter students by their major to retrieve a list of students belonging to a specific academic discipline.
- Filter students by enrollment date range to find students who enrolled within a specified timeframe.
- Retrieve student count by major to get the total number of students enrolled in a particular major.

### 3. Sorting and Pagination

- Sort student records alphabetically by name to easily identify and browse through student information.
- Paginate student records to display a limited number of students per page, improving performance and usability.

### 4. Additional Functionalities

- Retrieve students by enrollment year to find students who enrolled in a specific academic year.
- Update student name, email, major, or enrollment date individually based on the provided student ID.
- Retrieve students sorted by name or filtered by major and enrollment year simultaneously.

## Usage

The Student Management System exposes a set of API endpoints that can be called to perform various operations on student records. These endpoints include functions for adding, updating, deleting, and retrieving student information, as well as functions for searching, filtering, sorting, and pagination.

### API Endpoints

- **getStudents:** Retrieve a list of all students.
- **getStudent:** Retrieve a specific student by ID.
- **addStudent:** Add a new student record.
- **updateStudent:** Update an existing student record.
- **deleteStudent:** Delete a student record.
- **getStudentsByMajor:** Retrieve students filtered by major.
- **getStudentsByEnrollmentDateRange:** Retrieve students within a specified enrollment date range.
- **updateStudentMajor:** Update a student's major by ID.
- **updateStudentEmail:** Update a student's email by ID.
- **searchStudentsByName:** Search for students by name.
- **getStudentByEmail:** Retrieve a student by email.
- **getStudentsByEnrollmentYear:** Retrieve students by enrollment year.
- **getStudentCountByMajor:** Retrieve the count of students by major.
- **updateStudentName:** Update a student's name by ID.
- **getStudentsWithPagination:** Retrieve paginated student records.
- **getStudentsSortedByName:** Retrieve students sorted by name.
- **getStudentsByMajorAndEnrollmentYear:** Retrieve students filtered by major and enrollment year.

## Dependencies

- **azle:** Dependency for handling queries, updates, records, and other utility functions.
- **uuid:** Dependency for generating unique IDs for student records.

## Configuration

The system requires no additional configuration and can be deployed and run immediately after installation of dependencies.

### Installation

1. Clone the repository

   ```bash
    git clone https://github.com/ken-dev001/student-management-system.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the IC local development environment

    ```bash
    dfx start --background --clean
    ```

4. Deploy the canisters to the local development environment

    ```bash
    dfx deploy
    ```