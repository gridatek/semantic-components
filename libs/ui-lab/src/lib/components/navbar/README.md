# Navbar

A responsive navigation bar block with mobile menu support. Automatically adapts between desktop horizontal navigation and a mobile hamburger menu with slide-in drawer.

## Components

- `ScNavbarProvider` - Root provider that manages state and links navbar with mobile menu
- `ScNavbar` - Root nav element for the main navigation bar
- `ScNavbarBrand` - Brand/logo section with focus styles
- `ScNavbarGroup` - Groups navbar elements together (e.g., brand + navigation)
- `ScNavbarActions` - Right-aligned action buttons container
- `ScNavbarMobileTrigger` - Mobile menu toggle button (uses content projection for icons)
- `ScNavbarMobilePortal` - Mobile menu portal using CDK overlay (handles rendering)
- `ScNavbarMobileMenu` - Mobile menu container with styling (customizable)
- `ScNavbarMobileLink` - Mobile menu link with auto-close on navigation

## Architecture

The navbar uses a provider pattern similar to the sheet component:

- **Provider**: `ScNavbarProvider` wraps everything and manages state
- **Navbar**: The actual navigation bar sits inside the provider
- **Mobile Menu**: The mobile menu portal is a sibling to the navbar (not nested inside)
- **Components communicate**: All components inject the provider to access shared state

This architecture allows the mobile menu to be positioned independently while maintaining a clean connection to the navbar state.

## Usage

### Basic Navbar

The recommended approach is to use `ScNavigationMenu` for navigation. See the example below.

**Note:** The navbar uses `justify-between` to space its direct children. Use `sc-navbar-group` to keep related elements (like brand and navigation) together on the left side.

### With Navigation Menu

You can integrate `ScNavigationMenu` components for dropdown navigation:

```typescript
import { SiMenuIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  imports: [
    ScNavbar,
    ScNavbarProvider,
    ScNavbarMobileTrigger,
    // ... other imports
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <div sc-navbar-provider>
      <nav sc-navbar>
        <div sc-navbar-group>
          <a sc-navbar-brand routerLink="/">
            <span>Brand</span>
          </a>

          <!-- Navigation Menu with Dropdowns -->
          <nav sc-navigation-menu class="hidden md:flex">
            <ul sc-navigation-menu-list>
              <li sc-navigation-menu-item>
                <button sc-navigation-menu-trigger>Products</button>
                <div sc-navigation-menu-content>
                  <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <a sc-navigation-menu-link routerLink="/products/web">
                        <div class="text-sm font-medium leading-none">Web Apps</div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Build modern web applications
                        </p>
                      </a>
                    </li>
                    <!-- More items -->
                  </ul>
                </div>
              </li>

              <li sc-navigation-menu-item>
                <a sc-navigation-menu-link routerLink="/docs">Docs</a>
              </li>
            </ul>
          </nav>
        </div>

        <div sc-navbar-actions>
          <button sc-button>Get Started</button>
          <button sc-navbar-mobile-trigger #trigger="scNavbarMobileTrigger">
            @if (trigger.isMobileMenuOpen()) {
              <svg si-x-icon></svg>
            } @else {
              <svg si-menu-icon></svg>
            }
            <span class="sr-only">
              {{ trigger.isMobileMenuOpen() ? 'Close menu' : 'Open menu' }}
            </span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div sc-navbar-mobile-portal>
        <div sc-navbar-mobile-menu>
          <a sc-navbar-mobile-link routerLink="/products">Products</a>
          <a sc-navbar-mobile-link routerLink="/docs">Docs</a>
        </div>
      </div>
    </div>
  `,
})
```

**Note:** The navigation menu automatically closes when navigation occurs (via router events).

## Controlling Mobile Menu State

You can control the mobile menu state using two-way binding on the provider:

```html
<div sc-navbar-provider [(open)]="mobileMenuOpen">
  <!-- navbar content -->
</div>
```

```typescript
export class MyComponent {
  readonly mobileMenuOpen = model(false);
}
```

## Active State

Use the `active` input to indicate the current page for mobile links:

```html
<a sc-navbar-mobile-link routerLink="/about" [active]="isAboutPage">About</a>
```

## With RouterLinkActive

For automatic active state based on the current route:

```html
<a sc-navbar-mobile-link routerLink="/about" routerLinkActive="active" #rla="routerLinkActive" [active]="rla.isActive">About</a>
```

## Mobile Menu Behavior

The mobile menu automatically:

- Closes when clicking a mobile link (auto-navigation)
- Closes when pressing the Escape key
- Uses CDK overlay for proper z-index stacking and portal rendering
- Slides in from the top below the navbar
- Animates smoothly with CSS transitions
- State is managed by the provider and shared across all components

**Icons**: The mobile trigger uses content projection for icons, allowing consumers to provide their own icons (e.g., hamburger menu when closed, X when open) via the `isMobileMenuOpen()` signal accessible through template references.

## Custom Styling

All components accept a `class` input for custom styles:

```html
<nav sc-navbar class="sticky top-0 z-50">
  <a sc-navbar-brand class="text-primary">Brand</a>
  <nav sc-navigation-menu>
    <!-- navigation menu items -->
  </nav>
</nav>
```

### Customizing Mobile Menu

The mobile menu container can be styled directly using the `class` input:

```html
<div sc-navbar-mobile-portal>
  <div sc-navbar-mobile-menu class="bg-red-500 p-8">
    <!-- Custom background and padding -->
  </div>
</div>
```

## Inputs

### ScNavbarProvider

| Input   | Type      | Default | Description                           |
| ------- | --------- | ------- | ------------------------------------- |
| `class` | `string`  | `''`    | Additional CSS classes                |
| `open`  | `boolean` | `false` | Two-way binding for mobile menu state |

### ScNavbar

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNavbarMobileMenu

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNavbarMobileTrigger

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Export As:** `scNavbarMobileTrigger`

**Public Properties (via template reference):**

| Property           | Type              | Description                 |
| ------------------ | ----------------- | --------------------------- |
| `isMobileMenuOpen` | `Signal<boolean>` | Whether mobile menu is open |

**Usage:** Use a template reference variable with `#trigger="scNavbarMobileTrigger"` to access the `isMobileMenuOpen()` signal for conditional icon rendering.

### ScNavbarMobileLink

| Input    | Type      | Default | Description                          |
| -------- | --------- | ------- | ------------------------------------ |
| `class`  | `string`  | `''`    | Additional CSS classes               |
| `active` | `boolean` | `false` | Whether the link is currently active |

## CSS Variables

The navbar uses the following CSS variable for positioning:

| Variable          | Default | Description                                           |
| ----------------- | ------- | ----------------------------------------------------- |
| `--navbar-height` | `57px`  | Height of the navbar, used to position mobile content |

## Accessibility

- Uses semantic `<nav>` element
- Mobile trigger includes `aria-expanded` and `aria-controls` attributes
- Mobile menu has `role="navigation"` and `aria-label="Mobile navigation"`
- Screen reader text for hamburger icon state changes
- Uses `inert` attribute to prevent focus on hidden mobile content
- Overlay is marked with `aria-hidden="true"`
- All interactive elements have visible focus indicators
