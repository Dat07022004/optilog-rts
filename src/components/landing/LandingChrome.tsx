import { Link } from "@tanstack/react-router";
import { Menu, X, Boxes } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "WHY", href: "#why" },
  { label: "INTEL", href: "#intelligence" },
  { label: "BEV", href: "#bev" },
  { label: "ARCH", href: "#architecture" },
  { label: "CASES", href: "#use-cases" },
  { label: "ROADMAP", href: "#roadmap" },
  { label: "TEAM", href: "#team" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="font-tech flex items-center gap-2 text-sm font-bold tracking-tight text-foreground">
          <span className="flex size-7 items-center justify-center bg-primary text-primary-foreground">
            <Boxes className="size-4" />
          </span>
          OPTILOG<span className="text-primary">.VISION</span>
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-tech border-l border-border px-3 py-1.5 text-[11px] tracking-widest text-text-secondary transition-colors first:border-l-0 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="font-tech hidden border border-border px-3 py-2 text-[11px] tracking-widest text-foreground transition-colors hover:bg-elevated sm:inline-flex"
          >
            SIGN_IN
          </Link>
          <Link
            to="/dashboard"
            className="font-tech inline-flex items-center bg-primary px-3 py-2 text-[11px] font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            LIVE_DEMO
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-tech block border-b border-border px-4 py-3 text-[11px] tracking-widest text-text-secondary hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-tech flex items-center gap-2 text-sm font-bold text-foreground">
            <span className="flex size-7 items-center justify-center bg-primary text-primary-foreground">
              <Boxes className="size-4" />
            </span>
            OPTILOG<span className="text-primary">.VISION</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-text-secondary">
            On-prem computer vision for high-throughput warehouses: multi-camera tracking,
            unified bird's-eye view, bottleneck detection and replay.
          </p>
        </div>
        <div>
          <p className="font-tech text-[11px] tracking-widest text-primary">PRODUCT</p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li><Link to="/dashboard" className="hover:text-foreground">Operations dashboard</Link></li>
            <li><Link to="/bev" className="hover:text-foreground">Bird's eye view</Link></li>
            <li><Link to="/analytics" className="hover:text-foreground">Analytics</Link></li>
            <li><Link to="/replay" className="hover:text-foreground">Replay</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-tech text-[11px] tracking-widest text-primary">PROJECT</p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li><a href="#team" className="hover:text-foreground">Team</a></li>
            <li><a href="#roadmap" className="hover:text-foreground">Roadmap</a></li>
            <li><a href="#overview" className="hover:text-foreground">Project overview</a></li>
            <li><Link to="/register" className="hover:text-foreground">Request access</Link></li>
          </ul>
        </div>
      </div>
      <div className="font-tech mx-auto flex max-w-7xl flex-wrap justify-between gap-2 border-t border-border px-4 py-4 text-[10px] uppercase tracking-widest text-text-muted sm:px-6">
        <span>LCTN: SITE_01 / NORTH_HULL</span>
        <span>INFERENCE: ON_PREM</span>
        <span>© 2026 OPTILOG SYSTEMS · v0.1</span>
      </div>
    </footer>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  tone = "app",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  tone?: "app" | "surface";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 border-b border-border py-12 sm:py-16",
        tone === "surface" ? "bg-surface-subtle" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {(eyebrow || title || lead) && (
          <div className="mb-8">
            {eyebrow && (
              <div className="flex items-center gap-3">
                <p className="font-tech text-[11px] uppercase tracking-widest text-primary">
                  {eyebrow}
                </p>
                <span className="h-px flex-1 bg-border" />
              </div>
            )}
            {title && (
              <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
            {lead && <p className="mt-3 max-w-3xl text-sm text-text-secondary sm:text-base">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Card({
  title,
  children,
  icon,
  badge,
  className,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative border border-border border-l-2 border-l-primary bg-surface p-5 transition-colors hover:bg-elevated/40",
        className,
      )}
    >
      {badge && (
        <span className="font-tech absolute right-0 top-0 bg-primary px-2 py-0.5 text-[9px] tracking-widest text-primary-foreground">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <h3 className="font-tech text-sm font-bold uppercase text-foreground">{title}</h3>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{children}</p>
    </div>
  );
}

export function DataRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2">
      <span className="font-tech text-[10px] uppercase tracking-widest text-text-muted">{k}</span>
      <span className="text-right text-[13px] text-foreground">{v}</span>
    </div>
  );
}
