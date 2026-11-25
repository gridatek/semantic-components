# Stepper

A flow in steps — sign-up, checkout, a form too long for one screen: each step a tab and its panel, in order if you like (`linear`), each step's Signal Forms field valid before the next. It looks like the [Timeline](../timeline/README.md) and speaks its words; the parts after Ark UI's Steps and Reka UI's Stepper, the keyboard the tabs pattern.

## Usage

```html
<div scStepper [(selectedIndex)]="step">
  <div scStepperList aria-label="Sign-up steps">
    @for (s of steps; track s.title) {
    <div scStepperItem #item="scStepperItem">
      <button scStepperTrigger>
        <span scStepperIndicator>
          @if (item.status() === 'complete') {
          <svg siCheckIcon></svg>
          } @else { {{ $index + 1 }} }
        </span>
        <span scStepperTitle>{{ s.title }}</span>
        <span scStepperDescription>{{ s.description }}</span>
      </button>
      <div scStepperConnector></div>
    </div>
    }
  </div>

  @for (s of steps; track s.title) {
  <div scStepperPanel [step]="$index">…</div>
  }

  <button scStepperPrevious>Back</button>
  <button scStepperNext>Continue</button>
</div>
```

Steps are numbered in page order (they register with the root, as the Carousel's slides). A panel says which step it belongs to with `[step]`; panels go after the list.

## Linear, with a form

```html
<form [formRoot]="signupForm">
  <div scStepper linear [(selectedIndex)]="step" #stepper="scStepper">
    <div scStepperList aria-label="Sign-up steps">
      <div scStepperItem [stepControl]="signupForm.account" #account="scStepperItem">
        <button scStepperTrigger>
          <span scStepperIndicator> @switch (account.status()) { @case ('complete') { <svg siCheckIcon></svg> } @case ('failed') { <svg siXIcon></svg> } @default { 1 } } </span>
          <span scStepperTitle>Account</span>
        </button>
        <div scStepperConnector></div>
      </div>
      …
    </div>
    … @if (stepper.isLastStep()) {
    <button scButton type="button" (click)="submit()">Create account</button>
    } @else {
    <button scStepperNext>Next</button>
    }
  </div>
</form>
```

- A step with a `stepControl` is complete once it is valid and has been left once (visited); without one, once visited; `completed` and `hasError` override.
- `linear`: a step can't be passed while one before it isn't complete — by Next, a later trigger or the keys. A refused Next marks the step's fields as touched, so their errors show.
- `optional` steps may be skipped; `editable` false: a complete step can't be gone back to.
- `status()`: `current` (shown), `failed` (left invalid), `complete`, `upcoming` — the Timeline's words, also `data-current`, `data-failed`, `data-complete`, `data-upcoming` on the item.

## Parts

| Part                                     | Selector                                             | What it does                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScStepper`                              | `div[scStepper]`                                     | `[(selectedIndex)]` (from 0), `orientation`, `linear`. exportAs `scStepper`: `steps()`, `stepCount()`, `isFirstStep()`, `isLastStep()`, `focusIndex`, `next()`, `previous()`, `goToStep(i)` (whether it moved), `reset()`, `canReach(i)`. Sets `--sc-stepper-indicator`. |
| `ScStepperList`                          | `div[scStepperList]`                                 | A tablist (name it): one Tab stop; ← → (mirrored right to left), ↑ ↓ when vertical, Home, End move focus, and the step shown follows when it can be reached.                                                                                                             |
| `ScStepperItem`                          | `div[scStepperItem]`                                 | A step: `stepControl`, `optional`, `editable` (true), `completed`, `hasError`. exportAs `scStepperItem`: `status()`, `index()`, `isLast()`, `current()`, `complete()`, `failed()`, `visited`, `reachable()`.                                                             |
| `ScStepperTrigger`                       | `button[scStepperTrigger]`                           | The step's tab (`aria-selected`, `aria-controls`, `aria-posinset`/`setsize`); `aria-disabled` while it can't be reached, still focusable. A grid: the indicator, then the title over the description. The Timeline item's corners and focus ring.                        |
| `ScStepperIndicator`                     | `span[scStepperIndicator]`                           | Its mark (your number or icon): as the Timeline's markers — filled when complete, ringed when current, muted when upcoming, destructive when failed. As large as the style's icon buttons, its number in the button's text size.                                         |
| `ScStepperTitle`, `ScStepperDescription` | `span[scStepperTitle]`, `span[scStepperDescription]` | In the trigger: its name (it names the tab) and a line under it — the Timeline's title and time.                                                                                                                                                                         |
| `ScStepperConnector`                     | `div[scStepperConnector]`                            | The line to the next step, after the trigger: across, it fills the room; down, it runs under the indicator. The primary colour once its step is complete, the Timeline's line otherwise; none after the last; hidden from screen readers.                                |
| `ScStepperPanel`                         | `div[scStepperPanel]`                                | Step `[step]`'s content, a tabpanel named by its trigger; shown while that step is (hidden ones keep their content).                                                                                                                                                     |
| `ScStepperPrevious`, `ScStepperNext`     | `button[…]`                                          | The style's button (`outline` / `default`, size `default`): the previous step (disabled on the first), the next (refused: the step's errors show).                                                                                                                       |

## Look

No key of its own: the style's `timeline` (marker corners and ring, line colour, item corners and focus ring, title and time) and its button (the indicator's size, `size-7` to `size-10`, and text size). State classes are plain, chosen in code.

- `--sc-stepper-indicator` (on the root): the indicators' size; the vertical connector centres on it.

## Keyboard and screen readers

- The list is a tablist, each trigger a tab, each panel its tabpanel. Put the title in the trigger: it names the tab (hide it with `sr-only` for numbers only).
- One Tab stop: the step shown's trigger, then the one focused last. Arrows, Home and End move between steps; the step shown follows when it can be reached.
- A step that can't be reached is `aria-disabled`, still focusable.

## Why not the CDK stepper

It was built on `@angular/cdk/stepper` (2026-11-24 rewrite): that needed its private APIs (`_onKeydown`, `_getFocusIndex`, `_getStepLabelId`), a lifecycle hook and an item component extending `CdkStep`. The state is a few signals; the rules (linear, editable, optional, completed) are the CDK's.
