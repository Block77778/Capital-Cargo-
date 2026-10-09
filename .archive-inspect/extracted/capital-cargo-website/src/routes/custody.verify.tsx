import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/custody/verify")({
  head: () => ({
    meta: [
      { title: "Verify Safe Keeping Receipt — Capital Cargo Trading Ltd" },
      { name: "description", content: "Check the custody status of your gold, diamonds or minerals with your Safe Keeping Receipt number." },
      { property: "og:title", content: "Verify Safe Keeping Receipt — Capital Cargo Trading Ltd" },
      { property: "og:description", content: "Instantly verify custody status with your receipt number." },
    ],
  }),
  component: VerifyPage,
});

type Rec = { receipt_number: string; asset: string; quantity: string; status: string; updated_at: string };

function VerifyPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | "none" | "error" | Rec>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,40}$/.test(c)) return setResult("none");
    setLoading(true);
    const { data, error } = await supabase.rpc("verify_receipt", { _code: c });
    setLoading(false);
    if (error) return setResult("error");
    setResult(data?.[0] ?? "none");
  };
  const rec = result && typeof result === "object" ? result : null;

  return (
    <SiteShell>
      <PageHeader eyebrow="Verification" title="Verify a Receipt" intro="Enter your Safe Keeping Receipt number to confirm the custody status of the assets." />
      <section className="mx-auto max-w-2xl px-6 py-16">
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={40}
            placeholder="e.g. CCT-SKR-2026-0001"
            className="flex-1 rounded border border-input bg-card px-4 py-3 outline-none focus:border-primary"
          />
          <button disabled={loading} className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{loading ? "Checking…" : "Verify"}</button>
        </form>
        {result === "none" && (
          <p className="mt-6 rounded border border-destructive/50 p-4 text-sm text-destructive">No receipt found with that number. Please check and try again, or contact us.</p>
        )}
        {result === "error" && <p className="mt-6 text-sm text-destructive">Something went wrong. Please try again.</p>}
        {rec && (
          <div className="mt-6 rounded border border-primary/50 bg-card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Receipt verified</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <dt className="text-muted-foreground">Receipt</dt><dd>{rec.receipt_number}</dd>
              <dt className="text-muted-foreground">Asset</dt><dd>{rec.asset}</dd>
              <dt className="text-muted-foreground">Quantity</dt><dd>{rec.quantity}</dd>
              <dt className="text-muted-foreground">Status</dt><dd className="text-primary">{rec.status}</dd>
              <dt className="text-muted-foreground">Last updated</dt><dd>{new Date(rec.updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</dd>
            </dl>
          </div>
        )}
        <p className="mt-8 text-xs text-muted-foreground">Sample receipt: CCT-SKR-2026-0001</p>
      </section>
    </SiteShell>
  );
}
