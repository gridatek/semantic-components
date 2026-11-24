# Storage

The user's choices — theme, sidebar, locale — kept as cookies: a server rendering a request can read them, so a page rendered per request (`RenderMode.Server`) is drawn as the user left it from the first paint, with no flash. A prerendered page has no request: it shows the defaults, then the browser applies the cookie.

Each choice is also copied to `localStorage`, read when the cookie isn't there — where browsers don't keep cookies: a page opened from `file://`, an app embedded in another site's iframe (`SameSite=Lax`).

Every name starts with the setup's prefix, `sc` by default — `get('mode')` reads `sc-mode` — so two apps on one domain keep theirs apart:

```typescript
provideSemanticComponents({ storagePrefix: 'myapp' }); // myapp-mode, myapp-sidebar-state…
```

No dash in the prefix: the library adds it.

## Import

```typescript
import { ScStorage, readStorage, writeStorage } from '@semantic-components/ui';
```

## API

### ScStorage — a service

| Member             | Description                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `get(name)`        | The choice, or `null`: in the browser its cookie, else its `localStorage` copy; on the server the request's `Cookie`   |
| `key(name)`        | Its cookie and `localStorage` name, prefixed: what a `storage` event's `key` is                                        |
| `set(name, value)` | A cookie for a year, for the whole site (`path=/`, `SameSite=Lax`), and its `localStorage` copy; nothing on the server |

### readStorage(name, prefix?), writeStorage(name, value, prefix?)

The same, in the browser, for code that runs before the app (no injector) — like `loadLocale()`. The setup isn't there yet: give its `storagePrefix` if it has one (`sc` by default).

## Used by

With the default prefix:

- `ScThemeManager`: `sc-mode`, `sc-theme` (the user's mode and theme; the preset's apply until they pick).
- `ScSidebarProvider`: `sc-sidebar-state` (its `storageKey` input: `sidebar-state`).
- `ScI18n` / `loadLocale()`: `sc-locale`.
- `ScPreferences`: `sc-<storageKey>`.
