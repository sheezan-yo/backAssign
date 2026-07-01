require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

connectDB();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://back-assignment.vercel.app"
    ],
    credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on", PORT);
});