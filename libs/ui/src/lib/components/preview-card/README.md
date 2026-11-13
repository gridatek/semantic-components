# Preview Card

A preview of a link's destination, shown on hover or keyboard focus — shadcn's Hover Card (Base UI's Preview Card) in the look of the app's preset (`previewCard` key: shadcn's in each of the eight styles).

## Usage

```html
<div scPreviewCardProvider>
  <a scLink variant="link" href="https://nextjs.org" scPreviewCardTrigger> Hover Here </a>
  <ng-template scPreviewCardPortal>
    <div scPreviewCard>…</div>
  </ng-template>
</div>
```

## Parts

| Part                    | Selector                                                  | What it does                                                                                                                                                                                                                                                                                                             |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScPreviewCardProvider` | `div[scPreviewCardProvider]`                              | `[(open)]`, `side` (`bottom`, `top`, `left`, `right`, `inline-start`, `inline-end`), `alignment` (`start`, `center` default, `end`; logical: `start` is the reading start, flipped right to left; no `left` / `right`), `sideOffset` (4: px from the side), `alignmentOffset` (0: px along it, toward its end), `origin` |
| `ScPreviewCardTrigger`  | `a[scPreviewCardTrigger]`, `button[scPreviewCardTrigger]` | Your link (or button): `delay` (600), `closeDelay` (300); `data-popup-open` while open                                                                                                                                                                                                                                   |
| `ScPreviewCardPortal`   | `ng-template[scPreviewCardPortal]`                        | The content, rendered while open                                                                                                                                                                                                                                                                                         |
| `ScPreviewCard`         | `div[scPreviewCard]`                                      | The card in the preset's look; `data-side` (physical: `top`, `right`, `bottom`, `left` — the side it landed on, after a flip); animates in and out                                                                                                                                                                       |

## Keyboard and screen readers

- A visual preview, for sighted mouse and keyboard users (Base UI's guidance): the link is the only thing to reach. The card has no role, isn't linked to its trigger and takes no focus, so a screen reader isn't led through it at every link.
- Keep it supplementary: what it shows must be at the link's destination too.
- Hover opens it after the trigger's `delay`, keyboard focus at once. Leaving (after `closeDelay`), blur, Escape or a press outside close it. The pointer can move onto it. A touch only follows the link.

## Not shadcn's

- **Angular's animations**: the card fades, zooms and slides with `animate.enter` / `animate.leave` (tw-animate's `animate-in` / `animate-out`); shadcn's `data-open:` / `data-closed:` classes are left out of the preset.
- **The CDK places it** (`cdkConnectedOverlay`), with the sides and hover timing shared with Tooltip and Popover (`utils/overlay-positions`, `utils/open-delay`).
- **One card per trigger**: Base UI's detached triggers (`handle`, `payload`), its Viewport, Arrow and Backdrop aren't taken — shadcn uses none of them.
