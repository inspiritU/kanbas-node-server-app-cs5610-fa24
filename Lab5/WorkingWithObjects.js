const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const module = {
    id: "CS5610",
    name: "Web Development",
    description: "Learn modern web development techniques",
    course: "CS5610 Web Development",
};

export default function WorkingWithObjects(app) {
    // 返回 module 对象
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });

    // 返回 module 名称
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });

    // 更新 module 名称
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    // 更新 module 描述
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });

    // 返回 assignment 对象
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });


    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

}