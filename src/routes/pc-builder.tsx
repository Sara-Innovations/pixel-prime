import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, HardDrive, MemoryStick, Fan, Box, Zap, Monitor, Keyboard, Mouse, Headphones, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pc-builder")({
  head: () => ({
    meta: [
      { title: "Custom PC Builder — M.A Computer" },
      { name: "description", content: "Build your custom gaming or workstation PC with real-time compatibility checks, wattage estimator, and expert assembly." },
    ],
  }),
  component: PCBuilder,
});

const steps = [
  { slot: "processor", icon: Cpu, label: "Processor", selected: "AMD Ryzen 9 7950X", price: 54900 },
  { slot: "motherboard", icon: Box, label: "Motherboard", selected: "ASUS ROG X670E-E", price: 49900 },
  { slot: "memory", icon: MemoryStick, label: "Memory", selected: "G.Skill 64GB DDR5-6000", price: 24900 },
  { slot: "graphics", icon: Zap, label: "Graphics Card", selected: "RTX 4080 Super 16GB", price: 129000 },
  { slot: "storage", icon: HardDrive, label: "Primary Storage", selected: "Samsung 990 Pro 2TB", price: 16900 },
  { slot: "storage", icon: HardDrive, label: "Secondary Storage", selected: null, price: 0 },
  { slot: "psu", icon: Zap, label: "Power Supply", selected: "Corsair RM1000x", price: 21900 },
  { slot: "case", icon: Box, label: "Case", selected: "Lian Li O11 Dynamic EVO", price: 17900 },
  { slot: "cooler", icon: Fan, label: "CPU Cooler", selected: "NZXT Kraken 360 AIO", price: 25900 },
  { slot: "cooler", icon: Fan, label: "Case Fans", selected: null, price: 0 },
  { slot: "monitor", icon: Monitor, label: "Monitor", selected: null, price: 0 },
  { slot: "keyboard", icon: Keyboard, label: "Keyboard", selected: null, price: 0 },
  { slot: "mouse", icon: Mouse, label: "Mouse", selected: null, price: 0 },
  { slot: "headset", icon: Headphones, label: "Headset", selected: null, price: 0 },
] as const;

function PCBuilder() {
  const total = steps.reduce((n, s) => n + s.price, 0);
  const picked = steps.filter((s) => s.selected).length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
      <div className="mb-8">
        <div className="text-xs text-muted-foreground mb-2">Home / PC Builder</div>
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Custom PC Builder</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Pick components in any order — we check compatibility, wattage, and clearances in real time.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="card-surface rounded-xl p-4 flex items-center gap-4 hover:border-electric/40 transition-colors">
              <div className="size-11 rounded-lg bg-white/5 grid place-items-center shrink-0">
                <s.icon className="size-5 text-electric" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step {i + 1}</div>
                <div className="font-semibold truncate">{s.label}</div>
                {s.selected && <div className="text-xs text-muted-foreground truncate">{s.selected}</div>}
              </div>
              <div className="text-right shrink-0">
                {s.selected ? (
                  <>
                    <div className="text-sm font-bold font-display">৳{s.price.toLocaleString()}</div>
                    <Link to="/pc-builder/select/$slot" params={{ slot: s.slot }} className="text-xs text-electric hover:underline">Change</Link>
                  </>
                ) : (
                  <Link to="/pc-builder/select/$slot" params={{ slot: s.slot }} className="inline-flex items-center gap-1.5 bg-electric/10 text-electric hover:bg-electric hover:text-navy-deep text-xs font-semibold px-3 h-8 rounded-lg transition-colors">
                    Choose <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4">
          <div className="card-surface rounded-2xl p-6 sticky top-32">
            <h3 className="text-lg font-display font-bold mb-4">Build summary</h3>

            <div className="space-y-3 mb-6">
              <Row label="Components picked" value={`${picked} / ${steps.length}`} />
              <Row label="Estimated wattage" value="820 W" />
              <Row label="Recommended PSU" value="1000 W+" />
              <Row label="Estimated FPS (1440p Ultra)" value="180+" hi />
            </div>

            <div className="rounded-lg bg-success/10 border border-success/30 p-3 flex items-center gap-2 text-sm text-success mb-6">
              <Check className="size-4" /> All selected parts are compatible
            </div>

            <div className="border-t border-border pt-4 flex items-end justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-3xl font-bold font-display">৳{total.toLocaleString()}</span>
            </div>

            <button className="w-full bg-cta hover:bg-cta/90 text-white font-semibold py-3 rounded-lg transition-colors mb-2">
              Add build to cart
            </button>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button className="border border-border rounded-md py-2 hover:bg-muted">Save</button>
              <button className="border border-border rounded-md py-2 hover:bg-muted">Share</button>
              <button className="border border-border rounded-md py-2 hover:bg-muted">Export</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, hi }: { label: string; value: string; hi?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${hi ? "text-electric" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
