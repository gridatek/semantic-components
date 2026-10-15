# Button parts style themselves

Status: **decided** (2026-10-16) — option A: a part on a `button` gives it its look. The rule is in `CLAUDE.md` (Components).

## The rule

A part on a `button` (`scToastClose`, `scPdfViewerZoomIn`, `scTransferListMoveToTarget`…):

1. takes its look from `buttonVariants()` (or `toggleVariants()`), never from a class list of its own that copies a button;
2. has `variant` and `size` inputs, with defaults that suit where it sits — the consumer writes nothing to get the right look, and picks another with the same words as `scButton` (`variant="outline" size="icon-sm"`);
3. adds only the classes that are its own: position (`absolute end-1 top-1`), visibility, a colour in its context;
4. sets its own `type="button"` and `[disabled]` — it doesn't need `scButton`.

```html
<!-- The part styles the button -->
<button scToastClose>
  <svg siXIcon></svg>
  <span class="sr-only">Close</span>
</button>

<!-- Another look: the same words as scButton -->
<button scPdfViewerZoomIn variant="outline" size="icon-sm">…</button>
```

Model: `libs/ui/src/lib/components/pagination/pagination-last.ts`.

## Exceptions: behaviour only

These add behaviour to whatever button the consumer writes, `scButton` or another part:

- **Triggers and closes that go on any button** — `scDialogTrigger`, `scSheetTrigger`, `scDrawerTrigger`, `scDrawerClose`, `scPopoverTrigger`, `scAlertDialogTrigger`, `scNativeDialogTrigger`, `scThemeModeToggle` (on a `scButton`, a `scSidebarMenuButton`, a menu item…).

And these keep a look of their own, as they are not buttons to the eye:

- **Controls over media** — the lightbox's (white on a dark photo).
- **Items in lists and grids** — emoji, swatches, suggestions, outline items, dock items, presets, the tag chip's delete.
- **Parts with a design of their own** — the sidebar's, the navigation menu trigger, the date pickers' triggers, the stepper trigger, the speed dial.

## Done (2026-10-16)

- 62 parts that relied on the consumer's `scButton` style themselves: the PDF viewer's, the image cropper's, the transfer list's, the notification center's, the stepper's next / previous, the date range picker's apply / cancel, `scQrCodeDownload` (its image size input is now `imageSize`). Their consumers lost `scButton`, and `variant` / `size` equal to the new defaults.
- 11 parts with their own class lists moved to `buttonVariants()`: toast close and action, popover close, spotlight close, the tour guide's close and actions, the autocomplete and combobox clears, the colour picker's eyedropper, the image annotator's actions, the navbar's mobile trigger.
