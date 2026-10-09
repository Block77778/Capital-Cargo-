import Image from 'next/image'
import { ButtonLink, SiteShell } from '@/components/site-shell'

const cards = [
  ['Safe Custody', 'Explore our vaulting, insurance and audit standards.', '/custody'],
  ['Verify Receipt', 'Check the status of a Safe Keeping Receipt instantly.', '/custody/verify'],
  ['Request Deposit', 'Schedule intake or get a custody quote.', '/custody/deposit'],
]

export default function Page() {
  return <SiteShell><section className="relative min-h-[530px] overflow-hidden"><Image src="/precious-minerals.jpg" alt="Gold bars and diamonds in a secure vault" fill priority className="object-cover object-center opacity-40" /><div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" /><div className="relative mx-auto max-w-6xl px-6 py-32"><p className="text-xs uppercase tracking-[0.3em] text-primary">Security House</p><h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-tight sm:text-6xl">Safe custody for gold, diamonds &amp; precious minerals</h1><p className="mt-6 max-w-xl text-lg text-muted-foreground">Fully insured vaulting, assay verification and documented chain-of-custody — trusted by miners, traders and investors.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/custody/deposit">Request a deposit</ButtonLink><ButtonLink href="/custody/verify" secondary>Verify a receipt</ButtonLink></div></div></section><section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">{cards.map(([title, description, href]) => <ButtonLink key={title} href={href} secondary><span className="block font-display text-2xl text-primary">{title}</span><span className="mt-2 block text-sm text-muted-foreground">{description}</span></ButtonLink>)}</section></SiteShell>
}
