# Button Group

Groups related buttons, inputs, or selects into a single visual unit with merged borders and rounded corners.

## Usage

```html
<div scButtonGroup>
  <button scButton variant="outline">Left</button>
  <button scButton variant="outline">Center</button>
  <button scButton variant="outline">Right</button>
</div>
```

## Components

### `ScButtonGroup`

Container directive that merges child borders and controls layout orientation.

| Property      | Type                         | Default        | Description                     |
| ------------- | ---------------------------- | -------------- | ------------------------------- |
| **Selector**  | `div[scButtonGroup]`         |                |                                 |
| `class`       | `string`                     | `''`           | Additional CSS classes to merge |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction                |

**Host attributes:**

- `data-slot="button-group"`
- `role="group"`

---

### `ScButtonGroupSeparator`

A visual separator placed between items in a button group.

| Property      | Type                          | Default      | Description                     |
| ------------- | ----------------------------- | ------------ | ------------------------------- |
| **Selector**  | `div[scButtonGroupSeparator]` |              |                                 |
| `class`       | `string`                      | `''`         | Additional CSS classes to merge |
| `orientation` | `'horizontal' \| 'vertical'`  | `'vertical'` | Separator orientation           |

**Host attributes:**

- `data-slot="button-group-separator"`
- `role="separator"`
- `aria-orientation` (bound to `orientation` input)
- `data-orientation` (bound to `orientation` input)

---

### `ScButtonGroupText`

A styled text/label slot for displaying static content alongside buttons.

| Property     | Type                     | Default | Description                     |
| ------------ | ------------------------ | ------- | ------------------------------- |
| **Selector** | `div[scButtonGroupText]` |         |                                 |
| `class`      | `string`                 | `''`    | Additional CSS classes to merge |

**Host attributes:**

- `data-slot="button-group-text"`

## Examples

### Vertical orientation

```html
<div scButtonGroup orientation="vertical">
  <button scButton variant="outline">Top</button>
  <button scButton variant="outline">Bottom</button>
</div>
```

### With separator

```html
<div scButtonGroup>
  <button scButton variant="outline">Bold</button>
  <div scButtonGroupSeparator></div>
  <button scButton variant="outline">Italic</button>
</div>
```

### With text label

```html
<div scButtonGroup>
  <div scButtonGroupText>Label</div>
  <button scButton variant="outline">Action</button>
</div>
```

## Accessibility

- `ScButtonGroup` applies `role="group"` to semantically group related controls.
- `ScButtonGroupSeparator` applies `role="separator"` with a corresponding `aria-orientation` attribute.
- Focused children are elevated via `z-10` so focus rings are not clipped by adjacent items.
