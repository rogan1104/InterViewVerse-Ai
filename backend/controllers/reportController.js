const { generateReport } = require("../services/reportService");

const getReport = async (req, res) => {
    try {

        const { conversation } = req.body;

        console.log("========== GENERATING REPORT ==========");
        console.log(conversation);

        const report = await generateReport(conversation);

        console.log(report);

        res.json({
            success: true,
            report
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to generate report."
        });

    }
};
//const { generateReport } = require("../services/interviewService");



module.exports = {
    getReport
    
};