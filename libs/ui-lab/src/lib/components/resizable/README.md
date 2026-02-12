# Resizable

Accessible resizable panel groups and layouts with keyboard support.

## Usage

```html
<div sc-resizable-panel-group direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
  <div sc-resizable-panel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </div>
  <div sc-resizable-handle></div>
  <div sc-resizable-panel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Two</span>
    </div>
  </div>
</div>
```

## Components

### ScResizablePanelGroup

Container directive for a group of resizable panels.

**Selector:** `[sc-resizable-panel-group]`

**Inputs:**

| Input       | Type                         | Default        | Description                    |
| ----------- | ---------------------------- | -------------- | ------------------------------ |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the panels |
| `class`     | `string`                     | `''`           | Additional CSS classes         |

### ScResizablePanel

Individual resizable panel within a panel group.

**Selector:** `[sc-resizable-panel]`

**Inputs:**

| Input         | Type     | Default | Description                        |
| ------------- | -------- | ------- | ---------------------------------- |
| `defaultSize` | `number` | `50`    | Initial size as percentage (0-100) |
| `minSize`     | `number` | `10`    | Minimum size as percentage         |
| `maxSize`     | `number` | `90`    | Maximum size as percentage         |
| `class`       | `string` | `''`    | Additional CSS classes             |

**Methods:**

- `setSize(size: number)`: Programmatically set the panel size

### ScResizableHandle

Drag handle between panels for resizing.

**Selector:** `[sc-resizable-handle]`

**Inputs:**

| Input        | Type      | Default | Description                           |
| ------------ | --------- | ------- | ------------------------------------- |
| `withHandle` | `boolean` | `false` | Show a visual grip icon on the handle |
| `class`      | `string`  | `''`    | Additional CSS classes                |

## Examples

### Vertical Layout

```html
<div sc-resizable-panel-group direction="vertical" class="min-h-[300px] max-w-md rounded-lg border">
  <div sc-resizable-panel [defaultSize]="30">Header</div>
  <div sc-resizable-handle></div>
  <div sc-resizable-panel [defaultSize]="70">Content</div>
</div>
```

### With Handle Icon

```html
<div sc-resizable-panel-group direction="horizontal">
  <div sc-resizable-panel [defaultSize]="30">Sidebar</div>
  <div sc-resizable-handle [withHandle]="true"></div>
  <div sc-resizable-panel [defaultSize]="70">Content</div>
</div>
```

### Three Panels with Size Constraints

```html
<div sc-resizable-panel-group direction="horizontal">
  <div sc-resizable-panel [defaultSize]="25" [minSize]="15">Left</div>
  <div sc-resizable-handle [withHandle]="true"></div>
  <div sc-resizable-panel [defaultSize]="50">Center</div>
  <div sc-resizable-handle [withHandle]="true"></div>
  <div sc-resizable-panel [defaultSize]="25" [minSize]="15">Right</div>
</div>
```

### Nested Panels

```html
<div sc-resizable-panel-group direction="horizontal" class="min-h-[300px]">
  <div sc-resizable-panel [defaultSize]="30">Sidebar</div>
  <div sc-resizable-handle></div>
  <div sc-resizable-panel [defaultSize]="70">
    <div sc-resizable-panel-group direction="vertical" class="h-full">
      <div sc-resizable-panel [defaultSize]="40">Top</div>
      <div sc-resizable-handle></div>
      <div sc-resizable-panel [defaultSize]="60">Bottom</div>
    </div>
  </div>
</div>
```

## Features

- **Mouse and Touch Support**: Drag handles work with both mouse and touch devices
- **Flexible Sizing**: Panels use flex-grow for proportional sizing
- **Size Constraints**: Set minimum and maximum sizes for panels
- **Nested Groups**: Panel groups can be nested for complex layouts
- **Visual Handle**: Optional grip icon for better affordance
- **Direction Support**: Both horizontal and vertical layouts

## Accessibility

- Handles have focus styles for keyboard navigation
- Proper cursor styles indicate resize direction
- Touch-friendly hit areas
