import express from "express";
import "dotenv/config";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const app = express();

// CORS 配置
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000", // 确保环境变量设置正确
    })
);

// Session 配置
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN, // 确保环境变量设置正确
    };
}
app.use(session(sessionOptions));

// JSON 解析
app.use(express.json());

// 路由
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);

// 默认错误处理
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({ error: err.message });
});

// 监听端口
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});