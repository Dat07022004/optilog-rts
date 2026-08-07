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
    role: "Computer Vision",
    focus: "Detection, multi-object tracking, camera calibration and BEV projection.",
    initials: "MC",
  },
  {
    name: "Hoang Nam",
    role: "Systems & Edge",
    focus: "Real-time streaming pipeline, edge inference, storage and deployment.",
    initials: "HN",
  },
  {
    name: "Thu Trang",
    role: "Product & Interface",
    focus: "Operational UX, dashboards, analytics and alerting workflows.",
    initials: "TT",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-background">
          <img
            src={heroImg}
            alt="Warehouse interior with AI detection boxes tracking forklifts and workers"
            width={1920}
            height={1088}
            className="absolute inset-0 size-full object-cover opacity-25 dark:opacity-40"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary">
              <span className="size-1.5 rounded-full bg-success" />
              Capstone project · 3 members · Local AI, no cloud required
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Real-time warehouse intelligence from the cameras you already have
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-secondary">
              OptiLog watches every aisle, dock and packing line at once — detecting people,
              forklifts and pallets, fusing them into one bird's-eye view, and surfacing the
              bottlenecks that slow operations down.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Explore the live dashboard <ArrowRight className="size-4" />
              </Link>
              <a
                href="#intelligence"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                See how it works
              </a>
            </div>

            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { k: "12+", v: "Cameras fused" },
                { k: "< 150 ms", v: "End-to-end latency" },
                { k: "24/7", v: "Continuous monitoring" },
                { k: "100%", v: "On-premise inference" },
              ].map((s) => (
                <div key={s.v} className="rounded-lg border border-border bg-surface p-4">
                  <dt className="tabular text-xl font-semibold text-foreground">{s.k}</dt>
                  <dd className="mt-1 text-xs text-text-secondary">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Why this system exists */}
        <Section
          id="why"
          eyebrow="Why this system exists"
          title="Warehouses are full of cameras and empty of answers"
          lead="Footage is recorded, but nobody can watch 12 streams at once. Decisions are made from memory, spreadsheets and end-of-shift reports — hours after the problem happened."
          tone="surface"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="Blind spots by default" icon={<Eye className="size-4" />}>
              Operators see one feed at a time. Congestion in an aisle is only noticed when it
              already delayed the outbound dock.
            </Card>
            <Card title="Reactive, not preventive" icon={<AlertTriangle className="size-4" />}>
              Incidents and idle equipment are reviewed after the fact, when the footage is only
              useful as evidence.
            </Card>
            <Card title="No operational memory" icon={<History className="size-4" />}>
              Nothing measures how long a pallet waited or how often a lane blocks — so nothing
              improves systematically.
            </Card>
          </div>
        </Section>

        {/* Problem */}
        <Section
          eyebrow="The problem"
          title="Twelve screens, one pair of eyes"
          lead="Manual monitoring does not scale. As soon as a site passes a handful of cameras, human attention becomes the bottleneck in a system built to remove bottlenecks."
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <img
              src={problemImg}
              alt="Wall of dim warehouse CCTV monitors in a control room"
              width={1408}
              height={912}
              loading="lazy"
              className="rounded-lg border border-border object-cover"
            />
            <ul className="space-y-4">
              {[
                ["Attention decays fast", "Studies of manual CCTV monitoring show accuracy collapsing after ~20 minutes of watching."],
                ["Cameras don't talk to each other", "The same forklift appears in six views as six unrelated blobs."],
                ["No shared spatial truth", "Perspective views make it impossible to reason about distance, zones and flow."],
                ["Data never becomes insight", "Terabytes of video, zero metrics on throughput, dwell time or utilisation."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-sm font-semibold text-foreground">{t}</p>
                  <p className="mt-1 text-sm text-text-secondary">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Solution */}
        <Section
          eyebrow="The solution"
          title="One system that sees, understands and reports"
          lead="OptiLog runs computer vision on every stream in parallel, projects detections into a single warehouse coordinate space, and turns that stream of events into operational metrics and alerts."
          tone="surface"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card title="See everything" icon={<Camera className="size-4" />} badge="Step 1">
              Every camera is processed continuously — people, forklifts, pallets and vehicles.
            </Card>
            <Card title="Fuse into one map" icon={<MapIcon className="size-4" />} badge="Step 2">
              Detections are re-projected into a shared top-down plan of the facility.
            </Card>
            <Card title="Understand behaviour" icon={<Radar className="size-4" />} badge="Step 3">
              Zones, dwell time, speed and interactions become measurable events.
            </Card>
            <Card title="Act in time" icon={<Zap className="size-4" />} badge="Step 4">
              Alerts fire while the shift is still running, not in tomorrow's report.
            </Card>
          </div>
          <figure className="mt-10 overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={uiDashboard}
              alt="OptiLog operations dashboard showing KPIs, throughput chart, zone status and live alerts"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full"
            />
            <figcaption className="border-t border-border px-4 py-3 text-xs text-text-muted">
              The operations dashboard: camera health, tracked objects, latency and live alerts in
              one view.
            </figcaption>
          </figure>
        </Section>

        {/* Inside the intelligence */}
        <Section
          id="intelligence"
          eyebrow="Inside the intelligence"
          title="How it works"
          lead="A streaming pipeline, not a batch job. Frames flow from camera to insight in under a fifth of a second."
        >
          <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              ["Ingest", "RTSP streams are decoded and time-synchronised per site.", <Camera key="i" className="size-4" />],
              ["Detect", "A single-stage detector finds objects frame by frame on the GPU.", <ScanEye key="d" className="size-4" />],
              ["Track", "Identities persist across frames and across cameras via re-ID.", <RouteIcon key="t" className="size-4" />],
              ["Project", "Homography maps each footprint into warehouse coordinates.", <Layers key="p" className="size-4" />],
              ["Reason", "Zone rules and time series produce metrics, alerts and replay.", <Workflow key="r" className="size-4" />],
            ].map(([t, d, icon], i) => (
              <li key={t as string} className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span className="tabular">0{i + 1}</span>
                  {icon}
                </div>
                <p className="mt-3 text-base font-semibold text-foreground">{t as string}</p>
                <p className="mt-2 text-sm text-text-secondary">{d as string}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 text-lg font-semibold text-foreground">Core AI capabilities</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Object detection" icon={<ScanEye className="size-4" />}>
              People, forklifts, pallets, trolleys and trucks, tuned on warehouse imagery and low
              light conditions.
            </Card>
            <Card title="Multi-object tracking" icon={<RouteIcon className="size-4" />}>
              Stable IDs with trajectory history, so movement can be measured, not just observed.
            </Card>
            <Card title="Cross-camera re-identification" icon={<Network className="size-4" />}>
              One physical object keeps one identity as it moves between overlapping views.
            </Card>
            <Card title="Zone & rule engine" icon={<Boxes className="size-4" />}>
              Occupancy limits, restricted areas, dwell thresholds and lane blockage rules.
            </Card>
            <Card title="Anomaly & idle detection" icon={<Timer className="size-4" />}>
              Equipment standing still, unusual routes, and queues forming ahead of a dock.
            </Card>
            <Card title="Operational analytics" icon={<LineChart className="size-4" />}>
              Throughput, utilisation, dwell distribution and shift comparisons over time.
            </Card>
          </div>
        </Section>

        {/* Architecture */}
        <Section
          id="architecture"
          eyebrow="System architecture"
          title="Edge inference, local storage, thin client"
          lead="Video never leaves the site. An on-premise GPU node does the heavy work; the browser only receives lightweight structured events."
          tone="surface"
        >
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-5">
              <pre className="overflow-x-auto text-xs leading-6 text-text-secondary">{`Cameras (RTSP)
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
            <div className="space-y-4">
              <Card title="Edge AI node" icon={<Cpu className="size-4" />}>
                One GPU box per site handles all streams with batched inference and hardware
                decoding.
              </Card>
              <Card title="Event store" icon={<Activity className="size-4" />}>
                Tracks and metrics are stored as compact records — queryable for months without
                keeping every frame.
              </Card>
              <Card title="Thin realtime client" icon={<Gauge className="size-4" />}>
                The web app streams events, so a laptop can render the whole facility smoothly.
              </Card>
            </div>
          </div>
          <img
            src={edgeImg}
            alt="Edge AI compute node connected to warehouse cameras"
            width={1408}
            height={912}
            loading="lazy"
            className="mt-8 h-64 w-full rounded-lg border border-border object-cover"
          />
        </Section>

        {/* From seeing to understanding / BEV */}
        <Section
          id="bev"
          eyebrow="From seeing to understanding"
          title="A unified warehouse view"
          lead="Perspective footage answers 'what does this camera see?'. The bird's-eye view answers 'what is happening in my warehouse?' — every tracked object on one plan, in real coordinates."
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <img
              src={bevImg}
              alt="Top-down digital twin of a warehouse with tracked objects and congestion heatmap"
              width={1408}
              height={912}
              loading="lazy"
              className="rounded-lg border border-border object-cover"
            />
            <div className="space-y-4">
              <Card title="Single spatial truth" icon={<MapIcon className="size-4" />}>
                Distances, zone boundaries and flows are measured in metres, not pixels.
              </Card>
              <Card title="Congestion heatmaps" icon={<TrendingUp className="size-4" />}>
                Density accumulates over time to expose the aisles that repeatedly choke.
              </Card>
              <Card title="Trajectories & paths" icon={<RouteIcon className="size-4" />}>
                Replay any object's route to understand why a cycle took twice as long.
              </Card>
            </div>
          </div>
          <figure className="mt-10 overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={uiBev}
              alt="OptiLog bird's eye view screen with zones and tracked objects"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full"
            />
            <figcaption className="border-t border-border px-4 py-3 text-xs text-text-muted">
              Bird's eye view with zone overlays, live object markers and zoom controls.
            </figcaption>
          </figure>
        </Section>

        {/* Real-time monitoring */}
        <Section
          eyebrow="Real-time monitoring"
          title="Operators watch the exceptions, not the video"
          tone="surface"
          lead="Camera health, zone occupancy and alerts update continuously. The system tells the team where to look."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-lg border border-border bg-background">
              <img
                src={uiCameras}
                alt="OptiLog camera grid with per-stream status indicators"
                width={1440}
                height={900}
                loading="lazy"
                className="w-full"
              />
              <figcaption className="border-t border-border px-4 py-3 text-xs text-text-muted">
                Camera grid: stream health, latency and detection status per device.
              </figcaption>
            </figure>
            <div className="space-y-4">
              <Card title="Live alert feed" icon={<AlertTriangle className="size-4" />}>
                Severity-ranked events with the zone, camera and timestamp attached.
              </Card>
              <Card title="Stream health" icon={<Camera className="size-4" />}>
                Offline or degraded cameras are flagged immediately — blind spots stay visible.
              </Card>
              <Card title="Replay in one click" icon={<History className="size-4" />}>
                Every alert links to the exact moment on the timeline for verification.
              </Card>
            </div>
          </div>
        </Section>

        {/* Bottleneck intelligence */}
        <Section
          eyebrow="Bottleneck & operational intelligence"
          title="Measure the flow, not just the incidents"
          lead="The same tracking data that powers alerts also produces the metrics operations teams argue about every week."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card title="Throughput" icon={<BarChart3 className="size-4" />}>
              Objects processed per hour, per zone, inbound versus outbound.
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
          </div>
          <figure className="mt-10 overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={uiAnalytics}
              alt="OptiLog analytics screen with trend charts and zone comparisons"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full"
            />
            <figcaption className="border-t border-border px-4 py-3 text-xs text-text-muted">
              Analytics: trends, zone comparisons and exportable operational reports.
            </figcaption>
          </figure>
        </Section>

        {/* Built for real-world warehouses */}
        <Section
          eyebrow="Built for real-world warehouses"
          title="Practical constraints, designed in"
          tone="surface"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <ShieldCheck className="size-5 text-primary" /> Why local AI?
              </h3>
              <div className="mt-4 space-y-4">
                <Card title="Data stays on site" icon={<Lock className="size-4" />}>
                  No video uploaded, no third-party retention — a hard requirement for most
                  logistics contracts.
                </Card>
                <Card title="Latency you can act on" icon={<Zap className="size-4" />}>
                  Inference next to the cameras avoids upload delay and keeps alerts sub-second.
                </Card>
                <Card title="Predictable cost" icon={<Gauge className="size-4" />}>
                  A one-off compute node instead of per-stream cloud inference billing.
                </Card>
                <Card title="Works through outages" icon={<Network className="size-4" />}>
                  Monitoring continues when the internet link drops; only sync waits.
                </Card>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Layers className="size-5 text-primary" /> Scalability
              </h3>
              <div className="mt-4 space-y-4">
                <Card title="Add cameras, not rewrites" icon={<Camera className="size-4" />}>
                  Streams are independent workers; capacity grows with GPU headroom.
                </Card>
                <Card title="Multi-site ready" icon={<Warehouse className="size-4" />}>
                  Each site runs its own node and reports into a shared operational view.
                </Card>
                <Card title="Model swappable" icon={<Cpu className="size-4" />}>
                  Detector and re-ID models are versioned per site and upgraded independently.
                </Card>
                <Card title="Retention you control" icon={<History className="size-4" />}>
                  Keep events for months and raw footage only as long as policy requires.
                </Card>
              </div>
            </div>
          </div>
        </Section>

        {/* Use cases */}
        <Section
          id="use-cases"
          eyebrow="Where we are going"
          title="Use cases"
          lead="The same pipeline serves very different questions depending on who is watching."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Inbound & outbound docks" icon={<Warehouse className="size-4" />}>
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

        {/* Roadmap */}
        <Section
          id="roadmap"
          eyebrow="Future vision"
          title="Roadmap"
          tone="surface"
          lead="From observing the warehouse to predicting and eventually orchestrating it."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Now · v0.1", "Multi-camera tracking, BEV, dashboards, alerts and replay on a single site.", "Shipped"],
              ["Next", "Predictive congestion forecasting and shift-level recommendations.", "In design"],
              ["Later", "Digital twin in full 3D with slot-level inventory awareness.", "Research"],
              ["Vision", "Closed loop: routing suggestions pushed to WMS and equipment.", "Exploratory"],
            ].map(([t, d, badge]) => (
              <div key={t} className="rounded-lg border border-border bg-background p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{t}</p>
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                    {badge}
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-secondary">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Team */}
        <Section
          id="team"
          eyebrow="About the project"
          title="A three-person team, one operational question"
          lead="OptiLog started as a capstone project: can commodity cameras plus local AI give a warehouse the same situational awareness a control tower gives an airport?"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    {m.initials}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-foreground">{m.name}</p>
                    <p className="text-xs text-text-muted">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary">{m.focus}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Project overview */}
        <Section
          id="overview"
          eyebrow="Project overview"
          title="At a glance"
          tone="surface"
        >
          <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
                <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {k}
                </dt>
                <dd className="mt-2 text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Final CTA */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              See your warehouse the way the system does
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary">
              Open the prototype with live demo data — the dashboard, unified bird's-eye view,
              analytics and replay are all interactive.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Open the dashboard <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Users className="size-4" /> Request access
              </Link>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
