# Toggle Group

A set of two-state buttons that can be toggled on or off.

## Components

- `ScToggleGroup` - Container for toggle group items
- `ScToggleGroupItem` - Individual toggle button within the group

## Usage

```html
<!-- Single selection -->
<div sc-toggle-group type="single" [(value)]="alignment" aria-label="Text alignment">
  <button sc-toggle-group-item value="left" aria-label="Align left">Left</button>
  <button sc-toggle-group-item value="center" aria-label="Align center">Center</button>
  <button sc-toggle-group-item value="right" aria-label="Align right">Right</button>
</div>

<!-- Multiple selection -->
<div sc-toggle-group type="multiple" [(value)]="formatting" aria-label="Text formatting">
  <button sc-toggle-group-item value="bold" aria-label="Toggle bold">B</button>
  <button sc-toggle-group-item value="italic" aria-label="Toggle italic">I</button>
  <button sc-toggle-group-item value="underline" aria-label="Toggle underline">U</button>
</div>
```

## Variants

```html
<!-- Default -->
<div sc-toggle-group type="single">
  <button sc-toggle-group-item value="a">A</button>
  <button sc-toggle-group-item value="b">B</button>
</div>

<!-- Outline -->
<div sc-toggle-group type="single" variant="outline">
  <button sc-toggle-group-item value="a">A</button>
  <button sc-toggle-group-item value="b">B</button>
</div>
```

## Sizes

```html
<div sc-toggle-group type="single" size="sm">...</div>
<div sc-toggle-group type="single" size="default">...</div>
<div sc-toggle-group type="single" size="lg">...</div>
```

## Disabled

```html
<!-- Disable entire group -->
<div sc-toggle-group type="single" [disabled]="true">
  <button sc-toggle-group-item value="a">A</button>
  <button sc-toggle-group-item value="b">B</button>
</div>

<!-- Disable individual items -->
<div sc-toggle-group type="single">
  <button sc-toggle-group-item value="a">A</button>
  <button sc-toggle-group-item value="b" [disabled]="true">B</button>
</div>
```

## ScToggleGroup Inputs

| Input      | Type                         | Default     | Description                    |
| ---------- | ---------------------------- | ----------- | ------------------------------ |
| `type`     | `'single' \| 'multiple'`     | `'single'`  | Selection mode                 |
| `value`    | `string \| string[] \| null` | `null`      | Selected value(s) (model)      |
| `disabled` | `boolean`                    | `false`     | Whether all items are disabled |
| `variant`  | `'default' \| 'outline'`     | `'default'` | Toggle variant                 |
| `size`     | `'default' \| 'sm' \| 'lg'`  | `'default'` | Toggle size                    |
| `class`    | `string`                     | `''`        | Additional CSS classes         |

## ScToggleGroup Outputs

| Output        | Type                         | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| `valueChange` | `string \| string[] \| null` | Emits when selection changes |

## ScToggleGroupItem Inputs

| Input      | Type      | Default | Description                   |
| ---------- | --------- | ------- | ----------------------------- |
| `value`    | `string`  | -       | Value of this item (required) |
| `disabled` | `boolean` | `false` | Whether this item is disabled |
| `class`    | `string`  | `''`    | Additional CSS classes        |

## Accessibility

- Uses `role="group"` on the container
- Uses `aria-pressed` to communicate state on items
- `data-state` attribute: `on` or `off`
- Should include `aria-label` on container for group description
- Should include `aria-label` on items when using only icons
- Keyboard accessible (Enter/Space to toggle)
- Focus ring for keyboard navigation
