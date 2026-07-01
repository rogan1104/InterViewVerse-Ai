import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useEffect, useRef, useState } from "react";
//import { startInterview } from "@/lib/api";
import { startInterview, nextQuestion } from "@/lib/api";
import {
  Mic,
  Send,
  Sparkles,
  Flame,
  Clock,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import {
  companies,
  roles,
  difficulties,
  initialInterview,
  sampleAIReplies,
  stressReplies,
  type ChatMsg,
} from "@/lib/mock-data";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Interview — InterviewVerse AI" },
      { name: "description", content: "Practice an adaptive AI interview." },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  const [company, setCompany] = useState(companies[0]);
  const [role, setRole] = useState(roles[0]);
  const [difficulty, setDifficulty] = useState(difficulties[1]);
  const [stress, setStress] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);  const [loadingInterview, setLoadingInterview] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [seconds, setSeconds] = useState(18 * 60 + 21);
  const [qIndex, setQIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
  async function loadInterview() {
    try {
      setLoadingInterview(true);

      const response = await startInterview({
        company,
        role,
        difficulty,
        resume: {
          name: "Rohan",
          skills: ["Java", "Spring Boot", "Docker", "AWS"],
          projects: ["Creator Platform", "AI Chess Engine"],
        },
      });

const firstQuestion: ChatMsg = {  id: Date.now(),
  role: "ai",
  text: response.question,
};

setMessages([firstQuestion]);

setConversation([
  {
    question: response.question,
    answer: "",
  },
]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInterview(false);
    }
  }

  loadInterview();
}, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

 const send = async () => {
  if (!draft.trim()) return;

  const userMsg: ChatMsg = {
    id: Date.now(),
    role: "user",
    text: draft.trim(),
  };

  setMessages((m) => [...m, userMsg]);
  setConversation((prev) => {
  const updated = [...prev];

  if (updated.length > 0) {
    updated[updated.length - 1].answer = answer;
  }

  return updated;
});

  const answer = draft.trim();
  setDraft("");
  setTyping(true);

  try {
    const data = await nextQuestion({
  company,
  role,
  difficulty,
  answer,
});

    //const data = await response.json();

    setMessages((m) => [
      ...m,
      {
        id: Date.now() + 1,
        role: "ai",
        text: data.question,
      },
    ]);
    setConversation((prev) => [
  ...prev,
  {
    question: data.question,
    answer: "",
  },
]);

    setQIndex((q) => Math.min(q + 1, 10));
  } catch (err) {
    console.error(err);
  } finally {
    setTyping(false);
  }
};

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <AppShell title="AI Interview">
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4">
          {/* Top bar */}
          <div className="surface-card p-4 flex flex-wrap items-center gap-3">
            <Select label="Company" value={company} options={companies} onChange={setCompany} />
            <Select label="Role" value={role} options={roles} onChange={setRole} />
            <Select label="Difficulty" value={difficulty} options={difficulties} onChange={setDifficulty} />
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50">
              <Clock className="size-4 text-warning" />
              <span className="font-mono text-sm tabular-nums">{mm}:{ss}</span>
            </div>
          </div>

          {/* Chat */}
          <div className={`surface-card transition-colors ${stress ? "border-destructive/40" : ""}`}>
            <div ref={scrollRef} className="h-[60vh] overflow-y-auto p-6 space-y-5">
              <div className="text-center">
                <div className={`inline-flex size-16 rounded-2xl grid place-items-center ${stress ? "bg-destructive/20 border border-destructive/30" : "gradient-bg"}`}>
                  <Sparkles className="size-7 text-white" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {stress ? `${company} Recruiter · Stress Mode` : `${company} AI Recruiter`}
                </p>
              </div>

              {loadingInterview ? (
  <p className="text-center text-muted-foreground">
    AI Recruiter is preparing your interview...
  </p>
) : (
  messages.map((m) => (
    <Bubble key={m.id} msg={m} stress={stress} />
  ))
)}

              {typing && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="size-2 rounded-full bg-primary typing-dot" />
                  <span className="size-2 rounded-full bg-primary typing-dot" style={{ animationDelay: "0.15s" }} />
                  <span className="size-2 rounded-full bg-primary typing-dot" style={{ animationDelay: "0.3s" }} />
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-border p-3 flex items-end gap-2">
              <button className="size-10 rounded-lg border border-border hover:bg-accent grid place-items-center shrink-0">
                <Mic className="size-4" />
              </button>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Type your answer…"
                className="flex-1 resize-none rounded-lg bg-background/60 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary/60 max-h-32"
              />
              <button
                onClick={send}
                className="h-10 px-4 rounded-lg gradient-bg text-white text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition"
              >
                Send <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="font-medium">Interview Progress</h3>
            <p className="mt-1 text-xs text-muted-foreground">Question {qIndex} / 10</p>
            <div className="mt-3 h-2 rounded-full bg-accent overflow-hidden">
              <div className="h-full gradient-bg" style={{ width: `${(qIndex / 10) * 100}%` }} />
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: "Technical", v: 82 },
                { label: "Communication", v: 76 },
                { label: "Confidence", v: stress ? 58 : 71 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{s.label}</span>
                    <span>{s.v}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-accent overflow-hidden">
                    <div className="h-full gradient-bg" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <Flame className={`size-4 ${stress ? "text-destructive" : "text-muted-foreground"}`} />
                  Stress Mode
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Simulate recruiter pressure</p>
              </div>
              <button
                onClick={() => setStress((s) => !s)}
                className={`relative h-6 w-11 rounded-full transition-colors ${stress ? "bg-destructive" : "bg-accent"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                    stress ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
            {stress && (
              <p className="mt-3 text-xs text-destructive/90 leading-relaxed">
                Recruiter is now challenging and skeptical. Answers will be probed harder.
              </p>
            )}
          </div>

          <Link
            to="/report"
            className="surface-card p-5 block hover:border-primary/40 transition group"
          >
            <p className="text-xs text-muted-foreground">When you're done</p>
            <p className="mt-1 font-medium inline-flex items-center gap-2 group-hover:text-primary transition">
              End & View Report <ArrowRight className="size-4" />
            </p>
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-medium focus:outline-none appearance-none pr-5"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-card">{o}</option>
        ))}
      </select>
      <ChevronDown className="size-3.5 text-muted-foreground absolute right-2 pointer-events-none" />
    </label>
  );
}

function Bubble({ msg, stress }: { msg: ChatMsg; stress: boolean }) {
  if (msg.role === "ai") {
    return (
      <div className="flex gap-3 max-w-[85%]">
        <div className={`size-8 rounded-lg grid place-items-center shrink-0 ${stress ? "bg-destructive/20 border border-destructive/30" : "gradient-bg"}`}>
          <Sparkles className="size-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">AI Recruiter</p>
          <div className="rounded-2xl rounded-tl-sm border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed">
            {msg.text}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%]">
        <p className="text-xs text-muted-foreground mb-1 text-right">You</p>
        <div className="rounded-2xl rounded-tr-sm gradient-bg text-white px-4 py-3 text-sm leading-relaxed">
          {msg.text}
        </div>
      </div>
    </div>
  );
}
