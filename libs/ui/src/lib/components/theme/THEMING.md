# Theming Architecture

## Two Independent Axes

| Axis      | Controls      | Mechanism              | Example values            |
| --------- | ------------- | ---------------------- | ------------------------- |
| **Mode**  | Brightness    | `.dark` class          | `light`, `dark`, `system` |
| **Color** | Hue / palette | `data-theme` attribute | `default`, `blue`, `rose` |

These compose independently:

```
<html>                                 → default + light
<html class="dark">                    → default + dark
<html data-theme="rose">               → rose + light
<html data-theme="rose" class="dark">  → rose + dark
```

## CSS Variable Layers

Each color scheme overrides the same set of CSS variables. The `dark` class provides the dark variant.

```css
/* Default — no data-theme attribute needed */
:root {
  --primary: oklch(0.55 0.2 250);
  --accent: oklch(0.75 0.1 250);
}
.dark {
  --primary: oklch(0.7 0.2 250);
  --accent: oklch(0.4 0.1 250);
}

/* Rose */
[data-theme='rose'] {
  --primary: oklch(0.55 0.2 15);
  --accent: oklch(0.75 0.1 15);
}
[data-theme='rose'].dark {
  --primary: oklch(0.7 0.2 15);
  --accent: oklch(0.4 0.1 15);
}
```

All components consume the same variable names (`--primary`, `--accent`, etc.) so they adapt automatically.

## State Management

`ScThemeManager` manages two signals:

- `mode` — `ScThemeMode` (`'light' | 'dark' | 'system'`)
- `colorScheme` — `string` (e.g., `'default'`, `'blue'`, `'rose'`)

Both are persisted independently to `localStorage`. The `mode` controls the `.dark` class on `<html>`, while `colorScheme` controls the `data-theme` attribute.

## Adding a New Color Scheme

1. Define the CSS variables for both light and dark variants
2. Call `themeManager.setColorScheme('your-scheme')` — no component changes needed

## Key Principles

1. **Same variable names everywhere** — components never reference a specific color scheme, only tokens like `--primary`.
2. **Mode and color are orthogonal** — changing one doesn't affect the other.
3. **CSS-only switching** — no JS needed to restyle; just swap the `data-theme` attribute and/or `dark` class.
4. **Extensible** — adding a new color scheme means adding one CSS block with light/dark variants. No component changes needed.
5. **Configurable** — defaults and storage keys can be overridden via `SC_THEME_CONFIG` injection token.
