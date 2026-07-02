import { Twitter, Youtube, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/site/logo";

const cols = [
  {
    title: "Shop",
    links: ["Laptops", "Desktops", "Gaming PCs", "Components", "Monitors", "Peripherals"],
  },
  {
    title: "Build",
    links: ["PC Builder", "Compatibility Check", "Custom Workstations", "Bundle Offers"],
  },
  {
    title: "Support",
    links: ["Track Order", "Warranty", "Returns", "EMI Calculator", "Contact"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Stores", "Blog", "Press"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid gap-10 lg:grid-cols-12 mb-12">
          <div className="lg:col-span-4">
            <div className="mb-5"><Logo /></div>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Bangladesh's trusted destination for laptops, components and custom PC builds. Expertly assembled, warranty backed.
            </p>
            <div className="flex gap-2">
              {[Twitter, Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="size-9 grid place-items-center rounded-lg border border-border hover:border-electric hover:text-electric transition-colors">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">{col.title}</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-electric transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} M.A Computer. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
