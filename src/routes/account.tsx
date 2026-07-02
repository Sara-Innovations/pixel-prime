import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Package, User as UserIcon, MapPin, LogOut, Heart, CreditCard, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — M.A Computer" }] }),
  component: AccountPage,
});

type Tab = "overview" | "orders" | "profile" | "addresses" | "wishlist" | "payments";

interface OrderRow {
  id: string;
  total: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  items: Array<{ name: string; qty: number; price: number }>;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

function AccountPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", avatar_url: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [loading, user, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setOrders(data as unknown as OrderRow[]);
    });
    supabase.from("profiles").select("full_name, phone, avatar_url").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile(data as Profile);
    });
  }, [user]);

  if (loading || !user) {
    return <div className="min-h-[60vh] grid place-items-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/" });
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    const { error } = await supabase.from("profiles").upsert({ id: user.id, ...profile });
    setSavingProfile(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  };

  const tabs: Array<{ id: Tab; label: string; icon: typeof UserIcon }> = [
    { id: "overview", label: "Overview", icon: UserIcon },
    { id: "orders", label: "Orders", icon: Package },
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <div className="mb-6 flex items-center gap-4">
        <div className="size-14 rounded-full bg-gradient-to-br from-electric to-electric-glow grid place-items-center text-navy-deep font-bold text-lg">
          {(profile.full_name || user.email || "?").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-display font-bold truncate">{profile.full_name || "Welcome"}</h1>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav className="card-surface rounded-xl p-2 flex lg:flex-col overflow-x-auto lg:overflow-visible">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`}>
                <t.icon className="size-4" /> {t.label}
              </button>
            ))}
            <button onClick={signOut} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-cta hover:bg-cta/10 transition-colors">
              <LogOut className="size-4" /> Sign out
            </button>
          </nav>
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {tab === "overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <Stat label="Orders" value={orders.length} />
                <Stat label="In transit" value={orders.filter(o => o.status === "shipped").length} />
                <Stat label="Total spent" value={`৳${orders.reduce((n, o) => n + Number(o.total), 0).toLocaleString()}`} />
              </div>
              <RecentOrders orders={orders.slice(0, 3)} />
            </>
          )}

          {tab === "orders" && <RecentOrders orders={orders} full />}

          {tab === "profile" && (
            <form onSubmit={saveProfile} className="card-surface rounded-xl p-5 space-y-4">
              <h2 className="font-semibold">Profile details</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground mb-1 block">Full name</span>
                  <input value={profile.full_name ?? ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground mb-1 block">Phone</span>
                  <input value={profile.phone ?? ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-medium text-muted-foreground mb-1 block">Email</span>
                  <input value={user.email ?? ""} disabled className="w-full h-10 px-3 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground" />
                </label>
              </div>
              <button type="submit" disabled={savingProfile} className="h-10 px-5 rounded-lg bg-electric text-navy-deep font-semibold text-sm hover:bg-electric-glow disabled:opacity-60">
                {savingProfile ? "Saving…" : "Save changes"}
              </button>
            </form>
          )}

          {tab === "addresses" && <EmptyState icon={MapPin} title="No saved addresses" desc="Addresses you use at checkout will appear here." />}
          {tab === "wishlist" && <EmptyState icon={Heart} title="Your wishlist is empty" desc="Tap the heart icon on any product to save it." />}
          {tab === "payments" && <EmptyState icon={CreditCard} title="No saved payment methods" desc="Add a card at checkout to save it for later." />}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card-surface rounded-xl p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">{label}</div>
      <div className="text-2xl font-display font-bold">{value}</div>
    </div>
  );
}

function RecentOrders({ orders, full }: { orders: OrderRow[]; full?: boolean }) {
  if (orders.length === 0) return <EmptyState icon={Package} title="No orders yet" desc="Your order history will appear here after your first purchase." />;
  return (
    <div className="card-surface rounded-xl">
      <div className="p-5 border-b border-border font-semibold">{full ? "All orders" : "Recent orders"}</div>
      <ul className="divide-y divide-border">
        {orders.map((o) => (
          <li key={o.id} className="p-5 flex flex-wrap gap-3 items-center justify-between">
            <div className="min-w-0">
              <div className="font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8)}</div>
              <div className="font-medium text-sm">{o.items.length} item{o.items.length !== 1 ? "s" : ""} · {new Date(o.created_at).toLocaleDateString()}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">{o.items.map(i => i.name).join(", ")}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${o.status === "paid" ? "bg-emerald-500/15 text-emerald-500" : o.status === "shipped" ? "bg-electric/15 text-electric" : "bg-muted text-muted-foreground"}`}>{o.status}</span>
              <span className="font-semibold">৳{Number(o.total).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: typeof Package; title: string; desc: string }) {
  return (
    <div className="card-surface rounded-xl p-10 text-center">
      <div className="size-14 rounded-full bg-muted grid place-items-center mx-auto mb-3"><Icon className="size-6 text-muted-foreground" /></div>
      <div className="font-semibold mb-1">{title}</div>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">{desc}</p>
    </div>
  );
}
