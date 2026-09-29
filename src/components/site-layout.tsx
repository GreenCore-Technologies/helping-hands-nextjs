"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/eligibility", label: "Eligibility" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Top Information Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a
              href="tel:2512880194"
              className="flex items-center gap-2 hover:underline"
            >
              <Phone size={14} aria-hidden="true" />
              251-288-0194
            </a>

            <span className="flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              Southwest Alabama
            </span>
          </div>

          <div className="font-medium">
            Early Intervention Services for Infants & Toddlers
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card text-card-foreground shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Helping Hands HCBS home"
            className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-primary/10 transition-colors group-hover:ring-primary/30">
              <img
                src="/helping-hands-mark.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="font-serif text-xl font-bold leading-tight text-foreground">
                Helping Hands
              </div>

              <div className="hidden text-xs text-muted-foreground lg:block">
                Home & Community Based Services, LLC
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center space-x-1 md:flex lg:space-x-4"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link href="/referral" className="ml-2">
              <Button className="rounded-full bg-primary px-6 font-medium text-white shadow-sm hover:bg-primary/90">
                Make a Referral
              </Button>
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 md:hidden">
            <a
              href="tel:2512880194"
              aria-label="Call Helping Hands at 251-288-0194"
              className="flex items-center gap-1 rounded-md p-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Phone size={18} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen((current) => !current)
              }
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="rounded-md p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden border-b bg-card shadow-lg md:hidden"
          >
            <div className="flex flex-col space-y-2 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-md px-4 py-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pb-2 pt-4">
                <Link
                  href="/referral"
                  onClick={closeMenu}
                >
                  <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90">
                    Make a Referral
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow"
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground py-16 text-background">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-3">
          {/* Company Information */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img
                src="/helping-hands-mark.png"
                alt=""
                aria-hidden="true"
                className="h-12 w-12 rounded-full bg-white object-cover"
              />

              <div className="font-serif text-xl font-bold">
                Helping Hands
              </div>
            </div>

            <p className="mb-6 max-w-sm text-muted">
              Helping Hands Home & Community Based Services, LLC
            </p>

            <div className="space-y-3 text-muted">
              <p className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-secondary"
                  aria-hidden="true"
                />

                <a
                  href="tel:2512880194"
                  className="hover:underline"
                >
                  251-288-0194
                </a>
              </p>

              <p className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-secondary"
                  aria-hidden="true"
                />

                <a
                  href="mailto:contact@helpinghandsei.com"
                  className="break-all hover:underline"
                >
                  contact@helpinghandsei.com
                </a>
              </p>

              <p className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-secondary"
                  aria-hidden="true"
                />

                <span>
                  Mobile County, Washington County, Escambia County,
                  Clarke County, and surrounding Southwest Alabama
                  communities.
                </span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-sm py-1.5 text-muted transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/referral"
                  className="inline-block rounded-sm py-1.5 text-muted transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  Referrals
                </Link>
              </li>
            </ul>
          </nav>

          {/* Organization Promise */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Our Promise
            </h3>

            <p className="mb-8 italic text-muted">
              &ldquo;Serving Southwest Alabama families since day
              one.&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Globe
                  size={20}
                  aria-hidden="true"
                />
              </span>

              <span className="text-sm text-muted">
                Helping Hands HCBS
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="container mx-auto mt-12 border-t border-white/10 px-4 pt-8 text-center text-sm text-muted/60">
          <p>
            &copy; {new Date().getFullYear()} Helping Hands Home &
            Community Based Services, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}