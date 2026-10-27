# i18n

Angular's own i18n, translated in the browser: one build for every language. Templates are marked with `i18n` attributes (and `$localize` in code); `ng extract-i18n --format json` writes the messages; at start, the chosen language's translations are loaded before any of the app's code. `@angular/localize` is a peer of this entry (its `init` among the app's polyfills; no `localize` option in `angular.json`).

The library has no languages and no text of its own: the app lists its languages, writes its translations, and builds its switcher from `ScLanguages`.

## Setup

The app's languages:

```ts
// languages.ts
import type { ScLanguagesConfig } from '@semantic-components/ui/i18n';

export const LANGUAGES: ScLanguagesConfig = {
  sourceLanguage: 'en',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
  ],
  // For Angular's pipes (date, number…); each its own chunk.
  localeData: {
    fr: () => import('@angular/common/locales/fr'),
    ar: () => import('@angular/common/locales/ar'),
  },
};
```

`main.ts` loads the language, then imports the app — its templates read their translations when they first load:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { loadLanguage } from '@semantic-components/ui/i18n';
import { LANGUAGES } from './app/languages';

await loadLanguage(LANGUAGES);
const [{ App }, { appConfig }] = await Promise.all([import('./app/app'), import('./app/app.config')]);
await bootstrapApplication(App, appConfig);
```

The app's config gives them to `ScLanguages`, with the library's other settings:

```ts
providers: [provideScConfig({ preset: nova, languages: LANGUAGES })];
```

The translations, one file per language but the source one: `public/i18n/<code>.json`, as `ng extract-i18n --format json` writes them (`{ "locale": "fr", "translations": { … } }`). Copy the placeholders and plural forms from the extracted file. Another source: `loadTranslations: (code) => …` in the config.

## What `loadLanguage()` does

- **Picks** the language chosen before (`localStorage`, `storageKey`), else the first of the browser's languages offered (or its base: `fr` for `fr-CA`), else the source one. A stored code not offered is ignored.
- **Loads** its translations and locale data together; if either fails, the source language, with an error in the console. A message missing from a file shows the source text.
- **Sets** `<html lang>`, `<html dir>` (the language's `dir`; left out, `Intl.Locale#getTextInfo()`'s) and `$localize.locale`, before the app starts. Angular's `LOCALE_ID` follows `$localize.locale` — and the library's dates, numbers and calendars follow `LOCALE_ID`, with nothing to provide; the CDK's direction is right from the first render.

## ScLanguages

| Member           | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| `all`            | The languages offered                                                              |
| `current`        | The language in use                                                                |
| `dir`            | Its writing direction, `ltr` or `rtl`                                              |
| `switchTo(code)` | Keeps the choice and reloads the page; nothing for `current` or a code not offered |

A switcher of yours:

```html
<button scButton variant="ghost" (click)="languages.switchTo('fr')" lang="fr">Français</button>
```

## Limits

- Switching reloads the page: templates are translated once, when created.
- No language in the URL: the choice lives in `localStorage` — no per-language links or SEO.
- Missing translations are not checked at build time: check them in CI.
- In the browser. The server renders the source language, with nothing to do: `LOCALE_ID` falls back to Angular's `en-US`, `ScLanguages.current` to its base or the source language.
