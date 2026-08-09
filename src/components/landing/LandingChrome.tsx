import { Link } from "@tanstack/react-router";
import { Menu, X, Boxes } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Problem", href: "#problem" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Warehouse view", href: "#bev" },
  { label: "How it works", href: "#architecture" },
  { label: "Team", href: "#team" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-[15px] font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Boxes className="size-4" />
          </span>
          OptiLog
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3.5 py-2 text-sm text-text-secondary transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Live demo
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
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
              className="block border-b border-border px-5 py-3 text-sm text-text-secondary hover:text-foreground"
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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-[15px] font-semibold text-foreground">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="size-4" />
            </span>
            OptiLog
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
            Local AI that turns existing warehouse cameras into one live operational picture.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Product</p>
          <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            <li><Link to="/bev" className="hover:text-foreground">Warehouse view</Link></li>
            <li><Link to="/analytics" className="hover:text-foreground">Analytics</Link></li>
            <li><Link to="/replay" className="hover:text-foreground">Replay</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Project</p>
          <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
            <li><a href="#team" className="hover:text-foreground">Team</a></li>
            <li><a href="#roadmap" className="hover:text-foreground">Roadmap</a></li>
            <li><Link to="/register" className="hover:text-foreground">Request access</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-border px-5 py-5 text-xs text-text-muted sm:px-8">
        © 2026 OptiLog · Capstone project
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
        "scroll-mt-20 py-20 sm:py-24",
        tone === "surface" ? "bg-surface-subtle" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {(eyebrow || title || lead) && (
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-[2.5rem] sm:leading-tight">
                {title}
              </h2>
            )}
            {lead && <p className="mt-4 text-base leading-relaxed text-text-secondary">{lead}</p>}
          </div>
        )}
        <div className={cn(eyebrow || title || lead ? "mt-12" : undefined)}>{children}</div>
      </div>
    </section>
  );
}

export function Card({
  title,
  children,
  icon,
  className,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong",
        className,
      )}
    >
      {icon && (
        <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </span>
      )}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{children}</p>
    </div>
  );
}

export function DataRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3 last:border-b-0">
      <span className="text-sm font-medium text-foreground">{k}</span>
      <span className="text-right text-sm text-text-secondary">{v}</span>
    </div>
  );
}
