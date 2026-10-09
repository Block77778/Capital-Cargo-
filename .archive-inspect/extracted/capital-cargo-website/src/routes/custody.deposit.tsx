import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, PHONE_DISPLAY, PHONE_HREF, SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/custody/deposit")({
  head: () => ({
    meta: [
      { title: "Request a Custody Deposit — Capital Cargo Trading Ltd" },
      { name: "description", content: "Schedule a vault intake or request a safe custody quote for gold, diamonds or precious minerals." },
      { property: "og:title", content: "Request a Custody Deposit — Capital Cargo Trading Ltd" },
      { property: "og:description", content: "Schedule vault intake or get a safe custody quote." },
    ],
  }),
  component: DepositPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  mineral: z.enum(["Gold", "Diamonds", "Other precious minerals"]),
  quantity: z.string().trim().min(1, "Estimated quantity is required").max(60),
  service: z.enum(["Vault intake", "Custody quote", "Secure transport"]),
  date: z.string().max(20).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const field = "w-full rounded border border-input bg-card px-4 py-3 outline-none focus:border-primary";

function DepositPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      return setErrors(errs);
    }
    setErrors({});
    setBusy(true);
    const d = parsed.data;
    const { error } = await supabase.from("deposit_requests").insert({
      name: d.name, company: d.company || null, email: d.email, phone: d.phone, mineral: d.mineral,
      quantity: d.quantity, service: d.service, preferred_date: d.date || null, notes: d.notes || null,
    });
    setBusy(false);
    if (error) return setErrors({ form: "Could not send your request. Please try again." });
    setSent(true);
  };

  const Err = ({ n }: { n: string }) => (errors[n] ? <p className="mt-1 text-xs text-destructive">{errors[n]}</p> : null);

  return (
    <SiteShell>
      <PageHeader eyebrow="Get Started" title="Deposit & Valuation Request" intro="Tell us about your assets and we'll arrange intake, valuation and a custody quote." />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-6 text-sm text-muted-foreground">
          Prefer to talk? Call{" "}
          <a href={PHONE_HREF} className="font-medium text-primary hover:text-primary/80">
            {PHONE_DISPLAY}
          </a>{" "}
          and our custody team will assist you.
        </p>

        {sent ? (
          <div className="rounded border border-primary/50 bg-card p-8 text-center">
            <h2 className="font-display text-3xl text-primary">Request received</h2>
            <p className="mt-2 text-muted-foreground">Our custody team will contact you within one business day.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate>
            <div><input name="name" placeholder="Full name *" maxLength={100} className={field} /><Err n="name" /></div>
            <div><input name="company" placeholder="Company" maxLength={100} className={field} /></div>
            <div><input name="email" type="email" placeholder="Email *" maxLength={255} className={field} /><Err n="email" /></div>
            <div><input name="phone" placeholder="Phone *" maxLength={30} className={field} /><Err n="phone" /></div>
            <div>
              <select name="mineral" className={field}>
                <option>Gold</option><option>Diamonds</option><option>Other precious minerals</option>
              </select>
            </div>
            <div><input name="quantity" placeholder="Estimated quantity (kg / ct) *" maxLength={60} className={field} /><Err n="quantity" /></div>
            <div>
              <select name="service" className={field}>
                <option>Vault intake</option><option>Custody quote</option><option>Secure transport</option>
              </select>
            </div>
            <div><input name="date" type="date" className={field} /></div>
            <div className="sm:col-span-2"><textarea name="notes" rows={4} maxLength={1000} placeholder="Additional details" className={field} /></div>
            {errors["form"] && <p className="text-sm text-destructive sm:col-span-2">{errors["form"]}</p>}
            <button disabled={busy} className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:col-span-2">{busy ? "Sending…" : "Submit request"}</button>
          </form>
        )}
      </section>
    </SiteShell>
  );
}
