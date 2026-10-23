# Navbar Mobile Menu Architecture

## Overview

The navbar mobile menu opens and closes on one `open` signal; Angular's `animate.enter` / `animate.leave` play its animations (see "Opening and closing"). Similar to popover, it has **no backdrop** and uses CDK Overlay with flexible positioning for the mobile navigation menu.

**Navbar Mobile Menu-Specific Features:**

- Uses CDK Overlay with flexible positioning relative to navbar
- No backdrop (mobile menu slides from top)
- Positioned dynamically below the navbar
- Slide animations from top (300ms)
- Auto-closes on navigation events (route changes)

## Component Structure

```
ScNavbarProvider (Root State Manager)
└── ScNavbar (Navbar Container - provides overlay origin)
└── ScNavbarMobilePortal (CDK Overlay Manager)
    └── ScNavbarMobileMenu (Mobile Menu Content)
        ├── ScNavbarMobileLink
        └── ScNavbarActions

Plus: ScNavbarMobileTrigger (Hamburger menu button)
```

## Opening and closing

`open` on `ScNavbarProvider` is the only state. The consumer writes the menu in an `ng-template`:

```html
<ng-template scNavbarMobilePortal>
  <div scNavbarMobileMenu aria-label="Mobile navigation">…</div>
</ng-template>
```

`ScNavbarMobilePortal` attaches that template to a CDK overlay under the navbar while `open` is true, and detaches it when it turns false. `ScNavbarMobileMenu` declares its animations with Angular's `animate.enter` / `animate.leave` (fade, and a slide from the top), so on close Angular keeps the menu until its leave animation has ended, then removes it. It also traps focus (`scFocusTrap`, as a host directive).

The menu is a template, not projected content (`<ng-content>`), because Angular only plays `animate.leave` on elements whose own view is destroyed: projected content is moved out of the overlay, not destroyed, and would vanish without its exit animation.

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Menu receives tabindex="-1" for programmatic focus
2. **ARIA Attributes:** `role="navigation"`, `aria-label="Mobile navigation"`
3. **Screen Readers:** Announce menu immediately (not after animation)
4. **Keyboard:** Escape key works during animations to trigger close
5. **Navigation:** Auto-closes on route changes for better UX
6. **Reduced Motion:** the library stylesheet keeps the fades and drops the movement (slide, zoom) under `prefers-reduced-motion: reduce`
