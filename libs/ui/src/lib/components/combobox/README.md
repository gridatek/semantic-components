# Combobox

A select with a search box: the trigger opens a dialog popup that holds a search input and a filtered list. Built on the `@angular/aria` "combobox with dialog popup" pattern — the trigger is a non-editable combobox whose popup is a dialog, and the search box inside it is a second (editable, always-expanded) combobox that drives the list through `aria-activedescendant`.

## Features

- Single tab stop on the trigger; opening moves focus into the search box, closing returns it
- Type to filter, arrows to move, Enter or click to pick
- ARIA-compliant (`role="combobox"` + `aria-haspopup="dialog"` trigger, `role="dialog"` popup, `role="combobox"` search, `role="listbox"` list)
- Signal Forms control — bind `[formField]` on `scCombobox` (the selected option's value, `string`)
- Search text resets on every open
- Optional clear button
- Overlay positioning with CDK, flips above when there is no room below
- Icons are yours — every icon is an `<svg>` in your template

## Components

| Component                 | Selector                               | Aria Primitive               | Responsibility                                                    |
| ------------------------- | -------------------------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `ScCombobox`              | `div[scCombobox]`                      | `ComboboxPopup` (template)   | Root; the form control (`FormValueControl<string>`), owns overlay |
| `ScComboboxTrigger`       | `[scComboboxTrigger]`                  | `Combobox` (hostDirective)   | The focusable trigger, overlay origin                             |
| `ScComboboxValue`         | `[scComboboxValue]`                    | —                            | Selected label, or the placeholder                                |
| `ScComboboxIcon`          | `svg[scComboboxIcon]`                  | —                            | Icon styling in the trigger                                       |
| `ScComboboxClear`         | `button[scComboboxClear]`              | —                            | Clears the selection; hidden while empty                          |
| `ScComboboxPortal`        | `ng-template[scComboboxPortal]`        | —                            | Marks the lazy popup content                                      |
| `ScComboboxPopup`         | `div[scComboboxPopup]`                 | `ComboboxWidget`             | The dialog; renders the list container after its content          |
| `ScComboboxSearch`        | `input[scComboboxSearch]`              | `Combobox` (hostDirective)   | Search box; focused on open; `[(value)]` is the search text       |
| `ScComboboxListContainer` | `ng-template[scComboboxListContainer]` | —                            | Marks the list template, connected to the search box              |
| `ScComboboxList`          | `div[scComboboxList]`                  | `Listbox` + `ComboboxWidget` | The options list                                                  |
| `ScComboboxItem`          | `div[scComboboxItem]`                  | `Option` (hostDirective)     | Option                                                            |
| `ScComboboxItemLabel`     | `[scComboboxItemLabel]`                | —                            | Label text inside an item                                         |
| `ScComboboxItemIndicator` | `svg[scComboboxItemIndicator]`         | —                            | Check icon on the selected option                                 |
| `ScComboboxEmpty`         | `div[scComboboxEmpty]`                 | —                            | Empty state when nothing matches                                  |

## Usage

```html
<div scCombobox class="w-60" [formField]="countryForm.country" placeholder="Select a country...">
  <div scComboboxTrigger aria-label="Country">
    <span scComboboxValue></span>
    <svg scComboboxIcon siChevronsUpDownIcon></svg>
  </div>
  <button scComboboxClear aria-label="Clear selection"><svg siXIcon></svg></button>

  <ng-template scComboboxPortal>
    <div scComboboxPopup>
      <div scInputGroup>
        <div scInputGroupAddon align="inline-start"><svg siSearchIcon></svg></div>
        <input scInput scComboboxSearch aria-label="Search countries" placeholder="Search..." [(value)]="search" />
      </div>
      <ng-template scComboboxListContainer>
        @if (options().length === 0) {
        <div scComboboxEmpty>No results found</div>
        }
        <div scComboboxList>
          @for (option of options(); track option.value) {
          <div scComboboxItem [value]="option.value" [label]="option.label">
            <span scComboboxItemLabel>{{ option.label }}</span>
            <svg siCheckIcon scComboboxItemIndicator></svg>
          </div>
          }
        </div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

```typescript
readonly countryForm = form(signal({ country: '' }));
readonly search = signal('');
readonly options = computed(() =>
  ALL_COUNTRIES.filter((c) => c.label.toLowerCase().startsWith(this.search().toLowerCase())),
);
```

Filtering is yours: derive the options from the search text. Without Signal Forms, use `[(value)]` on `scCombobox`.

### Rules

- `scComboboxSearch` must come **before** `scComboboxListContainer` inside the popup — the list is wired to it.
- Put `scComboboxClear` next to the trigger, **not inside it** (a button inside a combobox is invalid nesting). It positions itself over the trigger's end; the trigger reserves the space.
- The popup is named after the trigger's `aria-label`. Give `scComboboxPopup` its own `aria-label` to override.

### Custom value rendering

Project content into `ScComboboxValue` to render the selection yourself (shown only when something is selected):

```html
<span scComboboxValue>@if (selectedCountry(); as c) { {{ c.code }} {{ c.dialCode }} }</span>
```

> The popup is rendered lazily, so an option's label is only known after the list has been opened once. Until then the default `ScComboboxValue` shows the raw value — project content if an initial value must show its label.

## Signal Forms

`ScCombobox` implements `FormValueControl<string>`. Declare constraints in the `form()` schema:

```typescript
readonly countryForm = form(this.model, (p) => {
  required(p.country);
});
```

`required` → `aria-required`, `invalid` (once touched) → `aria-invalid`, `disabled` → `aria-disabled` on the trigger. The control is marked touched when focus leaves the trigger.

## Keyboard Navigation

| Where   | Key                       | Action                                         |
| ------- | ------------------------- | ---------------------------------------------- |
| Trigger | `Enter` / `Space` / `↓`   | Open; focus moves to the search box            |
| Search  | Printable characters      | Edit the search text                           |
| Search  | `ArrowDown` / `ArrowUp`   | Move the active option                         |
| Search  | `Enter`                   | Pick the active option, close, refocus trigger |
| Search  | `Escape`                  | Close, refocus the trigger                     |
| Popup   | `Tab` out / click outside | Close                                          |

## API Reference

### ScCombobox

| Member            | Type              | Description                                      |
| ----------------- | ----------------- | ------------------------------------------------ |
| `value`           | `model<string>`   | Selected option value (`''` when none)           |
| `placeholder`     | `input<string>`   | Shown by `ScComboboxValue` when nothing selected |
| `disabled`        | `input<boolean>`  | Disables the combobox                            |
| `readonly`        | `input<boolean>`  | Prevents opening/changing                        |
| `required`        | `input<boolean>`  | Sets `aria-required` on the trigger              |
| `invalid`         | `input<boolean>`  | Sets `aria-invalid` on the trigger               |
| `touch`           | `output<void>`    | Emitted when focus leaves the trigger            |
| `open()`          | `Signal<boolean>` | Whether the popup is open                        |
| `selectedLabel()` | `Signal<string>`  | Label of the selected option (or its value)      |
| `select(value)`   | `void`            | Select a value, close, refocus the trigger       |
| `clear()`         | `void`            | Clear the selection, focus the trigger           |
| `close()`         | `void`            | Close and refocus the trigger                    |
| `focus()`         | `void`            | Focus the trigger                                |

### ScComboboxSearch

| Property | Type            | Description                                  |
| -------- | --------------- | -------------------------------------------- |
| `value`  | `model<string>` | The search text; reset to `''` on every open |

### ScComboboxItem

| Property   | Type      | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `value`    | `string`  | The option's value                                     |
| `label`    | `string`  | Label shown in the trigger (defaults to the item text) |
| `disabled` | `boolean` | Disables the option                                    |

All parts accept a `class` input.

## Architecture

```
ScCombobox (form control, provides SC_COMBOBOX; ngComboboxPopup popupType="dialog" + CDK overlay)
├── ScComboboxTrigger (Combobox, role=combobox, aria-haspopup=dialog) → ScComboboxValue, ScComboboxIcon
├── ScComboboxClear
└── ScComboboxPortal (rendered inside the dialog popup via ScSelectPortalOutlet)
    └── ScComboboxPopup (ComboboxWidget, role=dialog)
        ├── ScComboboxSearch (inner Combobox, alwaysExpanded; registers itself on SC_COMBOBOX)
        └── ScComboboxListContainer (rendered by the popup inside ngComboboxPopup [combobox]=search)
            ├── ScComboboxEmpty
            └── ScComboboxList (Listbox + ComboboxWidget) → ScComboboxItem (Option)
```

`ScComboboxListContainer` is a plain template marker rather than a host for `ComboboxPopup`: Angular forces a host directive's required inputs (`ComboboxPopup.combobox`) to be re-exposed, which would make consumers bind it by hand ([angular/angular#50510](https://github.com/angular/angular/issues/50510)).

## Known issue

`@angular/aria` 22.2.1 forwards navigation keys from a combobox to its list once per render (`Combobox` relays through an `afterRenderEffect`). Keys arriving within the same frame are coalesced and only the last one is applied. Normal typing is unaffected.
