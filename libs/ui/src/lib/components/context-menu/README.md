# Context Menu

A menu at the pointer, opened by a right-click on an area — a long press on touch, Shift+F10 or the Menu key on the focused area. In the look of the app's preset (shadcn's Context Menu), on `@angular/aria`. The menu is made of the Menu's parts, which take the context menu's look in it.

## Usage

```html
<div scContextMenuProvider class="w-full max-w-xs">
  <div scContextMenuTrigger class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm">Right click here</div>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuGroup>
          <div scMenuItem value="Back">Back</div>
          <div scMenuItem value="Forward" [disabled]="true">Forward</div>
          <div scMenuItem value="Reload">Reload</div>
        </div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

## Anatomy

```html
<div scContextMenuProvider>
  <div scContextMenuTrigger></div>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>…the Menu's parts…</ng-template>
    </div>
  </ng-template>
</div>
```

The area's look and text are yours; the part makes it focusable, shows its focus, and stops text selection on a long press.

The menu opens at the pointer: at its reading end, 4px down (`side`: `'end'`, `'start'`, `'top'`, `'bottom'`), mirrored right to left, at the other side if there is no room. It takes the area's direction and language.

## Keyboard

A right-click opens the menu with nothing highlighted, until the pointer moves or a key is pressed (the first ArrowDown then shows the first item). On the focused area, Shift+F10 or the Menu key opens it on its first item. In the menu, the Menu's keys. Escape, a click outside or a choice closes it; focus goes back to where it was.

## API reference

| Part                    | Selector                     | Inputs                                                                                                                                                                   |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScContextMenuProvider` | `div[scContextMenuProvider]` | `open` (`[(open)]`: opened here, at the area's centre), `side` (`'end'`, `'start'`, `'top'`, `'bottom'`), `class` — holds the area and the menu; catches the right-click |
| `ScContextMenuTrigger`  | `[scContextMenuTrigger]`     | `class` — the area (focusable)                                                                                                                                           |

The menu: in a `scMenuPortal`, rendered while it is open, made of the Menu's parts (see the Menu's README).

The menu's parts read the preset's `contextMenu` key (`injectPreset().contextMenu`): shadcn's Context Menu, in each style.
