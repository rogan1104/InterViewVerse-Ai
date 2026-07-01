console.log("🔥 NEW resumeController loaded");
const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResume } = require("../services/geminiService");
const uploadResume = async (req, res) => {
    try {
        console.log("===== CONTROLLER START =====");

        console.log("REQ.FILE:");
        console.log(req.file);

        console.log("Extracting PDF...");

        const resumeText = await extractTextFromPDF(req.file.path);

        console.log("PDF extracted successfully!");
        console.log(resumeText.substring(0, 300));

        console.log("Calling Gemini...");

        
        console.log("Gemini finished!");
        const analysis = await analyzeResume(resumeText);

// Remove markdown wrappers if Gemini returns them
const cleanAnalysis = analysis
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const parsedAnalysis = JSON.parse(cleanAnalysis);

return res.json({
    success: true,
    analysis: parsedAnalysis
});

    } catch (error) {
        console.error("ERROR OCCURRED:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

module.exports = {
    uploadResume
};