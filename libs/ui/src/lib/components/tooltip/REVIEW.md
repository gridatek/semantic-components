## Tooltip Component Review

The architecture is solid: a directive (`ScTooltipTrigger`) handles user interaction and delegates to a root-provided service (`ScTooltipManager`) that manages the CDK overlay lifecycle, while a presentational component (`ScTooltip`) handles rendering and animation. The position-flip tracking (via `positionChanges`) and arrow alignment are implemented correctly. That said, there are several issues across reliability, accessibility, and design.

### Bugs

**1. No fallback timeout for close animation — tooltip can get stuck in DOM**
`tooltip-manager.ts:182-189` — `hide()` triggers the close animation by calling `tooltipRef.instance.close()`, and the tooltip is only disposed when the `animationComplete` output fires (from the `animationend` DOM event). If the animation never completes — e.g. `prefers-reduced-motion: reduce` is active, the CSS animation classes are missing, or the browser skips the animation for any reason — `animationend` never fires and the tooltip remains in the DOM indefinitely as a ghost overlay.

**Fix:** Add a fallback `setTimeout` (e.g., 200ms) in `hide()` that calls `disposeTooltip()` if the animation hasn't completed. Clear the timeout in `disposeTooltip()` to avoid double disposal.

**2. Escape key dismissal leaves `aria-describedby` pointing to a removed element**
`tooltip-manager.ts:109-116` — The global Escape listener calls `this.hide()` on the manager, which triggers the close animation and eventually disposes the tooltip. However, the trigger's `isVisible` signal is never set to `false`, because the manager has no back-channel to notify the trigger. This means `ariaDescribedBy()` (`tooltip-trigger.ts:51-52`) continues returning the tooltip ID even though the element no longer exists in the DOM. Screen readers following this reference will find nothing.

The signal only corrects itself on the next `mouseleave` or `blur`, so there's a window where the markup is invalid.

**Fix:** Add a callback or observable on `ScTooltipManager` that the trigger subscribes to, so external dismissals (Escape key, or displacement by another trigger) can reset `isVisible`. Alternatively, make `isVisible` derive from the manager's state rather than being independently tracked.

### Accessibility Issues

**3. `aria-live="polite"` on tooltip may cause double announcements**
`tooltip.ts:42` — The tooltip has both `role="tooltip"` and `aria-live="polite"`. When the tooltip appears, screen readers may announce its content twice: once via the `aria-describedby` relationship on the trigger, and once from the `aria-live` polite region injecting new content into the accessibility tree. The WAI-ARIA Authoring Practices for tooltips recommend `role="tooltip"` paired with `aria-describedby` on the trigger, without `aria-live`. Angular Material, Radix, and Bootstrap tooltips all omit `aria-live`.

**Fix:** Remove `aria-live="polite"` and `aria-atomic="true"` from the tooltip host. The `role="tooltip"` + `aria-describedby` pattern is sufficient.

**4. No touch device support**
`tooltip-trigger.ts:15-19` — The directive only handles `mouseenter`, `mouseleave`, `focus`, and `blur`. On touch devices:
- Tapping a trigger may fire `mouseenter` synthetically, but there's no reliable `mouseleave` to dismiss — the tooltip lingers until the user taps elsewhere (which may not trigger `mouseleave` on the original element).
- There's no `touchstart`/`pointerdown` handling to show-on-tap or tap-outside-to-dismiss.
- Non-focusable trigger elements (e.g. a `<span>` with `scTooltipTrigger`) won't receive `focus` on tap at all.

**Fix:** Add pointer event handlers (`pointerdown` on the trigger, and a document-level listener to dismiss on outside interaction), or switch from `mouse*` events to `pointer*` events which unify mouse and touch. Also consider adding `tabindex="0"` to non-focusable triggers automatically.

### Design Issues

**5. `_IdGenerator` is a private CDK API**
`tooltip-trigger.ts:10` — `_IdGenerator` is imported from `@angular/cdk/a11y`. The underscore prefix indicates it's internal to CDK and not part of the public API. It could be removed or renamed in any minor CDK update.

**Fix:** Use a simple counter (`let nextId = 0; const id = \`sc-tooltip-${nextId++}\``) or `crypto.randomUUID()`.

**6. Tooltip content is a snapshot, not reactive**
`tooltip-manager.ts:142-153` — The content is captured at creation time via `useValue` on the injection token. If the `scTooltipTrigger` input binding changes while the tooltip is visible, the displayed text won't update. The `effect` in the trigger (`tooltip-trigger.ts:56-59`) handles the case where content becomes empty (hides the tooltip), but a change to a different non-empty string is silently ignored.

**Fix:** Either pass a `Signal<string>` into the tooltip via the injection token so it can reactively update, or hide and re-show the tooltip when the content input changes while visible.

**7. Manager dismissal doesn't sync trigger state (broader form of #2)**
Beyond just Escape, any external dismissal path has the same problem. If Trigger A shows a tooltip and then Trigger B shows its own (causing Trigger A's tooltip to be disposed at `tooltip-manager.ts:124-126`), Trigger A's `isVisible` remains `true`. The `isTooltipVisible` guard in `hide()` prevents A from accidentally hiding B's tooltip, but A's `aria-describedby` stays set incorrectly until the next `mouseleave`/`blur`.

**Fix:** Same approach as #2 — derive visibility from the manager rather than tracking it independently.

**8. `data` field on `ScTooltip` is unintentionally public**
`tooltip.ts:57` — `readonly data = inject(SC_TOOLTIP_DATA)` has no access modifier, making it `public` by default. It's only used in the template (`{{ data.content }}`) and host bindings (`[id]='data.tooltipId'`), so it should be `protected`.

### Minor / Cleanup

**9. No directional slide-out on close**
`tooltip.ts:63-68` — Open animations include directional `slide-in-from-*` based on `data-side`, but the close animation is only `fade-out-0` + `zoom-out-95` with no corresponding `slide-out-to-*`. The asymmetry is subtle but noticeable — the tooltip slides in from a direction but fades out in place.

**10. `ScTooltipConfig` type not exported**
`tooltip-manager.ts:87-90` — `ScTooltipConfig` is defined but not re-exported from `index.ts`. Consumers building custom tooltip triggers that interact with `ScTooltipManager` directly would need this type.

### Summary

| Severity | Issue | File |
|----------|-------|------|
| Bug | No animation fallback timeout — tooltip can get stuck | `tooltip-manager.ts` |
| Bug | Escape leaves stale `aria-describedby` on trigger | `tooltip-trigger.ts`, `tooltip-manager.ts` |
| A11y | `aria-live` may double-announce content | `tooltip.ts` |
| A11y | No touch/mobile support | `tooltip-trigger.ts` |
| Design | Private CDK API (`_IdGenerator`) | `tooltip-trigger.ts` |
| Design | Content is a snapshot, not reactive | `tooltip-manager.ts` |
| Design | External dismissal doesn't sync trigger state | `tooltip-trigger.ts`, `tooltip-manager.ts` |
| Design | Unintentionally public `data` field | `tooltip.ts` |
| Minor | No directional slide-out animation | `tooltip.ts` |
| Minor | `ScTooltipConfig` not exported | `index.ts` |

The highest priority fixes are the animation fallback (#1) and the stale `aria-describedby` (#2 / #7), as they affect reliability and accessibility respectively. The `aria-live` removal (#3) is a quick win, and touch support (#4) is important for mobile users.
