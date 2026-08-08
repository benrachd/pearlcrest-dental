# `components/sections`

Page-specific, content-heavy compositions: `Hero`, `TreatmentsOverview`,
`TestimonialsCarousel`, `ClinicLocations`, etc.

Rules for this folder:

- One folder per section (e.g. `sections/hero/`), colocating its
  subcomponents, and its own local icon glyphs if it needs bespoke ones
  beyond what's in `@/animations` / `components/ui`.
- Sections consume `components/ui` + `components/layout`; they should
  rarely need custom low-level markup.
- Copy comes from `next-intl` translation messages (namespaced per section,
  e.g. `Hero.*` in `messages/{en,ar,fr}.json`), never hardcoded strings —
  required for the EN/AR/FR requirement.
- Every visual value (color, spacing, radius, shadow, easing) must come from
  the design-system tokens in `src/app/globals.css` — sections style
  composition, they never invent new tokens inline.

## `hero/`

The homepage Hero — the only section built so far. Follows the creative
direction's "Porcelain & Gold" concept literally:

| File | Role |
| --- | --- |
| `hero.tsx` | Composition: eyebrow, headline (`t.rich` for the single italic emphasis word), subheadline, two CTAs (real links via `@/i18n/navigation`, composed with `Button asChild`), stats, image. |
| `hero-background.tsx` | Decorative-only (`aria-hidden`): porcelain gradient, two slow-drifting soft-focus glows, a faint arch-motif line. |
| `hero-stats.tsx` | The "Porsche spec-sheet" trust indicators — a semantic `<dl>` with logical (`border-s`) dividers so it mirrors correctly in Arabic. |
| `scroll-indicator.tsx` | A real, keyboard-operable button (not a purely decorative animation). |
| `hero-icons.tsx` | The 2–3 hairline glyphs this section needs; promote to `components/ui` once a second section needs the same glyph. |

Not built (out of scope for this pass, per instructions): `Navbar`,
`Footer`, and every other homepage section.
