/**
 * Renders a schema.org object (see `src/lib/structured-data.ts`) as a
 * `<script type="application/ld+json">` tag. Renders no visible markup —
 * this is SEO infrastructure, not a UI component.
 *
 * Usage:
 *   <JsonLd data={getDentistSchema()} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
