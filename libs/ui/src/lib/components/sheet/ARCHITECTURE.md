# Sheet Architecture

## Overview

The sheet is a provider with parts. It opens and closes on one `open` signal; Angular's `animate.enter` / `animate.leave` play the parts' animations (see "Opening and closing").

**Sheet-Specific Feature:** Unlike dialog which uses zoom animations, sheets slide in from different sides (top, right, bottom, left) with directional slide animations.

## Component Structure

```
ScSheetProvider (Root State Manager + CDK Overlay Manager)
├── ScSheetTrigger (Opens sheet)
└── ng-template[scSheetPortal] (Lazy content, portaled to CDK overlay)
    │
    Inside CDK Overlay (managed by Provider):
    ├── CDK Backdrop (Transparent - click blocking only)
    ├── ScBackdrop (Visual backdrop with animations)
    └── ScSheet (Sheet Content - slides from configured side)
        ├── ScSheetHeader
        │   └── ScSheetTitle
        │   └── ScSheetDescription
        └── ScSheetFooter
            └── ScSheetClose
```

### ScSheetPortal Directive

`ScSheetPortal` is a structural directive on `ng-template` that marks the lazy content to be portaled into the CDK overlay. It holds a reference to the `TemplateRef` which the provider reads via `contentChild`.

```typescript
@Directive({
  selector: 'ng-template[scSheetPortal]',
})
export class ScSheetPortal {
  readonly templateRef = inject(TemplateRef);
}
```

The provider queries it and projects the template into the overlay:

```typescript
// In ScSheetProvider
protected readonly sheetPortal = contentChild.required(ScSheetPortal);

// In provider's overlay template
<ng-container [ngTemplateOutlet]="sheetPortal().templateRef" />
```

### Why a Directive?

- **Explicit**: A bare `<ng-template>` is ambiguous; `scSheetPortal` communicates intent
- **Lazy**: Content inside `ng-template` is not instantiated until the provider stamps it
- **Provider owns lifecycle**: The provider decides _when_ to stamp the template (on open)
- **DI preserved**: Using `TemplatePortal(overlayTemplate, viewContainerRef)` with the provider's own `ViewContainerRef` keeps the injector chain intact -- `ScSheet` can inject `ScSheetProvider`

## Opening and closing

`open` on `ScSheetProvider` is the only state. While it is true the overlay is attached (with the backdrop and the focus trap); when it turns false the overlay is detached.

The animated parts — `scSheet` (fade and slide from its `side`) and the `scBackdrop` behind it (fade) — declare their own animations with Angular's `animate.enter` / `animate.leave`:

```ts
host: {
  'animate.enter': 'animate-in …',  // added when it is shown, removed once played
  'animate.leave': 'animate-out …', // added when it goes; Angular removes it once played
}
```

So on close Angular keeps each part in the page until its leave animation has ended, then removes it — in that same frame. The CDK waits for the overlay's pane to empty before tidying up, so nothing cuts the animation short. There is no flag for "still in the DOM", no counter of finished animations and no `animationend` handler.

Why not the old way (a second, "physical" open state, set to false from `animationend`): when an exit animation ends the element snaps back to its visible style, and removing it then took a change detection run. With zoneless Angular that run came a frame late, and the sheet was painted fully visible once more before it went.

Where it slides or zooms from and to is set by plain classes (`slide-in-from-*`, `slide-out-to-*`, `zoom-*`): they only set the variables `animate-in` / `animate-out` read, so they can stay on the element all the time.

## Key Design Decisions

### 1. Provider Owns Everything

**Decision:** `ScSheetProvider` manages state, overlay lifecycle, backdrop, and focus trap

**Why:**

- Provider controls _when_ content appears (open state)
- Provider controls _where_ content appears (CDK overlay)
- Single component owns the full lifecycle -- no coordination between sibling components
- `ScSheetPortal` directive just marks _what_ content to portal -- no logic
- Backdrop click and Escape key are handled directly by the provider via CDK overlay events

### 2. `display: contents` on Provider

**Decision:** Provider uses `display: contents` (via Tailwind class) to be invisible to CSS layout

**Why:**

- Provider is a `<div>` (required for CDK overlay's `ViewContainerRef`)
- But it should not affect the consumer's layout
- `display: contents` makes the element's box disappear while keeping children in flow
- Consumer can place trigger and other content without layout interference

### 3. Directional Animation System

**Decision:** Use `side` input to determine animation direction dynamically

**Why:**

- Single component handles all four directions
- Animation classes computed based on side
- Maintains consistency across all directions
- Easy to add new sides if needed

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Sheet auto-focuses on mount via `scFocusTrap`, which gives focus back on close — unless it has moved on elsewhere
2. **ARIA Attributes:** Set before animations start (`role="dialog"`, `aria-modal="true"`)
3. **Screen Readers:** Announce sheet immediately (not after animation)
4. **Keyboard:** Escape key closes the sheet (via CDK overlay keydown events)
5. **Backdrop Click:** Click outside closes the sheet (via CDK overlay backdrop click)
6. **Reduced Motion:** Could add `@media (prefers-reduced-motion)` support

## Consumer API

```html
<div scSheetProvider [(open)]="isOpen" side="right">
  <button scSheetTrigger scButton>Open</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <button scSheetClose>...</button>
      <div scSheetHeader>
        <h2 scSheetTitle>Title</h2>
        <p scSheetDescription>Description</p>
      </div>
      <!-- content -->
      <div scSheetFooter>
        <button scButton>Save</button>
      </div>
    </div>
  </ng-template>
</div>
```

**Key points:**

- `scSheetPortal` on `ng-template` marks lazy content
- Content is only instantiated when sheet opens
- `ScSheetPortal` must be imported in the consumer's `imports` array
- `[(open)]` provides two-way binding for programmatic control

## Testing Considerations

### What to Test

1. **State Transitions:**
   - open: false -> true -> false
   - the overlay is attached while open, and its parts animate out before they go

2. **Animation Timing:**
   - Animations play for full duration
   - DOM not removed early
   - Backdrop fades correctly
   - Sheet slides in correct direction

3. **All Sides:**
   - Test each side (top, right, bottom, left)
   - Verify correct slide direction
   - Ensure consistent timing across all sides

4. **Edge Cases:**
   - Rapid open/close
   - Open during close animation
   - Close during open animation
   - Changing side while open

5. **Cleanup:**
   - No memory leaks
   - Effects unsubscribe
   - No hanging timeouts

### Testing Strategy

```typescript
// Example test structure
describe('Sheet Animations', () => {
  it('should keep DOM mounted during close animation', async () => {
    // Open sheet
    provider.open.set(true);
    fixture.detectChanges();

    // Close sheet
    provider.open.set(false);
    fixture.detectChanges();

    // Immediately after close - DOM should still exist
    expect(overlayRef.hasAttached()).toBe(true);

    // After animations complete - DOM should be removed
    await delay(400); // Buffer for 300ms animation
    expect(overlayRef.hasAttached()).toBe(false);
  });

  it('should slide from correct side', () => {
    provider.side.set('left');
    provider.open.set(true);
    fixture.detectChanges();

    const sheet = fixture.debugElement.query(By.css('[scSheet]'));
    expect(sheet.nativeElement.classList.contains('slide-in-from-left')).toBe(true);
  });
});
```
