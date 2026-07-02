import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Logo } from "@/components/site/logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";

const categories = [
  "Laptops", "Desktops", "Gaming PC", "Components", "Monitors",
  "Graphics Cards", "Processors", "Storage", "Peripherals", "Networking", "Office",
];

export function Header() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="hidden lg:block border-b border-border text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <span>Free shipping over ৳5,000 · 3-year warranty on custom builds</span>
          <div className="flex gap-6">
            <Link to="/account" className="hover:text-electric transition-colors">Track order</Link>
            <a href="#" className="hover:text-electric transition-colors">Store locations</a>
            <a href="#" className="hover:text-electric transition-colors">Support</a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center gap-2 sm:gap-4 lg:gap-8">
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="lg:hidden size-10 grid place-items-center rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 bg-background">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="p-5 border-b border-border">
              <Logo />
            </div>
            <div className="p-5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Categories</div>
              {categories.map((c) => (
                <Link key={c} to="/products" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">
                  {c}
                </Link>
              ))}
              <div className="border-t border-border my-3" />
              <Link to="/pc-builder" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">PC Builder</Link>
              <Link to="/deals" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium text-cta">Deals</Link>
              <Link to="/account" className="block px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium">My Account</Link>
            </div>
          </SheetContent>
        </Sheet>

        <Logo />

        <div className="flex-1 max-w-2xl relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search laptops, GPUs, components…"
            className="w-full bg-muted/60 border border-border rounded-lg pl-10 pr-16 h-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-electric/40 transition"
          />
          <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-foreground/80">
          <Link to="/pc-builder" className="hover:text-electric transition-colors">PC Builder</Link>
          <Link to="/deals" className="hover:text-cta transition-colors">Deals</Link>
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <ThemeToggle />
          <Link to="/account" aria-label="Account" className="hidden sm:grid size-10 place-items-center rounded-lg hover:bg-muted transition-colors">
            <User className="size-5" />
          </Link>
          <button aria-label="Wishlist" className="hidden sm:grid size-10 place-items-center rounded-lg hover:bg-muted transition-colors">
            <Heart className="size-5" />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative size-10 grid place-items-center rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 grid place-items-center bg-cta text-[10px] font-bold text-white rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden border-t border-border px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products…"
            className="w-full bg-muted/60 border border-border rounded-lg pl-9 pr-3 h-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Category strip */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex gap-1 overflow-x-auto no-scrollbar text-sm whitespace-nowrap">
          {categories.map((c, i) => (
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
