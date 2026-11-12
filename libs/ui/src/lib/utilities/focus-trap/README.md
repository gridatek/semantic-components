# Focus Trap

Traps focus in an overlay — the dialog, alert dialog, drawer, sheet and popover use it:

- **On open**, once rendered: focuses the overlay's first element (or its `cdkFocusInitial`).
- **While open**: Tab and Shift+Tab stay inside.
- **On close**: focus goes back to where it was before — only if it is still in the overlay, or lost to the page. Focus that moved on, into a dialog opened from a popover say, is left where it is (as the CDK's Dialog does; `cdkTrapFocus` would take it back).

```html
<div scFocusTrap>…</div>
```

## Why not `cdkTrapFocus`

It is the CDK's focus trap underneath (`FocusTrapFactory`), with two changes:

- **Giving focus back.** `cdkTrapFocus` (with `cdkTrapFocusAutoCapture`) always focuses the element that had focus before. A popover that opens a dialog, then closes, would pull focus out of the dialog, back to its own trigger. This one gives it back only when it is still inside, or lost to the page — as the CDK's Dialog does.
- **Not trapped, still moving in.** `[scFocusTrap]="false"` moves focus in and back, but lets Tab leave — Base UI's Popover, not modal by default. With the CDK, its restore would still be unconditional.
- **On by default.** Focus moves in without an extra input; with the CDK each overlay must add `cdkTrapFocusAutoCapture`.

The Dialog, Alert Dialog, Sheet, Drawer and Popover use it.
