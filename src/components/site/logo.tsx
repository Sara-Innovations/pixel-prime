import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "size-8" : size === "lg" ? "size-11" : "size-9";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base sm:text-lg";
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="M.A Computer home">
      <div
        className={`${dim} rounded-lg bg-gradient-to-br from-electric to-electric-glow grid place-items-center shadow-[var(--shadow-glow)]`}
      >
        <span className="font-display font-black text-navy-deep tracking-tighter text-xs">M.A</span>
      </div>
      <span className={`font-display font-bold ${text} tracking-tight text-foreground`}>
        M.A<span className="text-electric"> Computer</span>
      </span>
    </Link>
  );
}
