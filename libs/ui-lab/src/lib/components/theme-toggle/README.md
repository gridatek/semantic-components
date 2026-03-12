# Theme Toggle

A behavior-only directive for toggling themes, paired with a service for theme state management. Consumers provide their own styles.

## Architecture

- **`ScTheme`** — Singleton service that owns theme state, persistence, and system preference detection.
- **`ScThemeToggle`** — A directive that adds toggle behavior and ARIA attributes to a `<button>`. No styles — consumers compose it with their own styling (e.g., `ScButton`, `ScSidebarMenuButton`, or plain Tailwind classes).

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

### Using ScTheme service directly

```typescript
import { ScTheme } from '@semantic-components/ui-lab';

export class MyComponent {
  private theme = inject(ScTheme);

  currentTheme = this.theme.theme; // Signal<'light' | 'dark' | 'system'>
  resolvedTheme = this.theme.resolvedTheme; // Signal<'light' | 'dark'>
  isDark = this.theme.isDark; // Signal<boolean>

  setDark() {
    this.theme.setTheme('dark');
  }

  toggle() {
    this.theme.toggleTheme();
  }
}
```

## ScThemeToggle

Behavior-only directive. Toggles theme on click, manages ARIA attributes.

**Selector:** `button[scThemeToggle]` | **Export:** `scThemeToggle`

| Public Property | Type              | Description                  |
| --------------- | ----------------- | ---------------------------- |
| `isDark`        | `Signal<boolean>` | Whether dark theme is active |

**Host bindings:**

- `aria-label` — "Switch to light/dark theme"
- `aria-pressed` — reflects `isDark()`
- `(click)` — calls `toggleTheme()`

## ScTheme

Singleton service for theme state.

| Property        | Type                        | Description                                 |
| --------------- | --------------------------- | ------------------------------------------- |
| `theme`         | `Signal<Theme>`             | Current setting ('light', 'dark', 'system') |
| `resolvedTheme` | `Signal<'light' \| 'dark'>` | Actual applied theme (resolves 'system')    |
| `isDark`        | `Signal<boolean>`           | Whether dark theme is currently active      |

| Method        | Parameters     | Description                   |
| ------------- | -------------- | ----------------------------- |
| `setTheme`    | `theme: Theme` | Set the theme explicitly      |
| `toggleTheme` | none           | Toggle between light and dark |

## Persistence

Theme preference is persisted to `localStorage` under `sc-theme` and restored on page load.

## Accessibility

- `aria-label` describes the toggle action
- `aria-pressed` indicates current state
- Full keyboard navigation support
