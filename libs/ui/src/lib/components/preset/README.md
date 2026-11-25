# Preset

How the app looks is its **preset**, three things: the style (how the parts are drawn), the theme (every CSS variable shadcn gives: colours, radius, fonts, charts, sidebar) and the mode (light, dark or the system's). The style is fixed when the app starts; the theme and the mode change while it runs — `ScPresetManager` holds them. No part of its own: any control of yours calls it. Documented in the Theming guide (`/docs/guides/theming`), with a one-click toggle and a Light / Dark / System menu.

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
| `mode`  | `ScMode`  | `'system'`  | Light, dark or the system's: `dark` and `color-scheme` on the page's root; the user's choice first                       |

## ScPresetManager

```typescript
import { ScPresetManager } from '@semantic-components/ui';

export class ModeButton {
  protected readonly preset = inject(ScPresetManager);
}
```

```html
<button scButton variant="outline" size="icon" (click)="preset.toggleMode()">
  @if (preset.isDark()) {
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

A menu with Light, Dark and System keeps the way back to the system's, which a one-click button loses: the Menu's radio items, `[value]="preset.mode()"`, `(valueChange)="preset.setMode($event)"`.

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

The user's mode and theme are kept with `ScStorage`: cookies (`sc-mode`, `sc-theme`) the server reads too, copied to `localStorage`. A page rendered on the server is drawn in the user's mode and theme from the first paint. Until the user picks, the preset's `mode` and `theme` apply.

Only the browser knows the system's mode, and a prerendered page has no cookie to read: on the server, `ScPresetManager` puts a small script in `<head>` (after the charset, `id="sc-theme-script"`) that sets `dark`, `color-scheme` and `data-theme` before the first paint — "system" from `prefers-color-scheme`, the choices from the cookie or its `localStorage` copy. With a CSP, it takes Angular's nonce (`CSP_NONCE`). Inject `ScPresetManager` where the app starts (a header's mode menu does), so it is there on every page.

## The mode tells the browser: `color-scheme`

The mode does two things on the page's root (`<html>`):

- the `dark` class — the theme's dark values (`.dark { --background: … }`), and Tailwind's `dark:` variant;
- `color-scheme: light` or `color-scheme: dark`, inline (`<html class="dark" style="color-scheme: dark">`).

`color-scheme` is how the page tells the browser which mode it is in. What the browser draws itself follows it: scrollbars, native form controls (a `<select>`'s list, a date input's picker, checkboxes and radios without a style of their own), the default background and text colours, a canvas's defaults — and every `light-dark(light, dark)` in the page's CSS picks by it. Without it, all of these follow the operating system instead of the mode chosen in the app: switched to light on a system in dark, a page shows dark scrollbars and dark native controls on a light page, and the other way round.

It's always one mode, never `light dark`: `light dark` means "either, the system decides", which is what the app's own mode choice replaces ("system" resolves to the system's mode first, then the page says which).

### Inline, so nothing overrides it

`ScPresetManager` (and the server's theme script, before the first paint) sets it in `<html>`'s `style` attribute. An inline style wins over every stylesheet rule, whatever their order or specificity (short of `!important`), so a stylesheet you import can't hand the page back to the system. One does: pdf.js's `pdf_viewer.css`, which the PDF Viewer needs, sets `:root { color-scheme: light dark; }` for the whole page, not only the viewer ([pdf.js issue 19886](https://github.com/mozilla/pdf.js/issues/19886)). With the mode set inline, that rule has no effect — no `!important`, no import order to get right — and pdf.js's own colours, written with `light-dark()` (selection outlines, form fields, tooltips on the pages), follow the app's mode too.

### Without `ScPresetManager`

An app that doesn't use it (its own mode switch, or a single mode) sets `color-scheme` itself, the same way — inline on `<html>`, with its mode:

```typescript
document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
```

A light-only app can write `<html style="color-scheme: light">` in its `index.html`. A stylesheet rule (`:root { color-scheme: light }`) works too, but loses to a later or more specific rule, such as pdf.js's when `pdf_viewer.css` comes after it.
