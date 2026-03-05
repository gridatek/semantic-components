# Multiselect

Multi-selection dropdown with overlay popup. Built on `@angular/aria` primitives using a composable pattern with CDK overlay positioning.

## Architecture

1. **ScMultiselect** (root) — wraps `Combobox` (readonly), manages overlay via `ComboboxPopupContainer` + `cdkConnectedOverlay`, exposes `values()` signal
2. **ScMultiselectTrigger** — trigger button with hidden `ComboboxInput`, exposes `elementRef` for overlay origin
3. **ScMultiselectPortal** — `ng-template` directive for projecting popup content into the overlay
4. **ScMultiselectPopup** — popup container with show/hide transitions based on `Combobox.expanded()`
5. **ScMultiselectList** — wraps `Listbox` (hostDirective) with `multi` and `values` inputs
6. **ScMultiselectItem** — wraps `Option` (hostDirective) with auto-scroll on active

## Components

| Component                    | Selector                           | Aria Primitive                | Purpose                            |
| ---------------------------- | ---------------------------------- | ----------------------------- | ---------------------------------- |
| `ScMultiselect`              | `div[scMultiselect]`               | `Combobox` (hostDirective)    | Root container + overlay wiring    |
| `ScMultiselectTrigger`       | `div[scMultiselectTrigger]`        | `ComboboxInput` (in template) | Trigger with hidden input          |
| `ScMultiselectPortal`        | `ng-template[scMultiselectPortal]` | —                             | Content projection into overlay    |
| `ScMultiselectPopup`         | `div[scMultiselectPopup]`          | —                             | Popup with show/hide transitions   |
| `ScMultiselectList`          | `div[scMultiselectList]`           | `Listbox` (hostDirective)     | Scrollable options list            |
| `ScMultiselectItem`          | `div[scMultiselectItem]`           | `Option` (hostDirective)      | Individual option with auto-scroll |
| `ScMultiselectItemIndicator` | `svg[scMultiselectItemIndicator]`  | —                             | Checkmark (visible when selected)  |
| `ScMultiselectItemLabel`     | `[scMultiselectItemLabel]`         | —                             | Item label text styling            |
| `ScMultiselectValue`         | `[scMultiselectValue]`             | —                             | Trigger value display area         |
| `ScMultiselectLabel`         | `[scMultiselectLabel]`             | —                             | Trigger label text styling         |
| `ScMultiselectIcon`          | `svg[scMultiselectIcon]`           | —                             | Chevron icon styling               |

### ScMultiselect

**Signals:**

| Signal     | Type        | Description                            |
| ---------- | ----------- | -------------------------------------- |
| `values()` | `unknown[]` | Currently selected values from listbox |

### ScMultiselectList

Exposes from `Listbox` hostDirective:

| Input/Output | Type        | Description               |
| ------------ | ----------- | ------------------------- |
| `[(values)]` | `unknown[]` | Selected values           |
| `[multi]`    | `boolean`   | Enable multiple selection |

### ScMultiselectItem

Exposes from `Option` hostDirective:

| Input        | Type      | Description                |
| ------------ | --------- | -------------------------- |
| `[value]`    | `unknown` | Option value (required)    |
| `[label]`    | `string`  | Option label for typeahead |
| `[disabled]` | `boolean` | Disable this option        |

## Usage

```html
<div scMultiselect>
  <div scMultiselectTrigger>
    <span scMultiselectValue>
      <span scMultiselectLabel>{{ displayValue() }}</span>
    </span>
    <svg scMultiselectIcon siChevronDownIcon aria-hidden="true"></svg>
  </div>
  <ng-template scMultiselectPortal>
    <div scMultiselectPopup>
      <div scMultiselectList multi>
        @for (option of options; track option.value) {
        <div scMultiselectItem [value]="option.value" [label]="option.label">
          <span scMultiselectItemLabel>{{ option.label }}</span>
          <svg scMultiselectItemIndicator siCheckIcon aria-hidden="true"></svg>
        </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

```typescript
private readonly multiselect = viewChild.required(ScMultiselect);

displayValue = computed(() => {
  const values = this.multiselect().values();
  if (values.length === 0) return 'Select...';
  if (values.length === 1) return values[0];
  return `${values[0]} + ${values.length - 1} more`;
});
```

## Consumer Responsibilities

- **Display text** — compute from `multiselect().values()` and your options array
- **Selected values** — manage via `[(values)]` on `ScMultiselectList`
- **Icons** — project custom icons into trigger value and items via `<ng-content>`

## Features

- Multiple selection via `Listbox` `multi` input
- Overlay positioning anchored below the trigger (match width)
- Auto scroll-reset when popup closes
- Active item auto-scroll into view
- Show/hide transitions on popup
- Checkmark indicator for selected options
- Full keyboard navigation via `@angular/aria` primitives

## Accessibility

- `@angular/aria` `Combobox`, `ComboboxInput`, `Listbox`, and `Option` handle all ARIA attributes
- Keyboard navigation (arrow keys, enter, escape) managed by aria primitives
- `aria-selected` on options, `aria-expanded` on trigger
- Overlay uses CDK connected overlay for proper positioning
