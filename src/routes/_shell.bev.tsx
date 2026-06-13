import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ZoomIn, ZoomOut, Maximize, MousePointer2, Play, Pause, X } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel, PanelHeader } from "@/components/app/Panel";
import { StatusBadge } from "@/components/app/StatusBadge";
import { trackedObjects, zones, type TrackedObject } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/bev")({
  head: () => ({
    meta: [
      { title: "Bird's Eye View — OptiLog" },
      { name: "description", content: "Spatial view of warehouse zones, objects, paths and alerts." },
    ],
  }),
  component: BevPage,
});

type LayerKey = "zones" | "cameras" | "paths" | "detections" | "alerts";

const objectColor: Record<string, string> = {
  forklift: "var(--info)",
  worker: "var(--brand-primary)",
  vehicle: "var(--neutral)",
  pallet: "var(--warning)",
};

const zoneBoxes: { name: string; x: number; y: number; w: number; h: number }[] = [
  { name: "Inbound", x: 4, y: 6, w: 26, h: 40 },
  { name: "Storage A", x: 34, y: 6, w: 28, h: 40 },
  { name: "Storage B", x: 34, y: 50, w: 28, h: 44 },
  { name: "Packing", x: 66, y: 50, w: 30, h: 44 },
  { name: "Outbound", x: 66, y: 6, w: 30, h: 40 },
];

function BevPage() {
  const [zoom, setZoom] = useState(1);
  const [live, setLive] = useState(true);
  const [selected, setSelected] = useState<TrackedObject | null>(trackedObjects[1]);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    zones: true,
    cameras: true,
    paths: true,
    detections: true,
    alerts: true,
  });

  const toggle = (k: LayerKey) => setLayers((l) => ({ ...l, [k]: !l[k] }));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Bird's Eye View"
        summary={`${trackedObjects.length} objects tracked across ${zones.length} zones`}
        action={
          <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-0.5">
            <button onClick={() => setLive(true)} className={cn("inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-sm font-medium", live ? "bg-primary-soft text-primary" : "text-text-secondary")}>
              <Play className="h-3.5 w-3.5" aria-hidden /> Live
            </button>
            <button onClick={() => setLive(false)} className={cn("inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-sm font-medium", !live ? "bg-neutral-soft text-neutral" : "text-text-secondary")}>
              <Pause className="h-3.5 w-3.5" aria-hidden /> Pause
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        {/* Canvas */}
        <Panel padded={false} className="relative overflow-hidden">
          {/* Toolbar */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1 rounded-md border border-border bg-surface/95 p-1 shadow-sm">
            <ToolBtn label="Zoom in" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}><ZoomIn className="h-4 w-4" /></ToolBtn>
            <ToolBtn label="Zoom out" onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}><ZoomOut className="h-4 w-4" /></ToolBtn>
            <ToolBtn label="Reset view" onClick={() => setZoom(1)}><Maximize className="h-4 w-4" /></ToolBtn>
            <ToolBtn label="Select mode" onClick={() => {}}><MousePointer2 className="h-4 w-4" /></ToolBtn>
          </div>
          <div className="absolute right-3 top-3 z-10">
            <StatusBadge status={live ? "online" : "paused"} label={live ? "Live" : "Paused"} dot />
          </div>

          <div className="aspect-[16/10] w-full bg-surface-subtle">
            <div className="relative h-full w-full origin-center transition-transform" style={{ transform: `scale(${zoom})` }}>
              <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M5 0 L0 0 0 5" fill="none" stroke="var(--border-subtle)" strokeWidth="0.2" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                {layers.zones &&
                  zoneBoxes.map((z) => {
                    const zone = zones.find((zz) => zz.name === z.name);
                    const stroke = zone?.status === "danger" ? "var(--danger)" : zone?.status === "warning" ? "var(--warning)" : "var(--border-strong)";
                    return (
                      <g key={z.name}>
                        <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="var(--bg-surface)" fillOpacity={0.6} stroke={stroke} strokeWidth={0.4} rx={1} />
                        <text x={z.x + 1.5} y={z.y + 4} fontSize={2.4} fill="var(--text-secondary)">{z.name}</text>
                      </g>
                    );
                  })}
                {layers.paths && (
                  <path d="M16 26 Q40 40 80 78" fill="none" stroke="var(--info)" strokeWidth={0.4} strokeDasharray="1.5 1" opacity={0.7} />
                )}
              </svg>

              {/* Object markers */}
              {layers.detections &&
                trackedObjects.map((o) => {
                  const isSel = selected?.id === o.id;
                  const showAlert = layers.alerts && o.alert;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setSelected(o)}
                      aria-label={`${o.type} ${o.id}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${o.x}%`, top: `${o.y}%` }}
                    >
                      <span
                        className={cn("block h-3 w-3 rounded-full ring-2 ring-white", isSel && "ring-[3px] ring-ring", showAlert && "animate-pulse")}
                        style={{ backgroundColor: showAlert ? "var(--danger)" : objectColor[o.type] }}
                      />
                    </button>
                  );
                })}
            </div>
          </div>
        </Panel>

        {/* Side controls + inspector */}
        <div className="space-y-5">
          <Panel>
            <PanelHeader title="Layers" />
            <div className="mt-3 space-y-2">
              {(Object.keys(layers) as LayerKey[]).map((k) => (
                <label key={k} className="flex cursor-pointer items-center justify-between text-sm capitalize">
                  <span className="text-text-secondary">{k}</span>
                  <input type="checkbox" checked={layers[k]} onChange={() => toggle(k)} className="h-4 w-4 accent-[var(--brand-primary)]" />
                </label>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Object Inspector" />
            {selected ? (
              <dl className="mt-3 divide-y divide-border rounded-md border border-border">
                <IRow label="Object ID"><span className="font-mono text-xs">{selected.id}</span></IRow>
                <IRow label="Type"><span className="capitalize">{selected.type}</span></IRow>
                <IRow label="Zone">{selected.zone}</IRow>
                <IRow label="Speed"><span className="tabular">{selected.speed.toFixed(1)} m/s</span></IRow>
                <IRow label="Last update">{selected.lastUpdate}</IRow>
                <IRow label="Alert"><StatusBadge status={selected.alert ? "danger" : "healthy"} label={selected.alert ? "Active" : "None"} dot /></IRow>
              </dl>
            ) : (
              <p className="mt-3 text-sm text-text-muted">Select an object marker to inspect details.</p>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} title={label} aria-label={label} className="rounded-sm p-1.5 text-text-secondary hover:bg-surface-subtle hover:text-foreground">
      {children}
    </button>
  );
}

function IRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="text-right font-medium text-foreground">{children}</dd>
    </div>
  );
}
