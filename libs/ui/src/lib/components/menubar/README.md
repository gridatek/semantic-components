# Menubar

A row of menus, as at the top of a desktop app: File, Edit, View. In the look of the app's preset (shadcn's Menubar), on `@angular/aria`. The menus are made of the Menu's parts, which take the menu bar's look inside it.

## Usage

```html
<div scMenubar aria-label="Browser">
  <div scMenubarItem value="File">
    File
    <ng-template scMenuPortal>
      <div scMenu>
        <ng-template scMenuContent>
          <div scMenuGroup>
            <div scMenuItem value="New Tab">
              New Tab
              <span scMenuShortcut>⌘T</span>
            </div>
            <div scMenuItem value="New Window">New Window</div>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Print">Print...</div>
        </ng-template>
      </div>
    </ng-template>
  </div>
</div>
```

## Anatomy

```html
<div scMenubar>
  <div scMenubarItem>
    <ng-template scMenuPortal>
      <div scMenu>
        <ng-template scMenuContent>…the Menu's parts…</ng-template>
      </div>
    </ng-template>
  </div>
</div>
```

Each menu opens 8px below its item, 4px toward the start (mirrored right to left), above it if there is no room. In a menu bar, checkbox and radio items have their check at the start.

## Keyboard

The bar is one tab stop: ArrowLeft and ArrowRight move along it (mirrored right to left, by the bar's own direction), Home and End go to its ends, a letter goes to the item it starts. Enter, Space or ArrowDown opens an item's menu on its first item, ArrowUp on its last; with a menu open, ArrowLeft and ArrowRight open the next item's. In a menu, the Menu's keys. Escape closes the menu and gives focus back to its item; Tab closes it and leaves the bar.

## API reference

| Part            | Selector          | Inputs                                                                  |
| --------------- | ----------------- | ----------------------------------------------------------------------- |
| `ScMenubar`     | `[scMenubar]`     | `class` — the bar (`menubar`); name it with `aria-label`                |
| `ScMenubarItem` | `[scMenubarItem]` | `value`, `disabled`, `class` — holding a `scMenuPortal`, opens its menu |

The menus: the Menu's parts (see the Menu's README).

Every part's classes are the preset's (`injectPreset().menubar`: `bar`, `trigger`, and `menu` for the Menu's parts in a bar): shadcn's Menubar, in each style. The trigger adds a focus ring shadcn's lacks.
