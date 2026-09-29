"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  LogOut,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Referral Submissions",
    href: "/admin/referral-submissions",
    icon: ClipboardList,
  },
  {
    name: "Contact Messages",
    href: "/admin/contact-submissions",
    icon: Mail,
  },
];

export function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    loading,
    logout,
  } = useAdminAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      await logout();

      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-green-700" />

          <p className="mt-4 text-sm text-slate-600">
            Verifying admin session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <Image
            src="/helping-hands-logo.png"
            alt="Helping Hands"
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
          />

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Helping Hands
            </p>

            <p className="text-xs text-slate-500">
              Admin Portal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMobileOpen((current) => !current)
          }
          className="rounded-lg border border-slate-200 p-2 text-slate-700"
          aria-label="Toggle admin navigation"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </header>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-b border-slate-200 bg-white p-4 lg:hidden">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-green-700 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                  {item.name}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50"
            >
              <LogOut className="h-5 w-5" />

              {loggingOut
                ? "Signing out..."
                : "Sign Out"}
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/helping-hands-logo.png"
              alt="Helping Hands"
              width={52}
              height={52}
              className="h-12 w-12 object-contain"
            />

            <div>
              <h2 className="font-semibold text-slate-900">
                Helping Hands
              </h2>

              <p className="text-sm text-slate-500">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-green-700 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5" />

                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Signed in as
            </p>

            <p className="mt-1 truncate text-sm font-medium text-slate-900">
              {user.username}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />

            {loggingOut
              ? "Signing out..."
              : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="min-h-screen lg:ml-72">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}