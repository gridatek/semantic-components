# Cookies

The user's choices — theme, sidebar, locale — kept as cookies rather than in `localStorage`: a server rendering a request can read them, so a page rendered per request (`RenderMode.Server`) is drawn as the user left it from the first paint, with no flash. A prerendered page has no request: it shows the defaults, then the browser applies the cookie.

## Import

```typescript
import { ScCookies, readCookie } from '@semantic-components/ui';
```

## API

### ScCookies — a service

| Member             | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `get(name)`        | The cookie's value, or `null`: `document.cookie` in the browser, the request's `Cookie` on the server |
| `set(name, value)` | Kept a year, for the whole site (`path=/`, `SameSite=Lax`); nothing on the server                     |

### readCookie(cookies, name)

A cookie's value in a `Cookie` header or `document.cookie`, or `null` — for code that runs before the app (no injector), like `loadLocale()`.

## Used by

- `ScThemeManager`: `sc-theme-mode`, `sc-theme-color` (`SC_THEME_CONFIG`'s `modeCookie`, `colorSchemeCookie`).
- `ScSidebarProvider`: `sc-sidebar-state` (its `cookie` input).
- `ScI18n` / `loadLocale()`: `sc-locale` (the config's `cookie`).
