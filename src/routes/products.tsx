import { createFileRoute } from "@tanstack/react-router";
import { ProductCard, type Product } from "@/components/site/product-card";
import { SlidersHorizontal, Grid3x3, List, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Computers, Components & Electronics — NovaCore" },
      { name: "description", content: "Browse laptops, GPUs, CPUs, monitors, storage and peripherals. Filter by brand, spec, and price." },
    ],
  }),
  component: ProductsPage,
});

const products: Product[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `p-${i}`,
  brand: ["ASUS", "MSI", "NVIDIA", "AMD", "Intel", "Corsair"][i % 6],
  name: [
    "ROG Strix RTX 4070 Ti 12GB",
    "MPG Z790 Carbon WiFi DDR5",
    "GeForce RTX 4090 24GB",
    "Ryzen 7 7800X3D 8-Core CPU",
    "Core i9-14900K 24-Core CPU",
    "Vengeance RGB 32GB DDR5-6000",
  ][i % 6],
  specs: [["12GB", "DLSS 3"], ["LGA1700", "Wi-Fi 7"], ["24GB", "AV1"], ["AM5", "5.0GHz"], ["LGA1700", "6GHz"], ["2x16GB", "CL36"]][i % 6],
  price: [829, 499, 1799, 449, 599, 129][i % 6],
  oldPrice: [949, 599, undefined, 499, 649, 159][i % 6],
  rating: 4.5 + ((i % 5) * 0.1),
  reviews: 100 + i * 37,
  discount: [13, 17, undefined, 10, 8, 19][i % 6],
}));

function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-2">Home / Components / Graphics Cards</div>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Graphics Cards</h1>
        <p className="text-muted-foreground mt-1">180+ products · from GTX 1650 to RTX 4090</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card-surface rounded-xl p-5 sticky top-32 space-y-6">
            <FilterGroup title="Brand" options={["NVIDIA", "AMD", "Intel Arc", "ASUS", "MSI", "Gigabyte"]} />
            <FilterGroup title="GPU Memory" options={["8GB", "12GB", "16GB", "24GB"]} />
            <FilterGroup title="GPU Series" options={["RTX 40 Super", "RTX 40", "RTX 30", "RX 7000"]} />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Price</h4>
              <div className="flex gap-2">
                <input placeholder="Min" className="w-full bg-navy-deep border border-white/10 rounded px-2 h-8 text-xs" />
                <input placeholder="Max" className="w-full bg-navy-deep border border-white/10 rounded px-2 h-8 text-xs" />
              </div>
            </div>
            <FilterGroup title="Availability" options={["In stock", "Pre-order"]} />
            <FilterGroup title="Rating" options={["4★ & up", "3★ & up"]} />
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="card-surface rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="text-sm text-muted-foreground">Showing <span className="text-foreground font-semibold">1–12</span> of 180</div>
            <div className="flex items-center gap-2">
              <button className="lg:hidden inline-flex items-center gap-1.5 text-xs font-semibold px-3 h-8 rounded-md border border-white/10 hover:bg-white/5">
                <SlidersHorizontal className="size-3.5" /> Filters
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 h-8 rounded-md border border-white/10 hover:bg-white/5">
                Sort: Popular <ChevronDown className="size-3.5" />
              </button>
              <div className="flex border border-white/10 rounded-md overflow-hidden">
                <button className="size-8 grid place-items-center bg-electric text-navy-deep"><Grid3x3 className="size-4" /></button>
                <button className="size-8 grid place-items-center hover:bg-white/5"><List className="size-4" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest mb-3">{title}</h4>
      <ul className="space-y-2 text-sm">
        {options.map((o) => (
          <li key={o} className="flex items-center gap-2 cursor-pointer text-foreground/80 hover:text-foreground">
            <input type="checkbox" className="accent-electric" />
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
