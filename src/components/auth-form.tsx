"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "signup";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const payload =
      mode === "signup"
        ? {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          }
        : {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          };

    try {
      const response = await fetch(
        mode === "signup" ? "/api/auth/signup" : "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = (await response.json()) as {
        error?: string;
        user?: { role: "interviewer" | "candidate" };
      };

      if (!response.ok || !data.user) {
        setError(data.error ?? "Authentication failed.");
        return;
      }

      router.push(data.user.role === "interviewer" ? "/interviewer" : "/candidate");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
        smarthire
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
        {mode === "login" ? "Login to your account" : "Candidate signup"}
      </h1>
      <p className="mt-3 text-sm leading-7 text-zinc-300">
        {mode === "login"
          ? "Interviewer admin and candidate login are both enabled. New registrations are currently limited to candidates."
          : "Create a candidate account to join interviews, practice rounds, and view feedback."}
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">
              Full name
            </span>
            <input
              required
              name="name"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-300"
              placeholder="Aarav Sharma"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-200">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-300"
            placeholder={
              mode === "login" ? "admin@smarthire.local or you@example.com" : "you@example.com"
            }
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-200">
            Password
          </span>
          <input
            required
            type="password"
            name="password"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-300"
            placeholder="........"
          />
        </label>

        {error ? (
          <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Create candidate account"}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2 text-sm text-zinc-300">
        {mode === "login" ? (
          <>
            <span>Need a candidate account?</span>
            <Link
              href="/signup"
              className="font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <Link
              href="/login"
              className="font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
