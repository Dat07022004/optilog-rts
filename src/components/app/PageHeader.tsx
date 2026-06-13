import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  summary,
  action,
  size = "page",
}: {
  title: string;
  summary?: ReactNode;
  action?: ReactNode;
  size?: "page" | "dashboard";
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1
          className={cn(
            "font-semibold tracking-normal text-foreground",
            size === "dashboard" ? "text-3xl leading-9" : "text-2xl leading-8",
          )}
        >
          {title}
        </h1>
        {summary && <div className="mt-1 text-sm text-text-secondary">{summary}</div>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}
