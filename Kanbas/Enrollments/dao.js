import Database from "../Database/index.js";

export const enrollUserInCourse = (userId, courseId) => {
    Database.enrollments.push({ _id: new Date().getTime().toString(), user: userId, course: courseId });
};

export const unenrollUserFromCourse = (userId, courseId) => {
    Database.enrollments = Database.enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
};

export const findEnrollmentsByUser = (userId) => {
    return Database.enrollments.filter((enrollment) => enrollment.user === userId);
};