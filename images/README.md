# `public/images`

Static image assets served as-is by Next.js (use `next/image` to consume
them so they get automatic resizing, `avif`/`webp` encoding, and lazy
loading — see the `images` config in `next.config.ts`).

Subfolders:

- `brand/` — logo lockups, wordmarks, favicons source files.
- `clinic/` — clinic interiors/exteriors, per-market location photography.
- `treatments/` — treatment/procedure imagery.
- `team/` — clinician and staff photography.
- `hero/` — large, page-specific hero imagery (currently `hero-portrait.jpg`,
  used by `src/components/sections/hero/hero.tsx`).
- `og/` — dedicated Open Graph / social share images (see
  `src/constants/seo.ts` → `ogImage` default, `src/lib/metadata.ts`).

Per the creative direction (`docs/creative-direction.md`): one warm,
directional light across every photograph; no mixed color temperatures; no
medical clichés (gloved heart-hands, cold mirror-and-drill close-ups,
fluorescent interiors).
