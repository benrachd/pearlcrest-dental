# `components/layout`

Structural chrome shared across pages: `Header`, `Footer`, `Container`,
`MobileNav`, skip-to-content link, locale switcher shell.

Rules for this folder:

- Composed from `components/ui` primitives — layout components arrange,
  they don't reinvent buttons/inputs.
- Accessibility-critical landmarks belong here: a "skip to main content"
  link, `<nav aria-label>`, focus management for the mobile menu.
- RTL-aware by construction (use logical Tailwind utilities — `ms-*`,
  `me-*`, `ps-*`, `pe-*` — instead of `ml-*` / `mr-*`) since Arabic renders
  right-to-left.

Nothing has been added yet — no `Header`, `Footer`, or navigation exists in
this foundation on purpose.
