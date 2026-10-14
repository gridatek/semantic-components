# Focus Trap

Traps focus in an overlay — the dialog, alert dialog, drawer, sheet and popover use it:

- **On open**, once rendered: focuses the overlay's first element (or its `cdkFocusInitial`).
- **While open**: Tab and Shift+Tab stay inside.
- **On close**: focus goes back to where it was before — only if it is still in the overlay, or lost to the page. Focus that moved on, into a dialog opened from a popover say, is left where it is (as the CDK's Dialog does; `cdkTrapFocus` would take it back).

```html
<div scFocusTrap>…</div>
```
