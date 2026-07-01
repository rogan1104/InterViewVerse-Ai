import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
//import { resumeAnalysis } from "@/lib/mock-data";
import { uploadResume } from "@/lib/api";
export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume Analysis — InterviewVerse AI" },
      { name: "description", content: "Upload your resume for AI-powered analysis." },
    ],
  }),
  component: ResumePage,
});

type Stage = "idle" | "analyzing" | "done";

function ResumePage() {
  const [stage, setStage] = useState<Stage>("idle");
const [fileName, setFileName] = useState<string | null>(null);

const [analysis, setAnalysis] = useState<any>(null);
  const handleFile = async (f: File | null) => {
  if (!f) return;

  try {
    setFileName(f.name);
    setStage("analyzing");

    const response = await uploadResume(f);

    console.log("========== BACKEND RESPONSE ==========");
    console.log(response);
    console.log("======================================");
setAnalysis(response.analysis);
    setStage("done");

  } catch (error) {
    console.error("Upload failed:", error);
    alert("Resume upload failed.");
    setStage("idle");
  }
};

  return (
    <AppShell title="Resume Analysis">
      <div className="max-w-5xl">
        {stage === "idle" && (
          <UploadCard onFile={handleFile} />
        )}

        {stage === "analyzing" && (
          <div className="surface-card p-12 text-center">
            <div className="size-14 rounded-2xl gradient-bg grid place-items-center mx-auto glow-primary">
              <Sparkles className="size-6 text-white animate-pulse" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">Analyzing Resume…</h2>
            <p className="mt-2 text-sm text-muted-foreground">{fileName}</p>
            <div className="mt-8 max-w-md mx-auto space-y-3">
              <div className="h-3 rounded-md shimmer" />
              <div className="h-3 rounded-md shimmer w-5/6 mx-auto" />
              <div className="h-3 rounded-md shimmer w-4/6 mx-auto" />
            </div>
          </div>
        )}
{stage === "done" && analysis && (
    <Analysis
        fileName={fileName ?? "resume.pdf"}
        analysis={analysis}
        onReset={() => setStage("idle")}
    />
)}
      </div>
    </AppShell>
  );
}

function UploadCard({ onFile }: { onFile: (f: File | null) => void }) {
  const [drag, setDrag] = useState(false);
  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        onFile(e.dataTransfer.files?.[0] ?? null);
      }}
      className={`block surface-card cursor-pointer p-16 text-center border-2 border-dashed transition-all ${
        drag ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
      }`}
    >
      <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center mx-auto">
        <UploadCloud className="size-7 text-primary" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">Upload Resume</h2>
      <p className="mt-2 text-sm text-muted-foreground">Drag & drop your PDF here, or click to browse</p>
      <span className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2 text-sm font-medium text-white">
        Choose file
      </span>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
      <p className="mt-6 text-xs text-muted-foreground">PDF · Max 5MB</p>
    </label>
  );
}
function Analysis({
    fileName,
    analysis,
    onReset
}: {
    fileName: string;
    analysis: any;
    onReset: () => void;
}){

const a = analysis;
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="surface-card p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-accent grid place-items-center">
            <FileText className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{fileName}</p>
            <p className="text-xs text-muted-foreground">Analysis complete</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          Upload different file
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="surface-card p-6 lg:col-span-2">
          <h3 className="font-medium">Detected Skills</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {a.skills.map((s) => (
              <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                {s}
              </span>
            ))}
          </div>

          <h3 className="mt-8 font-medium">Detected Projects</h3>
          <ul className="mt-3 space-y-2">
            {a.projects.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <p className="text-xs text-muted-foreground">Recommended Role</p>
          <p className="mt-1 text-lg font-semibold gradient-text">{a.recommendedRole}</p>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Interview Level" value={a.recommendedLevel} />
            <Row label="Communication" value={a.communication} />
          </div>
          <Link
            to="/interview"
            className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-lg gradient-bg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Start Tailored Interview <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="surface-card p-6">
          <h3 className="font-medium flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Strengths</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {a.strengths.map((s) => <li key={s} className="flex gap-2"><span className="text-success">•</span>{s}</li>)}
          </ul>
        </div>
        <div className="surface-card p-6">
          <h3 className="font-medium flex items-center gap-2"><AlertTriangle className="size-4 text-warning" /> Weaknesses</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {a.weaknesses.map((s) => <li key={s} className="flex gap-2"><span className="text-warning">•</span>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );

}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
