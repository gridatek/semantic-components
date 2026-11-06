# Popover Next

Rich content in a panel beside its trigger — a dialog, modal or not, opened by a click or a hover — as Base UI's Popover (parts, behaviour) in the look of the app's preset (`popover` key: shadcn's in each of the eight styles).

## Usage

```html
<div scPopoverNextProvider align="start">
  <button scButton scPopoverNextTrigger variant="outline">Open Popover</button>
  <ng-template scPopoverNextPortal>
    <div scPopoverNext class="w-64">
      <div scPopoverNextHeader>
        <h2 scPopoverNextTitle>Dimensions</h2>
        <p scPopoverNextDescription>Set the dimensions for the layer.</p>
      </div>
      …
    </div>
  </ng-template>
</div>
```

## Parts

| Part                       | Selector                           | What it does                                                                                                                                                    |
| -------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPopoverNextProvider`    | `div[scPopoverNextProvider]`       | `[(open)]`, `modal` (`false`, `'trap-focus'`, `true`), `side` (`bottom`, `top`, `left`, `right`, `inline-start`, `inline-end`), `align`, `offset` (4), `origin` |
| `ScPopoverNextTrigger`     | `button[scPopoverNextTrigger]`     | Toggles it (`aria-haspopup`, `aria-expanded`, `aria-controls`); `openOnHover`, `delay` (300), `closeDelay` (0)                                                  |
| `ScPopoverNextPortal`      | `ng-template[scPopoverNextPortal]` | The content, rendered while open                                                                                                                                |
| `ScPopoverNext`            | `div[scPopoverNext]`               | The popover: `role="dialog"`, named by its title, described by its description, `data-side`, animated                                                           |
| `ScPopoverNextHeader`      | `div[scPopoverNextHeader]`         | Its title and description, together                                                                                                                             |
| `ScPopoverNextTitle`       | `[scPopoverNextTitle]`             | Names it; the heading level is yours                                                                                                                            |
| `ScPopoverNextDescription` | `p[scPopoverNextDescription]`      | Describes it                                                                                                                                                    |
| `ScPopoverNextClose`       | `button[scPopoverNextClose]`       | Closes it: the preset's button (ghost, icon-xs); name it                                                                                                        |

`origin` anchors it on something else than the trigger — an input group, as the date pickers do (their own trigger sets `open`).

## Keyboard and screen readers

- Opening moves focus into it (its first field, or the one marked `cdkFocusInitial`); closing gives it back to the trigger. Escape or a press outside closes it.
- `modal`: `false` (Base UI's default) — Tab out of it closes it and goes on from the trigger; `'trap-focus'` — Tab stays inside; `true` — and the page behind takes no scroll or click.
- `openOnHover` is for extra help (an infotip): a click opens it too, so touch and keyboard users reach it — unlike a tooltip.

## Shared with Tooltip

The logical sides and the side placed after a flip (`utils/overlay-positions`), and the hover timing (`ScOpenDelay`, `utils/open-delay`).
