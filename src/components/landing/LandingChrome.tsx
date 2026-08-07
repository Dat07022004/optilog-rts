import { Link } from "@tanstack/react-router";
import { Menu, X, Boxes } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Why", href: "#why" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Warehouse View", href: "#bev" },
  { label: "Architecture", href: "#architecture" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Team", href: "#team" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="size-4" />
          </span>
          OptiLog
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Live demo
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-2 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-secondary hover:text-foreground"
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
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Boxes className="size-4" />
            </span>
            OptiLog
          </div>
          <p className="mt-3 max-w-sm text-sm text-text-secondary">
            Local AI vision that turns existing warehouse cameras into a live operational
            picture — tracking, zones, bottlenecks and replay.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li><Link to="/dashboard" className="hover:text-foreground">Operations dashboard</Link></li>
            <li><Link to="/bev" className="hover:text-foreground">Bird's eye view</Link></li>
            <li><Link to="/analytics" className="hover:text-foreground">Analytics</Link></li>
            <li><Link to="/replay" className="hover:text-foreground">Replay</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Project</p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li><a href="#team" className="hover:text-foreground">Team</a></li>
            <li><a href="#roadmap" className="hover:text-foreground">Roadmap</a></li>
            <li><a href="#overview" className="hover:text-foreground">Project overview</a></li>
            <li><Link to="/register" className="hover:text-foreground">Request access</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-text-muted sm:px-6">
        OptiLog · Real-Time Warehouse Intelligence · v0.1 prototype
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
        "scroll-mt-20 border-b border-border py-16 sm:py-20",
        tone === "surface" ? "bg-surface" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {(eyebrow || title || lead) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
            {lead && <p className="mt-3 text-base text-text-secondary">{lead}</p>}
          </div>
        )}
        {children && <div className={cn(title || lead ? "mt-10" : "")}>{children}</div>}
      </div>
    </section>
  );
}

export function Card({
  title,
  children,
  icon,
  badge,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  badge?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex size-9 items-center justify-center rounded-md bg-primary-soft text-primary">
              {icon}
            </span>
          )}
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>
        {badge && (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-text-secondary">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{children}</p>
    </div>
  );
}
