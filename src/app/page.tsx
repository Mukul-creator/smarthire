export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-14">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-cyan-950/10 bg-cyan-950 px-4 py-1 text-sm font-medium tracking-[0.24em] text-cyan-50 uppercase">
              smartHire
            </div>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                AI interviews that feel structured, fast, and recruiter-ready.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Launch a text-based interviewer that screens candidates,
                adapts follow-up questions, and produces consistent evaluation
                notes for hiring teams.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Build Interview Flow
              </button>
              <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">
                View Candidate Journey
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Interview mode</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  Text-first
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Signal quality</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  Adaptive follow-ups
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Hiring output</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  Structured summaries
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-950 p-6 text-slate-50">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live interview preview</p>
                <h2 className="text-xl font-semibold">Frontend Engineer</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                Session Active
              </span>
            </div>

            <div className="space-y-4">
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white/8 p-4">
                <p className="text-sm text-slate-300">smartHire</p>
                <p className="mt-2 text-sm leading-7 text-slate-100">
                  Describe a system you built where performance issues only
                  appeared under production traffic. How did you isolate the
                  cause?
                </p>
              </div>

              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-cyan-400 p-4 text-slate-950">
                <p className="text-sm font-medium">Candidate</p>
                <p className="mt-2 text-sm leading-7">
                  I started with tracing and query timing, then compared real
                  user traffic patterns against staging. The issue came from a
                  cache invalidation path that only triggered with burst writes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
                  Evaluation snapshot
                </p>
                <div className="mt-4 grid gap-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between rounded-xl bg-white/6 px-4 py-3">
                    <span>Problem diagnosis</span>
                    <span className="font-semibold text-emerald-300">Strong</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/6 px-4 py-3">
                    <span>System thinking</span>
                    <span className="font-semibold text-amber-300">Promising</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/6 px-4 py-3">
                    <span>Communication clarity</span>
                    <span className="font-semibold text-cyan-300">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
