import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
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
  Sparkles,
} from "lucide-react";

import { LandingFooter, LandingHeader } from "@/components/landing/LandingChrome";
import { Counter, Reveal, TiltCard } from "@/components/landing/Motion";
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
  { name: "Minh Chau", role: "Computer vision", focus: "Detection, tracking, camera-to-map projection.", initials: "MC" },
  { name: "Hoang Nam", role: "Systems & edge", focus: "Streaming pipeline, GPU inference, deployment.", initials: "HN" },
  { name: "Thu Trang", role: "Product & interface", focus: "Dashboards, analytics, alerting workflows.", initials: "TT" },
];

const ROADMAP = [
  {
    phase: "Phase 01",
    status: "Shipped",
    title: "Live multi-camera tracking",
    body: "Detection, cross-camera identity and the unified warehouse view running on one local GPU node.",
    done: true,
  },
  {
    phase: "Phase 02",
    status: "In progress",
    title: "Bottleneck intelligence",
    body: "Zone rules, dwell thresholds and alerting when flow degrades — plus shift-level reports.",
    done: false,
  },
  {
    phase: "Phase 03",
    status: "Next",
    title: "Predictive flow",
    body: "Forecast congestion before it forms and recommend the routing that keeps docks clear.",
    done: false,
  },
  {
    phase: "Phase 04",
    status: "Vision",
    title: "Multi-site & WMS",
    body: "Fleet view across sites, WMS integration and automated task assignment from live vision data.",
    done: false,
  },
];

function Tile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TiltCard
      className={`overflow-hidden rounded-3xl border border-border bg-surface ${className ?? ""}`}
    >
      {children}
    </TiltCard>
  );
}

function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-[2.6rem] sm:leading-[1.15]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-text-secondary">{lead}</p>}
    </Reveal>
  );
}

function LandingPage() {
  return (
    <div className="landing-theme min-h-screen overflow-x-hidden">
      <LandingHeader />
      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="aurora absolute inset-0 opacity-50" />
          <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
          />

          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs text-text-secondary backdrop-blur">
                <Sparkles className="size-3.5 text-primary" />
                Capstone project · 3 members · on-premise AI
              </span>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.08] text-foreground sm:text-6xl">
                See your whole warehouse,
                <br />
                <span className="text-primary">not twelve screens.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
                Local AI reads your existing cameras and turns them into one live map of people,
                forklifts and pallets — with alerts the moment flow breaks down.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="pulse-ring inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Open live demo <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#bento"
                  className="inline-flex items-center rounded-xl border border-border bg-surface/60 px-5 py-3 text-sm text-foreground backdrop-blur transition-colors hover:bg-elevated"
                >
                  Explore the system
                </a>
              </div>
            </Reveal>

            {/* hero bento */}
            <div id="bento" className="mt-16 grid gap-4 sm:grid-cols-6">
              <Reveal delay={60} className="sm:col-span-4">
                <Tile className="h-full">
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <span className="text-sm font-medium text-foreground">Unified warehouse view</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-success">
                      <span className="size-1.5 animate-pulse rounded-full bg-success" /> live
                    </span>
                  </div>
                  <img
                    src={uiBev}
                    alt="OptiLog unified warehouse view with zones and tracked objects"
                    width={1440}
                    height={900}
                    className="w-full"
                  />
                </Tile>
              </Reveal>

              <Reveal delay={140} className="sm:col-span-2">
                <Tile className="relative h-full">
                  <img
                    src={heroImg}
                    alt="Warehouse interior with AI detection boxes tracking forklifts"
                    width={1920}
                    height={1088}
                    className="absolute inset-0 size-full object-cover opacity-30"
                  />
                  <div className="relative flex h-full flex-col justify-between gap-8 p-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <ScanEye className="size-5" />
                    </span>
                    <div>
                      <p className="text-3xl font-semibold text-foreground">
                        <Counter to={12} suffix="+" />
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">cameras fused into one map</p>
                    </div>
                  </div>
                </Tile>
              </Reveal>

              {[
                { v: 150, suffix: " ms", prefix: "<", label: "end-to-end latency", icon: <Timer className="size-5" /> },
                { v: 100, suffix: "%", label: "on-premise inference", icon: <ShieldCheck className="size-5" /> },
                { v: 24, suffix: "/7", label: "continuous monitoring", icon: <Activity className="size-5" /> },
              ].map((s, i) => (
                <Reveal key={s.label} delay={200 + i * 70} className="sm:col-span-2">
                  <Tile className="h-full">
                    <div className="flex items-start gap-4 p-6">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        {s.icon}
                      </span>
                      <div>
                        <p className="text-2xl font-semibold text-foreground">
                          <Counter to={s.v} prefix={s.prefix} suffix={s.suffix} />
                        </p>
                        <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
                      </div>
                    </div>
                  </Tile>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM (bento) ──────────────────────────────── */}
        <section className="bg-surface-subtle py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead
              eyebrow="The problem"
              title="Footage is recorded. Nobody can watch it."
              lead="Past a handful of cameras, human attention becomes the bottleneck in a system built to remove bottlenecks."
            />
            <div className="grid gap-4 sm:grid-cols-6">
              {[
                {
                  t: "Blind spots by default",
                  b: "Congestion in an aisle is noticed only after it delayed the dock.",
                  icon: <Eye className="size-5" />,
                  span: "sm:col-span-3",
                },
                {
                  t: "Attention decays",
                  b: "Manual monitoring accuracy drops sharply after ~20 minutes of watching.",
                  icon: <Timer className="size-5" />,
                  span: "sm:col-span-3",
                },
                {
                  t: "Cameras don't talk",
                  b: "The same forklift appears in six views as six unrelated objects.",
                  icon: <Network className="size-5" />,
                  span: "sm:col-span-2",
                },
                {
                  t: "No operational memory",
                  b: "Terabytes of video, but no metrics on throughput or dwell time.",
                  icon: <Activity className="size-5" />,
                  span: "sm:col-span-2",
                },
                {
                  t: "Reaction, never prevention",
                  b: "Problems get explained after the shift instead of solved during it.",
                  icon: <Radar className="size-5" />,
                  span: "sm:col-span-2",
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 70} className={c.span}>
                  <Tile className="h-full">
                    <div className="p-6">
                      <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        {c.icon}
                      </span>
                      <h3 className="text-base font-semibold text-foreground">{c.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{c.b}</p>
                    </div>
                  </Tile>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES (bento with big media tile) ─────── */}
        <section id="capabilities" className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead
              eyebrow="Core capabilities"
              title="One system that sees, understands and reports"
              lead="A streaming pipeline turns raw frames into structured events in under a fifth of a second."
            />
            <div className="grid gap-4 sm:grid-cols-6">
              <Reveal className="sm:col-span-6 lg:col-span-2 lg:row-span-3">
                <Tile className="h-full">
                  <img
                    src={uiDashboard}
                    alt="OptiLog operations dashboard with KPIs, throughput chart and live alerts"
                    width={1440}
                    height={900}
                    loading="lazy"
                    className="w-full"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">Operations dashboard</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Camera health, tracked objects, latency and live alerts on one screen — the
                      exceptions come to you.
                    </p>
                  </div>
                </Tile>
              </Reveal>

              {[
                { t: "Detection & tracking", b: "Stable identities for people, forklifts, pallets and trucks.", icon: <ScanEye className="size-5" /> },
                { t: "Cross-camera identity", b: "One physical object keeps one ID across views.", icon: <RouteIcon className="size-5" /> },
                { t: "Zones & rules", b: "Occupancy limits, restricted areas, dwell thresholds.", icon: <Boxes className="size-5" /> },
                { t: "Anomaly detection", b: "Idle equipment, unusual routes, queues before a dock.", icon: <Radar className="size-5" /> },
                { t: "Analytics", b: "Throughput, utilisation and shift comparisons.", icon: <LineChart className="size-5" /> },
                { t: "Replay", b: "Scrub back and follow an object's full path.", icon: <Activity className="size-5" /> },
              ].map((c, i) => (
                <Reveal key={c.t} delay={80 + i * 60} className="sm:col-span-3 lg:col-span-2">
                  <Tile className="h-full">
                    <div className="p-5">
                      <span className="mb-3 inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        {c.icon}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">{c.t}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{c.b}</p>
                    </div>
                  </Tile>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEV + ARCHITECTURE ───────────────────────────── */}
        <section id="bev" className="bg-surface-subtle py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead
              eyebrow="Unified view & architecture"
              title="From camera angles to a single floor plan"
              lead="Video never leaves the site: a local GPU node does the heavy work, the browser only receives lightweight events."
            />
            <div className="grid gap-4 sm:grid-cols-6">
              <Reveal className="sm:col-span-4">
                <Tile className="h-full">
                  <img
                    src={bevImg}
                    alt="Top-down view of a warehouse with tracked objects and congestion heatmap"
                    width={1408}
                    height={912}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Measured in metres, not pixels
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Congestion heatmaps build up over time and expose the aisles that repeatedly
                      choke; trajectories explain why a cycle took twice as long.
                    </p>
                  </div>
                </Tile>
              </Reveal>

              <Reveal delay={90} className="sm:col-span-2">
                <Tile className="h-full">
                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                      Pipeline
                    </p>
                    <ol className="mt-4 space-y-3">
                      {[
                        ["Ingest", "streams synchronised"],
                        ["Detect", "GPU inference per frame"],
                        ["Track", "identities across cameras"],
                        ["Project", "mapped to floor coords"],
                        ["Reason", "rules, metrics, alerts"],
                      ].map(([k, v], i) => (
                        <li key={k} className="flex gap-3">
                          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-[11px] font-semibold text-primary">
                            {i + 1}
                          </span>
                          <span className="text-sm text-text-secondary">
                            <span className="font-medium text-foreground">{k}</span> — {v}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Tile>
              </Reveal>

              <Reveal delay={150} className="sm:col-span-3">
                <Tile className="h-full">
                  <div className="flex items-start gap-4 p-6">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Cpu className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">One box per site</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        A single GPU node handles every stream with batched inference and hardware
                        decoding.
                      </p>
                    </div>
                  </div>
                </Tile>
              </Reveal>

              <Reveal delay={210} className="sm:col-span-3">
                <Tile className="h-full">
                  <div className="flex items-start gap-4 p-6">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <MapIcon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Local by design</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        No footage leaves the building, so privacy and bandwidth stay under control.
                      </p>
                    </div>
                  </div>
                </Tile>
              </Reveal>

              <Reveal delay={260} className="sm:col-span-6">
                <Tile>
                  <img
                    src={uiAnalytics}
                    alt="OptiLog analytics screen with trend charts and zone comparisons"
                    width={1440}
                    height={900}
                    loading="lazy"
                    className="w-full"
                  />
                </Tile>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── ROADMAP (animated timeline) ──────────────────── */}
        <section id="roadmap" className="relative overflow-hidden bg-background py-20 sm:py-24">
          <div aria-hidden className="aurora absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead
              eyebrow="Roadmap"
              title="Where we are going"
              lead="From a working local vision system to predictive, multi-site warehouse operations."
            />

            <ol className="relative grid gap-4 lg:grid-cols-4">
              <span
                aria-hidden
                className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-border to-transparent lg:left-0 lg:top-[3.25rem] lg:h-px lg:w-full lg:bg-gradient-to-r"
              />
              {ROADMAP.map((r, i) => (
                <Reveal as="li" key={r.phase} delay={i * 120} className="relative">
                  <TiltCard className="h-full rounded-3xl border border-border bg-surface p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                        {r.phase}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          r.done
                            ? "bg-success-soft text-success"
                            : i === 1
                              ? "bg-warning-soft text-warning"
                              : "bg-neutral-soft text-text-muted"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <span
                      className={`mt-5 flex size-9 items-center justify-center rounded-full border ${
                        r.done
                          ? "border-success bg-success-soft text-success"
                          : i === 1
                            ? "pulse-ring border-primary bg-primary-soft text-primary"
                            : "border-border bg-elevated text-text-muted"
                      }`}
                    >
                      {r.done ? <CheckCircle2 className="size-4" /> : <span className="text-xs font-semibold">{i + 1}</span>}
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{r.body}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── TEAM ─────────────────────────────────────────── */}
        <section id="team" className="bg-surface-subtle py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHead
              eyebrow="The team"
              title="Three people, one system"
              lead="Covering vision research, edge systems and the operator interface."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {TEAM.map((m, i) => (
                <Reveal key={m.name} delay={i * 110}>
                  <Tile className="h-full">
                    <div className="p-7">
                      <span className="float-soft flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-lg font-semibold text-primary">
                        {m.initials}
                      </span>
                      <h3 className="mt-5 text-lg font-semibold text-foreground">{m.name}</h3>
                      <p className="mt-1 text-sm text-primary">{m.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{m.focus}</p>
                    </div>
                  </Tile>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="bg-background pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center">
                <div aria-hidden className="aurora absolute inset-0 opacity-30" />
                <div className="relative">
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
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                    >
                      Open live demo <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-elevated"
                    >
                      Request access
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
