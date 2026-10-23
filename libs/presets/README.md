# @semantic-components/presets

The components' classes in [shadcn/ui](https://ui.shadcn.com)'s styles (its
presets), one entry point each:

| Preset | Entry point                         |
| ------ | ----------------------------------- |
| nova   | `@semantic-components/presets/nova` |
| vega   | `@semantic-components/presets/vega` |
| maia   | `@semantic-components/presets/maia` |
| lyra   | `@semantic-components/presets/lyra` |
| mira   | `@semantic-components/presets/mira` |
| luma   | `@semantic-components/presets/luma` |
| sera   | `@semantic-components/presets/sera` |
| rhea   | `@semantic-components/presets/rhea` |

## Usage

The app chooses its preset once, when it starts; without one, the components use nova:

```ts
import { lyra } from '@semantic-components/presets/lyra';
import { provideScConfig } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideScConfig({ preset: lyra })],
};
```

Tailwind skips `node_modules`: add your preset's file as a source in
`styles.css` — that one file only, so Tailwind scans one preset:

```css
@source '../node_modules/@semantic-components/presets/fesm2022/semantic-components-presets-lyra.mjs';
```

The parts that follow the preset (for now `button[scButton]`) take their
classes from it. A class the consumer writes still merges over them.

The classes come from shadcn's generated apps, one per style
([shadcn-reference](https://github.com/klagrida/shadcn-reference),
`presets/<style>/src/components/ui`).
