# Tabs

Tabs and their panels, one shown at a time. In the look of the app's style (shadcn's Tabs), Base UI's parts and state, on `@angular/aria`.

## Usage

```html
<div scTabs value="account">
  <div scTabsList>
    <button scTabsTab value="account">Account</button>
    <button scTabsTab value="password">Password</button>
  </div>
  <div scTabsPanel value="account">
    <ng-template scTabsPanelContent>Make changes to your account here.</ng-template>
  </div>
  <div scTabsPanel value="password">
    <ng-template scTabsPanelContent>Change your password here.</ng-template>
  </div>
</div>
```

## Anatomy

```html
<div scTabs>
  <div scTabsList>
    <button scTabsTab></button>
  </div>
  <div scTabsPanel>
    <ng-template scTabsPanelContent></ng-template>
  </div>
</div>
```

## Limitation: panel content

Angular Aria renders a panel only through its template: content written straight in a panel is not allowed (Aria reports it in development). A panel's content is created when its tab is selected, and destroyed when another one is — keep what must survive a switch (typed text, state) outside the panel, in your component or your form.

## Keyboard

Tab enters the list on the selected tab, then goes on to its panel. ArrowLeft and ArrowRight move between the tabs (mirrored right to left, by the list's own direction), ArrowUp and ArrowDown when vertical; Home and End go to the ends. Enter or Space selects — or the arrows select as they move, with `activateOnFocus`. A disabled tab is reached, not selected.

A tab is scrolled wholly into sight when it takes focus: tabs that don't fit (a phone) go in a box that scrolls — `<div class="max-w-full overflow-x-auto"><div scTabsList>…</div></div>` — and the keyboard brings the one it reaches into view (the browser would leave a partly hidden one where it is).

## API reference

| Part                 | Selector                          | Inputs                                                                                                            |
| -------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ScTabs`             | `[scTabs]`                        | `value` (`[(value)]`), `orientation` (`'horizontal'`, `'vertical'`), `class`                                      |
| `ScTabsList`         | `[scTabsList]`                    | `variant` (`'default'`, `'line'`), `activateOnFocus` (default off), `wrap` (default on), `class` — role `tablist` |
| `ScTabsTab`          | `button[scTabsTab]`               | `value`, `disabled` (reached, not selected: `aria-disabled`), `class` — role `tab`                                |
| `ScTabsPanel`        | `[scTabsPanel]`                   | `value`, `class` — role `tabpanel`, named by its tab                                                              |
| `ScTabsPanelContent` | `ng-template[scTabsPanelContent]` | — the panel's content                                                                                             |

Every part's classes are the style's (`injectStyle().tabs`: `root`, `list` by variant, `trigger`, `panel`): shadcn's Tabs, in each style.

## Left out

- Base UI's `Tabs.Indicator` (a highlight sliding between tabs) and `data-activation-direction` (for panels sliding in): shadcn uses neither.
- Tabs as links for routing: page navigation is a `nav` with `aria-current`.
