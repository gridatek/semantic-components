# Menu

A menu of actions from a button: groups, checkbox and radio items, submenus, shortcuts. In the look of the app's preset (shadcn's Dropdown Menu), with Base UI's behaviour, on `@angular/aria`.

## Usage

```html
<div scMenuProvider [(open)]="open">
  <button scButton scMenuTrigger variant="outline">Open</button>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuGroup>
          <div scMenuLabel>My Account</div>
          <div scMenuItem value="Profile">Profile</div>
          <div scMenuItem value="Billing">Billing</div>
        </div>
        <div scMenuSeparator></div>
        <div scMenuItem value="Log out" variant="destructive">Log out</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

## Anatomy

```html
<div scMenuProvider>
  <button scMenuTrigger></button>
  <ng-template scMenuPortal>
    <div scMenu>
      <ng-template scMenuContent>
        <div scMenuGroup>
          <div scMenuLabel></div>
          <div scMenuItem><span scMenuShortcut></span></div>
        </div>
        <div scMenuSeparator></div>
        <div scMenuCheckboxItem>
          <span scMenuItemIndicator><svg></svg></span>
        </div>
        <div scMenuRadioGroup>
          <div scMenuRadioItem>
            <span scMenuItemIndicator><svg></svg></span>
          </div>
        </div>
        <div scMenuItem>
          <svg></svg>
          <ng-template scMenuPortal>…a submenu…</ng-template>
        </div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

The menu takes its trigger's direction and language (`dir`, `lang`); its submenus open at the reading end.

## Keyboard

On the trigger, Enter, Space or ArrowDown opens the menu on its first item, ArrowUp on its last. A click opens it with nothing highlighted, until the pointer moves or a key is pressed. The arrows move, Home and End go to the ends, a letter goes to the item it starts. The arrow toward the reading end, Enter or Space opens a submenu on its first item; the other arrow closes it. A checkbox or radio item toggles and the menu stays open. Escape closes and gives focus back to the trigger; Tab closes and moves on. A disabled item is reached, not chosen.

## API reference

| Part                                  | Selector                                                  | Inputs                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ScMenuProvider`                      | `div[scMenuProvider]`                                     | `open` (`[(open)]`), `side` (`'bottom'`, `'top'`), `align`, `offset`, `origin` (another element to open from), `class` |
| `ScMenuTrigger`                       | `[scMenuTrigger]`                                         | `class` — behaviour only; `scButton` for the look                                                                      |
| `ScMenuPortal`, `ScMenuContent`       | `ng-template[scMenuPortal]`, `ng-template[scMenuContent]` | — the menu, rendered while open; its items, once it has opened                                                         |
| `ScMenu`                              | `div[scMenu]`                                             | `wrap`, `disabled`, `typeaheadDelay`, `expansionDelay`, `class`; output `itemSelected`                                 |
| `ScMenuItem`                          | `[scMenuItem]`                                            | `value`, `disabled`, `variant` (`'default'`, `'destructive'`), `inset`, `class`                                        |
| `ScMenuCheckboxItem`                  | `[scMenuCheckboxItem]`                                    | `checked` (`[(checked)]`), `disabled`, `inset`, `class`                                                                |
| `ScMenuRadioGroup`, `ScMenuRadioItem` | `[scMenuRadioGroup]`, `[scMenuRadioItem]`                 | group: `value` (`[(value)]`); item: `value`, `disabled`, `inset`; `class`                                              |
| `ScMenuItemIndicator`                 | `span[scMenuItemIndicator]`                               | `class` — shown when its item is on                                                                                    |
| `ScMenuGroup`, `ScMenuLabel`          | `[scMenuGroup]`, `[scMenuLabel]`                          | `class`; label: `inset` — a `group` named by its label                                                                 |
| `ScMenuSeparator`, `ScMenuShortcut`   | `[scMenuSeparator]`, `span[scMenuShortcut]`               | `class`                                                                                                                |

Every part's classes are the preset's (`injectPreset().menu`): shadcn's Dropdown Menu, in each style. Items read `data-highlighted` (the highlighted one), `data-variant`, `data-inset`; checkbox and radio items `data-checked`.
