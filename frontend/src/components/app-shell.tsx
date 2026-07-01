import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FileText, MessagesSquare, BarChart3, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/interview", label: "Interview", icon: MessagesSquare },
  { to: "/report", label: "Report", icon: BarChart3 },
];

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-sidebar/60 backdrop-blur-xl sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <div className="size-8 rounded-lg gradient-bg grid place-items-center">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">InterviewVerse</span>
        </Link>
        <nav className="flex flex-col gap-1 p-3">
          {nav.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4">
          <div className="surface-card p-4">
            <p className="text-xs text-muted-foreground">Pro Tip</p>
            <p className="text-sm mt-1">Turn on Stress Mode to simulate real recruiter pressure.</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/70 backdrop-blur-xl z-10">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Rohan</span>
            <div className="size-8 rounded-full gradient-bg grid place-items-center text-sm font-semibold text-white">
              R
            </div>
          </div>
        </header>
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
