# Native Dialog

The [Dialog](../dialog/README.md) — its parts, its look, its behaviour — on the browser's own `<dialog>` element, shown with `showModal()`. Kept so the library can move to the native element when it is ready to.

## Usage

```html
<div scNativeDialogProvider [(open)]="open">
  <button scButton variant="outline" scNativeDialogTrigger>Edit profile</button>
  <ng-template scNativeDialogPortal>
    <dialog scNativeDialog>
      <button scNativeDialogClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <div scNativeDialogHeader>
        <h2 scNativeDialogTitle>Edit profile</h2>
        <p scNativeDialogDescription>Make changes to your profile here.</p>
      </div>
      <div scNativeDialogBody>…</div>
      <div scNativeDialogFooter>
        <button scNativeDialogClose variant="outline" size="default">Cancel</button>
        <button scButton (click)="save()">Save changes</button>
      </div>
    </dialog>
  </ng-template>
</div>
```

## Native

- **The top layer**: shown with `showModal()`, the dialog is above everything, whatever the page's stacking; the page behind is inert and focus stays in the dialog — no focus trap of ours. The page doesn't scroll behind it (the CDK's block scroll strategy, as under the Dialog).
- **In place**: rendered where it is written (the portal is stamped in the provider), it takes the direction and language of its ancestors as any element.
- **The first focus** is the browser's: the first focusable element, or the one with `autofocus` (the Dialog's `cdkFocusInitial`).
- **The shell and the panel**: the `<dialog>` fills the screen, transparent (the browser's box undone: no border, padding or `::backdrop` of its own; it scrolls past a tall panel). In it, the style's backdrop (`scBackdrop`, the shared `backdrop` key) and the panel — a `div` with the Dialog's look (`dialog.content`, `dialog.close`), your content projected in it. Your `class` goes on the panel; the `<dialog>`'s class attribute is bound whole (`[attr.class]`), as Angular would otherwise keep your static class on it too.

## Closing

- `scNativeDialogClose` closes it, on any button: the ✕ straight in the panel (in its corner, `data-slot="dialog-close"` as the Dialog's), Cancel or Done in the footer. The style's button — `variant` and `size`, ghost and icon-sm for the ✕; `variant="outline" size="default"` in the footer.
- When your code runs first (Save checks and sends the form), the button is yours and closes the dialog through `[(open)]`.
- **Escape** (the native `cancel`, prevented and turned into the state) and a click on the screen around the panel close it too.
- **Animation**: the panel zooms and fades in (`animate.enter`), the backdrop fades in (its own). On close, the dialog's `(animate.leave)` adds the leave classes to both, waits for their animations, then calls `close()` while focus is still inside — so the browser gives focus back to what opened it (the trigger, focused on press for Safari: `ɵfocusOnPress`).
- A dialog destroyed without its leave (the page left) is closed, out of the top layer.

## Parts

| Part                                               | Selector                                                      | What it does                                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNativeDialogProvider`                           | `div[scNativeDialogProvider], span[scNativeDialogProvider]`   | `[(open)]`; renders the portal in place while open, blocks the page's scroll. `display: contents` (on a `span`, it fits in running text). |
| `ScNativeDialogTrigger`                            | `button[scNativeDialogTrigger]`                               | Opens it: behaviour only, on any button (`aria-haspopup="dialog"`, `aria-expanded`).                                                      |
| `ScNativeDialogPortal`, `ScNativeDialog`           | `ng-template[scNativeDialogPortal]`, `dialog[scNativeDialog]` | The dialog, rendered while open and shown as a modal; named by its title, described by its description. Its `class` goes on the panel.    |
| `ScNativeDialogClose`                              | `button[scNativeDialogClose]`                                 | Closes it: the style's button (`variant` ghost, `size` icon-sm), `type`.                                                                  |
| `ScNativeDialogHeader`, `ScNativeDialogFooter`     | `div[…]`                                                      | The title and description; the buttons.                                                                                                   |
| `ScNativeDialogBody`                               | `div[scNativeDialogBody]`                                     | The content between them: past half the screen it scrolls, edge to edge (`dialog.body`), while the header and the footer stay.            |
| `ScNativeDialogTitle`, `ScNativeDialogDescription` | `h2[…]`, `p[…]`                                               | Its name and its description.                                                                                                             |

## Style

The Dialog's: `injectStyle().dialog` (`content`, `close`, `header`, `body`, `footer`, `title`, `description`) and the shared `backdrop` key.
