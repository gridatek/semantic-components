# Toolbar

A container for grouping a set of controls, such as toggle buttons, with keyboard navigation support. Built on top of [`@angular/aria/toolbar`](https://angular.dev/api/aria/toolbar).

## Components

- `ScToolbar` - The toolbar container
- `ScToolbarWidgetGroup` - Groups related widgets within the toolbar
- `ScToolbarWidget` - An individual toggleable button within the toolbar
- `ScToolbarSeparator` - A visual separator between groups

## Usage

```html
<div scToolbar [values]="['bold']">
  <div scToolbarWidgetGroup>
    <button scToolbarWidget value="bold" aria-label="Bold">B</button>
    <button scToolbarWidget value="italic" aria-label="Italic">I</button>
    <button scToolbarWidget value="underline" aria-label="Underline">U</button>
  </div>

  <div scToolbarSeparator></div>

  <div scToolbarWidgetGroup>
    <button scToolbarWidget value="align-left" aria-label="Align left">Left</button>
    <button scToolbarWidget value="align-center" aria-label="Align center">Center</button>
    <button scToolbarWidget value="align-right" aria-label="Align right">Right</button>
  </div>
</div>
```

## Orientation

```html
<!-- Horizontal (default) -->
<div scToolbar orientation="horizontal" [values]="[]">...</div>

<!-- Vertical -->
<div scToolbar orientation="vertical" [values]="[]">...</div>
```

## Multiple Selection

```html
<div scToolbar [values]="selectedValues" (valuesChange)="selectedValues = $event">
  <div scToolbarWidgetGroup [multi]="true">
    <button scToolbarWidget value="bold" aria-label="Bold">B</button>
    <button scToolbarWidget value="italic" aria-label="Italic">I</button>
  </div>
</div>
```

## Disabled

```html
<!-- Disable entire toolbar -->
<div scToolbar [disabled]="true" [values]="[]">...</div>

<!-- Disable individual widget -->
<div scToolbar [values]="[]">
  <div scToolbarWidgetGroup>
    <button scToolbarWidget value="bold" [disabled]="true" aria-label="Bold">B</button>
  </div>
</div>

<!-- Disable a widget group -->
<div scToolbar [values]="[]">
  <div scToolbarWidgetGroup [disabled]="true">
    <button scToolbarWidget value="bold" aria-label="Bold">B</button>
  </div>
</div>
```

## ScToolbar Inputs

| Input          | Type                         | Default        | Description                       |
| -------------- | ---------------------------- | -------------- | --------------------------------- |
| `values`       | `string[]`                   | -              | Currently selected widget values  |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Toolbar layout direction          |
| `disabled`     | `boolean`                    | `false`        | Whether all widgets are disabled  |
| `wrap`         | `boolean`                    | `false`        | Whether keyboard navigation wraps |
| `softDisabled` | `boolean`                    | `false`        | Soft-disabled state               |
| `class`        | `string`                     | `''`           | Additional CSS classes            |

## ScToolbar Outputs

| Output         | Type       | Description                       |
| -------------- | ---------- | --------------------------------- |
| `valuesChange` | `string[]` | Emits when selected values change |

## ScToolbarWidgetGroup Inputs

| Input      | Type      | Default | Description                                   |
| ---------- | --------- | ------- | --------------------------------------------- |
| `multi`    | `boolean` | `false` | Whether multiple widgets can be selected      |
| `disabled` | `boolean` | `false` | Whether all widgets in the group are disabled |
| `class`    | `string`  | `''`    | Additional CSS classes                        |

## ScToolbarWidget Inputs

| Input      | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| `value`    | `string`  | -       | Value of this widget (required) |
| `disabled` | `boolean` | `false` | Whether this widget is disabled |
| `class`    | `string`  | `''`    | Additional CSS classes          |

## ScToolbarSeparator Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

- `ScToolbarWidget` reuses `toggleVariants` from the Toggle component for consistent hover, focus, disabled, and sizing styles.
- `ScToolbarWidgetGroup` uses a small gap (`gap-0.5`) between widgets so focus rings remain visible.

## Accessibility

- Built on `@angular/aria/toolbar` for full ARIA toolbar pattern support
- Uses `role="separator"` with `aria-orientation` on `ScToolbarSeparator`
- `data-state` attribute on widgets: `on` or `off`
- `data-orientation` reflects the toolbar's current orientation
- Arrow keys navigate between widgets; Home/End jump to first/last
- Should include `aria-label` on widgets when using only icons
- Focus ring for keyboard navigation
