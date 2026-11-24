# Theme

How the app looks is its **preset**, three things: the style (how the parts are drawn), the theme (every CSS variable shadcn gives: colours, radius, fonts, charts, sidebar) and the mode (light, dark or the system's). The style is fixed when the app starts; the theme and the mode change while it runs — `ScThemeManager` holds them. No part of its own: any control of yours calls it. Documented in the Theming guide (`/docs/guides/theming`), with a one-click toggle and a Light / Dark / System menu.

## The preset

```typescript
import { lyra } from '@semantic-components/styles/lyra';
import { provideSemanticComponents } from '@semantic-components/ui';

bootstrapApplication(AppComponent, {
  providers: [
    provideSemanticComponents({
      preset: { style: lyra, theme: 'rose', mode: 'dark' },
    }),
  ],
});
```

| Part    | Type      | Default     | What it is                                                                                                               |
| ------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `style` | `ScStyle` | nova        | The parts' classes, from `@semantic-components/styles`: fixed when the app starts                                        |
| `theme` | `string`  | `'default'` | shadcn's CSS variables, under a name: `[data-theme]` on the page's root (`'default'` sets none); the user's choice first |
| `mode`  | `ScMode`  | `'system'`  | Light, dark or the system's: `dark` on the page's root; the user's choice first                                          |

## ScThemeManager

```typescript
import { ScThemeManager } from '@semantic-components/ui';

export class ModeButton {
  protected readonly theme = inject(ScThemeManager);
}
```

```html
<button scButton variant="outline" size="icon" (click)="theme.toggleMode()">
  @if (theme.isDark()) {
  <svg siSunIcon></svg>
  <span class="sr-only">Switch to light mode</span>
  } @else {
  <svg siMoonIcon></svg>
  <span class="sr-only">Switch to dark mode</span>
  }
</button>
```

| Member         | Type                        | What it is                             |
| -------------- | --------------------------- | -------------------------------------- |
| `mode`         | `Signal<ScMode>`            | The mode chosen: light, dark or system |
| `resolvedMode` | `Signal<'light' \| 'dark'>` | The mode shown (system resolved)       |
| `isDark`       | `Signal<boolean>`           | Dark now                               |
| `isLight`      | `Signal<boolean>`           | Light now                              |
| `theme`        | `Signal<string>`            | The theme (`'default'`, or a name)     |
| `setMode`      | `(mode: ScMode)`            | Picks the mode, and keeps it           |
| `toggleMode`   | `()`                        | Light ⇄ dark (from the mode shown)     |
| `setTheme`     | `(theme: string)`           | Picks the theme, and keeps it          |

A menu with Light, Dark and System keeps the way back to the system's, which a one-click button loses: the Menu's radio items, `[value]="theme.mode()"`, `(valueChange)="theme.setMode($event)"`.

## Named themes

Write each theme's variables under its name (any of shadcn's: colours, `--radius`, `--font-sans`…); `setTheme('rose')` puts it on the page's root:

```css
[data-theme='rose'] {
  --primary: oklch(0.645 0.246 16.439);
  --ring: oklch(0.645 0.246 16.439);
  --radius: 1rem;
}
```

## Kept

The user's mode and theme are kept with `ScStorage`: cookies (`sc-mode`, `sc-theme`: the setup's `storagePrefix`, then the choice) the server reads too, copied to `localStorage`. A page rendered on the server is drawn in the user's mode and theme from the first paint. Until the user picks, the preset's `mode` and `theme` apply.

Only the browser knows the system's mode, and a prerendered page has no cookie to read: on the server, `ScThemeManager` puts a small script in `<head>` (after the charset, `id="sc-theme-script"`) that sets `dark` and `data-theme` before the first paint — "system" from `prefers-color-scheme`, the choices from the cookie or its `localStorage` copy. With a CSP, it takes Angular's nonce (`CSP_NONCE`). Inject `ScThemeManager` where the app starts (a header's mode menu does), so it is there on every page.
