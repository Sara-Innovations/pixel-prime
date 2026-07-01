import { useEffect, useState } from "react";

export function Countdown({ targetHours = 6 }: { targetHours?: number }) {
  const [target] = useState(() => Date.now() + targetHours * 3600 * 1000);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, target - now);
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5 font-mono text-sm">
      {[
        { v: pad(h), l: "HRS" },
        { v: pad(m), l: "MIN" },
        { v: pad(s), l: "SEC" },
      ].map((t, i) => (
        <div key={t.l} className="flex items-center gap-1.5">
          <div className="bg-navy-deep border border-electric/30 rounded-md px-2 py-1 min-w-[36px] text-center">
            <span className="text-electric font-bold">{t.v}</span>
          </div>
          {i < 2 && <span className="text-muted-foreground">:</span>}
        </div>
      ))}
    </div>
  );
}
