# Slider & Range Slider - Code Review

## Files Reviewed

| File                           | Type      | Lines |
| ------------------------------ | --------- | ----- |
| `slider/slider.ts`             | Component | 185   |
| `slider/slider-thumb.ts`       | Component | 73    |
| `slider/slider-track.ts`       | Component | 31    |
| `slider/slider-range.ts`       | Component | 28    |
| `slider/index.ts`              | Barrel    | 4     |
| `range-slider/range-slider.ts` | Component | 304   |
| `range-slider/index.ts`        | Barrel    | 1     |

---

## Architecture

Good component composition. `ScSlider` is the orchestrator that owns state and event logic, while `ScSliderTrack`, `ScSliderRange`, and `ScSliderThumb` are pure presentational subcomponents. `ScRangeSlider` reuses all three subcomponents for the dual-thumb variant.

---

## Issues

### 1. `ngOnInit` + `document` listeners should use `afterNextRender`

Both `ScSlider` (line 87) and `ScRangeSlider` (line 124) register global `document` event listeners inside `ngOnInit`. This runs during SSR where `document` doesn't exist. Should use `afterNextRender` or guard with `isPlatformBrowser`.

### 2. `min` / `max` input type inconsistency

In `ScSlider`, `min` and `max` are `input<number | undefined>(0)` / `input<number | undefined>(100)` (lines 58-59), then every usage does `this.min() ?? 0` / `this.max() ?? 100`. In `ScRangeSlider`, they're `input<number>(0)` / `input<number>(100)` (lines 74-75) with no fallback needed. The slider should match the range-slider and just use `input<number>(0)` / `input<number>(100)`.

### 3. `ScSliderThumb` also has `min`/`max` as `number | undefined`

`slider-thumb.ts` lines 37-38 declare `min` and `max` as `input<number | undefined>(0)`, but these are passed straight to `aria-valuemin` / `aria-valuemax`. Since the parent always passes concrete numbers, this should just be `input<number>()` or `input.required<number>()`.

### 4. No click-on-track support

Clicking on the track bar itself doesn't move the thumb to that position. Users expect to click anywhere on the track to jump the value. Only the thumb is draggable.

### 5. `ScSliderRange` positioning bug in `ScRangeSlider`

In `range-slider.ts` template (line 32), `[style.left.%]="rangeStart()"` is applied to the `scSliderRange` div. But `ScSliderRange` itself already sets `[style.width.%]` via its host binding (line 15 of `slider-range.ts`). The `percentage` input is used for width, but in the range slider it receives `rangeWidth()` (the difference), so width is correct. However, the `left` style is set via template binding on the host. This works but is fragile - the component doesn't know about `left` positioning internally. Consider adding a `left` or `offset` input to `ScSliderRange` instead.

### 6. Duplicate keyboard handling logic

`ScRangeSlider.onMinKeydown` (lines 185-225) and `onMaxKeydown` (lines 227-267) are nearly identical, differing only in which bounds they use. This could be extracted into a shared method like `handleKeydown(event, currentValue, lowerBound, upperBound)`.

### 7. Duplicate drag event handling logic

The `ngOnInit` subscription in both `ScSlider` and `ScRangeSlider` follows the same pattern: merge mouse/touch move/up events, check drag state, update position. Consider extracting a shared drag utility or base behavior.

### 8. `FormValueControl<number>` on `ScSlider` but not `ScRangeSlider`

`ScSlider` implements `FormValueControl<number>` (line 52) for Signal Forms integration. `ScRangeSlider` doesn't implement any form control interface. If range slider needs form integration, it would need a custom approach since it has two values.

### 9. Missing `type-only` import not enforced

`slider.ts` line 15 uses `import type { FormValueControl }` which is correct. Just noting it's good practice already followed.

### 10. Thumb vertical centering

`ScSliderThumb` uses `[style.left.%]` for horizontal positioning but has no explicit vertical centering relative to the track. It relies on the parent's `items-center` flex alignment. This works but makes the thumb dependent on the parent's flex context.

---

## Accessibility

### Good

- `role="slider"` on thumb
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` properly set
- `aria-disabled` set when disabled
- `aria-label` and `aria-labelledby` support
- `tabindex` toggled (-1 when disabled, 0 when enabled)
- Full keyboard navigation: Arrow keys, Home, End, PageUp, PageDown
- `data-disabled` attribute on host for styling hooks

### Needs Improvement

- **No `aria-orientation`**: Should set `aria-orientation="horizontal"` on the slider role element.
- **No live region feedback**: Screen reader users get no announcement when value changes during drag. Consider `aria-live` or letting the `aria-valuenow` update handle it (most screen readers do pick this up from the slider role).
- **Range slider thumb identification**: Both thumbs in the range slider have `role="slider"` but no way to distinguish them for screen readers beyond the `aria-label` inputs. The demos should always provide distinct labels (e.g., "Minimum price", "Maximum price").

---

## Styling

### Good

- Consistent use of `classInput` pattern with `cn()` for class merging
- Proper use of Tailwind design tokens (`border-primary`, `bg-background`, `ring-ring`)
- Focus-visible ring for keyboard users
- `touch-none` on container to prevent scroll interference
- `select-none` to prevent text selection during drag
- Cursor feedback: `cursor-grab` / `active:cursor-grabbing` / `cursor-not-allowed`

### Notes

- Thumb size is `size-5` (20px) which is good for touch targets (meets 24px minimum with the border).
- Track height is `h-2` (8px) which is a bit thin for direct click targeting (if track click were implemented).

---

## Summary

The slider components are well-structured with good accessibility fundamentals and clean separation of concerns. The main areas to address are:

1. **SSR safety** - Replace `ngOnInit` document listeners with `afterNextRender`
2. **Click-on-track** - Add track click support for better UX
3. **Type cleanup** - Remove unnecessary `number | undefined` on inputs that always have defaults
4. **Code deduplication** - Extract shared keyboard/drag logic between slider and range-slider
5. **`aria-orientation`** - Add to thumb elements
