import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for Student and StudentPayload
type Student = Record<{
    id: string;
    name: string;
    email: string;
    enrollmentDate: string;
    major: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type StudentPayload = Record<{
    name: string;
    email: string;
    enrollmentDate: string;
    major: string;
}>

// Create a map to store student records
const studentStorage = new StableBTreeMap<string, Student>(0, 44, 1024);

$query;
export function getStudents(): Result<Vec<Student>, string> {
    return Result.Ok(studentStorage.values());
}

$query;
export function getStudent(id: string): Result<Student, string> {
    return match(studentStorage.get(id), {
        Some: (student) => Result.Ok<Student, string>(student),
        None: () => Result.Err<Student, string>(`Student with id=${id} not found`)
    });
}

$update;
export function addStudent(payload: StudentPayload): Result<Student, string> {
    // Input validation
    if (!payload || !payload.name || !payload.email || !payload.enrollmentDate || !payload.major) {
        return Result.Err("Invalid student payload. All fields are required.");
    }

    const student: Student = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    studentStorage.insert(student.id, student);
    return Result.Ok(student);
}

$update;
export function updateStudent(id: string, payload: StudentPayload): Result<Student, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid student ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(studentStorage.get(id), {
        Some: (student) => {
            const updatedStudent: Student = {...student, ...payload, updatedAt: Opt.Some(ic.time())};
            studentStorage.insert(student.id, updatedStudent);
            return Result.Ok<Student, string>(updatedStudent);
        },
        None: () => Result.Err<Student, string>(`Couldn't update a student with id=${id}. Student not found`)
    });
}

$update;
export function deleteStudent(id: string): Result<Student, string> {
    return match(studentStorage.remove(id), {
        Some: (deletedStudent) => Result.Ok<Student, string>(deletedStudent),
        None: () => Result.Err<Student, string>(`Couldn't delete a student with id=${id}. Student not found.`)
    });
}

// Retrieve students by major
$query;
export function getStudentsByMajor(major: string): Result<Vec<Student>, string> {
    const studentsByMajor = studentStorage
        .values()
        .filter(student => student.major === major);
    return Result.Ok(studentsByMajor);
}

// Retrieve students by enrollment date range
$query;
export function getStudentsByEnrollmentDateRange(start: string, end: string): Result<Vec<Student>, string> {
    const studentsByDateRange = studentStorage
        .values()
        .filter(student => student.enrollmentDate >= start && student.enrollmentDate <= end);
    return Result.Ok(studentsByDateRange);
}

// Update student's major by ID
$update;
export function updateStudentMajor(id: string, major: string): Result<Student, string> {
    return match(studentStorage.get(id), {
        Some: (student) => {
            const updatedStudent: Student = { ...student, major, updatedAt: Opt.Some(ic.time()) };
            studentStorage.insert(student.id, updatedStudent);
            return Result.Ok<Student, string>(updatedStudent);
        },
        None: () => Result.Err<Student, string>(`Couldn't update the major for student with id=${id}. Student not found`)
    });
}

// Update student's email by ID
$update;
export function updateStudentEmail(id: string, email: string): Result<Student, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid student ID.");
    }
    if (!email) {
        return Result.Err("Invalid email. Email field is required.");
    }

    return match(studentStorage.get(id), {
        Some: (student) => {
            const updatedStudent: Student = { ...student, email, updatedAt: Opt.Some(ic.time()) };
            studentStorage.insert(student.id, updatedStudent);
            return Result.Ok<Student, string>(updatedStudent);
        },
        None: () => Result.Err<Student, string>(`Couldn't update the email for student with id=${id}. Student not found`)
    });
}

$query;
export function searchStudentsByName(name: string): Result<Vec<Student>, string> {
    const matchingStudents = studentStorage
        .values()
        .filter(student => student.name.toLowerCase().includes(name.toLowerCase()));
    return Result.Ok(matchingStudents);
}

$query;
export function getStudentByEmail(email: string): Result<Student, string> {
    const student = studentStorage
        .values()
        .find(student => student.email === email);

    if (student) {
        return Result.Ok(student);
    } else {
        return Result.Err(`Student with email ${email} not found`);
    }
}

$query;
export function getStudentsByEnrollmentYear(year: number): Result<Vec<Student>, string> {
    const studentsByYear = studentStorage
        .values()
        .filter(student => new Date(student.enrollmentDate).getFullYear() === year);
    return Result.Ok(studentsByYear);
}

$query;
export function getStudentCountByMajor(major: string): Result<number, string> {
    const studentsByMajor = studentStorage
        .values()
        .filter(student => student.major === major);
    return Result.Ok(studentsByMajor.length);
}

$update;
export function updateStudentName(id: string, name: string): Result<Student, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid student ID.");
    }
    if (!name) {
        return Result.Err("Invalid name. Name field is required.");
    }

    return match(studentStorage.get(id), {
        Some: (student) => {
            const updatedStudent: Student = { ...student, name, updatedAt: Opt.Some(ic.time()) };
            studentStorage.insert(student.id, updatedStudent);
            return Result.Ok<Student, string>(updatedStudent);
        },
        None: () => Result.Err<Student, string>(`Couldn't update the name for student with id=${id}. Student not found`)
    });
}

$query;
export function getStudentsWithPagination(page: number, pageSize: number): Result<Vec<Student>, string> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStudents = studentStorage.values().slice(startIndex, endIndex);
    return Result.Ok(paginatedStudents);
}

$query;
export function getStudentsSortedByName(): Result<Vec<Student>, string> {
    const sortedStudents = studentStorage.values().sort((a, b) => a.name.localeCompare(b.name));
    return Result.Ok(sortedStudents);
}

$query;
export function getStudentsByMajorAndEnrollmentYear(major: string, year: number): Result<Vec<Student>, string> {
    const filteredStudents = studentStorage.values().filter(student => student.major === major && new Date(student.enrollmentDate).getFullYear() === year);
    return Result.Ok(filteredStudents);
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};
