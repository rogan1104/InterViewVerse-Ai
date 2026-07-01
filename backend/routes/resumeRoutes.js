const express = require("express");
const router = express.Router();

const { uploadResume } = require("../controllers/resumeController");
const upload = require("../middleware/upload");

router.post(
    "/uploadResume",

    (req, res, next) => {
        console.log("🔥 Route reached");
        next();
    },

    upload.single("resume"),

    (req, res, next) => {
        console.log("🔥 Multer finished");
        console.log("req.file:", req.file);
        next();
    },

    uploadResume
);

module.exports = router;