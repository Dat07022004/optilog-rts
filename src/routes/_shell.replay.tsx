import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Play, Pause, SkipBack, SkipForward, History } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel, PanelHeader } from "@/components/app/Panel";
import { StatusBadge } from "@/components/app/StatusBadge";
import { replayEvents, type ReplayEvent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/replay")({
  head: () => ({
    meta: [
      { title: "Replay — OptiLog" },
      { name: "description", content: "Review historical warehouse events on a timeline." },
    ],
  }),
  component: ReplayPage,
});

const DURATION = 240; // seconds
const speeds = [0.5, 1, 2, 4];

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function ReplayPage() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(48);
  const [speed, setSpeed] = useState(1);
  const [selected, setSelected] = useState<ReplayEvent | null>(replayEvents[1]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Replay"
        summary={
          <span className="inline-flex items-center gap-2">
            <StatusBadge status="paused" label="Historical mode" dot />
            <span className="tabular">{fmt(time)} / {fmt(DURATION)}</span>
          </span>
        }
        action={
          <input
            type="datetime-local"
            aria-label="Replay time range start"
            defaultValue="2026-06-13T14:00"
            className="h-9 rounded-md border border-border bg-surface px-2 text-sm"
          />
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {/* Visualization */}
          <Panel padded={false} className="overflow-hidden">
            <div className="relative aspect-video w-full bg-surface-subtle">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="absolute left-3 top-3">
                <StatusBadge status={playing ? "online" : "paused"} label={playing ? "Playing" : "Paused"} dot />
              </div>
              {selected && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="block h-4 w-4 rounded-full bg-danger ring-4 ring-white" />
                  <span className="mt-2 block rounded-sm bg-surface px-2 py-1 text-xs font-medium shadow-sm">{selected.zone}</span>
                </div>
              )}
            </div>
          </Panel>

          {/* Timeline + controls */}
          <Panel>
            <div className="relative">
              <input
                type="range"
                min={0}
                max={DURATION}
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                aria-label="Timeline scrubber"
                className="w-full accent-[var(--brand-primary)]"
              />
              {/* event markers */}
              <div className="pointer-events-none relative mt-1 h-3">
                {replayEvents.map((ev) => (
                  <span
                    key={ev.id}
                    title={ev.description}
                    className={cn("absolute top-0 h-2 w-2 -translate-x-1/2 rounded-full", ev.type === "alert" ? "bg-danger" : "bg-info")}
                    style={{ left: `${(ev.timestamp / DURATION) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <CtrlBtn label="Step back" onClick={() => setTime((t) => Math.max(0, t - 5))}><SkipBack className="h-4 w-4" /></CtrlBtn>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause" : "Play"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <CtrlBtn label="Step forward" onClick={() => setTime((t) => Math.min(DURATION, t + 5))}><SkipForward className="h-4 w-4" /></CtrlBtn>
                <span className="tabular ml-2 text-sm text-text-secondary">{fmt(time)} / {fmt(DURATION)}</span>
              </div>
              <div className="flex rounded-md border border-border bg-surface p-0.5">
                {speeds.map((s) => (
                  <button key={s} onClick={() => setSpeed(s)} className={cn("rounded-sm px-2 py-1 text-xs font-medium tabular", speed === s ? "bg-primary-soft text-primary" : "text-text-secondary")}>
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        {/* Event list + inspector */}
        <div className="space-y-5">
          <Panel padded={false}>
            <div className="border-b border-border px-4 py-3">
              <PanelHeader title="Events" description={`${replayEvents.length} in range`} />
            </div>
            <ul className="max-h-72 divide-y divide-border overflow-y-auto">
              {replayEvents.map((ev) => (
                <li key={ev.id}>
                  <button
                    onClick={() => { setSelected(ev); setTime(ev.timestamp); }}
                    className={cn("flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left hover:bg-surface-subtle", selected?.id === ev.id && "bg-primary-soft/60")}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{ev.description}</p>
                      <p className="tabular text-xs text-text-muted">{ev.time} · {ev.zone}</p>
                    </div>
                    {ev.severity && <StatusBadge status={ev.severity} />}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Event Detail" />
            {selected ? (
              <dl className="mt-3 divide-y divide-border rounded-md border border-border text-sm">
                <DRow label="Event ID"><span className="font-mono text-xs">{selected.id}</span></DRow>
                <DRow label="Time"><span className="tabular">{selected.time}</span></DRow>
                <DRow label="Zone">{selected.zone}</DRow>
                <DRow label="Type"><span className="capitalize">{selected.type}</span></DRow>
                {selected.severity && <DRow label="Severity"><StatusBadge status={selected.severity} /></DRow>}
              </dl>
            ) : (
              <div className="mt-3 flex flex-col items-center gap-1 py-6 text-center text-text-muted">
                <History className="h-8 w-8" aria-hidden />
                <p className="text-sm">Select an event to view details.</p>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function CtrlBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} title={label} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:bg-surface-subtle">
      {children}
    </button>
  );
}

function DRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="text-right font-medium text-foreground">{children}</dd>
    </div>
  );
}
