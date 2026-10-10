# Multiselect

Multi-selection dropdown with an overlay popup. Built on the `@angular/aria` combobox pattern for a non-editable combobox: the trigger element itself is the combobox, focus stays on it, and the active option is announced through `aria-activedescendant`.

## Features

- Single tab stop; full keyboard navigation and typeahead
- ARIA-compliant (`role="combobox"` trigger, `role="listbox"` + `aria-multiselectable` popup)
- Signal Forms control — bind `[formField]` directly on `scMultiselect` (`string[]`)
- The popup stays open while toggling options
- Overlay positioning with CDK (`usePopover: 'inline'`), flips above when there is no room below
- Customizable styling via `class` input on every part
- `exportAs: 'scMultiselect'` for direct template access

## Components

| Component                    | Selector                           | Aria Primitive                | Purpose                                                        |
| ---------------------------- | ---------------------------------- | ----------------------------- | -------------------------------------------------------------- |
| `ScMultiselect`              | `div[scMultiselect]`               | `ComboboxPopup` (in template) | Root; the form control (`FormValueControl<string[]>`), overlay |
| `ScMultiselectTrigger`       | `[scMultiselectTrigger]`           | `Combobox` (hostDirective)    | The focusable combobox, overlay origin                         |
| `ScMultiselectValue`         | `[scMultiselectValue]`             | —                             | Summary of the selection, or the placeholder                   |
| `ScMultiselectIcon`          | `svg[scMultiselectIcon]`           | —                             | Chevron in the trigger, rotates while open                     |
| `ScMultiselectPortal`        | `ng-template[scMultiselectPortal]` | —                             | Marks the lazy popup content                                   |
| `ScMultiselectPopup`         | `div[scMultiselectPopup]`          | —                             | Popup container with enter/leave animations                    |
| `ScMultiselectList`          | `div[scMultiselectList]`           | `Listbox` + `ComboboxWidget`  | Scrollable options list (always `multi`)                       |
| `ScMultiselectItem`          | `div[scMultiselectItem]`           | `Option` (hostDirective)      | Individual option with auto-scroll                             |
| `ScMultiselectItemIndicator` | `svg[scMultiselectItemIndicator]`  | —                             | Checkmark (visible when selected)                              |
| `ScMultiselectItemLabel`     | `[scMultiselectItemLabel]`         | —                             | Item label text styling                                        |

## Usage

```html
<div scMultiselect [formField]="form.labels" placeholder="Select labels">
  <div scMultiselectTrigger aria-label="Labels">
    <span scMultiselectValue></span>
    <svg scMultiselectIcon siChevronDownIcon></svg>
  </div>
  <ng-template scMultiselectPortal>
    <div scMultiselectPopup>
      <div scMultiselectList>
        @for (option of options; track option.value) {
        <div scMultiselectItem [value]="option.value" [label]="option.label">
          <span scMultiselectItemLabel>{{ option.label }}</span>
          <svg scMultiselectItemIndicator siCheckIcon></svg>
        </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

Without Signal Forms, use two-way binding: `<div scMultiselect [(value)]="labels">`.

### Custom value rendering

`ScMultiselectValue` shows `"<first label> + N more"` by default. Project content to render the selection yourself (shown only when something is selected; the placeholder is used otherwise):

```html
<span scMultiselectValue>
  @for (label of multiselect.selectedLabels(); track label) {
  <span scBadge>{{ label }}</span>
  }
</span>
```

> The popup is rendered lazily, so an option's label is only known after the list has been opened once. Until then the default summary uses the raw values. If an initial selection must show labels immediately, project the content.

## Signal Forms

`ScMultiselect` implements `FormValueControl<string[]>`. Put `[formField]` on `scMultiselect` and declare constraints in the `form()` schema:

```typescript
interface FormModel {
  labels: string[];
}

readonly labelsForm = form(this.model, (p) => {
  required(p.labels);
});
```

`required` → `aria-required`, `invalid` (once touched) → `aria-invalid`, `disabled` → `aria-disabled` on the trigger. The control is marked touched when focus leaves the trigger.

## Keyboard Navigation

Focus always stays on the trigger.

| Key                  | Closed     | Open                                  |
| -------------------- | ---------- | ------------------------------------- |
| `Enter` / `Space`    | Open       | Toggle the active option (stays open) |
| `ArrowDown`          | Open       | Next option                           |
| `ArrowUp`            | —          | Previous option                       |
| `Home` / `End`       | —          | First / last option                   |
| Printable characters | —          | Typeahead to the matching option      |
| `Escape`             | —          | Close                                 |
| `Tab`                | Move focus | Close and move focus                  |

## API Reference

### ScMultiselect

| Member             | Type               | Description                                      |
| ------------------ | ------------------ | ------------------------------------------------ |
| `value`            | `model<string[]>`  | Selected option values                           |
| `placeholder`      | `input<string>`    | Shown by `ScMultiselectValue` when none selected |
| `disabled`         | `input<boolean>`   | Disables the multiselect                         |
| `readonly`         | `input<boolean>`   | Prevents opening/changing                        |
| `required`         | `input<boolean>`   | Sets `aria-required` on the trigger              |
| `invalid`          | `input<boolean>`   | Sets `aria-invalid` on the trigger               |
| `touch`            | `output<void>`     | Emitted when focus leaves the trigger            |
| `open()`           | `Signal<boolean>`  | Whether the popup is open                        |
| `selectedLabels()` | `Signal<string[]>` | Labels of the selected options (or their values) |
| `close()`          | `void`             | Close and refocus the trigger                    |
| `focus()`          | `void`             | Focus the trigger                                |
| `class`            | `input<string>`    | Additional CSS classes                           |

### ScMultiselectTrigger

| Property | Type                | Description            |
| -------- | ------------------- | ---------------------- |
| `size`   | `'default' \| 'sm'` | Trigger height         |
| `class`  | `string`            | Additional CSS classes |

### ScMultiselectItem

| Property   | Type      | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| `value`    | `string`  | The option's value                                      |
| `label`    | `string`  | Label used for display and typeahead (defaults to text) |
| `disabled` | `boolean` | Disables the option                                     |
| `class`    | `string`  | Additional CSS classes                                  |

All other parts accept a `class` input only.

## Architecture

```
ScMultiselect (form control, exportAs: 'scMultiselect', provides SC_MULTISELECT)
├── ScMultiselectTrigger (Combobox host, role=combobox) [projected]
│   ├── ScMultiselectValue (summary or placeholder)
│   └── ScMultiselectIcon (chevron)
└── ScMultiselectPortal (ng-template, rendered inside ngComboboxPopup via ScSelectPortalOutlet)
    └── ScMultiselectPopup
        └── ScMultiselectList (Listbox multi + ComboboxWidget; activedescendant focus, explicit selection)
            └── ScMultiselectItem (Option) → ScMultiselectItemLabel, ScMultiselectItemIndicator
```

The trigger shares its base styles with `ScSelectTrigger` (`selectTriggerStyles`), and the portal is rendered with the select's `ScSelectPortalOutlet` so `ComboboxWidget` can resolve `COMBOBOX_POPUP`.

## Known issue

`@angular/aria` 22.2.1 forwards keys from the trigger to the list once per render (`Combobox` relays through an `afterRenderEffect`). Keys arriving within the same frame are coalesced and only the last one is applied. This does not affect normal typing, but scripted input or barcode scanners can lose keystrokes. The same applies to `ScSelect`.
