const express = require("express");
const router = express.Router();

const {
    startInterview,
    nextQuestion
} = require("../controllers/interviewController");

router.post("/startInterview", startInterview);
router.post("/nextQuestion", nextQuestion);

module.exports = router;