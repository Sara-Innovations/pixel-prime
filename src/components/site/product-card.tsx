import { Heart, GitCompare, Star, ShoppingCart } from "lucide-react";
import { productImage } from "@/lib/product-images";
import { useCart } from "@/lib/cart-store";

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
  image?: string;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const save = product.oldPrice ? product.oldPrice - product.price : 0;
  const img = product.image ?? productImage(product.id, 400);
  const add = useCart((s) => s.add);

  return (
    <div className="group card-surface rounded-xl overflow-hidden flex flex-col hover:border-electric/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={img}
          alt={`${product.brand} ${product.name}`}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && (
            <span className="bg-cta text-white text-[10px] font-bold px-2 py-1 rounded">
              −{product.discount}%
            </span>
          )}
          {product.badge && (
            <span
              className={`text-[10px] font-bold px-2 py-1 rounded ${
                product.badge === "HOT"
                  ? "bg-electric text-navy-deep"
                  : product.badge === "NEW"
                    ? "bg-foreground text-background"
                    : "bg-cta text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
          <button
            aria-label="Add to wishlist"
            className="size-8 rounded-lg bg-background/85 backdrop-blur-sm hover:bg-electric hover:text-navy-deep grid place-items-center text-foreground transition-colors border border-border"
          >
            <Heart className="size-4" />
          </button>
          <button
            aria-label="Compare product"
            className="size-8 rounded-lg bg-background/85 backdrop-blur-sm hover:bg-electric hover:text-navy-deep grid place-items-center text-foreground transition-colors border border-border"
          >
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
            <span
              key={s}
              className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
          <div className="flex text-cta">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${i < Math.round(product.rating) ? "fill-cta" : "opacity-30"}`}
              />
            ))}
          </div>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <div className="text-lg font-bold text-foreground font-display">
              ৳{product.price.toLocaleString()}
            </div>
            {product.oldPrice && (
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-muted-foreground line-through">
                  ৳{product.oldPrice.toLocaleString()}
                </span>
                <span className="text-success font-semibold">Save ৳{save}</span>
              </div>
            )}
          </div>
          <button
            onClick={() =>
              add({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: img,
              })
            }
            aria-label={`Add ${product.name} to cart`}
            className="inline-flex items-center gap-1 text-xs font-semibold bg-electric text-navy-deep px-3 py-2 rounded-lg hover:bg-electric-glow transition-colors"
          >
            <ShoppingCart className="size-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card-surface rounded-xl overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 bg-muted animate-pulse rounded" />
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-6 w-20 bg-muted animate-pulse rounded mt-3" />
      </div>
    </div>
  );
}
