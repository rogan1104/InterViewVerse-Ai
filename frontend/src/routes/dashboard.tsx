import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import {
  FileText,
  Play,
  History,
  BarChart3,
  TrendingUp,
  Trophy,
  Target,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { dashboardStats, recentActivity, userMock } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — InterviewVerse AI" },
      { name: "description", content: "Track your AI interview practice progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="max-w-6xl">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Hello, <span className="gradient-text">{userMock.name}</span>
            </h2>
            <p className="mt-1 text-muted-foreground">Ready for your next interview?</p>
          </div>
          <Link
            to="/interview"
            className="inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
          >
            <Play className="size-4" /> Start New Interview
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat icon={History} label="Interviews Completed" value={dashboardStats.interviewsCompleted} accent="text-primary" />
          <Stat icon={TrendingUp} label="Average Score" value={`${dashboardStats.averageScore}%`} accent="text-success" />
          <Stat icon={Trophy} label="Strongest Skill" value={dashboardStats.strongestSkill} accent="text-secondary" />
          <Stat icon={AlertTriangle} label="Weakest Skill" value={dashboardStats.weakestSkill} accent="text-warning" />
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard to="/resume" icon={FileText} title="Resume Analysis" desc="Upload your latest resume for AI parsing." />
          <ActionCard to="/interview" icon={Play} title="Start Interview" desc="Pick a company, role and difficulty." />
          <ActionCard to="/dashboard" icon={History} title="Past Interviews" desc="Review previous attempts and feedback." />
          <ActionCard to="/report" icon={BarChart3} title="Performance Reports" desc="See detailed scoring across skills." />
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="surface-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Recent Activity</h3>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {recentActivity.map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-lg bg-accent grid place-items-center text-sm font-medium">
                      {a.company.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{a.company} · {a.role}</p>
                      <p className="text-xs text-muted-foreground">{a.when}</p>
                    </div>
                  </div>
                  <ScorePill score={a.score} />
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-6">
            <h3 className="font-medium flex items-center gap-2"><Target className="size-4 text-primary" /> Skill Progress</h3>
            <div className="mt-5 space-y-4">
              {[
                { label: "Technical", v: 88 },
                { label: "Communication", v: 76 },
                { label: "Problem Solving", v: 82 },
                { label: "Confidence", v: 70 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{s.label}</span>
                    <span>{s.v}%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-accent overflow-hidden">
                    <div className="h-full gradient-bg rounded-full" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <Icon className={`size-4 ${accent}`} />
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function ActionCard({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="surface-card p-5 group hover:-translate-y-0.5 hover:border-primary/40 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="size-9 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center">
          <Icon className="size-4 text-primary" />
        </div>
        <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition" />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </Link>
  );
}

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-success bg-success/10 border-success/20"
    : score >= 70 ? "text-primary bg-primary/10 border-primary/20"
    : "text-warning bg-warning/10 border-warning/20";
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${color}`}>
      Score: {score}
    </span>
  );
}
