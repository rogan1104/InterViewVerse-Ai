import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileSearch,
  Brain,
  Building2,
  LineChart,
  Sparkles,
  Eye,
  Users,
  Activity,
  Box,
  Upload,
  MessagesSquare,
  Gauge,
  Target,
  Check,
  X,
  Mic,
  Code2,
  CheckCircle2,
  TrendingUp,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InterviewVerse AI — Practice Tomorrow's AI Hiring Process Today" },
      {
        name: "description",
        content:
          "Master AI-powered hiring through adaptive interviews, resume intelligence, company simulations, and personalized performance insights.",
      },
      { property: "og:title", content: "InterviewVerse AI" },
      { property: "og:description", content: "Practice Tomorrow's AI Hiring Process Today." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="h-16 px-6 md:px-10 flex items-center justify-between border-b border-border sticky top-0 z-20 bg-background/70 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg gradient-bg grid place-items-center glow-primary">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">InterviewVerse AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#product" className="hover:text-foreground transition">Product</a>
          <a href="#roadmap" className="hover:text-foreground transition">Roadmap</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition">
            Login
          </Link>
          <Link
            to="/interview"
            className="inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Start Interview <ArrowRight className="size-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 md:px-10 pt-20 pb-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            New · Adaptive AI interviews with stress simulation
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            InterviewVerse <span className="gradient-text">AI</span>
          </h1>
          <p className="mt-5 text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto font-medium">
            Practice Tomorrow's AI Hiring Process Today.
          </p>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Master AI-powered hiring through adaptive interviews, resume intelligence,
            company simulations, and personalized performance insights.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/interview"
              className="inline-flex items-center gap-2 rounded-lg gradient-bg px-6 py-3 text-sm font-medium text-white glow-primary hover:opacity-90 transition"
            >
              Start Interview <ArrowRight className="size-4" />
            </Link>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-medium hover:bg-accent transition"
            >
              Explore Platform
            </a>
          </div>

          {/* Hero dashboard preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-50" style={{ background: "var(--gradient-primary)" }} />
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="product" className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm text-primary font-medium">How It Works</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              From resume to offer — one continuous loop.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every step is designed to mirror the real AI hiring funnel candidates face today.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Upload, title: "Upload Resume", desc: "Drop a PDF" },
              { icon: FileSearch, title: "AI Analysis", desc: "Skills & gaps" },
              { icon: Brain, title: "Adaptive Interview", desc: "Real questions" },
              { icon: Gauge, title: "AI Evaluation", desc: "Scoring engine" },
              { icon: LineChart, title: "Performance Report", desc: "Deep insights" },
              { icon: Target, title: "Improvement Roadmap", desc: "Weekly plan" },
            ].map((s, i) => (
              <div key={s.title} className="relative">
                <div className="surface-card p-5 h-full">
                  <div className="size-9 rounded-lg gradient-bg grid place-items-center text-xs font-semibold text-white">
                    {i + 1}
                  </div>
                  <s.icon className="size-5 text-primary mt-4" />
                  <h3 className="mt-3 text-sm font-medium">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </div>
                {i < 5 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why InterviewVerse */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm text-secondary font-medium">Why InterviewVerse</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              The way candidates prep is broken.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Generic videos and random question banks weren't built for AI-driven hiring. We were.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <div className="surface-card p-7 border-destructive/20">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Traditional</p>
              <h3 className="mt-1 text-xl font-semibold">Old-school interview prep</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  "Random YouTube videos",
                  "Generic question banks",
                  "No personalized feedback",
                  "No AI recruiter simulation",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-muted-foreground">
                    <X className="size-4 text-destructive mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-7 border-primary/40 glow-primary">
              <p className="text-xs uppercase tracking-wider text-primary">InterviewVerse AI</p>
              <h3 className="mt-1 text-xl font-semibold">The modern way to prepare</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  "Resume-aware interviews",
                  "AI recruiter simulation",
                  "Personalized feedback",
                  "Custom improvement roadmap",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="size-4 text-success mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core features */}
      <section id="features" className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-sm text-primary font-medium">Platform</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              Built for the next generation of hiring.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every module mirrors what real AI recruiters do today — and what they'll do tomorrow.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <FeatureCard
              icon={FileSearch}
              title="Resume Intelligence"
              desc="AI extracts skills, projects, strengths and recommends interview paths tailored to your profile."
            />
            <FeatureCard
              icon={Brain}
              title="Adaptive Interviews"
              desc="Questions evolve with you. Strong answers unlock deeper follow-ups; weak ones get probed."
            />
            <FeatureCard
              icon={Building2}
              title="Company Simulations"
              desc="Practice for Google, Microsoft, Amazon, Atlassian, TCS and high-growth startups."
            />
            <FeatureCard
              icon={LineChart}
              title="AI Feedback"
              desc="Instant scores across technical depth, communication, confidence and problem solving."
            />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-6 md:px-10 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-muted-foreground tracking-wider uppercase">
            Built for modern AI hiring
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
            {["Google", "Microsoft", "Amazon", "Adobe", "OpenAI", "Meta"].map((n) => (
              <span key={n} className="text-lg md:text-xl font-semibold tracking-tight text-muted-foreground hover:text-foreground transition">
                {n}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground/70 max-w-xl mx-auto">
            Brands shown represent interview styles practiced on InterviewVerse, not partnerships.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-sm text-secondary font-medium">Roadmap</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              The future of InterviewVerse.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We're building the most immersive AI hiring practice environment ever shipped.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <div className="surface-card p-7">
              <div className="flex items-center gap-2 text-sm text-success font-medium">
                <CheckCircle2 className="size-4" /> Available Now
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: FileSearch, t: "Resume Intelligence" },
                  { icon: Brain, t: "Adaptive AI Interviews" },
                  { icon: LineChart, t: "AI Performance Reports" },
                ].map((r) => (
                  <li key={r.t} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-border">
                    <div className="size-8 rounded-lg bg-success/10 border border-success/20 grid place-items-center">
                      <r.icon className="size-4 text-success" />
                    </div>
                    <span className="text-sm font-medium">{r.t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-7">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <Star className="size-4" /> Coming Soon
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Eye, t: "Eye Contact Analysis" },
                  { icon: Activity, t: "Behavior Analytics" },
                  { icon: Users, t: "AI Group Discussions" },
                  { icon: Mic, t: "Voice Emotion Detection" },
                  { icon: Box, t: "AR Interview Rooms" },
                  { icon: Code2, t: "Coding Sandbox" },
                ].map((r) => (
                  <li key={r.t} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-border hover:border-primary/40 transition">
                    <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center">
                      <r.icon className="size-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{r.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="px-6 md:px-10 py-24 border-t border-border">
        <div className="max-w-4xl mx-auto surface-card p-10 md:p-14 text-center">
          <p className="text-sm text-primary font-medium">Pricing — Coming Soon</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Free during early access.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Every feature is unlocked while we onboard our first wave of candidates. Build the
            interview muscle now — pricing arrives once we hit GA.
          </p>
          <div className="mt-7">
            <Link
              to="/interview"
              className="inline-flex items-center gap-2 rounded-lg gradient-bg px-6 py-3 text-sm font-medium text-white glow-primary hover:opacity-90 transition"
            >
              Start your first interview <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 md:px-10 py-8 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md gradient-bg grid place-items-center">
            <Sparkles className="size-3 text-white" />
          </div>
          InterviewVerse AI · 2026
        </div>
        <div>Practice Tomorrow's AI Hiring Process Today.</div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="group surface-card p-7 hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300">
      <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center group-hover:bg-primary/20 transition">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="mt-5 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

/* Hero dashboard preview — composed mock */
function HeroPreview() {
  return (
    <div className="surface-card p-3 md:p-4 max-w-5xl mx-auto text-left">
      <div className="rounded-xl bg-background/80 border border-border p-4 md:p-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr_1fr] gap-4">
          {/* Resume score */}
          <div className="rounded-lg border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileSearch className="size-3.5 text-primary" /> Resume Score
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-4xl font-semibold tracking-tight gradient-text">86</span>
              <span className="text-xs text-success mb-1 inline-flex items-center gap-1">
                <TrendingUp className="size-3" /> +12
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { l: "ATS Match", v: 92 },
                { l: "Skill Density", v: 78 },
                { l: "Project Depth", v: 84 },
              ].map((s) => (
                <div key={s.l}>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{s.l}</span><span>{s.v}%</span>
                  </div>
                  <div className="h-1 mt-0.5 rounded-full bg-accent overflow-hidden">
                    <div className="h-full gradient-bg" style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat preview */}
          <div className="rounded-lg border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessagesSquare className="size-3.5 text-primary" /> AI Interview · Google · SDE
            </div>
            <div className="mt-3 space-y-3">
              <div className="flex gap-2">
                <div className="size-6 rounded-md gradient-bg grid place-items-center shrink-0">
                  <Sparkles className="size-3 text-white" />
                </div>
                <div className="rounded-lg rounded-tl-sm border border-border bg-background/60 px-3 py-2 text-xs">
                  Walk me through how you'd design a low-latency RAG pipeline.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-lg rounded-tr-sm gradient-bg text-white px-3 py-2 text-xs max-w-[80%]">
                  I'd shard the vector store, cache embeddings at the edge, and stream tokens…
                </div>
              </div>
              <div className="flex gap-2">
                <div className="size-6 rounded-md gradient-bg grid place-items-center shrink-0">
                  <Sparkles className="size-3 text-white" />
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-2">
                  <span className="size-1.5 rounded-full bg-primary typing-dot" />
                  <span className="size-1.5 rounded-full bg-primary typing-dot" style={{ animationDelay: "0.15s" }} />
                  <span className="size-1.5 rounded-full bg-primary typing-dot" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: chart + skills */}
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-lg border border-border bg-card/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <LineChart className="size-3.5 text-primary" /> Performance
              </div>
              <svg viewBox="0 0 200 60" className="mt-2 w-full h-16">
                <defs>
                  <linearGradient id="hpFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,45 L25,38 L50,40 L75,30 L100,25 L125,28 L150,18 L175,15 L200,10 L200,60 L0,60 Z" fill="url(#hpFill)" />
                <path d="M0,45 L25,38 L50,40 L75,30 L100,25 L125,28 L150,18 L175,15 L200,10" stroke="#4F8CFF" strokeWidth="1.5" fill="none" />
              </svg>
              <div className="mt-1 text-xs text-success">+18% this week</div>
            </div>
            <div className="rounded-lg border border-border bg-card/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Target className="size-3.5 text-primary" /> Top Skills
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["React", "RAG", "System Design", "SQL", "Python"].map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
