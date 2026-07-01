import { createFileRoute } from "@tanstack/react-router";
import { ProductCard, type Product } from "@/components/site/product-card";
import { Countdown } from "@/components/site/countdown";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Flash Sales — NovaCore" },
      { name: "description", content: "Today's best deals on GPUs, CPUs, laptops, monitors and gaming gear. Flash sales updated hourly." },
    ],
  }),
  component: Deals,
});

const deals: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `d-${i}`,
  brand: ["Samsung", "Corsair", "ASUS", "MSI", "AMD", "Razer", "Logitech", "NVIDIA"][i],
  name: [
    "990 Pro 2TB NVMe SSD",
    "K70 RGB TKL Keyboard",
    "ROG Strix RTX 4070 Ti",
    "MEG 1300W Platinum PSU",
    "Ryzen 9 7950X CPU",
    "Blade 16 Gaming Laptop",
    "MX Master 3S Mouse",
    "RTX 4090 Founders",
  ][i],
  specs: [["7450 MB/s"], ["MX Speed"], ["12GB"], ["ATX 3.1"], ["16C/32T"], ["RTX 4080"], ["8K DPI"], ["24GB"]][i],
  price: [169, 129, 829, 289, 549, 3499, 99, 1799][i],
  oldPrice: [209, 159, 949, 349, 699, 3899, 119, 1999][i],
  rating: 4.7,
  reviews: 400 + i * 120,
  discount: [19, 19, 13, 17, 21, 10, 17, 10][i],
  badge: i === 0 ? "DEAL" : undefined,
}));

function Deals() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cta text-xs font-bold uppercase tracking-widest mb-2">
            <Zap className="size-4 fill-cta" /> Limited time
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Today's deals</h1>
          <p className="text-muted-foreground mt-2">Fresh drops every hour · Free shipping on all deals</p>
        </div>
        <Countdown targetHours={4} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {deals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
