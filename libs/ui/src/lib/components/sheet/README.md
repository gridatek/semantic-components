# Sheet

A dialog at the edge of the screen, sliding in from its side — shadcn's Sheet (Base UI's Dialog) in the look of the app's preset (`sheet` key: shadcn's in each of the eight styles).

## Usage

```html
<div scSheetProvider side="right" [(open)]="open">
  <button scButton scSheetTrigger variant="outline">Open</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <div scSheetHeader>
        <h2 scSheetTitle>Edit profile</h2>
        <p scSheetDescription>Make changes to your profile here.</p>
      </div>
      …
      <div scSheetFooter>
        <button scButton (click)="save()">Save changes</button>
        <button scSheetClose variant="outline" size="default">Close</button>
      </div>
      <button scSheetClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
    </div>
  </ng-template>
</div>
```

## Parts

| Part                 | Selector                     | What it does                                                                                            |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `ScSheetProvider`    | `div[scSheetProvider]`       | `[(open)]`, `side` (`right`, `left`, `top`, `bottom`, `inline-start`, `inline-end`)                     |
| `ScSheetTrigger`     | `button[scSheetTrigger]`     | Opens it, on any button (`aria-haspopup`, `aria-expanded`)                                              |
| `ScSheetPortal`      | `ng-template[scSheetPortal]` | The content, rendered while open                                                                        |
| `ScSheet`            | `div[scSheet]`               | The panel: `role="dialog"`, `aria-modal`, named and described, `data-side`; slides in and out           |
| `ScSheetHeader`      | `div[scSheetHeader]`         | Its title and description                                                                               |
| `ScSheetTitle`       | `h2[scSheetTitle]`           | Names it                                                                                                |
| `ScSheetDescription` | `p[scSheetDescription]`      | Describes it                                                                                            |
| `ScSheetFooter`      | `div[scSheetFooter]`         | Its actions, at the bottom                                                                              |
| `ScSheetClose`       | `button[scSheetClose]`       | Closes it: the preset's button (ghost, icon-sm); straight in the panel, the panel puts it in its corner |

## Keyboard and screen readers

- A modal dialog, named by its title and described by its description (when it has them).
- Focus moves into it and stays there; closing gives it back to the trigger. Escape or a press on the backdrop closes it.
- In a right-to-left page its text and its ✕ follow (`dir` and `lang` carried from where it was opened); `inline-start` is the right.

## Not shadcn's

- **Angular's animations**: the panel slides and fades with `animate.enter` / `animate.leave` (tw-animate's `animate-in` / `animate-out`), the side's `slide-in-from-*-10` / `slide-out-to-*-10` — shadcn's 2.5rem slide, as our other overlays.
- **Logical sides** (`inline-start`, `inline-end`), shared with Tooltip and Popover (`utils/overlay-positions`).
- **The ✕ is yours** (`scSheetClose`), placed by the panel — shadcn's content draws it (`showCloseButton`).
