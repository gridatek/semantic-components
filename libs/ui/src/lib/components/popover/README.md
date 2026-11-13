# Popover

Rich content in a panel beside its trigger — a dialog, modal or not, opened by a click or a hover — as Base UI's Popover (parts, behaviour) in the look of the app's preset (`popover` key: shadcn's in each of the eight styles).

## Usage

```html
<div scPopoverProvider alignment="start">
  <button scButton scPopoverTrigger variant="outline">Open Popover</button>
  <ng-template scPopoverPortal>
    <div scPopover class="w-64">
      <div scPopoverHeader>
        <h2 scPopoverTitle>Dimensions</h2>
        <p scPopoverDescription>Set the dimensions for the layer.</p>
      </div>
      …
    </div>
  </ng-template>
</div>
```

## Parts

| Part                   | Selector                                          | What it does                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPopoverProvider`    | `div[scPopoverProvider], span[scPopoverProvider]` | `[(open)]`, `modal` (`false`, `'trap-focus'`, `true`), `side` (`bottom`, `top`, `left`, `right`, `inline-start`, `inline-end`), `alignment` (`start`, `center` default, `end`; logical: `start` is the reading start, flipped right to left; no `left` / `right`), `sideOffset` (4: px from the side), `alignmentOffset` (0: px along it, toward its end), `origin` |
| `ScPopoverTrigger`     | `button[scPopoverTrigger]`                        | Toggles it (`aria-haspopup`, `aria-expanded`, `aria-controls`); `openOnHover`, `delay` (300), `closeDelay` (0)                                                                                                                                                                                                                                                      |
| `ScPopoverPortal`      | `ng-template[scPopoverPortal]`                    | The content, rendered while open                                                                                                                                                                                                                                                                                                                                    |
| `ScPopover`            | `div[scPopover]`                                  | The popover: `role="dialog"`, named by its title, described by its description, `data-side` (physical: `top`, `right`, `bottom`, `left` — the side it landed on, after a flip), animated                                                                                                                                                                            |
| `ScPopoverHeader`      | `div[scPopoverHeader]`                            | Its title and description, together                                                                                                                                                                                                                                                                                                                                 |
| `ScPopoverTitle`       | `[scPopoverTitle]`                                | Names it; the heading level is yours                                                                                                                                                                                                                                                                                                                                |
| `ScPopoverDescription` | `p[scPopoverDescription]`                         | Describes it                                                                                                                                                                                                                                                                                                                                                        |
| `ScPopoverClose`       | `button[scPopoverClose]`                          | Closes it: the preset's button (ghost, icon-xs); name it                                                                                                                                                                                                                                                                                                            |

`scPopoverProvider`: On a `span`, it fits in running text — inside a `<p>`, where a `div` is not allowed; it renders `display: contents` either way.

`origin` anchors it on something else than the trigger — an input group, as the date pickers do (their own trigger sets `open`).

## Keyboard and screen readers

- Opening moves focus into it (its first field, or the one marked `cdkFocusInitial`); closing gives it back to the trigger. Escape or a press outside closes it.
- `modal`: `false` (Base UI's default) — Tab out of it closes it and goes on from the trigger; `'trap-focus'` — Tab stays inside; `true` — and the page behind takes no scroll or click.
- `openOnHover` is for extra help (an infotip): a click opens it too, so touch and keyboard users reach it — unlike a tooltip.

## Shared with Tooltip

The logical sides and the side placed after a flip (`utils/overlay-positions`), and the hover timing (`ScOpenDelay`, `utils/open-delay`).
