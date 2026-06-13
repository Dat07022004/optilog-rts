import { useRouterState } from "@tanstack/react-router";
import { Menu, PanelLeftClose, PanelLeft, Search, Bell } from "lucide-react";
import { RealtimeStatus } from "./RealtimeStatus";

const titles: Record<string, string> = {
  "/dashboard": "Operations Dashboard",
  "/cameras": "Camera Monitoring",
  "/bev": "Bird's Eye View",
  "/analytics": "Analytics",
  "/replay": "Replay",
  "/management/users": "User Management",
  "/management/cameras": "Camera Management",
  "/management/settings": "System Settings",
  "/settings": "Settings",
};

export function TopBar({
  onToggleMobile,
  onToggleCollapse,
  collapsed,
}: {
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
  collapsed: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titles[pathname] ?? "OptiLog";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-surface px-4">
      <button
        onClick={onToggleMobile}
        className="rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>
      <button
        onClick={onToggleCollapse}
        className="hidden rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle md:inline-flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeft className="h-5 w-5" aria-hidden /> : <PanelLeftClose className="h-5 w-5" aria-hidden />}
      </button>

      <h1 className="truncate text-base font-semibold text-foreground">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden />
          <input
            type="search"
            placeholder="Search cameras, zones, objects…"
            aria-label="Global search"
            className="h-9 w-56 rounded-md border border-border bg-surface pl-8 pr-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none lg:w-72"
          />
        </div>

        <RealtimeStatus state="live" detail="synced 8s ago" className="hidden md:inline-flex" />

        <button
          className="relative rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger" />
        </button>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
          aria-label="Account menu"
          title="Maya Chen"
        >
          MC
        </button>
      </div>
    </header>
  );
}
