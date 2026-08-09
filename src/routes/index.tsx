import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Boxes,
  Cpu,
  Eye,
  LineChart,
  Map as MapIcon,
  Network,
  Radar,
  Route as RouteIcon,
  ScanEye,
  ShieldCheck,
  Timer,
} from "lucide-react";

import {
  Card,
  DataRow,
  LandingFooter,
  LandingHeader,
  Section,
} from "@/components/landing/LandingChrome";
import heroImg from "@/assets/hero-warehouse-ai.jpg";
import bevImg from "@/assets/bev-digital-twin.jpg";
import uiDashboard from "@/assets/ui-dashboard.jpg";
import uiBev from "@/assets/ui-bev.jpg";
import uiAnalytics from "@/assets/ui-analytics.jpg";

const TITLE = "OptiLog — Real-Time Warehouse Intelligence from Your Cameras";
const DESCRIPTION =
  "OptiLog turns existing warehouse cameras into one live operational picture: multi-camera tracking, a unified warehouse view, bottleneck alerts and replay — running on local AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: LandingPage,
});

const TEAM = [
  {
    name: "Minh Chau",
    role: "Computer vision",
    focus: "Detection, tracking and camera-to-map projection.",
    initials: "MC",
  },
  {
    name: "Hoang Nam",
    role: "Systems & edge",
    focus: "Streaming pipeline, GPU inference and deployment.",
    initials: "HN",
  },
  {
    name: "Thu Trang",
    role: "Product & interface",
    focus: "Dashboards, analytics and alerting workflows.",
    initials: "TT",
  },
];

function LandingPage() {
  return (
    <div className="landing-theme min-h-screen">
      <LandingHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Warehouse interior with AI detection boxes tracking forklifts and workers"
            width={1920}
            height={1088}
            className="absolute inset-0 size-full object-cover opacity-15"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"
          />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-secondary">
                Capstone project · 3 members · on-premise AI
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-foreground sm:text-6xl">
                See your whole warehouse, not twelve separate screens.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
                OptiLog reads your existing cameras with local AI and turns them into one live
                map of people, forklifts and pallets — with alerts when flow breaks down.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  Open live demo <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-surface"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
              <img
                src={uiBev}
                alt="OptiLog unified warehouse view with zones and tracked objects"
                width={1440}
                height={900}
                className="w-full"
              />
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["12+", "cameras fused"],
                ["<150 ms", "end-to-end latency"],
                ["24/7", "continuous monitoring"],
                ["100%", "on-premise inference"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="tabular text-2xl font-semibold text-foreground">{k}</dt>
                  <dd className="mt-1 text-sm text-text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Problem */}
        <Section
          id="problem"
          tone="surface"
          eyebrow="The problem"
          title="Footage is recorded. Nobody can watch it."
          lead="Past a handful of cameras, human attention becomes the bottleneck in a system built to remove bottlenecks."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Blind spots by default" icon={<Eye className="size-5" />}>
              Congestion in an aisle is usually noticed only after it has delayed the dock.
            </Card>
            <Card title="Attention decays" icon={<Timer className="size-5" />}>
              Manual monitoring accuracy drops sharply after about 20 minutes of watching.
            </Card>
            <Card title="Cameras don't talk" icon={<Network className="size-5" />}>
              The same forklift shows up in six views as six unrelated objects.
            </Card>
          </div>
        </Section>

        {/* Capabilities */}
        <Section
          id="capabilities"
          eyebrow="Core capabilities"
          title="One system that sees, understands and reports"
          lead="A streaming pipeline turns raw frames into structured events in under a fifth of a second."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Detection & tracking" icon={<ScanEye className="size-5" />}>
              People, forklifts, pallets and trucks, each with a stable identity over time.
            </Card>
            <Card title="Cross-camera identity" icon={<RouteIcon className="size-5" />}>
              One physical object keeps one ID across overlapping views.
            </Card>
            <Card title="Zones & rules" icon={<Boxes className="size-5" />}>
              Occupancy limits, restricted areas, dwell thresholds and blocked lanes.
            </Card>
            <Card title="Anomaly detection" icon={<Radar className="size-5" />}>
              Idle equipment, unusual routes and queues forming ahead of a dock.
            </Card>
            <Card title="Operational analytics" icon={<LineChart className="size-5" />}>
              Throughput, utilisation, dwell time and shift comparisons.
            </Card>
            <Card title="Replay" icon={<Activity className="size-5" />}>
              Scrub back to any moment and follow an object's full path.
            </Card>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={uiDashboard}
              alt="OptiLog operations dashboard with KPIs, throughput chart and live alerts"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full"
            />
          </div>
        </Section>

        {/* BEV */}
        <Section
          id="bev"
          tone="surface"
          eyebrow="Unified warehouse view"
          title="From camera angles to a single floor plan"
          lead="Every tracked object placed on one plan, in real coordinates — so distances and flows are measured in metres, not pixels."
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <img
              src={bevImg}
              alt="Top-down view of a warehouse with tracked objects and congestion heatmap"
              width={1408}
              height={912}
              loading="lazy"
              className="w-full rounded-2xl border border-border object-cover"
            />
            <div className="grid gap-5">
              <Card title="Congestion heatmaps" icon={<MapIcon className="size-5" />}>
                Density builds up over time and exposes the aisles that repeatedly choke.
              </Card>
              <Card title="Trajectories" icon={<RouteIcon className="size-5" />}>
                Understand why a cycle took twice as long by replaying the route it took.
              </Card>
            </div>
          </div>
        </Section>

        {/* Architecture */}
        <Section
          id="architecture"
          eyebrow="How it works"
          title="Edge inference, local storage, thin client"
          lead="Video never leaves the site. A local GPU node does the heavy work and the browser only receives lightweight events."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-7">
              {[
                ["Ingest", "Camera streams decoded and time-synchronised"],
                ["Detect", "GPU inference on every frame"],
                ["Track", "Persistent identities across cameras"],
                ["Project", "Footprints mapped to warehouse coordinates"],
                ["Reason", "Zone rules and metrics power alerts and replay"],
              ].map(([k, v]) => (
                <DataRow key={k} k={k} v={v} />
              ))}
            </div>
            <div className="grid gap-5">
              <Card title="Local by design" icon={<ShieldCheck className="size-5" />}>
                No footage uploaded to the cloud, so privacy and bandwidth stay under control.
              </Card>
              <Card title="One box per site" icon={<Cpu className="size-5" />}>
                A single GPU node handles all streams with batched inference.
              </Card>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={uiAnalytics}
              alt="OptiLog analytics screen with trend charts and zone comparisons"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full"
            />
          </div>
        </Section>

        {/* Roadmap */}
        <Section
          id="roadmap"
          tone="surface"
          eyebrow="Roadmap"
          title="Where we are going"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Card title="Now" icon={<Activity className="size-5" />}>
              Multi-camera tracking, unified view, live alerts and analytics.
            </Card>
            <Card title="Next" icon={<LineChart className="size-5" />}>
              Forecasting congestion before it happens and shift-level reports.
            </Card>
            <Card title="Later" icon={<Network className="size-5" />}>
              Multi-site rollout with WMS integration and automated task routing.
            </Card>
          </div>
        </Section>

        {/* Team */}
        <Section
          id="team"
          eyebrow="The team"
          title="Three people, one system"
          lead="A capstone team covering vision research, edge systems and the operator interface."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-surface p-7">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary">
                  {m.initials}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{m.name}</h3>
                <p className="mt-1 text-sm text-primary">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{m.focus}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <section className="bg-background pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rounded-3xl border border-border bg-surface px-8 py-14 text-center">
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Ready to see your warehouse clearly?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Explore the live demo with simulated warehouse data, or request access for your
                own site.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  Open live demo <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-elevated"
                >
                  Request access
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
