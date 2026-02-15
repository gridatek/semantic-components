# Drawer

A mobile-friendly slide-in panel that can be opened from any edge of the screen. Ideal for navigation menus, forms, and quick actions on touch devices.

## Architecture

The components follow a dependency injection (DI) pattern where child components inject the parent `ScDrawerProvider` to access shared state. `ScDrawerProvider` owns all overlay lifecycle logic (CDK overlay, backdrop, focus trap). The `ScDrawerPortal` directive marks the lazy content template that gets portaled into the overlay.

```
ScDrawerProvider (root wrapper - manages open state + overlay lifecycle)
├── ScDrawerTrigger (button that opens drawer)
└── ng-template[scDrawerPortal] (lazy content, portaled to CDK overlay)
    └── ScDrawer (drawer directive - slides from configured direction)
        ├── ScDrawerHandle (optional drag indicator)
        ├── ScDrawerHeader
        │   ├── ScDrawerTitle
        │   └── ScDrawerDescription
        ├── (user content)
        └── ScDrawerFooter
            └── ScDrawerClose
```

## Components

| Component             | Selector                      | Description                                        |
| --------------------- | ----------------------------- | -------------------------------------------------- |
| `ScDrawerProvider`    | `div[sc-drawer-provider]`     | Root wrapper, manages open state + overlay         |
| `ScDrawerTrigger`     | `button[sc-drawer-trigger]`   | Button that opens the drawer                       |
| `ScDrawerPortal`      | `ng-template[scDrawerPortal]` | Directive marking lazy content for the overlay     |
| `ScDrawer`            | `div[sc-drawer]`              | Drawer directive with directional slide animations |
| `ScDrawerHeader`      | `div[sc-drawer-header]`       | Header section container                           |
| `ScDrawerTitle`       | `h2[sc-drawer-title]`         | Drawer title (aria-labelledby)                     |
| `ScDrawerDescription` | `p[sc-drawer-description]`    | Drawer description (aria-describedby)              |
| `ScDrawerHandle`      | `div[sc-drawer-handle]`       | Visual drag handle indicator                       |
| `ScDrawerFooter`      | `div[sc-drawer-footer]`       | Footer section for actions                         |
| `ScDrawerClose`       | `button[sc-drawer-close]`     | Close button (sets `type="button"` automatically)  |

## Usage

### Basic Drawer

```html
<div sc-drawer-provider direction="bottom" [(open)]="isOpen">
  <button sc-drawer-trigger>Open Drawer</button>
  <ng-template scDrawerPortal>
    <div sc-drawer>
      <div sc-drawer-handle></div>
      <div sc-drawer-header>
        <h2 sc-drawer-title>Drawer Title</h2>
        <p sc-drawer-description>Drawer description text.</p>
      </div>
      <div class="p-4">
        <!-- Main content -->
      </div>
      <div sc-drawer-footer>
        <button sc-drawer-close>Cancel</button>
        <button sc-drawer-close>Submit</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Controlled Drawer

You can control the drawer state programmatically using the `open` model:

```typescript
@Component({
  template: `
    <div sc-drawer-provider direction="bottom" [(open)]="isOpen">
      <button sc-drawer-trigger>Open</button>
      <ng-template scDrawerPortal>
        <div sc-drawer>
          <!-- content -->
        </div>
      </ng-template>
    </div>
  `,
})
export class MyComponent {
  isOpen = signal(false);

  openDrawer() {
    this.isOpen.set(true);
  }

  closeDrawer() {
    this.isOpen.set(false);
  }
}
```

## Direction

The drawer can slide in from any edge of the screen. The `direction` input is set on the provider:

```html
<!-- Bottom (default) -->
<div sc-drawer-provider direction="bottom">
  <button sc-drawer-trigger>Open</button>
  <ng-template scDrawerPortal>
    <div sc-drawer>...</div>
  </ng-template>
</div>

<!-- Top -->
<div sc-drawer-provider direction="top">...</div>

<!-- Left -->
<div sc-drawer-provider direction="left">...</div>

<!-- Right -->
<div sc-drawer-provider direction="right">...</div>
```

## Keyboard Navigation

| Key      | Action                 |
| -------- | ---------------------- |
| `Escape` | Close drawer           |
| `Tab`    | Navigate within drawer |

## How It Works

### State Management

`ScDrawerProvider` uses a `model` signal for the `open` state:

```typescript
readonly open = model<boolean>(false);
```

Child components inject `ScDrawerProvider` to read or modify this state:

```typescript
// ScDrawerTrigger
openDrawer(): void {
  this.drawerProvider.open.set(true);
}

// ScDrawerClose
closeDrawer(): void {
  this.drawerProvider.open.set(false);
}
```

### Overlay Management

`ScDrawerProvider` creates a CDK overlay and attaches/detaches the `scDrawerPortal` template based on state:

```typescript
effect(() => {
  if (this.overlayOpen()) {
    this.attachDrawer();
  } else {
    this.detachDrawer();
  }
});
```

The `scDrawerPortal` directive marks the `ng-template` whose content is lazily instantiated into the overlay only when the drawer opens.

### Animations

`ScDrawer` uses directional slide animations with a two-state model:

| State    | Data Attribute        | Description                                   |
| -------- | --------------------- | --------------------------------------------- |
| `open`   | `data-state="open"`   | Entry animation (fade + slide from direction) |
| `closed` | `data-state="closed"` | Exit animation (fade + slide to direction)    |

On `animationend`, the `closed` state triggers overlay cleanup via `onDrawerAnimationComplete()`.

## Accessibility

- `role="dialog"` on the drawer
- `aria-modal="true"` for modal behavior
- `aria-labelledby` linked to `ScDrawerTitle`
- `aria-describedby` linked to `ScDrawerDescription`
- `aria-haspopup="dialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- Focus trapped within the drawer
- Escape key closes the drawer (via CDK overlay keydown events)
- Backdrop click closes the drawer (via CDK overlay backdrop click)

## Customization

All components accept a `class` input for custom styling:

```html
<div sc-drawer class="max-h-[80vh]">
  <!-- constrained height drawer -->
</div>

<div sc-drawer-footer class="flex-row-reverse">
  <!-- reversed button order -->
</div>
```

## Dependencies

- Angular CDK Overlay (`@angular/cdk/overlay`)
- Angular CDK Portal (`@angular/cdk/portal`)
- Angular CDK A11y (`@angular/cdk/a11y`)
