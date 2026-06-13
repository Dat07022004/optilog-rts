import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, SlidersHorizontal } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel, PanelHeader } from "@/components/app/Panel";
import { MetricCard } from "@/components/app/MetricCard";
import { alertsByZone, cameraHealthSeries, dwellSeries, throughputSeries } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — OptiLog" },
      { name: "description", content: "Compare operational performance over time across zones and cameras." },
    ],
  }),
  component: AnalyticsPage,
});

const ranges = ["24h", "7d", "30d", "90d"];
const tooltipStyle = { fontSize: 12, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" };

function AnalyticsPage() {
  const [range, setRange] = useState("7d");

  return (
    <div className="space-y-5">
      <PageHeader title="Analytics" summary="Operational performance and trends." />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-md border border-border bg-surface p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn("rounded-sm px-2.5 py-1 text-sm font-medium", range === r ? "bg-primary-soft text-primary" : "text-text-secondary hover:text-foreground")}
            >
              {r}
            </button>
          ))}
        </div>
        <select aria-label="Filter by zone" className="h-9 rounded-md border border-border bg-surface px-2 text-sm">
          <option>All zones</option>
          {["Inbound", "Storage A", "Storage B", "Packing", "Outbound"].map((z) => <option key={z}>{z}</option>)}
        </select>
        <select aria-label="Filter by object type" className="h-9 rounded-md border border-border bg-surface px-2 text-sm">
          <option>All object types</option>
          {["Forklift", "Pallet", "Worker", "Vehicle"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-subtle">
          <SlidersHorizontal className="h-4 w-4" aria-hidden /> More filters
        </button>
        <button className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Download className="h-4 w-4" aria-hidden /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Total throughput" value="1,284" delta="+8.2%" deltaType="up" />
        <MetricCard label="Avg dwell time" value="17.6" unit="min" delta="-3.1%" deltaType="up" />
        <MetricCard label="Total alerts" value="42" delta="+5" deltaType="down" />
        <MetricCard label="Avg camera uptime" value="96.4" unit="%" delta="+0.4%" deltaType="up" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel>
          <PanelHeader title="Throughput over time" description="Inbound vs outbound per hour" />
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputSeries} margin={{ left: -16, right: 8, top: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={{ stroke: "var(--border-subtle)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="inbound" name="Inbound" stroke="var(--brand-primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="outbound" name="Outbound" stroke="var(--info)" strokeWidth={2} strokeDasharray="4 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Alert count by zone" />
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertsByZone} margin={{ left: -16, right: 8, top: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="zone" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={{ stroke: "var(--border-subtle)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--bg-surface-subtle)" }} />
                <Bar dataKey="alerts" name="Alerts" fill="var(--warning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Object dwell time" description="Average minutes by object type" />
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dwellSeries} layout="vertical" margin={{ left: 8, right: 16, top: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="type" tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={64} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--bg-surface-subtle)" }} />
                <Bar dataKey="minutes" name="Minutes" fill="var(--brand-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Camera health trend" description="Average uptime %" />
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cameraHealthSeries} margin={{ left: -16, right: 8, top: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={{ stroke: "var(--border-subtle)" }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="uptime" name="Uptime" stroke="var(--success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* Table fallback */}
      <Panel padded={false}>
        <div className="border-b border-border px-5 py-4">
          <PanelHeader title="Throughput data" description="Tabular view of the chart above" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-subtle text-text-secondary">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Time</th>
                <th className="px-4 py-2 text-right font-medium">Inbound</th>
                <th className="px-4 py-2 text-right font-medium">Outbound</th>
              </tr>
            </thead>
            <tbody>
              {throughputSeries.map((r) => (
                <tr key={r.time} className="border-t border-border">
                  <td className="px-4 py-2">{r.time}</td>
                  <td className="tabular px-4 py-2 text-right">{r.inbound}</td>
                  <td className="tabular px-4 py-2 text-right">{r.outbound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
