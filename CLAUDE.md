# Kulu Intelligence — Site Brief

## Role
You are a senior web designer and front-end engineer specialising in beautiful, smooth, modern websites. Your aesthetic reference points are: editorial print design, South African warmth, cinematic motion, and extreme typographic precision. You do not produce generic AI-looking sites. Every component you build should feel as though a careful human made it with intent.

---

## Project
**Kulu Intelligence** (`kulu.co.za`) — an AI consultancy for South African professional firms (property, marketing, accounting & finance, HR agencies). The brand is warm, specific, confident, and un-hyped. The site is a Next.js 14 static export deployed to Hostinger shared hosting.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS v3 · Framer Motion v11 · Google Fonts (next/font)  
**Build:** `npm run build` → `out/` folder → upload `out/` contents to `public_html/`  
**No API routes.** `output: "export"` is set. Keep every page statically renderable.

---

## Brand System

### 1. Colour palette
All five colours are named after South African references. Respect the ratio.

| Token | Hex | Name | Role | Max ratio |
|-------|-----|------|------|-----------|
| `stoep` | `#FF6B5C` | Stoep coral | Primary accent | ~12% of any layout |
| `mielie` | `#FFD66B` | Mielie yellow | Secondary warmth | ~5% |
| `dawn` | `#FFF8E8` | Dawn cream | Ground / background | ~55% |
| `indigo` | `#1A2B47` | Indigo | Anchor, body text | ~25% |
| `indigo-deep` | `#13203A` | — | Hover/active only | — |
| `spruit` | `#B8E0D2` | Spruit mint | Cool accent, use sparingly | ~3% |

**Approved surface pairings:**
- `bg-dawn text-indigo` — primary reading surface
- `bg-indigo text-dawn` — dark surface, with coral accents
- `bg-stoep text-indigo` — coral surface, period becomes `text-dawn`
- `bg-mielie text-indigo` — warm yellow surface

**Rules:** Never let coral exceed 15% of a layout. Never place the wordmark on a noisy or gradient background. Never recolour the coral period to anything else (except cream on a coral surface).

### 2. Typography

Two typefaces only. No others.

| Role | Face | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Display / wordmark | Bricolage Grotesque | 600 | varies | −0.045em (wordmark) / −0.025em (headings) |
| Display headings | Bricolage Grotesque | 500 | 44px+ | −0.025em |
| Subheadings | Bricolage Grotesque | 500 | 28px | −0.015em |
| Body text | Manrope | 400 | 15px | 0 |
| UI / subhead | Manrope | 500 | 18px | −0.005em |
| Captions | Manrope | 400 | 12px | 0 |
| Eyebrow labels | Manrope | 500 | 11px | +0.16em |
| Descriptor (INTELLIGENCE) | Manrope | 500 | varies | +0.3em |

**Scale tokens** (defined in `tailwind.config.ts` — use these, don't invent in-between):
```
text-hero     → 80px / -0.045em
text-display  → 44px / -0.025em
text-heading  → 28px / -0.015em
text-subhead  → 18px
text-body     → 15px / 1.65 leading
text-caption  → 12px
text-eyebrow  → 11px / +0.16em
```

**CSS utility classes** (in `globals.css`):
- `.eyebrow` — 11px Manrope 500, +0.16em tracking, uppercase, opacity-55
- `.descriptor` — Manrope 500, +0.3em tracking, uppercase
- `.stitle` — Bricolage 500, 44px, -0.025em (the brand book "Display 01")
- `.rule` — 0.5px hairline, currentColor, opacity-18
- `.btn-pill`, `.btn-pill--coral`, `.btn-pill--ghost` — pill CTA buttons
- `.dot-field` — repeating dot pattern, brand texture
- `.grain::after` — subtle film grain overlay

### 3. Logo system

**KuluWordmark component** (`components/KuluWordmark.tsx`):
- Always Bricolage Grotesque 600, −0.045em tracking
- The coral period is non-negotiable — always present, always `#FF6B5C` except on coral surfaces where it becomes `#FFF8E8`
- "INTELLIGENCE" descriptor in Manrope 500, +0.3em tracking, sits below
- Props: `size`, `variant` (cream-on-indigo | indigo-on-dawn | indigo-on-coral | dawn-on-coral), `showDescriptor`, `showTagline`, `align`

**KuluMonogram** (`components/KuluWordmark.tsx`):
- "K." only — for tight spaces, headers, favicons
- Same four colour variants

**Never:**
- Squash, rotate, or recolour the wordmark
- Drop the coral period
- Use "K.I.", "KI", "KULU INTELLIGENCE" (all-caps), or "Kulu AI"
- Substitute the typeface
- Place on a patterned or noisy background

### 4. Visual language

**Dot field** (`.dot-field`): The brand's signature pattern. Coral or dawn dots in a 22×22px grid. Used at low opacity (0.4–0.55) on dark surfaces. Already in `globals.css`.

**Mesh gradient blobs**: Drifting, blurred radial gradients in brand colours. Used on hero sections. Soft, not garish — keep opacity 0.15–0.35.

**Mouse spotlight**: A coral radial-gradient tracked to the cursor. Already implemented in `LandingCard.tsx` and `HeroCard.tsx`.

**Film grain** (`.grain::after`): Optional, extremely subtle (opacity 0.05). Use only on full-bleed dark sections where added texture is warranted.

**Iconography**: Single-line outline icons only, 1.75px stroke, rounded caps. Always indigo or coral. Never filled, never dual-tone. (Tabler Icons is a good match.)

**Photography** (none yet in the repo): When added — real SA small business owners and workplaces, warm natural light, slightly desaturated, human distance (no drones, no stock staging).

**Illustration**: Flat shapes, bold strokes, brand colours only. Slightly imperfect — the human hand should show. No gradients, no 3D, no AI-generated images.

---

## Motion philosophy

The animations should feel **cinematic, not showy**. Every motion has a reason:

| Motion | Implementation | Notes |
|--------|---------------|-------|
| Wordmark letter stagger | Framer Motion, `y: "110%" → 0`, staggered 70ms | Used on landing and sub-page heroes |
| Coral period spring | `scale: 0, y: -24 → 1, 0`, spring stiffness 320, damping 14 | The signature move — never skip this |
| Route wipe transition | Coloured overlay expands from clicked tile, holds, fades | Already in `RouteTransition.tsx` |
| Scroll reveals | `<Reveal>` wrapper: y: 24 → 0, once, -80px margin | Used on all sub-page content |
| Tile 3D tilt | Mouse position → rotateX/Y via spring | Subtle, 1.5° max |
| Accent line | CSS width: 0 → 100% on hover | Top edge of tile, 700ms ease-kulu |
| Page enter veil | `<PageEnter>` — coloured overlay fades out | Receives colour from route transition |
| Blobs | Infinite float loop, 26–36s duration | Soft atmosphere, not distracting |

**Easing:** Use `cubic-bezier(0.22, 1, 0.36, 1)` (registered as `ease-kulu` in Tailwind) for all primary motions. It has a quick start and an elegant overshoot-free settle.

**Reduced motion:** `MotionGuard.tsx` adds `motion-ready` class after 1.5s as a failsafe for throttled environments. All animations already respect `prefers-reduced-motion` via the global CSS override.

---

## Component map

| Component | Purpose |
|-----------|---------|
| `LandingCard.tsx` | **Active** landing — no-scroll, 4-tile nav, live clock, mouse spotlight |
| `HeroCard.tsx` | **Legacy / unused** — earlier full-page hero with centred wordmark and marquee. Keep for reference but it is not currently rendered. |
| `KuluWordmark.tsx` | Brand wordmark + monogram, all surface variants |
| `SiteHeader.tsx` | Fixed overlay header; `minimal` prop hides nav on landing |
| `SiteFooter.tsx` | Indigo sign-off plate with massive wordmark |
| `PageHero.tsx` | Sub-page masthead — cinematic, full-bleed, letter-stagger title |
| `RouteTransition.tsx` | Context + overlay for cinematic page transitions |
| `PageEnter.tsx` | Per-page veil fade-in that consumes the route transition colour |
| `Reveal.tsx` | Generic scroll-reveal (`whileInView`, once, y:24→0) |
| `CustomCursor.tsx` | Dot cursor for fine-pointer devices (hides on touch/reduced-motion) |
| `MotionGuard.tsx` | Failsafe: adds `motion-ready` to `<html>` 1.5s after mount |
| `TileGrid.tsx` | (Check if still used; may be superseded by tiles inside `LandingCard`) |

---

## Page inventory

| Route | Surface | Status | Notes |
|-------|---------|--------|-------|
| `/` | `bg-indigo` | ✅ Complete | LandingCard, no SiteHeader nav |
| `/learn` | `bg-dawn` hero | ✅ Complete | Format strip, 3 audience cards, agenda list, industries, CTA |
| `/implement` | `bg-indigo` hero | ✅ Complete | Snapshot stats, 4 phases, industry builds (mielie), pull quote, CTA |
| `/case-studies` | `bg-stoep` hero | ✅ Complete | Stats strip, 4 case studies (each on own surface), honest note, CTA |
| `/about` | `bg-mielie` hero | ✅ Complete | MVV strip, coral positioning, voice principles, contact section |

---

## Brand translation audit

### What the codebase gets right
- All 5 brand colours exactly matched, correctly named in Tailwind
- Typography system fully implemented — both typefaces, full scale, CSS classes
- `KuluWordmark` and `KuluMonogram` implement the brand spec precisely (tracking, weights, all 4 variants)
- Dot field pattern, grain texture, mesh blobs — all present
- Cinematic route transitions from tile surface colour
- Voice and copy are excellent — specific, SA-rooted, plain, no jargon
- Coral period convention held throughout all pages
- `.eyebrow` and `.descriptor` classes in consistent use
- `selection` highlight in stoep coral with dawn text
- `ease-kulu` bezier registered and used

### Known gaps to address in future work
1. **No CTA in SiteHeader** — The brand book shows a "Let's chat" pill button in the header nav. `SiteHeader.tsx` currently has no CTA. Add a `btn-pill--coral` that links to `/about#contact`.
2. **HeroCard.tsx is dead code** — Either delete it or repurpose it. It is not imported anywhere.
3. **No favicon** — Add a 32×32 and 180×180 version of the K. monogram. Place in `public/` and reference in `app/layout.tsx` via `<Metadata>`.
4. **No photography** — When brand photography is ready: warm SA workplaces, real owners. Do not use stock imagery or AI-generated images (brand guidelines explicitly prohibit AI imagery).
5. **Type scale tokens underused** — Pages use inline bracket values (`text-[64px]`) rather than the defined tokens (`text-display`). Prefer the scale tokens for consistency.
6. **No sitemap / robots.txt** — Add `public/robots.txt` and a `sitemap.xml` at build time.
7. **Contact form** — Currently contact is email + phone only. A form (name, firm, what they need) would improve conversion.
8. **Colour ratio check** — Coral is already at the edge of its 15% cap on the `/about` page positioning section. Watch this on new pages.

---

## Code conventions

### File structure
```
app/
  layout.tsx          — root layout, fonts, metadata
  globals.css         — brand design tokens, utility classes
  page.tsx            — landing (no SiteHeader nav, no scroll)
  learn/page.tsx      — sub-page (SiteHeader + SiteFooter)
  implement/page.tsx
  case-studies/page.tsx
  about/page.tsx
components/
  KuluWordmark.tsx    — logo system
  LandingCard.tsx     — landing composition
  PageHero.tsx        — sub-page masthead
  SiteHeader.tsx
  SiteFooter.tsx
  RouteTransition.tsx
  PageEnter.tsx
  Reveal.tsx
  CustomCursor.tsx
  MotionGuard.tsx
public/
  logos/              — brand image assets
```

### Component rules
- All components that use browser APIs or Framer Motion hooks must have `"use client"` at the top.
- Server components (pages that don't need hooks) must NOT have `"use client"` — keep them as server components so static export works correctly.
- Use `<Reveal>` for all content sections that scroll into view. Pass `delay` in 0.06–0.1s increments for stagger.
- Use `<PageHero>` for sub-page masterheads. Pass `surface` matching the page's brand colour.
- Use `<PageEnter>` + `<CustomCursor>` at the top of every page component.
- Use `<SiteHeader>` and `<SiteFooter>` on all sub-pages. Not on the landing.

### Tailwind conventions
- Use semantic colour tokens: `bg-dawn`, `text-stoep`, `border-indigo/10` etc. — never raw hex values in className.
- Use `opacity-[x]` fractions on borders and subtle backgrounds.
- Never invent a colour outside the brand palette.
- `max-w-[1480px]` for main content, `max-w-[1640px]` for the footer wordmark.
- Standard content padding: `px-6 md:px-12` inside the max-width container.
- Section vertical rhythm: `py-24 md:py-32`.

### Imports
- Use `@/` path alias for all local imports.
- Import `{ motion }` from `framer-motion` in client components only.

---

## Voice & copy

When writing or editing copy, hold the Kulu voice:

**Do:**
- Short sentences. Real words. Specific over generic.
- "Your bakery" not "your business". "By Friday" not "rapidly".
- SA references are welcome — *tjommie*, *ja*, *stoep*, *braai* — but never costume.
- Honest about what AI can't do. Never overpromise.

**Don't:**
- leverage · synergy · solution · empower · disrupt · revolutionise
- cutting-edge · ROI optimisation · paradigm · journey · ecosystem · 10x
- "KULU INTELLIGENCE" (all caps) · "K.I." · "Kulu AI"

**The tagline is:** *AI, made human.*  
**The promise is:** Plain talk, real tools, live before month-end.  
**The positioning is:** Closer to a really good GP than a specialist surgeon.

---

## Build and deploy

```bash
# Dev
npm run dev

# Production build (generates out/)
npm run build

# Package for Hostinger upload
cd ..
zip -r kulu-intelligence-hostinger.zip kulu-intelligence/out/ kulu-intelligence/out/.htaccess

# Upload out/ contents to public_html/ on Hostinger hPanel
```

The `.htaccess` in `out/` handles Apache 404 routing and trailing-slash redirects. Do not remove it.

---

## Quality bar

Before shipping any new page or component, check:
- [ ] All brand colours used correctly (no raw hex in JSX/TSX)
- [ ] Coral period present on every heading that ends a sentence
- [ ] Correct typeface per role (Bricolage for display, Manrope for body)
- [ ] `<Reveal>` wrapper on all scroll-driven content
- [ ] Reduced motion respected (Framer Motion handles this globally)
- [ ] `"use client"` only where browser APIs or hooks are actually needed
- [ ] No inline styles for colours — use Tailwind tokens
- [ ] Voice check: specific, plain, no corporate jargon
- [ ] Static export safe: no `getServerSideProps`, no API routes, no dynamic imports that break at build time
