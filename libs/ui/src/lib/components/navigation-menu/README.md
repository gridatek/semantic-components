# Navigation Menu

Site navigation with panels, as shadcn's (nova, built on Base UI): a trigger opens its item's panel on hover, click, Enter or Space; one panel at a time, in a shared box that moves and resizes from item to item while the content slides in from the side you came from. It follows the WAI-ARIA disclosure navigation pattern — not `role="menu"`.

## Features

- **Hover or press** — `delay` / `closeDelay` (50 ms, as Base UI); a click keeps a hover-opened panel open, a second click closes it
- **One shared box** (`viewport`, default) — or each panel under its trigger (`[viewport]="false"`)
- **`[(value)]`** — the open item
- **Tab order of the page** — a panel is written inside its item, after its trigger
- **Keyboard** — ←/→ between the top-level items (mirrored in RTL), Home/End, ↓ into the open panel (opening it first), ↓/↑ between a panel's links, Escape back to the trigger
- **Closes by itself** — Escape, a link followed, a click outside, the focus leaving its item
- **Current page** — `active` on a link: `aria-current="page"`

## Quick Start

```html
<nav scNavigationMenu aria-label="Main">
  <ul scNavigationMenuList>
    <li scNavigationMenuItem value="components">
      <button scNavigationMenuTrigger>
        Components
        <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
      </button>
      <div scNavigationMenuContent>
        <ul class="grid w-96 gap-1 md:grid-cols-2">
          <li><a scNavigationMenuLink routerLink="/docs/dialog">Dialog</a></li>
          <li><a scNavigationMenuLink routerLink="/docs/tabs">Tabs</a></li>
        </ul>
      </div>
    </li>
    <li scNavigationMenuItem>
      <a scNavigationMenuLink routerLink="/docs" active>Docs</a>
    </li>
  </ul>
</nav>
```

**Rules**

- Name the `nav` (`aria-label`).
- Write each panel inside its item, after the trigger; lay out its inside as you like.
- A panel's links are `scNavigationMenuLink`: they close the menu when followed and get the panel's arrow keys.

## API

### ScNavigationMenu — `nav[scNavigationMenu]`

`exportAs: 'scNavigationMenu'`.

| Input        | Type                       | Default | Description                                                                      |
| ------------ | -------------------------- | ------- | -------------------------------------------------------------------------------- |
| `value`      | `string \| null` (two-way) | `null`  | The open item                                                                    |
| `delay`      | `number`                   | `50`    | ms the pointer rests on a trigger before it opens (at once when another is open) |
| `closeDelay` | `number`                   | `50`    | ms after the pointer leaves before it closes                                     |
| `viewport`   | `boolean`                  | `true`  | One shared box for the panels; `false`: each its own                             |
| `class`      | `string`                   | `''`    | Additional CSS classes                                                           |

### ScNavigationMenuList — `ul[scNavigationMenuList]`

The top-level items, in a row.

### ScNavigationMenuItem — `li[scNavigationMenuItem]`

`value`: its name in the menu's `value` (made up if left out).

### ScNavigationMenuTrigger — `button[scNavigationMenuTrigger]`

Opens its item's panel. `aria-expanded`, `aria-controls`, `data-state="open|closed"`.

### ScNavigationMenuTriggerIcon — `svg[scNavigationMenuTriggerIcon]`

Your chevron (down): turns over while open. `aria-hidden`.

### ScNavigationMenuContent — `div[scNavigationMenuContent]`

The panel: always in the page; closed, `invisible` (out of the tab order and the accessibility tree). `data-state`, `data-side="start|end"` (where it rests from the open one).

### ScNavigationMenuLink — `a[scNavigationMenuLink]`

At the top level it looks like a trigger; in a panel, a row. `active`: `aria-current="page"`, `data-active`.

## Accessibility

- Disclosure navigation: buttons with `aria-expanded` and `aria-controls`, links with `aria-current`; no `menu` role (site navigation needs no menubar focus model).
- The panels are in the page after their triggers: Tab reaches their links in order.
- Escape closes and gives the trigger back the focus; the focus leaving an item closes its panel.
- Motion off under `prefers-reduced-motion`.

## Left out

Nested submenus, a vertical orientation, the arrow indicator.
