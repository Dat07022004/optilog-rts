import { createFileRoute } from "@tanstack/react-router";
import { Camera, Boxes, TriangleAlert, Gauge, RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/app/PageHeader";
import { MetricCard } from "@/components/app/MetricCard";
import { Panel, PanelHeader } from "@/components/app/Panel";
import { StatusBadge } from "@/components/app/StatusBadge";
import { RealtimeStatus } from "@/components/app/RealtimeStatus";
import { activity, alerts, throughputSeries, zones } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — OptiLog" },
      { name: "description", content: "Real-time operational health for warehouse logistics." },
    ],
  }),
  component: DashboardPage,
});

const activityColor = {
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
  success: "bg-success",
} as const;

function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations Dashboard"
        size="dashboard"
        summary="Warehouse health across 5 zones and 12 cameras."
        action={
          <>
            <RealtimeStatus state="live" detail="synced 8s ago" />
            <button
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground hover:bg-surface-subtle"
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Refresh
            </button>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Cameras" value="10" unit="/ 12" delta="2 offline" deltaType="down" updated="updated now" icon={Camera} />
        <MetricCard label="Tracked Objects" value="86" delta="+12 vs 1h" deltaType="up" updated="updated now" icon={Boxes} />
        <MetricCard label="Open Alerts" value="5" delta="+1 vs 1h" deltaType="down" updated="updated now" icon={TriangleAlert} />
        <MetricCard label="Average Latency" value="118" unit="ms" delta="stable" deltaType="neutral" updated="updated now" icon={Gauge} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Throughput chart */}
        <Panel className="xl:col-span-2">
          <PanelHeader title="Throughput" description="Objects processed per hour" />
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputSeries} margin={{ left: -16, right: 8, top: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={{ stroke: "var(--border-subtle)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={40} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}
                />
                <Line type="monotone" dataKey="inbound" name="Inbound" stroke="var(--brand-primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="outbound" name="Outbound" stroke="var(--info)" strokeWidth={2} strokeDasharray="4 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-primary" />Inbound</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-info" />Outbound</span>
          </div>
        </Panel>

        {/* Alerts */}
        <Panel>
          <PanelHeader title="Top Alerts" description="Needs attention" />
          <ul className="mt-3 divide-y divide-border">
            {alerts.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{a.title}</p>
                  <p className="truncate text-xs text-text-muted">{a.zone} · {a.camera} · {a.time}</p>
                </div>
                <StatusBadge status={a.severity} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Zone overview */}
        <Panel className="xl:col-span-2">
          <PanelHeader title="Zone Status" description="Occupancy and tracked objects per zone" />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((z) => (
              <div key={z.name} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{z.name}</span>
                  <StatusBadge status={z.status} dot />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="tabular text-xl font-semibold text-foreground">{z.occupancy}%</p>
                    <p className="text-xs text-text-muted">occupancy</p>
                  </div>
                  <p className="tabular text-xs text-text-secondary">{z.objects} objects</p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle">
                  <div
                    className={
                      z.status === "danger" ? "h-full bg-danger" : z.status === "warning" ? "h-full bg-warning" : "h-full bg-success"
                    }
                    style={{ width: `${z.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Activity feed */}
        <Panel>
          <PanelHeader title="Recent Activity" description="Live event feed" />
          <ul className="mt-3 space-y-3">
            {activity.map((item) => (
              <li key={item.id} className="flex gap-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activityColor[item.type]}`} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{item.message}</p>
                  <p className="tabular text-xs text-text-muted">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
