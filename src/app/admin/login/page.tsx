"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();

  const { user, loading } = useAdminAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(
        "/admin/referral-submissions",
      );
    }
  }, [user, loading, router]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      if (response.ok) {
        router.replace(
          "/admin/referral-submissions",
        );

        router.refresh();

        return;
      }

      const data = (await response
        .json()
        .catch(() => ({}))) as {
        error?: string;
      };

      setError(
        data.error ??
          "Login failed. Please check your credentials.",
      );
    } catch {
      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/helping-hands-logo.png"
            alt="Helping Hands Early Intervention Program"
            width={192}
            height={176}
            className="mx-auto mb-4 h-auto max-h-44 w-48 object-contain"
            priority
          />

          <h1 className="font-serif text-2xl font-bold text-foreground">
            Admin Login
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Helping Hands HCBS
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="admin"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Signing in…"
                : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorized personnel only.
        </p>
      </div>
    </main>
  );
}