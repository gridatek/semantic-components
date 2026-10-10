# Select Components

Displays a list of options for the user to pick from — mimics a native select.

Built on the `@angular/aria` combobox pattern for a non-editable ("select-only") combobox: the trigger element itself is the combobox, focus stays on it, and the active option is announced through `aria-activedescendant`.

## Features

- Single tab stop; full keyboard navigation and typeahead
- ARIA-compliant (`role="combobox"` trigger, `role="listbox"` popup)
- Signal Forms control — bind `[formField]` directly on `scSelect`
- Stores the option **value**, displays its **label**
- Overlay positioning with CDK (`usePopover: 'inline'`), flips above when there is no room below
- Enter/leave animations on the popup
- Customizable styling via `class` input on every part
- `exportAs: 'scSelect'` for direct template access

## Components

| Component               | Selector                      | Responsibility                                                                |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| `ScSelect`              | `div[scSelect]`               | Root; the form control (`FormValueControl<string>`), owns the overlay         |
| `ScSelectTrigger`       | `[scSelectTrigger]`           | The focusable combobox (wraps `Combobox`), overlay origin                     |
| `ScSelectValue`         | `[scSelectValue]`             | Shows the selected label, or the placeholder                                  |
| `ScSelectIcon`          | `svg[scSelectIcon]`           | Chevron in the trigger, rotates while open                                    |
| `ScSelectPortal`        | `ng-template[scSelectPortal]` | Marks the lazy popup content                                                  |
| `ScSelectPopup`         | `div[scSelectPopup]`          | Popup container with styling and enter/leave animations                       |
| `ScSelectList`          | `div[scSelectList]`           | Listbox (wraps `Listbox` + `ComboboxWidget`), syncs selection with `ScSelect` |
| `ScSelectItem`          | `div[scSelectItem]`           | Option (wraps `Option`)                                                       |
| `ScSelectItemLabel`     | `[scSelectItemLabel]`         | Label text inside an item (`flex-1`)                                          |
| `ScSelectItemIcon`      | `svg[scSelectItemIcon]`       | Decorative icon in items or the value (`aria-hidden="true"`)                  |
| `ScSelectItemIndicator` | `svg[scSelectItemIndicator]`  | Checkmark shown on the selected option                                        |
| `ScSelectGroup`         | `div[scSelectGroup]`          | Groups related options                                                        |
| `ScSelectGroupLabel`    | `div[scSelectGroupLabel]`     | Label for a group                                                             |
| `ScSelectSeparator`     | `[scSelectSeparator]`         | Visual separator between groups or items                                      |

## Basic Usage

```html
<div scSelect [formField]="form.fruit" placeholder="Select a fruit">
  <div scSelectTrigger aria-label="Fruit">
    <span scSelectValue></span>
    <svg scSelectIcon siChevronDownIcon></svg>
  </div>
  <ng-template scSelectPortal>
    <div scSelectPopup>
      <div scSelectList>
        @for (fruit of fruits; track fruit.value) {
        <div scSelectItem [value]="fruit.value" [label]="fruit.label">
          <span scSelectItemLabel>{{ fruit.label }}</span>
          <svg scSelectItemIndicator siCheckIcon></svg>
        </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

Without Signal Forms, use two-way binding: `<div scSelect [(value)]="fruit">`.

### Custom value rendering

`ScSelectValue` renders the selected option's label by default. Project content to render it yourself (shown only when a value is selected; the placeholder is used otherwise):

```html
<span scSelectValue>
  @if (selectedOption(); as option) {
  <svg scSelectItemIcon [siIcon]="option.icon"></svg>
  {{ option.label }} }
</span>
```

> The popup is rendered lazily, so an option's label is only known after the list has been opened once. Until then the default `ScSelectValue` shows the raw value. If your initial value must show a label immediately, project the content as above.

### With Groups

```html
<div scSelectList>
  <div scSelectGroup>
    <div scSelectGroupLabel>Fruits</div>
    <div scSelectItem value="apple" label="Apple"><span scSelectItemLabel>Apple</span></div>
  </div>
  <div scSelectSeparator></div>
  <div scSelectGroup>
    <div scSelectGroupLabel>Vegetables</div>
    <div scSelectItem value="carrot" label="Carrot"><span scSelectItemLabel>Carrot</span></div>
  </div>
</div>
```

## Signal Forms

`ScSelect` implements `FormValueControl<string>`. Put `[formField]` on `scSelect`, and declare constraints in the `form()` schema — not as attributes:

```typescript
readonly fruitForm = form(this.model, (p) => {
  required(p.fruit);
  disabled(p.fruit, () => this.locked());
});
```

`required` → `aria-required`, `invalid` (once touched) → `aria-invalid`, `disabled` → `aria-disabled` on the trigger. The control is marked touched when focus leaves the trigger.

## Keyboard Navigation

Focus always stays on the trigger.

| Key                  | Closed     | Open                               |
| -------------------- | ---------- | ---------------------------------- |
| `Enter` / `Space`    | Open       | Select the active option and close |
| `ArrowDown`          | Open       | Next option                        |
| `ArrowUp`            | —          | Previous option                    |
| `Home` / `End`       | —          | First / last option                |
| Printable characters | —          | Typeahead to the matching option   |
| `Escape`             | —          | Close without changing the value   |
| `Tab`                | Move focus | Close and move focus               |

Picking the already-selected option keeps it selected (it does not toggle off).

## Accessibility

- Give the trigger an accessible name (`aria-label` or `aria-labelledby`).
- `ScSelectItemIcon` and `ScSelectIcon` set `aria-hidden="true"`.
- Disabled selects stay focusable (`aria-disabled`, Aria's soft-disabled default) so screen-reader users can discover them.

## API Reference

### ScSelect

| Member            | Type              | Description                                     |
| ----------------- | ----------------- | ----------------------------------------------- |
| `value`           | `model<string>`   | Selected option value (`''` when none)          |
| `placeholder`     | `input<string>`   | Shown by `ScSelectValue` when nothing is chosen |
| `disabled`        | `input<boolean>`  | Disables the select                             |
| `readonly`        | `input<boolean>`  | Prevents opening/changing                       |
| `required`        | `input<boolean>`  | Sets `aria-required` on the trigger             |
| `invalid`         | `input<boolean>`  | Sets `aria-invalid` on the trigger              |
| `touch`           | `output<void>`    | Emitted when focus leaves the trigger           |
| `open()`          | `Signal<boolean>` | Whether the popup is open                       |
| `selectedLabel()` | `Signal<string>`  | Label of the selected option (or its value)     |
| `select(value)`   | `void`            | Select a value, close, refocus the trigger      |
| `close()`         | `void`            | Close and refocus the trigger                   |
| `focus()`         | `void`            | Focus the trigger                               |
| `class`           | `input<string>`   | Additional CSS classes                          |

### ScSelectTrigger

| Property | Type                | Description            |
| -------- | ------------------- | ---------------------- |
| `size`   | `'default' \| 'sm'` | Trigger height         |
| `class`  | `string`            | Additional CSS classes |

### ScSelectItem

| Property   | Type      | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| `value`    | `string`  | The option's value                                      |
| `label`    | `string`  | Label used for display and typeahead (defaults to text) |
| `disabled` | `boolean` | Disables the option                                     |
| `class`    | `string`  | Additional CSS classes                                  |

All other parts accept a `class` input only.

## Architecture

```
ScSelect (form control, exportAs: 'scSelect', provides SC_SELECT)
├── ScSelectTrigger (Combobox host, role=combobox) [projected]
│   ├── ScSelectValue (label or placeholder)
│   └── ScSelectIcon (chevron)
└── ScSelectPortal (ng-template, rendered inside ngComboboxPopup via ScPortalOutlet)
    └── ScSelectPopup
        └── ScSelectList (Listbox + ComboboxWidget; activedescendant focus, explicit selection)
            ├── ScSelectGroup → ScSelectGroupLabel, ScSelectItem…
            ├── ScSelectSeparator
            └── ScSelectItem (Option) → ScSelectItemIcon, ScSelectItemLabel, ScSelectItemIndicator
```

`ScPortalOutlet` renders the consumer's portal template with the popup's injector so `ComboboxWidget` can resolve `COMBOBOX_POPUP` — the consumer-declared template cannot see it otherwise.

## Dependencies

- `@angular/aria/combobox` - Combobox behavior
- `@angular/aria/listbox` - Listbox and option behavior
- `@angular/cdk/overlay` - Overlay positioning
- `@angular/forms/signals` - `FormValueControl` contract

## Known issue

`@angular/aria` 22.2.1 forwards keys from the trigger to the list once per render (`Combobox` relays through an `afterRenderEffect`). Keys arriving within the same frame are coalesced and only the last one is applied. This does not affect normal typing, but scripted input or barcode scanners can lose keystrokes.
