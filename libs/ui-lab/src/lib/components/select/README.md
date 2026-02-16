# Select Components

A set of components for building accessible select dropdowns following the Single Responsibility Principle.

## Features

- Full keyboard navigation support
- ARIA-compliant accessibility
- Automatic scroll-to-active on keyboard navigation
- Overlay positioning with CDK
- Customizable styling via `class` input

## Components

| Component               | Selector                        | Responsibility                                                  |
| ----------------------- | ------------------------------- | --------------------------------------------------------------- |
| `ScSelect`              | `div[scSelect]`                | Root container, wraps `Combobox` from `@angular/aria`           |
| `ScSelectTrigger`       | `div[scSelectTrigger]`        | Trigger button styling, exposes overlay origin                  |
| `ScSelectInput`         | `input[scSelectInput]`        | Hidden input, wraps `ComboboxInput` from `@angular/aria`        |
| `ScSelectValue`         | `span[scSelectValue]`         | Display selected value with styling                             |
| `ScSelectIcon`          | `svg[scSelectIcon]`           | Chevron icon styling (use with `@semantic-icons/lucide-icons`)  |
| `ScSelectPortal`        | `div[scSelectPortal]`         | Overlay positioning & combobox popup container (infrastructure) |
| `ScSelectList`          | `div[scSelectList]`           | Content container, wraps `Listbox` from `@angular/aria`         |
| `ScSelectItem`          | `div[scSelectItem]`           | Option item styling, wraps `Option` from `@angular/aria`        |
| `ScSelectItemIndicator` | `svg[scSelectItemIndicator]` | Checkmark icon for selected state                               |

## Basic Usage

### Template

```html
<div scSelect>
  <div scSelectTrigger>
    <span scSelectValue>{{ displayValue() }}</span>
    <input scSelectInput aria-label="Select" placeholder="Select an option" />
    <svg scSelectIcon si-chevron-down-icon aria-hidden="true"></svg>
  </div>
  <div scSelectPortal>
    <div scSelectList>
      @for (option of options; track option.value) {
      <div scSelectItem [value]="option.value" [label]="option.label">
        {{ option.label }}
        <svg scSelectItemIndicator si-check-icon aria-hidden="true"></svg>
      </div>
      }
    </div>
  </div>
</div>
```

### Component

```typescript
import { ChangeDetectionStrategy, Component, computed, viewChild } from '@angular/core';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { ScSelect, ScSelectList, ScSelectIcon, ScSelectInput, ScSelectItem, ScSelectItemIndicator, ScSelectPortal, ScSelectTrigger, ScSelectValue } from '@app/ui/select';

@Component({
  selector: 'app-example',
  imports: [ScSelect, ScSelectList, ScSelectIcon, ScSelectInput, ScSelectItem, ScSelectItemIndicator, ScSelectPortal, ScSelectTrigger, ScSelectValue, SiCheckIcon, SiChevronDownIcon],
  template: `
    ...
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  private readonly select = viewChild.required(ScSelect);

  displayValue = computed(() => {
    const values = this.select().values();
    return values.length ? values[0] : 'Select an option';
  });

  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
}
```

## Accessing Selected Values

Use `viewChild` to query `ScSelect` and access the `values()` signal:

```typescript
private readonly select = viewChild.required(ScSelect);

selectedValues = computed(() => this.select().values());
```

## Keyboard Navigation

The select component supports full keyboard navigation:

| Key               | Action                                |
| ----------------- | ------------------------------------- |
| `Enter` / `Space` | Open dropdown / Select focused option |
| `ArrowDown`       | Move focus to next option             |
| `ArrowUp`         | Move focus to previous option         |
| `Home`            | Move focus to first option            |
| `End`             | Move focus to last option             |
| `Escape`          | Close dropdown                        |
| `Tab`             | Close dropdown and move focus         |

When navigating with keyboard, the dropdown automatically scrolls to keep the active option visible.

## Accessibility

The select components are built with accessibility in mind:

- Uses `@angular/aria/combobox` and `@angular/aria/listbox` for proper ARIA roles
- `aria-label` on the input for screen reader support
- `aria-hidden="true"` on decorative icons
- Visual focus indicators for keyboard navigation
- Selected state indicated via `aria-selected`

### Required Accessibility Attributes

```html
<!-- Always provide an accessible label -->
<input scSelectInput aria-label="Select a fruit" />

<!-- Hide decorative icons from screen readers -->
<svg scSelectIcon si-chevron-down-icon aria-hidden="true"></svg>
<svg scSelectItemIndicator si-check-icon aria-hidden="true"></svg>
```

## API Reference

### ScSelect

| Property   | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| `class`    | `string` | Additional CSS classes            |
| `values()` | `signal` | Signal containing selected values |

### ScSelectItem

| Property | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| `value`  | `any`    | The value of the option            |
| `label`  | `string` | The label displayed for the option |
| `class`  | `string` | Additional CSS classes             |

### All Components

All components accept a `class` input for custom styling:

```html
<div scSelect class="w-64">
  <div scSelectTrigger class="bg-slate-100">...</div>
</div>
```

## Architecture

```
ScSelect (root, wraps Combobox)
├── ScSelectTrigger (trigger + overlay origin)
│   ├── ScSelectValue (display value)
│   ├── ScSelectInput (wraps ComboboxInput)
│   └── ScSelectIcon (chevron icon)
└── ScSelectPortal (overlay infrastructure)
    └── ScSelectList (wraps Listbox)
        └── ScSelectItem (wraps Option)
            └── ScSelectItemIndicator (checkmark icon)
```

## Dependencies

- `@angular/aria/combobox` - Combobox behavior
- `@angular/aria/listbox` - Listbox and option behavior
- `@angular/cdk/overlay` - Overlay positioning
- `@semantic-icons/lucide-icons` - Icon library
