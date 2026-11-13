# Tooltip

A short label shown when the pointer rests on a control or the keyboard reaches it — as Base UI's Tooltip (parts, behaviour) in the look of the app's preset (`tooltip` key: shadcn's in each of the eight styles). Its content is yours: text, a `kbd`, anything short.

## Usage

```html
<div scTooltipProvider side="top">
  <button scButton scTooltipTrigger variant="outline" size="icon">
    <svg siSaveIcon></svg>
    <span class="sr-only">Save</span>
  </button>
  <ng-template scTooltipPortal>
    <div scTooltip>
      Save changes <kbd scKbd>S</kbd>
      <span scTooltipArrow></span>
    </div>
  </ng-template>
</div>
```

## Parts

| Part                | Selector                       | What it does                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScTooltipProvider` | `div[scTooltipProvider]`       | `[(open)]`, `side` (`top`, `bottom`, `left`, `right`, `inline-start`, `inline-end`; flips without room), `alignment` (`start`, `center` default, `end`; logical: `start` is the reading start, flipped right to left; no `left` / `right`), `sideOffset` (4: px from the side), `alignmentOffset` (0: px along it, toward its end), `delay` (600), `closeDelay` (0), `disabled` |
| `ScTooltipTrigger`  | `[scTooltipTrigger]`           | Your control: the pointer's hover opens it after the delay, keyboard focus at once; leaving, blur, a click and Escape close it; `aria-describedby` while open                                                                                                                                                                                                                   |
| `ScTooltipPortal`   | `ng-template[scTooltipPortal]` | The content, rendered while open                                                                                                                                                                                                                                                                                                                                                |
| `ScTooltip`         | `div[scTooltip]`               | The tooltip: `role="tooltip"`, `data-side` (physical: `top`, `right`, `bottom`, `left` — the side it landed on, after a flip), the preset's look; the pointer can move onto it; animates in and out                                                                                                                                                                             |
| `ScTooltipArrow`    | `span[scTooltipArrow]`         | Your arrow, on the side towards the trigger                                                                                                                                                                                                                                                                                                                                     |
| `ScTooltipGroup`    | `[scTooltipGroup]`             | Tooltips side by side (a toolbar): once one has shown, the next opens at once and the one before closes (`timeout`, 400)                                                                                                                                                                                                                                                        |

`scTooltip` and `scTooltipArrow` read `SC_TOOLTIP_CONTEXT` (its id, its side, keep open / hide soon): the provider gives it, and a component that shows a tooltip of its own can too — the Sidebar's collapsed menu buttons use these parts, not copies.

## Keyboard and screen readers

- A tooltip is a visual aid: name the trigger itself (its text, or `sr-only` text). While open it is the trigger's description (`role="tooltip"`, `aria-describedby`).
- Keyboard focus opens it at once; Escape, blur or a click closes it. The pointer can move onto it without closing it (WCAG 1.4.13).
- It doesn't open on touch: what matters goes in the page, or in a Popover.
- A disabled button to explain: `scButton` with `disabled` and `softDisabled` — it keeps its focus and hover.

## Not shadcn's

- **One way**: no text shortcut (`[scTooltipTrigger]="'…'"`, the old Tooltip's); the content is your markup. The sidebar's `tooltip` on its menu buttons is its own (docs/todo.md).
- **The arrow is your part** (shadcn's content draws it).
- **Base UI's delay** (600 ms): shadcn's provider sets 0.
