# Alert Dialog

A modal dialog that asks for an answer before going on — to confirm, to cancel. In the look of the app's preset. For a dialog that can simply be dismissed, use a Dialog.

## Usage

```html
<div scAlertDialogProvider>
  <button scButton scAlertDialogTrigger variant="outline">Show Dialog</button>
  <ng-template scAlertDialogPortal>
    <div scAlertDialog>
      <div scAlertDialogHeader>
        <h2 scAlertDialogTitle>Are you absolutely sure?</h2>
        <p scAlertDialogDescription>This action cannot be undone.</p>
      </div>
      <div scAlertDialogFooter>
        <button scAlertDialogCancel>Cancel</button>
        <button scAlertDialogAction (click)="delete()">Continue</button>
      </div>
    </div>
  </ng-template>
</div>
```

## Anatomy

Every part is a directive on your element. The dialog is in a template, rendered while it is open, over a backdrop; it is an `alertdialog`, named by its title and described by its description. Cancel and the action close it; do the work on the action's `(click)`, or follow `[(open)]`.

```html
<div scAlertDialogProvider [(open)]="open">
  <button scButton scAlertDialogTrigger></button>
  <ng-template scAlertDialogPortal>
    <div scAlertDialog size="sm">
      <div scAlertDialogHeader>
        <div scAlertDialogMedia><svg></svg></div>
        <h2 scAlertDialogTitle></h2>
        <p scAlertDialogDescription></p>
      </div>
      <div scAlertDialogFooter>
        <button scAlertDialogCancel></button>
        <button scAlertDialogAction></button>
      </div>
    </div>
  </ng-template>
</div>
```

## Keyboard

- Open, focus goes into the dialog — to its first button, Cancel: put the least harmful answer first.
- Tab and Shift+Tab stay in the dialog.
- Escape closes it, as Cancel does. A click outside doesn't: it wants an answer.
- Closed, focus goes back to the trigger.

## API reference

Each part takes `class`, merged over the preset.

| Part                                             | Selector                                                     | Description                                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `ScAlertDialogProvider`                          | `div[scAlertDialogProvider], span[scAlertDialogProvider]`    | The state: `[(open)]` (default `false`). The dialog in an overlay, over a backdrop, while open. |
| `ScAlertDialogTrigger`                           | `button[scAlertDialogTrigger]`                               | Opens it; behaviour only, on any button (`scButton` for the look).                              |
| `ScAlertDialogPortal`                            | `ng-template[scAlertDialogPortal]`                           | The dialog's template.                                                                          |
| `ScAlertDialog`                                  | `div[scAlertDialog]`                                         | The dialog. Input `size`: `'default'` or `'sm'` (narrower, centered, two buttons side by side). |
| `ScAlertDialogHeader`                            | `div[scAlertDialogHeader]`                                   | The media, title and description.                                                               |
| `ScAlertDialogMedia`                             | `div[scAlertDialogMedia]`                                    | An icon, beside the title (above it in a small dialog).                                         |
| `ScAlertDialogTitle`, `ScAlertDialogDescription` | `h2[scAlertDialogTitle]`, `p[scAlertDialogDescription]`      | Name and describe the dialog.                                                                   |
| `ScAlertDialogFooter`                            | `div[scAlertDialogFooter]`                                   | The buttons: stacked on a phone, in a row beyond.                                               |
| `ScAlertDialogCancel`, `ScAlertDialogAction`     | `button[scAlertDialogCancel]`, `button[scAlertDialogAction]` | Close it. The preset's buttons: inputs `variant` (`'outline'`, `'default'`) and `size`.         |

`scAlertDialogProvider`: On a `span`, it fits in running text — inside a `<p>`, where a `div` is not allowed; it renders `display: contents` either way.

## Styles

From the preset (`alertDialog`): the dialog (padding, radius, width, shadow), the header, the footer (a muted band only in nova), the media, the title and the description. shadcn's placement and open/close classes are left out: the CDK overlay centers the dialog, Angular animates it. Its width is the preset's maximum for its `size`, whatever its text, as shadcn's: the dialog adds `w-screen`, capped by that `max-w` (the CDK's pane is only as wide as its content, so `w-full` alone left a short alert narrow). Your classes win. The backdrop is the shared `scBackdrop`, its shade and blur the preset's `backdrop`, the same behind every overlay.
