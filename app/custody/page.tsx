import { PageHeader, SiteShell } from '@/components/site-shell'

const features = [
  ['High-Security Vaulting', 'Class-rated reinforced vaults with seismic sensors, biometric dual-control access and 24/7 armed guarding.'],
  ['Full Insurance Cover', 'Assets insured at full market value against theft, loss and damage while in our custody.'],
  ['Assay & Verification', 'Independent weighing, purity testing for gold and certified grading for diamonds at intake.'],
  ['Segregated Storage', 'Client assets held separately in sealed, individually numbered containers — never pooled.'],
  ['Chain-of-Custody Records', 'Every movement logged and signed, with tamper-evident seals and CCTV evidence.'],
  ['Safe Keeping Receipts', 'A numbered receipt is issued for every deposit and can be verified online at any time.'],
  ['Secure Transport', 'Armoured, escorted transfers between mine sites, airports, refineries and our vault.'],
  ['Audits & Reporting', 'Regular independent audits and statements of holdings for clients and their banks.'],
]

export default function CustodyPage() {
  return <SiteShell><PageHeader eyebrow="Our Services" title="Safe Custody Features" intro="Everything we do protects the value, identity and documented ownership of your precious minerals." /><section className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-2">{features.map(([title, description], index) => <article key={title} className="bg-background p-10"><span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span><h2 className="mt-2 font-display text-2xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></article>)}</section></SiteShell>
}
