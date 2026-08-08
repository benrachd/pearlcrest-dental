# `components/ui`

Design-system primitives. Import from `@/components/ui` (barrel) or the
individual file.

| Component                                              | Purpose                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| `Button`                                                | Actions. Variants: `primary`, `accent`, `secondary`, `outline`, `ghost`, `link`, `glass`. Sizes `sm`–`xl`, plus `icon`. Supports `asChild`, `loading`, `startIcon`/`endIcon`. |
| `Input`, `Textarea`, `Label`                            | Form fields. `Input`/`Textarea` support an `invalid` state; `Input` supports `startIcon`/`endIcon`. |
| `Card` (+ `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`) | Content containers. Variants: `default`, `elevated`, `outline`, `glass`. |
| `Badge`                                                 | Non-interactive status/count indicator. `intent` × `tone` (`subtle`/`solid`/`outline`). |
| `Chip`                                                  | Interactive, optionally selectable and/or removable pill (filters, multi-select). |
| `Tag`                                                   | Static categorization label, optional leading color dot. |
| `Icon`                                                  | Wraps any SVG icon component with the standard size scale (`xs`–`xl`). |
| `Spinner`                                               | Minimal loading indicator, used inside `Button`'s `loading` state. |

**Badge vs. Chip vs. Tag** — these look similar but mean different things:
`Badge` communicates status/count and is never interactive; `Chip` is a
button (or contains one) — selectable and/or removable; `Tag` is a static
piece of content metadata (a category label).

## Conventions

- No business logic, no data fetching, no i18n message lookups baked in —
  primitives receive everything through props.
- Every primitive accepts `className`, merged via `cn()` (`@/utils`) so
  call sites can adjust spacing/layout without forking the component.
- Variant APIs are built with `class-variance-authority` (`cva`) — to add a
  variant, extend the relevant `variants` object rather than adding
  booleans.
- `Button` and `Card` support `asChild` (via `@radix-ui/react-slot`) to
  render as a different element (typically `Link` from `@/i18n/navigation`)
  while keeping all styling — e.g. `<Button asChild><Link href="/x">Go</Link></Button>`.
- Spacing/position is written with logical properties (`ps-*`, `pe-*`,
  `start-*`, `end-*`) instead of `pl-*`/`pr-*`/`left-*`/`right-*`, so every
  component mirrors correctly for the Arabic (RTL) locale automatically.
- All color/typography/radius/shadow/motion values come from the tokens
  defined in `src/app/globals.css` — components never hardcode a raw hex
  value, `px` size, or `ease`/`duration` curve.

No `Header`, `Footer`, `Hero`, or page-specific sections belong here — see
`components/layout` and `components/sections`.
