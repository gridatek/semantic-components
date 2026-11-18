# @semantic-components/styles

The components' classes in [shadcn/ui](https://ui.shadcn.com)'s styles (its
presets), one entry point each:

| Preset | Entry point                        |
| ------ | ---------------------------------- |
| nova   | `@semantic-components/styles/nova` |
| vega   | `@semantic-components/styles/vega` |
| maia   | `@semantic-components/styles/maia` |
| lyra   | `@semantic-components/styles/lyra` |
| mira   | `@semantic-components/styles/mira` |
| luma   | `@semantic-components/styles/luma` |
| sera   | `@semantic-components/styles/sera` |
| rhea   | `@semantic-components/styles/rhea` |

## Usage

The app chooses its style once, when it starts; without one, the components use nova:

```ts
import { lyra } from '@semantic-components/styles/lyra';
import { provideSemanticComponents } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({ style: lyra })],
};
```

Tailwind skips `node_modules`: add your style's file as a source in
`styles.css` — that one file only, so Tailwind scans one style:

```css
@source '../node_modules/@semantic-components/styles/fesm2022/semantic-components-styles-lyra.mjs';
```

The parts that follow the style (for now `button[scButton]`) take their
classes from it. A class the consumer writes still merges over them.

The classes come from shadcn's generated apps, one per style
([shadcn-reference](https://github.com/klagrida/shadcn-reference),
`presets/<style>/src/components/ui`).
