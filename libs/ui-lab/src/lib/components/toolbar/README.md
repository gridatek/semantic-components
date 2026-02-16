# Toolbar

A container for grouping a set of controls, such as toggle buttons. Built on `@angular/aria/toolbar` primitives with full keyboard navigation and ARIA support.

## Components

| Component              | Selector                       | Description                                                                        |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| `ScToolbar`            | `div[scToolbar]`              | Root toolbar container. Wraps `Toolbar` from `@angular/aria/toolbar`.              |
| `ScToolbarWidget`      | `button[scToolbarWidget]`    | A toggleable button within the toolbar. Wraps `ToolbarWidget`.                     |
| `ScToolbarWidgetGroup` | `div[scToolbarWidgetGroup]` | Groups related widgets together. Wraps `ToolbarWidgetGroup`.                       |
| `ScToolbarSeparator`   | `div[scToolbarSeparator]`    | A visual divider between widget groups. Auto-determines perpendicular orientation. |

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
    <button scToolbarWidget value="align-left" aria-label="Align left">L</button>
    <button scToolbarWidget value="align-center" aria-label="Align center">C</button>
    <button scToolbarWidget value="align-right" aria-label="Align right">R</button>
  </div>
</div>
```

## API

### ScToolbar

| Input          | Type                         | Default        | Description                                   |
| -------------- | ---------------------------- | -------------- | --------------------------------------------- |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the toolbar.              |
| `disabled`     | `boolean`                    | `false`        | Disables all widgets in the toolbar.          |
| `softDisabled` | `boolean`                    | `true`         | When true, disabled widgets remain focusable. |
| `wrap`         | `boolean`                    | `true`         | Whether keyboard navigation wraps around.     |
| `values`       | `string[]`                   | `[]`           | Currently selected widget values.             |

| Output         | Type       | Description                        |
| -------------- | ---------- | ---------------------------------- |
| `valuesChange` | `string[]` | Emits when selected values change. |

### ScToolbarWidget

| Input      | Type      | Default        | Description                           |
| ---------- | --------- | -------------- | ------------------------------------- |
| `value`    | `string`  | **(required)** | Unique value identifying this widget. |
| `disabled` | `boolean` | `false`        | Disables this widget.                 |

### ScToolbarWidgetGroup

| Input      | Type      | Default | Description                                               |
| ---------- | --------- | ------- | --------------------------------------------------------- |
| `disabled` | `boolean` | `false` | Disables all widgets in this group.                       |
| `multi`    | `boolean` | `false` | Allows multiple widgets to be selected within this group. |

### ScToolbarSeparator

No inputs. Automatically renders perpendicular to the parent toolbar's orientation.

## Keyboard Navigation

| Key                | Action                                           |
| ------------------ | ------------------------------------------------ |
| `Arrow Left/Right` | Move focus between widgets (horizontal toolbar). |
| `Arrow Up/Down`    | Move focus between widgets (vertical toolbar).   |
| `Home`             | Move focus to the first widget.                  |
| `End`              | Move focus to the last widget.                   |
| `Enter` / `Space`  | Toggle the focused widget.                       |
