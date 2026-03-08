# Input

A styled input directive that applies consistent styling and integrates with form fields and signal-based forms.

## Usage

```html
<input scInput placeholder="Enter your email" />
```

```typescript
import { ScInput } from '@semantic-components/ui';

@Component({
  imports: [ScInput],
  template: `
    <input scInput type="text" placeholder="Name" />
  `,
})
export class MyComponent {}
```

## API

### `scInput` directive

**Selector:** `input[scInput]`

| Input              | Type                   | Default     | Description                                       |
| ------------------ | ---------------------- | ----------- | ------------------------------------------------- |
| `variant`          | `'default' \| 'group'` | `'default'` | Visual variant. Use `'group'` inside input groups |
| `id`               | `string`               | auto        | Element id. Falls back to field id or generated   |
| `class`            | `string`               | `''`        | Additional CSS classes merged with base styles    |
| `disabled`         | `boolean`              | `false`     | Disables the input                                |
| `aria-describedby` | `string`               | `''`        | Linked description element ids                    |

**Data attributes:**

| Attribute   | Value                                                            |
| ----------- | ---------------------------------------------------------------- |
| `data-slot` | `'input'` or `'input-group-control'` (when variant is `'group'`) |

**Automatic behavior:**

- Sets `aria-invalid` when the linked `FormField` is touched and invalid.
- Sets `aria-describedby` from a parent `SC_FIELD` provider when available.
- Resolves `id` from the parent field context or generates a unique fallback.
- Reads `disabled` state from `FormField` signal state when present.

## Examples

### Basic input

```html
<input scInput type="text" placeholder="Username" />
```

### With a label (inside a field)

```html
<sc-field>
  <sc-label>Email</sc-label>
  <input scInput type="email" placeholder="you@example.com" />
  <sc-field-description>We'll never share your email.</sc-field-description>
</sc-field>
```

### File input

```html
<input scInput type="file" />
```

### Disabled

```html
<input scInput disabled placeholder="Cannot edit" />
```

### Group variant

```html
<input scInput variant="group" placeholder="Search..." />
```

## Accessibility

- Automatically sets `aria-invalid="true"` when the associated form control is touched and invalid.
- Propagates `aria-describedby` from parent field context so descriptions and error messages are announced by screen readers.
- Supports the native `disabled` attribute and reflects disabled state from signal-based forms.
