const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateReport = async (conversation) => {

    const prompt = `
You are a senior FAANG interviewer.

Below is the interview transcript.

${conversation}

Evaluate the candidate.

Return ONLY valid JSON.

{
  "overall": 85,
  "breakdown": [
    {
      "label": "Technical",
      "value": 82
    },
    {
      "label": "Communication",
      "value": 80
    },
    {
      "label": "Confidence",
      "value": 84
    },
    {
      "label": "Problem Solving",
      "value": 86
    }
  ],
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "...",
    "..."
  ],
  "roadmap": [
    {
      "week": "Week 1",
      "focus": "...",
      "detail": "..."
    },
    {
      "week": "Week 2",
      "focus": "...",
      "detail": "..."
    },
    {
      "week": "Week 3",
      "focus": "...",
      "detail": "..."
    }
  ]
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

module.exports = {
    generateReport,
};