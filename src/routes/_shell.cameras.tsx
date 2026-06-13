import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera as CameraIcon, RefreshCw, Search, TriangleAlert, X, Maximize2, VideoOff } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel } from "@/components/app/Panel";
import { StatusBadge } from "@/components/app/StatusBadge";
import { EmptyState } from "@/components/app/States";
import { cameras as allCameras, type Camera, type CameraStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/cameras")({
  head: () => ({
    meta: [
      { title: "Camera Monitoring — OptiLog" },
      { name: "description", content: "Monitor live camera feeds, FPS and latency across the warehouse." },
    ],
  }),
  component: CamerasPage,
});

const filters: { value: CameraStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "online", label: "Online" },
  { value: "degraded", label: "Degraded" },
  { value: "offline", label: "Offline" },
];

function CamerasPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CameraStatus | "all">("all");
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = useState<Camera | null>(null);

  const list = useMemo(
    () =>
      allCameras.filter(
        (c) =>
          (status === "all" || c.status === status) &&
          (c.name.toLowerCase().includes(query.toLowerCase()) || c.zone.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, status],
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Camera Monitoring"
        summary={`${allCameras.filter((c) => c.status === "online").length} online · ${allCameras.filter((c) => c.status !== "online").length} need attention`}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search camera or zone…"
            aria-label="Search cameras"
            className="h-9 w-56 rounded-md border border-border bg-surface pl-8 pr-3 text-sm focus:outline-none"
          />
        </div>
        <div className="flex rounded-md border border-border bg-surface p-0.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={cn(
                "rounded-sm px-2.5 py-1 text-sm font-medium transition-colors",
                status === f.value ? "bg-primary-soft text-primary" : "text-text-secondary hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setDense((d) => !d)}
            className="h-9 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground hover:bg-surface-subtle"
          >
            {dense ? "Comfortable" : "Compact"}
          </button>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground hover:bg-surface-subtle" aria-label="Refresh feeds">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Refresh
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <Panel>
          <EmptyState icon={CameraIcon} title="No cameras found" description="Try a different search term or status filter." />
        </Panel>
      ) : (
        <div className={cn("grid gap-4", dense ? "grid-cols-2 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3")}>
          {list.map((cam) => (
            <CameraTile key={cam.id} camera={cam} onSelect={() => setSelected(cam)} />
          ))}
        </div>
      )}

      {selected && <CameraDrawer camera={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CameraTile({ camera, onSelect }: { camera: Camera; onSelect: () => void }) {
  const offline = camera.status === "offline";
  return (
    <button
      onClick={onSelect}
      className="group overflow-hidden rounded-lg border border-border bg-surface text-left transition-colors hover:border-border-strong"
    >
      <div className="relative aspect-video w-full bg-[#0f1419]">
        {offline ? (
          <div className="flex h-full flex-col items-center justify-center gap-1 text-text-muted">
            <VideoOff className="h-7 w-7" aria-hidden />
            <span className="text-xs">No signal</span>
          </div>
        ) : (
          <div
            className="h-full w-full opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #1b222b 0 10px, #171d23 10px 20px)",
            }}
          />
        )}
        <div className="absolute left-2 top-2">
          <StatusBadge status={camera.status} dot />
        </div>
        {camera.hasAlert && (
          <div className="absolute right-2 top-2 rounded-sm bg-danger-soft p-1 text-danger" title="Alert on this camera">
            <TriangleAlert className="h-3.5 w-3.5" aria-hidden />
          </div>
        )}
        <Maximize2 className="absolute bottom-2 right-2 h-4 w-4 text-white/70 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{camera.name}</p>
          <p className="truncate text-xs text-text-muted">{camera.zone}</p>
        </div>
        <p className="tabular shrink-0 text-xs text-text-secondary">
          {offline ? "—" : `${camera.fps}fps · ${camera.latencyMs}ms`}
        </p>
      </div>
    </button>
  );
}

function CameraDrawer({ camera, onClose }: { camera: Camera; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} aria-hidden />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <h2 className="text-base font-semibold text-foreground">{camera.name}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle" aria-label="Close">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-[#0f1419]">
            {camera.status === "offline" ? (
              <div className="flex h-full flex-col items-center justify-center gap-1 text-text-muted">
                <VideoOff className="h-8 w-8" aria-hidden />
                <span className="text-xs">Offline {camera.lastFrame}</span>
              </div>
            ) : (
              <div className="h-full w-full" style={{ backgroundImage: "repeating-linear-gradient(45deg, #1b222b 0 10px, #171d23 10px 20px)" }} />
            )}
          </div>
          <dl className="divide-y divide-border rounded-md border border-border">
            <Row label="Status"><StatusBadge status={camera.status} dot /></Row>
            <Row label="Zone">{camera.zone}</Row>
            <Row label="FPS"><span className="tabular">{camera.fps}</span></Row>
            <Row label="Latency"><span className="tabular">{camera.latencyMs} ms</span></Row>
            <Row label="Last frame">{camera.lastFrame}</Row>
            <Row label="Stream URL"><span className="font-mono text-xs">{camera.streamUrl}</span></Row>
          </dl>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="text-right font-medium text-foreground">{children}</dd>
    </div>
  );
}
