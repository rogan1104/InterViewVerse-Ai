const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {
    try {
        const prompt = `
You are an expert technical recruiter.

Analyze the following resume and return ONLY valid JSON.

Return this structure:

{
  "name": "",
  "education": "",
  "skills": [],
  "projects": [],
  "strengths": [],
  "recommendedRoles": []
}

Resume:
${resumeText}
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
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};

module.exports = {
    analyzeResume,
};