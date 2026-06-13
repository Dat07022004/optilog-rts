import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_shell/management")({
  component: ManagementLayout,
});

const tabs = [
  { to: "/management/users", label: "Users" },
  { to: "/management/cameras", label: "Cameras" },
  { to: "/management/settings", label: "System" },
];

function ManagementLayout() {
  return (
    <div className="space-y-5">
      <div className="border-b border-border">
        <nav className="flex gap-1">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeProps={{ "data-active": "true" } as Record<string, string>}
              className="-mb-px border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-foreground data-[active=true]:border-primary data-[active=true]:text-primary"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
