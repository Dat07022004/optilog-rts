import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelHeader } from "@/components/app/Panel";
import { PageHeader } from "@/components/app/PageHeader";
import { SettingRow, ToggleRow, useSettingsForm } from "@/components/app/SettingsForm";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({ meta: [{ title: "Settings — OptiLog" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { dirty, markDirty, save, reset } = useSettingsForm();
  return (
    <div className="space-y-5">
      <PageHeader
        title="Settings"
        summary="Manage your application preferences."
        action={
          <div className="flex gap-2">
            <button disabled={!dirty} onClick={reset} className="h-9 rounded-md border border-border bg-surface px-3 text-sm font-medium text-foreground hover:bg-surface-subtle disabled:opacity-50">Cancel</button>
            <button disabled={!dirty} onClick={save} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">Save changes</button>
          </div>
        }
      />

      <Panel>
        <PanelHeader title="General" />
        <div className="mt-3 divide-y divide-border" onChange={markDirty}>
          <SettingRow label="Default landing page">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>Dashboard</option><option>Cameras</option><option>Bird's Eye View</option></select>
          </SettingRow>
          <SettingRow label="Time zone">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>UTC</option><option>Asia/Ho_Chi_Minh</option><option>Europe/Berlin</option></select>
          </SettingRow>
          <SettingRow label="Number format">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>1,234.56</option><option>1.234,56</option></select>
          </SettingRow>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Notifications" />
        <div className="mt-3 divide-y divide-border" onChange={markDirty}>
          <ToggleRow label="Critical alerts" hint="Notify on critical severity" defaultChecked />
          <ToggleRow label="Camera offline" hint="Notify when a camera disconnects" defaultChecked />
          <ToggleRow label="Email digest" hint="Daily summary by email" />
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Realtime" />
        <div className="mt-3 divide-y divide-border" onChange={markDirty}>
          <SettingRow label="Update interval" hint="Stream refresh rate">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>1s</option><option>2s</option><option>5s</option></select>
          </SettingRow>
          <ToggleRow label="Pause feed on tab blur" hint="Save bandwidth when inactive" defaultChecked />
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Appearance" />
        <div className="mt-3 divide-y divide-border" onChange={markDirty}>
          <SettingRow label="Theme">
            <select className="h-9 rounded-md border border-border bg-surface px-2 text-sm"><option>System</option><option>Light</option><option>Dark</option></select>
          </SettingRow>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Data retention" description="Read-only — managed in System Settings" />
        <div className="mt-3 divide-y divide-border">
          <SettingRow label="Event history"><span className="text-sm text-text-secondary">90 days</span></SettingRow>
          <SettingRow label="Recorded footage"><span className="text-sm text-text-secondary">14 days</span></SettingRow>
        </div>
      </Panel>
    </div>
  );
}
