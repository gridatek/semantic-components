# Number

A composable numeric input component with scrubbing support, increment/decrement buttons, and label integration.

## Architecture

The Number component follows a composable pattern with multiple sub-components:

- **ScNumber**: Directive that manages state and provides context. Must be used inside an `ScField`
- **ScNumberScrubArea**: Interactive label area with mouse scrubbing to adjust values
- **ScButtonGroup**: Container for input and stepper buttons
- **ScNumberInput**: The numeric input field
- **ScNumberIncrement**: Button to increase value
- **ScNumberDecrement**: Button to decrease value

## Basic Usage

```html
<div scNumber [(value)]="quantity" [min]="1" [max]="10">
  <div scNumberScrubArea>
    <label scLabel>Quantity</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

## Components

### ScNumber

Directive that manages the numeric state and provides context to child components.

**Selector:** `div[scNumber]`

`ScNumber` is not a field — it must be used inside an `ScField`.

**Inputs:**

| Input           | Type                       | Default | Description                      |
| --------------- | -------------------------- | ------- | -------------------------------- |
| `min`           | `number \| null`           | `null`  | Minimum allowed value            |
| `max`           | `number \| null`           | `null`  | Maximum allowed value            |
| `step`          | `number`                   | `1`     | Increment/decrement step size    |
| `disabled`      | `boolean`                  | `false` | Disabled state                   |
| `allowEmpty`    | `boolean`                  | `true`  | Allow null/empty value           |
| `scrubSpeed`    | `number`                   | `1`     | Mouse scrubbing speed multiplier |
| `formatOptions` | `Intl.NumberFormatOptions` | `{}`    | Number formatting options        |
| `class`         | `string`                   | `''`    | Additional CSS classes           |

**Two-way Bindings:**

| Binding | Type             | Default | Description   |
| ------- | ---------------- | ------- | ------------- |
| `value` | `number \| null` | `null`  | Current value |

**Outputs:**

| Output        | Type             | Description                |
| ------------- | ---------------- | -------------------------- |
| `valueChange` | `number \| null` | Emitted when value changes |

### ScNumberScrubArea

An interactive area (typically wrapping a label) that allows users to scrub (drag) to change the value.

**Selector:** `[scNumberScrubArea]`

**Features:**

- Click and drag horizontally to adjust value
- Visual feedback with cursor change
- Respects min/max boundaries
- Configurable scrub speed

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScButtonGroup

Container for grouping the input field with increment/decrement buttons.

**Selector:** `[scButtonGroup]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberInput

The input field for displaying and editing the numeric value.

**Selector:** `input[scNumberInput]`

**Features:**

- Automatic number formatting
- Keyboard support (Arrow Up/Down)
- Input validation
- Respects disabled state

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberIncrement

Button to increase the value by the step amount.

**Selector:** `button[scNumberIncrement]`

**Features:**

- Auto-disables when max value reached
- Custom icon support via content projection
- Keyboard accessible

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberDecrement

Button to decrease the value by the step amount.

**Selector:** `button[scNumberDecrement]`

**Features:**

- Auto-disables when min value reached
- Custom icon support via content projection
- Keyboard accessible

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Examples

### Basic with Label

```html
<div scNumber [(value)]="count" [min]="0" [max]="100">
  <div scNumberScrubArea>
    <label scLabel>Count</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

### With Custom Step

```html
<div scNumber [(value)]="price" [step]="0.5" [min]="0">
  <div scNumberScrubArea>
    <label scLabel>Price</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

### Decimal Values with Formatting

```html
<div scNumber [(value)]="amount" [step]="0.01" [min]="0" [formatOptions]="{ minimumFractionDigits: 2, maximumFractionDigits: 2 }">
  <div scNumberScrubArea>
    <label scLabel>Amount ($)</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

### Custom Scrub Speed

```html
<div scNumber [(value)]="opacity" [min]="0" [max]="100" [scrubSpeed]="0.5">
  <div scNumberScrubArea>
    <label scLabel>Opacity (%)</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

### Disabled State

```html
<div scNumber [value]="10" [disabled]="true">
  <div scNumberScrubArea>
    <label scLabel>Locked Value</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

### Without Label (Input Group Only)

```html
<div scNumber [(value)]="quantity" [min]="1" [max]="10">
  <div scButtonGroup>
    <button scNumberDecrement></button>
    <input scNumberInput />
    <button scNumberIncrement></button>
  </div>
</div>
```

### Custom Icons

```html
<div scNumber [(value)]="volume">
  <div scNumberScrubArea>
    <label scLabel>Volume</label>
  </div>

  <div scButtonGroup>
    <button scNumberDecrement>
      <svg><!-- Custom minus icon --></svg>
    </button>
    <input scNumberInput />
    <button scNumberIncrement>
      <svg><!-- Custom plus icon --></svg>
    </button>
  </div>
</div>
```

### With Description

```html
<div class="space-y-2">
  <div scNumber [(value)]="age" [min]="0" [max]="120">
    <div scNumberScrubArea>
      <label scLabel>Age</label>
    </div>

    <div scButtonGroup>
      <button scNumberDecrement></button>
      <input scNumberInput />
      <button scNumberIncrement></button>
    </div>
  </div>
  <p class="text-muted-foreground text-sm">Your age in years</p>
</div>
```

## Scrubbing Behavior

The scrub area allows users to adjust values by clicking and dragging:

1. **Click** on the scrub area (label)
2. **Drag left** to decrease value
3. **Drag right** to increase value
4. The cursor changes to indicate scrubbing mode
5. Value updates in real-time as you drag

**Scrub Speed Formula:**

```
newValue = currentValue + (mouseDeltaX * step * scrubSpeed)
```

## Keyboard Navigation

When focused on the input field:

| Key         | Action                 |
| ----------- | ---------------------- |
| `ArrowUp`   | Increment by step      |
| `ArrowDown` | Decrement by step      |
| `Tab`       | Move to next focusable |
| `Shift+Tab` | Move to prev focusable |
| `Enter`     | Confirm and blur       |

## Features

- **Mouse Scrubbing**: Drag on label to adjust value
- **Min/Max Constraints**: Enforce value boundaries
- **Custom Step**: Support any step value including decimals
- **Decimal Precision**: Handles floating-point precision correctly
- **Number Formatting**: Optional Intl.NumberFormat support
- **Empty Values**: Optional null value support
- **Disabled State**: Full disabled support across all sub-components
- **Keyboard Support**: Arrow keys for increment/decrement
- **Two-way Binding**: Sync with `[(value)]`
- **Composable**: Mix and match sub-components as needed

## Accessibility

- Proper ARIA attributes on input (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`)
- Labels properly associated with inputs
- `aria-label` on increment/decrement buttons
- Disabled states properly communicated
- Keyboard navigation support
- Focus management within component
- Screen reader friendly value announcements

## Styling

All components accept a `class` input for custom styling. Default styles provide:

- Consistent border and spacing
- Focus states with ring
- Hover states on buttons
- Disabled state opacity
- Scrub area cursor feedback

## Component Communication

Components communicate through the `SC_NUMBER` injection token:

```typescript
export const SC_NUMBER = new InjectionToken<ScNumber>('SC_NUMBER');
```

Child components inject the parent context to access:

- Current value
- Min/Max constraints
- Step size
- Disabled state
- Increment/Decrement methods
- Can increment/decrement computed values

## Best Practices

1. **Always provide a label** for accessibility, even if visually hidden
2. **Set min/max** when there are logical boundaries
3. **Use appropriate step values** for the data type (e.g., 0.01 for currency)
4. **Adjust scrubSpeed** for different value ranges (smaller for large ranges)
5. **Consider formatOptions** for displaying formatted numbers
6. **Test keyboard navigation** to ensure accessibility
