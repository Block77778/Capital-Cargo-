import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import hero from "@/assets/precious-minerals.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capital Cargo Trading Ltd — Gold & Diamond Security House" },
      { name: "description", content: "Insured safe custody, verification and secure transport for gold, diamonds and precious minerals." },
      { property: "og:title", content: "Capital Cargo Trading Ltd — Security House" },
      { property: "og:description", content: "Insured safe custody for gold, diamonds and precious minerals." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Gold bars and diamonds in a vault" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Security House</p>
          <h1 className="mt-4 max-w-2xl font-display text-6xl font-semibold leading-tight">
            Safe custody for gold, diamonds & precious minerals
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Fully insured vaulting, assay verification and documented chain-of-custody — trusted by miners, traders and investors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/custody/deposit" className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Request a deposit</Link>
            <Link to="/custody/verify" className="rounded border border-border px-6 py-3 text-sm hover:border-primary hover:text-primary">Verify a receipt</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
        {[
          ["Safe Custody", "Explore our vaulting, insurance and audit standards.", "/custody"],
          ["Verify Receipt", "Check the status of a Safe Keeping Receipt instantly.", "/custody/verify"],
          ["Request Deposit", "Schedule intake or get a custody quote.", "/custody/deposit"],
        ].map(([t, d, to]) => (
          <Link key={t} to={to as "/custody/verify"} className="rounded border border-border bg-card p-8 transition-colors hover:border-primary">
            <h2 className="font-display text-2xl text-primary">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
