import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Download, RotateCcw, CheckCircle2, AlertTriangle, ArrowDown } from "lucide-react";
//import { useLocation } from "@tanstack/react-router";
import { interviewResult } from "@/lib/mock-data";
export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Results — InterviewVerse AI" },
      { name: "description", content: "Your AI interview performance report." },
    ],
  }),
  component: Report,
});

function Report() {
  //const location = useLocation();
  const r = interviewResult;

  //const r = location.state?.report;  
    // if (!r) {
    //   return (
    //     <AppShell title="Interview Report">
    //       <div className="surface-card p-8">
    //        No report found.
    //       </div>
    //     </AppShell>
    //   );
    // }
    return(
    <AppShell title="Interview Report">
      <div className="max-w-6xl space-y-6">
        {/* Hero score */}
        <div className="surface-card p-8 grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <CircularScore value={r.overall} />
          <div>
            <p className="text-sm text-primary font-medium">Overall</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">Strong performance — keep iterating.</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              You scored above average across technical and problem solving. Confidence and API depth are
              your highest-leverage improvements.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition">
                <Download className="size-4" /> Download Report
              </button>
              <Link
                to="/interview"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-medium hover:bg-accent transition"
              >
                <RotateCcw className="size-4" /> Retry Interview
              </Link>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {r.breakdown.map((b) => (
            <div key={b.label} className="surface-card p-5">
              <p className="text-xs text-muted-foreground">{b.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{b.value}</p>
              <div className="mt-3 h-1.5 rounded-full bg-accent overflow-hidden">
                <div className="h-full gradient-bg" style={{ width: `${b.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="surface-card p-6">
          <h3 className="font-medium">Performance Across Skills</h3>
          <div className="mt-6 flex items-end gap-4 h-56">
            {r.breakdown.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-accent rounded-t-lg overflow-hidden flex items-end" style={{ height: "100%" }}>
                  <div
                    className="w-full gradient-bg rounded-t-lg transition-all"
                    style={{ height: `${b.value}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="surface-card p-6">
            <h3 className="font-medium flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Strengths</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {r.strengths.map((s) => (
                <li key={s} className="flex gap-2"><span className="text-success">•</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-6">
            <h3 className="font-medium flex items-center gap-2"><AlertTriangle className="size-4 text-warning" /> Weaknesses</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {r.weaknesses.map((s) => (
                <li key={s} className="flex gap-2"><span className="text-warning">•</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Roadmap */}
        <div className="surface-card p-6">
          <h3 className="font-medium">Improvement Roadmap</h3>
          <div className="mt-6 space-y-3">
            {r.roadmap.map((s, i) => (
              <div key={s.week}>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/40 hover:border-primary/40 transition">
                  <div className="size-10 rounded-lg gradient-bg grid place-items-center text-sm font-semibold text-white shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{s.week}</p>
                    <p className="font-medium">{s.focus}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.detail}</p>
                  </div>
                </div>
                {i < r.roadmap.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="size-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function CircularScore({ value }: { value: number }) {
  const size = 180;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.18 260)" />
            <stop offset="100%" stopColor="oklch(0.62 0.21 290)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#scoreGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-4xl font-semibold tracking-tight">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">Interview Score</div>
        </div>
      </div>
    </div>
  );
}
