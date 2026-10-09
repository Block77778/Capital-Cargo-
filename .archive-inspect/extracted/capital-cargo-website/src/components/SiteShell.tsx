import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const PHONE_DISPLAY = "+233 20 364 1131";
export const PHONE_HREF = "tel:+233203641131";

const nav = [
  { to: "/", label: "Home" },
  { to: "/custody", label: "Safe Custody" },
  { to: "/custody/verify", label: "Verify Receipt" },
  { to: "/custody/deposit", label: "Request Deposit" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-display text-xl font-semibold tracking-wide">
            Capital Cargo <span className="text-primary">Trading Ltd</span>
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <nav className="flex flex-wrap gap-5 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <a
              href={PHONE_HREF}
              className="text-sm font-medium tracking-wide text-primary transition-colors hover:text-primary/80"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Capital Cargo Trading Ltd — Secure custody of gold, diamonds &
            precious minerals.
          </p>
          <p>
            Call{" "}
            <a href={PHONE_HREF} className="font-medium text-primary hover:text-primary/80">
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl font-semibold">{title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {[["/custody", "Features"], ["/custody/verify", "Verify Receipt"], ["/custody/deposit", "Request Deposit"]].map(([to, l]) => (
            <Link key={to} to={to as "/custody"} activeOptions={{ exact: true }} className="rounded border border-border px-4 py-2 text-sm text-muted-foreground hover:text-primary" activeProps={{ className: "border-primary text-primary" }}>{l}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
