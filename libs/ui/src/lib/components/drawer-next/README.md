# Drawer Next

A panel at the edge of the screen that a swipe dismisses — or moves between its snap points. shadcn's Drawer (Base UI's Drawer) in the look of the app's preset (`drawer` key: shadcn's in each of the eight styles).

## Usage

```html
<div scDrawerNextProvider [(open)]="open">
  <button scButton scDrawerNextTrigger variant="outline">Edit profile</button>
  <ng-template scDrawerNextPortal>
    <div scDrawerNext>
      <div scDrawerNextHandle></div>
      <div scDrawerNextHeader>
        <h2 scDrawerNextTitle>Edit profile</h2>
        <p scDrawerNextDescription>Make changes to your profile here.</p>
      </div>
      …
      <div scDrawerNextFooter>
        <button scButton (click)="save()">Save changes</button>
        <button scDrawerNextClose>Cancel</button>
      </div>
    </div>
  </ng-template>
</div>
```

## Parts

| Part                      | Selector                                                | What it does                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScDrawerNextProvider`    | `div[scDrawerNextProvider]`                             | `[(open)]`, `swipeDirection` (`down`, `up`, `left`, `right`, `inline-start`, `inline-end`), `snapPoints` and `[(snapPoint)]`, `modal` (`true`, `'trap-focus'`, `false`), `disablePointerDismissal` |
| `ScDrawerNextTrigger`     | `button[scDrawerNextTrigger]`                           | Opens and closes it, on any button (`aria-haspopup`, `aria-expanded`)                                                                                                                              |
| `ScDrawerNextPortal`      | `ng-template[scDrawerNextPortal]`                       | The content, rendered while open                                                                                                                                                                   |
| `ScDrawerNext`            | `div[scDrawerNext]`                                     | The panel: `role="dialog"`, `aria-modal` when modal, named and described; `data-swipe-direction`, `data-swipe-axis`, `data-snap-points`, `data-nested-drawer-open`, `data-swiping`                 |
| `ScDrawerNextHandle`      | `div[scDrawerNextHandle]`, `button[scDrawerNextHandle]` | The bar to drag it by. A `div` is hidden from screen readers; a `button` (named by you) moves to the next snap point                                                                               |
| `ScDrawerNextHeader`      | `div[scDrawerNextHeader]`                               | Its title and description                                                                                                                                                                          |
| `ScDrawerNextTitle`       | `h2[scDrawerNextTitle]`                                 | Names it                                                                                                                                                                                           |
| `ScDrawerNextDescription` | `p[scDrawerNextDescription]`                            | Describes it                                                                                                                                                                                       |
| `ScDrawerNextFooter`      | `div[scDrawerNextFooter]`                               | Its actions, at the bottom                                                                                                                                                                         |
| `ScDrawerNextClose`       | `button[scDrawerNextClose]`                             | Closes it: the preset's button, outline by default                                                                                                                                                 |

## Swiping

- It follows a drag towards its edge; let go, it closes (past half its size, or flicked), or settles back. Dragged the other way it stretches a little.
- A mouse drags it by its handle or the panel's own edges — text inside stays selectable. A finger or a pen drags from anywhere but a field. `data-swipe-ignore` keeps an element's drags its own.
- **Snap points**: heights it rests at, fractions of the screen (0–1) or pixels, smallest first. It opens at the first; let go, it rests at the nearest one where the drag would have brought it, or closes below half the first.
- **Nested**: a drawer opened from inside another stacks on it; the one behind shrinks and dims, and doesn't swipe, until the front one closes.

## Keyboard and screen readers

- A dialog, named by its title and described by its description (when it has them).
- Modal (the default): a backdrop, focus held, the page still. `'trap-focus'`: focus held, the page usable. `false`: neither — focus still moves in and back.
- Escape closes the front drawer; a press outside too, unless `disablePointerDismissal`. Closing gives focus back to the trigger.
- Swiping is for the pointer: from the keyboard, Escape or its close button; a handle on a button steps through the snap points.
- In a right-to-left page its text follows (`dir` and `lang` carried from where it was opened); `inline-start` is the right.

## Not shadcn's

- **Angular's animations**: the panel slides in and out from its edge with `animate.enter` / `animate.leave` (tw-animate's `animate-in` / `animate-out`, `slide-in-from-*` / `slide-out-to-*`). A swipe's leave starts where it was let go (tw-animate's exit has only an end state).
- **Mechanics in the part, look in the preset**: Base UI's CSS variables (`--drawer-swipe-movement-*`, `--stack-*`) aren't used; the part sets the panel's transform. The preset keeps colours, corners, borders and the handle's bar.
- **A simpler stack**: the drawer behind scales to 95% and dims; Base UI's peek and height matching aren't copied.
- **Physical swipe directions** (as Base UI), plus `inline-start` / `inline-end`, resolved by the page's direction.
- **The responsive example is composition**: a Dialog on wide screens, a Drawer on phones, on one `open` signal and a media query in your component.
