# Button parts style themselves

Status: **decided** (2026-10-16) — option A: a part on a `button` gives it its look. The rule is in `CLAUDE.md` (Components). **Reopened** (2026-11-05) by the dialog case, below: where the line falls between a part that styles itself and one that only adds behaviour.

## The rule

A part on a `button` (`scPdfViewerZoomIn`, `scTransferListMoveToTarget`…):

1. takes its look from the preset's button (`injectPreset().button(…)`, in a field) (a toggle: `injectPreset().toggle(…)`), never from a class list of its own that copies a button;
2. has `variant` and `size` inputs, with defaults that suit where it sits — the consumer writes nothing to get the right look, and picks another with the same words as `scButton` (`variant="outline" size="icon-sm"`);
3. adds only the classes that are its own: position (`absolute end-1 top-1`), visibility, a colour in its context;
4. sets its own `type="button"` and `[disabled]` — it doesn't need `scButton`.

```html
<!-- The part styles the button -->
<button scPaginationLast>
  <svg siChevronsRightIcon></svg>
  <span class="sr-only">Last page</span>
</button>

<!-- Another look: the same words as scButton -->
<button scPdfViewerZoomIn variant="outline" size="icon-sm">…</button>
```

Model: `libs/ui/src/lib/components/pagination/pagination-last.ts`.

## Exceptions: behaviour only

These add behaviour to whatever button the consumer writes, `scButton` or another part:

- **Triggers that go on any button** — `scDialogTrigger`, `scSheetTrigger`, `scDrawerTrigger`, `scPopoverTrigger`, `scAlertDialogTrigger`, `scNativeDialogTrigger`, `scThemeModeToggle` (on a `scButton`, a `scSidebarMenuButton`, a menu item…).

And these keep a look of their own, as they are not buttons to the eye:

- **Controls over media** — the lightbox's (white on a dark photo).
- **Items in lists and grids** — emoji, swatches, suggestions, outline items, dock items, presets, the tag chip's delete.
- **Parts with a design of their own** — the sidebar's, the navigation menu trigger, the date pickers' triggers, the stepper trigger, the speed dial.

## The dialog case (2026-11-05)

### What happened

`scDialogClose` followed the rule: it gave its button a look and a place — a ghost icon button in the corner (`absolute top-2 end-2`). But a dialog has more than one close:

- the ✕ in the corner — a ghost icon button;
- Cancel, Done, Close in the footer — an outline or a primary button, where it sits.

One part can't style both. Written on a Cancel (`<button scButton variant="outline" scDialogClose>`), it pulled the button into the corner; so the consumer closed it through the dialog's state instead (`(click)="open.set(false)"`), and kept that state only to close.

### What other libraries do

Every one with a close part makes it **behaviour only**, on any button: Base UI (`Dialog.Close`), Angular Material (`mat-dialog-close`: no classes at all), Ark UI (`Dialog.CloseTrigger`), React Aria (`slot="close"`), Headless UI (`CloseButton`). A styled ✕ is a separate thing, when there is one: shadcn draws it inside `DialogContent`, Mantine has `Modal.CloseButton`. Code that runs before closing (Save) never goes through the close part: it closes through the state. Details: [reference-libraries.md](reference-libraries.md#dialog).

### What we weighed

1. **Two parts** — `scDialogClose` behaviour only, `scDialogCloseButton` the styled ✕. Turned down: "button" in the name.
2. **`scDialogClose` stays the ✕; another verb for the rest** (`scDialogDismiss`). Turned down: close and dismiss are synonyms, and the other libraries' "close" is the behaviour.
3. **One part, behaviour only; the container places the ✕** — chosen. The ✕ is the consumer's button (`scButton variant="ghost" size="icon-sm"`); a close that is a **direct child** of the dialog goes in its corner, from the preset (`[&>[data-slot=dialog-close]]:…` classes, on the dialog). A close anywhere else (the footer) stays where it is.
4. **The same, but asked for** — `<button scDialogClose corner>`. Turned down: the place in the markup says it already (option 3 was preferred).

Done the same way for the toast (`scToastClose`: the toast places a direct-child close, faint, shown on hover or focus).

### Revised (2026-11-05): the close styles itself again, the dialog still places it

The user changed their mind: `scDialogClose` is the preset's button again (`variant`, `size` inputs; ghost / icon-sm by default, for the ✕), and keeps `data-slot="dialog-close"`: the dialog still puts a direct-child close in its corner. A footer close sets its look: `<button scDialogClose variant="outline" size="default">Cancel</button>`, no `scButton`. So the problem above (a Cancel pulled into the corner) stays solved by the place, not by dropping the look. The same for `scToastClose` (ghost / icon-xs, placed by the toast) and `scDrawerClose` (outline / default: shadcn's Cancel; the drawer places nothing).

### What it changes in the rule

- **The look is the part's, its defaults the ✕'s** (since the revision): a close elsewhere sets `variant` and `size`, as any button part does. The place is the container's.
- **Position moved out of the part** — rule 3's example (`absolute end-1 top-1`) was the toast close's; it is the container's now, chosen by where the close sits.

### To decide

Where the line falls. A criterion, from this case: **a part styles itself when its action has one look in one place** (`scPaginationLast`, `scPdfViewerZoomIn`: always the same button); **it adds behaviour only when the same action goes on buttons that look different** (a trigger), and the container places a part whose place depends on where it sits (`scDialogClose`, which styles itself with `variant` / `size` for the ✕, Cancel, Done).

Parts this would move, if kept:

- the closes that still style themselves — popover close, spotlight close, the tour guide's close;
- maybe actions with the same split — the alert dialog's Cancel and Action, the date range picker's apply / cancel, the stepper's next / previous (each always one look, so they would stay as they are under the criterion).

## Done (2026-10-16)

- 67 parts that relied on the consumer's `scButton` style themselves: the PDF viewer's, the editor's search buttons, the image cropper's, the transfer list's, the notification center's, the stepper's next / previous, the date range picker's apply / cancel, `scQrCodeDownload` (its image size input is now `imageSize`). Their consumers lost `scButton`, and `variant` / `size` equal to the new defaults.
- 11 parts with their own class lists moved to `buttonVariants()`: toast action, popover close, spotlight close, the tour guide's close and actions, the autocomplete and combobox clears, the colour picker's eyedropper, the image annotator's actions, the navbar's mobile trigger.
- `scCodeEditorCopyButton` became a directive: its icons were drawn by the library (and dropped the consumer's name); the consumer writes them now, switched by `copied()`.
