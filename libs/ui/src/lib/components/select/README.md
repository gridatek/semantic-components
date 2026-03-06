# Select Components

Displays a list of options for the user to pick from — mimics a native select.

## Features

- Full keyboard navigation support
- ARIA-compliant accessibility
- Automatic scroll-to-active on keyboard navigation
- Overlay positioning with CDK
- Customizable styling via `class` input
- Signal forms support via `formField` on the input
- `exportAs: 'scSelect'` for direct template access

## Components

| Component               | Selector                      | Responsibility                                                                      |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| `ScSelect`              | `div[scSelect]`               | Root container, wraps `Combobox`, owns overlay logic                                |
| `ScSelectInputGroup`    | `div[scSelectInputGroup]`     | Trigger button, renders chevron icon, projects consumer content                     |
| `ScSelectInput`         | `input[scSelectInput]`        | Visible input displaying selected value, wraps `ComboboxInput` from `@angular/aria` |
| `ScSelectItemIcon`      | `svg[scSelectItemIcon]`       | Icon styling for items and value display (sets `aria-hidden="true"` automatically)  |
| `ScSelectPortal`        | `ng-template[scSelectPortal]` | Marks lazy content template for the overlay                                         |
| `ScSelectPopup`         | `div[scSelectPopup]`          | Popup container with styling, animation, and visibility                             |
| `ScSelectList`          | `div[scSelectList]`           | Listbox container, wraps `Listbox` from `@angular/aria`                             |
| `ScSelectItem`          | `div[scSelectItem]`           | Option item, wraps `Option`, internally renders check indicator                     |
| `ScSelectGroup`         | `div[scSelectGroup]`          | Groups related options together with vertical layout                                |
| `ScSelectGroupLabel`    | `div[scSelectGroupLabel]`     | Label for a group of options                                                        |
| `ScSelectSeparator`     | `[scSelectSeparator]`         | Visual separator between groups or items                                            |
| `ScSelectIcon`          | `svg[scSelectIcon]`           | Chevron icon styling in trigger                                                     |
| `ScSelectItemIndicator` | `svg[scSelectItemIndicator]`  | Checkmark icon for selected state                                                   |

## Basic Usage

### Template

```html
<div scSelect>
  <div scSelectInputGroup>
    <input scSelectInput placeholder="Select an option" aria-label="Select" />
  </div>
  <ng-template scSelectPortal>
    <div scSelectPopup>
      <div scSelectList>
        @for (option of options; track option.value) {
        <div scSelectItem [value]="option.value" [label]="option.label">{{ option.label }}</div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

### With Icons

Use `ScSelectItemIcon` for consistent icon styling in items and the trigger.

```html
<!-- In the trigger: icon before the input -->
<div scSelectInputGroup>
  <svg scSelectItemIcon siHomeIcon></svg>
  <input scSelectInput placeholder="Select..." aria-label="Select" />
</div>

<!-- In items -->
<div scSelectItem [value]="'home'" [label]="'Home'">
  <svg scSelectItemIcon siHomeIcon></svg>
  <span class="flex-1">Home</span>
</div>
```

### With Groups

Use `ScSelectGroup`, `ScSelectGroupLabel`, and `ScSelectSeparator` to organize options into labeled groups.

```html
<div scSelect>
  <div scSelectInputGroup>
    <input scSelectInput placeholder="Select a food" aria-label="Food dropdown" />
  </div>
  <ng-template scSelectPortal>
    <div scSelectPopup>
      <div scSelectList>
        <div scSelectGroup>
          <div scSelectGroupLabel>Fruits</div>
          <div scSelectItem value="Apple" label="Apple">Apple</div>
          <div scSelectItem value="Banana" label="Banana">Banana</div>
        </div>
        <div scSelectSeparator></div>
        <div scSelectGroup>
          <div scSelectGroupLabel>Vegetables</div>
          <div scSelectItem value="Carrot" label="Carrot">Carrot</div>
          <div scSelectItem value="Spinach" label="Spinach">Spinach</div>
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

### Component

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScSelect, ScSelectInput, ScSelectInputGroup, ScSelectItem, ScSelectItemIcon, ScSelectList, ScSelectPopup, ScSelectPortal } from '@semantic-components/ui';

@Component({
  selector: 'app-example',
  imports: [ScSelect, ScSelectInput, ScSelectPopup, ScSelectItemIcon, ScSelectList, ScSelectItem, ScSelectPortal, ScSelectInputGroup],
  template: `
    <div scSelect>
      <div scSelectInputGroup>
        <input scSelectInput placeholder="Select an option" aria-label="Select" />
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            @for (option of options; track option.value) {
              <div scSelectItem [value]="option.value" [label]="option.label">
                {{ option.label }}
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
}
```

## Template Access via `exportAs`

Use `#select="scSelect"` to access `ScSelect` directly in the template when you need the value (e.g., for conditional icon rendering):

```html
<div scSelect>
  ...
  <span>Current value: {{ select.value() }}</span>
</div>
```

## Signal Forms

Use `[formField]` on the `<input scSelectInput>` to integrate with Angular signal forms:

```html
<input scSelectInput [formField]="fruitForm.fruit" placeholder="Select a fruit" aria-label="Fruit" />
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
- `ScSelectItemIcon` sets `aria-hidden="true"` automatically on decorative icons
- Internal icons (chevron, checkmark) have `aria-hidden="true"` built in
- Visual focus indicators for keyboard navigation
- Selected state indicated via `aria-selected`

### Required Accessibility Attributes

```html
<!-- Always provide an accessible label on the input -->
<input scSelectInput aria-label="Select a fruit" placeholder="Select a fruit" />
```

## API Reference

### ScSelect

| Property   | Type              | Description                                            |
| ---------- | ----------------- | ------------------------------------------------------ |
| `class`    | `string`          | Additional CSS classes                                 |
| `disabled` | `boolean`         | Disables the select control                            |
| `value()`  | `Signal<unknown>` | Computed selected value derived from listbox selection |
| `label()`  | `Signal<string>`  | Returns the label for the selected value, or `''`      |
| `exportAs` | `'scSelect'`      | Template reference for direct access                   |

### ScSelectInputGroup

| Property | Type     | Description            |
| -------- | -------- | ---------------------- |
| `class`  | `string` | Additional CSS classes |

### ScSelectInput

| Property      | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| `class`       | `string` | Additional CSS classes                         |
| `placeholder` | `string` | Native placeholder text (set on the `<input>`) |
| `aria-label`  | `string` | Accessible label (set on the `<input>`)        |

### ScSelectItemIcon

| Property | Type     | Description                                                            |
| -------- | -------- | ---------------------------------------------------------------------- |
| `class`  | `string` | Additional CSS classes (base: `text-muted-foreground size-4 shrink-0`) |

Sets `aria-hidden="true"` automatically.

### ScSelectItem

| Property | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| `value`  | `any`    | The value of the option            |
| `label`  | `string` | The label displayed for the option |
| `class`  | `string` | Additional CSS classes             |

### ScSelectGroup

| Property | Type     | Description            |
| -------- | -------- | ---------------------- |
| `class`  | `string` | Additional CSS classes |

### ScSelectGroupLabel

| Property | Type     | Description            |
| -------- | -------- | ---------------------- |
| `class`  | `string` | Additional CSS classes |

### ScSelectSeparator

| Property | Type     | Description            |
| -------- | -------- | ---------------------- |
| `class`  | `string` | Additional CSS classes |

### All Components

All components accept a `class` input for custom styling:

```html
<div scSelect class="w-64">
  <div scSelectInputGroup class="bg-slate-100">
    <input scSelectInput placeholder="Choose..." aria-label="Choose" />
  </div>
</div>
```

## Architecture

```
ScSelect (root, wraps Combobox, owns overlay, exportAs: 'scSelect')
├── ScSelectInputGroup (styled container, overlay origin)
│   ├── ScSelectItemIcon (consumer icons) [projected content]
│   ├── ScSelectInput (wraps ComboboxInput, displays selected value, placeholder, aria-label) [projected content]
│   └── ScSelectIcon (chevron icon with expand/collapse rotation) [projected content]
└── ScSelectPortal (ng-template marking lazy overlay content)
    └── ScSelectPopup (popup container with styling and animation)
        └── ScSelectList (wraps Listbox)
            ├── ScSelectGroup (groups related options)
            │   ├── ScSelectGroupLabel (label for the group)
            │   └── ScSelectItem (wraps Option)
            │       ├── ScSelectItemIcon (consumer icons) [projected content]
            │       ├── [projected content]
            │       └── ScSelectItemIndicator (checkmark for selected state) [projected content]
            ├── ScSelectSeparator (visual divider between groups)
            └── ScSelectItem (ungrouped option)
```

## Dependencies

- `@angular/aria/combobox` - Combobox behavior
- `@angular/aria/listbox` - Listbox and option behavior
- `@angular/cdk/overlay` - Overlay positioning
- `@semantic-icons/lucide-icons` - Icon library (used internally and with `ScSelectItemIcon`)
