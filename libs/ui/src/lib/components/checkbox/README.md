# Checkbox

A native checkbox input with a custom visual overlay, label support, and indeterminate state.

## Usage

```html
<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="value" />
  <label scLabel>Accept terms and conditions</label>
</div>
```

### Label as Checkbox Field

Using `<label>` as the field makes the entire row clickable without needing `for`/`id` association:

```html
<label scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="value" />
  Accept terms and conditions
</label>
```

## Components

### ScCheckbox

Directive on a native `<input type="checkbox">`. Manages checked state, indeterminate property, and styling.

**Selector:** `input[type="checkbox"][scCheckbox]`

**Two-way Bindings:**

| Binding   | Type      | Description   |
| --------- | --------- | ------------- |
| `checked` | `boolean` | Checked state |

**Inputs:**

| Input           | Type      | Default | Description                |
| --------------- | --------- | ------- | -------------------------- |
| `indeterminate` | `boolean` | `false` | Indeterminate state        |
| `id`            | `string`  | auto    | Override auto-generated id |
| `class`         | `string`  | `''`    | Additional CSS classes     |

**Implements:** `FormCheckboxControl` from `@angular/forms/signals`

### ScCheckboxField

Container component that provides layout, visual overlay, and context for child components. Can be used on `<div>` or `<label>`.

**Selector:** `div[scCheckboxField]`, `label[scCheckboxField]`

**Data Attributes:**

| Attribute       | Values                                            |
| --------------- | ------------------------------------------------- |
| `data-state`    | `'checked'` \| `'unchecked'` \| `'indeterminate'` |
| `data-disabled` | `''` \| `null`                                    |

### ScCheckboxVisual

Internal component that renders the visual checkbox (check/minus icon). Automatically included by `ScCheckboxField`.

**Selector:** `span[scCheckboxVisual]`

## Examples

### Basic

```html
<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="terms" />
  <label scLabel>Accept terms and conditions</label>
</div>
```

### With Description

```html
<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="marketing" />
  <label scLabel>Marketing emails</label>
  <p scFieldDescription>Receive emails about new products and features.</p>
</div>
```

### Indeterminate

```html
<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="selectAll" [indeterminate]="isIndeterminate()" />
  <label scLabel>Select all</label>
</div>
```

### Disabled

```html
<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="value" disabled />
  <label scLabel>Disabled checkbox</label>
</div>
```

## Accessibility

- Uses native `<input type="checkbox">` — inherits full keyboard and screen reader support
- Auto-generates unique `id` for input-label association when used with `<div scCheckboxField>`
- `<label scCheckboxField>` wraps both input and text — no `for`/`id` needed
- `aria-describedby` automatically links to field descriptions
- Disabled state uses native `disabled` attribute
- Visual overlay is `aria-hidden="true"` — screen readers only see the native input
