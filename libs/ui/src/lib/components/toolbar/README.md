# Toolbar

A container for grouping a set of controls, such as toggle buttons, with keyboard navigation support. Built on top of [`@angular/aria/toolbar`](https://angular.dev/api/aria/toolbar).

## Components

- `ScToolbar` - The toolbar container
- `ScToolbarToggleGroup` - Groups related toggles within the toolbar
- `ScToolbarToggle` - An individual toggleable button within the toolbar
- `ScToolbarSeparator` - A visual separator between groups

## Usage

```html
<div scToolbar [values]="['bold']">
  <div scToolbarToggleGroup>
    <button scToolbarToggle value="bold" aria-label="Bold">B</button>
    <button scToolbarToggle value="italic" aria-label="Italic">I</button>
    <button scToolbarToggle value="underline" aria-label="Underline">U</button>
  </div>

  <div scToolbarSeparator></div>

  <div scToolbarToggleGroup>
    <button scToolbarToggle value="align-left" aria-label="Align left">Left</button>
    <button scToolbarToggle value="align-center" aria-label="Align center">Center</button>
    <button scToolbarToggle value="align-right" aria-label="Align right">Right</button>
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
  <div scToolbarToggleGroup [multi]="true">
    <button scToolbarToggle value="bold" aria-label="Bold">B</button>
    <button scToolbarToggle value="italic" aria-label="Italic">I</button>
  </div>
</div>
```

## Disabled

```html
<!-- Disable entire toolbar -->
<div scToolbar [disabled]="true" [values]="[]">...</div>

<!-- Disable individual toggle -->
<div scToolbar [values]="[]">
  <div scToolbarToggleGroup>
    <button scToolbarToggle value="bold" [disabled]="true" aria-label="Bold">B</button>
  </div>
</div>

<!-- Disable a toggle group -->
<div scToolbar [values]="[]">
  <div scToolbarToggleGroup [disabled]="true">
    <button scToolbarToggle value="bold" aria-label="Bold">B</button>
  </div>
</div>
```

## ScToolbar Inputs

| Input          | Type                         | Default        | Description                       |
| -------------- | ---------------------------- | -------------- | --------------------------------- |
| `values`       | `string[]`                   | -              | Currently selected toggle values  |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Toolbar layout direction          |
| `disabled`     | `boolean`                    | `false`        | Whether all toggles are disabled  |
| `wrap`         | `boolean`                    | `false`        | Whether keyboard navigation wraps |
| `softDisabled` | `boolean`                    | `false`        | Soft-disabled state               |
| `class`        | `string`                     | `''`           | Additional CSS classes            |

## ScToolbar Outputs

| Output         | Type       | Description                       |
| -------------- | ---------- | --------------------------------- |
| `valuesChange` | `string[]` | Emits when selected values change |

## ScToolbarToggleGroup Inputs

| Input      | Type      | Default | Description                                   |
| ---------- | --------- | ------- | --------------------------------------------- |
| `multi`    | `boolean` | `false` | Whether multiple toggles can be selected      |
| `disabled` | `boolean` | `false` | Whether all toggles in the group are disabled |
| `class`    | `string`  | `''`    | Additional CSS classes                        |

## ScToolbarToggle Inputs

| Input      | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| `value`    | `string`  | -       | Value of this toggle (required) |
| `disabled` | `boolean` | `false` | Whether this toggle is disabled |
| `class`    | `string`  | `''`    | Additional CSS classes          |

## ScToolbarSeparator Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

- `ScToolbarToggle` reuses `toggleVariants` from the Toggle component for consistent hover, focus, disabled, and sizing styles.
- `ScToolbarToggleGroup` uses a small gap (`gap-0.5`) between toggles so focus rings remain visible.

## Accessibility

- Built on `@angular/aria/toolbar` for full ARIA toolbar pattern support
- Uses `role="separator"` with `aria-orientation` on `ScToolbarSeparator`
- `data-state` attribute on toggles: `on` or `off`
- `data-orientation` reflects the toolbar's current orientation
- Arrow keys navigate between toggles; Home/End jump to first/last
- Should include `aria-label` on toggles when using only icons
- Focus ring for keyboard navigation
