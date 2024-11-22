import express from "express";
import * as enrollmentsDao from "./dao.js";

export default function enrollmentRoutes(app) {
    const router = express.Router();

    /**
     * Enroll a user in a course.
     */
    router.post("/", (req, res) => {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "Missing userId or courseId" });
        }
        enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.status(200).json({ message: "Enrollment successful" });
    });

    /**
     * Unenroll a user from a course.
     */
    router.delete("/", (req, res) => {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "Missing userId or courseId" });
        }
        enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.status(200).json({ message: "Unenrollment successful" });
    });

    /**
     * Get enrollments for a specific user.
     */
    router.get("/:userId", (req, res) => {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }
        const enrollments = enrollmentsDao.findEnrollmentsByUser(userId);
        res.status(200).json(enrollments);
    });

    // Mount the router on the `/api/enrollments` base path
    app.use("/api/enrollments", router);
}