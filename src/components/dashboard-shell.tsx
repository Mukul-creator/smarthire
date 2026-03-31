import type { SessionUser } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export function DashboardShell({
  user,
  title,
  description,
  items,
}: {
  user: SessionUser;
  title: string;
  description: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              {user.role} workspace
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
              {description}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-white/10 bg-black/20 p-6"
            >
              <p className="text-sm text-zinc-400">{item.label}</p>
              <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Current session</h2>
          <dl className="mt-5 grid gap-4 text-sm text-zinc-300 sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Name</dt>
              <dd className="mt-1 text-base text-white">{user.name}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Email</dt>
              <dd className="mt-1 text-base text-white">{user.email}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Role</dt>
              <dd className="mt-1 text-base capitalize text-white">
                {user.role}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Status</dt>
              <dd className="mt-1 text-base text-white">Authenticated</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
