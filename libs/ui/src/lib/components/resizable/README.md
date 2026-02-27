# Resizable

Accessible resizable panel groups and layouts with drag support.

## Components

| Component               | Selector                  | Role                                                                                 |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| `ScResizablePanelGroup` | `[scResizablePanelGroup]` | Container with `aria-orientation`. Inputs: `direction`                               |
| `ScResizablePanel`      | `[scResizablePanel]`      | Individual panel. Inputs: `defaultSize`, `minSize`, `maxSize`                        |
| `ScResizableHandle`     | `[scResizableHandle]`     | Drag handle with `aria-orientation`. Inputs: `withHandle` (show `GripVertical` icon) |

## Usage

```html
<div scResizablePanelGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
  <div scResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </div>
  <div scResizableHandle></div>
  <div scResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Two</span>
    </div>
  </div>
</div>
```

### Vertical Layout

```html
<div scResizablePanelGroup direction="vertical" class="min-h-[300px] max-w-md rounded-lg border">
  <div scResizablePanel [defaultSize]="30">Header</div>
  <div scResizableHandle></div>
  <div scResizablePanel [defaultSize]="70">Content</div>
</div>
```

### With Handle Icon

```html
<div scResizablePanelGroup direction="horizontal">
  <div scResizablePanel [defaultSize]="30">Sidebar</div>
  <div scResizableHandle [withHandle]="true"></div>
  <div scResizablePanel [defaultSize]="70">Content</div>
</div>
```

### Size Constraints

```html
<div scResizablePanelGroup direction="horizontal">
  <div scResizablePanel [defaultSize]="25" [minSize]="15">Left</div>
  <div scResizableHandle [withHandle]="true"></div>
  <div scResizablePanel [defaultSize]="50">Center</div>
  <div scResizableHandle [withHandle]="true"></div>
  <div scResizablePanel [defaultSize]="25" [minSize]="15">Right</div>
</div>
```

### Nested Panels

```html
<div scResizablePanelGroup direction="horizontal" class="min-h-[300px]">
  <div scResizablePanel [defaultSize]="30">Sidebar</div>
  <div scResizableHandle></div>
  <div scResizablePanel [defaultSize]="70">
    <div scResizablePanelGroup direction="vertical" class="h-full">
      <div scResizablePanel [defaultSize]="40">Top</div>
      <div scResizableHandle></div>
      <div scResizablePanel [defaultSize]="60">Bottom</div>
    </div>
  </div>
</div>
```
