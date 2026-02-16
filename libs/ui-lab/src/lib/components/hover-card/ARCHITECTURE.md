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
- Coordinates animation timing with overlay lifecycle
- Exposes trigger origin for positioning
- Uses CDK `ConnectedOverlay` for positioning
- Maps `side` + `align` to 12 positioning configurations
- Renders portal content via `ngTemplateOutlet`

**Important Signals:**

```typescript
open: Signal<boolean>; // Logical state - "should this show?"
overlayOpen: Signal<boolean>; // Physical state - "is DOM mounted?"
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
- Manages animation state (`'open'` | `'closed'`)
- Applies animation classes based on state and side
- Notifies provider when animation completes

## State Management: The Two-Signal Pattern

### Why Two Signals?

The hover card uses **two separate signals** to handle animation timing correctly:

#### `open` - Logical State

- Represents the **intended** visibility
- Controls the animation state
- When `false`, triggers the close animation

#### `overlayOpen` - Physical State

- Controls whether content **exists in the DOM**
- Stays `true` during close animation
- Only becomes `false` after animation completes

### The Problem This Solves

CDK overlay's `cdkConnectedOverlayOpen` binding works like this:

- `true` → Content is mounted in DOM
- `false` → Content is **immediately removed** from DOM

If we used only one signal:

```typescript
// ❌ This doesn't work:
<cdkConnectedOverlay [cdkConnectedOverlayOpen]="open()">
  <!-- When open() becomes false, content vanishes instantly -->
  <!-- No animation plays because DOM is removed -->
</cdkConnectedOverlay>
```

With two signals:

```typescript
// ✅ This works:
<cdkConnectedOverlay [cdkConnectedOverlayOpen]="overlayOpen()">
  <!-- overlayOpen stays true during animation -->
  <!-- Animation plays while content is still in DOM -->
  <!-- After animation completes, overlayOpen becomes false -->
</cdkConnectedOverlay>
```

## Animation Flow

### Opening Sequence

1. **User hovers over trigger**

   ```
   ScHoverCardTrigger detects mouseenter
   → Schedules show after openDelay (700ms)
   → Calls provider.show()
   ```

2. **Provider opens**

   ```typescript
   show() {
     this.open.set(true);  // Effect also sets overlayOpen to true
   }
   ```

3. **Overlay renders**

   ```
   overlayOpen = true → CDK mounts content in DOM
   ```

4. **Animation plays**

   ```typescript
   // In ScHoverCard:
   effect(() => {
     const isOpen = this.hoverCardProvider.open();
     this.state.set(isOpen ? 'open' : 'closed');
   });

   // state = 'open' → data-open attribute set → Triggers entry animation:
   // - data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95
   // - data-[side=...]:slide-in-from-{direction}
   ```

### Closing Sequence

1. **User moves away from trigger**

   ```
   ScHoverCardTrigger detects mouseleave
   → Schedules hide after closeDelay (300ms)
   → Calls provider.hide()
   ```

2. **Provider hides (but overlay stays)**

   ```typescript
   hide() {
     this.open.set(false);
     // overlayOpen stays true! (critical for animation)
   }
   ```

3. **Close animation plays**

   ```typescript
   // In ScHoverCard:
   // state = 'closed' → data-closed attribute set → Triggers exit animation:
   // - data-closed:animate-out
   // - data-closed:fade-out-0
   // - data-closed:zoom-out-95
   ```

4. **Animation completes → DOM cleanup**

   ```typescript
   onAnimationEnd(event: AnimationEvent) {
     if (this.state() === 'closed' &&
         event.target === this.elementRef.nativeElement) {
       this.animationComplete.emit();
       this.hoverCardProvider.onAnimationComplete(); // ← Cleanup
     }
   }

   // In provider:
   onAnimationComplete() {
     this.overlayOpen.set(false); // NOW remove from DOM
   }
   ```

5. **Overlay removes content**
   ```
   overlayOpen = false → CDK removes content from DOM
   ```

## Timeline Diagram

```
User action: hover away
│
├─ t=0ms:    provider.hide()
│            ├─ open = false
│            └─ overlayOpen = true (stays mounted)
│
├─ t=0ms:    state = 'closed' (triggers animation)
│
├─ t=0-100ms: Animation plays
│             ├─ fade-out-0
│             ├─ zoom-out-95
│             └─ Content still visible!
│
├─ t=100ms:  onAnimationEnd fires
│            └─ provider.onAnimationComplete()
│               └─ overlayOpen = false
│
└─ t=100ms:  CDK removes content from DOM
```

## Animation Classes

Entry animations (applied via `data-open` attribute):

```css
data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 duration-100
```

Exit animations (applied via `data-closed` attribute):

```css
data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95
```

Directional slides (based on `data-side` attribute):

```css
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
```

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

## Key Design Patterns

### 1. Provider Pattern

The provider component manages shared state and configuration that child components can inject.

### 2. ng-template Portal Pattern

The portal is a lightweight directive on `ng-template` that captures a `TemplateRef`. The provider queries it via `contentChild` and renders it using `ngTemplateOutlet` inside the CDK overlay. This avoids extra DOM elements and allows clean separation of content from overlay logic.

### 3. Signal-based Reactivity

All state is managed through Angular signals for fine-grained reactivity.

### 4. Effect-based Synchronization

Effects automatically sync derived state (like animation state from open state).

### 5. Delayed Cleanup Pattern

Separating logical state from physical DOM state enables animations to complete before cleanup.

### 6. Composable Architecture

Each component has a single responsibility and can be composed together for flexible usage.

## Comparison to Tooltip

Both components share the same animation architecture:

| Aspect               | Tooltip                      | Hover Card                         |
| -------------------- | ---------------------------- | ---------------------------------- |
| **Manager**          | `TooltipManager` service     | `ScHoverCardProvider` component    |
| **Logical State**    | Internal to manager          | `provider.open` signal             |
| **Physical State**   | `overlayRef` lifecycle       | `provider.overlayOpen` signal      |
| **Animation Timing** | `animationComplete` output   | `animationComplete` output         |
| **Cleanup Trigger**  | Manager subscribes to output | Provider's `onAnimationComplete()` |
| **Architecture**     | Service + Component          | Composable components              |

The hover card uses a more modular component-based approach, while the tooltip uses a centralized service pattern.

## Usage Example

```html
<div sc-hover-card-provider side="bottom" align="center">
  <button sc-hover-card-trigger>Hover me</button>

  <ng-template scHoverCardPortal>
    <div sc-hover-card>This is the hover card content!</div>
  </ng-template>
</div>
```
