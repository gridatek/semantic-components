# Tabs Next

Tabs and their panels, one shown at a time. In the look of the app's preset (shadcn's Tabs), Base UI's parts and state, on `@angular/aria`. The rewrite of Tabs, beside it until it is validated.

## Usage

```html
<div scTabsNext value="account">
  <div scTabsNextList>
    <button scTabsNextTab value="account">Account</button>
    <button scTabsNextTab value="password">Password</button>
  </div>
  <div scTabsNextPanel value="account">
    <ng-template scTabsNextContent>Make changes to your account here.</ng-template>
  </div>
  <div scTabsNextPanel value="password">
    <ng-template scTabsNextContent>Change your password here.</ng-template>
  </div>
</div>
```

## Anatomy

```html
<div scTabsNext>
  <div scTabsNextList>
    <button scTabsNextTab></button>
  </div>
  <div scTabsNextPanel>
    <ng-template scTabsNextContent></ng-template>
  </div>
</div>
```

## Limitation: panel content

Angular Aria renders a panel only through its template: content written straight in a panel is not allowed (Aria reports it in development). A panel's content is created when its tab is selected, and destroyed when another one is — keep what must survive a switch (typed text, state) outside the panel, in your component or your form.

## Keyboard

Tab enters the list on the selected tab, then goes on to its panel. ArrowLeft and ArrowRight move between the tabs (mirrored right to left, by the list's own direction), ArrowUp and ArrowDown when vertical; Home and End go to the ends. Enter or Space selects — or the arrows select as they move, with `activateOnFocus`. A disabled tab is reached, not selected.

## API reference

| Part                | Selector                         | Inputs                                                                                                            |
| ------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ScTabsNext`        | `[scTabsNext]`                   | `value` (`[(value)]`), `orientation` (`'horizontal'`, `'vertical'`), `class`                                      |
| `ScTabsNextList`    | `[scTabsNextList]`               | `variant` (`'default'`, `'line'`), `activateOnFocus` (default off), `wrap` (default on), `class` — role `tablist` |
| `ScTabsNextTab`     | `button[scTabsNextTab]`          | `value`, `disabled` (reached, not selected: `aria-disabled`), `class` — role `tab`                                |
| `ScTabsNextPanel`   | `[scTabsNextPanel]`              | `value`, `class` — role `tabpanel`, named by its tab                                                              |
| `ScTabsNextContent` | `ng-template[scTabsNextContent]` | — the panel's content                                                                                             |

Every part's classes are the preset's (`injectPreset().tabs`: `root`, `list` by variant, `trigger`, `panel`): shadcn's Tabs, in each style.

## Left out

- Base UI's `Tabs.Indicator` (a highlight sliding between tabs) and `data-activation-direction` (for panels sliding in): shadcn uses neither.
- Tabs as links for routing: page navigation is a `nav` with `aria-current`.
