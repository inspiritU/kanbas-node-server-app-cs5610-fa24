import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    // delete assignment
    // app.delete("/api/assignments/:assignmentId", (req, res) => {
    //   const { assignmentId } = req.params;
    //   const status = assignmentsDao.deleteAssignment(assignmentId);
    //   res.send(status);
    // });
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        try {
            const result = await assignmentsDao.deleteAssignment(assignmentId);

            res.json({
                acknowledged: result.acknowledged,
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    // update assignment
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await assignmentsDao.updateAssignment(
            assignmentId,
            assignmentUpdates
        );
        res.send(status);
    });
}