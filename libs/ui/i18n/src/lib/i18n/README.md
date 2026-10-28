# i18n

Angular's own i18n, translated in the browser: one build for every locale. Templates are marked with `i18n` attributes (and `$localize` in code); `ng extract-i18n --format json` writes the messages; at start, the chosen locale's translations are loaded before any of the app's code. `@angular/localize` is a peer of this entry (its `init` among the app's polyfills; no `localize` option in `angular.json`).

The library has no locales and no text of its own: the app lists its locales, writes its translations, and builds its switcher from `ScI18n`.

## Setup

The app's locales:

```ts
// i18n.ts
import type { ScI18nConfig } from '@semantic-components/ui/i18n';

export const I18N: ScI18nConfig = {
  sourceLocale: 'en',
  locales: [
    { id: 'en', label: 'English' },
    { id: 'fr', label: 'Français' },
    { id: 'ar', label: 'العربية', dir: 'rtl' },
  ],
  // For Angular's pipes (date, number…); each its own chunk.
  localeData: {
    fr: () => import('@angular/common/locales/fr'),
    ar: () => import('@angular/common/locales/ar'),
  },
};
```

`main.ts` loads the locale, then imports the app — its templates read their translations when they first load:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { loadLocale } from '@semantic-components/ui/i18n';
import { I18N } from './app/i18n';

await loadLocale(I18N);
const [{ App }, { appConfig }] = await Promise.all([import('./app/app'), import('./app/app.config')]);
await bootstrapApplication(App, appConfig);
```

The app's config gives them to `ScI18n`, with the library's other settings:

```ts
providers: [provideScConfig({ preset: nova, i18n: I18N })];
```

The translations, one file per locale but the source one: `public/i18n/<id>.json`, as `ng extract-i18n --format json` writes them (`{ "locale": "fr", "translations": { … } }`). Copy the placeholders and plural forms from the extracted file. Another source: `loadTranslations: (id) => …` in the config.

## What `loadLocale()` does

- **Picks** the locale chosen before (`storageKey`, `sc-locale` by default: a cookie, copied to `localStorage`), else the first of the browser's languages offered (or its base: `fr` for `fr-CA`), else the source one. A stored ID not offered is ignored.
- **Loads** its translations and locale data together; if either fails, the source locale, with an error in the console. A message missing from a file shows the source text.
- **Sets** `<html lang>`, `<html dir>` (the locale's `dir`; left out, `Intl.Locale#getTextInfo()`'s) and `$localize.locale`, before the app starts. Angular's `LOCALE_ID` follows `$localize.locale` — and the library's dates, numbers and calendars follow `LOCALE_ID`, with nothing to provide; the CDK's direction is right from the first render.

## ScI18n

| Member          | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `locales`       | The locales offered                                                              |
| `locale`        | The locale in use                                                                |
| `dir`           | Its writing direction, `ltr` or `rtl`                                            |
| `setLocale(id)` | Keeps the choice and reloads the page; nothing for `locale` or an ID not offered |

A switcher of yours:

```html
<button scButton variant="ghost" (click)="i18n.setLocale('fr')" lang="fr">Français</button>
```

## Limits

- Switching reloads the page: templates are translated once, when created.
- No locale in the URL: the choice lives in a cookie — no per-locale links or SEO.
- Missing translations are not checked at build time: check them in CI.
- In the browser. A server renders the source locale: Angular evaluates a component's messages once per process (when it first creates its template), so one server can't render requests in different locales. Server-rendered locales need Angular's build-time i18n — a build per locale.
