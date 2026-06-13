import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Panel } from "@/components/app/Panel";
import { StatusBadge } from "@/components/app/StatusBadge";
import { EmptyState } from "@/components/app/States";
import { users as allUsers, type User } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/management/users")({
  head: () => ({ meta: [{ title: "User Management — OptiLog" }] }),
  component: UsersPage,
});

function UsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [editing, setEditing] = useState<User | "new" | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);

  const list = useMemo(
    () =>
      allUsers.filter(
        (u) =>
          (role === "all" || u.role === role) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, role],
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="User Management"
        summary={`${allUsers.length} users · ${allUsers.filter((u) => u.status === "active").length} active`}
        action={
          <button onClick={() => setEditing("new")} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" aria-hidden /> Create user
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or email…" aria-label="Search users" className="h-9 w-56 rounded-md border border-border bg-surface pl-8 pr-3 text-sm focus:outline-none" />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role" className="h-9 rounded-md border border-border bg-surface px-2 text-sm">
          <option value="all">All roles</option>
          {["Admin", "Supervisor", "Operator", "Analyst"].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <Panel padded={false} className="overflow-hidden">
        {list.length === 0 ? (
          <EmptyState title="No users found" description="Adjust your search or filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="sticky top-0 bg-surface-subtle text-text-secondary">
                <tr>
                  <Th>Name</Th><Th>Email</Th><Th>Role</Th><Th>Status</Th><Th>Last active</Th>
                  <th className="px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((u) => (
                  <tr key={u.id} className="border-t border-border hover:bg-surface-subtle/50">
                    <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                    <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                    <td className="px-4 py-3">{u.role}</td>
                    <td className="px-4 py-3"><StatusBadge status={u.status} dot /></td>
                    <td className="px-4 py-3 text-text-secondary">{u.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <IconBtn label={`Edit ${u.name}`} onClick={() => setEditing(u)}><Pencil className="h-4 w-4" /></IconBtn>
                        <IconBtn label={`Delete ${u.name}`} onClick={() => setDeleting(u)} danger><Trash2 className="h-4 w-4" /></IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {editing && <UserDrawer user={editing === "new" ? null : editing} onClose={() => setEditing(null)} />}
      {deleting && (
        <ConfirmDialog
          title={`Delete ${deleting.name}?`}
          message={`This will permanently remove ${deleting.name} (${deleting.email}) and revoke their access.`}
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

function UserDrawer({ user, onClose }: { user: User | null; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} aria-hidden />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <h2 className="text-base font-semibold">{user ? "Edit user" : "Create user"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 text-text-secondary hover:bg-surface-subtle" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <form className="flex-1 space-y-4 overflow-y-auto p-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <Field label="Name" required><input defaultValue={user?.name} required className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm" /></Field>
          <Field label="Email" required><input type="email" defaultValue={user?.email} required className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm" /></Field>
          <Field label="Role"><select defaultValue={user?.role ?? "Operator"} className="h-9 w-full rounded-md border border-border bg-surface px-2 text-sm">{["Admin", "Supervisor", "Operator", "Analyst"].map((r) => <option key={r}>{r}</option>)}</select></Field>
          <Field label="Status"><select defaultValue={user?.status ?? "active"} className="h-9 w-full rounded-md border border-border bg-surface px-2 text-sm"><option value="active">Active</option><option value="disabled">Disabled</option></select></Field>
        </form>
        <div className="flex justify-end gap-2 border-t border-border p-4">
          <button onClick={onClose} className="h-9 rounded-md border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-subtle">Cancel</button>
          <button onClick={onClose} className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">Save changes</button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, message, onCancel, onConfirm }: { title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40" onClick={onCancel} aria-hidden />
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-5 shadow-lg">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="h-9 rounded-md border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-subtle">Cancel</button>
          <button onClick={onConfirm} className="h-9 rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground hover:opacity-90">Delete</button>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">{label}{required && <span className="text-danger"> *</span>}</span>
      {children}
    </label>
  );
}
