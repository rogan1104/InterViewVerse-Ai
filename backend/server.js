const express = require("express");
const cors = require("cors");
require("dotenv").config();
const reportRoutes = require("./routes/reportRoutes");

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const interviewRoutes = require("./routes/interviewRoutes");
app.use(cors());
app.use(express.json());
app.use("/api", resumeRoutes);
app.use("/api", interviewRoutes);
app.use("/api", reportRoutes);
//app.use("/api/interview", interviewRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("🚀 InterviewVerse AI Backend is Running!");
});

// Resume API
//app.use("/api", resumeRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});