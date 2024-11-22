import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Create a new assignment
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = { ...req.body, course: courseId };
        const newAssignment = dao.createAssignment(assignment);
        res.status(201).send(newAssignment);
    });

    // Get assignments for a course
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.send(assignments);
    });

    // Update an assignment
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const updatedAssignment = dao.updateAssignment(assignmentId, req.body);
        if (updatedAssignment) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });

    // Delete an assignment
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        dao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    });
}