# Storage

The user's choices — theme, sidebar, locale — kept as cookies: a server rendering a request can read them, so a page rendered per request (`RenderMode.Server`) is drawn as the user left it from the first paint, with no flash. A prerendered page has no request: it shows the defaults, then the browser applies the cookie.

Each choice is also copied to `localStorage`, read when the cookie isn't there — where browsers don't keep cookies: a page opened from `file://`, an app embedded in another site's iframe (`SameSite=Lax`).

That copy is also how a choice reaches the user's other tabs: when `localStorage` changes, the browser tells every other tab of the site (the `storage` event), and `watch()` hands the new value on. Change the mode in one tab, and the others turn dark at once.

## Import

```typescript
import { ScStorage, readStorage, writeStorage } from '@semantic-components/ui';
```

## API

### ScStorage — a service

| Member                  | Description                                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `get(name)`             | The choice, or `null`: in the browser its cookie, else its `localStorage` copy; on the server the request's `Cookie`                          |
| `set(name, value)`      | A cookie for a year, for the whole site (`path=/`, `SameSite=Lax`), and its `localStorage` copy; nothing on the server                        |
| `remove(name)`          | Forgets the choice: its cookie and its copy                                                                                                   |
| `watch(name, onChange)` | Another tab changed the choice: `onChange(value)` (`null`: forgotten, or the storage cleared). Returns the way to stop; nothing on the server |

### readStorage(name), writeStorage(name, value)

The same, in the browser, for code that runs before the app (no injector) — like `loadLocale()`.

## Used by

- `ScPresetManager`: `sc-mode`, `sc-theme` (the user's mode and theme; the preset's apply until they pick) — followed across tabs.
- `ScPreferences`: each preference's `storageKey` (the week's first day: `sc-first-day-of-week`; the numbering system: `sc-numbering-system`) — followed across tabs.
- `ScSidebarProvider`: `sc-sidebar-state` (its `storageKey` input) — not followed across tabs: the layout is the tab's own; another tab opens with the last one kept.
- `ScI18n` / `loadLocale()`: `sc-locale` (the config's `storageKey`) — not followed across tabs: changing it reloads the page, which would lose another tab's work (a form being typed); the others take it at their next load.
