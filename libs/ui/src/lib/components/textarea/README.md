# Textarea

A styled textarea directive that integrates with Angular Signal Forms and the `ScField` layout system.

## Usage

```html
<textarea scTextarea placeholder="Type your message here."></textarea>
```

Import the directive:

```typescript
import { ScTextarea } from '@semantic-components/ui';
```

## API

### `scTextarea` directive

**Selector:** `textarea[scTextarea]`

#### Inputs

| Input              | Type                   | Default     | Description                                                                         |
| ------------------ | ---------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `variant`          | `'default' \| 'group'` | `'default'` | Visual variant. Use `'group'` inside input groups.                                  |
| `id`               | `string`               | auto        | Element id. Falls back to the parent field id or an auto-generated id.              |
| `class`            | `string`               | `''`        | Additional CSS classes merged with the base styles.                                 |
| `aria-describedby` | `string`               | `''`        | Explicit `aria-describedby`. Falls back to description ids from a parent `ScField`. |
| `disabled`         | `boolean`              | `false`     | Disables the textarea. Also reacts to the disabled state of a parent `FormField`.   |

#### Data attributes

| Attribute   | Value                                                             |
| ----------- | ----------------------------------------------------------------- |
| `data-slot` | `"textarea"` (default) or `"input-group-control"` (group variant) |

#### Host bindings

- `aria-invalid` is set automatically when the parent `FormField` is touched and invalid.
- `disabled` is set from the input or the parent `FormField` disabled state.

## Examples

### Basic

```html
<textarea scTextarea placeholder="Write something..."></textarea>
```

### With a field label and description

```html
<sc-field>
  <sc-label>Bio</sc-label>
  <textarea scTextarea placeholder="Tell us about yourself"></textarea>
  <sc-description>Max 300 characters.</sc-description>
</sc-field>
```

### Disabled

```html
<textarea scTextarea disabled placeholder="Cannot edit"></textarea>
```

### Inside an input group

```html
<textarea scTextarea variant="group"></textarea>
```

## Accessibility

- Automatically associates with a parent `ScField` for label and description linking via `id` and `aria-describedby`.
- Sets `aria-invalid="true"` when the bound `FormField` is touched and invalid, allowing assistive technology to announce validation errors.
- Supports the native `disabled` attribute.
