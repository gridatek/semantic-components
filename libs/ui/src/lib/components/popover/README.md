# ScPopover Components

A set of Angular components for creating accessible popovers with shadcn/ui styling.

## Architecture

The components follow a dependency injection (DI) pattern where child components inject the parent `ScPopoverProvider` to access shared state. The portal is an `ng-template` directive that captures a `TemplateRef`, rendered by the provider via `ngTemplateOutlet` inside a CDK connected overlay.

```
ScPopoverProvider (root wrapper - manages open state, side, align, overlay)
├── ScPopoverTrigger (button that toggles popover)
└── ng-template[scPopoverPortal] (template reference for overlay content)
    └── ScPopover (floating dialog panel)
        ├── ScPopoverHeader (optional header with title/description)
        │   ├── ScPopoverTitle (popover title)
        │   └── ScPopoverDescription (popover description)
        └── ScPopoverClose (optional close button)
```

## Components

| Component              | Selector                       | Description                            |
| ---------------------- | ------------------------------ | -------------------------------------- |
| `ScPopoverProvider`    | `div[sc-popover-provider]`     | Root wrapper, manages state & overlay  |
| `ScPopoverTrigger`     | `button[sc-popover-trigger]`   | Button that toggles the popover        |
| `ScPopoverPortal`      | `ng-template[scPopoverPortal]` | Template reference for overlay content |
| `ScPopover`            | `div[sc-popover]`              | Floating dialog panel                  |
| `ScPopoverClose`       | `button[sc-popover-close]`     | Optional button to close the popover   |
| `ScPopoverHeader`      | `div[sc-popover-header]`       | Optional header container              |
| `ScPopoverTitle`       | `[sc-popover-title]`           | Popover title text                     |
| `ScPopoverDescription` | `p[sc-popover-description]`    | Popover description text               |

## Usage

### Basic Popover

```html
<div sc-popover-provider>
  <button sc-popover-trigger>Open Popover</button>
  <ng-template scPopoverPortal>
    <div sc-popover>
      <div sc-popover-header>
        <h4 sc-popover-title>Title</h4>
        <p sc-popover-description>Content goes here.</p>
      </div>
    </div>
  </ng-template>
</div>
```

### Different Sides

```html
<!-- Top -->
<div sc-popover-provider side="top">
  <button sc-popover-trigger>Top</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>

<!-- Right -->
<div sc-popover-provider side="right">
  <button sc-popover-trigger>Right</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>

<!-- Bottom (default) -->
<div sc-popover-provider side="bottom">
  <button sc-popover-trigger>Bottom</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>

<!-- Left -->
<div sc-popover-provider side="left">
  <button sc-popover-trigger>Left</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>
```

### Alignment

```html
<!-- Align start -->
<div sc-popover-provider align="start">
  <button sc-popover-trigger>Align Start</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>

<!-- Align center (default) -->
<div sc-popover-provider align="center">
  <button sc-popover-trigger>Align Center</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>

<!-- Align end -->
<div sc-popover-provider align="end">
  <button sc-popover-trigger>Align End</button>
  <ng-template scPopoverPortal>
    <div sc-popover>Content</div>
  </ng-template>
</div>
```

### With Close Button

```html
<div sc-popover-provider>
  <button sc-popover-trigger>Open</button>
  <ng-template scPopoverPortal>
    <div sc-popover class="relative">
      <button sc-popover-close>
        <svg><!-- X icon --></svg>
      </button>
      <p>Content with close button</p>
    </div>
  </ng-template>
</div>
```

### Controlled Popover

```typescript
@Component({
  template: `
    <div sc-popover-provider [(open)]="isOpen">
      <button sc-popover-trigger>Toggle</button>
      <ng-template scPopoverPortal>
        <div sc-popover>Content</div>
      </ng-template>
    </div>
  `,
})
export class MyComponent {
  isOpen = signal(false);
}
```

### Form Popover

```html
<div sc-popover-provider>
  <button sc-popover-trigger>Update dimensions</button>
  <ng-template scPopoverPortal>
    <div sc-popover>
      <div sc-popover-header>
        <h4 sc-popover-title>Dimensions</h4>
        <p sc-popover-description>Set the dimensions for the layer.</p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <label for="width">Width</label>
          <input id="width" value="100%" class="col-span-2" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <label for="height">Height</label>
          <input id="height" value="25px" class="col-span-2" />
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

## Animation

The popover uses `data-open`/`data-closed` boolean attributes for animation state, and `data-side` for directional slide-in animations.

### Animation Classes

```
Entry: data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 duration-100
Exit:  data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95
Slide: data-[side=bottom]:slide-in-from-top-2
       data-[side=top]:slide-in-from-bottom-2
       data-[side=left]:slide-in-from-right-2
       data-[side=right]:slide-in-from-left-2
```

### CSS Pattern

The provider uses `display: contents` to be invisible in layout, letting the trigger and overlay render as if the provider wrapper doesn't exist.

## Keyboard Navigation

| Key      | Action          |
| -------- | --------------- |
| `Escape` | Close popover   |
| `Tab`    | Navigate within |

## Side Options

| Side     | Description                     |
| -------- | ------------------------------- |
| `bottom` | Appears below trigger (default) |
| `top`    | Appears above trigger           |
| `left`   | Appears to the left of trigger  |
| `right`  | Appears to the right of trigger |

## Align Options

| Align    | Description                      |
| -------- | -------------------------------- |
| `center` | Centered with trigger (default)  |
| `start`  | Aligned to start edge of trigger |
| `end`    | Aligned to end edge of trigger   |

## Accessibility

- `role="dialog"` on `ScPopover`
- `aria-haspopup="dialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- Escape key closes the popover
- Click outside closes the popover

## Customization

All components accept a `class` input for custom styling:

```html
<div sc-popover class="w-96">
  <!-- wider popover -->
</div>
```
