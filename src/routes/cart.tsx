import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { productImage } from "@/lib/product-images";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — M.A Computer" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();
  const subtotal = total();
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 120;
  const tax = Math.round(subtotal * 0.05);
  const grand = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="size-20 rounded-full bg-muted grid place-items-center mx-auto mb-6">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-electric text-navy-deep font-semibold hover:bg-electric-glow transition-colors">
          Browse products <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6">Your cart <span className="text-muted-foreground text-lg">({items.length})</span></h1>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="card-surface rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center">
              <img src={it.image ?? productImage(it.id, 120)} alt={it.name} loading="lazy" className="size-20 sm:size-24 rounded-lg object-cover bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{it.brand}</div>
                <div className="font-medium text-sm sm:text-base line-clamp-2">{it.name}</div>
                <div className="text-sm sm:hidden mt-1 font-semibold">৳{(it.price * it.qty).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-1 border border-border rounded-lg">
                <button aria-label="Decrease" onClick={() => setQty(it.id, it.qty - 1)} className="size-8 grid place-items-center hover:bg-muted rounded-l-lg"><Minus className="size-3" /></button>
                <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                <button aria-label="Increase" onClick={() => setQty(it.id, it.qty + 1)} className="size-8 grid place-items-center hover:bg-muted rounded-r-lg"><Plus className="size-3" /></button>
              </div>
              <div className="hidden sm:block text-right w-24 font-semibold">৳{(it.price * it.qty).toLocaleString()}</div>
              <button aria-label="Remove" onClick={() => remove(it.id)} className="size-9 grid place-items-center rounded-lg text-muted-foreground hover:text-cta hover:bg-muted transition-colors">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4">
          <div className="card-surface rounded-xl p-5 sticky top-24">
            <h2 className="font-semibold mb-4">Order summary</h2>
            <dl className="space-y-2 text-sm">
              <Row label="Subtotal" value={`৳${subtotal.toLocaleString()}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `৳${shipping}`} />
              <Row label="VAT (5%)" value={`৳${tax.toLocaleString()}`} />
              <div className="border-t border-border my-3" />
              <Row label={<span className="font-semibold text-foreground">Total</span>} value={<span className="font-bold text-lg">৳{grand.toLocaleString()}</span>} />
            </dl>
            <Link to="/checkout" className="mt-5 w-full h-11 grid place-items-center rounded-lg bg-cta text-white font-semibold hover:bg-cta/90 transition-colors">
              Proceed to checkout
            </Link>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Shield className="size-3.5" /> Secure SSL checkout</div>
              <div className="flex items-center gap-2"><Truck className="size-3.5" /> Free shipping over ৳5,000</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
