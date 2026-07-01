const {
    generateFirstQuestion,
    generateNextQuestion,
} = require("../services/interviewService");
const nextQuestion = async (req, res) => {
    try {
        const { company, role, difficulty, answer } = req.body;

        console.log("========== NEXT QUESTION ==========");
        console.log(req.body);

        const result = await generateNextQuestion(
            company,
            role,
            difficulty,
            answer
        );

        console.log(result);

        res.json(result);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to generate next question",
        });
    }
};
const startInterview = async (req, res) => {
    try {
        const {
            company,
            role,
            difficulty,
            resume,
        } = req.body;

        console.log("========== START INTERVIEW ==========");
        console.log(req.body);

        const result = await generateFirstQuestion(
            company,
            role,
            difficulty,
            resume
        );

        console.log("========== FIRST QUESTION ==========");
        console.log(result);

        return res.status(200).json({
            success: true,
            question: result.question,
        });

    } catch (error) {
        console.error("Interview Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to start interview.",
            error: error.message,
        });
    }
};

module.exports = {
    startInterview,
    nextQuestion,
};