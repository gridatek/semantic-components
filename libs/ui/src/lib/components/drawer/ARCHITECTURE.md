# Drawer Architecture

## Overview

The drawer is a provider with parts. It opens and closes on one `open` signal; Angular's `animate.enter` / `animate.leave` play the parts' animations (see "Opening and closing").

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

## Opening and closing

`open` on `ScDrawerProvider` is the only state. While it is true the overlay is attached (with the backdrop and the focus trap); when it turns false the overlay is detached.

The animated parts — `scDrawer` (fade and slide from its `direction`) and the `scBackdrop` behind it (fade) — declare their own animations with Angular's `animate.enter` / `animate.leave`:

```ts
host: {
  'animate.enter': 'animate-in …',  // added when it is shown, removed once played
  'animate.leave': 'animate-out …', // added when it goes; Angular removes it once played
}
```

So on close Angular keeps each part in the page until its leave animation has ended, then removes it — in that same frame. The CDK waits for the overlay's pane to empty before tidying up, so nothing cuts the animation short. There is no flag for "still in the DOM", no counter of finished animations and no `animationend` handler.

Why not the old way (a second, "physical" open state, set to false from `animationend`): when an exit animation ends the element snaps back to its visible style, and removing it then took a change detection run. With zoneless Angular that run came a frame late, and the drawer was painted fully visible once more before it went.

Where it slides or zooms from and to is set by plain classes (`slide-in-from-*`, `slide-out-to-*`, `zoom-*`): they only set the variables `animate-in` / `animate-out` read, so they can stay on the element all the time.

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

### 3. Directive Pattern

**Decision:** Implement ScDrawer as a Directive instead of a Component

**Why:**

- More flexible: attaches behavior to existing elements
- Lighter weight: no additional wrapper element
- Composable: easy to combine with other directives
- Similar to how CDK components work
- Still supports animation coordination through host bindings

### 4. Directional Animation System

**Decision:** Use `direction` input to determine animation direction dynamically

**Why:**

- Single directive handles all four directions
- Animation classes computed based on direction
- Maintains consistency across all directions
- Easy to add new directions if needed

### 5. Backdrop + Escape Handling

**Decision:** Provider subscribes to CDK overlay's `backdropClick()` and `keydownEvents()` directly

**Why:**

- Provider owns the overlay, so it handles all overlay events directly
- No need for portal to forward events
- `backdropClick()` triggers `open.set(false)` on the provider
- `keydownEvents()` filters for Escape key and triggers `open.set(false)`
- Keeps event handling centralized in the lifecycle owner

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Drawer auto-focuses on mount via `scFocusTrap`, which gives focus back on close — unless it has moved on elsewhere
2. **ARIA Attributes:** Set before animations start (`role="dialog"`, `aria-modal="true"`)
3. **Screen Readers:** Announce drawer immediately (not after animation)
4. **Keyboard:** Escape key closes the drawer (via CDK overlay keydown events)
5. **Backdrop Click:** Click outside closes the drawer (via CDK overlay backdrop click)
6. **Reduced Motion:** Could add `@media (prefers-reduced-motion)` support
7. **Drawer Handle:** Optional visual indicator improves discoverability on mobile

## Consumer API

```html
<div scDrawerProvider direction="bottom" [(open)]="isOpen">
  <button scDrawerTrigger scButton>Open</button>
  <ng-template scDrawerPortal>
    <div scDrawer>
      <div scDrawerHandle></div>
      <div scDrawerHeader>
        <h2 scDrawerTitle>Title</h2>
        <p scDrawerDescription>Description</p>
      </div>
      <!-- content -->
      <div scDrawerFooter>
        <button scDrawerClose scButton>Close</button>
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

## Testing Considerations

### What to Test

1. **State Transitions:**
   - open: false -> true -> false
   - the overlay is attached while open, and its parts animate out before they go

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

    const drawer = fixture.debugElement.query(By.css('[scDrawer]'));
    expect(drawer.nativeElement.classList.contains('slide-in-from-left')).toBe(true);
  });
});
```
