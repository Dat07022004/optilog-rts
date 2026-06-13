import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelHeader } from "@/components/app/Panel";
import { PageHeader } from "@/components/app/PageHeader";
import { SettingRow, ToggleRow, useSettingsForm } from "@/components/app/SettingsForm";

export const Route = createFileRoute("/_shell/management/settings")({
  head: () => ({ meta: [{ title: "System Settings — OptiLog" }] }),
  component: SystemSettingsPage,
});

function SystemSettingsPage() {
  const { dirty, markDirty, save, reset } = useSettingsForm();
  return (
    <div className="space-y-5">
      <PageHeader
        title="System Settings"
        summary="Configure detection thresholds and data retention."
        action={
          <div className="flex gap-2">
            <button disabled={!dirty} onClick={reset} className="h-9 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground hover:bg-surface-subtle disabled:opacity-50">Cancel</button>
            <button disabled={!dirty} onClick={save} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">Save changes</button>
          </div>
        }
      />

      <Panel>
        <PanelHeader title="Detection" description="Object detection thresholds" />
        <div className="mt-3 divide-y divide-border" onChange={markDirty}>
          <SettingRow label="Confidence threshold" hint="Minimum detection confidence">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>0.5</option><option>0.6</option><option>0.7</option></select>
          </SettingRow>
          <SettingRow label="Tracking model" hint="Active inference model">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>YOLOv8-warehouse</option><option>RT-DETR</option></select>
          </SettingRow>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Data retention" />
        <div className="mt-3 divide-y divide-border" onChange={markDirty}>
          <SettingRow label="Event history" hint="How long replay events are kept">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>30 days</option><option>90 days</option><option>1 year</option></select>
          </SettingRow>
          <SettingRow label="Recorded footage" hint="Footage storage window">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>7 days</option><option>14 days</option><option>30 days</option></select>
          </SettingRow>
          <ToggleRow label="Auto-archive stale cameras" hint="Archive cameras offline >7 days" />
        </div>
      </Panel>
    </div>
  );
}
