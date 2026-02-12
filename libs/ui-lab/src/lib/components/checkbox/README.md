# Checkbox

A control that allows the user to toggle between checked and not checked.

## Components

- `ScCheckboxField` (selector: `[sc-checkbox-field]`) - Grid container that observes input state and positions children via `data-slot`
- `ScCheckbox` - Directive for native input (applied to `input[type="checkbox"]`)
- `ScCheckboxIndicator` - Directive for styling the visual checkbox box (applied to `span`)
- `ScVisualCheckbox` - Component for visual representation (rendered automatically by `ScCheckboxField`)

## Usage

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [(ngModel)]="accepted" id="terms" />
  <label sc-label for="terms">Accept terms and conditions</label>
</div>
```

## With Description

When a `data-slot="field-description"` child is present, the label automatically becomes `font-medium`:

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [(ngModel)]="marketing" id="marketing" />
  <label sc-label for="marketing">Marketing emails</label>
  <p sc-field-description>Receive emails about new products, features, and more.</p>
</div>
```

## With Label Element

Use `<label>` as the host element for implicit label association:

```html
<label sc-checkbox-field class="cursor-pointer">
  <input type="checkbox" sc-checkbox [(ngModel)]="option" />
  Option text
</label>
```

## With Signal Forms

`ScCheckbox` implements `FormCheckboxControl` and works seamlessly with Angular Signal Forms:

```typescript
import { signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';

readonly formModel = signal({ acceptTerms: false });
readonly myForm = form(this.formModel, (schemaPath) => {
  required(schemaPath.acceptTerms);
});
```

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [formField]="myForm.acceptTerms" id="terms" />
  <label sc-label for="terms">Accept terms and conditions</label>
</div>
```

Note: Add `FormField` to your component's `imports` array to use the `[formField]` directive. When using `[formField]`, you cannot use other property bindings like `[checked]` on the same element.

## Indeterminate State

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [(ngModel)]="allSelected" [indeterminate]="someSelected" />
  <label sc-label for="select-all">Select all</label>
</div>
```

## Disabled

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [disabled]="true" id="disabled-unchecked" />
  <label sc-label for="disabled-unchecked">Disabled unchecked</label>
</div>

<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [(ngModel)]="checked" [disabled]="true" id="disabled-checked" />
  <label sc-label for="disabled-checked">Disabled checked</label>
</div>
```

## Advanced: Custom Checkbox Indicator

Inject the checkbox context to build completely custom visuals:

```typescript
import { inject } from '@angular/core';
import { SC_CHECKBOX_FIELD } from '@semantic-components/ui-lab';

export class MyCustomCheckboxVisual {
  readonly checkbox = inject(SC_CHECKBOX_FIELD);

  // Use checkbox.checked(), checkbox.disabled(), checkbox.indeterminate(), checkbox.dataState()
}
```

## Custom Theme

Customize colors using CSS variables:

```html
<div style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);">
  <div sc-checkbox-field>
    <input type="checkbox" sc-checkbox [(ngModel)]="purple" id="purple" />
    <label sc-label for="purple">Purple checkbox</label>
  </div>
</div>
```

Available CSS variables:

- `--primary` - Border and background color when checked (OKLCH format: `oklch(lightness chroma hue)`)
- `--primary-foreground` - Checkmark color (OKLCH format: `oklch(lightness chroma hue)`)
- `--ring` - Focus ring color (OKLCH format: `oklch(lightness chroma hue)`)
- `--ring-offset-background` - Focus ring offset color

OKLCH format parameters:

- **Lightness**: 0 (black) to 1 (white)
- **Chroma**: 0 (gray) to ~0.4 (vivid color)
- **Hue**: 0-360 (color angle)

## Inputs

### ScCheckboxField (`[sc-checkbox-field]`)

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCheckbox (`sc-checkbox`)

| Input           | Type      | Default | Description                       |
| --------------- | --------- | ------- | --------------------------------- |
| `indeterminate` | `boolean` | `false` | Whether checkbox is indeterminate |
| `class`         | `string`  | `''`    | Additional CSS classes            |

Note: Standard input attributes (`id`, `name`, `checked`, `disabled`) are set directly on the native input element.

### ScVisualCheckbox (`sc-visual-checkbox`)

| Input | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

Note: `ScVisualCheckbox` is rendered automatically by `ScCheckboxField`. You do not need to add it manually.

## Data Slots

Children are positioned in the grid using `data-slot` attributes:

| Data Slot           | Grid Position | Component            |
| ------------------- | ------------- | -------------------- |
| `checkbox`          | col-1, row-1  | `ScCheckbox`         |
| `visual-checkbox`   | col-1, row-1  | `ScVisualCheckbox`   |
| `label`             | col-2, row-1  | `ScLabel`            |
| `field-description` | col-2, row-2  | `ScFieldDescription` |

## Context API

The `sc-checkbox-field` component provides a context via dependency injection that child components can access:

```typescript
export interface ScCheckboxContext {
  checked: () => boolean;
  disabled: () => boolean;
  indeterminate: () => boolean;
  dataState: () => 'checked' | 'unchecked' | 'indeterminate';
}
```

Inject using `SC_CHECKBOX_FIELD` token:

```typescript
import { inject } from '@angular/core';
import { SC_CHECKBOX_FIELD } from '@semantic-components/ui-lab';

readonly checkbox = inject(SC_CHECKBOX_FIELD);
```

## Data Attributes

| Attribute       | Values                                      | Description    |
| --------------- | ------------------------------------------- | -------------- |
| `data-state`    | `checked` \| `unchecked` \| `indeterminate` | Current state  |
| `data-disabled` | present when disabled                       | Disabled state |

## Accessibility

- Uses a native `<input type="checkbox">` with `opacity: 0` for full accessibility
- Native checkbox provides all semantic roles and ARIA attributes automatically
- Keyboard accessible via native browser behavior (Space/Enter to toggle)
- Focus ring styled via `peer-focus-visible` CSS classes
- Works seamlessly with associated `<label>` elements via `id` attribute
- Full native form integration (submission, validation, autofill)
- Visual representation is marked with `aria-hidden="true"` (decorative only)
- Compatible with all screen readers (NVDA, JAWS, VoiceOver, TalkBack)
- Indeterminate state synced to native input element

## Architecture

The checkbox uses a composable, grid-based architecture inspired by [Catalyst](https://catalyst.tailwindui.com/docs/checkbox):

### Grid Layout

`ScCheckboxField` uses a 2-column CSS Grid (`grid-cols-[1rem_1fr]`) where:

- **Column 1** (`1rem` = 16px) holds the checkbox input and visual indicator, both `size-4`, overlapping in the same grid cell
- **Column 2** (`1fr`) holds the label (row 1) and optional description (row 2)

Children are positioned using `*:data-[slot=...]` selectors on the parent, following the Catalyst data-slot pattern.

```
┌─ grid grid-cols-[1rem_1fr] ──────────────────────────┐
│  col-1 (1rem)   │  col-2 (1fr)                       │
│  ┌────────────┐ │                                    │
│  │ ScCheckbox │ │  <label data-slot="label">         │  row-1
│  │ + Visual   │ │                                    │
│  │ (overlap)  │ │                                    │
│  └────────────┘ │                                    │
│                 │  <p data-slot="field-description">  │  row-2
│                 │                                    │
└─────────────────┴────────────────────────────────────┘
       gap-x-2                  gap-y-1
```

### Component Structure

```
[sc-checkbox-field] (grid container, provides context)
├── <ng-content select="[sc-checkbox]" />  (projected input, col-1 row-1)
├── span[sc-visual-checkbox]               (visual, col-1 row-1, pointer-events-none)
│   └── span[sc-checkbox-indicator]        (box with border/background)
│       ├── <svg si-check-icon>            (checkmark icon)
│       └── <svg si-minus-icon>            (indeterminate icon)
└── <ng-content />                         (label, description, col-2)
```

**Template ordering:** The input is projected first (via `<ng-content select="[sc-checkbox]" />`), then the visual checkbox is rendered, then remaining content. This ensures the `peer` class on the input correctly enables `peer-focus-visible` and `peer-disabled` styles on the visual checkbox.

### Styling Breakdown

- **ScCheckboxField**: `grid grid-cols-[1rem_1fr] items-start gap-x-2 gap-y-1` - Grid container with data-slot positioning
- **ScCheckbox**: `peer size-4 cursor-pointer opacity-0` - Invisible native input (16px x 16px)
- **ScVisualCheckbox**: `pointer-events-none size-4` - Visual container, clicks pass through to input
- **ScCheckboxIndicator**: `size-4 border rounded-sm` - Actual visual checkbox box

### State Flow

```
Native Input (source of truth)
  ├─ User interactions (click, keyboard)
  ├─ Form bindings (ngModel, formField)
  └─ Attributes (checked, disabled, indeterminate)
         ↓
ScCheckboxField (observer)
  ├─ contentChild() queries ScCheckbox
  ├─ Reads signals from ScCheckbox directly
  └─ Provides context via SC_CHECKBOX_FIELD token
         ↓
ScVisualCheckbox (renderer)
  ├─ inject(SC_CHECKBOX_FIELD)
  └─ Renders based on checkbox.dataState()
```

**How state propagates:**

1. User interacts with native input (click, keyboard)
2. Input's `(change)` event handler updates the `checked` model signal
3. ScCheckboxField's computed signals react to changes (zoneless-compatible)
4. ScVisualCheckbox injects context and renders accordingly
5. CSS peer selectors style based on input state (focus, disabled, etc.)

### Benefits

This pattern provides:

- **Native behavior**: All browser/OS checkbox features work automatically
- **Accessibility**: Screen readers interact with the real checkbox
- **Composability**: Consumers provide their own input element with label and description
- **Grid layout**: Automatic alignment of checkbox, label, and description via data-slots
- **Flexibility**: Visual representation is fully customizable
- **Simplicity**: No manual ARIA management or keyboard handling needed
- **Single source of truth**: Native input owns all state
- **Zoneless compatible**: Works with OnPush change detection and zoneless mode
