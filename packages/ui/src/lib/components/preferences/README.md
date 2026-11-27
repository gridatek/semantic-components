# Preferences

A user's choices from fixed lists — list or grid, a density, a panel open — kept, and written as `data-*` attributes for your styles to follow. After ui-sdk's Preferences, on our `ScStorage`.

## Usage

```ts
// view.ts — declared once
export const view = definePreference({
  attribute: 'data-view',
  values: ['list', 'grid'],
  defaultValue: 'list',
  storageKey: 'app-view',
});
```

```ts
// any component or service
readonly view = injectPreference(view); // view.value(): 'list' | 'grid'; view.set('grid')
```

```html
<div [scPreferences]="[view]">
  <ul class="grid in-data-[view=grid]:grid-cols-2">
    …
  </ul>
</div>
```

## Parts

| Part                                     | What it does                                                                                                                                                                                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `definePreference(options)`              | Declares a preference: `attribute` (`data-…`), `values`, `defaultValue?` (left out: `undefined` until the user chooses, no attribute; `set(undefined)` forgets a choice), `storageKey?`, `global?` (on `<html>`). Its values' types are kept (`'list' \| 'grid'`) |
| `injectPreference(definition)`           | Its instance, the same everywhere in the app: `value()` (a signal), `set(value)` (false when not one of its values, or unchanged)                                                                                                                                 |
| `[scPreferences]` (`ScPreferencesApply`) | Writes each preference's attribute on its element — or on `<html>` for a `global` one — and keeps it up to date; removes it when it goes                                                                                                                          |

## Kept

- With a `storageKey`, through `ScStorage`: a cookie (a year, the whole site) copied to `localStorage`. The server reads the request's cookie, so a page rendered per request is drawn as the user left it, with no script. A prerendered page has no request: its default until the app starts.
- Another tab's choice comes through (the `storage` event).
- Without a `storageKey`: for the app's life.
- A saved value that isn't one of its `values` is ignored: the default.

## The library's own

- The user's first day of the week — `injectFirstDayOfWeek()`: `value()` is always a day (theirs once they pick, kept as `sc-first-day-of-week`; else the locale's), `set('mon')` keeps one. Calendars, pickers and the scheduler follow it before their own `firstDayOfWeek`. Offer it in your settings, its choices from `SC_DAYS_OF_WEEK`.
- The user's numbering system — `injectNumberingSystem()`: `value()` always one (`'latn'`, `'arab'`, `'arabext'`; theirs once they pick, kept as `sc-numbering-system`; else the locale's), `set()` keeps it. Its choices from `SC_NUMBERING_SYSTEMS`.
- The user's clock — `injectHourCycle()`: `value()` always one (`'h12'` 3:05 PM, `'h23'` 15:05; theirs once they pick, kept as `sc-hour-cycle`; else the locale's), `set()` keeps it. The time fields, the Time Clock and every time shown follow it before a part's own `hourCycle`. Its choices from `SC_HOUR_CYCLES` — show each by a time on that clock (`hourCycle` in `injectFormatDate()`'s options).

## Not here

The theme (light, dark, system): `ScPresetManager`. A choice that can be cancelled (`onValueChange`): the value is a signal — choose before you `set`. Session-only storage, a script for prerendered pages, client hints.
