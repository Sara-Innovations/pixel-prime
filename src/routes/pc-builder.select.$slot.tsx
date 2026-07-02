import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Star, Filter } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { productImage } from "@/lib/product-images";

export const Route = createFileRoute("/pc-builder/select/$slot")({
  head: ({ params }) => ({ meta: [{ title: `Select ${params.slot} — PC Builder` }] }),
  component: SelectSlot,
});

const CATALOG: Record<string, Array<{ id: string; brand: string; name: string; price: number; rating: number; specs: string[] }>> = {
  processor: [
    { id: "cpu-1", brand: "AMD", name: "Ryzen 9 7950X", price: 54900, rating: 4.9, specs: ["16 cores", "5.7GHz boost", "AM5"] },
    { id: "cpu-2", brand: "AMD", name: "Ryzen 7 7800X3D", price: 42500, rating: 4.9, specs: ["8 cores", "3D V-Cache", "AM5"] },
    { id: "cpu-3", brand: "Intel", name: "Core i9-14900K", price: 62000, rating: 4.7, specs: ["24 cores", "6.0GHz boost", "LGA 1700"] },
    { id: "cpu-4", brand: "Intel", name: "Core i5-14600K", price: 29500, rating: 4.8, specs: ["14 cores", "5.3GHz boost", "LGA 1700"] },
    { id: "cpu-5", brand: "AMD", name: "Ryzen 5 7600", price: 21500, rating: 4.6, specs: ["6 cores", "5.1GHz boost", "AM5"] },
  ],
  motherboard: [
    { id: "mb-1", brand: "ASUS", name: "ROG Strix X670E-E", price: 49900, rating: 4.8, specs: ["AM5", "DDR5", "PCIe 5.0"] },
    { id: "mb-2", brand: "MSI", name: "MPG Z790 Edge WiFi", price: 32500, rating: 4.7, specs: ["LGA 1700", "DDR5", "Wi-Fi 6E"] },
    { id: "mb-3", brand: "Gigabyte", name: "B650 Aorus Elite AX", price: 21900, rating: 4.6, specs: ["AM5", "DDR5", "Wi-Fi 6"] },
  ],
  memory: [
    { id: "ram-1", brand: "G.Skill", name: "Trident Z5 64GB DDR5-6000", price: 24900, rating: 4.9, specs: ["2×32GB", "CL30", "RGB"] },
    { id: "ram-2", brand: "Corsair", name: "Vengeance 32GB DDR5-5600", price: 14500, rating: 4.7, specs: ["2×16GB", "CL36"] },
    { id: "ram-3", brand: "Kingston", name: "Fury Beast 16GB DDR4-3200", price: 6900, rating: 4.6, specs: ["2×8GB", "CL16"] },
  ],
  graphics: [
    { id: "gpu-1", brand: "NVIDIA", name: "GeForce RTX 4080 Super 16GB", price: 129000, rating: 4.9, specs: ["16GB GDDR6X", "320W", "3× DP 1.4"] },
    { id: "gpu-2", brand: "NVIDIA", name: "GeForce RTX 4070 Ti 12GB", price: 89900, rating: 4.8, specs: ["12GB GDDR6X", "285W"] },
    { id: "gpu-3", brand: "AMD", name: "Radeon RX 7900 XTX 24GB", price: 105000, rating: 4.7, specs: ["24GB GDDR6", "355W"] },
  ],
  storage: [
    { id: "ssd-1", brand: "Samsung", name: "990 Pro 2TB NVMe", price: 16900, rating: 4.9, specs: ["PCIe 4.0", "7450 MB/s"] },
    { id: "ssd-2", brand: "WD", name: "Black SN850X 1TB", price: 9500, rating: 4.8, specs: ["PCIe 4.0", "7300 MB/s"] },
    { id: "ssd-3", brand: "Crucial", name: "MX500 1TB SATA", price: 6200, rating: 4.6, specs: ["SATA III", "560 MB/s"] },
  ],
  psu: [
    { id: "psu-1", brand: "Corsair", name: "RM1000x Shift 1000W", price: 21900, rating: 4.9, specs: ["80+ Gold", "Modular"] },
    { id: "psu-2", brand: "Seasonic", name: "Focus GX-850", price: 14900, rating: 4.8, specs: ["80+ Gold", "Modular"] },
  ],
  case: [
    { id: "case-1", brand: "Lian Li", name: "O11 Dynamic EVO", price: 17900, rating: 4.9, specs: ["Mid-tower", "Tempered glass"] },
    { id: "case-2", brand: "NZXT", name: "H7 Flow RGB", price: 15500, rating: 4.7, specs: ["Mid-tower", "3× RGB fans"] },
  ],
  cooler: [
    { id: "cool-1", brand: "NZXT", name: "Kraken 360 RGB AIO", price: 25900, rating: 4.9, specs: ["360mm", "LCD display"] },
    { id: "cool-2", brand: "Noctua", name: "NH-D15", price: 12500, rating: 4.9, specs: ["Air cooler", "Dual tower"] },
  ],
  monitor: [
    { id: "mon-1", brand: "LG", name: "27GP950 UltraGear 4K 144Hz", price: 78000, rating: 4.8, specs: ['27"', "4K", "144Hz IPS"] },
    { id: "mon-2", brand: "Samsung", name: 'Odyssey G7 32" 240Hz', price: 62000, rating: 4.7, specs: ['32"', "1440p", "240Hz"] },
  ],
  keyboard: [
    { id: "kb-1", brand: "Keychron", name: "Q1 Pro Wireless", price: 18900, rating: 4.8, specs: ["75%", "Hot-swap"] },
  ],
  mouse: [
    { id: "mo-1", brand: "Logitech", name: "G Pro X Superlight 2", price: 15900, rating: 4.9, specs: ["60g", "32k DPI"] },
  ],
  headset: [
    { id: "hs-1", brand: "SteelSeries", name: "Arctis Nova Pro Wireless", price: 34900, rating: 4.8, specs: ["Hi-Res", "GameDAC"] },
  ],
};

const LABELS: Record<string, string> = {
  processor: "Processor", motherboard: "Motherboard", memory: "Memory (RAM)", graphics: "Graphics Card",
  storage: "Storage", psu: "Power Supply", case: "Case", cooler: "CPU Cooler",
  monitor: "Monitor", keyboard: "Keyboard", mouse: "Mouse", headset: "Headset",
};

function SelectSlot() {
  const { slot } = useParams({ from: "/pc-builder/select/$slot" });
  const products = CATALOG[slot] ?? [];
  const label = LABELS[slot] ?? slot;
  const add = useCart((s) => s.add);
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular");
  const [brand, setBrand] = useState<string>("all");

  const brands = useMemo(() => ["all", ...Array.from(new Set(products.map((p) => p.brand)))], [products]);
  const filtered = useMemo(() => {
    let list = brand === "all" ? products : products.filter((p) => p.brand === brand);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "popular") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, brand, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <Link to="/pc-builder" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="size-4" /> Back to builder</Link>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Step · Select</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold">Choose your {label}</h1>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <Filter className="size-4 text-muted-foreground" />
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="h-9 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {brands.map((b) => <option key={b} value={b}>{b === "all" ? "All brands" : b}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card-surface rounded-xl p-10 text-center text-muted-foreground">No products in this category yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="card-surface rounded-xl p-4 flex flex-col hover:border-electric/40 transition-colors">
              <div className="aspect-[4/3] rounded-lg bg-muted overflow-hidden mb-3">
                <img src={productImage(p.id, 400)} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{p.brand}</div>
              <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{p.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Star className="size-3 fill-yellow-500 text-yellow-500" /> {p.rating}
              </div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {p.specs.map((s) => <li key={s} className="flex gap-1.5"><Check className="size-3 text-electric shrink-0 mt-0.5" /> {s}</li>)}
              </ul>
              <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                <span className="font-bold text-lg">৳{p.price.toLocaleString()}</span>
                <button
                  onClick={() => { add({ id: p.id, name: p.name, brand: p.brand, price: p.price, image: productImage(p.id, 200) }); toast.success(`Added ${p.name} to build`); }}
                  className="h-9 px-4 rounded-lg bg-electric text-navy-deep text-sm font-semibold hover:bg-electric-glow transition-colors"
                >
                  Select
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
