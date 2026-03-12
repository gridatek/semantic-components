# Theming Architecture

## Current: Light / Dark Mode

A single axis — **mode** — toggled via a `dark` class on `<html>`. CSS variables defined in `:root` (light) and `.dark` (dark) provide all color tokens.

## Future: Multi-Color Themes

### Two Independent Axes

| Axis      | Controls      | Mechanism              | Example values            |
| --------- | ------------- | ---------------------- | ------------------------- |
| **Mode**  | Brightness    | `.dark` class          | `light`, `dark`, `system` |
| **Color** | Hue / palette | `data-theme` attribute | `blue`, `green`, `rose`   |

These compose independently:

```
<html data-theme="blue">            → blue + light
<html data-theme="blue" class="dark"> → blue + dark
<html data-theme="rose">            → rose + light
<html data-theme="rose" class="dark"> → rose + dark
```

### CSS Variable Layers

Each color scheme overrides the same set of CSS variables. The `dark` class provides the dark variant.

```css
/* Default (blue) */
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

### State Management

`ScThemeManager` would manage two signals:

- `mode` — `'light' | 'dark' | 'system'` (existing)
- `colorScheme` — `'blue' | 'green' | 'rose' | ...` (new)

Both persisted independently to `localStorage`.

### Key Principles

1. **Same variable names everywhere** — components never reference a specific color scheme, only tokens like `--primary`.
2. **Mode and color are orthogonal** — changing one doesn't affect the other.
3. **CSS-only switching** — no JS needed to restyle; just swap the `data-theme` attribute and/or `dark` class.
4. **Extensible** — adding a new color scheme means adding one CSS block with light/dark variants. No component changes needed.
