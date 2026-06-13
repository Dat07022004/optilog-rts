import { cn } from "@/lib/utils";
import { Wifi, WifiOff, Loader2 } from "lucide-react";

export type ConnState = "live" | "reconnecting" | "offline";

export function RealtimeStatus({
  state,
  detail,
  className,
}: {
  state: ConnState;
  detail?: string;
  className?: string;
}) {
  const config = {
    live: { icon: Wifi, label: "Live", cls: "text-success", dot: "bg-success" },
    reconnecting: { icon: Loader2, label: "Reconnecting", cls: "text-warning", dot: "bg-warning" },
    offline: { icon: WifiOff, label: "Offline", cls: "text-danger", dot: "bg-danger" },
  }[state];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      <Icon className={cn("h-3.5 w-3.5", config.cls, state === "reconnecting" && "animate-spin")} aria-hidden />
      <span className={config.cls}>{config.label}</span>
      {detail && <span className="text-text-muted">· {detail}</span>}
    </span>
  );
}
