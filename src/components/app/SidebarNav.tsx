import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Camera,
  Map,
  ChartLine,
  History,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const mainNav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cameras", label: "Cameras", icon: Camera },
  { to: "/bev", label: "Bird's Eye View", icon: Map },
  { to: "/analytics", label: "Analytics", icon: ChartLine },
  { to: "/replay", label: "Replay", icon: History },
  { to: "/management/users", label: "Management", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-14 items-center border-b border-border px-4",
          collapsed && "justify-center px-0",
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Map className="h-4 w-4" aria-hidden />
          </div>
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight text-foreground">OptiLog</span>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              activeProps={{ "data-active": "true" } as Record<string, string>}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-subtle hover:text-foreground",
                "data-[active=true]:bg-primary-soft data-[active=true]:text-primary",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-border p-3 text-xs text-text-muted">
          OptiLog · v0.1 prototype
        </div>
      )}
    </div>
  );
}
