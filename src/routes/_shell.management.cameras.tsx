import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel } from "@/components/app/Panel";
import { StatusBadge } from "@/components/app/StatusBadge";
import { EmptyState } from "@/components/app/States";
import { cameras as allCameras, type Camera } from "@/lib/mock-data";
import { ConfirmDialog, Field } from "./_shell.management.users";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/management/cameras")({
  head: () => ({ meta: [{ title: "Camera Management — OptiLog" }] }),
  component: CameraMgmtPage,
});

function CameraMgmtPage() {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Camera | "new" | null>(null);
  const [deleting, setDeleting] = useState<Camera | null>(null);

  const list = useMemo(
    () => allCameras.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.zone.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Camera Management"
        summary={`${allCameras.length} cameras configured`}
        action={
          <button onClick={() => setEditing("new")} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" aria-hidden /> Create camera
          </button>
        }
      />

      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search camera or zone…" aria-label="Search cameras" className="h-9 w-56 rounded-md border border-border bg-surface pl-8 pr-3 text-sm focus:outline-none" />
      </div>

      <Panel padded={false} className="overflow-hidden">
        {list.length === 0 ? (
          <EmptyState title="No cameras found" description="Adjust your search term." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="sticky top-0 bg-surface-subtle text-text-secondary">
                <tr>
                  <Th>Camera name</Th><Th>Location/zone</Th><Th>Stream URL</Th><Th>Status</Th><Th>Last sync</Th>
                  <th className="px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.id} className="border-t border-border hover:bg-surface-subtle/50">
                    <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-text-secondary">{c.zone}</td>
                    <td className="px-4 py-3 font-mono text-xs text-text-secondary">{c.streamUrl}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} dot /></td>
                    <td className="px-4 py-3 text-text-secondary">{c.lastFrame}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <IconBtn label={`Edit ${c.name}`} onClick={() => setEditing(c)}><Pencil className="h-4 w-4" /></IconBtn>
                        <IconBtn label={`Delete ${c.name}`} onClick={() => setDeleting(c)} danger><Trash2 className="h-4 w-4" /></IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {editing && <CameraDrawer camera={editing === "new" ? null : editing} onClose={() => setEditing(null)} />}
      {deleting && (
        <ConfirmDialog
          title={`Delete ${deleting.name}?`}
          message={`This removes ${deleting.name} (${deleting.zone}) from the system. Recorded footage is retained.`}
          onCancel={() => setDeleting(null)}
          onConfirm={() => setDeleting(null)}
        />
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left font-medium">{children}</th>;
}

function IconBtn({ label, onClick, children, danger }: { label: string; onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button onClick={onClick} aria-label={label} title={label} className={cn("rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle", danger && "hover:text-danger")}>
      {children}
    </button>
  );
}

function CameraDrawer({ camera, onClose }: { camera: Camera | null; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} aria-hidden />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <h2 className="text-base font-semibold">{camera ? "Edit camera" : "Create camera"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <form className="flex-1 space-y-4 overflow-y-auto p-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <Field label="Camera name" required><input defaultValue={camera?.name} required className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm" /></Field>
          <Field label="Zone"><select defaultValue={camera?.zone ?? "Inbound"} className="h-9 w-full rounded-md border border-border bg-surface px-2 text-sm">{["Inbound", "Storage A", "Storage B", "Packing", "Outbound"].map((z) => <option key={z}>{z}</option>)}</select></Field>
          <Field label="Stream URL" required><input defaultValue={camera?.streamUrl} placeholder="rtsp://…" required className="h-9 w-full rounded-md border border-border bg-surface px-3 font-mono text-xs" /></Field>
          <label className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Enabled</span>
            <input type="checkbox" defaultChecked={camera?.status !== "offline"} className="h-4 w-4 accent-[var(--brand-primary)]" />
          </label>
          <Field label="Notes"><textarea rows={3} placeholder="Optional notes…" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" /></Field>
        </form>
        <div className="flex justify-end gap-2 border-t border-border p-4">
          <button onClick={onClose} className="h-9 rounded-md border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-subtle">Cancel</button>
          <button onClick={onClose} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">Save changes</button>
        </div>
      </div>
    </div>
  );
}
