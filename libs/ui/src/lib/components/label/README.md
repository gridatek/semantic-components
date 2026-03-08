# Label

A directive that styles and connects `<label>` elements to form controls, with automatic integration with the field context.

## Usage

```html
<label scLabel for="email">Email</label>
<input id="email" type="email" />
```

## Components

### ScLabel

**Selector:** `label[scLabel]`

A directive applied to native `<label>` elements.

#### Inputs

| Input   | Type     | Default | Description                                                               |
| ------- | -------- | ------- | ------------------------------------------------------------------------- |
| `for`   | `string` | `''`    | The `id` of the associated form control. Falls back to the field context. |
| `class` | `string` | `''`    | Additional CSS classes merged with the default styles.                    |

#### Data Attributes

| Attribute   | Value     | Description                             |
| ----------- | --------- | --------------------------------------- |
| `data-slot` | `"label"` | Identifies the element as a label slot. |

## Examples

### Basic label

```html
<label scLabel for="name">Name</label>
<input id="name" type="text" />
```

### With field context

When used inside an `ScField`, the `for` attribute is automatically resolved from the field's `id`, so you don't need to set it explicitly.

```html
<div scField>
  <label scLabel>Email</label>
  <input scInput type="email" />
</div>
```

### With custom classes

```html
<label scLabel class="text-sm font-medium" for="username">Username</label>
```

## Accessibility

- The directive renders a native `<label>` element, ensuring built-in browser accessibility.
- The `for` attribute is automatically set, either from the explicit input or from the parent field context, linking the label to its form control.
- When the parent field is disabled (`data-disabled="true"`), the label's opacity is reduced to visually communicate the disabled state.
