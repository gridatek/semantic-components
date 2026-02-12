# Label

Renders an accessible label associated with controls.

## Components

- `ScLabel` - Styled label directive for form controls

## Usage

### Recommended: With Field Component

It is recommended to use the label inside a `sc-field` component for automatic association with form controls and better accessibility:

```html
<div sc-field>
  <label sc-label>Email</label>
  <input sc-input type="email" placeholder="Enter your email" />
  <p sc-field-description>The label automatically links to the input via the field context.</p>
</div>
```

When used inside a field, the label automatically associates with the input without needing an explicit `for` attribute.

### Standalone Usage

You can also use the label independently with an explicit `for` attribute:

```html
<label sc-label for="email">Email</label>
<input type="email" id="email" />
```

## With Checkbox

```html
<div class="flex items-center space-x-2">
  <sc-checkbox id="terms" />
  <label sc-label for="terms">Accept terms and conditions</label>
</div>
```

## With Input

```html
<div class="grid w-full max-w-sm items-center gap-1.5">
  <label sc-label for="email">Email</label>
  <input type="email" id="email" placeholder="Email" class="..." />
</div>
```

## Required Field

```html
<label sc-label for="required">
  Required Field
  <span class="text-destructive">*</span>
</label>
```

## Disabled Styling

The label supports `peer-disabled` styling when used with Tailwind's peer modifier:

```html
<input type="text" id="disabled" disabled class="peer ..." />
<label sc-label for="disabled">Disabled Input</label>
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

The label applies the following styles by default:

- `text-sm` - Small text size
- `font-medium` - Medium font weight
- `leading-none` - Tight line height
- `peer-disabled:cursor-not-allowed` - Not-allowed cursor when peer is disabled
- `peer-disabled:opacity-70` - Reduced opacity when peer is disabled

## Accessibility

- Uses native `<label>` element for built-in accessibility
- Associates with form controls via `for` attribute
- Clicking the label focuses/activates the associated control
