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

Uses Tailwind's advanced selectors for consistent spacing:

```css
'*:data-[slot=control]:mt-2 [&>[data-slot=control]+[data-slot=description]]:mt-2'
```

### Breakdown:

- `*:data-[slot=control]:mt-2` - Any element with `data-slot="control"` gets `margin-top: 0.5rem`
- `[&>[data-slot=control]+[data-slot=description]]:mt-2` - Description gets top margin only when immediately following a control

### Visual Result:

```
Label
  ↓ (no margin)
Control
  ↓ (mt-2 = 8px)
Description (only if directly after control)
  ↓ (mt-2 = 8px)
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

### 2. Expose id signal

```typescript
export class MyFormComponent {
  readonly idInput = input<string>(inject(_IdGenerator).getId('my-component-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());
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
