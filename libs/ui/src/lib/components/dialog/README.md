# Dialog

A window over the page, which waits until it is closed: the page behind it can't be reached. In the look of the app's preset (shadcn's Dialog).

## Usage

```html
<div scDialogProvider [(open)]="open">
  <button scButton variant="outline" scDialogTrigger>Edit profile</button>
  <ng-template scDialogPortal>
    <div scDialog>
      <button scDialogClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <div scDialogHeader>
        <h2 scDialogTitle>Edit profile</h2>
        <p scDialogDescription>Make changes to your profile here.</p>
      </div>
      …
      <div scDialogFooter>
        <button scDialogClose variant="outline" size="default">Cancel</button>
        <button scButton (click)="save()">Save changes</button>
      </div>
    </div>
  </ng-template>
</div>
```

## Closing

- `scDialogClose` closes it, on any button: the ✕ straight in the dialog (the dialog puts it in its corner), Cancel or Done in the footer. It styles itself — the preset's button, `variant` and `size` (ghost, icon-sm: the ✕); in the footer `variant="outline" size="default"` — so it takes no `scButton`.
- When your code runs first (Save checks and sends the form), the button is yours and closes the dialog through `[(open)]` when it is done, or keeps it open to show what is wrong.
- Escape and a click outside close it too. Focus stays in it while it is open, starts on its first focusable element, and goes back to what opened it.

## Width

The dialog is as wide as the preset allows (`sm:max-w-sm` or `sm:max-w-md`, depending on the style; the screen less 2rem on a phone), whatever its content — as shadcn's. Its own `w-screen` gives it that width: the CDK's overlay pane is only as wide as its content, so a `w-full` has nothing to fill, and a dialog with short content (a command, a one-line confirm) stayed narrow and collapsed while zooming in.

Narrow it with a `max-w` of your own (`class="sm:max-w-md"`), or set a width (`class="w-lg"`): your classes win.

## API reference

| Part                                   | Selector                                        | Inputs                                                                                                                                   |
| -------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ScDialogProvider`                     | `div[scDialogProvider], span[scDialogProvider]` | `open` (`[(open)]`), `class` — renders the dialog centred over the backdrop                                                              |
| `ScDialogTrigger`                      | `button[scDialogTrigger]`                       | `class` — opens it; behaviour only                                                                                                       |
| `ScDialogPortal`, `ScDialog`           | `ng-template[scDialogPortal]`, `div[scDialog]`  | `class` — role `dialog`, modal; named by its title, described by its description; takes the direction and language of where it is opened |
| `ScDialogClose`                        | `button[scDialogClose]`                         | `class`, `variant` (`ghost`), `size` (`icon-sm`), `type` — closes it; the preset's button                                                |
| `ScDialogHeader`, `ScDialogFooter`     | `div[…]`                                        | `class`                                                                                                                                  |
| `ScDialogTitle`, `ScDialogDescription` | `h2[scDialogTitle]`, `p[scDialogDescription]`   | `class`                                                                                                                                  |

`scDialogProvider`: On a `span`, it fits in running text — inside a `<p>`, where a `div` is not allowed; it renders `display: contents` either way.

Every part's classes are the preset's (`injectPreset().dialog`: `content`, `close` — the ✕'s place and fill —, `header`, `footer`, `title`, `description`): shadcn's Dialog, in each style. The backdrop is the shared `backdrop` key.
