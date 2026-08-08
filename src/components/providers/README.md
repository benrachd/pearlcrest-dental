# `components/providers`

App-wide React context providers, composed once in
`src/app/[locale]/layout.tsx`.

Currently contains:

- `motion-provider.tsx` — configures Framer Motion globally so all
  animations respect the visitor's "reduce motion" OS preference.

Future candidates: an analytics provider, a toast/notification provider.
Keep each provider single-purpose and independently composable rather than
merging unrelated concerns into one "AppProviders" god-component.
