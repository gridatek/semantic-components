# Menu

A set of wrapper directives for Angular ARIA's menu components that include built-in styling, following shadcn/ui design patterns.

## Overview

These wrapper directives provide a cleaner, more opinionated implementation of Angular ARIA menus with pre-configured styles. They eliminate the need to repeat CSS classes across your application while maintaining full accessibility features.

## Architecture

The menu system is split into semantic components with distinct responsibilities:

- **ScMenu**: Container that wraps menu content with styling
- **ScMenuTrigger**: Interactive button that opens/closes the menu
- **ScMenuContent**: Template wrapper for menu content
- **ScMenuItem**: Individual menu item with hover effects and icon support
- **ScMenuSeparator**: Visual separator between menu groups

All components include `data-slot` attributes for programmatic identification and testing.

## Components

### ScMenu

Wraps `@angular/aria/menu`'s `Menu` directive with built-in container styling.

**Features:**

- Styled container with border, shadow, and proper z-index
- Overflow handling for scrollable menus
- Forwards `animate.enter` and `animate.leave` inputs for custom animations
- Includes `data-slot="menu"` for identification
- Accepts `class` input for style customization
- Can be exported as `scMenu` for programmatic access

**Usage:**

```html
<div
  scMenu
  #mainMenu="scMenu"
  [animate.enter]="'animate-in fade-in-0 zoom-in-95'"
  [animate.leave]="'animate-out fade-out-0 zoom-out-95'"
>
  <ng-template scMenuContent>
    <!-- Menu items -->
  </ng-template>
</div>

<!-- With custom styling -->
<div class="min-w-[12rem]" scMenu>
  <ng-template scMenuContent>
    <!-- Menu items -->
  </ng-template>
</div>
```

### ScMenuTrigger

Wraps `@angular/aria/menu`'s `MenuTrigger` directive.

**Features:**

- Forwards Angular ARIA inputs: `menu`, `disabled`
- Includes `data-slot="menu-trigger"` for identification
- Can be exported as `scMenuTrigger` for programmatic access
- Works with CDK Overlay for positioning

**Usage:**

```html
<button scMenuTrigger #trigger="scMenuTrigger" [menu]="mainMenu">Open Menu</button>
```

### ScMenuContent

Wraps `@angular/aria/menu`'s `MenuContent` directive without additional styling.

**Features:**

- Plain wrapper for Angular ARIA's content directive
- Includes `data-slot="menu-content"` for identification
- Required wrapper for menu items

**Usage:**

```html
<ng-template scMenuContent>
  <div scMenuItem value="action1">Action 1</div>
  <div scMenuItem value="action2">Action 2</div>
</ng-template>
```

### ScMenuItem

Wraps `@angular/aria/menu`'s `MenuItem` directive with comprehensive styling.

**Features:**

- Interactive item with focus and hover effects
- Icon support with automatic sizing and coloring
- Forwards Angular ARIA inputs: `value`, `disabled`, `submenu`
- Includes `data-slot="menu-item"` for identification
- Accepts `class` input for style customization
- Supports submenus for nested navigation

**Usage:**

```html
<div scMenuItem value="save">
  <svg si-save-icon aria-hidden="true"></svg>
  <span class="flex-1">Save</span>
</div>

<!-- With submenu -->
<div scMenuItem value="export" [submenu]="exportMenu">
  <svg si-file-icon aria-hidden="true"></svg>
  <span class="flex-1">Export</span>
  <svg class="ml-auto" si-chevron-right-icon aria-hidden="true"></svg>
</div>

<!-- Disabled item -->
<div scMenuItem value="delete" [disabled]="true">
  <svg si-trash-icon aria-hidden="true"></svg>
  <span class="flex-1">Delete</span>
</div>
```

### ScMenuSeparator

A visual separator component for grouping menu items.

**Features:**

- Horizontal divider with proper ARIA attributes
- Includes `data-slot="menu-separator"` for identification
- Accepts `class` input for style customization

**Usage:**

```html
<div scMenuItem value="copy">Copy</div>
<div scMenuItem value="paste">Paste</div>
<sc-menu-separator />
<div scMenuItem value="delete">Delete</div>
```

## Complete Example

```typescript
import { OverlayModule } from '@angular/cdk/overlay';

import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiCopyIcon, SiPasteIcon, SiTrashIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-context-menu',
  imports: [
    ScMenu,
    ScMenuTrigger,
    ScMenuContent,
    ScMenuItem,
    ScMenuSeparator,
    OverlayModule,
    SiCopyIcon,
    SiPasteIcon,
    SiTrashIcon,
  ],
  template: `
    <button
      class="rounded-md border px-4 py-2"
      #origin
      #trigger="scMenuTrigger"
      [menu]="contextMenu"
      scMenuTrigger
    >
      Right Click Menu
    </button>

    <ng-template
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
      [cdkConnectedOverlayPositions]="[
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      ]"
      cdkAttachPopoverAsChild
    >
      <div
        #contextMenu="scMenu"
        [animate.enter]="'animate-in fade-in-0 zoom-in-95'"
        [animate.leave]="'animate-out fade-out-0 zoom-out-95'"
        scMenu
      >
        <ng-template scMenuContent>
          <div scMenuItem value="copy">
            <svg si-copy-icon aria-hidden="true"></svg>
            <span class="flex-1">Copy</span>
          </div>
          <div scMenuItem value="paste">
            <svg si-paste-icon aria-hidden="true"></svg>
            <span class="flex-1">Paste</span>
          </div>
          <sc-menu-separator />
          <div scMenuItem value="delete">
            <svg si-trash-icon aria-hidden="true"></svg>
            <span class="flex-1">Delete</span>
          </div>
        </ng-template>
      </div>
    </ng-template>
  `,
})
export class ContextMenuComponent {}
```

## Common Use Cases

### Context Menu

Right-click or button-triggered contextual actions:

```html
<button scMenuTrigger [menu]="contextMenu">Actions</button>

<ng-template cdkConnectedOverlay>
  <div scMenu #contextMenu="scMenu">
    <ng-template scMenuContent>
      <div scMenuItem value="edit">Edit</div>
      <div scMenuItem value="duplicate">Duplicate</div>
      <sc-menu-separator />
      <div scMenuItem value="delete">Delete</div>
    </ng-template>
  </div>
</ng-template>
```

### Dropdown Menu with Icons

Styled menu with icon support:

```html
<button scMenuTrigger [menu]="dropdownMenu">Options</button>

<ng-template cdkConnectedOverlay>
  <div scMenu #dropdownMenu="scMenu">
    <ng-template scMenuContent>
      <div scMenuItem value="settings">
        <svg si-settings-icon aria-hidden="true"></svg>
        <span class="flex-1">Settings</span>
      </div>
      <div scMenuItem value="profile">
        <svg si-user-icon aria-hidden="true"></svg>
        <span class="flex-1">Profile</span>
      </div>
      <sc-menu-separator />
      <div scMenuItem value="logout">
        <svg si-log-out-icon aria-hidden="true"></svg>
        <span class="flex-1">Logout</span>
      </div>
    </ng-template>
  </div>
</ng-template>
```

### Nested Submenus

Multi-level menu navigation:

```html
<button scMenuTrigger [menu]="mainMenu">Menu</button>

<ng-template cdkConnectedOverlay>
  <div scMenu #mainMenu="scMenu">
    <ng-template scMenuContent>
      <div scMenuItem value="new">New File</div>
      <div scMenuItem value="open" [submenu]="recentMenu" #recentItem>
        <span class="flex-1">Open Recent</span>
        <svg class="ml-auto" si-chevron-right-icon aria-hidden="true"></svg>
      </div>
    </ng-template>
  </div>

  <!-- Submenu -->
  <ng-template
    [cdkConnectedOverlay]="{ origin: recentItem, usePopover: 'inline' }"
    [cdkConnectedOverlayPositions]="[
      { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 6 }
    ]"
  >
    <div scMenu #recentMenu="scMenu">
      <ng-template scMenuContent>
        <div scMenuItem value="file1">document.txt</div>
        <div scMenuItem value="file2">report.pdf</div>
      </ng-template>
    </div>
  </ng-template>
</ng-template>
```

## Positioning with CDK Overlay

Menus require CDK Overlay for positioning. The wrappers work seamlessly with Angular CDK:

```html
<ng-template
  [cdkConnectedOverlayOpen]="trigger.expanded()"
  [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
  [cdkConnectedOverlayPositions]="[
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 }
  ]"
  cdkAttachPopoverAsChild
>
  <div scMenu>
    <!-- Menu content -->
  </div>
</ng-template>
```

**Common Position Configurations:**

- **Below trigger (default)**: `originY: 'bottom', overlayY: 'top'`
- **Above trigger**: `originY: 'top', overlayY: 'bottom'`
- **Right of trigger**: `originX: 'end', overlayX: 'start'`
- **Left of trigger**: `originX: 'start', overlayX: 'end'`

## Animations

Menus support custom animations via the `animate.enter` and `animate.leave` inputs:

```html
<div
  scMenu
  [animate.enter]="'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2'"
  [animate.leave]="'animate-out fade-out-0 zoom-out-95 slide-out-to-top-2'"
>
  <!-- Content -->
</div>
```

**Built-in Animation Classes (from tw-animate-css):**

- Fade: `fade-in-0`, `fade-out-0`
- Zoom: `zoom-in-95`, `zoom-out-95`
- Slide: `slide-in-from-top-2`, `slide-out-to-bottom-2`

### Dynamic Animations

You can dynamically change animations based on position:

```typescript
export class MenuComponent {
  private menuPosition = signal<'top' | 'bottom'>('bottom');

  menuEnterAnimation = computed(() => {
    const position = this.menuPosition();
    const slideDirection = position === 'bottom' ? 'slide-in-from-top-2' : 'slide-in-from-bottom-2';
    return `animate-in fade-in-0 zoom-in-95 ${slideDirection}`;
  });

  onPositionChange(event: ConnectedOverlayPositionChange): void {
    const position = event.connectionPair.overlayY === 'top' ? 'bottom' : 'top';
    this.menuPosition.set(position);
  }
}
```

```html
<ng-template [cdkConnectedOverlayPositions]="positions" (positionChange)="onPositionChange($event)">
  <div scMenu [animate.enter]="menuEnterAnimation()">
    <!-- Content -->
  </div>
</ng-template>
```

## Accessibility Features

All Angular ARIA accessibility features are preserved:

- **ARIA Attributes**: Automatically manages `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup`
- **Keyboard Navigation**:
  - Arrow keys to navigate between items
  - Enter/Space to activate items
  - Escape to close menu
  - Arrow Right to open submenu
  - Arrow Left to close submenu
- **Focus Management**: Proper focus trapping and restoration
- **Screen Reader Support**: Semantic roles and proper labeling

## Styling Customization

Most components accept a `class` input for style overrides. Additional classes are merged with default styles using the `cn()` utility.

```html
<!-- Customize menu container -->
<div class="min-w-[16rem] max-h-[300px]" scMenu>
  <ng-template scMenuContent>
    <!-- Customize menu item -->
    <div class="font-bold text-base" scMenuItem value="important">Important Action</div>

    <!-- Customize separator -->
    <sc-menu-separator class="my-2 bg-red-500" />
  </ng-template>
</div>
```

## Comparison with Raw Angular ARIA

### Before (Raw Angular ARIA)

```html
<button #trigger="ngMenuTrigger" [menu]="mainMenu" ngMenuTrigger>Open</button>

<ng-template cdkConnectedOverlay>
  <div
    class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
    #mainMenu="ngMenu"
    ngMenu
  >
    <ng-template ngMenuContent>
      <div
        class="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent"
        ngMenuItem
        value="item1"
      >
        Item 1
      </div>
      <div class="-mx-1 my-1 h-px bg-border" role="separator"></div>
      <div
        class="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent"
        ngMenuItem
        value="item2"
      >
        Item 2
      </div>
    </ng-template>
  </div>
</ng-template>
```

### After (With Wrappers)

```html
<button scMenuTrigger [menu]="mainMenu" #trigger="scMenuTrigger">Open</button>

<ng-template cdkConnectedOverlay>
  <div scMenu #mainMenu="scMenu">
    <ng-template scMenuContent>
      <div scMenuItem value="item1">Item 1</div>
      <sc-menu-separator />
      <div scMenuItem value="item2">Item 2</div>
    </ng-template>
  </div>
</ng-template>
```

**Benefits:**

- Significantly less boilerplate HTML
- Cleaner, more readable templates
- Consistent styling across application
- Reusable separator component
- `data-slot` attributes for easier testing
- Easier to maintain and update styles

## Technical Implementation

### Composition with hostDirectives

Components that wrap Angular ARIA directives use the `hostDirectives` feature:

```typescript
@Directive({
  selector: '[scMenuItem]',
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'disabled', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'menu-item',
    '[class]': 'class()',
  },
})
export class ScMenuItem {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('...default classes...', this.classInput()));
}
```

### Data Slots

All components include `data-slot` attributes:

```html
<div data-slot="menu">
  <ng-template data-slot="menu-content">
    <div data-slot="menu-item"></div>
    <sc-menu-separator data-slot="menu-separator"></sc-menu-separator>
  </ng-template>
</div>
```

**Use Cases for data-slot:**

- E2E testing: `cy.get('[data-slot="menu-item"]')`
- CSS targeting: `[data-slot="menu"] { ... }`
- Debugging: Identify component boundaries in DevTools
- Documentation: Clear component hierarchy

This approach ensures:

- Full compatibility with Angular ARIA
- Zero runtime overhead (beyond Angular's built-in features)
- Type-safe input forwarding
- Flexible styling control
- Clear component identification
