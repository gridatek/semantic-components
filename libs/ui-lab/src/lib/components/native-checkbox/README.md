# Native Checkbox

A directive that styles native `<input type="checkbox">` elements while preserving native form behavior.

## Why Native Checkbox?

Unlike `ScCheckbox` (which is a custom component), `ScNativeCheckbox` is a directive for native HTML checkbox inputs. This provides:

- **Native form integration** - Works with `ngModel`, Reactive Forms, and Signal Forms
- **No ControlValueAccessor needed** - The native input handles all form state
- **Browser accessibility** - Leverages built-in browser accessibility features
- **Smaller bundle** - No custom form control logic

## Components

- `ScNativeCheckbox` - Directive for `<input type="checkbox">`

## Usage

### Basic

```html
<input scNativeCheckbox id="terms" (change)="onCheck($event)" />
<label for="terms">Accept terms</label>
```

### With ngModel

```html
<input scNativeCheckbox [(ngModel)]="accepted" id="terms" />
<label for="terms">Accept terms</label>
```

### With Signal Forms

```typescript
import { signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

readonly formModel = signal({ newsletter: false });
readonly checkboxForm = form(this.formModel);
```

```html
<input scNativeCheckbox type="checkbox" id="newsletter" [formField]="checkboxForm.newsletter" />
<label for="newsletter">Subscribe</label>
```

Note: Add `FormField` to your component's `imports` array to use the `[formField]` directive. When using `[formField]`, you cannot use other property bindings like `[checked]` on the same element.

### Indeterminate State

```html
<input scNativeCheckbox [indeterminate]="someSelected" id="select-all" />
<label for="select-all">Select all</label>
```

### Disabled

```html
<input scNativeCheckbox disabled id="disabled" />
<label for="disabled">Disabled checkbox</label>
```

## Inputs

| Input           | Type      | Default | Description                              |
| --------------- | --------- | ------- | ---------------------------------------- |
| `checked`       | `boolean` | -       | Checked state (for programmatic control) |
| `indeterminate` | `boolean` | `false` | Whether checkbox is indeterminate        |
| `class`         | `string`  | `''`    | Additional CSS classes                   |

## Architecture

### Styling Approach

The directive uses `appearance: none` to hide the native checkbox appearance and applies custom styles via Tailwind CSS classes. The checkmark icon is rendered as a background-image using inline SVG data URIs.

```
┌─────────────────────────────────────┐
│  Native <input type="checkbox">     │
│  ┌─────────────────────────────┐    │
│  │  appearance: none           │    │
│  │  + Tailwind border/bg       │    │
│  │  + SVG background-image     │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### State Tracking

The directive listens to `change` and `input` events to track the native checked state, then conditionally shows the checkmark SVG via `background-image`.

CSS pseudo-classes (`:checked`, `:disabled`, `:focus-visible`) handle visual state changes natively.

### Comparison with ScCheckbox

| Feature              | ScCheckbox          | ScNativeCheckbox       |
| -------------------- | ------------------- | ---------------------- |
| Type                 | Component           | Directive              |
| Form Integration     | Two-way via model() | Native form controls   |
| ARIA                 | Manual attributes   | Native browser support |
| Checkmark            | SVG in template     | SVG background-image   |
| Signal Forms         | FormCheckboxControl | FormCheckboxControl    |
| ControlValueAccessor | Not implemented     | Not needed             |

## Accessibility

- Native `<input type="checkbox">` provides built-in accessibility
- Works with `<label for="id">` associations
- Keyboard accessible (Space to toggle, Tab to navigate)
- Focus ring styling via `:focus-visible`
- Disabled state via native `disabled` attribute
