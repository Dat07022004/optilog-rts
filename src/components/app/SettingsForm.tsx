import { useState, type ReactNode } from "react";
import { toast } from "sonner";

export function useSettingsForm() {
  const [dirty, setDirty] = useState(false);
  return {
    dirty,
    markDirty: () => setDirty(true),
    save: () => {
      setDirty(false);
      toast.success("Settings saved");
    },
    reset: () => setDirty(false),
  };
}

export function SettingRow({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function ToggleRow({ label, hint, defaultChecked = false }: { label: string; hint?: string; defaultChecked?: boolean }) {
  return (
    <SettingRow label={label} hint={hint}>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[var(--brand-primary)]" aria-label={label} />
    </SettingRow>
  );
}
