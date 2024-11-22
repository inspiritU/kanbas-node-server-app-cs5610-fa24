import * as dao from "./dao.js";
import Database from "../Database/index.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });

    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        dao.deleteCourse(courseId);
        res.sendStatus(204);
    });

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        dao.updateCourse(courseId, courseUpdates);
        res.sendStatus(204);
    });

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });

    // Route to get all modules for a specific course
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params; // Parse courseId from URL
        const modules = modulesDao.findModulesForCourse(courseId); // Retrieve modules for the course
        res.json(modules); // Respond with the modules
    });




}