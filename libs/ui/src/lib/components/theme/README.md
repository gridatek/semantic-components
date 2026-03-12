# Theme

Configurable theme management with mode switching (light/dark/system) and color scheme support. Consumers provide their own styles.

## Architecture

- **`ScThemeManager`** — Singleton service managing two independent axes: mode (light/dark/system) and color scheme. Handles persistence and system preference detection.
- **`ScThemeModeToggle`** — A behavior-only directive that toggles mode on click. No styles — consumers compose it with their own styling (e.g., `ScButton`, `ScSidebarMenuButton`, or plain Tailwind classes).
- **`SC_THEME_CONFIG`** — Injection token for customizing defaults and storage keys.

## Usage

### With ScButton

```html
<button scButton scThemeModeToggle variant="outline" size="icon" #toggle="scThemeModeToggle">
  @if (toggle.isDark()) {
  <svg siSunIcon></svg>
  <span class="sr-only">Switch to light theme</span>
  } @else {
  <svg siMoonIcon></svg>
  <span class="sr-only">Switch to dark theme</span>
  }
</button>
```

### With custom classes

```html
<button scThemeModeToggle #toggle="scThemeModeToggle" class="hover:bg-accent rounded-full p-2">
  @if (toggle.isDark()) {
  <svg siSunIcon></svg>
  <span class="sr-only">Switch to light theme</span>
  } @else {
  <svg siMoonIcon></svg>
  <span class="sr-only">Switch to dark theme</span>
  }
</button>
```

### Using ScThemeManager directly

```typescript
import { ScThemeManager } from '@semantic-components/ui';

export class MyComponent {
  private themeManager = inject(ScThemeManager);

  mode = this.themeManager.mode; // Signal<ScThemeMode>
  resolvedMode = this.themeManager.resolvedMode; // Signal<'light' | 'dark'>
  isDark = this.themeManager.isDark; // Signal<boolean>
  isLight = this.themeManager.isLight; // Signal<boolean>
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
import { SC_THEME_CONFIG } from '@semantic-components/ui';

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

## ScThemeModeToggle

Behavior-only directive. Toggles mode on click. Consumers handle accessibility via `sr-only` spans or `aria-label`.

**Selector:** `button[scThemeModeToggle]` | **Export:** `scThemeModeToggle`

| Public Property | Type              | Description                  |
| --------------- | ----------------- | ---------------------------- |
| `isDark`        | `Signal<boolean>` | Whether dark mode is active  |
| `isLight`       | `Signal<boolean>` | Whether light mode is active |

**Host bindings:**

- `(click)` — calls `toggleMode()`

## ScThemeManager

Singleton service for theme state.

| Property       | Type                        | Description                              |
| -------------- | --------------------------- | ---------------------------------------- |
| `mode`         | `Signal<ScThemeMode>`       | Current mode ('light', 'dark', 'system') |
| `resolvedMode` | `Signal<'light' \| 'dark'>` | Actual applied mode (resolves 'system')  |
| `isDark`       | `Signal<boolean>`           | Whether dark mode is currently active    |
| `isLight`      | `Signal<boolean>`           | Whether light mode is currently active   |
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

Consumers are responsible for providing accessible labels, either via `sr-only` spans inside the button or `aria-label` on the button element.
