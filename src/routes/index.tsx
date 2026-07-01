import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Laptop, Monitor, Cpu, HardDrive, Keyboard, Mouse, Headphones,
  MemoryStick, Fan, Router, Gamepad2, Wrench, ArrowRight, Zap, Shield, Truck, Sparkles,
} from "lucide-react";
import { ProductCard, type Product } from "@/components/site/product-card";
import { Countdown } from "@/components/site/countdown";

export const Route = createFileRoute("/")({
  component: Home,
});

const categories = [
  { name: "Laptops", icon: Laptop, count: "480+" },
  { name: "Desktops", icon: Monitor, count: "210+" },
  { name: "Gaming PC", icon: Gamepad2, count: "95+" },
  { name: "Processors", icon: Cpu, count: "320+" },
  { name: "Graphics", icon: Sparkles, count: "180+" },
  { name: "Memory", icon: MemoryStick, count: "260+" },
  { name: "Storage", icon: HardDrive, count: "410+" },
  { name: "Cooling", icon: Fan, count: "170+" },
  { name: "Keyboards", icon: Keyboard, count: "220+" },
  { name: "Mice", icon: Mouse, count: "310+" },
  { name: "Audio", icon: Headphones, count: "290+" },
  { name: "Networking", icon: Router, count: "140+" },
];

const brands = ["ASUS", "MSI", "Gigabyte", "Intel", "AMD", "NVIDIA", "Corsair", "Samsung", "HP", "Dell", "Lenovo", "Razer"];

const flashDeals: Product[] = [
  { id: "1", brand: "AMD", name: "Ryzen 9 7950X 16-Core Desktop Processor", specs: ["AM5", "4.5GHz", "170W"], price: 549, oldPrice: 699, rating: 4.8, reviews: 1240, discount: 21, badge: "HOT" },
  { id: "2", brand: "ASUS", name: "ROG Strix GeForce RTX 4070 Ti OC Edition", specs: ["12GB GDDR6X", "DLSS 3", "PCIe 4.0"], price: 829, oldPrice: 949, rating: 4.7, reviews: 892, discount: 13 },
  { id: "3", brand: "Samsung", name: "990 Pro 2TB NVMe M.2 SSD PCIe Gen4", specs: ["7450 MB/s", "M.2 2280", "PCIe 4.0"], price: 169, oldPrice: 209, rating: 4.9, reviews: 3140, discount: 19, badge: "DEAL" },
  { id: "4", brand: "Corsair", name: "K70 RGB TKL Mechanical Gaming Keyboard", specs: ["MX Speed", "PBT Caps", "USB-C"], price: 129, oldPrice: 159, rating: 4.6, reviews: 654, discount: 19 },
];

const featured: Product[] = [
  { id: "5", brand: "Razer", name: "Blade 16 Gaming Laptop RTX 4080", specs: ["i9-14900HX", "32GB", "2TB"], price: 3499, rating: 4.8, reviews: 214, badge: "NEW" },
  { id: "6", brand: "LG", name: "UltraGear 32\" OLED 240Hz Monitor", specs: ["4K OLED", "0.03ms", "G-Sync"], price: 1299, oldPrice: 1499, rating: 4.9, reviews: 421, discount: 13 },
  { id: "7", brand: "NVIDIA", name: "GeForce RTX 4090 Founders Edition", specs: ["24GB GDDR6X", "DLSS 3.5", "AV1"], price: 1799, rating: 5.0, reviews: 1120, badge: "HOT" },
  { id: "8", brand: "Logitech", name: "MX Master 3S Wireless Performance Mouse", specs: ["8K DPI", "Silent", "Multi-Device"], price: 99, oldPrice: 119, rating: 4.8, reviews: 5230, discount: 17 },
];

const trending: Product[] = [
  { id: "9", brand: "Intel", name: "Core i7-14700K 20-Core Processor", specs: ["LGA1700", "5.6GHz", "125W"], price: 419, rating: 4.7, reviews: 780 },
  { id: "10", brand: "Gigabyte", name: "AORUS Z790 Master Motherboard DDR5", specs: ["LGA1700", "DDR5", "Wi-Fi 7"], price: 499, oldPrice: 599, rating: 4.6, reviews: 234, discount: 17 },
  { id: "11", brand: "Kingston", name: "FURY Beast 32GB DDR5-6000 RGB Kit", specs: ["2x16GB", "CL36", "RGB"], price: 129, oldPrice: 159, rating: 4.8, reviews: 1420, discount: 19, badge: "DEAL" },
  { id: "12", brand: "MSI", name: "MEG Ai1300P PCIE5 1300W PSU Platinum", specs: ["80+ Plat", "Modular", "ATX 3.1"], price: 289, rating: 4.9, reviews: 340, badge: "NEW" },
];

function Home() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Main hero */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 min-h-[420px] p-8 lg:p-12 flex flex-col justify-end"
              style={{ background: "radial-gradient(120% 90% at 80% 20%, oklch(0.45 0.19 245 / 0.5), transparent 60%), linear-gradient(135deg, oklch(0.22 0.06 260), oklch(0.14 0.04 260))" }}>
              <div className="absolute top-8 right-8 hidden md:block">
                <div className="size-64 rounded-full bg-gradient-to-br from-electric/40 to-transparent blur-3xl" />
              </div>
              <div className="absolute top-10 right-10 hidden md:grid place-items-center size-56 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md">
                <div className="text-center">
                  <Sparkles className="size-10 text-electric mx-auto mb-3" />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">RTX 40 SUPER</div>
                </div>
              </div>

              <div className="relative max-w-xl">
                <div className="inline-flex items-center gap-2 text-electric text-xs font-semibold tracking-widest uppercase mb-5 bg-electric/10 border border-electric/20 rounded-full px-3 py-1.5">
                  <span className="size-1.5 bg-electric rounded-full animate-pulse-dot" />
                  New Series Available
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.05] tracking-tight mb-5">
                  Elite Performance,<br />
                  <span className="text-gradient-electric">Zero Compromise.</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg">
                  Configure your dream workstation with the latest RTX 40 Super series. Expert build, thermal-tuned, next-day shipping.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/pc-builder" className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-cta/20">
                    Configure Now <ArrowRight className="size-4" />
                  </Link>
                  <Link to="/products" className="inline-flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-foreground font-semibold px-6 py-3 rounded-lg transition-colors">
                    Browse Catalog
                  </Link>
                </div>
              </div>
            </div>

            {/* Side promos */}
            <div className="lg:col-span-4 grid gap-6">
              <div className="card-surface rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[200px]"
                style={{ background: "linear-gradient(135deg, oklch(0.28 0.13 245), oklch(0.20 0.05 260))" }}>
                <div>
                  <span className="text-[10px] font-bold text-electric uppercase tracking-widest">Flash Sale</span>
                  <h3 className="text-xl font-display font-semibold mt-2 leading-tight">RTX 4080 Super<br />in stock now</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold font-display">$999</div>
                    <div className="text-xs text-muted-foreground line-through">$1,199</div>
                  </div>
                  <ArrowRight className="size-5 text-electric" />
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-electric text-navy-deep flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                <Wrench className="absolute -right-4 -bottom-4 size-32 opacity-10" strokeWidth={1} />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">PC Builder</span>
                  <h3 className="text-xl font-display font-semibold mt-2 leading-tight">Build your custom rig in minutes</h3>
                </div>
                <Link to="/pc-builder" className="inline-flex w-fit items-center gap-2 bg-navy-deep text-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy transition-colors">
                  Start Building <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Truck, label: "Free shipping", sub: "Orders over $99" },
              { icon: Shield, label: "3-year warranty", sub: "On custom builds" },
              { icon: Zap, label: "Same-day dispatch", sub: "Order by 3pm" },
              { icon: Wrench, label: "Expert assembly", sub: "Tested & tuned" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                <div className="size-10 rounded-lg bg-electric/10 grid place-items-center text-electric shrink-0">
                  <t.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{t.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <SectionHeader
          title="Shop by category"
          subtitle="20,000+ components across every category"
          cta={{ href: "/products", label: "View all" }}
        />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/products"
              className="group card-surface rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-electric/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="size-12 rounded-xl bg-white/5 grid place-items-center text-electric group-hover:bg-electric group-hover:text-navy-deep transition-colors">
                <c.icon className="size-6" />
              </div>
              <div className="text-sm font-semibold">{c.name}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{c.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="border-y border-white/8 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-cta text-xs font-bold uppercase tracking-widest mb-2">
                <Zap className="size-4 fill-cta" /> Flash Sale · Today only
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Live hardware drops</h2>
            </div>
            <div className="flex items-center gap-4">
              <Countdown targetHours={5} />
              <Link to="/deals" className="text-sm font-semibold text-electric hover:underline hidden md:inline-flex items-center gap-1">
                All deals <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {flashDeals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-14 border-b border-white/8">
        <div className="text-center mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Trusted Partners</div>
          <h2 className="text-2xl font-display font-semibold">Shop by brand</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {brands.map((b) => (
            <a key={b} href="#" className="card-surface rounded-xl h-16 grid place-items-center font-display font-bold text-lg tracking-tight text-foreground/60 hover:text-electric hover:border-electric/40 transition-colors">
              {b}
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <SectionHeader title="Featured hardware" subtitle="Hand-picked gear our engineers actually recommend" cta={{ href: "/products", label: "View all" }} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* PC BUILDER PROMO */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="rounded-3xl overflow-hidden border border-electric/20 relative"
          style={{ background: "radial-gradient(80% 80% at 20% 30%, oklch(0.35 0.18 245 / 0.5), transparent 60%), linear-gradient(135deg, oklch(0.22 0.06 260), oklch(0.14 0.04 260))" }}>
          <div className="grid lg:grid-cols-2 gap-10 items-center p-8 md:p-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/30 text-electric text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <Wrench className="size-3.5" /> Custom PC Builder
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.05] tracking-tight mb-5">
                Forge your <span className="text-gradient-electric">perfect build.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg">
                Real-time compatibility checks, wattage estimation, and BIOS-verified assembly. From first pick to shipped-and-tested in 72 hours.
              </p>

              <ul className="grid grid-cols-2 gap-3 mb-8 text-sm">
                {["Compatibility engine", "Wattage estimator", "Thermal analysis", "BIOS pre-flashed", "Cable managed", "Stress tested"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground/80">
                    <span className="size-1.5 rounded-full bg-electric" /> {f}
                  </li>
                ))}
              </ul>

              <Link to="/pc-builder" className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-cta/20">
                Start building <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "CPU", value: "Ryzen 9 7950X" },
                { label: "GPU", value: "RTX 4080 Super" },
                { label: "RAM", value: "64GB DDR5" },
                { label: "Storage", value: "4TB NVMe" },
                { label: "Cooling", value: "360mm AIO" },
                { label: "PSU", value: "1000W Platinum" },
              ].map((part, i) => (
                <div key={part.label} className="card-surface rounded-xl p-4 hover:border-electric/40 transition-colors" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="text-[10px] uppercase tracking-widest text-electric font-bold">{part.label}</div>
                  <div className="text-sm font-semibold mt-1">{part.value}</div>
                  <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-electric to-electric-glow" style={{ width: `${60 + i * 6}%` }} />
                  </div>
                </div>
              ))}
              <div className="col-span-2 flex items-center justify-between card-surface rounded-xl p-4 border-electric/30">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Estimated Total</div>
                  <div className="text-2xl font-bold font-display">$4,299</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-success">Compatibility</div>
                  <div className="text-lg font-bold text-success">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <SectionHeader title="Trending now" subtitle="What builders are grabbing this week" cta={{ href: "/products", label: "View all" }} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* NEWS / GUIDES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <SectionHeader title="Tech news & buying guides" subtitle="Deep-dives from our lab" cta={{ href: "/", label: "Read blog" }} />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { tag: "GPU", title: "RTX 4080 Super vs 4070 Ti: is the $200 jump worth it?", read: "8 min read" },
            { tag: "Guide", title: "How to pick the right power supply in 2026", read: "5 min read" },
            { tag: "Review", title: "Ryzen 9 7950X3D: still king for creators", read: "12 min read" },
          ].map((post, i) => (
            <a key={post.title} href="#" className="group card-surface rounded-xl overflow-hidden hover:border-electric/40 transition-colors">
              <div className="aspect-[16/9] relative overflow-hidden" style={{ background: `linear-gradient(135deg, oklch(0.3 0.12 ${230 + i * 20}), oklch(0.18 0.05 260))` }}>
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-navy-deep/70 backdrop-blur-sm px-2 py-1 rounded text-electric">{post.tag}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-electric transition-colors">{post.title}</h3>
                <div className="mt-3 text-xs text-muted-foreground">{post.read}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <div className="card-surface rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">Get early access to drops.</h3>
            <p className="text-muted-foreground">Restocks on RTX 40 Super, weekly deals, and lab reviews — straight to your inbox.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 md:w-80 bg-navy-deep border border-white/10 rounded-lg px-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-electric/40 focus:border-electric/40" />
            <button className="bg-cta hover:bg-cta-hover text-white font-semibold px-6 h-11 rounded-lg transition-colors">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {cta && (
        <Link to={cta.href} className="text-sm font-semibold text-electric hover:underline inline-flex items-center gap-1">
          {cta.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
