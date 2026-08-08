# Aurea Dental

Foundation for the Aurea Dental flagship website — UAE, Saudi Arabia, United
States, France. English / Arabic / French.

This repository currently contains **architecture and design system only**:
no pages, no Hero/Navbar/Footer, no page-specific sections. See the project
chat history for the full folder-by-folder rationale.

## Stack

- [Next.js 15](https://nextjs.org) — App Router, React Server Components
- TypeScript (strict mode)
- Tailwind CSS v4 (CSS-first `@theme` config)
- Framer Motion
- [`next-intl`](https://next-intl.dev) — i18n routing, messages, metadata
- `class-variance-authority` + `@radix-ui/react-slot` — variant-driven,
  polymorphic UI primitives

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Scripts

| Script                 | Purpose                                   |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Start the dev server (Turbopack)          |
| `npm run build`         | Production build                          |
| `npm run start`         | Serve the production build                |
| `npm run lint`          | ESLint                                    |
| `npm run type-check`    | `tsc --noEmit`                            |
| `npm run format`        | Prettier (writes)                         |

## Project structure

```
src/
  app/[locale]/       Root layout (html/body, fonts, dir, providers)
  app/*.ts            sitemap.ts, robots.ts, manifest.ts
  app/globals.css     Tailwind entry + typography theme tokens
  components/
    ui/               Design-system primitives (Button, Input, Card, Badge, Chip, Tag, Icon…)
    layout/           Header/Footer/nav shells (empty — see README)
    sections/         Page-specific compositions (empty — see README)
    common/           Cross-cutting utility components (e.g. JsonLd)
    providers/        App-wide context providers (e.g. MotionProvider)
  i18n/               next-intl routing, navigation, request config
  styles/fonts.ts     next/font configuration (Latin + Arabic pairing)
  lib/                Metadata builder, structured data, env access
  constants/          Site config, SEO defaults, route paths
  types/              Shared TypeScript types
  utils/              cn(), locale/direction helpers
  hooks/              Reusable client hooks
  animations/         Framer Motion variants + transitions
messages/             en.json / ar.json / fr.json translation catalogs
public/
  images/             brand, clinic, treatments, team, og
  icons/              favicons, PWA icons
middleware.ts         Locale detection & routing
```

## i18n

Locales are always URL-prefixed: `/en`, `/ar`, `/fr`. Arabic renders
right-to-left automatically (`dir="rtl"` set from the locale in
`src/app/[locale]/layout.tsx`). Add a new locale by editing
`src/i18n/routing.ts` and adding a `messages/<locale>.json` file.

## SEO

`src/lib/metadata.ts` builds canonical URLs, `hreflang` alternates (incl.
`x-default`), Open Graph, and Twitter metadata for any route from a small
`{ locale, path, title?, description? }` input. `src/lib/structured-data.ts`
provides schema.org JSON-LD builders, rendered via
`src/components/common/json-ld.tsx`.

## Design system

All tokens live in `src/app/globals.css` (Tailwind v4 `@theme`):

- **Color** — a warm `neutral` scale, a signature `gold` accent, and muted
  `success`/`warning`/`error`/`info` scales, all defined in OKLCH. A
  semantic layer (`background`, `surface`, `foreground`, `border`,
  `accent`, `ring`, …) maps onto these and swaps automatically under a
  `.dark` class — no toggle UI is built yet, but the whole system is
  dark-mode-ready.
- **Typography** — an editorial `display-*`/`heading-*` scale on top of
  Tailwind's default `text-*` scale, each with tuned line-height and
  letter-spacing.
- **Spacing / radius / shadow** — `gutter`/`section-y` layout tokens, a
  softened `radius-*` scale, and diffused, warm-tinted `shadow-*`
  elevations plus a signature `shadow-gold` glow.
- **Glass** — `glass` / `glass-strong` / `glass-subtle` utilities
  (backdrop-blur + tinted, semi-transparent surface).
- **Motion** — `ease-luxury` / `ease-signature` Tailwind utilities, mirrored
  by `src/animations/transitions.ts` (durations + spring presets) for
  Framer Motion.
- **Breakpoints** — Tailwind's `sm`–`2xl` plus an added `xs` and `3xl`.

Reusable primitives built on these tokens live in `src/components/ui`
(`Button`, `Input`, `Textarea`, `Label`, `Card`, `Badge`, `Chip`, `Tag`,
`Icon`, `Spinner`) — see `src/components/ui/README.md` for the full API and
conventions.
