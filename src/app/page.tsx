import Link from "next/link";

const metrics = [
  {
    label: "Active interviews",
    value: "128",
    change: "+12% this week",
  },
  {
    label: "Candidates screened",
    value: "1,024",
    change: "+86 this month",
  },
  {
    label: "Average AI score",
    value: "84.6",
    change: "Across all roles",
  },
  {
    label: "Completion rate",
    value: "91%",
    change: "Interview to report",
  },
];

const roleCards = [
  {
    title: "Interviewer workspace",
    description:
      "Manage interview pipelines, assign roles, review evaluation reports, and monitor candidate progress.",
    href: "/login",
    action: "Login as interviewer",
  },
  {
    title: "Candidate workspace",
    description:
      "Create a candidate account, log in, and access interview invitations and feedback from your dashboard.",
    href: "/signup",
    action: "Sign up as candidate",
  },
];

const pipeline = [
  {
    role: "Frontend Engineer",
    stage: "Technical round",
    progress: "24 candidates",
    score: "88 avg score",
  },
  {
    role: "Backend Engineer",
    stage: "Screening",
    progress: "18 candidates",
    score: "83 avg score",
  },
  {
    role: "DevOps Engineer",
    stage: "Evaluation",
    progress: "11 candidates",
    score: "86 avg score",
  },
];

const recentSessions = [
  {
    candidate: "Aarav Sharma",
    role: "Frontend Engineer",
    result: "Strong fit",
    score: "91",
  },
  {
    candidate: "Priya Nair",
    role: "Backend Engineer",
    result: "Needs review",
    score: "79",
  },
  {
    candidate: "Rohan Mehta",
    role: "DevOps Engineer",
    result: "Strong fit",
    score: "88",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white px-6 py-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
              smarthire
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              AI Interview Platform Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Centralized interviewer and candidate workflows with AI-powered
              screening, scoring, and feedback.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Candidate signup
            </Link>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  Overview
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Professional hiring operations powered by AI interviews.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Run role-based interview sessions, analyze candidate
                  performance, and keep interviewer and candidate access
                  separated through secure dashboards and intelligent reporting.
                </p>
              </div>

              <div className="min-w-[240px] rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Today&apos;s status</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  36 sessions
                </p>
                <p className="mt-2 text-sm text-emerald-600">
                  8 interviews completed in the last 2 hours
                </p>
                <div className="mt-5 h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[72%] rounded-full bg-emerald-500" />
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                  daily capacity at 72%
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{metric.change}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-[#0f172a] p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Quick access
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Start with the right workspace
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Choose the role-specific experience you want to enter and keep
              interviews structured from the first screen onward.
            </p>

            <div className="mt-6 space-y-4">
              {roleCards.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  className="block rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <h4 className="text-lg font-semibold text-white">
                    {role.title}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {role.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-emerald-300">
                    {role.action}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  Interview pipeline
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Active hiring roles
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                Live
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {pipeline.map((item) => (
                <article
                  key={item.role}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {item.role}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600">{item.stage}</p>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p>{item.progress}</p>
                      <p className="mt-1 font-semibold text-emerald-600">
                        {item.score}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  Recent sessions
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Latest interview outcomes
                </h3>
              </div>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
              <div className="grid grid-cols-[1.1fr_1fr_0.8fr_0.5fr] gap-3 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span>Candidate</span>
                <span>Role</span>
                <span>Result</span>
                <span>Score</span>
              </div>
              {recentSessions.map((session) => (
                <div
                  key={`${session.candidate}-${session.role}`}
                  className="grid grid-cols-[1.1fr_1fr_0.8fr_0.5fr] gap-3 border-t border-slate-200 bg-white px-5 py-4 text-sm text-slate-700"
                >
                  <span className="font-medium text-slate-900">
                    {session.candidate}
                  </span>
                  <span>{session.role}</span>
                  <span
                    className={
                      session.result === "Strong fit"
                        ? "font-medium text-emerald-600"
                        : "font-medium text-amber-600"
                    }
                  >
                    {session.result}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {session.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
