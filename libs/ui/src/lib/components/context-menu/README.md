# Context Menu

A right-click context menu built on top of the `ScMenu` component, positioned at the cursor location.

## Usage

```typescript
import { ScContextMenu, ScContextMenuTrigger, ScMenu, ScMenuContent, ScMenuItem, ScMenuSeparator } from '@semantic-components/ui';
```

```html
<div scContextMenu class="h-[150px] w-[300px]">
  <div scContextMenuTrigger>Right click here</div>

  <div scMenu>
    <ng-template scMenuContent>
      <div scMenuItem value="Cut">Cut</div>
      <div scMenuItem value="Copy">Copy</div>
      <div scMenuItem value="Paste">Paste</div>
    </ng-template>
  </div>
</div>
```

## Components

### ScContextMenu

Container component that listens for right-click events and manages the menu lifecycle.

| Property | Type                 | Description                                        |
| -------- | -------------------- | -------------------------------------------------- |
| Selector | `div[scContextMenu]` | Must be placed on a `<div>` element.               |
| `class`  | `input<string>`      | CSS classes merged with the default `block` class. |

**Data attributes:**

| Attribute   | Value          |
| ----------- | -------------- |
| `data-slot` | `context-menu` |

### ScContextMenuTrigger

Directive that marks the area where right-clicking opens the menu.

| Property | Type                     | Description                                                                |
| -------- | ------------------------ | -------------------------------------------------------------------------- |
| Selector | `[scContextMenuTrigger]` | Attribute directive.                                                       |
| `class`  | `input<string>`          | CSS classes merged with default styling (flex, border-dashed, rounded-md). |

**Data attributes:**

| Attribute   | Value                  |
| ----------- | ---------------------- |
| `data-slot` | `context-menu-trigger` |

### Menu components

The context menu content uses the shared menu primitives (`ScMenu`, `ScMenuContent`, `ScMenuItem`, `ScMenuSeparator`, `ScMenuPortal`). See the menu component documentation for their full API.

## Examples

### With keyboard shortcuts

```html
<div scContextMenu class="h-[150px] w-[300px]">
  <div scContextMenuTrigger>Right click here</div>

  <div scMenu>
    <ng-template scMenuContent>
      <div scMenuItem value="Back">
        <span class="flex-1">Back</span>
        <span class="text-muted-foreground ml-auto text-xs">&#x2318;[</span>
      </div>
      <div scMenuItem value="Forward" [disabled]="true">
        <span class="flex-1">Forward</span>
        <span class="text-muted-foreground ml-auto text-xs">&#x2318;]</span>
      </div>
    </ng-template>
  </div>
</div>
```

### With submenus

Use `ScMenuPortal` inside a menu item to nest a submenu.

```html
<div scMenuItem value="More Tools">
  <span class="flex-1">More Tools</span>
  <svg siChevronRightIcon class="ml-auto size-4"></svg>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuItem value="Developer Tools">Developer Tools</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

## Accessibility

- The menu opens on the native `contextmenu` event (right-click or equivalent).
- Focus is moved to the first menu item when the menu opens.
- The menu closes when focus leaves the context menu container (`focusout`).
- Keyboard navigation and ARIA roles are handled by the underlying `ScMenu` component.
- Disabled items are supported via `[disabled]="true"` on `scMenuItem`.
