# ScField Component

The `ScField` component is a generic wrapper that automatically handles label-to-control associations and provides consistent spacing for form fields.

## Overview

`ScField` automatically:

- Generates unique IDs using Angular CDK's `_IdGenerator`
- Associates labels with form controls via `for`/`id` attributes
- Provides consistent spacing between form elements
- Works with any component that has `data-slot="control"` and exposes an `id` signal

## Usage

### Basic Pattern

```html
<sc-field>
  <label sc-label>Field Label</label>
  <input data-slot="control" />
</sc-field>
```

### With Combobox

```html
<sc-field>
  <label sc-label>Select a country</label>
  <sc-combobox [items]="countries" [(ngModel)]="selectedCountry" placeholder="Choose..." />
</sc-field>
```

### With Input

```html
<sc-field>
  <label sc-label>Your name</label>
  <input sc-input placeholder="Enter name..." />
</sc-field>
```

### Floating Labels

Enable floating labels by setting the `floatingLabel` input to `true`. The label will animate from inside the input to above it when the field gains focus or has a value. ScField automatically calls `placeholder.set(" ")` on components that expose a writable placeholder signal.

```html
<!-- Basic floating label -->
<sc-field [floatingLabel]="true">
  <label sc-label>Email Address</label>
  <input sc-input />
</sc-field>

<!-- Floating label with combobox -->
<sc-field [floatingLabel]="true">
  <label sc-label>Choose Country</label>
  <sc-combobox [items]="countries" [(ngModel)]="selectedCountry" />
</sc-field>

<!-- Floating label with textarea -->
<sc-field [floatingLabel]="true">
  <label sc-label>Your Message</label>
  <textarea sc-input rows="4"></textarea>
</sc-field>
```

#### Floating Label Behavior

- **Default state**: Label positioned inside the input field
- **Focus state**: Label floats up, scales down, and changes color to primary
- **Has value state**: Label remains floated even when not focused
- **Smooth animations**: CSS transitions for all state changes

## Architecture

### Content Projection

- **One label**: Uses `contentChild(ScLabel)` to find the single label
- **One control**: Uses `contentChild('[data-slot="control"]')` to find the single form control

### Auto-ID Generation

```typescript
readonly id = signal<string>(inject(_IdGenerator).getId('sc-field-'));
```

Generates unique IDs like: `sc-field-1`, `sc-field-2`, etc.

### Dynamic Component Detection

```typescript
afterNextRender(() => {
  const fieldId = this.id();

  // Set label for attribute
  this.scLabel()?.for.set(fieldId);

  // Auto-detect and set ID on form control
  const controlRef = this.formControl();
  if (controlRef) {
    const component = (controlRef.nativeElement as any)?.__ngContext__?.[8];

    if (component) {
      // Set ID signal
      if (component.id?.set) {
        component.id.set(fieldId);
      }
    }
  }
});
```

## CSS Spacing

### Regular Fields

Uses Tailwind's advanced selectors for consistent spacing:

```css
'*:data-[slot=control]:mt-2 [&>[data-slot=control]+[data-slot=description]]:mt-2'
```

**Breakdown:**

- `*:data-[slot=control]:mt-2` - Any element with `data-slot="control"` gets `margin-top: 0.5rem`
- `[&>[data-slot=control]+[data-slot=description]]:mt-2` - Description gets top margin only when immediately following a control

**Visual Result:**

```
Label
  ↓ (no margin)
Control
  ↓ (mt-2 = 8px)
Description (only if directly after control)
  ↓ (mt-2 = 8px)
```

### Floating Label Styles

When `[floatingLabel]="true"`, different CSS classes are applied:

```css
// Container positioning
'relative'

// Label positioning and animations
'[&_label]:absolute [&_label]:left-3 [&_label]:transition-all [&_label]:duration-200 [&_label]:ease-in-out [&_label]:pointer-events-none'
'[&_label]:top-1/2 [&_label]:-translate-y-1/2 [&_label]:text-gray-500'

// Focus state
'[&:has([data-slot=control]:focus)_label]:top-0 [&:has([data-slot=control]:focus)_label]:text-xs [&:has([data-slot=control]:focus)_label]:text-blue-600 [&:has([data-slot=control]:focus)_label]:bg-white [&:has([data-slot=control]:focus)_label]:px-1'

// Has value state
'[&:has([data-slot=control][data-has-value])_label]:top-0 [&:has([data-slot=control][data-has-value])_label]:text-xs [&:has([data-slot=control][data-has-value])_label]:text-gray-600 [&:has([data-slot=control][data-has-value])_label]:bg-white [&:has([data-slot=control][data-has-value])_label]:px-1'
```

## Making Components Compatible

To make any component work with `ScField`:

### 1. Add data-slot attribute

```typescript
@Component({
  // ...
  host: {
    'data-slot': 'control',
  },
})
```

### 2. Expose id signal and writable placeholder

```typescript
export class MyFormComponent {
  readonly idInput = input<string>(inject(_IdGenerator).getId('my-component-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());

  // For floating label support - expose writable placeholder signal
  readonly placeholderInput = input<string>('Default placeholder', {
    alias: 'placeholder',
  });
  readonly placeholder = linkedSignal(() => this.placeholderInput());
}
```

## Benefits

- **Automatic accessibility** - Proper label/control associations
- **No manual ID management** - IDs generated and connected automatically
- **Consistent spacing** - Uses design system spacing tokens
- **Generic design** - Works with any compatible form control
- **Clean templates** - Eliminates boilerplate `for` and `id` attributes

## Example: Before vs After

### Before (Manual)

```html
<label sc-label for="email-input-123">Email</label>
<input id="email-input-123" sc-input placeholder="Enter email..." />
```

### After (ScField)

```html
<sc-field>
  <label sc-label>Email</label>
  <input sc-input placeholder="Enter email..." />
</sc-field>
```

The field automatically generates and connects the IDs, ensuring proper accessibility while keeping templates clean.
