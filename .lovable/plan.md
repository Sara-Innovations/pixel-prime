## Scope

Ship a large upgrade across performance, theming, a11y, mobile UX, new pages, and auth. Split into phases so each is verifiable.

### Phase 1 — Branding & shared UI
- Replace NOVACORE logo/wordmark with **M.A Computer** in header + footer + all meta titles/OG.
- Add a small monogram mark (M.A) in place of the Cpu icon tile.

### Phase 2 — Light-mode token sweep (a11y + contrast)
- Audit shadcn primitives (dialog, dropdown, popover, sheet, sonner/toast, alert, tooltip, command, select, menubar) and any hardcoded `bg-navy-deep`, `text-white`, `border-white/*` usages in `src/components/site/*` and route files. Replace with semantic tokens (`bg-background`, `bg-card`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`).
- Update `product-card.tsx` to use tokens (image tile, badges quick-action overlays, price row) so it looks correct in both themes.
- Add contrast-safe tokens where missing in `src/styles.css` for light mode (border, muted, success/cta on light).
- Verify WCAG AA by manual token check + Playwright screenshot pass in both themes.

### Phase 3 — Performance (images, lazy, skeletons)
- Add `loading="lazy"` + `decoding="async"` + `sizes`/responsive `srcset` helper for product images.
- Create `<ProductCardSkeleton>` and `<GallerySkeleton>` using shadcn `Skeleton`; use in product grid, deals, PC builder placeholders while data (mocked) resolves.
- Wrap heavy homepage sections in `<Suspense>` with skeleton fallbacks; lazy-import below-the-fold sections via `React.lazy`.
- Preload the LCP hero image via route `head().links`.

### Phase 4 — Related images from free source
- Use Unsplash source URLs (free, hotlink-safe) for hero, category tiles, product silhouettes, and PC-builder step thumbnails. Wire them into `product-card` (replace gradient tile with real photo behind current overlay) and hero/category blocks.

### Phase 5 — Mobile app-style navbar
- Add a fixed bottom tab bar (Home, Categories, Builder, Cart, Account) visible `< lg`, with active-route highlight and safe-area padding.
- Convert the mobile menu button to open a sheet with categories + account links.
- Hide the desktop category strip on mobile; add horizontal scroll chips.

### Phase 6 — PC Builder product-select page
- New route `src/routes/pc-builder.select.$component.tsx` (`/pc-builder/select/:component`) listing choices for a component (CPU/GPU/etc.) with filters (brand, socket, price), compatibility flags, and "Add to build" CTA that returns to `/pc-builder`.
- Link each step's "Choose" button to this page with the component slug.

### Phase 7 — Auth + Customer dashboard
- Enable **Lovable Cloud**; add email/password + Google sign-in.
- Create `profiles` table (id fk `auth.users`, full_name, phone, avatar_url) with RLS, trigger for auto-insert.
- Public `/auth` route (login + signup tabs, password reset).
- Managed `_authenticated/route.tsx` gate; dashboard routes under `_authenticated/account/`:
  - `/account` overview (recent orders, saved builds, wishlist counts)
  - `/account/orders`
  - `/account/builds` (saved PC builds)
  - `/account/wishlist`
  - `/account/addresses`
  - `/account/profile` (edit name, phone, avatar upload)
- Sign-out hygiene per guide.

### Phase 8 — Cart + Checkout + BD payment UI
- `/cart` page: line items with qty steppers, coupon, order summary, mobile sticky checkout bar.
- `/checkout` page (single-page 3-step: address → shipping → payment):
  - Payment method selector cards: **SSLCommerz**, **bKash**, **Nagad** (UI only — no gateway integration; show branded card, phone/OTP mock flow modal on select).
  - Order review + "Place order" (mock success page `/checkout/success`).
- Use tokens throughout; sticky summary on desktop, drawer on mobile.

## Technical notes
- **Payments are UI-only mock**: no SSLCommerz/bKash/Nagad SDKs, no keys. Clear "Demo" ribbon on the checkout confirmation.
- **Cart state**: Zustand store with localStorage persistence (no DB writes) to keep scope tight.
- **Auth**: Lovable Cloud (Supabase) with email/password + Google. `_authenticated` layout is integration-managed.
- **Images**: Unsplash `images.unsplash.com/photo-...?auto=format&fit=crop&w=...` URLs, `loading="lazy"`, responsive `sizes`.
- **A11y**: icon-only buttons get `aria-label`; single `<main>` in root; focus rings via `ring-ring`; verify 4.5:1 on `text-muted-foreground` against `bg-background` in light mode (bump lightness if needed).
- **Skeletons**: `Skeleton` variants for card, row, hero.
- **New deps**: `zustand` for cart.

## Deliverable order
Ship Phase 1–5 first (branding, theming, perf, images, mobile nav). Then Phase 6 (builder select). Then Phase 7 (auth + dashboard, requires Cloud enable). Then Phase 8 (cart/checkout).

Confirm and I'll start with Phase 1–5 in the first pass.
