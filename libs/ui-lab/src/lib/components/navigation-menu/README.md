# Navigation Menu Components

A collection of links for navigating websites with hover-activated dropdowns.

## Architecture

```
ScNavigationMenu (Root - nav element)
    ├── activeItem: signal<string | null>
    │
    └── ScNavigationMenuList (ul element)
          │
          ├── ScNavigationMenuItem (li - with dropdown)
          │     ├── open: signal<boolean>
          │     ├── Handles hover enter/leave
          │     │
          │     ├── ScNavigationMenuTrigger (button)
          │     │     └── CdkOverlayOrigin
          │     │
          │     └── ScNavigationMenuContent
          │           └── cdkConnectedOverlay
          │
          └── ScNavigationMenuItem (li - simple link)
                └── ScNavigationMenuLink (a element)
```

## Components

| Component                 | Selector                             | Description                                 |
| ------------------------- | ------------------------------------ | ------------------------------------------- |
| `ScNavigationMenu`        | `nav[sc-navigation-menu]`            | Root navigation wrapper                     |
| `ScNavigationMenuList`    | `ul[sc-navigation-menu-list]`        | List container for items                    |
| `ScNavigationMenuItem`    | `li[sc-navigation-menu-item]`        | Individual menu item with optional dropdown |
| `ScNavigationMenuTrigger` | `button[sc-navigation-menu-trigger]` | Button that shows dropdown on hover         |
| `ScNavigationMenuContent` | `div[sc-navigation-menu-content]`    | Dropdown content container                  |
| `ScNavigationMenuLink`    | `a[sc-navigation-menu-link]`         | Simple navigation link (no dropdown)        |

## Usage

### Basic Navigation

```html
<nav sc-navigation-menu>
  <ul sc-navigation-menu-list>
    <!-- Item with dropdown -->
    <li sc-navigation-menu-item>
      <button sc-navigation-menu-trigger>Products</button>
      <div sc-navigation-menu-content>
        <ul class="grid gap-3 p-4 w-[400px]">
          <li>
            <a href="/product-a">Product A</a>
          </li>
          <li>
            <a href="/product-b">Product B</a>
          </li>
        </ul>
      </div>
    </li>

    <!-- Simple link -->
    <li sc-navigation-menu-item>
      <a sc-navigation-menu-link href="/about">About</a>
    </li>
  </ul>
</nav>
```

### Mega Menu Style

```html
<li sc-navigation-menu-item>
  <button sc-navigation-menu-trigger>Components</button>
  <div sc-navigation-menu-content>
    <ul class="grid w-[600px] gap-3 p-4 md:grid-cols-2">
      <li>
        <a class="block p-3 rounded-md hover:bg-accent" href="#">
          <div class="font-medium">Alert Dialog</div>
          <p class="text-sm text-muted-foreground">Modal dialog for important content.</p>
        </a>
      </li>
      <!-- More items... -->
    </ul>
  </div>
</li>
```

### With Featured Section

```html
<div sc-navigation-menu-content>
  <ul class="grid gap-3 p-4 lg:grid-cols-[.75fr_1fr]">
    <!-- Featured card spanning rows -->
    <li class="row-span-3">
      <a class="flex h-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6" href="#">
        <div class="text-lg font-medium">Featured</div>
        <p class="text-sm text-muted-foreground">Highlighted content here.</p>
      </a>
    </li>
    <!-- Regular links -->
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
  </ul>
</div>
```

## Inputs

### ScNavigationMenuLink

| Input    | Type      | Default | Description                           |
| -------- | --------- | ------- | ------------------------------------- |
| `active` | `boolean` | `false` | Whether this link is currently active |

## Features

- **Hover triggered**: Dropdowns open on mouse enter
- **Smooth close**: Small delay before closing allows mouse movement
- **Flexible content**: Support any content in dropdowns
- **Auto chevron**: Trigger buttons include animated chevron icon
- **Simple links**: Support for non-dropdown navigation items

## Styling

The components use Tailwind CSS classes with shadcn/ui design tokens:

- Trigger: `bg-background hover:bg-accent`
- Content: Uses CDK overlay for positioning
- Transitions: Fade and scale animations

## Accessibility

- Uses semantic `nav`, `ul`, `li` elements
- `aria-expanded` on triggers indicates dropdown state
- Keyboard navigation support through native focus handling
