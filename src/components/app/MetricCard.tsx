import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon, Minus } from "lucide-react";

export function MetricCard({
  label,
  value,
  unit,
  delta,
  deltaType = "neutral",
  updated,
  icon: Icon,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  updated?: string;
  icon?: LucideIcon;
}) {
  const DeltaIcon = deltaType === "up" ? ArrowUpRight : deltaType === "down" ? ArrowDownRight : Minus;
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-text-muted" aria-hidden />}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="tabular text-2xl font-semibold leading-8 text-foreground">{value}</span>
        {unit && <span className="text-sm text-text-muted">{unit}</span>}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium tabular",
              deltaType === "up" && "text-success",
              deltaType === "down" && "text-danger",
              deltaType === "neutral" && "text-text-muted",
            )}
          >
            <DeltaIcon className="h-3 w-3" aria-hidden />
            {delta}
          </span>
        ) : (
          <span />
        )}
        {updated && <span className="text-xs text-text-muted">{updated}</span>}
      </div>
    </div>
  );
}
