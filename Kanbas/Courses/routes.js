import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import Database from "../Database/index.js";

export default function CourseRoutes(app) {
    // create course
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }
        res.json(course);
    });

    // get people for that course
    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);

    // get modules for that course
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    // create module for that course
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });

    // get assignments for that course
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // create assignment for that course
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await assignmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    });

    // get all courses
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });

    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;

        try {
            // Delete the course
            const courseStatus = await dao.deleteCourse(courseId);

            if (courseStatus.acknowledged && courseStatus.deletedCount > 0) {
                // If the course was successfully deleted, delete related enrollments
                const enrollmentsStatus =
                    await enrollmentsDao.deleteEnrollmentsByCourse(courseId);

                res.send({
                    message: "Course and associated enrollments deleted successfully",
                    courseStatus,
                    enrollmentsStatus,
                });
            } else {
                res.status(404).send({ message: "Course not found" });
            }
        } catch (error) {
            console.error("Error deleting course and enrollments:", error);
            res
                .status(500)
                .send({ error: "Failed to delete course and enrollments" });
        }
    });

    // update course
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });
}