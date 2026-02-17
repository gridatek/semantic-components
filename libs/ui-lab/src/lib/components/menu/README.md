# ScMenu Components

A set of Angular components that wrap `@angular/aria/menu` directives with shadcn/ui styling.

## Architecture

The components follow a dependency injection (DI) pattern where parent wrapper components automatically connect child components without requiring template variables.

```
ScMenuProvider (root wrapper)
├── ScMenuTrigger (button that opens menu)
└── ScMenuPortal (overlay positioning)
    └── ScMenu (menu container with Menu directive)
        ├── ScMenuItem (menu items)
        ├── ScMenuSeparator (visual divider)
        └── ScMenuSubProvider (submenu wrapper)
            ├── ScMenuSubTrigger (item that opens submenu)
            └── ScMenuSubPortal (submenu overlay positioning)
                └── ScMenuSub (submenu container)
                    └── ScMenuItem (submenu items)
```

## Components

| Component           | Selector                    | Description                                     |
| ------------------- | --------------------------- | ----------------------------------------------- |
| `ScMenuProvider`    | `div[scMenuProvider]`     | Root wrapper that auto-connects trigger to menu |
| `ScMenuTrigger`     | `button[scMenuTrigger]`   | Button that opens the menu                      |
| `ScMenuPortal`      | `div[scMenuPortal]`       | Handles overlay positioning                     |
| `ScMenu`            | `div[scMenu]`              | Menu container with animations                  |
| `ScMenuItem`        | `div[scMenuItem]`         | Selectable menu item                            |
| `ScMenuSeparator`   | `div[scMenuSeparator]`    | Visual separator                                |
| `ScMenuSubProvider` | `div[scMenuSubProvider]` | Submenu wrapper                                 |
| `ScMenuSubTrigger`  | `div[scMenuSubTrigger]`  | Item that opens submenu                         |
| `ScMenuSubPortal`   | `div[scMenuSubPortal]`   | Submenu overlay positioning                     |
| `ScMenuSub`         | `div[scMenuSub]`          | Submenu container with animations               |
| `ScMenuSubIcon`     | `svg[scMenuSubIcon]`     | Chevron icon for submenu triggers               |

## Usage

### Basic Menu

```html
<div scMenuProvider>
  <button scMenuTrigger>Open Menu</button>
  <div scMenuPortal>
    <div scMenu>
      <div scMenuItem value="edit">Edit</div>
      <div scMenuItem value="duplicate">Duplicate</div>
      <div scMenuSeparator></div>
      <div scMenuItem value="delete">Delete</div>
    </div>
  </div>
</div>
```

### Menu with Submenu

```html
<div scMenuProvider>
  <button scMenuTrigger>Open Menu</button>
  <div scMenuPortal>
    <div scMenu>
      <div scMenuItem value="new">New</div>
      <div scMenuSeparator></div>
      <div scMenuSubProvider>
        <div scMenuSubTrigger value="share">
          Share
          <svg scMenuSubIcon><!-- chevron icon --></svg>
        </div>
        <div scMenuSubPortal>
          <div scMenuSub>
            <div scMenuItem value="email">Email</div>
            <div scMenuItem value="message">Message</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Menu Item with Icon

```html
<div scMenuItem value="settings">
  <svg class="text-muted-foreground size-4" aria-hidden="true">
    <!-- icon SVG -->
  </svg>
  <span class="flex-1">Settings</span>
</div>
```

### Destructive Menu Item

```html
<div scMenuItem value="delete" class="text-destructive hover:bg-destructive/10 data-[active=true]:bg-destructive/10">Delete</div>
```

## Keyboard Navigation

| Key               | Action                              |
| ----------------- | ----------------------------------- |
| `Enter` / `Space` | Select focused item or open submenu |
| `ArrowDown`       | Move focus to next item             |
| `ArrowUp`         | Move focus to previous item         |
| `ArrowRight`      | Open submenu (on submenu trigger)   |
| `ArrowLeft`       | Close submenu and return to parent  |
| `Escape`          | Close menu                          |
| `Home`            | Move focus to first item            |
| `End`             | Move focus to last item             |

## How It Works

### Auto-Connection via DI

The `ScMenuProvider` component uses `contentChild` to find its `ScMenuTrigger` and `ScMenu` descendants. An `effect` automatically connects the trigger's `menu` input to the content's `Menu` directive using `signalSetFn`:

```typescript
effect(() => {
  const trigger = this.triggerChild()?.trigger;
  const menu = this.content()?.menu;
  if (trigger && menu) {
    signalSetFn(trigger.menu[SIGNAL], menu);
  }
});
```

This eliminates the need for template variables like `#menu="ngMenu"`.

### Overlay Positioning

`ScMenuPortal` injects `ScMenuProvider` to access the trigger's `CdkOverlayOrigin` and `expanded` state:

```typescript
protected readonly origin = computed(() => this.scMenu.origin());
protected readonly expanded = computed(() => this.scMenu.trigger()?.expanded() ?? false);
```

### Animations

`ScMenu` applies Tailwind CSS transitions based on the menu's visibility:

```typescript
protected readonly class = computed(() =>
  cn(
    'bg-popover text-popover-foreground ...',
    this.menu.visible()
      ? 'opacity-100 visible transition-[opacity,visibility] duration-150 ease-out'
      : 'opacity-0 invisible transition-[opacity,visibility] duration-150 ease-in [transition-delay:0s,150ms]',
  ),
);
```

The `[transition-delay:0s,150ms]` ensures visibility changes after opacity during the leave animation.

## Accessibility

- Full ARIA menu pattern implementation via `@angular/aria/menu`
- Proper `role="menu"` and `role="menuitem"` attributes
- `aria-expanded` state management for triggers
- `aria-haspopup` for submenu triggers
- Focus management and keyboard navigation
- Screen reader announcements

## Customization

All components accept a `class` input for custom styling:

```html
<div scMenu class="w-64">
  <!-- wider menu -->
</div>

<div scMenuItem value="special" class="font-bold">Special Item</div>
```
