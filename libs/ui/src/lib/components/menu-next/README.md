# Menu Next

A menu of actions from a button: groups, checkbox and radio items, submenus, shortcuts. In the look of the app's preset (shadcn's Dropdown Menu), with Base UI's behaviour, on `@angular/aria`. The rewrite of Menu, beside it until it is validated.

## Usage

```html
<div scMenuNextProvider [(open)]="open">
  <button scButton scMenuNextTrigger variant="outline">Open</button>
  <ng-template scMenuNextPortal>
    <div scMenuNext>
      <ng-template scMenuNextContent>
        <div scMenuNextGroup>
          <div scMenuNextLabel>My Account</div>
          <div scMenuNextItem value="Profile">Profile</div>
          <div scMenuNextItem value="Billing">Billing</div>
        </div>
        <div scMenuNextSeparator></div>
        <div scMenuNextItem value="Log out" variant="destructive">Log out</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

## Anatomy

```html
<div scMenuNextProvider>
  <button scMenuNextTrigger></button>
  <ng-template scMenuNextPortal>
    <div scMenuNext>
      <ng-template scMenuNextContent>
        <div scMenuNextGroup>
          <div scMenuNextLabel></div>
          <div scMenuNextItem><span scMenuNextShortcut></span></div>
        </div>
        <div scMenuNextSeparator></div>
        <div scMenuNextCheckboxItem>
          <span scMenuNextItemIndicator><svg></svg></span>
        </div>
        <div scMenuNextRadioGroup>
          <div scMenuNextRadioItem>
            <span scMenuNextItemIndicator><svg></svg></span>
          </div>
        </div>
        <div scMenuNextItem>
          <svg></svg>
          <ng-template scMenuNextPortal>…a submenu…</ng-template>
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

| Part                                          | Selector                                                          | Inputs                                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ScMenuNextProvider`                          | `div[scMenuNextProvider]`                                         | `open` (`[(open)]`), `side` (`'bottom'`, `'top'`), `align`, `offset`, `origin` (another element to open from), `class` |
| `ScMenuNextTrigger`                           | `[scMenuNextTrigger]`                                             | `class` — behaviour only; `scButton` for the look                                                                      |
| `ScMenuNextPortal`, `ScMenuNextContent`       | `ng-template[scMenuNextPortal]`, `ng-template[scMenuNextContent]` | — the menu, rendered while open; its items, once it has opened                                                         |
| `ScMenuNext`                                  | `div[scMenuNext]`                                                 | `wrap`, `disabled`, `typeaheadDelay`, `expansionDelay`, `class`; output `itemSelected`                                 |
| `ScMenuNextItem`                              | `[scMenuNextItem]`                                                | `value`, `disabled`, `variant` (`'default'`, `'destructive'`), `inset`, `class`                                        |
| `ScMenuNextCheckboxItem`                      | `[scMenuNextCheckboxItem]`                                        | `checked` (`[(checked)]`), `disabled`, `inset`, `class`                                                                |
| `ScMenuNextRadioGroup`, `ScMenuNextRadioItem` | `[scMenuNextRadioGroup]`, `[scMenuNextRadioItem]`                 | group: `value` (`[(value)]`); item: `value`, `disabled`, `inset`; `class`                                              |
| `ScMenuNextItemIndicator`                     | `span[scMenuNextItemIndicator]`                                   | `class` — shown when its item is on                                                                                    |
| `ScMenuNextGroup`, `ScMenuNextLabel`          | `[scMenuNextGroup]`, `[scMenuNextLabel]`                          | `class`; label: `inset` — a `group` named by its label                                                                 |
| `ScMenuNextSeparator`, `ScMenuNextShortcut`   | `[scMenuNextSeparator]`, `span[scMenuNextShortcut]`               | `class`                                                                                                                |

Every part's classes are the preset's (`injectPreset().menu`): shadcn's Dropdown Menu, in each style. Items read `data-highlighted` (the highlighted one), `data-variant`, `data-inset`; checkbox and radio items `data-checked`.
