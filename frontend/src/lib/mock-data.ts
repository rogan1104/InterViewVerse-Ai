// Mock data for InterviewVerse AI
export const userMock = {
  name: "Rohan",
  email: "rohan@interviewverse.ai",
};

export const dashboardStats = {
  interviewsCompleted: 12,
  averageScore: 82,
  strongestSkill: "React",
  weakestSkill: "SQL",
};

export const recentActivity = [
  { id: 1, company: "Google", role: "AI Engineer", score: 84, when: "Yesterday" },
  { id: 2, company: "Microsoft", role: "Frontend Engineer", score: 79, when: "2 days ago" },
  { id: 3, company: "Amazon", role: "SDE-1", score: 72, when: "Last week" },
  { id: 4, company: "TCS", role: "Systems Engineer", score: 88, when: "Last week" },
];

export const companies = ["Google", "Microsoft", "Amazon", "TCS", "Startup"];
export const roles = ["AI Engineer", "Frontend Engineer", "Backend Engineer", "SDE-1", "Data Scientist"];
export const difficulties = ["Easy", "Medium", "Hard"];

export const resumeAnalysis = {
  skills: ["React", "Node.js", "Python", "AWS", "RAG", "TypeScript", "PostgreSQL"],
  projects: [
    "RAG-powered Document Assistant",
    "Real-time Collaboration Editor",
    "ML Pipeline for Sentiment Analysis",
  ],
  strengths: ["Strong full-stack foundation", "Hands-on with LLMs & RAG", "Clear project ownership"],
  weaknesses: ["Limited system design exposure", "No production ML experience"],
  recommendedLevel: "Intermediate",
  recommendedRole: "AI Product Engineer",
  communication: "Intermediate",
};

export type ChatMsg = { id: number; role: "ai" | "user"; text: string };

export const initialInterview: ChatMsg[] = [
  { id: 1, role: "ai", text: "Hi Rohan — I'm your AI recruiter from Google. Let's begin. Tell me about yourself." },
];

export const sampleAIReplies = [
  "Interesting. Can you walk me through a project where you used RAG in production?",
  "How would you reduce latency in a retrieval pipeline serving 10k QPS?",
  "Describe a time you disagreed with a teammate on a technical decision.",
  "Let's go deeper — explain how you'd design a vector search service from scratch.",
  "What trade-offs did you make between accuracy and cost on that project?",
];

export const stressReplies = [
  "I'm not convinced. Can you justify that answer with concrete numbers?",
  "This looks impressive without much implementation effort. Prove it.",
  "Your last answer was vague. Be specific — what exactly did you build?",
];

export const interviewResult = {
  overall: 87,
  breakdown: [
    { label: "Technical", value: 89 },
    { label: "Communication", value: 84 },
    { label: "Problem Solving", value: 88 },
    { label: "Confidence", value: 82 },
  ],
  strengths: [
    "Excellent React knowledge",
    "Strong system thinking",
    "Clear communication",
  ],
  weaknesses: [
    "Needs better API explanation",
    "Improve SQL depth",
  ],
  roadmap: [
    { week: "Week 1", focus: "Practice DSA", detail: "Arrays, hashmaps, two-pointer drills" },
    { week: "Week 2", focus: "System Design", detail: "Design vector DB, caching, scaling" },
    { week: "Week 3", focus: "Behavioral", detail: "STAR-format storytelling & ownership" },
  ],
};
