# Kbd

A key or a shortcut, as it is pressed — in the look of the app's preset (`kbd` key: shadcn's in each of the eight styles). In a button (`data-icon="inline-end"`), an input group or a tooltip it takes their colours.

A key is read as text: where a symbol alone is unclear, write its name too (`<kbd scKbd>⌘<span class="sr-only"> Command</span></kbd>`).

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

---

### ScKbdGroup

A directive applied to `<kbd>` elements to group multiple key indicators together with consistent spacing.

| Property | Type     | Default | Description                                          |
| -------- | -------- | ------- | ---------------------------------------------------- |
| `class`  | `string` | `''`    | Additional CSS classes to merge with default styles. |

**Selector:** `kbd[scKbdGroup]`

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
