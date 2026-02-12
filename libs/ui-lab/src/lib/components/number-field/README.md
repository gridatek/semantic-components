# Number Field

A composable numeric input component with scrubbing support, increment/decrement buttons, and label integration.

## Architecture

The Number Field component follows a composable pattern with multiple sub-components:

- **ScNumberField**: Root container that manages state and provides context
- **ScNumberFieldScrubArea**: Interactive label area with mouse scrubbing to adjust values
- **ScNumberFieldInputGroup**: Container for input and stepper buttons
- **ScNumberFieldInput**: The numeric input field
- **ScNumberFieldIncrement**: Button to increase value
- **ScNumberFieldDecrement**: Button to decrease value

## Basic Usage

```html
<div sc-number-field [(value)]="quantity" [min]="1" [max]="10">
  <div sc-number-field-scrub-area>
    <label sc-label>Quantity</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

## Components

### ScNumberField

Root container directive that manages the numeric state and provides context to child components.

**Selector:** `[sc-number-field]`

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

### ScNumberFieldScrubArea

An interactive area (typically wrapping a label) that allows users to scrub (drag) to change the value.

**Selector:** `[sc-number-field-scrub-area]`

**Features:**

- Click and drag horizontally to adjust value
- Visual feedback with cursor change
- Respects min/max boundaries
- Configurable scrub speed

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberFieldInputGroup

Container for grouping the input field with increment/decrement buttons.

**Selector:** `[sc-number-field-group]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberFieldInput

The input field for displaying and editing the numeric value.

**Selector:** `input[sc-number-field-input]`

**Features:**

- Automatic number formatting
- Keyboard support (Arrow Up/Down)
- Input validation
- Respects disabled state

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberFieldIncrement

Button to increase the value by the step amount.

**Selector:** `button[sc-number-field-increment]`

**Features:**

- Auto-disables when max value reached
- Custom icon support via content projection
- Keyboard accessible

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNumberFieldDecrement

Button to decrease the value by the step amount.

**Selector:** `button[sc-number-field-decrement]`

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
<div sc-number-field [(value)]="count" [min]="0" [max]="100">
  <div sc-number-field-scrub-area>
    <label sc-label>Count</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

### With Custom Step

```html
<div sc-number-field [(value)]="price" [step]="0.5" [min]="0">
  <div sc-number-field-scrub-area>
    <label sc-label>Price</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

### Decimal Values with Formatting

```html
<div sc-number-field [(value)]="amount" [step]="0.01" [min]="0" [formatOptions]="{ minimumFractionDigits: 2, maximumFractionDigits: 2 }">
  <div sc-number-field-scrub-area>
    <label sc-label>Amount ($)</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

### Custom Scrub Speed

```html
<div sc-number-field [(value)]="opacity" [min]="0" [max]="100" [scrubSpeed]="0.5">
  <div sc-number-field-scrub-area>
    <label sc-label>Opacity (%)</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

### Disabled State

```html
<div sc-number-field [value]="10" [disabled]="true">
  <div sc-number-field-scrub-area>
    <label sc-label>Locked Value</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

### Without Label (Input Group Only)

```html
<div sc-number-field [(value)]="quantity" [min]="1" [max]="10">
  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

### Custom Icons

```html
<div sc-number-field [(value)]="volume">
  <div sc-number-field-scrub-area>
    <label sc-label>Volume</label>
  </div>

  <div sc-number-field-group>
    <button sc-number-field-decrement>
      <svg><!-- Custom minus icon --></svg>
    </button>
    <input sc-number-field-input />
    <button sc-number-field-increment>
      <svg><!-- Custom plus icon --></svg>
    </button>
  </div>
</div>
```

### With Description

```html
<div class="space-y-2">
  <div sc-number-field [(value)]="age" [min]="0" [max]="120">
    <div sc-number-field-scrub-area>
      <label sc-label>Age</label>
    </div>

    <div sc-number-field-group>
      <button sc-number-field-decrement></button>
      <input sc-number-field-input />
      <button sc-number-field-increment></button>
    </div>
  </div>
  <p class="text-sm text-muted-foreground">Your age in years</p>
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

Components communicate through the `SC_NUMBER_FIELD` injection token:

```typescript
export const SC_NUMBER_FIELD = new InjectionToken<ScNumberField>('SC_NUMBER_FIELD');
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
