import { cn } from "@/lib/utils";

export type StatusKind =
  | "online"
  | "offline"
  | "degraded"
  | "warning"
  | "syncing"
  | "paused"
  | "unknown"
  | "healthy"
  | "danger"
  | "active"
  | "disabled"
  | "low"
  | "medium"
  | "high"
  | "critical";

const styles: Record<string, string> = {
  online: "bg-success-soft text-success",
  healthy: "bg-success-soft text-success",
  active: "bg-success-soft text-success",
  success: "bg-success-soft text-success",
  low: "bg-success-soft text-success",
  offline: "bg-danger-soft text-danger",
  danger: "bg-danger-soft text-danger",
  critical: "bg-danger-soft text-danger",
  high: "bg-danger-soft text-danger",
  degraded: "bg-warning-soft text-warning",
  warning: "bg-warning-soft text-warning",
  medium: "bg-warning-soft text-warning",
  syncing: "bg-info-soft text-info",
  info: "bg-info-soft text-info",
  paused: "bg-neutral-soft text-neutral",
  disabled: "bg-neutral-soft text-neutral",
  unknown: "bg-neutral-soft text-neutral",
};

const dotColor: Record<string, string> = {
  online: "bg-success",
  healthy: "bg-success",
  active: "bg-success",
  low: "bg-success",
  offline: "bg-danger",
  danger: "bg-danger",
  critical: "bg-danger",
  high: "bg-danger",
  degraded: "bg-warning",
  warning: "bg-warning",
  medium: "bg-warning",
  syncing: "bg-info",
  paused: "bg-neutral",
  disabled: "bg-neutral",
  unknown: "bg-neutral",
};

export function StatusBadge({
  status,
  label,
  dot = false,
  className,
}: {
  status: string;
  label?: string;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium capitalize whitespace-nowrap",
        styles[status] ?? styles.unknown,
        className,
      )}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[status] ?? dotColor.unknown)} />
      )}
      {label ?? status}
    </span>
  );
}
