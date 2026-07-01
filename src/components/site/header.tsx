import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, User, Menu, Cpu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy-deep/85 backdrop-blur-md border-b border-white/8">
      {/* Top bar */}
      <div className="hidden lg:block border-b border-white/5 text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <span>Free shipping over $99 · 3-year warranty on custom builds</span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-electric transition-colors">Track order</Link>
            <Link to="/" className="hover:text-electric transition-colors">Store locations</Link>
            <Link to="/" className="hover:text-electric transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center gap-4 lg:gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-9 rounded-lg bg-gradient-to-br from-electric to-electric-glow grid place-items-center shadow-[var(--shadow-glow)]">
            <Cpu className="size-5 text-navy-deep" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground">
            NOVA<span className="text-electric">CORE</span>
          </span>
        </Link>

        <div className="flex-1 max-w-2xl relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search laptops, GPUs, components…"
            className="w-full bg-surface/60 border border-white/8 rounded-lg pl-10 pr-16 h-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/40 focus:border-electric/40 transition"
          />
          <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-foreground/80">
          <Link to="/pc-builder" className="hover:text-electric transition-colors">PC Builder</Link>
          <Link to="/deals" className="hover:text-cta transition-colors">Deals</Link>
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <button aria-label="Account" className="size-10 grid place-items-center rounded-lg hover:bg-white/5 transition-colors">
            <User className="size-5" />
          </button>
          <button aria-label="Wishlist" className="size-10 grid place-items-center rounded-lg hover:bg-white/5 transition-colors">
            <Heart className="size-5" />
          </button>
          <button aria-label="Cart" className="relative size-10 grid place-items-center rounded-lg hover:bg-white/5 transition-colors">
            <ShoppingCart className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-4 grid place-items-center bg-cta text-[10px] font-bold text-white rounded-full">3</span>
          </button>
          <button aria-label="Menu" className="lg:hidden size-10 grid place-items-center rounded-lg hover:bg-white/5 transition-colors">
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Category strip */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex gap-1 overflow-x-auto no-scrollbar text-sm whitespace-nowrap">
          {[
            "Laptops", "Desktops", "Gaming PC", "Components", "Monitors",
            "Graphics Cards", "Processors", "Storage", "Peripherals", "Networking", "Office",
          ].map((c, i) => (
            <Link
              key={c}
              to="/products"
              className={`px-3 py-3 font-medium transition-colors ${i === 0 ? "text-electric border-b-2 border-electric" : "text-foreground/70 hover:text-foreground border-b-2 border-transparent"}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
