# Navigation Menu

Site navigation with panels of links: shadcn's Navigation Menu (its look in each style, the `navigationMenu` preset key), Base UI's parts and behaviour, built as a WAI-ARIA disclosure navigation (not a `menu`).

## Usage

```html
<nav scNavigationMenu aria-label="Main">
  <ul scNavigationMenuList>
    <li scNavigationMenuItem value="components">
      <button scNavigationMenuTrigger>
        Components
        <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
      </button>
      <div scNavigationMenuContent>
        <ul class="grid w-[400px] gap-2 md:grid-cols-2">
          <li><a scNavigationMenuLink routerLink="/docs/components/tabs">Tabs</a></li>
        </ul>
      </div>
    </li>
    <li scNavigationMenuItem>
      <a scNavigationMenuLink routerLink="/docs" routerLinkActive #docs="routerLinkActive" [active]="docs.isActive">Docs</a>
    </li>
  </ul>
</nav>
```

## Parts

| Part                          | Selector                           | What it does                                                                                                                                                                          |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNavigationMenu`            | `nav[scNavigationMenu]`            | `[(value)]` (the open item, or `null`), `delay` / `closeDelay` (50 ms), `viewport` (one shared box, default), `align` (`start`, `center`, `end`). Draws the shared box (a component). |
| `ScNavigationMenuList`        | `ul[scNavigationMenuList]`         | The top-level row.                                                                                                                                                                    |
| `ScNavigationMenuItem`        | `li[scNavigationMenuItem]`         | `value`; a link, or a trigger and its panel. Registers with the menu.                                                                                                                 |
| `ScNavigationMenuTrigger`     | `button[scNavigationMenuTrigger]`  | Hover or press; `aria-expanded`, `aria-controls`; the preset's `trigger`.                                                                                                             |
| `ScNavigationMenuTriggerIcon` | `svg[scNavigationMenuTriggerIcon]` | Your chevron, turned over while open, `aria-hidden`.                                                                                                                                  |
| `ScNavigationMenuContent`     | `div[scNavigationMenuContent]`     | The panel, inside its item: the preset's `content` padding (and `popup` without the shared box); lined up by `align`; invisible while closed.                                         |
| `ScNavigationMenuLink`        | `a[scNavigationMenuLink]`          | `active` (`aria-current="page"`), `closeOnClick` (true). Top level: the trigger's look; in a panel: the preset's `link`.                                                              |

## Behaviour

- **Hover** opens after `delay` (at once when another is open), leaving closes after `closeDelay`; a click keeps a hover-opened panel open, a second click closes it.
- **Keyboard**: Tab follows the page (a trigger, then its panel's links); ← → between top-level items (mirrored right to left), Home, End; ↓ into the open panel, ↑ ↓ within it; Escape closes and returns to the trigger. The focus leaving, or a click outside, closes it.
- **Panels stay in the page** (Tab order, search engines): closed, they are `invisible`. So they animate with CSS transitions, not `animate.enter` / `animate.leave` — those only run when an element comes or goes.
- **The shared box** follows the open panel's place and size; panels slide in from the side you came from.
- **Links close the menu** by default (`closeOnClick`; Base UI's default is off): a page shown without reloading would otherwise keep it open.

## Preset

`navigationMenu`: `trigger` (Base UI's open state as `aria-expanded:`), `link` (shadcn's in-panel classes resolved), `content` (padding), `popup` (corners, background, shadow, ring) — from `shadcn-reference/presets/<style>/navigation-menu.tsx`.

## Left out

Base UI's Portal, Positioner, Backdrop and Arrow (panels sit in their items, no overlay), `keepMounted` (always mounted), `onOpenChangeComplete`; vertical orientation and nested menus (later).
