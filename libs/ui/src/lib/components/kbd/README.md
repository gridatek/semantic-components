# Kbd

Displays a keyboard key or shortcut indicator styled as an inline badge.

## Usage

```html
<kbd scKbd>K</kbd>
```

Import the directives:

```typescript
import { ScKbd, ScKbdGroup } from '@semantic-components/ui';
```

## Components

### ScKbd

A directive applied to `<kbd>` elements to style them as keyboard key indicators.

| Property | Type     | Default | Description                                          |
| -------- | -------- | ------- | ---------------------------------------------------- |
| `class`  | `string` | `''`    | Additional CSS classes to merge with default styles. |

**Selector:** `kbd[scKbd]`

**Host data attributes:**

- `data-slot="kbd"`

---

### ScKbdGroup

A directive applied to `<kbd>` elements to group multiple key indicators together with consistent spacing.

| Property | Type     | Default | Description                                          |
| -------- | -------- | ------- | ---------------------------------------------------- |
| `class`  | `string` | `''`    | Additional CSS classes to merge with default styles. |

**Selector:** `kbd[scKbdGroup]`

**Host data attributes:**

- `data-slot="kbd-group"`

## Examples

### Single key

```html
<kbd scKbd>K</kbd>
```

### Key combination

```html
<kbd scKbdGroup>
  <kbd scKbd>Ctrl</kbd>
  <kbd scKbd>K</kbd>
</kbd>
```

### Inside a tooltip

```html
<span scTooltipContent>
  Search
  <kbd scKbd>K</kbd>
</span>
```

The component automatically adjusts its colors when rendered inside a `[data-slot=tooltip-content]` container.

## Accessibility

The `<kbd>` HTML element is used, which carries native semantic meaning indicating user input from a keyboard. Screen readers will announce the content as keyboard input without additional ARIA attributes.
