# Field

A flexible field composition system for building accessible forms with labels, descriptions, errors, and various layout orientations.

## Components

- `ScField` - Main field wrapper with orientation support
- `ScFieldset` - Fieldset container for grouping related fields
- `ScLegend` - Legend element for fieldsets
- `ScFieldGroup` - Container for multiple fields
- `ScFieldContent` - Content wrapper for field elements
- `ScFieldLabel` - Label element
- `ScFieldTitle` - Alternative title element (non-label)
- `ScFieldDescription` - Description/help text
- `ScFieldSeparator` - Visual separator with optional content
- `ScFieldError` - Error message display with multi-error support

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
    <div sc-field>
      <label sc-field-label for="email">Email</label>
      <input id="email" type="email" />
      <p sc-field-description>We'll never share your email.</p>
    </div>
  `,
})
```

### Horizontal Layout

```typescript
@Component({
  template: `
    <div sc-field [orientation]="'horizontal'">
      <label sc-field-label for="username">Username</label>
      <input id="username" type="text" />
    </div>
  `,
})
```

### Responsive Layout

```typescript
@Component({
  template: `
    <div sc-field [orientation]="'responsive'">
      <label sc-field-label for="name">Name</label>
      <div sc-field-content>
        <input id="name" type="text" />
        <p sc-field-description>Enter your full name.</p>
      </div>
    </div>
  `,
})
```

### With Validation Errors

```typescript
import { Component, signal } from '@angular/core';
import { ScField, ScFieldLabel, ScFieldError, ScFieldErrorItem } from '@semantic-components/ui-lab';

@Component({
  template: `
    <div sc-field [invalid]="errors().length > 0">
      <label sc-field-label for="password">Password</label>
      <input id="password" type="password" />
      <div sc-field-error [errors]="errors()"></div>
    </div>
  `,
})
export class MyComponent {
  readonly errors = signal<ScFieldErrorItem[]>([{ message: 'Password must be at least 8 characters' }, { message: 'Password must contain a number' }]);
}
```

### Single Error Display

```typescript
@Component({
  template: `
    <div sc-field [invalid]="error()">
      <label sc-field-label for="email">Email</label>
      <input id="email" type="email" />
      @if (error()) {
        <div sc-field-error [errors]="[{ message: error() }]"></div>
      }
    </div>
  `,
})
export class MyComponent {
  readonly error = signal<string>('');
}
```

### Using ScFieldError with Template

For custom error rendering, you can use the error directive with content projection:

```typescript
@Component({
  template: `
    <div sc-field [invalid]="errors().length > 0">
      <label sc-field-label for="email">Email</label>
      <input id="email" type="email" />

      @if (errors().length === 1) {
        <div sc-field-error>{{ errors()[0].message }}</div>
      } @else if (errors().length > 1) {
        <div sc-field-error>
          <ul class="ml-4 flex list-disc flex-col gap-1">
            @for (error of errors(); track error.message) {
              <li>{{ error.message }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
})
export class MyComponent {
  readonly errors = signal<ScFieldErrorItem[]>([]);
}
```

### Field Groups

```typescript
@Component({
  template: `
    <div sc-field-group>
      <div sc-field>
        <label sc-field-label for="firstName">First Name</label>
        <input id="firstName" type="text" />
      </div>

      <div sc-field>
        <label sc-field-label for="lastName">Last Name</label>
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
    <fieldset sc-fieldset>
      <legend sc-legend>Personal Information</legend>

      <div sc-field-group>
        <div sc-field>
          <label sc-field-label for="name">Name</label>
          <input id="name" type="text" />
        </div>

        <div sc-field>
          <label sc-field-label for="email">Email</label>
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
    <div sc-field-group>
      <div sc-field>
        <label sc-field-label for="email">Email</label>
        <input id="email" type="email" />
      </div>

      <div sc-field-separator>or</div>

      <div sc-field>
        <label sc-field-label for="phone">Phone</label>
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
    <div sc-field [disabled]="true">
      <label sc-field-label for="readonly">Read-only Field</label>
      <input id="readonly" type="text" disabled />
      <p sc-field-description>This field is disabled.</p>
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

### ScFieldError

| Input    | Type                 | Default | Description            |
| -------- | -------------------- | ------- | ---------------------- |
| `errors` | `ScFieldErrorItem[]` | `[]`    | Array of error objects |
| `class`  | `string`             | `''`    | Additional CSS classes |

**ScFieldErrorItem interface:**

```typescript
interface ScFieldErrorItem {
  message?: string;
}
```

### Other Components

All other components (`ScFieldset`, `ScFieldGroup`, `ScFieldContent`, `ScFieldLabel`, `ScFieldTitle`, `ScFieldDescription`, `ScFieldSeparator`) accept a `class` input for additional styling.

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

The `ScFieldError` component automatically handles:

- **No errors**: Component is hidden
- **Single error**: Displays the error message directly
- **Multiple errors**: Can be displayed as a list using content projection

Use the `errors` input with an array of error objects, or use content projection for custom error rendering.

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
- `data-slot="field-content"` - Content wrapper
- `data-slot="field-label"` - Label element
- `data-slot="field-title"` - Title element
- `data-slot="field-description"` - Description text
- `data-slot="field-separator"` - Separator element
- `data-slot="field-error"` - Error message

Use these slots to customize styling or target specific elements in your CSS.
