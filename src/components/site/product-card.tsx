import { Heart, GitCompare, Star } from "lucide-react";

export interface Product {
  id: string;
  brand: string;
  name: string;
  specs: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "HOT" | "NEW" | "DEAL";
  discount?: number;
  inStock?: boolean;
  imageGradient?: string;
}

const gradientLibrary = [
  "linear-gradient(135deg, oklch(0.35 0.09 260), oklch(0.20 0.05 260))",
  "linear-gradient(135deg, oklch(0.32 0.11 250), oklch(0.18 0.06 265))",
  "linear-gradient(135deg, oklch(0.30 0.13 240), oklch(0.20 0.05 260))",
  "linear-gradient(135deg, oklch(0.34 0.10 280), oklch(0.19 0.06 260))",
];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const bg = product.imageGradient ?? gradientLibrary[index % gradientLibrary.length];
  const save = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <div className="group card-surface rounded-xl overflow-hidden flex flex-col hover:border-electric/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
      <div className="relative aspect-square overflow-hidden" style={{ background: bg }}>
        {/* fake product silhouette */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="size-32 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm grid place-items-center text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:scale-110 transition-transform duration-500">
            {product.brand.slice(0, 3)}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && (
            <span className="bg-cta text-white text-[10px] font-bold px-2 py-1 rounded">
              −{product.discount}%
            </span>
          )}
          {product.badge && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${
              product.badge === "HOT" ? "bg-electric text-navy-deep" :
              product.badge === "NEW" ? "bg-white text-navy-deep" :
              "bg-cta text-white"
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
          <button aria-label="Wishlist" className="size-8 rounded-lg bg-navy-deep/80 backdrop-blur-sm hover:bg-electric hover:text-navy-deep grid place-items-center text-foreground transition-colors">
            <Heart className="size-4" />
          </button>
          <button aria-label="Compare" className="size-8 rounded-lg bg-navy-deep/80 backdrop-blur-sm hover:bg-electric hover:text-navy-deep grid place-items-center text-foreground transition-colors">
            <GitCompare className="size-4" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
          <span className="font-semibold text-electric">{product.brand}</span>
          {product.inStock !== false && (
            <span className="text-success flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success" /> In stock
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-electric transition-colors">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-1 mt-0.5">
          {product.specs.slice(0, 3).map((s) => (
            <span key={s} className="text-[10px] font-medium text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
          <div className="flex text-cta">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-3 ${i < Math.round(product.rating) ? "fill-cta" : "opacity-30"}`} />
            ))}
          </div>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-foreground font-display">${product.price.toLocaleString()}</div>
            {product.oldPrice && (
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-muted-foreground line-through">${product.oldPrice.toLocaleString()}</span>
                <span className="text-success font-semibold">Save ${save}</span>
              </div>
            )}
          </div>
          <button className="text-xs font-semibold bg-electric text-navy-deep px-3 py-2 rounded-lg hover:bg-electric-glow transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
