'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

export const PHONE_DISPLAY = '+233 20 364 1131'
export const PHONE_HREF = 'tel:+233203641131'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/custody', label: 'Safe Custody' },
  { href: '/custody/verify', label: 'Verify Receipt' },
  { href: '/custody/deposit', label: 'Request Deposit' },
]

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="font-display text-xl font-semibold tracking-wide">
            Capital Cargo <span className="text-primary">Trading Ltd</span>
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <nav aria-label="Primary navigation" className="flex flex-wrap gap-5 text-sm">
              {nav.map((item) => <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-primary">{item.label}</Link>)}
            </nav>
            <a href={PHONE_HREF} className="text-sm font-medium tracking-wide text-primary transition-colors hover:text-primary/80">{PHONE_DISPLAY}</a>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Capital Cargo Trading Ltd — Secure custody of gold, diamonds &amp; precious minerals.</p>
          <p>Call <a href={PHONE_HREF} className="font-medium text-primary hover:text-primary/80">{PHONE_DISPLAY}</a></p>
        </div>
      </footer>
    </div>
  )
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="border-b border-border"><div className="mx-auto max-w-6xl px-6 py-16"><p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p><h1 className="mt-3 font-display text-5xl font-semibold">{title}</h1><p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p><div className="mt-8 flex flex-wrap gap-2">{[['/custody','Features'],['/custody/verify','Verify Receipt'],['/custody/deposit','Request Deposit']].map(([href,label]) => <Link key={href} href={href} className="rounded border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">{label}</Link>)}</div></div></section>
}

export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={secondary ? 'rounded border border-border px-6 py-3 text-sm transition-colors hover:border-primary hover:text-primary' : 'rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90'}>{children}</Link>
}
