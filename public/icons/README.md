# `public/icons`

Static icon assets that must exist as real files (not inlined React
components): `favicon.ico`, `apple-touch-icon.png`, PWA icons referenced
from `src/app/manifest.ts`.

General-purpose UI icons (chevrons, close buttons, social glyphs) should
instead be React components (e.g. inlined SVGs) under `components/ui`, so
they inherit `currentColor` and can be styled with Tailwind — keep this
folder for icons that genuinely need to be static files.

No icons have been added yet.
