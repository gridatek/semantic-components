# WebKit workarounds

Where Safari (WebKit) differs from Chrome and Firefox and the lib works
around it. Each workaround is marked `FIXME(webkit)` in the code:

```sh
grep -rn "FIXME(webkit)" libs
```

Check them again with each WebKit release (the `demos-webkit` and
`pages-webkit` Playwright projects, `ALL_BROWSERS=1`). Drop a workaround once
Safari behaves like the others, and remove its section here.

## In the lib

### A pressed button isn't focused

- **Where:** `ɵfocusOnPress()` in
  `libs/ui/src/lib/utils/focus-on-press/focus-on-press.ts`, called by the
  triggers of Dialog, Alert Dialog, Sheet, Drawer and Popover.
- **What:** Chrome and Firefox focus a button when it is clicked. Safari on
  macOS doesn't: focus stays on the page (`document.activeElement` is the
  body). An overlay gives focus back to where it was on close, so after
  Escape focus was lost instead of being back on the trigger. The triggers
  focus themselves when pressed.
- **WebKit's view:** intended, on macOS only text fields take focus from a
  click (unless keyboard navigation is turned on in the system settings).
- **Links:**
  - [WebKit bug 22261 — Clicking on a non-text input element does not give it focus](https://bugs.webkit.org/show_bug.cgi?id=22261) (WONTFIX)
  - [WebKit bug 229895 — Clicking button drops focus entirely](https://bugs.webkit.org/show_bug.cgi?id=229895)
  - [WebKit bug 267449](https://bugs.webkit.org/show_bug.cgi?id=267449): `document.activeElement` is the body after a click on a checkbox (a duplicate of 22261)
  - [MDN — `<button>`: clicking and focus](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus)
- **Specs:** "focus back" in the dialog, drawer, sheet, alert dialog,
  popover and command demos.

### A range's arrow keys aren't mirrored right to left

- **Where:** `onKeydown()` in `libs/ui/src/lib/components/slider/slider.ts`.
- **What:** the slider is a native `<input type="range">`. Right to left, it
  is drawn mirrored in every browser (its minimum on the right). Chrome and
  Firefox mirror its arrow keys too (← raises it); Safari doesn't (→ raises
  it, moving the thumb away from the key pressed). In RTL, across, the
  slider handles ← and → itself and sends `input` and `change` as a native
  change would.
- **Links:** no WebKit bug found for this yet (worth filing). The same
  report in another library:
  [TbSlider: Left and Right go the wrong way on right-to-left pages in WebKit](https://github.com/zacharydf7/trailblazor/issues/287).
  How Firefox made the range follow `direction`:
  [Mozilla bug 842158](https://bugzilla.mozilla.org/show_bug.cgi?id=842158).
- **Specs:** "RTL" in the slider and range slider demos.

### A late `aspect-ratio` isn't applied to a stretched flex item

- **Where:** `fixWebKitLayout()` in
  `libs/ui/src/lib/components/aspect-ratio/aspect-ratio.ts`.
- **What:** a flex item stretched in a row (`align-items: stretch`, the
  default) that has been laid out once ignores an `aspect-ratio` it gets
  afterwards. That can be a stylesheet loading late, a breakpoint, or a new
  `ratio`. WebKit computes the ratio in its style (`getComputedStyle` has
  it), but its box keeps its old height (a photo's frame 25px high instead
  of 216px). Through `--ratio` or set directly, it's the same. Block, grid,
  a flex column and a flex item with its own `align-self` are fine. Chrome
  and Firefox apply it every time. Only a new box fixes it (`display: none`,
  then back), so `ScAspectRatio` compares its height to its computed ratio
  (once drawn, on a new `ratio`, on a resize, on the page's `load`) and makes
  a new box when they differ. That never happens outside WebKit.
- **Links:** no WebKit bug found for this yet (worth filing). The smallest
  page that shows it: a `display: flex` row, a child with `width: 100%;
max-width: 384px`, its `offsetHeight` read, then `aspect-ratio: 16 / 9`
  set: its height stays 0.
- **Specs:** the aspect ratio demos, and "Aspect Ratio" in the frame demos.

## In the tests only

Playwright's WebKit, not Safari: the specs work around these, the lib
doesn't.

- **It says it's a Mac everywhere.** Its user agent is Safari's on macOS,
  also on Windows and Linux, so a page listens for ⌘. `ControlOrMeta`
  follows the machine running the test and presses Ctrl. Pick the key from
  the page's user agent (command demos, "Mod+J").
- **Mouse moves come in bursts.** `page.mouse.move(…, { steps })` delivers
  its steps about a millisecond apart, so any drag reads as a flick. Move
  step by step, a frame apart (drawer demos, `drag()`).
