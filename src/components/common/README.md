# `components/common`

Small, cross-cutting components that don't fit `ui` (not a design-system
primitive) or `sections` (not page content) — utility-like pieces reused
across many sections/pages.

Currently contains:

- `json-ld.tsx` — renders a schema.org object as a `<script
type="application/ld+json">` tag. Pure SEO infrastructure, no visible
  output.

Future candidates: a `LocaleSwitcher` (locale selection UI wired to
`@/i18n/navigation`), an `AnimatedCounter`, a `ScrollProgressBar`.
