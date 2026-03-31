import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-white">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Access restricted
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          You do not have permission to view that page.
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-300">
          Login with the correct account type or return to the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            Login
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
