# Field

A flexible field composition system for building accessible forms with labels, descriptions, errors, and various layout orientations.

## Components

- `ScField` - Main field wrapper with orientation support
- `ScFieldset` - Fieldset container for grouping related fields
- `ScLegend` - Legend element for fieldsets
- `ScFieldGroup` - Container for multiple fields
- `ScFieldBody` - Content wrapper for field elements
- `ScFieldLabel` - Label element
- `ScFieldTitle` - Alternative title element (non-label)
- `ScFieldDescription` - Description/help text
- `ScFieldSeparator` - Visual separator with optional content
- `ScFieldErrors` - Auto-renders validation errors from `FormField` state

## Features

- **Three orientation modes**: vertical, horizontal, and responsive
- **Flexible composition**: Mix and match components as needed
- **Error handling**: Display single or multiple validation errors
- **Disabled state**: Automatically propagates to child components
- **Invalid state**: Visual feedback for validation errors
- **Container queries**: Responsive layout using `@container` queries
- **Separator with content**: Optional text in separators

## Usage

### Basic Vertical Field

```typescript
import { Component } from '@angular/core';
import { ScField, ScFieldLabel, ScFieldDescription } from '@semantic-components/ui-lab';

@Component({
  template: `
    <div scField>
      <label scFieldLabel for="email">Email</label>
      <input id="email" type="email" />
      <p scFieldDescription>We'll never share your email.</p>
    </div>
  `,
})
```

### Horizontal Layout

```typescript
@Component({
  template: `
    <div scField [orientation]="'horizontal'">
      <label scFieldLabel for="username">Username</label>
      <input id="username" type="text" />
    </div>
  `,
})
```

### Responsive Layout

```typescript
@Component({
  template: `
    <div scField [orientation]="'responsive'">
      <label scFieldLabel for="name">Name</label>
      <div scFieldBody>
        <input id="name" type="text" />
        <p scFieldDescription>Enter your full name.</p>
      </div>
    </div>
  `,
})
```

### With Validation Errors

`ScFieldErrors` automatically reads errors from the parent `ScField`'s `FormField` directive. It renders when the field is touched and invalid.

```typescript
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ScField, ScFieldErrors, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  imports: [FormField, ScField, ScFieldErrors, ScInput, ScLabel],
  template: `
    <div scField>
      <label scLabel>Password</label>
      <input scInput type="password" [formField]="passwordForm.password" placeholder="Enter password" />
      <div scFieldErrors></div>
    </div>
  `,
})
export class MyComponent {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel, (s) => {
    required(s.password, { message: 'Password is required' });
  });
}
```

- **Single error**: renders as plain text
- **Multiple errors**: renders as a `<ul>` list with `list-disc` styling
- **No errors**: hidden via `[hidden]`

### Field Groups

```typescript
@Component({
  template: `
    <div scFieldGroup>
      <div scField>
        <label scFieldLabel for="firstName">First Name</label>
        <input id="firstName" type="text" />
      </div>

      <div scField>
        <label scFieldLabel for="lastName">Last Name</label>
        <input id="lastName" type="text" />
      </div>
    </div>
  `,
})
```

### FieldSet with Legend

```typescript
@Component({
  template: `
    <fieldset scFieldset>
      <legend scLegend>Personal Information</legend>

      <div scFieldGroup>
        <div scField>
          <label scFieldLabel for="name">Name</label>
          <input id="name" type="text" />
        </div>

        <div scField>
          <label scFieldLabel for="email">Email</label>
          <input id="email" type="email" />
        </div>
      </div>
    </fieldset>
  `,
})
```

### Field Separator

```typescript
@Component({
  template: `
    <div scFieldGroup>
      <div scField>
        <label scFieldLabel for="email">Email</label>
        <input id="email" type="email" />
      </div>

      <div scFieldSeparator>or</div>

      <div scField>
        <label scFieldLabel for="phone">Phone</label>
        <input id="phone" type="tel" />
      </div>
    </div>
  `,
})
```

### Disabled State

```typescript
@Component({
  template: `
    <div scField [disabled]="true">
      <label scFieldLabel for="readonly">Read-only Field</label>
      <input id="readonly" type="text" disabled />
      <p scFieldDescription>This field is disabled.</p>
    </div>
  `,
})
```

## Inputs & Outputs

### ScField

| Input         | Type                                         | Default      | Description               |
| ------------- | -------------------------------------------- | ------------ | ------------------------- |
| `orientation` | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | Layout orientation        |
| `invalid`     | `boolean`                                    | `false`      | Whether field has errors  |
| `disabled`    | `boolean`                                    | `false`      | Whether field is disabled |
| `class`       | `string`                                     | `''`         | Additional CSS classes    |

### ScLegend

| Input     | Type                  | Default    | Description            |
| --------- | --------------------- | ---------- | ---------------------- |
| `variant` | `'legend' \| 'label'` | `'legend'` | Visual variant         |
| `class`   | `string`              | `''`       | Additional CSS classes |

### ScFieldErrors

Automatically reads errors from the parent `ScField`'s `FormField`. No inputs required for error data.

| Input         | Type     | Default    | Description              |
| ------------- | -------- | ---------- | ------------------------ |
| `class`       | `string` | `''`       | Additional CSS classes   |
| `id`          | `string` | `''`       | Override generated ID    |
| `aria-live`   | `string` | `'polite'` | Live region announcement |
| `aria-atomic` | `string` | `'true'`   | Announce region as whole |

### Other Components

All other components (`ScFieldset`, `ScFieldGroup`, `ScFieldBody`, `ScFieldLabel`, `ScFieldTitle`, `ScFieldDescription`, `ScFieldSeparator`) accept a `class` input for additional styling.

## Layout Orientations

### Vertical (Default)

Fields stack vertically with labels above inputs:

```
[Label]
[Input]
[Description]
```

### Horizontal

Labels and inputs on the same line:

```
[Label] [Input]
```

### Responsive

Vertical on mobile, horizontal on larger screens using container queries:

```
Mobile:     Desktop:
[Label]     [Label] [Input]
[Input]
```

## Error Display

The `ScFieldErrors` component automatically handles:

- **No errors**: Component is hidden
- **Single error**: Displays the error message directly
- **Multiple errors**: Displays as a `<ul>` list with disc markers

Errors are automatically read from the parent `ScField`'s `FormField` directive when the field is touched and invalid.

## Accessibility

- Uses `role="group"` for field wrapper
- Uses `role="alert"` for error messages
- Supports proper label associations via `for` attribute
- Disabled state uses `data-disabled` attribute
- Invalid state uses `data-invalid` attribute
- Error messages are announced to screen readers

## Styling

The component uses `data-slot` attributes for targeted styling:

- `data-slot="field"` - Main field container
- `data-slot="fieldset"` - Fieldset container
- `data-slot="legend"` - Legend element
- `data-slot="field-group"` - Field group container
- `data-slot="field-body"` - Content wrapper
- `data-slot="field-label"` - Label element
- `data-slot="field-title"` - Title element
- `data-slot="field-description"` - Description text
- `data-slot="field-separator"` - Separator element
- `data-slot="field-errors"` - Error message

Use these slots to customize styling or target specific elements in your CSS.
