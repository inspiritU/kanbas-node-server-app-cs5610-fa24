import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import HelloRoutes from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";
import session from "express-session";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";

console.log("Environment Variables:", process.env.MONGO_CONNECTION_STRING);

const CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING || "mongodb+srv://caoxian:Dr.cx2024@kabas.prm0g.mongodb.net/?retryWrites=true&w=majority&appName=Kabas";
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            const allowedOrigins = [
                process.env.NETLIFY_URL,
                "http://localhost:3000",

            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);



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
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(express.json());

Lab5(app);
HelloRoutes(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

app.listen(process.env.PORT || 4000);