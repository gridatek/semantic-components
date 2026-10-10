# Autocomplete Components

A text input with a filtered suggestion list in an overlay popup. Built on the `@angular/aria` combobox pattern for an editable combobox: the `<input>` itself is the combobox, focus stays in it while typing, and the active suggestion is announced through `aria-activedescendant`.

## Features

- Type to open and filter; full keyboard navigation
- ARIA-compliant (`role="combobox"` + `aria-autocomplete="list"` input, `role="listbox"` popup)
- Signal Forms control — bind `[formField]` on `scAutocomplete` (the input's text, `string`)
- Picking a suggestion writes its label into the input and closes the popup
- Automatic scroll-to-active on keyboard navigation
- Overlay positioning with CDK, matching the width of the `scAutocomplete` element
- Customizable styling via `class` input on every part

## Components

| Component                     | Selector                            | Aria Primitive               | Responsibility                                                |
| ----------------------------- | ----------------------------------- | ---------------------------- | ------------------------------------------------------------- |
| `ScAutocomplete`              | `div[scAutocomplete]`               | `ComboboxPopup` (template)   | Root; the form control (`FormValueControl<string>`), overlay  |
| `ScAutocompleteInput`         | `input[scAutocompleteInput]`        | `Combobox` (hostDirective)   | The editable combobox                                         |
| `ScAutocompletePortal`        | `ng-template[scAutocompletePortal]` | —                            | Marks the lazy popup content                                  |
| `ScAutocompletePopup`         | `div[scAutocompletePopup]`          | —                            | Popup container with styling                                  |
| `ScAutocompleteList`          | `div[scAutocompleteList]`           | `Listbox` + `ComboboxWidget` | Suggestion list                                               |
| `ScAutocompleteItem`          | `div[scAutocompleteItem]`           | `Option` (hostDirective)     | Suggestion                                                    |
| `ScAutocompleteItemLabel`     | `span[scAutocompleteItemLabel]`     | —                            | Label text inside an item (`flex-1`)                          |
| `ScAutocompleteItemIndicator` | `svg[scAutocompleteItemIndicator]`  | —                            | Check icon for the selected suggestion (`aria-hidden="true"`) |
| `ScAutocompleteEmpty`         | `div[scAutocompleteEmpty]`          | —                            | Empty state when nothing matches                              |
| `ScAutocompleteClear`         | `button[scAutocompleteClear]`       | —                            | Clears the text; hidden while empty                           |

## Usage

The popup is anchored to the `scAutocomplete` element, so wrap the input in whatever chrome you need (e.g. an input group with a search icon) inside it.

```html
<div scAutocomplete class="w-52" [formField]="searchForm.query">
  <div scInputGroup>
    <div scInputGroupAddon align="inline-start">
      <svg siSearchIcon></svg>
    </div>
    <input scInput scAutocompleteInput aria-label="Select a country" placeholder="Select a country" />
    <div scInputGroupAddon align="inline-end">
      <button scAutocompleteClear aria-label="Clear"><svg siXIcon></svg></button>
    </div>
  </div>
  <ng-template scAutocompletePortal>
    <div scAutocompletePopup>
      @if (countries().length === 0) {
      <div scAutocompleteEmpty>No results found</div>
      }
      <div scAutocompleteList>
        @for (country of countries(); track country) {
        <div scAutocompleteItem [value]="country" [label]="country">
          <span scAutocompleteItemLabel>{{ country }}</span>
          <svg siCheckIcon scAutocompleteItemIndicator></svg>
        </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

```typescript
readonly formModel = signal({ query: '' });
readonly searchForm = form(this.formModel);

readonly countries = computed(() => {
  const query = this.searchForm.query().value().toLowerCase();
  return ALL_COUNTRIES.filter((c) => c.toLowerCase().startsWith(query));
});
```

Filtering is yours: the form value is the input's text, so derive the suggestions from it. Without Signal Forms, use `[(value)]` on `scAutocomplete`.

### Clear button

`ScAutocompleteClear` empties the text, closes the popup and returns focus to the input. It hides itself while the input is empty (or the autocomplete is disabled/readonly). The icon is yours — project any `<svg>` — and give the button an `aria-label`.

> Put `[formField]` on `scAutocomplete`, not on the `<input>`. The Aria combobox owns the input's text; binding the input directly would give it two writers.

## Signal Forms

`ScAutocomplete` implements `FormValueControl<string>`. Declare constraints in the `form()` schema:

```typescript
readonly searchForm = form(this.formModel, (p) => {
  required(p.query);
});
```

`required` → `aria-required`, `invalid` (once touched) → `aria-invalid`, `disabled` → `aria-disabled` on the input. The control is marked touched when focus leaves the input.

## Keyboard Navigation

Focus always stays in the input.

| Key                  | Closed               | Open                               |
| -------------------- | -------------------- | ---------------------------------- |
| Printable characters | Edit text, open      | Edit text, filter                  |
| `ArrowDown`          | Open                 | Next suggestion                    |
| `ArrowUp`            | —                    | Previous suggestion                |
| `Home` / `End`       | Caret to start / end | First / last suggestion            |
| `Enter`              | —                    | Write the active suggestion, close |
| `Escape`             | —                    | Close, keep the text               |
| `Tab`                | Move focus           | Close and move focus               |

## API Reference

### ScAutocomplete

| Member          | Type              | Description                                |
| --------------- | ----------------- | ------------------------------------------ |
| `value`         | `model<string>`   | The input's text                           |
| `disabled`      | `input<boolean>`  | Disables the input                         |
| `readonly`      | `input<boolean>`  | Makes the input read-only                  |
| `required`      | `input<boolean>`  | Sets `aria-required` on the input          |
| `invalid`       | `input<boolean>`  | Sets `aria-invalid` on the input           |
| `touch`         | `output<void>`    | Emitted when focus leaves the input        |
| `open()`        | `Signal<boolean>` | Whether the popup is open                  |
| `select(value)` | `void`            | Write an option's label, close, keep focus |
| `clear()`       | `void`            | Empty the text, close, keep focus          |
| `close()`       | `void`            | Close and refocus the input                |
| `focus()`       | `void`            | Focus the input                            |
| `class`         | `input<string>`   | Additional CSS classes                     |

### ScAutocompleteItem

| Property   | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| `value`    | `string`  | The option's value                                         |
| `label`    | `string`  | Text written into the input when picked (defaults to text) |
| `disabled` | `boolean` | Disables the option                                        |
| `class`    | `string`  | Additional CSS classes                                     |

All other parts accept a `class` input only.

## Architecture

```
ScAutocomplete (form control, exportAs: 'scAutocomplete', provides SC_AUTOCOMPLETE, overlay origin)
├── ScAutocompleteInput (Combobox host, role=combobox) [projected]
├── ScAutocompleteClear (clear button) [projected]
└── ScAutocompletePortal (ng-template, rendered inside ngComboboxPopup via ScSelectPortalOutlet)
    └── ScAutocompletePopup
        ├── ScAutocompleteEmpty
        └── ScAutocompleteList (Listbox + ComboboxWidget; activedescendant focus, explicit selection)
            └── ScAutocompleteItem (Option) → ScAutocompleteItemLabel, ScAutocompleteItemIndicator
```

## Known issue

`@angular/aria` 22.2.1 forwards navigation keys from the input to the list once per render (`Combobox` relays through an `afterRenderEffect`). Keys arriving within the same frame are coalesced and only the last one is applied. Text entry itself is unaffected.

## Dependencies

- `@angular/aria/combobox` - Combobox behavior
- `@angular/aria/listbox` - Listbox and option behavior
- `@angular/cdk/overlay` - Overlay positioning
- `@angular/forms/signals` - `FormValueControl` contract
