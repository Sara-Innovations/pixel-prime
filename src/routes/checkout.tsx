import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, Loader2, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — M.A Computer" }] }),
  component: CheckoutPage,
});

type Method = "sslcommerz" | "bkash" | "nagad" | "cod";

function CheckoutPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const { items, total, clear } = useCart();
  const [method, setMethod] = useState<Method>("bkash");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Dhaka", area: "", postcode: "" });

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
    if (!loading && items.length === 0) nav({ to: "/cart" });
  }, [loading, user, items.length, nav]);

  useEffect(() => {
    if (user?.user_metadata?.full_name) setForm((f) => ({ ...f, name: user.user_metadata.full_name as string }));
  }, [user]);

  const subtotal = total();
  const shipping = subtotal > 5000 ? 0 : 120;
  const tax = Math.round(subtotal * 0.05);
  const grand = subtotal + shipping + tax;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("orders").insert({
        user_id: user.id,
        total: grand,
        status: method === "cod" ? "pending" : "paid",
        payment_method: method,
        shipping_address: form,
        items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      });
      if (error) throw error;
      clear();
      toast.success("Order placed successfully!");
      nav({ to: "/account" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Order failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6">Checkout</h1>
      <form onSubmit={placeOrder} className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping */}
          <section className="card-surface rounded-xl p-5">
            <h2 className="font-semibold mb-4">Shipping address</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Input label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required placeholder="+8801XXXXXXXXX" />
              <Input className="sm:col-span-2" label="Street address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
              <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Input label="Area / Thana" value={form.area} onChange={(v) => setForm({ ...form, area: v })} required />
              <Input label="Postcode" value={form.postcode} onChange={(v) => setForm({ ...form, postcode: v })} />
            </div>
          </section>

          {/* Payment */}
          <section className="card-surface rounded-xl p-5">
            <h2 className="font-semibold mb-1">Payment method</h2>
            <p className="text-xs text-muted-foreground mb-4">All transactions are secured with 256-bit SSL encryption.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <PayOption id="bkash" active={method === "bkash"} onClick={() => setMethod("bkash")} label="bKash" desc="Pay from your bKash wallet" swatch="#e2136e" mono="bKash" />
              <PayOption id="nagad" active={method === "nagad"} onClick={() => setMethod("nagad")} label="Nagad" desc="Fast mobile financial service" swatch="#ec1c24" mono="Nagad" />
              <PayOption id="sslcommerz" active={method === "sslcommerz"} onClick={() => setMethod("sslcommerz")} label="SSLCommerz" desc="Cards, banking, wallets" swatch="#1e3a8a" mono="SSL" />
              <PayOption id="cod" active={method === "cod"} onClick={() => setMethod("cod")} label="Cash on Delivery" desc="Pay when you receive" swatch="#059669" mono="COD" />
            </div>

            {/* Method-specific UI */}
            <div className="mt-5 border-t border-border pt-5">
              {method === "bkash" && <PayForm accent="#e2136e" title="bKash payment" numberLabel="bKash wallet number" pinLabel="PIN" />}
              {method === "nagad" && <PayForm accent="#ec1c24" title="Nagad payment" numberLabel="Nagad account number" pinLabel="PIN" />}
              {method === "sslcommerz" && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">SSLCommerz secure gateway</div>
                  <p className="text-xs text-muted-foreground">You'll be redirected to SSLCommerz to complete payment via card, mobile banking, or internet banking.</p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
                    {["VISA", "Mastercard", "Amex", "DBBL", "City Bank", "Rocket", "Upay"].map((b) => (
                      <span key={b} className="px-2.5 py-1 rounded border border-border bg-muted/40">{b}</span>
                    ))}
                  </div>
                </div>
              )}
              {method === "cod" && (
                <p className="text-sm text-muted-foreground">Pay <span className="font-semibold text-foreground">৳{grand.toLocaleString()}</span> in cash when your order is delivered. Available across Bangladesh.</p>
              )}
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="card-surface rounded-xl p-5 sticky top-24">
            <h2 className="font-semibold mb-4">Order summary</h2>
            <ul className="space-y-2 max-h-64 overflow-auto mb-4 pr-1">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground line-clamp-1">{i.qty}× {i.name}</span>
                  <span className="shrink-0">৳{(i.price * i.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-3 space-y-1.5 text-sm">
              <Row label="Subtotal" value={`৳${subtotal.toLocaleString()}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `৳${shipping}`} />
              <Row label="VAT" value={`৳${tax.toLocaleString()}`} />
              <div className="border-t border-border my-2" />
              <Row label={<span className="font-semibold text-foreground">Total</span>} value={<span className="font-bold text-lg">৳{grand.toLocaleString()}</span>} />
            </div>
            <button type="submit" disabled={busy} className="mt-5 w-full h-11 grid place-items-center rounded-lg bg-cta text-white font-semibold hover:bg-cta/90 transition-colors disabled:opacity-60">
              {busy ? <Loader2 className="size-4 animate-spin" /> : `Place order · ৳${grand.toLocaleString()}`}
            </button>
            <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5"><Shield className="size-3" /> Payment info is encrypted and never stored.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required, placeholder, className }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-medium text-muted-foreground mb-1 block">{label}{required && " *"}</span>
      <input type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function PayOption({ active, onClick, label, desc, swatch, mono }: { id: string; active: boolean; onClick: () => void; label: string; desc: string; swatch: string; mono: string }) {
  return (
    <button type="button" onClick={onClick} className={`text-left p-4 rounded-lg border-2 transition-all ${active ? "border-electric bg-electric/5" : "border-border hover:border-electric/40"}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center text-white font-bold text-xs rounded-md size-9" style={{ backgroundColor: swatch }}>{mono.slice(0, 3)}</span>
          <span className="font-semibold text-sm">{label}</span>
        </div>
        {active && <span className="size-5 rounded-full bg-electric text-navy-deep grid place-items-center"><Check className="size-3" strokeWidth={3} /></span>}
      </div>
      <p className="text-xs text-muted-foreground ml-11">{desc}</p>
    </button>
  );
}

function PayForm({ accent, title, numberLabel, pinLabel }: { accent: string; title: string; numberLabel: string; pinLabel: string }) {
  return (
    <div>
      <div className="text-sm font-medium mb-3" style={{ color: accent }}>{title}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground mb-1 block">{numberLabel}</span>
          <input inputMode="numeric" placeholder="01XXXXXXXXX" className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground mb-1 block">{pinLabel}</span>
          <input type="password" inputMode="numeric" maxLength={5} placeholder="•••••" className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">A verification code will be sent to your registered number.</p>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
