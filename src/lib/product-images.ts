// Free, hotlink-safe imagery via picsum.photos (seeded) so IDs are stable.
// For key hero shots we use direct Unsplash CDN URLs.

export function productImage(seed: string, size = 400) {
  return `https://picsum.photos/seed/ma-${encodeURIComponent(seed)}/${size}/${size}`;
}

export const heroImages = {
  gaming:
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
  gpu: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
  keyboard:
    "https://images.unsplash.com/photo-1541728472741-03e45a58cf88?auto=format&fit=crop&w=1200&q=80",
  monitor:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
  workstation:
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=1600&q=80",
};

export const categoryImages: Record<string, string> = {
  Laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=70",
  Desktops:
    "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=400&q=70",
  "Gaming PC":
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=70",
  Processors:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70",
  Graphics:
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=70",
  Memory:
    "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=70",
  Storage:
    "https://images.unsplash.com/photo-1531492643958-2f8afac0f14b?auto=format&fit=crop&w=400&q=70",
  Cooling:
    "https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=400&q=70",
  Keyboards:
    "https://images.unsplash.com/photo-1541728472741-03e45a58cf88?auto=format&fit=crop&w=400&q=70",
  Mice: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=70",
  Audio:
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=70",
  Networking:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=70",
};
