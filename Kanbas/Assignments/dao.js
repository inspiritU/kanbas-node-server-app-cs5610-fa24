import Database from "../Database/index.js";

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function findAssignmentsForCourse(courseId) {
    return Database.assignments.filter((assignment) => assignment.course === courseId);
}

export function updateAssignment(assignmentId, updates) {
    const assignment = Database.assignments.find((a) => a._id === assignmentId);
    if (assignment) {
        Object.assign(assignment, updates);
        return assignment;
    }
    return null;
}

export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter(
        (assignment) => assignment._id !== assignmentId
    );
}