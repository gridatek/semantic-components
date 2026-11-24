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

| Part                                     | What it does                                                                                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `definePreference(options)`              | Declares a preference: `attribute` (`data-…`), `values`, `defaultValue`, `storageKey?`, `global?` (on `<html>`). Its values' types are kept (`'list' \| 'grid'`) |
| `injectPreference(definition)`           | Its instance, the same everywhere in the app: `value()` (a signal), `set(value)` (false when not one of its values, or unchanged)                                |
| `[scPreferences]` (`ScPreferencesApply`) | Writes each preference's attribute on its element — or on `<html>` for a `global` one — and keeps it up to date; removes it when it goes                         |

## Kept

- With a `storageKey`, through `ScStorage`: a cookie (a year, the whole site) copied to `localStorage`. The server reads the request's cookie, so a page rendered per request is drawn as the user left it, with no script. A prerendered page has no request: its default until the app starts.
- Another tab's choice comes through (the `storage` event).
- Without a `storageKey`: for the app's life.
- A saved value that isn't one of its `values` is ignored: the default.

## Not here

The theme (light, dark, system): `ScPresetManager`. A choice that can be cancelled (`onValueChange`): the value is a signal — choose before you `set`. Session-only storage, a script for prerendered pages, client hints.
