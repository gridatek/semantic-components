# Theme Toggle

A behavior-only directive for toggling themes, paired with a configurable service for theme state management. Consumers provide their own styles.

## Architecture

- **`ScThemeManager`** — Singleton service managing two independent axes: mode (light/dark/system) and color scheme. Handles persistence and system preference detection.
- **`ScThemeToggle`** — A directive that adds toggle behavior and ARIA attributes to a `<button>`. No styles — consumers compose it with their own styling (e.g., `ScButton`, `ScSidebarMenuButton`, or plain Tailwind classes).
- **`SC_THEME_CONFIG`** — Injection token for customizing defaults and storage keys.

## Usage

### With ScButton

```html
<button scButton scThemeToggle variant="outline" size="icon" #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg siSunIcon></svg>
  } @else {
  <svg siMoonIcon></svg>
  }
</button>
```

### With custom classes

```html
<button scThemeToggle #toggle="scThemeToggle" class="hover:bg-accent rounded-full p-2">
  @if (toggle.isDark()) {
  <svg siSunIcon></svg>
  } @else {
  <svg siMoonIcon></svg>
  }
</button>
```

### Using ScThemeManager directly

```typescript
import { ScThemeManager } from '@semantic-components/ui-lab';

export class MyComponent {
  private themeManager = inject(ScThemeManager);

  mode = this.themeManager.mode; // Signal<ScThemeMode>
  resolvedMode = this.themeManager.resolvedMode; // Signal<'light' | 'dark'>
  isDark = this.themeManager.isDark; // Signal<boolean>
  colorScheme = this.themeManager.colorScheme; // Signal<string>

  setDark() {
    this.themeManager.setMode('dark');
  }

  toggle() {
    this.themeManager.toggleMode();
  }

  setColorScheme() {
    this.themeManager.setColorScheme('rose');
  }
}
```

### Custom configuration

```typescript
import { SC_THEME_CONFIG } from '@semantic-components/ui-lab';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: SC_THEME_CONFIG,
      useValue: {
        defaultMode: 'dark',
        defaultColorScheme: 'blue',
        modeStorageKey: 'my-app-mode',
        colorSchemeStorageKey: 'my-app-color',
      },
    },
  ],
});
```

## ScThemeToggle

Behavior-only directive. Toggles mode on click, manages ARIA attributes.

**Selector:** `button[scThemeToggle]` | **Export:** `scThemeToggle`

| Public Property | Type              | Description                 |
| --------------- | ----------------- | --------------------------- |
| `isDark`        | `Signal<boolean>` | Whether dark mode is active |

**Host bindings:**

- `aria-label` — "Switch to light/dark theme"
- `aria-pressed` — reflects `isDark()`
- `(click)` — calls `toggleMode()`

## ScThemeManager

Singleton service for theme state.

| Property       | Type                        | Description                              |
| -------------- | --------------------------- | ---------------------------------------- |
| `mode`         | `Signal<ScThemeMode>`       | Current mode ('light', 'dark', 'system') |
| `resolvedMode` | `Signal<'light' \| 'dark'>` | Actual applied mode (resolves 'system')  |
| `isDark`       | `Signal<boolean>`           | Whether dark mode is currently active    |
| `colorScheme`  | `Signal<string>`            | Current color scheme                     |

| Method           | Parameters            | Description                   |
| ---------------- | --------------------- | ----------------------------- |
| `setMode`        | `mode: ScThemeMode`   | Set the mode explicitly       |
| `toggleMode`     | none                  | Toggle between light and dark |
| `setColorScheme` | `colorScheme: string` | Set the color scheme          |

## SC_THEME_CONFIG

Injection token for overriding defaults.

| Option                  | Type          | Default            | Description                |
| ----------------------- | ------------- | ------------------ | -------------------------- |
| `defaultMode`           | `ScThemeMode` | `'system'`         | Initial mode               |
| `defaultColorScheme`    | `string`      | `'default'`        | Initial color scheme       |
| `modeStorageKey`        | `string`      | `'sc-theme-mode'`  | localStorage key for mode  |
| `colorSchemeStorageKey` | `string`      | `'sc-theme-color'` | localStorage key for color |

## Persistence

Mode and color scheme are persisted independently to `localStorage` and restored on page load.

## Accessibility

- `aria-label` describes the toggle action
- `aria-pressed` indicates current state
- Full keyboard navigation support
