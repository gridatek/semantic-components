# Context Menu Components

Displays a menu at the pointer position when triggered by a right-click.

## Architecture

```
ScContextMenu (Root)
    ├── open: signal<boolean>
    ├── position: signal<{x, y}>
    │
    ├── ScContextMenuTrigger (wraps any element)
    │     └── Listens to contextmenu event
    │
    └── ScContextMenuContent (ng-template)
          ├── Uses CDK Overlay at mouse position
          │
          ├── ScContextMenuLabel
          ├── ScContextMenuItem
          │     └── ScContextMenuShortcut
          ├── ScContextMenuSeparator
          │
          └── ScContextMenuSub
                ├── ScContextMenuSubTrigger
                └── ScContextMenuSubContent
```

## Components

| Component                 | Selector                           | Description                          |
| ------------------------- | ---------------------------------- | ------------------------------------ |
| `ScContextMenu`           | `div[scContextMenu]`             | Root wrapper with overlay management |
| `ScContextMenuTrigger`    | `[scContextMenuTrigger]`        | Element that triggers on right-click |
| `ScContextMenuContent`    | `<scContextMenuContent>`        | Menu content container               |
| `ScContextMenuItem`       | `[scContextMenuItem]`           | Individual menu item                 |
| `ScContextMenuLabel`      | `[scContextMenuLabel]`          | Label for grouping items             |
| `ScContextMenuSeparator`  | `[scContextMenuSeparator]`      | Visual separator                     |
| `ScContextMenuShortcut`   | `[scContextMenuShortcut]`       | Keyboard shortcut display            |
| `ScContextMenuSub`        | `div[scContextMenuSub]`         | Submenu wrapper                      |
| `ScContextMenuSubTrigger` | `div[scContextMenuSubTrigger]` | Submenu trigger                      |
| `ScContextMenuSubContent` | `div[scContextMenuSubContent]` | Submenu content                      |

## Usage

### Basic Context Menu

```html
<div scContextMenu>
  <div scContextMenuTrigger class="h-32 w-64 border border-dashed">Right click here</div>

  <scContextMenuContent>
    <div scContextMenuItem (select)="onCut()">
      Cut
      <span scContextMenuShortcut>⌘X</span>
    </div>
    <div scContextMenuItem (select)="onCopy()">
      Copy
      <span scContextMenuShortcut>⌘C</span>
    </div>
    <div scContextMenuItem (select)="onPaste()">
      Paste
      <span scContextMenuShortcut>⌘V</span>
    </div>
  </sc-context-menu-content>
</div>
```

### With Labels and Separators

```html
<scContextMenuContent>
  <span scContextMenuLabel>Edit</span>
  <div scContextMenuSeparator></div>
  <div scContextMenuItem>Cut</div>
  <div scContextMenuItem>Copy</div>
  <div scContextMenuItem>Paste</div>
</sc-context-menu-content>
```

### With Submenu

```html
<scContextMenuContent>
  <div scContextMenuItem>Back</div>
  <div scContextMenuItem>Forward</div>

  <div scContextMenuSub>
    <div scContextMenuSubTrigger>More Tools</div>
    <div scContextMenuSubContent>
      <div scContextMenuItem>Save Page As...</div>
      <div scContextMenuItem>Create Shortcut...</div>
      <div scContextMenuItem>Developer Tools</div>
    </div>
  </div>
</sc-context-menu-content>
```

### With Disabled Items

```html
<div scContextMenuItem [disabled]="true">Disabled Item</div>
```

## Inputs

### ScContextMenuItem

| Input           | Type      | Default | Description                     |
| --------------- | --------- | ------- | ------------------------------- |
| `disabled`      | `boolean` | `false` | Whether the item is disabled    |
| `closeOnSelect` | `boolean` | `true`  | Whether to close menu on select |

### ScContextMenuLabel

| Input   | Type      | Default | Description                          |
| ------- | --------- | ------- | ------------------------------------ |
| `inset` | `boolean` | `false` | Add left padding to align with items |

## Outputs

### ScContextMenuItem

| Output   | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| `select` | `void` | Emitted when item is selected |

## Features

- **Right-click triggered**: Opens at mouse cursor position
- **Backdrop dismiss**: Clicking outside closes the menu
- **Escape key**: Closes the menu
- **Submenu support**: Nested menus with hover trigger
- **Keyboard shortcuts**: Display keyboard shortcuts with `sc-context-menu-shortcut`
- **Disabled items**: Support for disabled menu items

## Accessibility

- Uses `role="menu"` and `role="menuitem"`
- `aria-haspopup` and `aria-expanded` on submenu triggers
- `tabindex="-1"` on menu items for focus management
- Escape key closes the menu

## Differences from Regular Menu

| Feature  | Context Menu       | Menu                |
| -------- | ------------------ | ------------------- |
| Trigger  | Right-click        | Click on button     |
| Position | At mouse cursor    | Attached to trigger |
| Use case | Contextual actions | Dropdown menus      |
