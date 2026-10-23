# @semantic-components/preset-styles

The components' classes in [shadcn/ui](https://ui.shadcn.com)'s styles (its
presets), one entry point each:

| Preset | Entry point                               |
| ------ | ----------------------------------------- |
| nova   | `@semantic-components/preset-styles/nova` |
| vega   | `@semantic-components/preset-styles/vega` |
| maia   | `@semantic-components/preset-styles/maia` |
| lyra   | `@semantic-components/preset-styles/lyra` |
| mira   | `@semantic-components/preset-styles/mira` |
| luma   | `@semantic-components/preset-styles/luma` |
| sera   | `@semantic-components/preset-styles/sera` |
| rhea   | `@semantic-components/preset-styles/rhea` |

## Usage

The app chooses its preset once, when it starts; without one, the components use nova:

```ts
import { lyra } from '@semantic-components/preset-styles/lyra';
import { provideScConfig } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideScConfig({ preset: lyra })],
};
```

The parts that follow the preset (for now `button[scButton]`) take their
classes from it. A class the consumer writes still merges over them.

The classes come from shadcn's generated apps, one per style
([shadcn-reference](https://github.com/klagrida/shadcn-reference),
`presets/<style>/src/components/ui`).
