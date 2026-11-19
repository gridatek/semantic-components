# Header

A site's top bar, the page's banner: your brand, the Navigation Menu's links and your actions; on narrow screens a toggle and a menu that covers the page below the bar. It can stay at the top, or slide away as the page scrolls. For an app's navigation beside the page, use a Sidebar.

## Features

- **Responsive** — the links show from `expand` (`sm`, `md`, `lg`); below it, the toggle and the menu
- **Disclosure menu** — `aria-expanded`, `aria-controls`; it covers the page below the bar, see-through and blurred as shadcn's (scrolling inside if it is taller); it opens at once and fades out in 100ms on closing, or with `push` pushes the page down, its height animating
- **The toggle's icon animates** — once the toggle is pressed, the icon your `@if` swaps in (Menu ↔ X) turns 45° and fades in (100ms; not on the first paint, not with reduced motion)
- **Closes by itself** — Escape (focus back on the toggle), a link followed, the window growing wide enough; covering the page, the focus leaving the bar too
- **`[(mobileMenuOpen)]`** — the mobile menu's state, two-way
- **Sticky**, and **hides on scroll** (away going down, back going up)
- **The links are a Navigation Menu** — the bar's `nav`, which the header hides below `expand`; the header adds only what the Navigation Menu doesn't have: the bar, the breakpoint, the phone menu
- **Current page** — `active` gives `aria-current="page"`, in the bar (the Navigation Menu's links) and in the menu
- **RTL**

## Quick Start

```html
<header scHeader #header="scHeader">
  <a href="/" class="flex items-center gap-2 font-semibold"> <svg siGalleryVerticalEndIcon></svg> Acme </a>

  <nav scNavigationMenu aria-label="Main">
    <ul scNavigationMenuList>
      <li scNavigationMenuItem>
        <a scNavigationMenuLink routerLink="/products" active>Products</a>
      </li>
      <li scNavigationMenuItem>
        <a scNavigationMenuLink routerLink="/pricing">Pricing</a>
      </li>
    </ul>
  </nav>

  <div class="ms-auto flex items-center gap-2">
    <a scLink variant="button" routerLink="/start">Get started</a>
    <button scHeaderMobileMenuToggle class="-me-2">
      @if (header.mobileMenuOpen()) {
      <svg siXIcon></svg>
      <span class="sr-only">Close menu</span>
      } @else {
      <svg siMenuIcon></svg>
      <span class="sr-only">Open menu</span>
      }
    </button>
  </div>

  <ng-template scHeaderMobileMenu>
    <nav aria-label="Main">
      <a scNavigationMenuLink routerLink="/products" active>Products</a>
      <a scNavigationMenuLink routerLink="/pricing">Pricing</a>
    </nav>
  </ng-template>
</header>
```

**Rules**

- Name each `nav` (`aria-label`). The bar's links and the menu's are the same navigation, shown at different widths: give them the same name — only one is ever shown.
- The toggle's name follows its state ("Open menu" / "Close menu"); it has no `aria-pressed`.
- Several bars on one page (or in frames checked together): name each `header` too.

## API

### ScHeader — `header[scHeader]`

`exportAs: 'scHeader'`.

| Input            | Type                   | Default | Description                                         |
| ---------------- | ---------------------- | ------- | --------------------------------------------------- |
| `mobileMenuOpen` | `boolean` (two-way)    | `false` | Whether the mobile menu is open                     |
| `expand`         | `'sm' \| 'md' \| 'lg'` | `'md'`  | The width from which the links show, the toggle not |
| `sticky`         | `boolean`              | `false` | Stays at the top of the page                        |
| `hideOnScroll`   | `boolean`              | `false` | Slides away scrolling down, back scrolling up       |
| `class`          | `string`               | `''`    | Additional CSS classes                              |

### ScHeaderMobileMenuToggle — `button[scHeaderMobileMenuToggle]`

Opens and closes the menu, below `expand`. Styled as the style's button: `variant` (`'ghost'`), `size` (`'icon'`). Your icons inside (Menu and X, swapped with `@if`); once pressed, the one that comes in turns and fades in. Where it sits is yours: `ms-auto` to reach the bar's end, `-me-2` to line its icon up with the edge.

### ScHeaderMobileMenu — `ng-template[scHeaderMobileMenu]`

The menu's content, below `expand`: a named `nav` with `scNavigationMenuLink`s (the Navigation Menu's link, with its states: following one closes the menu), and any actions, in an `ng-template`. The header renders it while the menu is open, in its own panel under the bar (`data-slot="header-menu"`, the toggle's `aria-controls` while open), and removes it on closing — so closed, its links aren't in the page. `class`: classes for that panel.

| Input  | Type      | Default | Description                                                                                            |
| ------ | --------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `push` | `boolean` | `false` | Pushes the page down, instead of covering it below the bar (where the focus leaving the bar closes it) |

## Accessibility

- One banner (`header`), named navigation landmarks, none nested.
- The toggle: `aria-expanded`, `aria-controls` the menu; a name that follows the state.
- The menu is not modal: Tab moves through it and on; a closed menu is `invisible`, out of the tab order.
- Escape in the bar closes the menu and gives the toggle back the focus.
- `aria-current="page"` on the current link.
- Hiding on scroll is off under `prefers-reduced-motion` (no slide).
