# Hover Card Architecture

## Overview

The hover card component uses a composable architecture pattern with four main components working together to provide smooth animations and flexible positioning.

## Component Structure

```
ScHoverCardProvider (Root Container)
├── ScHoverCardTrigger (Directive)
└── ScHoverCardPortal (ng-template directive)
    └── ScHoverCard (Content)
```

### 1. ScHoverCardProvider (`hover-card-provider.ts`)

**Role:** Root component that manages state, coordinates child components, and handles overlay positioning.

**Key Responsibilities:**

- Manages hover card visibility state
- Provides configuration (side, align, delays)
- Exposes trigger origin for positioning
- Uses CDK `ConnectedOverlay` for positioning
- Maps `side` + `align` to 12 positioning configurations
- Renders portal content via `ngTemplateOutlet`

**Important Signals:**

```typescript
open: Signal<boolean>; // shown or not (the overlay is attached while true)
```

### 2. ScHoverCardTrigger (`hover-card-trigger.ts`)

**Role:** Directive that marks the trigger element and handles user interactions.

**Key Responsibilities:**

- Provides `CdkOverlayOrigin` for positioning
- Handles mouse/keyboard events (hover, focus)
- Manages open/close delays
- Exposes trigger element reference to provider

### 3. ScHoverCardPortal (`hover-card-portal.ts`)

**Role:** Simple directive on `ng-template` that captures a `TemplateRef` for portal content.

**Key Responsibilities:**

- Captures `TemplateRef` of the `ng-template` it's placed on
- Provider queries it via `contentChild` and renders it using `ngTemplateOutlet`

### 4. ScHoverCard (`hover-card.ts`)

**Role:** The actual content component with animations.

**Key Responsibilities:**

- Renders hover card content
- Animates in and out with `animate.enter` / `animate.leave` (see "Opening and closing")
- Its `data-side` sets the direction it slides from

## Opening and closing

`open` on `ScHoverCardProvider` is the only state. While it is true the overlay is attached (a connected overlay next to its trigger); when it turns false the overlay is detached.

The animated parts — `scHoverCard` (fade and zoom, from the side it opens on) — declare their own animations with Angular's `animate.enter` / `animate.leave`:

```ts
host: {
  'animate.enter': 'animate-in …',  // added when it is shown, removed once played
  'animate.leave': 'animate-out …', // added when it goes; Angular removes it once played
}
```

So on close Angular keeps each part in the page until its leave animation has ended, then removes it — in that same frame. The CDK waits for the overlay's pane to empty before tidying up, so nothing cuts the animation short. There is no flag for "still in the DOM", no counter of finished animations and no `animationend` handler.

Why not the old way (a second, "physical" open state, set to false from `animationend`): when an exit animation ends the element snaps back to its visible style, and removing it then took a change detection run. With zoneless Angular that run came a frame late, and the hover card was painted fully visible once more before it went.

Where it slides or zooms from and to is set by plain classes (`slide-in-from-*`, `slide-out-to-*`, `zoom-*`): they only set the variables `animate-in` / `animate-out` read, so they can stay on the element all the time.

## Positioning System

The provider supports 12 position combinations:

**Sides:** `top` | `right` | `bottom` | `left`
**Alignments:** `start` | `center` | `end`

Each combination maps to a `ConnectedPosition` with:

- Origin anchor points (where to attach to trigger)
- Overlay anchor points (where to attach overlay)
- Offsets (4px spacing)

Example:

```typescript
'bottom-center': {
  originX: 'center',    // Center of trigger
  originY: 'bottom',    // Bottom edge of trigger
  overlayX: 'center',   // Center of overlay
  overlayY: 'top',      // Top edge of overlay
  offsetY: 4,           // 4px gap
}
```

## Usage Example

```html
<div scHoverCardProvider side="bottom" align="center">
  <button scHoverCardTrigger>Hover me</button>

  <ng-template scHoverCardPortal>
    <div scHoverCard>This is the hover card content!</div>
  </ng-template>
</div>
```
