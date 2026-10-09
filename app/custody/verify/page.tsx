'use client'

import { FormEvent, useState } from 'react'
import { PageHeader, SiteShell } from '@/components/site-shell'

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const [state, setState] = useState<'idle' | 'none' | 'verified'>('idle')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const normalizedCode = code.trim().toUpperCase()
    const verifiedCodes = ['CCT-SKR-2026-0001', 'SKR/QPG/06-07-26', 'SKR/20-08-0366']
    setState(verifiedCodes.includes(normalizedCode) ? 'verified' : 'none')
  }
  return <SiteShell><PageHeader eyebrow="Verification" title="Verify a Receipt" intro="Enter your Safe Keeping Receipt number to confirm the custody status of the assets." /><section className="mx-auto max-w-2xl px-6 py-16"><form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row"><label htmlFor="receipt" className="sr-only">Receipt number</label><input id="receipt" value={code} onChange={(event) => setCode(event.target.value)} maxLength={40} placeholder="e.g. CCT-SKR-2026-0001" className="flex-1 rounded border border-input bg-card px-4 py-3 outline-none focus:border-primary" /><button className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Verify</button></form>{state === 'none' && <p className="mt-6 rounded border border-destructive/50 p-4 text-sm text-destructive">No receipt found with that number. Please check and try again, or contact us.</p>}{state === 'verified' && <p className="mt-6 rounded border border-emerald-500/50 bg-card p-4 font-semibold text-emerald-500">Receipt is verified</p>}<p className="mt-8 text-xs text-muted-foreground">Sample receipt: CCT-SKR-2026-0001</p></section></SiteShell>
}
