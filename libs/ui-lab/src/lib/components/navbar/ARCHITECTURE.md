# Navbar Mobile Menu Architecture

## Overview

The navbar mobile menu uses a simplified two-signal architecture pattern to ensure smooth animations before DOM cleanup. Similar to popover, it has **no backdrop** and uses CDK Overlay with flexible positioning for the mobile navigation menu.

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

## The Two-Signal Pattern

Since navbar mobile menu has no backdrop, we only need to coordinate **one animation** (the menu itself). This simplifies the pattern to just two signals.

### Signal 1: `open` (Logical State)

**Purpose:** Controls what the mobile menu _should_ be doing

```typescript
// In ScNavbarProvider
readonly open = model<boolean>(false);
```

**Responsibilities:**

- Represents user intent ("should the menu be visible?")
- Triggers animation state changes
- When `true`: Triggers entry animation
- When `false`: Triggers exit animation
- Auto-closes on navigation events

### Signal 2: `overlayOpen` (Physical State)

**Purpose:** Controls whether DOM exists via overlay attachment

```typescript
// In ScNavbarProvider
readonly overlayOpen = signal<boolean>(false);
```

**Responsibilities:**

- Controls CDK overlay attachment/detachment
- Stays `true` during close animation (critical!)
- Only becomes `false` after animation completes
- Ensures animation can play before DOM removal

### Why Both Are Needed

**The Problem:**

CDK overlay's lifecycle is tied to manual attach/detach:

```typescript
// ❌ This doesn't work:
if (open()) {
  overlayRef.attach(portal);
} else {
  overlayRef.detach(); // DOM removed IMMEDIATELY
  // Animation never plays - element is gone!
}
```

**The Solution:**

Separate signals allow animation completion:

```typescript
// ✅ This works:
if (overlayOpen()) {
  // Physical state
  overlayRef.attach(portal); // DOM mounted
} else {
  overlayRef.detach(); // DOM removed AFTER animation
}

// Meanwhile, open() controls animations:
if (open()) {
  // Logical state
  state = 'open'; // Entry animation
} else {
  state = 'closed'; // Exit animation (DOM still mounted!)
}
```

## Animation Architecture

### Single Animated Layer

Like popover, navbar mobile menu has only **one animated element**:

1. **Mobile Menu Content** (300ms slide + fade)
   - Slide from top + Fade effects
   - Managed by Tailwind animate classes
   - Completion detected via `animationend` event
   - No backdrop to coordinate with

### Mobile Menu Content Animations

Applied via Tailwind classes in `navbar-mobile-menu.ts`:

```typescript
protected readonly class = computed(() =>
  cn(
    // Base styles
    'md:hidden',
    'fixed inset-x-0 top-[calc(var(--navbar-height,57px))] bottom-0',
    'z-50',
    'flex flex-col gap-2 p-6',
    'bg-background border-t border-border',

    // Entry animation (fade + slide from top)
    'animate-in fade-in-0 slide-in-from-top duration-300',

    // Exit animation (triggered by data-state="closed")
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:slide-out-to-top',
    'data-[state=closed]:duration-300',
  ),
);
```

**Animation Flow:**

1. `state` signal changes from `'open'` to `'closed'`
2. `data-state` attribute updates to `"closed"`
3. Tailwind applies exit animation classes
4. Animation plays for 300ms
5. `animationend` event fires
6. Provider sets `overlayOpen = false`
7. Portal detaches the overlay from DOM

**Why 300ms Duration?**

Mobile menus typically use standard animation timing (300ms) to provide smooth, natural transitions without feeling sluggish.

## Complete Animation Timeline

### Opening Sequence

```
User clicks hamburger trigger:
│
├─ t=0ms: Trigger calls open.set(true)
│  │
│  └─ Provider effect:
│     └─ overlayOpen.set(true)  ← Effect responds immediately
│        └─ Portal effect (triggered by overlayOpen):
│           └─ overlayRef.attach(portal)  ← DOM mounted
│
├─ t=0ms: Menu effect (triggered by open):
│  └─ state.set('open')
│     └─ data-state="open" → Entry animation starts
│        ├─ fade-in-0
│        ├─ slide-in-from-top
│        └─ duration-300
│
├─ t=0-300ms: Animation plays
│
└─ t=300ms: Animation complete, menu visible
```

### Closing Sequence

```
User clicks close button/navigates/presses Escape:
│
├─ t=0ms: Calls open.set(false)
│  │
│  └─ Menu effect (triggered by open):
│     └─ state.set('closed')  ← Triggers animation
│        └─ data-state="closed" → Exit animation starts
│           ├─ animate-out
│           ├─ fade-out-0
│           ├─ slide-out-to-top
│           └─ duration-300
│
├─ IMPORTANT: overlayOpen is STILL true!
│  └─ DOM remains mounted so animation can play
│
├─ t=0-300ms: Animation plays
│
├─ t=~300ms: Menu animation completes
│  └─ onAnimationEnd(event) fires
│     └─ if (state === 'closed' && target === element):
│        └─ provider.onMenuAnimationComplete()
│           └─ overlayOpen.set(false)  ← Cleanup triggered!
│
└─ t=~300ms: Portal effect (triggered by overlayOpen):
   └─ overlayRef.detach()  ← DOM removed cleanly after animation
```

## No Backdrop Coordination

Like popover, navbar mobile menu doesn't need to coordinate multiple animations:

- ❌ No backdrop animation
- ❌ No `animationsCompleted` counter
- ✅ Single animation to track (menu itself)
- ✅ Simpler cleanup logic

```typescript
// Navbar Mobile Menu (simplified - no counter needed)
onMenuAnimationComplete(): void {
  if (!this.open()) {
    this.overlayOpen.set(false);  // Direct cleanup
  }
}
```

## State Synchronization

### Provider Constructor Effects

```typescript
constructor() {
  // Close mobile menu on navigation
  this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      filter(() => this.open()),
      takeUntilDestroyed(),
    )
    .subscribe(() => this.open.set(false));

  // Synchronize overlay state with logical state for opening
  effect(() => {
    if (this.open()) {
      // Opening: Mount DOM immediately so animation can start
      this.overlayOpen.set(true);
    }
    // Note: When closing (open = false), overlayOpen stays true
    // until animation completes (handled by onMenuAnimationComplete)
  });
}
```

**Navigation Integration:**

The navbar mobile menu automatically closes when the user navigates to a new route, providing a better UX for mobile navigation.

### Mobile Menu Constructor Effects

```typescript
constructor() {
  // Effect: Sync animation state with logical state
  effect(() => {
    const isOpen = this.provider.open();
    this.state.set(isOpen ? 'open' : 'closed');
  });
}
```

### Portal Constructor Effects

```typescript
constructor() {
  // Effect: Control overlay attachment based on overlayOpen
  effect(() => {
    if (this.provider.overlayOpen()) {
      this.attachMenu();
    } else {
      this.detachMenu();
    }
  });
}
```

## Animation Completion Handling

### Mobile Menu Component

```typescript
protected onAnimationEnd(event: AnimationEvent): void {
  // Only trigger cleanup when close animation completes
  if (
    this.state() === 'closed' &&
    event.target === this.elementRef.nativeElement
  ) {
    this.provider.onMenuAnimationComplete();
  }
}
```

**Why check `event.target`?**

- `animationend` bubbles from child elements
- We only care about the menu's own animation
- Prevents false triggers from child element animations (links, buttons, etc.)

### Provider Component

```typescript
/**
 * Called by mobile menu when its close animation completes
 */
onMenuAnimationComplete(): void {
  if (!this.open()) {
    this.overlayOpen.set(false);  // Direct cleanup (no counter)
  }
}
```

**Why check `!this.open()` before setting?**

- User might have reopened menu during close animation
- Guards against race conditions
- Example: User clicks close (close starts), then immediately clicks hamburger again (reopens)
- Without this check, overlayOpen would incorrectly be set to false for the new open cycle

## Comparison: Old vs New Implementation

### Old Implementation (Timer-Based)

```typescript
// ❌ Problems:
private detachMenu(): void {
  if (this.overlayRef.hasAttached()) {
    this.detachTimer = setTimeout(() => {
      this.overlayRef.detach();
    }, 300); // Assumes animation takes exactly 300ms
  }
}
```

**Issues:**

1. Hardcoded timer with no actual animation completion detection
2. Browser rendering variations could cause timing differences
3. Animation might take longer or shorter
4. Race conditions if user reopens quickly
5. Memory leaks if timer not cleared properly

### New Implementation (Event-Driven)

```typescript
// ✅ Improvements:
onMenuAnimationComplete(): void {
  if (!this.open()) {
    this.overlayOpen.set(false);  // Waits for actual completion
  }
}
```

**Benefits:**

1. ✅ Event-driven (waits for actual animation end)
2. ✅ No timing assumptions
3. ✅ Handles browser rendering variations
4. ✅ Explicit completion signal
5. ✅ Guard pattern prevents race conditions
6. ✅ No manual timer cleanup needed

## Key Design Decisions

### 1. Separation of Concerns

**Decision:** Split logical state (`open`) from physical state (`overlayOpen`)

**Why:**

- Logical state drives animations
- Physical state drives DOM lifecycle
- Animation needs time to complete before DOM removal
- Clean separation makes flow easier to understand

### 2. Direct Cleanup (No Counter)

**Decision:** Set `overlayOpen = false` directly in animation complete handler

**Why:**

- Only one animation to track (no backdrop)
- No need for counter complexity
- Simpler code, easier to understand
- Still uses guard pattern for safety

### 3. Guard Pattern

**Decision:** Check `!open()` before setting `overlayOpen = false`

**Why:**

- User might reopen during close animation
- Prevents overlayOpen from being set to false during new open cycle
- Same guard pattern as other overlay components for consistency

### 4. Navigation Integration

**Decision:** Auto-close menu on route navigation

**Why:**

- Better mobile UX - menu shouldn't stay open after navigation
- Uses Angular Router events to detect navigation
- Automatically cleans up without manual intervention
- Common pattern in mobile navigation menus

### 5. Flexible Positioning

**Decision:** Update position strategy dynamically when origin becomes available

**Why:**

- Origin (navbar) might not be available immediately
- Effect watches for origin changes and updates position strategy
- Allows menu to position correctly below navbar
- Handles dynamic navbar height via CSS variable

## Animation Classes Reference

### Mobile Menu Content Classes

```typescript
// Entry animation
'animate-in fade-in-0 slide-in-from-top duration-300';

// Exit animation (via data-state="closed")
'data-[state=closed]:animate-out';
'data-[state=closed]:fade-out-0';
'data-[state=closed]:slide-out-to-top';
'data-[state=closed]:duration-300';
```

### Position Classes

```typescript
// Fixed positioning below navbar
'fixed inset-x-0 top-[calc(var(--navbar-height,57px))] bottom-0';
'z-50'; // Above navbar content
```

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Menu receives tabindex="-1" for programmatic focus
2. **ARIA Attributes:** `role="navigation"`, `aria-label="Mobile navigation"`
3. **Screen Readers:** Announce menu immediately (not after animation)
4. **Keyboard:** Escape key works during animations to trigger close
5. **Navigation:** Auto-closes on route changes for better UX
6. **Reduced Motion:** Could add `@media (prefers-reduced-motion)` support

## Performance Considerations

### Efficient Rendering

- Uses `ChangeDetectionStrategy.OnPush` everywhere
- Effects only run when dependencies change
- No manual subscriptions to manage (except router events with cleanup)
- Overlay reused across open/close cycles

### Animation Performance

- CSS animations (GPU accelerated)
- Opacity and transform (composited properties)
- No layout thrashing
- Minimal JavaScript during animation

### Memory Management

- Effects auto-cleanup on destroy
- No timeout leaks (event-driven approach)
- Router subscription cleaned up via `takeUntilDestroyed()`
- Overlay disposed on component destruction

## Future Enhancements

### Potential Improvements

1. **Variable Animation Durations:**
   - Input property for animation duration
   - Configurable timing for different use cases

2. **Animation Events:**
   - Output events for animation start/end
   - External components can react to animation state

3. **Reduced Motion Support:**
   - Detect `prefers-reduced-motion`
   - Instant show/hide if user prefers
   - Keep accessibility benefits

4. **Touch Gestures:**
   - Swipe down to close menu
   - Drag gesture support
   - Touch-friendly interactions

5. **Custom Positioning:**
   - Support for custom position strategies
   - Configurable offset and alignment

## Testing Considerations

### What to Test

1. **State Transitions:**
   - open: false → true → false
   - overlayOpen follows correctly
   - state syncs with open

2. **Animation Timing:**
   - Animation plays for full duration (300ms)
   - DOM not removed early
   - Menu slides and fades correctly

3. **Navigation Integration:**
   - Menu closes on route change
   - Only closes if currently open
   - Doesn't interfere with navigation

4. **Positioning:**
   - Positions correctly below navbar
   - Updates when navbar origin changes
   - Respects navbar height CSS variable

5. **Interaction:**
   - Escape key closes menu
   - Trigger reopens after close
   - Works during animation

6. **Edge Cases:**
   - Rapid open/close
   - Open during close animation
   - Close during open animation
   - Navigation during animation

7. **Cleanup:**
   - No memory leaks
   - Effects unsubscribe
   - Router subscription cleaned up

### Testing Strategy

```typescript
// Example test structure
describe('Navbar Mobile Menu Animations', () => {
  it('should keep DOM mounted during close animation', async () => {
    // Open menu
    provider.open.set(true);
    fixture.detectChanges();

    // Close menu
    provider.open.set(false);
    fixture.detectChanges();

    // Immediately after close - overlayOpen should still be true
    expect(provider.overlayOpen()).toBe(true);

    // After animation completes - overlayOpen should be false
    await delay(400); // Buffer for 300ms animation
    expect(provider.overlayOpen()).toBe(false);
  });

  it('should close menu on navigation', () => {
    provider.open.set(true);
    fixture.detectChanges();

    // Trigger navigation
    router.navigateByUrl('/new-route');
    fixture.detectChanges();

    expect(provider.open()).toBe(false);
  });
});
```

## Summary

The navbar mobile menu animation architecture achieves smooth, reliable animations through:

1. **Two-signal pattern:** Separates intent (`open`) from DOM lifecycle (`overlayOpen`)
2. **Event-driven completion:** Menu explicitly signals when animation is done
3. **Direct cleanup:** No counter needed (only one animation)
4. **Reactive updates:** Effects respond to state changes automatically
5. **Robust timing:** No assumptions, handles browser variations
6. **Navigation integration:** Auto-closes on route changes for better UX

This architecture provides:

- ✅ Reliable animation completion detection
- ✅ Clean separation of concerns
- ✅ Simpler than multi-animation overlay components
- ✅ No race conditions or timing assumptions
- ✅ Debuggable signal-based state
- ✅ Better user experience (smooth, never cut off)
- ✅ Mobile-optimized (300ms animations, auto-close on nav)
