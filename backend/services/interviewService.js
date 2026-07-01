const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateFirstQuestion = async (
    company,
    role,
    difficulty,
    resume
) => {

    const prompt = `
You are an experienced technical interviewer.

Generate ONLY ONE interview question.

Company: ${company}

Role: ${role}

Difficulty: ${difficulty}

Candidate Resume:

${JSON.stringify(resume, null, 2)}

Rules:

- Ask only ONE question.
- Make it personalized using the candidate's skills/projects.
- Do not explain.
- Do not greet.
- Do not use markdown.

Return ONLY JSON.

{
    "question":"..."
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    let text = response.text.trim();

    text = text
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "")
        .trim();

    return JSON.parse(text);
};
const generateNextQuestion = async (
    company,
    role,
    difficulty,
    answer
) => {
    const prompt = `
You are a senior technical interviewer.

Company: ${company}
Role: ${role}
Difficulty: ${difficulty}

The candidate just answered:

"${answer}"

Ask ONLY the next interview question.

Do not explain.
Do not give feedback.
Return only the question.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return {
        success: true,
        question: response.text.trim(),
    };
};

module.exports = {
    generateFirstQuestion,
    generateNextQuestion,

};