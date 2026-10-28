# Storage

The user's choices — theme, sidebar, locale — kept as cookies: a server rendering a request can read them, so a page rendered per request (`RenderMode.Server`) is drawn as the user left it from the first paint, with no flash. A prerendered page has no request: it shows the defaults, then the browser applies the cookie.

Each choice is also copied to `localStorage`, read when the cookie isn't there — where browsers don't keep cookies: a page opened from `file://`, an app embedded in another site's iframe (`SameSite=Lax`).

## Import

```typescript
import { ScStorage, readStorage, writeStorage } from '@semantic-components/ui';
```

## API

### ScStorage — a service

| Member             | Description                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `get(name)`        | The choice, or `null`: in the browser its cookie, else its `localStorage` copy; on the server the request's `Cookie`   |
| `set(name, value)` | A cookie for a year, for the whole site (`path=/`, `SameSite=Lax`), and its `localStorage` copy; nothing on the server |

### readStorage(name), writeStorage(name, value)

The same, in the browser, for code that runs before the app (no injector) — like `loadLocale()`.

## Used by

- `ScThemeManager`: `sc-theme-mode`, `sc-theme-color` (`SC_THEME_CONFIG`'s `modeStorageKey`, `colorSchemeStorageKey`).
- `ScSidebarProvider`: `sc-sidebar-state` (its `storageKey` input).
- `ScI18n` / `loadLocale()`: `sc-locale` (the config's `storageKey`).
