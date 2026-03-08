# Menu Bar

A horizontal menu bar component for application-style navigation, built on `@angular/aria/menu` primitives with CDK overlay positioning.

## Usage

```typescript
import { ScMenu, ScMenuBar, ScMenuBarItem, ScMenuContent, ScMenuItem, ScMenuPortal, ScMenuSeparator } from '@semantic-components/ui';
```

```html
<div scMenuBar>
  <div scMenuBarItem value="File">
    File
    <ng-template scMenuPortal>
      <div scMenu>
        <ng-template scMenuContent>
          <div scMenuItem value="New">New</div>
          <div scMenuItem value="Open">Open</div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Save">Save</div>
        </ng-template>
      </div>
    </ng-template>
  </div>

  <div scMenuBarItem value="Edit">
    Edit
    <ng-template scMenuPortal>
      <div scMenu>
        <ng-template scMenuContent>
          <div scMenuItem value="Undo">Undo</div>
          <div scMenuItem value="Redo">Redo</div>
        </ng-template>
      </div>
    </ng-template>
  </div>
</div>
```

## Components

### `scMenuBar`

Directive applied to the menu bar container. Delegates to `@angular/aria/menu` `MenuBar` via host directives.

| Property | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| `class`  | `string` | Additional CSS classes to merge in. |

| Data Attribute | Value        |
| -------------- | ------------ |
| `data-slot`    | `"menu-bar"` |

### `scMenuBarItem`

Component applied to each top-level menu bar item. Uses `MenuItem` and `CdkOverlayOrigin` as host directives and renders an attached CDK overlay for the submenu.

| Input      | Type      | Description                             |
| ---------- | --------- | --------------------------------------- |
| `class`    | `string`  | Additional CSS classes to merge in.     |
| `id`       | `string`  | Forwarded to the underlying `MenuItem`. |
| `value`    | `string`  | Identifies the menu item.               |
| `disabled` | `boolean` | Disables the menu item.                 |

| Data Attribute | Value             |
| -------------- | ----------------- |
| `data-slot`    | `"menu-bar-item"` |

| Export As       | Description                         |
| --------------- | ----------------------------------- |
| `scMenuBarItem` | Template reference to the instance. |

Submenus are declared by placing an `<ng-template scMenuPortal>` inside the item, containing an `scMenu` with `scMenuContent`.

## Examples

### Items with icons and keyboard shortcuts

```html
<div scMenuBarItem value="File">
  File
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuItem value="New">
          <svg siFileTextIcon class="size-4 shrink-0" aria-hidden="true"></svg>
          <span class="flex-1">New</span>
          <span class="text-muted-foreground ml-auto text-xs tracking-widest">&#8984;N</span>
        </div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

### Nested submenus

Nest another `scMenuPortal` inside a `scMenuItem` to create multi-level menus:

```html
<div scMenuItem value="Share">
  <span class="flex-1">Share</span>
  <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuItem value="Share with others">Share with others</div>
        <div scMenuItem value="Publish to web">Publish to web</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

### Disabled items

```html
<div scMenuItem value="Show ruler" [disabled]="true">Show ruler</div>
```

## Accessibility

- Built on `@angular/aria/menu` (`MenuBar` and `MenuItem`), which provides the WAI-ARIA Menu Bar pattern including `role="menubar"`, `role="menuitem"`, and `aria-expanded` attributes.
- Keyboard navigation (arrow keys, Enter, Escape) is handled by the underlying ARIA primitives.
- Focus management and roving tabindex are provided automatically.
- Decorative icons inside menu items should use `aria-hidden="true"`.
