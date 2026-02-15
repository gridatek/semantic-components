# Drawer Architecture

## Overview

The drawer component uses a multi-signal architecture pattern to ensure smooth, complete animations before DOM cleanup. This document focuses on how animations are coordinated across the drawer content and backdrop using a signal counter to track completion of both animations.

**Drawer-Specific Features:**

- Uses directional slide animations (top, right, bottom, left) via `direction` input
- Implements `ScDrawer` as a **Directive** instead of a Component
- Often includes a handle indicator for mobile-friendly dragging affordance

## Component Structure

```
ScDrawerProvider (Root State Manager + CDK Overlay Manager)
├── ScDrawerTrigger (Opens drawer)
└── ng-template[scDrawerPortal] (Lazy content, portaled to CDK overlay)
    │
    Inside CDK Overlay (managed by Provider):
    ├── CDK Backdrop (Transparent - click blocking only)
    ├── ScBackdrop (Visual backdrop with animations)
    └── ScDrawer (Drawer Directive - slides from configured direction)
        ├── ScDrawerHandle (Optional drag indicator)
        ├── ScDrawerHeader
        │   └── ScDrawerTitle
        │   └── ScDrawerDescription
        └── ScDrawerFooter
            └── ScDrawerClose

Plus: ScDrawerTrigger (Opens drawer)
```

### ScDrawerPortal Directive

`ScDrawerPortal` is a structural directive on `ng-template` that marks the lazy content to be portaled into the CDK overlay. It holds a reference to the `TemplateRef` which the provider reads via `contentChild`.

```typescript
@Directive({
  selector: 'ng-template[scDrawerPortal]',
})
export class ScDrawerPortal {
  readonly templateRef = inject(TemplateRef);
}
```

The provider queries it and projects the template into the overlay:

```typescript
// In ScDrawerProvider
protected readonly drawerPortal = contentChild.required(ScDrawerPortal);

// In provider's overlay template
<ng-container [ngTemplateOutlet]="drawerPortal().templateRef" />
```

### Why a Directive?

- **Explicit**: A bare `<ng-template>` is ambiguous; `scDrawerPortal` communicates intent
- **Lazy**: Content inside `ng-template` is not instantiated until the provider stamps it
- **Provider owns lifecycle**: The provider decides _when_ to stamp the template (on open)
- **DI preserved**: Using `TemplatePortal(overlayTemplate, viewContainerRef)` with the provider's own `ViewContainerRef` keeps the injector chain intact -- `ScDrawer` can inject `ScDrawerProvider`

## The Multi-Signal Pattern

The core of the animation architecture is the separation of **logical state** from **physical state**, with a **coordination signal** to track animation completions.

### Signal 1: `open` (Logical State)

**Purpose:** Controls what the drawer _should_ be doing

```typescript
// In ScDrawerProvider
readonly open = model<boolean>(false);
```

**Responsibilities:**

- Represents user intent ("should the drawer be visible?")
- Triggers animation state changes
- When `true`: Triggers entry animations
- When `false`: Triggers exit animations

### Signal 2: `overlayOpen` (Physical State)

**Purpose:** Controls whether DOM exists

```typescript
// In ScDrawerProvider
readonly overlayOpen = signal<boolean>(false);
```

**Responsibilities:**

- Controls CDK overlay attachment/detachment
- Stays `true` during close animations (critical!)
- Only becomes `false` after animations complete
- Ensures animations can play before DOM removal

### Signal 3: `animationsCompleted` (Animation Coordination)

**Purpose:** Tracks completion of multiple animations

```typescript
// In ScDrawerProvider (private)
private readonly animationsCompleted = signal<number>(0);
```

**Responsibilities:**

- Counts completed animations during close sequence
- Target count: 2 (drawer + backdrop)
- Resets to 0 when opening (for next cycle)
- Triggers overlay closure when target reached

### Why Both Are Needed

**The Problem:**

CDK overlay's lifecycle is tied to DOM presence:

```typescript
// This doesn't work:
if (open()) {
  overlayRef.attach(portal); // DOM mounted
} else {
  overlayRef.detach(); // DOM removed IMMEDIATELY
  // Animation never plays - element is gone!
}
```

**The Solution:**

Separate signals allow animation completion:

```typescript
// This works:
if (overlayOpen()) {
  // Physical state
  overlayRef.attach(portal); // DOM mounted
} else {
  overlayRef.detach(); // DOM removed AFTER animations
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

### Three Layers (Separated by Concern)

1. **CDK Backdrop** (Transparent - No Animation)
   - Class: `cdk-overlay-transparent-backdrop`
   - Purpose: Click blocking and scroll prevention
   - Functional layer only, no visual styling

2. **ScBackdrop Component** (300ms fade animation)
   - Reusable component from `components/backdrop`
   - Fade effect via Tailwind animate classes
   - Positioned with `-z-10` (behind drawer)
   - Emits `animationComplete` output when close animation finishes

3. **Drawer Content Animation** (300ms directional slide)
   - Slide animations from configured direction (top/right/bottom/left)
   - Managed by Tailwind animate classes
   - Completion detected via `animationend` event (triggers cleanup)

### Synchronization

Both ScBackdrop and Drawer animations:

- Start simultaneously when `open` changes
- Use same duration (300ms)
- Respond to same `data-state` attribute
- Inside same overlay (removed together)

### Drawer Content Animations

Applied via Tailwind classes in `drawer.ts`:

```typescript
const directionAnimationClasses: Record<DrawerDirection, string> = {
  top: 'slide-in-from-top data-[state=closed]:slide-out-to-top',
  right: 'slide-in-from-right data-[state=closed]:slide-out-to-right',
  bottom: 'slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  left: 'slide-in-from-left data-[state=closed]:slide-out-to-left',
};

protected readonly class = computed(() => {
  const direction = this.drawer.direction();

  return cn(
    // Base styles
    'fixed z-50 flex flex-col bg-background',
    directionBaseClasses[direction],

    // Entry animation (fade + slide)
    'animate-in fade-in-0 duration-300',
    directionAnimationClasses[direction],

    // Exit animation (triggered by data-state="closed")
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:duration-300',
  );
});
```

**Animation Flow:**

1. `state` signal changes from `'open'` to `'closed'`
2. `data-state` attribute updates to `"closed"`
3. Tailwind applies exit animation classes (fade + slide to configured direction)
4. Animation plays for 300ms
5. `animationend` event fires

**Directional Slide Animations:**

The drawer uses different slide directions based on the `direction` input:

- **top**: Slides in from top, slides out to top
- **right**: Slides in from right, slides out to right
- **bottom**: Slides in from bottom, slides out to bottom
- **left**: Slides in from left, slides out to left

Each direction uses Tailwind's directional slide utilities combined with fade for smooth entry/exit.

### ScBackdrop Component Animations

Managed via ScBackdrop component from `components/backdrop`:

```typescript
// In backdrop.ts
protected readonly class = computed(() =>
  cn(
    'fixed inset-0 -z-10 bg-black/10',
    'supports-backdrop-filter:backdrop-blur-xs',
    'animate-in fade-in-0 duration-300',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:duration-300',
  ),
);
```

**Animation Flow:**

1. Provider renders: `<div sc-backdrop [open]="open()" (animationComplete)="onBackdropAnimationComplete()"></div>`
2. ScBackdrop receives `open` input
3. Sets `data-state` based on `open` value
4. Tailwind applies appropriate animation classes
5. Animation plays for 300ms
6. On `animationend`, emits `animationComplete` output
7. Provider handles the event directly for coordination

**Why Separate Component?**

- Reusable across dialog, drawer, sheet, etc.
- Consistent animation pattern
- Single responsibility (visual layer only)
- CDK backdrop handles functionality separately

## Complete Animation Timeline

### Opening Sequence

```
User clicks trigger:
│
├─ t=0ms: Trigger calls open.set(true)
│  │
│  ├─ Provider effect 1:
│  │  ├─ overlayOpen.set(true)  <- Mount DOM immediately
│  │  └─ animationsCompleted.set(0)  <- Reset for next cycle
│  │
│  └─ Provider effect 3 (triggered by overlayOpen):
│     └─ attachDrawer()  <- CDK overlay attached
│        └─ TemplatePortal(overlayTemplate, viewContainerRef)
│           ├─ ScBackdrop rendered with [open]="open()"
│           └─ ng-template outlet stamps scDrawerPortal content
│
├─ t=0ms: CDK adds .cdk-overlay-backdrop-showing
│  └─ Backdrop: opacity 0 -> 1 (300ms)
│
├─ t=0ms: Drawer effect (triggered by open):
│  └─ state.set('open')
│     └─ data-state="open" -> Entry animation starts
│        ├─ fade-in-0
│        ├─ slide-in-from-{direction}
│        └─ duration-300
│
├─ t=0-300ms: Both animations play
│
└─ t=300ms: Animations complete, drawer visible
```

### Closing Sequence (Coordinated Completion)

```
User clicks close/backdrop/escape:
│
├─ t=0ms: Provider calls open.set(false)
│  │
│  ├─ Drawer effect (triggered by open):
│  │  └─ state.set('closed')  <- Triggers animation
│  │     └─ data-state="closed" -> Exit animation starts
│  │        ├─ animate-out
│  │        ├─ fade-out-0
│  │        ├─ slide-out-to-{direction}
│  │        └─ duration-300
│  │
│  └─ Backdrop receives [open]="false" input:
│     └─ state.set('closed')  <- Triggers backdrop animation
│        └─ data-state="closed" -> Backdrop fade-out (300ms)
│
├─ IMPORTANT: overlayOpen is STILL true!
│  └─ DOM remains mounted so animations can play
│  └─ animationsCompleted = 0 (waiting for both)
│
├─ t=0-300ms: Both animations play simultaneously
│
├─ t=~300ms: Drawer animation completes
│  └─ onAnimationEnd(event) fires
│     └─ if (state === 'closed' && target === element):
│        └─ provider.onDrawerAnimationComplete()
│           └─ animationsCompleted.update(n => n + 1)  <- Count = 1
│
├─ t=~300ms: Backdrop animation completes
│  └─ backdrop emits (animationComplete)
│     └─ provider.onBackdropAnimationComplete()
│        └─ animationsCompleted.update(n => n + 1)  <- Count = 2
│
├─ Provider effect 2 detects: animationsCompleted === 2 && !open()
│  └─ overlayOpen.set(false)  <- Cleanup triggered!
│  └─ animationsCompleted.set(0)  <- Reset for next cycle
│
└─ t=~300ms: Provider effect 3 (triggered by overlayOpen):
   └─ detachDrawer()  <- DOM removed cleanly after BOTH complete
```

## Why Track Both Animations?

**Question:** Why coordinate two separate animations instead of using a single timer?

**Answer:** Explicit animation tracking is more robust and event-driven:

### The Problem with Single Timers

```typescript
// Old approach - assumes both animations finish together
onDrawerAnimationComplete(): void {
  setTimeout(() => {
    this.overlayOpen.set(false);
  }, 300); // Hope backdrop finishes too!
}
```

**Issues:**

- Assumes backdrop takes exactly 300ms
- Browser rendering variations can cause timing differences
- Backdrop might take 305ms, getting cut off at 300ms
- No way to know if backdrop actually completed
- Might wait longer than necessary if backdrop finishes early

### The Solution: Signal Counter Pattern

```typescript
// New approach - explicitly track both completions
private readonly animationsCompleted = signal<number>(0);

onDrawerAnimationComplete(): void {
  this.animationsCompleted.update(n => n + 1); // Count = 1
}

onBackdropAnimationComplete(): void {
  this.animationsCompleted.update(n => n + 1); // Count = 2
}

effect(() => {
  if (this.animationsCompleted() === 2 && !this.open()) {
    this.overlayOpen.set(false); // Both confirmed complete!
  }
});
```

**Benefits:**

1. **Event-driven**: Waits for actual completion, not estimated time
2. **Robust**: Handles browser timing variations (300ms vs 305ms)
3. **Accurate**: Both animations explicitly signal completion
4. **Extensible**: Easy to add more animations (just increase target count)
5. **No race conditions**: Counter resets on open for clean cycles

## State Synchronization

### Provider Constructor Effects

```typescript
constructor() {
  // Effect 1: Sync overlayOpen with open for OPENING
  effect(() => {
    if (this.open()) {
      // Opening: Mount DOM immediately
      this.overlayOpen.set(true);
      // Reset counter for next close cycle
      this.animationsCompleted.set(0);
    }
    // Note: When closing, overlayOpen stays true!
    // It will be set to false by the coordination effect below
  });

  // Effect 2: Close overlay when both animations complete
  effect(() => {
    const completed = this.animationsCompleted();
    if (completed === 2 && !this.open()) {
      // Both animations confirmed complete
      this.overlayOpen.set(false);
      // Reset for next cycle
      this.animationsCompleted.set(0);
    }
  });

  // Effect 3: Attach/detach CDK overlay based on overlayOpen
  effect(() => {
    if (this.overlayOpen()) {
      this.attachDrawer();
    } else {
      this.detachDrawer();
    }
  });
}
```

### Provider Overlay Template

The provider's template includes the backdrop and focus trap, projecting the consumer's `scDrawerPortal` template via `ngTemplateOutlet`:

```html
<ng-content />
<ng-template #overlayTemplate>
  <div sc-backdrop [open]="open()" (animationComplete)="onBackdropAnimationComplete()"></div>
  <div cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
    <ng-container [ngTemplateOutlet]="drawerPortal().templateRef" />
  </div>
</ng-template>
```

### Drawer Directive Constructor Effects

```typescript
constructor() {
  // Effect: Sync animation state with logical state
  effect(() => {
    const isOpen = this.drawer.open();
    this.state.set(isOpen ? 'open' : 'closed');
  });
}
```

**Note:** Unlike dialog and sheet, drawer is a **Directive** not a Component, so it doesn't have its own template. It attaches behavior to a host element and relies on the host for focus management and content.

## Animation Completion Handling

### Drawer Directive

```typescript
protected onAnimationEnd(event: AnimationEvent): void {
  // Only trigger cleanup when close animation completes
  if (
    this.state() === 'closed' &&
    event.target === this.elementRef.nativeElement
  ) {
    this.drawer.onDrawerAnimationComplete();
  }
}
```

**Why check `event.target`?**

- `animationend` bubbles from child elements
- We only care about the drawer's own animation
- Prevents false triggers from child element animations

**Directive vs Component:**

Unlike the dialog and sheet components, drawer is a directive. This means:

- It enhances existing host elements instead of creating new ones
- Animation completion still works the same way via host binding
- `(animationend)` is bound in the host metadata
- Still requires ElementRef to check event.target

### Provider Component

The provider directly handles backdrop animation completion in its template -- no intermediary needed:

```html
<!-- In provider's overlay template -->
<div sc-backdrop [open]="open()" (animationComplete)="onBackdropAnimationComplete()"></div>
```

```typescript
// In ScDrawerProvider
onDrawerAnimationComplete(): void {
  if (!this.open()) {
    this.animationsCompleted.update(n => n + 1);
  }
}

onBackdropAnimationComplete(): void {
  if (!this.open()) {
    this.animationsCompleted.update(n => n + 1);
  }
}
```

**Why check `!this.open()` before incrementing?**

- User might have reopened drawer during close animation
- Prevents counter from incrementing during new open cycle
- Guards against race conditions
- Example: User clicks close (close starts), then immediately clicks trigger again (reopens)
- Without this check, the counter would incorrectly increment for the new cycle

**Why use `update()` instead of `set()`?**

- Increment is relative to current value
- Safe if multiple updates happen
- Immutable update pattern
- Consistent with Angular signals best practices

## Comparison: Evolution of Animation Coordination

### Approach 1: Single Timer (Previous Implementation)

```typescript
// Problems:
private async detachDrawerWithAnimation() {
  if (this.overlayRef.hasAttached()) {
    const backdrop = this.overlayRef.backdropElement;
    backdrop?.classList.add('sc-backdrop-hiding');

    // Wait arbitrary 300ms
    await firstValueFrom(timer(300));

    this.overlayRef.detach();  // Might cut off drawer animation!
  }
}
```

**Issues:**

1. Single hardcoded timer for all animations
2. No detection of actual animation completion
3. Drawer animation might take longer or shorter
4. Not coordinated with drawer state
5. No way to cancel if reopened

### Approach 2: Signal Counter (Current Implementation)

```typescript
// Both animations explicitly tracked:
private readonly animationsCompleted = signal<number>(0);

constructor() {
  // Effect 1: Open and reset
  effect(() => {
    if (this.open()) {
      this.overlayOpen.set(true);
      this.animationsCompleted.set(0);
    }
  });

  // Effect 2: Close when both complete
  effect(() => {
    if (this.animationsCompleted() === 2 && !this.open()) {
      this.overlayOpen.set(false);
      this.animationsCompleted.set(0);
    }
  });

  // Effect 3: Attach/detach CDK overlay
  effect(() => {
    if (this.overlayOpen()) {
      this.attachDrawer();
    } else {
      this.detachDrawer();
    }
  });
}

// Both animations signal completion
onDrawerAnimationComplete(): void {
  if (!this.open()) {
    this.animationsCompleted.update(n => n + 1);
  }
}

onBackdropAnimationComplete(): void {
  if (!this.open()) {
    this.animationsCompleted.update(n => n + 1);
  }
}
```

**Improvements:**

1. Both animations event-driven
2. No timing assumptions
3. Handles browser rendering variations
4. Explicit completion signals
5. Extensible (easy to add more animations)
6. Signal-based reactivity
7. Clean cycle management

## Key Design Decisions

### 1. Provider Owns Everything

**Decision:** `ScDrawerProvider` manages state, overlay lifecycle, backdrop, and focus trap

**Why:**

- Provider controls _when_ content appears (open state)
- Provider controls _where_ content appears (CDK overlay)
- Single component owns the full lifecycle -- no coordination between sibling components
- `ScDrawerPortal` directive just marks _what_ content to portal -- no logic

### 2. `display: contents` on Provider

**Decision:** Provider uses `display: contents` via Tailwind `contents` class to be invisible to CSS layout

**Why:**

- Provider is a `<div>` (required for CDK overlay's `ViewContainerRef`)
- But it shouldn't affect the consumer's layout
- `display: contents` makes the element's box disappear while keeping children in flow
- Consumer can place trigger and other content without layout interference

### 3. Separation of Logical and Physical State

**Decision:** Split logical state (`open`) from physical state (`overlayOpen`)

**Why:**

- Logical state drives animations
- Physical state drives DOM lifecycle
- Animations need time to complete before DOM removal
- Clean separation makes flow easier to understand

### 4. Signal Counter Pattern

**Decision:** Use signal counter to track multiple animation completions

**Why:**

- Both animations explicitly signal completion
- No timing assumptions or hardcoded delays
- Reactive: effect triggers when counter reaches target
- Extensible: easy to add more animations (increase target)
- Debuggable: counter value visible in Angular DevTools

### 5. Event-Driven Completion

**Decision:** Both drawer and backdrop emit completion events

**Why:**

- Precise: no guessing when animations finish
- Robust: handles browser timing variations
- Decoupled: backdrop component remains reusable
- Provider handles backdrop events directly in its own template
- No arbitrary timeouts or magic numbers

### 6. Guard Pattern for Counter Increments

**Decision:** Check `!open()` before incrementing animation counter

**Why:**

- Prevents counter increments during new open cycle
- User might reopen during close animation
- Without guard, counter would increment incorrectly for new cycle
- Example: Close starts -> drawer completes -> user reopens -> backdrop completes would incorrectly increment counter for new open
- Effect checks both counter AND `!open()` for safety

### 7. Effect-Based Reactivity

**Decision:** Use Angular effects instead of manual subscriptions

**Why:**

- Automatic cleanup on component destruction
- Declarative: describes "what" not "how"
- Runs automatically when dependencies change
- Easier to reason about than imperative code

### 8. Directive Pattern

**Decision:** Implement ScDrawer as a Directive instead of a Component

**Why:**

- More flexible: attaches behavior to existing elements
- Lighter weight: no additional wrapper element
- Composable: easy to combine with other directives
- Similar to how CDK components work
- Still supports animation coordination through host bindings

### 9. Directional Animation System

**Decision:** Use `direction` input to determine animation direction dynamically

**Why:**

- Single directive handles all four directions
- Animation classes computed based on direction
- Maintains consistency across all directions
- Easy to add new directions if needed

### 10. Backdrop + Escape Handling

**Decision:** Provider subscribes to CDK overlay's `backdropClick()` and `keydownEvents()` directly

**Why:**

- Provider owns the overlay, so it handles all overlay events directly
- No need for portal to forward events
- `backdropClick()` triggers `open.set(false)` on the provider
- `keydownEvents()` filters for Escape key and triggers `open.set(false)`
- Keeps event handling centralized in the lifecycle owner

## Animation Classes Reference

### Drawer Content Classes

```typescript
// Position classes (fixed to specific direction)
const directionBaseClasses: Record<DrawerDirection, string> = {
  top: 'inset-x-0 top-0 border-b rounded-b-[10px]',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  bottom: 'inset-x-0 bottom-0 border-t rounded-t-[10px]',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
};

// Directional animation classes
const directionAnimationClasses: Record<DrawerDirection, string> = {
  top: 'slide-in-from-top data-[state=closed]:slide-out-to-top',
  right: 'slide-in-from-right data-[state=closed]:slide-out-to-right',
  bottom: 'slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  left: 'slide-in-from-left data-[state=closed]:slide-out-to-left',
};

// Entry animation (fade + slide based on direction)
('animate-in fade-in-0 duration-300');
directionAnimationClasses[direction];

// Exit animation (via data-state="closed")
('data-[state=closed]:animate-out');
('data-[state=closed]:fade-out-0');
('data-[state=closed]:duration-300');
```

### Backdrop Classes

```typescript
// Entry animation
'animate-in fade-in-0 duration-300';

// Exit animation (via data-state="closed")
'data-[state=closed]:animate-out';
'data-[state=closed]:fade-out-0';
'data-[state=closed]:duration-300';
```

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Drawer auto-focuses on mount via `cdkTrapFocus` with `cdkTrapFocusAutoCapture`
2. **ARIA Attributes:** Set before animations start (`role="dialog"`, `aria-modal="true"`)
3. **Screen Readers:** Announce drawer immediately (not after animation)
4. **Keyboard:** Escape key closes the drawer (via CDK overlay keydown events)
5. **Backdrop Click:** Click outside closes the drawer (via CDK overlay backdrop click)
6. **Reduced Motion:** Could add `@media (prefers-reduced-motion)` support
7. **Drawer Handle:** Optional visual indicator improves discoverability on mobile

## Performance Considerations

### Efficient Rendering

- Uses `ChangeDetectionStrategy.OnPush` everywhere
- Effects only run when dependencies change
- No manual subscriptions to manage
- Single overlay instance reused
- Directive pattern adds minimal overhead

### Animation Performance

- CSS animations (GPU accelerated)
- Opacity and transform (composited properties)
- No layout thrashing
- Minimal JavaScript during animation

### Memory Management

- Effects auto-cleanup on destroy
- No timeout leaks (event-driven approach)
- Overlay detached after use
- No memory leaks

## Consumer API

```html
<div sc-drawer-provider direction="bottom" [(open)]="isOpen">
  <button sc-drawer-trigger sc-button>Open</button>
  <ng-template scDrawerPortal>
    <div sc-drawer>
      <div sc-drawer-handle></div>
      <div sc-drawer-header>
        <h2 sc-drawer-title>Title</h2>
        <p sc-drawer-description>Description</p>
      </div>
      <!-- content -->
      <div sc-drawer-footer>
        <button sc-drawer-close sc-button>Close</button>
      </div>
    </div>
  </ng-template>
</div>
```

**Key points:**

- `scDrawerPortal` on `ng-template` marks lazy content
- Content is only instantiated when drawer opens
- `ScDrawerPortal` must be imported in the consumer's `imports` array
- `[(open)]` provides two-way binding for programmatic control
- `direction` input on the provider controls slide direction

## Future Enhancements

### Potential Improvements

1. **Variable Animation Durations:**
   - Input property for animation duration
   - Provider passes duration to drawer and backdrop
   - Configurable timing for different use cases

2. **Animation Events:**
   - Output events for animation start/end
   - External components can react to animation state

3. **Reduced Motion Support:**
   - Detect `prefers-reduced-motion`
   - Instant show/hide if user prefers
   - Keep accessibility benefits

4. **Stacking Context:**
   - Support multiple overlapping drawers
   - z-index management
   - Close all vs close top

5. **Custom Animations:**
   - Allow custom animation classes via input
   - Support different animation styles per direction

6. **Drag-to-Close:**
   - Native touch/pointer gesture support
   - Threshold-based closing
   - Spring physics for natural feel

## Testing Considerations

### What to Test

1. **State Transitions:**
   - open: false -> true -> false
   - overlayOpen follows correctly
   - state syncs with open

2. **Animation Timing:**
   - Animations play for full duration
   - DOM not removed early
   - Backdrop fades correctly
   - Drawer slides in correct direction

3. **All Directions:**
   - Test each direction (top, right, bottom, left)
   - Verify correct slide direction
   - Ensure consistent timing across all directions

4. **Directive Behavior:**
   - Host element receives correct classes
   - Animation events fire on host
   - data-state attribute updates correctly

5. **Edge Cases:**
   - Rapid open/close
   - Open during close animation
   - Close during open animation
   - Changing direction while open

6. **Cleanup:**
   - No memory leaks
   - Effects unsubscribe
   - No hanging timeouts

### Testing Strategy

```typescript
// Example test structure
describe('Drawer Animations', () => {
  it('should keep DOM mounted during close animation', async () => {
    // Open drawer
    provider.open.set(true);
    fixture.detectChanges();

    // Close drawer
    provider.open.set(false);
    fixture.detectChanges();

    // Immediately after close - DOM should still exist
    expect(overlayRef.hasAttached()).toBe(true);

    // After animations complete - DOM should be removed
    await delay(400); // Buffer for 300ms animation
    expect(overlayRef.hasAttached()).toBe(false);
  });

  it('should slide from correct direction', () => {
    provider.direction.set('left');
    provider.open.set(true);
    fixture.detectChanges();

    const drawer = fixture.debugElement.query(By.css('[sc-drawer]'));
    expect(drawer.nativeElement.classList.contains('slide-in-from-left')).toBe(true);
  });
});
```

## Summary

The drawer animation architecture achieves smooth, reliable animations through:

1. **Two-signal pattern:** Separates intent (`open`) from DOM lifecycle (`overlayOpen`)
2. **Signal counter coordination:** Tracks completion of multiple animations (`animationsCompleted`)
3. **Event-driven completion:** Both drawer and backdrop explicitly signal when done
4. **Reactive updates:** Effects respond to state changes automatically
5. **Robust timing:** No assumptions, handles browser variations
6. **Centralized ownership:** Provider owns all lifecycle logic; portal directive is just a content marker
7. **Directional animations:** Dynamically applies correct slide direction based on `direction` input
8. **Directive pattern:** Lightweight, composable behavior attachment

This architecture provides:

- Reliable animation completion detection
- Clean separation of concerns
- Extensibility (easy to add more animations)
- No race conditions or timing assumptions
- Debuggable signal-based state
- Better user experience (smooth, never cut off)
- Flexible directional animations (top, right, bottom, left)
- Directive pattern for maximum flexibility
- Lazy content instantiation via `ng-template`
