# Theme

Configurable theme management with mode switching (light/dark/system) and color scheme support. Consumers provide their own styles.

## Architecture

- **`ScThemeManager`** — Singleton service managing two independent axes: mode (light/dark/system) and color scheme. Handles persistence and system preference detection.
- **`SC_THEME_CONFIG`** — Injection token for customizing defaults and storage keys.

## Usage

No part of its own: any control calls the manager.

### One click (light ⇄ dark)

```html
<button scButton variant="outline" size="icon" (click)="themeManager.toggleMode()">
  @if (themeManager.isDark()) {
  <svg siSunIcon></svg>
  <span class="sr-only">Switch to light theme</span>
  } @else {
  <svg siMoonIcon></svg>
  <span class="sr-only">Switch to dark theme</span>
  }
</button>
```

### A menu: Light, Dark, System

The way back to the OS's theme, which a one-click button loses. The Menu's radio items, the mode as their value:

```html
<div scMenuProvider align="end">
  <button scButton scMenuTrigger variant="outline" size="icon">
    <svg siSunIcon></svg>
    <span class="sr-only">Theme</span>
  </button>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuRadioGroup [value]="themeManager.mode()" (valueChange)="setMode($event)">
          <div scMenuRadioItem value="light">…Light</div>
          <div scMenuRadioItem value="dark">…Dark</div>
          <div scMenuRadioItem value="system">…System</div>
        </div>
      </ng-template>
    </div>
  </ng-template>
</div>
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

| Option                  | Type          | Default            | Description                    |
| ----------------------- | ------------- | ------------------ | ------------------------------ |
| `defaultMode`           | `ScThemeMode` | `'system'`         | Initial mode                   |
| `defaultColorScheme`    | `string`      | `'default'`        | Initial color scheme           |
| `modeStorageKey`        | `string`      | `'sc-theme-mode'`  | Where the mode is kept         |
| `colorSchemeStorageKey` | `string`      | `'sc-theme-color'` | Where the color scheme is kept |

## Persistence

Mode and color scheme are kept apart (each a cookie, copied to `localStorage` — see [storage](../../utilities/storage/README.md)) and restored on page load — read on the server too, when a route is rendered per request, so a dark page is drawn dark from the first paint. (`system` needs the browser: the server draws it light.)

## Accessibility

Consumers are responsible for providing accessible labels, either via `sr-only` spans inside the button or `aria-label` on the button element.
