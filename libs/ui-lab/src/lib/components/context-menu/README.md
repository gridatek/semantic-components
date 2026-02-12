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
| `ScContextMenu`           | `div[sc-context-menu]`             | Root wrapper with overlay management |
| `ScContextMenuTrigger`    | `[sc-context-menu-trigger]`        | Element that triggers on right-click |
| `ScContextMenuContent`    | `<sc-context-menu-content>`        | Menu content container               |
| `ScContextMenuItem`       | `[sc-context-menu-item]`           | Individual menu item                 |
| `ScContextMenuLabel`      | `[sc-context-menu-label]`          | Label for grouping items             |
| `ScContextMenuSeparator`  | `[sc-context-menu-separator]`      | Visual separator                     |
| `ScContextMenuShortcut`   | `[sc-context-menu-shortcut]`       | Keyboard shortcut display            |
| `ScContextMenuSub`        | `div[sc-context-menu-sub]`         | Submenu wrapper                      |
| `ScContextMenuSubTrigger` | `div[sc-context-menu-sub-trigger]` | Submenu trigger                      |
| `ScContextMenuSubContent` | `div[sc-context-menu-sub-content]` | Submenu content                      |

## Usage

### Basic Context Menu

```html
<div sc-context-menu>
  <div sc-context-menu-trigger class="h-32 w-64 border border-dashed">Right click here</div>

  <sc-context-menu-content>
    <div sc-context-menu-item (select)="onCut()">
      Cut
      <span sc-context-menu-shortcut>⌘X</span>
    </div>
    <div sc-context-menu-item (select)="onCopy()">
      Copy
      <span sc-context-menu-shortcut>⌘C</span>
    </div>
    <div sc-context-menu-item (select)="onPaste()">
      Paste
      <span sc-context-menu-shortcut>⌘V</span>
    </div>
  </sc-context-menu-content>
</div>
```

### With Labels and Separators

```html
<sc-context-menu-content>
  <span sc-context-menu-label>Edit</span>
  <div sc-context-menu-separator></div>
  <div sc-context-menu-item>Cut</div>
  <div sc-context-menu-item>Copy</div>
  <div sc-context-menu-item>Paste</div>
</sc-context-menu-content>
```

### With Submenu

```html
<sc-context-menu-content>
  <div sc-context-menu-item>Back</div>
  <div sc-context-menu-item>Forward</div>

  <div sc-context-menu-sub>
    <div sc-context-menu-sub-trigger>More Tools</div>
    <div sc-context-menu-sub-content>
      <div sc-context-menu-item>Save Page As...</div>
      <div sc-context-menu-item>Create Shortcut...</div>
      <div sc-context-menu-item>Developer Tools</div>
    </div>
  </div>
</sc-context-menu-content>
```

### With Disabled Items

```html
<div sc-context-menu-item [disabled]="true">Disabled Item</div>
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
