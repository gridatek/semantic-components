# Menu

A dropdown menu component built on top of `@angular/aria/menu` and `@angular/cdk/overlay`. Supports keyboard navigation, submenus, lazy content, animations, and full accessibility.

## Components

| Component         | Type      | Selector                     | Description                                                                                                       |
| ----------------- | --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ScMenuProvider`  | Component | `div[scMenuProvider]`        | Root wrapper that auto-connects the trigger, portal, and menu. Supports `align` and `origin` inputs.              |
| `ScMenuTrigger`   | Directive | `[scMenuTrigger]`            | Button or element that opens the menu on click.                                                                   |
| `ScMenuPortal`    | Directive | `[scMenuPortal]`             | Applied to `<ng-template>`. Holds the menu template for overlay rendering. Used for both root menus and submenus. |
| `ScMenu`          | Directive | `[scMenu]`                   | The menu container. Auto-registers with its parent `ScMenuPortal`.                                                |
| `ScMenuContent`   | Directive | `ng-template[scMenuContent]` | Wraps menu items for lazy/deferred rendering.                                                                     |
| `ScMenuItem`      | Component | `[scMenuItem]`               | A menu item. Supports submenus via nested `ScMenuPortal`.                                                         |
| `ScMenuSeparator` | Directive | `[scMenuSeparator]`          | A visual separator between menu items.                                                                            |

## Usage

### Basic menu

```html
<div scMenuProvider>
  <button scMenuTrigger>Open Menu</button>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuItem value="cut">Cut</div>
        <div scMenuItem value="copy">Copy</div>
        <div scMenuItem value="paste">Paste</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

### With separators

```html
<div scMenuProvider>
  <button scMenuTrigger>Options</button>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuItem value="undo">Undo</div>
        <div scMenuItem value="redo">Redo</div>
        <div scMenuSeparator></div>
        <div scMenuItem value="delete">Delete</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

### With submenu

Nest another `<ng-template scMenuPortal>` inside an `ScMenuItem` to create a submenu. The submenu is auto-connected -- no manual bindings needed.

```html
<div scMenuProvider>
  <button scMenuTrigger>Open Menu</button>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuItem value="edit">Edit</div>
        <div scMenuItem value="more">
          More options
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                <div scMenuItem value="option-a">Option A</div>
                <div scMenuItem value="option-b">Option B</div>
              </ng-template>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

### End-aligned with custom origin

Use `align="end"` to right-align the dropdown. Pass a `CdkOverlayOrigin` to `[origin]` to position the menu relative to a different element (e.g. an input group container):

```html
<div scInputGroup cdkOverlayOrigin #group="cdkOverlayOrigin">
  <input scInput placeholder="Enter file name" />
  <div scInputGroupAddon align="inline-end">
    <div scMenuProvider align="end" [origin]="group">
      <button scButton scMenuTrigger variant="ghost" size="icon-xs" aria-label="More">...</button>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="settings">Settings</div>
            <div scMenuItem value="copy-path">Copy path</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  </div>
</div>
```

### Custom classes

All components accept a `class` input for style overrides via `cn()` (Tailwind merge):

```html
<div scMenuProvider class="my-custom-class">
  <button scMenuTrigger class="bg-primary text-white">Open</button>
  <ng-template scMenuPortal>
    <div scMenu class="w-64">
      <ng-template scMenuContent>
        <div scMenuItem value="item" class="font-bold">Bold Item</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

## Animations

`ScMenu` uses Angular's `animate.enter` and `animate.leave` host bindings with `tw-animate-css` classes for open/close transitions (fade + zoom, 150ms).

### Submenu overlay lifecycle

The submenu overlay is controlled by `ScMenuItem.submenuOpen`, which uses a two-phase approach:

1. **Bootstrap phase**: When the parent menu opens and `menuItem.expanded()` is `null` (submenu not yet connected), the overlay opens briefly so `ScMenu` can register itself with `ScMenuPortal`, which connects `menuItem.submenu`.
2. **Normal phase**: Once connected, `expanded()` returns `false` (closed) or `true` (open). The overlay opens/closes based on `menuItem.expanded() !== false`, enabling `animate.enter`/`animate.leave` to fire on actual submenu expansion.

This avoids a deadlock: the `Menu` instance only exists when the overlay is open, but `menuItem.expanded` requires the submenu to be connected first.

## Auto-wiring

The menu components use a push-based registration pattern to minimize boilerplate:

- **`ScMenuProvider`** auto-connects `ScMenuTrigger` to `ScMenu` via `signalSetFn`.
- **`ScMenu`** registers itself with the nearest `ScMenuPortal` on creation.
- **`ScMenuItem`** auto-connects a nested `ScMenuPortal`'s menu as its submenu.

This means no manual `[menu]`, `[submenu]`, `[open]`, `[config]`, or `[positions]` bindings are needed in templates.

## Inputs

### ScMenuProvider

| Input    | Type               | Default   | Description                                                             |
| -------- | ------------------ | --------- | ----------------------------------------------------------------------- |
| `align`  | `'start' \| 'end'` | `'start'` | Horizontal alignment of the dropdown relative to the origin.            |
| `offset` | `number`           | `4`       | Vertical gap (in pixels) between the trigger and the dropdown.          |
| `origin` | `CdkOverlayOrigin` | trigger   | Custom overlay origin. Defaults to the trigger element if not provided. |
| `class`  | `string`           | `''`      | Custom CSS classes.                                                     |

### ScMenu

| Input            | Type      | Description                        |
| ---------------- | --------- | ---------------------------------- |
| `id`             | `string`  | Unique ID for the menu.            |
| `wrap`           | `boolean` | Whether keyboard navigation wraps. |
| `disabled`       | `boolean` | Whether the menu is disabled.      |
| `typeaheadDelay` | `number`  | Delay for typeahead search.        |
| `expansionDelay` | `number`  | Delay before expanding submenus.   |
| `class`          | `string`  | Custom CSS classes.                |

### ScMenu outputs

| Output         | Type           | Description                           |
| -------------- | -------------- | ------------------------------------- |
| `itemSelected` | `EventEmitter` | Emitted when a menu item is selected. |

### ScMenuItem

| Input        | Type      | Description                       |
| ------------ | --------- | --------------------------------- |
| `id`         | `string`  | Unique ID for the item.           |
| `value`      | `V`       | The value of the item.            |
| `disabled`   | `boolean` | Whether the item is disabled.     |
| `searchTerm` | `string`  | Custom search term for typeahead. |
| `class`      | `string`  | Custom CSS classes.               |

## Architecture

```
ScMenuProvider
  |- ScMenuTrigger (button)
  |- ScMenuPortal (ng-template)
       |- ScMenu
            |- ScMenuContent (ng-template, lazy)
                 |- ScMenuItem
                 |- ScMenuItem (with submenu)
                 |    |- ScMenuPortal (ng-template)
                 |         |- ScMenu
                 |              |- ScMenuContent
                 |                   |- ScMenuItem
                 |- ScMenuSeparator
```
