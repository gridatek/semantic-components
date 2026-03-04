# Button Pattern

A directive that adds button behavior to non-button elements, making them keyboard-accessible and semantically correct.

## Import

```typescript
import { ScButtonPattern } from '@semantic-components/ui-lab';
```

## API

| Property          | Type             | Default | Description                         |
| ----------------- | ---------------- | ------- | ----------------------------------- |
| `scButtonPattern` | `input(boolean)` | `true`  | Enables or disables button behavior |

- **Selector**: `[scButtonPattern]`

When enabled, the directive:

- Adds `role="button"` to the host element
- Adds `tabindex="0"` for keyboard focusability
- Handles `Enter` and `Space` key presses by triggering a click event

## Usage

### Basic

```html
<div scButtonPattern (click)="doSomething()">Click me</div>
```

### Conditionally Enabled

```html
<div [scButtonPattern]="isInteractive()" (click)="doSomething()">Maybe clickable</div>
```

## When to Use

Use this directive when you need button-like behavior on a non-button element (e.g., a `<div>` or `<span>`). Prefer using a native `<button>` element whenever possible.
