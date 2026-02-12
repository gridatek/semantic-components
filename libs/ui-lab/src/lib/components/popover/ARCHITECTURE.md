# Popover Architecture

## Overview

The popover component uses a simplified two-signal architecture pattern to ensure smooth animations before DOM cleanup. Unlike dialog/sheet/drawer components, popover has **no backdrop** and uses `cdkConnectedOverlay` for positioning relative to a trigger element.

**Popover-Specific Features:**

- Uses `cdkConnectedOverlay` directive for trigger-relative positioning
- No backdrop (closes on outside click via `overlayOutsideClick`)
- Positioned dynamically based on `side` and `align` inputs
- Lightweight fade + zoom animations (200ms)

## Component Structure

```
ScPopoverProvider (Root State Manager)
└── ScPopoverTrigger (Trigger Element - provides CdkOverlayOrigin)
└── ScPopoverPortal (CDK Connected Overlay Manager)
    └── ScPopover (Popover Content - positioned relative to trigger)
        └── ScPopoverClose (Optional)
```

## The Two-Signal Pattern

Since popover has no backdrop, we only need to coordinate **one animation** (the popover itself). This simplifies the pattern to just two signals.

### Signal 1: `open` (Logical State)

**Purpose:** Controls what the popover _should_ be doing

```typescript
// In ScPopoverProvider
readonly open = model<boolean>(false);
```

**Responsibilities:**

- Represents user intent ("should the popover be visible?")
- Triggers animation state changes
- When `true`: Triggers entry animation
- When `false`: Triggers exit animation

### Signal 2: `overlayOpen` (Physical State)

**Purpose:** Controls whether DOM exists via `cdkConnectedOverlayOpen`

```typescript
// In ScPopoverProvider
readonly overlayOpen = signal<boolean>(false);
```

**Responsibilities:**

- Controls CDK connected overlay attachment/detachment
- Stays `true` during close animation (critical!)
- Only becomes `false` after animation completes
- Ensures animation can play before DOM removal
- Bound to `[cdkConnectedOverlayOpen]` in the portal template

### Why Both Are Needed

**The Problem:**

CDK connected overlay's lifecycle is tied to the `cdkConnectedOverlayOpen` input:

```typescript
// ❌ This doesn't work:
<ng-template [cdkConnectedOverlayOpen]="open()">
  <!-- Content appears/disappears instantly -->
  <!-- No time for close animation to play! -->
</ng-template>
```

**The Solution:**

Separate signals allow animation completion:

```typescript
// ✅ This works:
<ng-template [cdkConnectedOverlayOpen]="overlayOpen()">
  <!-- Physical state - removed AFTER animation -->
</ng-template>

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

Unlike dialog/sheet/drawer, popover has only **one animated element**:

1. **Popover Content** (200ms fade + zoom)
   - Zoom + Fade effects
   - Managed by Tailwind animate classes
   - Completion detected via `animationend` event
   - No backdrop to coordinate with

### Popover Content Animations

Applied via Tailwind classes in `popover.ts`:

```typescript
protected readonly class = computed(() =>
  cn(
    // Base styles
    'bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none',

    // Entry animation (fade + zoom in)
    'animate-in fade-in-0 zoom-in-95 duration-200',

    // Exit animation (triggered by data-state="closed")
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95',
    'data-[state=closed]:duration-200',
  ),
);
```

**Animation Flow:**

1. `state` signal changes from `'open'` to `'closed'`
2. `data-state` attribute updates to `"closed"`
3. Tailwind applies exit animation classes
4. Animation plays for 200ms
5. `animationend` event fires
6. Provider sets `overlayOpen = false`
7. CDK removes the overlay from DOM

**Why Shorter Duration (200ms vs 300ms)?**

Popovers are lightweight UI elements that should appear/disappear quickly. The shorter 200ms duration makes them feel more responsive while still providing smooth visual feedback.

## Complete Animation Timeline

### Opening Sequence

```
User clicks trigger:
│
├─ t=0ms: Trigger calls open.set(true)
│  │
│  └─ Provider effect:
│     └─ overlayOpen.set(true)  ← Effect responds immediately
│        └─ cdkConnectedOverlayOpen becomes true
│           └─ CDK attaches connected overlay  ← DOM mounted
│
├─ t=0ms: Popover effect (triggered by open):
│  └─ state.set('open')
│     └─ data-state="open" → Entry animation starts
│        ├─ fade-in-0
│        ├─ zoom-in-95
│        └─ duration-200
│
├─ t=0-200ms: Animation plays
│
└─ t=200ms: Animation complete, popover visible
```

### Closing Sequence

```
User clicks outside/presses Escape/clicks close button:
│
├─ t=0ms: Portal calls open.set(false)
│  │
│  └─ Popover effect (triggered by open):
│     └─ state.set('closed')  ← Triggers animation
│        └─ data-state="closed" → Exit animation starts
│           ├─ animate-out
│           ├─ fade-out-0
│           ├─ zoom-out-95
│           └─ duration-200
│
├─ IMPORTANT: overlayOpen is STILL true!
│  └─ DOM remains mounted so animation can play
│  └─ cdkConnectedOverlayOpen still true
│
├─ t=0-200ms: Animation plays
│
├─ t=~200ms: Popover animation completes
│  └─ onAnimationEnd(event) fires
│     └─ if (state === 'closed' && target === element):
│        └─ provider.onPopoverAnimationComplete()
│           └─ overlayOpen.set(false)  ← Cleanup triggered!
│
└─ t=~200ms: cdkConnectedOverlayOpen becomes false
   └─ CDK detaches overlay  ← DOM removed cleanly after animation
```

## No Backdrop Coordination

Unlike dialog/sheet/drawer, popover doesn't need to coordinate multiple animations:

- ❌ No backdrop animation
- ❌ No `animationsCompleted` counter
- ✅ Single animation to track (popover itself)
- ✅ Simpler cleanup logic

```typescript
// Popover (simplified - no counter needed)
onPopoverAnimationComplete(): void {
  if (!this.open()) {
    this.overlayOpen.set(false);  // Direct cleanup
  }
}
```

Compare with dialog/sheet/drawer:

```typescript
// Dialog/Sheet/Drawer (complex - counter needed)
onDialogAnimationComplete(): void {
  if (!this.open()) {
    this.animationsCompleted.update(n => n + 1);  // Increment counter
  }
}

onBackdropAnimationComplete(): void {
  if (!this.open()) {
    this.animationsCompleted.update(n => n + 1);  // Wait for both
  }
}
```

## State Synchronization

### Provider Constructor Effects

```typescript
constructor() {
  // Effect: Sync overlayOpen with open for OPENING
  effect(() => {
    if (this.open()) {
      // Opening: Mount DOM immediately so animation can start
      this.overlayOpen.set(true);
    }
    // Note: When closing (open = false), overlayOpen stays true
    // until animation completes (handled by onPopoverAnimationComplete)
  });
}
```

**Why no second effect?**

Unlike dialog/sheet/drawer, popover doesn't need a second effect to check animation counter completion. Instead, `onPopoverAnimationComplete()` directly sets `overlayOpen = false`.

### Popover Constructor Effects

```typescript
constructor() {
  // Effect: Sync animation state with logical state
  effect(() => {
    const isOpen = this.popover.open();
    this.state.set(isOpen ? 'open' : 'closed');
  });
}
```

### Portal Template Binding

```typescript
// Portal template
<ng-template
  [cdkConnectedOverlayOpen]="popover.overlayOpen()"
  [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
  [cdkConnectedOverlayPositions]="[position()]"
  (overlayOutsideClick)="closePopover()"
  (overlayKeydown)="onKeydown($event)"
>
  <ng-content />
</ng-template>
```

**Key Binding:**

- `[cdkConnectedOverlayOpen]="popover.overlayOpen()"` - Uses **physical state**, not logical state
- This delays DOM removal until animation completes

## Animation Completion Handling

### Popover Component

```typescript
protected onAnimationEnd(event: AnimationEvent): void {
  // Only trigger cleanup when close animation completes
  if (
    this.state() === 'closed' &&
    event.target === this.elementRef.nativeElement
  ) {
    this.popover.onPopoverAnimationComplete();
  }
}
```

**Why check `event.target`?**

- `animationend` bubbles from child elements
- We only care about the popover's own animation
- Prevents false triggers from child element animations

### Provider Component

```typescript
/**
 * Called by popover when its close animation completes
 */
onPopoverAnimationComplete(): void {
  if (!this.open()) {
    this.overlayOpen.set(false);  // Direct cleanup (no counter)
  }
}
```

**Why check `!this.open()` before setting?**

- User might have reopened popover during close animation
- Guards against race conditions
- Example: User clicks outside (close starts), then immediately clicks trigger again (reopens)
- Without this check, overlayOpen would incorrectly be set to false for the new open cycle

## Comparison: Popover vs Dialog/Sheet/Drawer

### Similarities

Both use the two-signal pattern:

- ✅ Logical state (`open`) drives animations
- ✅ Physical state (`overlayOpen`) controls DOM lifecycle
- ✅ Event-driven animation completion
- ✅ Guard pattern to prevent race conditions

### Differences

| Feature           | Popover                                | Dialog/Sheet/Drawer     |
| ----------------- | -------------------------------------- | ----------------------- |
| **Backdrop**      | ❌ None                                | ✅ ScBackdrop component |
| **Positioning**   | Trigger-relative (cdkConnectedOverlay) | Global (Overlay.create) |
| **Animations**    | 1 (popover only)                       | 2 (content + backdrop)  |
| **Coordination**  | Direct cleanup                         | Signal counter          |
| **Duration**      | 200ms                                  | 300ms                   |
| **Outside Click** | overlayOutsideClick                    | backdropClick           |

## Key Design Decisions

### 1. Separation of Concerns

**Decision:** Split logical state (`open`) from physical state (`overlayOpen`)

**Why:**

- Logical state drives animations
- Physical state drives DOM lifecycle (via cdkConnectedOverlayOpen)
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
- Same guard pattern as dialog/sheet/drawer for consistency

### 4. Effect-Based Reactivity

**Decision:** Use Angular effects instead of manual subscriptions

**Why:**

- Automatic cleanup on component destruction
- Declarative: describes "what" not "how"
- Runs automatically when dependencies change
- Easier to reason about than imperative code

### 5. Shorter Animation Duration

**Decision:** Use 200ms instead of 300ms for animations

**Why:**

- Popovers are lightweight, ephemeral UI elements
- Should feel snappy and responsive
- Still long enough for smooth visual feedback
- Consistent with typical popover/tooltip timing

## Animation Classes Reference

### Popover Content Classes

```typescript
// Entry animation
'animate-in fade-in-0 zoom-in-95 duration-200';

// Exit animation (via data-state="closed")
'data-[state=closed]:animate-out';
'data-[state=closed]:fade-out-0';
'data-[state=closed]:zoom-out-95';
'data-[state=closed]:duration-200';
```

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Popover receives tabindex="-1" for programmatic focus
2. **ARIA Attributes:** `role="dialog"` set before animations start
3. **Screen Readers:** Announce popover immediately (not after animation)
4. **Keyboard:** Escape key works during animations to trigger close
5. **Outside Click:** Click outside works during animations to trigger close
6. **Reduced Motion:** Could add `@media (prefers-reduced-motion)` support

## Performance Considerations

### Efficient Rendering

- Uses `ChangeDetectionStrategy.OnPush` everywhere
- Effects only run when dependencies change
- No manual subscriptions to manage
- CDK handles overlay lifecycle efficiently

### Animation Performance

- CSS animations (GPU accelerated)
- Opacity and transform (composited properties)
- No layout thrashing
- Minimal JavaScript during animation

### Memory Management

- Effects auto-cleanup on destroy
- No timeout leaks (event-driven approach)
- CDK detaches overlay after use
- No memory leaks

## Connected Overlay Benefits

Using `cdkConnectedOverlay` provides:

1. **Automatic Positioning**: Positions relative to trigger with collision detection
2. **Flexible Alignment**: Configure side (top/right/bottom/left) and align (start/center/end)
3. **Scroll Handling**: Repositions on scroll automatically
4. **Viewport Constraints**: Stays within viewport bounds
5. **Direction Detection**: Can flip to opposite side if not enough space

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

4. **Custom Positioning:**
   - Support for custom ConnectedPosition configurations
   - Fine-grained offset control

5. **Hover Triggers:**
   - Support for hover-to-open (with delay)
   - Tooltip-like behavior option

## Testing Considerations

### What to Test

1. **State Transitions:**
   - open: false → true → false
   - overlayOpen follows correctly
   - state syncs with open

2. **Animation Timing:**
   - Animation plays for full duration (200ms)
   - DOM not removed early
   - Popover fades and zooms correctly

3. **Positioning:**
   - All side/align combinations work
   - Collision detection repositions correctly
   - Stays within viewport bounds

4. **Interaction:**
   - Outside click closes popover
   - Escape key closes popover
   - Trigger reopens after close

5. **Edge Cases:**
   - Rapid open/close
   - Open during close animation
   - Close during open animation

6. **Cleanup:**
   - No memory leaks
   - Effects unsubscribe
   - No hanging timeouts

### Testing Strategy

```typescript
// Example test structure
describe('Popover Animations', () => {
  it('should keep DOM mounted during close animation', async () => {
    // Open popover
    provider.open.set(true);
    fixture.detectChanges();

    // Close popover
    provider.open.set(false);
    fixture.detectChanges();

    // Immediately after close - overlayOpen should still be true
    expect(provider.overlayOpen()).toBe(true);

    // After animation completes - overlayOpen should be false
    await delay(300); // Buffer for 200ms animation
    expect(provider.overlayOpen()).toBe(false);
  });
});
```

## Summary

The popover animation architecture achieves smooth, reliable animations through:

1. **Two-signal pattern:** Separates intent (`open`) from DOM lifecycle (`overlayOpen`)
2. **Event-driven completion:** Popover explicitly signals when animation is done
3. **Direct cleanup:** No counter needed (only one animation)
4. **Reactive updates:** Effects respond to state changes automatically
5. **Robust timing:** No assumptions, handles browser variations
6. **CDK integration:** Works seamlessly with `cdkConnectedOverlay`

This architecture provides:

- ✅ Reliable animation completion detection
- ✅ Clean separation of concerns
- ✅ Simpler than multi-animation overlay components
- ✅ No race conditions or timing assumptions
- ✅ Debuggable signal-based state
- ✅ Better user experience (smooth, never cut off)
- ✅ Lightweight and performant (200ms animations)
