import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  Camera,
  Cpu,
  Eye,
  Gauge,
  History,
  Layers,
  LineChart,
  Lock,
  Map as MapIcon,
  Network,
  Radar,
  Route as RouteIcon,
  ScanEye,
  ShieldCheck,
  Timer,
  TrendingUp,
  Users,
  Warehouse,
  Workflow,
  Zap,
} from "lucide-react";

import {
  Card,
  DataRow,
  LandingFooter,
  LandingHeader,
  Section,
} from "@/components/landing/LandingChrome";
import heroImg from "@/assets/hero-warehouse-ai.jpg";
import problemImg from "@/assets/problem-camera-wall.jpg";
import bevImg from "@/assets/bev-digital-twin.jpg";
import edgeImg from "@/assets/edge-ai-hardware.jpg";
import uiDashboard from "@/assets/ui-dashboard.jpg";
import uiBev from "@/assets/ui-bev.jpg";
import uiAnalytics from "@/assets/ui-analytics.jpg";
import uiCameras from "@/assets/ui-cameras.jpg";

const TITLE = "OptiLog — Real-Time Warehouse Intelligence from Your Cameras";
const DESCRIPTION =
  "OptiLog turns existing warehouse CCTV into a live operational picture: multi-camera tracking, unified bird's-eye view, bottleneck detection and replay — all running on local AI.";

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
    role: "COMPUTER VISION",
    focus: "Detection, multi-object tracking, camera calibration and BEV projection.",
    initials: "MC",
    stack: ["YOLO", "ByteTrack", "Re-ID", "Homography"],
    highlight: false,
  },
  {
    name: "Hoang Nam",
    role: "SYSTEMS & EDGE",
    focus: "Real-time streaming pipeline, edge inference, storage and deployment.",
    initials: "HN",
    stack: ["RTSP", "TensorRT", "Kafka", "TimescaleDB"],
    highlight: true,
  },
  {
    name: "Thu Trang",
    role: "PRODUCT & INTERFACE",
    focus: "Operational UX, dashboards, analytics and alerting workflows.",
    initials: "TT",
    stack: ["React", "TanStack", "Recharts", "Design system"],
    highlight: false,
  },
];

function LandingPage() {
  return (
    <div className="landing-theme min-h-screen">
      <LandingHeader />
      <main>
        {/* ── HERO: broken grid ─────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          <img
            src={heroImg}
            alt="Warehouse interior with AI detection boxes tracking forklifts and workers"
            width={1920}
            height={1088}
            className="absolute inset-0 size-full object-cover opacity-20"
          />
          <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-background/50"
          />

          <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 pb-8 pt-14 sm:px-6 sm:pt-20">
            <div className="z-20 col-span-12 lg:col-span-7">
              <div className="font-tech mb-5 inline-block border border-primary bg-primary-soft px-3 py-1 text-[10px] tracking-widest text-primary">
                SYSTEM.STATUS: ACTIVE // CAPSTONE · 3 MEMBERS · LOCAL AI
              </div>
              <h1 className="text-5xl font-bold leading-[0.92] tracking-tighter text-foreground sm:text-7xl">
                OPTILOG
                <br />
                <span className="text-primary">VISION.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                Eliminate warehouse blindspots with on-prem computer vision. Multi-camera
                tracking, one unified bird's-eye view, real-time bottleneck detection.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/dashboard"
                  className="font-tech inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  DEPLOY CORE <ArrowRight className="size-4" />
                </Link>
                <span className="hidden h-px w-16 bg-border sm:block" />
                <span className="font-tech text-[10px] tracking-widest text-text-muted">
                  &lt;150MS END-TO-END LATENCY
                </span>
              </div>
            </div>

            {/* overlapping monitor block */}
            <div className="z-10 col-span-12 mt-10 lg:col-span-8 lg:col-start-5 lg:-mt-20">
              <div className="relative border border-border bg-surface p-2">
                <div className="font-tech absolute left-4 top-4 z-20 flex items-center gap-2 bg-danger px-2 py-1 text-[10px] text-primary-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-white" /> REC
                </div>
                <img
                  src={uiBev}
                  alt="OptiLog bird's eye view with zones and tracked objects"
                  width={1440}
                  height={900}
                  className="w-full opacity-90"
                />
                <div className="font-tech absolute -right-2 bottom-6 z-30 hidden border border-primary bg-elevated p-4 md:block">
                  <p className="mb-2 text-[10px] tracking-widest text-primary">THROUGHPUT_LOG</p>
                  <div className="space-y-1 text-[9px] text-text-secondary">
                    <div>OBJ_ID: 99283 · FORKLIFT · CONF 98%</div>
                    <div>OBJ_ID: 99284 · PALLET · CONF 94%</div>
                    <div>OBJ_ID: 99285 · PERSON · CONF 99%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* dense stat strip */}
            <dl className="col-span-12 mt-8 grid grid-cols-2 divide-border border border-border bg-surface sm:grid-cols-4 sm:divide-x">
              {[
                ["12+", "CAMERAS FUSED"],
                ["<150 MS", "END-TO-END LATENCY"],
                ["24/7", "CONTINUOUS MONITORING"],
                ["100%", "ON-PREMISE INFERENCE"],
              ].map(([k, v]) => (
                <div key={v} className="border-b border-border p-4 sm:border-b-0">
                  <dt className="font-tech tabular text-xl font-bold text-foreground">{k}</dt>
                  <dd className="font-tech mt-1 text-[10px] tracking-widest text-text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── WHY + PROBLEM (merged, dense) ─────────────────── */}
        <Section
          id="why"
          eyebrow="Why this system exists"
          title="Twelve screens, one pair of eyes"
          lead="Footage is recorded, but nobody can watch 12 streams at once. As soon as a site passes a handful of cameras, human attention becomes the bottleneck in a system built to remove bottlenecks."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <img
                src={problemImg}
                alt="Wall of dim warehouse CCTV monitors in a control room"
                width={1408}
                height={912}
                loading="lazy"
                className="h-full w-full border border-border object-cover grayscale"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <Card title="Blind spots by default" icon={<Eye className="size-4" />}>
                Operators see one feed at a time. Aisle congestion is noticed only after it
                delayed the outbound dock.
              </Card>
              <Card title="Attention decays fast" icon={<Timer className="size-4" />}>
                Manual CCTV monitoring accuracy collapses after roughly 20 minutes of watching.
              </Card>
              <Card title="Cameras don't talk" icon={<Network className="size-4" />}>
                The same forklift appears in six views as six unrelated blobs — no shared spatial
                truth.
              </Card>
              <Card title="No operational memory" icon={<History className="size-4" />}>
                Terabytes of video, zero metrics on throughput, dwell time or utilisation.
              </Card>
            </div>
          </div>
        </Section>

        {/* ── SOLUTION / PIPELINE ───────────────────────────── */}
        <Section
          id="intelligence"
          eyebrow="Inside the intelligence"
          title="One system that sees, understands and reports"
          lead="A streaming pipeline, not a batch job. Frames flow from camera to insight in under a fifth of a second."
          tone="surface"
        >
          <div className="grid gap-4 lg:grid-cols-12">
            {/* pipeline as a compact data list */}
            <div className="border border-border bg-background p-6 lg:col-span-5">
              <p className="font-tech mb-4 text-[10px] tracking-widest text-primary">
                PIPELINE_TRACE
              </p>
              {[
                ["INGEST", "RTSP decoded and time-synchronised per site"],
                ["DETECT", "Single-stage detector, GPU, frame by frame"],
                ["TRACK", "Persistent identities + cross-camera re-ID"],
                ["PROJECT", "Homography maps footprints to warehouse coords"],
                ["REASON", "Zone rules and time series → metrics, alerts, replay"],
              ].map(([k, v]) => (
                <DataRow key={k} k={k} v={v} />
              ))}
              <div className="font-tech mt-4 overflow-x-auto text-[10px] leading-5 text-text-muted">
                <pre>{`CAM → EDGE_GPU → EVENT_STORE → { REALTIME | QUERY | RULES }`}</pre>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <Card title="Object detection" icon={<ScanEye className="size-4" />} badge="01">
                People, forklifts, pallets, trolleys and trucks — tuned on warehouse imagery and
                low light.
              </Card>
              <Card title="Multi-object tracking" icon={<RouteIcon className="size-4" />} badge="02">
                Stable IDs with trajectory history, so movement is measured, not just observed.
              </Card>
              <Card title="Cross-camera re-ID" icon={<Network className="size-4" />} badge="03">
                One physical object keeps one identity across overlapping views.
              </Card>
              <Card title="Zone & rule engine" icon={<Boxes className="size-4" />} badge="04">
                Occupancy limits, restricted areas, dwell thresholds, lane blockage.
              </Card>
              <Card title="Anomaly & idle detection" icon={<Radar className="size-4" />} badge="05">
                Equipment standing still, unusual routes, queues forming ahead of a dock.
              </Card>
              <Card title="Operational analytics" icon={<LineChart className="size-4" />} badge="06">
                Throughput, utilisation, dwell distribution, shift comparisons.
              </Card>
            </div>
          </div>

          <figure className="mt-6 border border-border bg-background">
            <img
              src={uiDashboard}
              alt="OptiLog operations dashboard showing KPIs, throughput chart, zone status and live alerts"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full"
            />
            <figcaption className="font-tech border-t border-border px-4 py-2 text-[10px] uppercase tracking-widest text-text-muted">
              OPS_DASHBOARD // camera health · tracked objects · latency · live alerts
            </figcaption>
          </figure>
        </Section>

        {/* ── ARCHITECTURE ──────────────────────────────────── */}
        <Section
          id="architecture"
          eyebrow="System architecture"
          title="Edge inference, local storage, thin client"
          lead="Video never leaves the site. An on-premise GPU node does the heavy work; the browser only receives lightweight structured events."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="border border-border bg-surface p-5 lg:col-span-6">
              <pre className="font-tech overflow-x-auto text-[11px] leading-6 text-text-secondary">{`Cameras (RTSP)
   |
   v
[ Edge AI node ]  GPU inference
   |  detect -> track -> re-ID -> BEV projection
   v
[ Event & metric store ]  time series + object tracks
   |
   +--> Realtime channel  --> Dashboard / BEV / Cameras
   +--> Query API         --> Analytics / Replay
   +--> Rule engine       --> Alerts & notifications`}</pre>
            </div>
            <div className="grid gap-4 lg:col-span-6">
              <Card title="Edge AI node" icon={<Cpu className="size-4" />}>
                One GPU box per site handles all streams with batched inference and hardware
                decoding.
              </Card>
              <Card title="Event store" icon={<Activity className="size-4" />}>
                Tracks and metrics stored as compact records — queryable for months without
                keeping every frame.
              </Card>
              <Card title="Thin realtime client" icon={<Gauge className="size-4" />}>
                The web app streams events, so a laptop renders the whole facility smoothly.
              </Card>
            </div>
            <img
              src={edgeImg}
              alt="Edge AI compute node connected to warehouse cameras"
              width={1408}
              height={912}
              loading="lazy"
              className="h-40 w-full border border-border object-cover lg:col-span-12"
            />
          </div>
        </Section>

        {/* ── BEV ───────────────────────────────────────────── */}
        <Section
          id="bev"
          eyebrow="From seeing to understanding"
          title="A unified warehouse view"
          lead="Perspective footage answers 'what does this camera see?'. The bird's-eye view answers 'what is happening in my warehouse?' — every tracked object on one plan, in real coordinates."
          tone="surface"
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <img
              src={bevImg}
              alt="Top-down digital twin of a warehouse with tracked objects and congestion heatmap"
              width={1408}
              height={912}
              loading="lazy"
              className="border border-border object-cover lg:col-span-7"
            />
            <div className="grid gap-4 lg:col-span-5">
              <Card title="Single spatial truth" icon={<MapIcon className="size-4" />}>
                Distances, zone boundaries and flows measured in metres, not pixels.
              </Card>
              <Card title="Congestion heatmaps" icon={<TrendingUp className="size-4" />}>
                Density accumulates over time to expose the aisles that repeatedly choke.
              </Card>
              <Card title="Trajectories & paths" icon={<RouteIcon className="size-4" />}>
                Replay any object's route to understand why a cycle took twice as long.
              </Card>
            </div>
          </div>
        </Section>

        {/* ── REALTIME + BOTTLENECK (merged dense) ──────────── */}
        <Section
          eyebrow="Real-time monitoring & bottleneck intelligence"
          title="Operators watch the exceptions, not the video"
          lead="The same tracking data that powers alerts also produces the metrics operations teams argue about every week."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <figure className="border border-border bg-surface lg:col-span-6">
              <img
                src={uiCameras}
                alt="OptiLog camera grid with per-stream status indicators"
                width={1440}
                height={900}
                loading="lazy"
                className="w-full"
              />
              <figcaption className="font-tech border-t border-border px-4 py-2 text-[10px] uppercase tracking-widest text-text-muted">
                CAMERA_GRID // stream health · latency · detection status
              </figcaption>
            </figure>
            <figure className="border border-border bg-surface lg:col-span-6">
              <img
                src={uiAnalytics}
                alt="OptiLog analytics screen with trend charts and zone comparisons"
                width={1440}
                height={900}
                loading="lazy"
                className="w-full"
              />
              <figcaption className="font-tech border-t border-border px-4 py-2 text-[10px] uppercase tracking-widest text-text-muted">
                ANALYTICS // trends · zone comparison · exports
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
              <Card title="Throughput" icon={<BarChart3 className="size-4" />}>
                Objects per hour, per zone, inbound versus outbound.
              </Card>
              <Card title="Dwell time" icon={<Timer className="size-4" />}>
                How long pallets and vehicles actually wait before the next step.
              </Card>
              <Card title="Utilisation" icon={<Gauge className="size-4" />}>
                Equipment active versus idle time across a shift.
              </Card>
              <Card title="Congestion index" icon={<TrendingUp className="size-4" />}>
                Where and when flow degrades, ranked by operational impact.
              </Card>
              <Card title="Live alert feed" icon={<AlertTriangle className="size-4" />}>
                Severity-ranked events with zone, camera and timestamp attached.
              </Card>
              <Card title="Stream health" icon={<Camera className="size-4" />}>
                Offline or degraded cameras flagged immediately — blind spots stay visible.
              </Card>
              <Card title="Replay in one click" icon={<History className="size-4" />}>
                Every alert links to the exact moment on the timeline.
              </Card>
              <Card title="Zone rules" icon={<Workflow className="size-4" />}>
                Thresholds configured per area, versioned with the site layout.
              </Card>
            </div>
          </div>
        </Section>

        {/* ── LOCAL AI + SCALABILITY ────────────────────────── */}
        <Section
          eyebrow="Built for real-world warehouses"
          title="Why local AI, and how it scales"
          tone="surface"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="border border-border bg-background p-5">
              <h3 className="font-tech flex items-center gap-2 text-sm font-bold uppercase text-foreground">
                <ShieldCheck className="size-4 text-primary" /> WHY_LOCAL_AI
              </h3>
              <div className="mt-4">
                <DataRow k="Data residency" v="No video uploaded, no third-party retention" />
                <DataRow k="Latency" v="Inference next to cameras keeps alerts sub-second" />
                <DataRow k="Cost model" v="One-off compute node, not per-stream cloud billing" />
                <DataRow k="Resilience" v="Monitoring continues through internet outages" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ["On-site only", <Lock key="l" className="size-3" />],
                  ["Sub-second", <Zap key="z" className="size-3" />],
                  ["Offline-safe", <Network key="n" className="size-3" />],
                ].map(([label, icon]) => (
                  <span
                    key={label as string}
                    className="font-tech inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[10px] tracking-widest text-text-secondary"
                  >
                    {icon}
                    {label as string}
                  </span>
                ))}
              </div>
            </div>
            <div className="border border-border bg-background p-5">
              <h3 className="font-tech flex items-center gap-2 text-sm font-bold uppercase text-foreground">
                <Layers className="size-4 text-primary" /> SCALABILITY
              </h3>
              <div className="mt-4">
                <DataRow k="Add cameras" v="Independent stream workers, grows with GPU headroom" />
                <DataRow k="Multi-site" v="Each site runs a node, reports to a shared view" />
                <DataRow k="Models" v="Detector and re-ID versioned per site, hot-swappable" />
                <DataRow k="Retention" v="Events for months, raw footage only per policy" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ["Horizontal", <Camera key="c" className="size-3" />],
                  ["Multi-site", <Warehouse key="w" className="size-3" />],
                  ["Swappable", <Cpu key="p" className="size-3" />],
                ].map(([label, icon]) => (
                  <span
                    key={label as string}
                    className="font-tech inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[10px] tracking-widest text-text-secondary"
                  >
                    {icon}
                    {label as string}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── USE CASES ─────────────────────────────────────── */}
        <Section
          id="use-cases"
          eyebrow="Use cases"
          title="One pipeline, many operational questions"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Docks" icon={<Warehouse className="size-4" />}>
              Truck turnaround time, dock idle windows and queue build-up before doors.
            </Card>
            <Card title="Aisle congestion" icon={<MapIcon className="size-4" />}>
              Identify lanes where forklifts repeatedly wait on each other.
            </Card>
            <Card title="Safety compliance" icon={<ShieldCheck className="size-4" />}>
              Pedestrians in forklift lanes, restricted zone entry, speed in shared aisles.
            </Card>
            <Card title="Packing line balance" icon={<Workflow className="size-4" />}>
              Compare station output and spot the step that sets the pace.
            </Card>
            <Card title="Asset utilisation" icon={<Gauge className="size-4" />}>
              How many forklifts are actually needed per shift, backed by data.
            </Card>
            <Card title="Incident investigation" icon={<History className="size-4" />}>
              Reconstruct any event with tracks, zones and synchronised footage.
            </Card>
          </div>
        </Section>

        {/* ── ROADMAP ───────────────────────────────────────── */}
        <Section
          id="roadmap"
          eyebrow="Future vision"
          title="Roadmap"
          tone="surface"
          lead="From observing the warehouse to predicting and eventually orchestrating it."
        >
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["NOW · v0.1", "Multi-camera tracking, BEV, dashboards, alerts and replay on a single site.", "SHIPPED"],
              ["NEXT", "Predictive congestion forecasting and shift-level recommendations.", "IN DESIGN"],
              ["LATER", "Digital twin in full 3D with slot-level inventory awareness.", "RESEARCH"],
              ["VISION", "Closed loop: routing suggestions pushed to WMS and equipment.", "EXPLORATORY"],
            ].map(([t, d, badge]) => (
              <div key={t} className="bg-background p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-tech text-xs font-bold tracking-widest text-foreground">{t}</p>
                  <span className="font-tech bg-primary-soft px-2 py-0.5 text-[9px] tracking-widest text-primary">
                    {badge}
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-text-secondary">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TEAM ──────────────────────────────────────────── */}
        <Section id="team" eyebrow="About the project">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
              Command Center
            </h2>
            <span className="h-px flex-1 bg-border" />
            <span className="font-tech text-[10px] tracking-widest text-text-muted">
              AUTH.STAFF · 3 MEMBERS
            </span>
          </div>
          <p className="mb-8 max-w-3xl text-sm text-text-secondary sm:text-base">
            OptiLog started as a capstone project: can commodity cameras plus local AI give a
            warehouse the same situational awareness a control tower gives an airport?
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className={
                  "group relative " +
                  (i === 1 ? "md:-translate-y-8" : i === 2 ? "md:translate-y-4" : "")
                }
              >
                <div
                  aria-hidden
                  className="absolute -inset-1 bg-primary opacity-0 transition-opacity group-hover:opacity-20"
                />
                <div
                  className={
                    "relative bg-surface p-6 " +
                    (m.highlight ? "border border-primary" : "border border-border")
                  }
                >
                  <div className="mb-6 flex aspect-square items-center justify-center border border-border bg-elevated">
                    <span className="font-tech text-4xl font-bold text-primary opacity-70 transition-opacity group-hover:opacity-100">
                      {m.initials}
                    </span>
                  </div>
                  <h4 className="font-tech text-base font-bold uppercase text-foreground">
                    {m.name}
                  </h4>
                  <p className="font-tech mb-4 text-[10px] font-semibold tracking-widest text-primary">
                    {m.role}
                  </p>
                  <div className="mb-4 h-px w-full bg-border" />
                  <p className="text-[13px] leading-snug text-text-secondary">{m.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.stack.map((s) => (
                      <span
                        key={s}
                        className="font-tech border border-border px-1.5 py-0.5 text-[9px] tracking-widest text-text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── PROJECT OVERVIEW ──────────────────────────────── */}
        <Section id="overview" eyebrow="Project overview" title="At a glance" tone="surface">
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Domain", "Warehouse & logistics operations"],
              ["Input", "Existing RTSP/IP cameras, no new sensors"],
              ["Core AI", "Detection, multi-object tracking, cross-camera re-ID"],
              ["Spatial layer", "Homography-based bird's-eye projection"],
              ["Deployment", "On-premise GPU node, browser client"],
              ["Interface", "Dashboard, cameras, BEV, analytics, replay, management"],
              ["Latency target", "Under 150 ms camera-to-screen"],
              ["Team", "3 members · CV, systems, product"],
              ["Status", "v0.1 prototype with live demo data"],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-5">
                <dt className="font-tech text-[10px] uppercase tracking-widest text-primary">
                  {k}
                </dt>
                <dd className="mt-2 text-[13px] text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border bg-background py-16">
          <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:px-6">
            <div className="min-w-[280px] flex-1">
              <p className="font-tech text-[10px] tracking-widest text-primary">FINAL_CALL</p>
              <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                See your warehouse the way the system does
              </h2>
              <p className="mt-3 max-w-xl text-sm text-text-secondary">
                Open the prototype with live demo data — dashboard, unified bird's-eye view,
                analytics and replay are all interactive.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="font-tech inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                OPEN DASHBOARD <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/register"
                className="font-tech inline-flex items-center gap-2 border border-border px-6 py-3.5 text-xs tracking-widest text-foreground transition-colors hover:bg-elevated"
              >
                <Users className="size-4" /> REQUEST ACCESS
              </Link>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
