## Toast Component Review

Overall the architecture is clean: a root-provided service (`ScToaster`) manages state via signals, and a declarative stack component (`ScToastStack`) renders the toasts. The component split (toast, title, description, action, close) follows SRP well and the `classInput` pattern is used consistently. That said, there are several issues ranging from bugs to missing functionality.

### Bugs

**1. Dismiss animation never plays**
`toast-stack.ts:32` — `data-state` is hardcoded to `'open'`:
```html
[attr.data-state]="'open'"
```
The CSS classes reference `data-[state=closed]:animate-out`, `data-[state=closed]:fade-out-80`, etc., but the state is never set to `closed` before the toast is removed from the DOM. `ScToaster.dismiss()` immediately removes the toast from the signal array, so the element is destroyed instantly without any exit animation.

**Fix:** Introduce a `state` property on `ScToastData`, set it to `'closed'` on dismiss, wait for the animation to complete (via `animationend` event or a fixed delay), then remove from the array.

**2. Pointer hover pause is wired but never connected**
`toast.ts:23-24` defines `(pointerenter)` and `(pointerleave)` host bindings that emit outputs, and `toast.ts:33-37` declares the `pointerEnter`/`pointerLeave` outputs. However, `toast-stack.ts` never binds to these outputs. The auto-dismiss timer runs regardless of whether the user is hovering over the toast. This is a poor UX — users can't read a toast without it disappearing.

**Fix:** In `ScToastStack`, bind `(pointerEnter)` and `(pointerLeave)` on the `scToast` element and call `ScToaster` methods that pause/resume the timeout for that toast ID.

**3. Duplicate toast rendering from multiple `<sc-toast-stack />` instances**
Every demo component includes its own `<sc-toast-stack />`. Since `ScToaster` is `providedIn: 'root'`, all stack instances share the same signal. When a toast is shown, **every** `ScToastStack` on the page renders it simultaneously. The README correctly states "Place once in app" but the demos violate this.

**Fix:** Either move `<sc-toast-stack />` to the app shell only, or make `ScToastStack` guard against multiple instances (e.g. log a warning if more than one exists).

### Accessibility Issues

**4. Missing `aria-live` region at the container level**
Individual toasts have `role="status"` and `aria-live="polite"`, but when toasts are added dynamically into the DOM, screen readers may not announce them reliably because the `aria-live` region itself is being created/destroyed rather than being a stable container that content flows into. The `ScToastStack` container should be the live region, not each individual toast.

**Fix:** Add `role="region"` and `aria-live="polite"` to the `ScToastStack` host, and remove `role="status"` / `aria-live` from individual `ScToast` elements (or keep them as supplementary).

**5. Close button SVG lacks `aria-hidden`**
`toast-stack.ts:51-62` — The close button contains a raw SVG icon without `aria-hidden="true"`. Screen readers may attempt to describe the SVG paths. The button already has `aria-label="Close"` (from the directive), so the SVG should be hidden.

### Design Issues

**6. `_IdGenerator` is a private CDK API**
`toaster.ts:3` — `_IdGenerator` is imported from `@angular/cdk/a11y`. The underscore prefix indicates it's internal to CDK and not part of the public API. It could be removed or renamed in any CDK update without notice.

**Fix:** Use a simple counter or `crypto.randomUUID()` for ID generation instead.

**7. No maximum toast limit**
`ScToaster.show()` has no cap on simultaneous toasts. Rapid calls can stack unlimited toasts, potentially overflowing the viewport.

**Fix:** Add a configurable `maxToasts` (e.g., 5) and dismiss the oldest toast when the limit is exceeded.

**8. `toastService` is unintentionally public**
`toast-stack.ts:76` — `toastService` is declared as `readonly` but lacks an access modifier, making it `public` by default. Since it's only accessed in the template and internal methods, it should be `protected`.

### Minor / Cleanup

**9. No swipe-to-dismiss on mobile**
The component positions toasts at the top on mobile but provides no touch gesture to dismiss. This is a common expectation for mobile toast UX.

**10. `ScToast` selector is `div[scToast]` (element component) but uses `classInput` pattern without `'block'`**
Per the project conventions, element-selector components should include `'block'` as the base class in `cn()`. `ScToast` does not pass `'block'` as the first argument to `cn()` — though this may be intentional since the toast is styled with `flex`.

### Summary

| Severity | Issue | File |
|----------|-------|------|
| Bug | Dismiss animation never plays | `toast-stack.ts`, `toaster.ts` |
| Bug | Hover-pause outputs wired but unconnected | `toast.ts`, `toast-stack.ts` |
| Bug | Duplicate rendering with multiple stacks | Demo files |
| A11y | Live region should be on container | `toast-stack.ts`, `toast.ts` |
| A11y | SVG icon missing `aria-hidden` | `toast-stack.ts` |
| Design | Private CDK API usage | `toaster.ts` |
| Design | No max toast limit | `toaster.ts` |
| Design | Unintentionally public field | `toast-stack.ts` |
| Minor | No swipe-to-dismiss | — |

The highest priority fixes are the dismiss animation bug (#1), the hover-pause gap (#2), and the duplicate rendering issue (#3), as they directly affect user experience.
