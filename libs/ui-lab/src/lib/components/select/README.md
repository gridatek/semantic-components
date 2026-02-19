# Select Components

A set of components for building accessible select dropdowns following the Single Responsibility Principle.

## Features

- Full keyboard navigation support
- ARIA-compliant accessibility
- Automatic scroll-to-active on keyboard navigation
- Overlay positioning with CDK
- Customizable styling via `class` input
- Signal forms support via `FormValueControl<string>`

## Components

| Component         | Selector                      | Responsibility                                                                              |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| `ScSelect`        | `div[scSelect]`               | Root container, wraps `Combobox`, owns overlay logic, implements `FormValueControl<string>` |
| `ScSelectTrigger` | `div[scSelectTrigger]`        | Trigger button, internally renders hidden input and chevron icon                            |
| `ScSelectValue`   | `span[scSelectValue]`         | Display selected value with styling                                                         |
| `ScSelectPortal`  | `ng-template[scSelectPortal]` | Marks lazy content template for the overlay                                                 |
| `ScSelectList`    | `div[scSelectList]`           | Content container, wraps `Listbox` from `@angular/aria`                                     |
| `ScSelectItem`    | `div[scSelectItem]`           | Option item, wraps `Option`, internally renders check indicator                             |

### Internal Components (not exported)

| Component               | Selector                     | Responsibility                                           |
| ----------------------- | ---------------------------- | -------------------------------------------------------- |
| `ScSelectInput`         | `input[scSelectInput]`       | Hidden input, wraps `ComboboxInput` from `@angular/aria` |
| `ScSelectIcon`          | `svg[scSelectIcon]`          | Chevron icon styling                                     |
| `ScSelectItemIndicator` | `svg[scSelectItemIndicator]` | Checkmark icon for selected state                        |

## Basic Usage

### Template

```html
<div scSelect placeholder="Select an option">
  <div scSelectTrigger aria-label="Select">
    <span scSelectValue>{{ displayValue() }}</span>
  </div>
  <ng-template scSelectPortal>
    <div scSelectList>
      @for (option of options; track option.value) {
      <div scSelectItem [value]="option.value" [label]="option.label">{{ option.label }}</div>
      }
    </div>
  </ng-template>
</div>
```

### Component

```typescript
import { ChangeDetectionStrategy, Component, computed, viewChild } from '@angular/core';
import { ScSelect, ScSelectList, ScSelectItem, ScSelectPortal, ScSelectTrigger, ScSelectValue } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-example',
  imports: [ScSelect, ScSelectList, ScSelectItem, ScSelectPortal, ScSelectTrigger, ScSelectValue],
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

## Signal Forms

`ScSelect` implements `FormValueControl<string>`, making it compatible with Angular signal forms:

```typescript
readonly fruit = new FormControl<string>('');
```

```html
<div [formControl]="fruit" scSelect placeholder="Pick a fruit">...</div>
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
- `aria-label` on the trigger for screen reader support
- Decorative icons (chevron, checkmark) are internal with `aria-hidden="true"`
- Visual focus indicators for keyboard navigation
- Selected state indicated via `aria-selected`

### Required Accessibility Attributes

```html
<!-- Always provide an accessible label on the trigger -->
<div scSelectTrigger aria-label="Select a fruit"></div>
```

## API Reference

### ScSelect

| Property      | Type                | Description                                            |
| ------------- | ------------------- | ------------------------------------------------------ |
| `class`       | `string`            | Additional CSS classes                                 |
| `placeholder` | `string`            | Placeholder text for the hidden input                  |
| `value`       | `model<string>`     | Two-way bound selected value (signal forms compatible) |
| `values()`    | `Signal<unknown[]>` | Signal containing selected values                      |

### ScSelectTrigger

| Property     | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| `class`      | `string` | Additional CSS classes                |
| `aria-label` | `string` | Accessible label for the hidden input |

### ScSelectItem

| Property | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| `value`  | `any`    | The value of the option            |
| `label`  | `string` | The label displayed for the option |
| `class`  | `string` | Additional CSS classes             |

### All Components

All components accept a `class` input for custom styling:

```html
<div scSelect class="w-64" placeholder="Choose...">
  <div scSelectTrigger class="bg-slate-100" aria-label="Choose">...</div>
</div>
```

## Architecture

```
ScSelect (root, wraps Combobox, owns overlay, implements FormValueControl)
├── ScSelectTrigger (trigger + overlay origin)
│   ├── ScSelectValue (display value) [projected content]
│   ├── ScSelectInput (hidden combobox input) [internal]
│   └── ScSelectIcon + SiChevronDownIcon [internal]
└── ScSelectPortal (ng-template marking lazy overlay content)
    └── ScSelectList (wraps Listbox)
        └── ScSelectItem (wraps Option)
            ├── [projected content]
            └── ScSelectItemIndicator + SiCheckIcon [internal]
```

## Dependencies

- `@angular/aria/combobox` - Combobox behavior
- `@angular/aria/listbox` - Listbox and option behavior
- `@angular/cdk/overlay` - Overlay positioning
- `@semantic-icons/lucide-icons` - Icon library (used internally)
