'use client'

import { FormEvent, useState } from 'react'
import { PageHeader, SiteShell } from '@/components/site-shell'

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const [state, setState] = useState<'idle' | 'none' | 'verified'>('idle')
  const submit = (event: FormEvent) => { event.preventDefault(); setState(code.trim().toUpperCase() === 'CCT-SKR-2026-0001' ? 'verified' : 'none') }
  return <SiteShell><PageHeader eyebrow="Verification" title="Verify a Receipt" intro="Enter your Safe Keeping Receipt number to confirm the custody status of the assets." /><section className="mx-auto max-w-2xl px-6 py-16"><form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row"><label htmlFor="receipt" className="sr-only">Receipt number</label><input id="receipt" value={code} onChange={(event) => setCode(event.target.value)} maxLength={40} placeholder="e.g. CCT-SKR-2026-0001" className="flex-1 rounded border border-input bg-card px-4 py-3 outline-none focus:border-primary" /><button className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Verify</button></form>{state === 'none' && <p className="mt-6 rounded border border-destructive/50 p-4 text-sm text-destructive">No receipt found with that number. Please check and try again, or contact us.</p>}{state === 'verified' && <div className="mt-6 rounded border border-primary/50 bg-card p-6"><p className="text-xs uppercase tracking-[0.3em] text-primary">Receipt verified</p><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><dt className="text-muted-foreground">Receipt</dt><dd>CCT-SKR-2026-0001</dd><dt className="text-muted-foreground">Asset</dt><dd>Gold bullion</dd><dt className="text-muted-foreground">Quantity</dt><dd>25 kg</dd><dt className="text-muted-foreground">Status</dt><dd className="text-primary">In secure custody</dd></dl></div>}<p className="mt-8 text-xs text-muted-foreground">Sample receipt: CCT-SKR-2026-0001</p></section></SiteShell>
}
