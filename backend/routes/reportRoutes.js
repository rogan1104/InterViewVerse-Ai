const express = require("express");
const router = express.Router();

const { getReport } = require("../controllers/reportController");

router.post("/generateReport", getReport);

module.exports = router;