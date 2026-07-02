import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, Wrench, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

type Item = { to: string; label: string; icon: typeof Home; badge?: boolean };
const items: Item[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Shop", icon: LayoutGrid },
  { to: "/pc-builder", label: "Builder", icon: Wrench },
  { to: "/cart", label: "Cart", icon: ShoppingCart, badge: true },
  { to: "/account", label: "Account", icon: User },
];

export function MobileTabBar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <nav
      aria-label="Mobile primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
          return (
            <li key={it.to}>
              <Link
                to={it.to as "/" | "/products" | "/pc-builder" | "/cart" | "/account"}
                className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-electric" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={it.label}
              >
                <span className="relative">
                  <it.icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                  {it.badge && count > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 grid place-items-center bg-cta text-[9px] font-bold text-white rounded-full">
                      {count}
                    </span>
                  )}
                </span>
                <span>{it.label}</span>
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-electric rounded-b" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
