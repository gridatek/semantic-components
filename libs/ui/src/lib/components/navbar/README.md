# Navbar

A site's top bar: your brand, links and actions; on narrow screens a toggle opens a menu under the bar. The bar is the page's banner (`header`); the menu is a disclosure, part of the page — nothing is trapped, the page still scrolls — following the WAI-ARIA disclosure navigation pattern.

## Features

- **Responsive** — the links show from `expand` (`sm`, `md`, `lg`); below it, the toggle and the menu
- **Disclosure menu** — `aria-expanded`, `aria-controls`; its height animates; it pushes the page down, or with `overlay` lies over it
- **Closes by itself** — Escape (focus back on the toggle), a link followed, the window growing wide enough
- **`[(open)]`** — the menu's state, two-way
- **Sticky**, and **hides on scroll** (away going down, back going up)
- **Current page** — `active` gives `aria-current="page"`
- **Works with the Navigation Menu** — on the same `nav`
- **RTL**

## Quick Start

```html
<header scNavbar #navbar="scNavbar">
  <a scNavbarBrand href="/"><svg siGalleryVerticalEndIcon></svg> Acme</a>

  <nav scNavbarNav aria-label="Main">
    <a scNavbarLink routerLink="/products" active>Products</a>
    <a scNavbarLink routerLink="/pricing">Pricing</a>
  </nav>

  <div scNavbarActions>
    <a scLink routerLink="/start">Get started</a>
  </div>

  <button scNavbarToggle>
    @if (navbar.open()) {
    <svg siXIcon></svg>
    <span class="sr-only">Close menu</span>
    } @else {
    <svg siMenuIcon></svg>
    <span class="sr-only">Open menu</span>
    }
  </button>

  <div scNavbarMenu>
    <nav aria-label="Main">
      <a scNavbarMenuLink routerLink="/products" active>Products</a>
      <a scNavbarMenuLink routerLink="/pricing">Pricing</a>
    </nav>
  </div>
</header>
```

**Rules**

- Name each `nav` (`aria-label`). The bar's links and the menu's are the same navigation, shown at different widths: give them the same name — only one is ever shown.
- The toggle's name follows its state ("Open menu" / "Close menu"); it has no `aria-pressed`.
- Several bars on one page (or in frames checked together): name each `header` too.

## With a Navigation Menu

Both on the same `nav`, so there is one landmark:

```html
<nav scNavigationMenu scNavbarNav aria-label="Main">
  <ul scNavigationMenuList>
    …
  </ul>
</nav>
```

## API

### ScNavbar — `header[scNavbar]`

`exportAs: 'scNavbar'`.

| Input          | Type                   | Default | Description                                         |
| -------------- | ---------------------- | ------- | --------------------------------------------------- |
| `open`         | `boolean` (two-way)    | `false` | Whether the menu is open                            |
| `expand`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | The width from which the links show, the toggle not |
| `sticky`       | `boolean`              | `false` | Stays at the top of the page                        |
| `hideOnScroll` | `boolean`              | `false` | Slides away scrolling down, back scrolling up       |
| `class`        | `string`               | `''`    | Additional CSS classes                              |

### ScNavbarBrand — `a[scNavbarBrand]`

Your logo and name, a link home.

### ScNavbarNav — `nav[scNavbarNav]`

The links, from `expand` up.

### ScNavbarLink — `a[scNavbarLink]`

A link of the bar. `active`: the page shown (`aria-current="page"`).

### ScNavbarActions — `div[scNavbarActions]`

The buttons at the end.

### ScNavbarToggle — `button[scNavbarToggle]`

Opens and closes the menu, below `expand`. Styled as the preset's button: `variant` (`'ghost'`), `size` (`'icon'`).

### ScNavbarMenu — `div[scNavbarMenu]`

The panel under the bar, below `expand`. Put a named `nav` inside, and any actions.

| Input     | Type      | Default | Description                                                                                                |
| --------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `overlay` | `boolean` | `false` | Over the page, under the bar, instead of pushing the page down; closes on a click or focus outside the bar |

### ScNavbarMenuLink — `a[scNavbarMenuLink]`

A link of the menu, a full-width row; closes the menu when followed. `active`: the page shown.

## Accessibility

- One banner (`header`), named navigation landmarks, none nested.
- The toggle: `aria-expanded`, `aria-controls` the menu; a name that follows the state.
- The menu is not modal: Tab moves through it and on; a closed menu is `invisible`, out of the tab order.
- Escape in the bar closes the menu and gives the toggle back the focus.
- `aria-current="page"` on the current link.
- Hiding on scroll is off under `prefers-reduced-motion` (no slide).
