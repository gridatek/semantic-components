# Stepper

A multi-step wizard, built from directives on [`@angular/cdk/stepper`](https://material.angular.dev/cdk/stepper). The CDK owns the state — the current step, linear mode, validation, completed / optional / editable steps — and the keyboard of the step list; the parts add the tab semantics.

## Usage

```html
<div scStepper [(selectedIndex)]="step">
  <div scStepperList>
    <div scStepperItem #account="scStepperItem">
      <button scStepperTrigger>
        <span scStepperIndicator>
          @if (account.status() === 'complete') {
          <svg siCheckIcon></svg>
          } @else { 1 }
        </span>
        <span scStepperTitle>Account</span>
      </button>
    </div>
    <div scStepperSeparator [step]="0"></div>
    <div scStepperItem #profile="scStepperItem">
      <button scStepperTrigger>
        <span scStepperIndicator>
          @if (profile.status() === 'complete') {
          <svg siCheckIcon></svg>
          } @else { 2 }
        </span>
        <span scStepperTitle>Profile</span>
      </button>
    </div>
  </div>

  <div scStepperPanel [step]="0">Account content</div>
  <div scStepperPanel [step]="1">Profile content</div>

  <button scStepperPrevious>Previous</button>
  <button scStepperNext>Next</button>
</div>
```

Steps are numbered by the stepper in DOM order — items take no index. Panels and separators outside an item say which step they belong to with `[step]`. Every step needs a panel (each tab controls one), and panels go outside `scStepperList`.

### Linear, with validation

Give each step a `stepControl` (a Signal Forms field). In `linear` mode a step can't be left while it's invalid — neither with Next nor by clicking a later step — and a refused Next marks the step's fields as touched so their errors show.

```html
<form [formRoot]="signupForm">
  <div scStepper linear [(selectedIndex)]="step" #stepper="scStepper">
    <div scStepperList>
      <div scStepperItem [stepControl]="signupForm.account" #account="scStepperItem">
        <button scStepperTrigger>
          <span scStepperIndicator>
            @switch (account.status()) { @case ('complete') {
            <svg siCheckIcon></svg>
            } @case ('error') {
            <svg siXIcon></svg>
            } @default { 1 } }
          </span>
          <span scStepperTitle>Account</span>
        </button>
      </div>
      …
    </div>

    <div scStepperPanel [step]="0">
      <div scField>
        <label scLabel>Email</label>
        <input scInput type="email" [formField]="signupForm.account.email" />
        <div scFieldErrors></div>
      </div>
    </div>
    …

    <button scStepperPrevious>Back</button>
    @if (stepper.isLastStep()) {
    <button scButton type="button" (click)="submit()">Create account</button>
    } @else {
    <button scStepperNext>Next</button>
    }
  </div>
</form>
```

```typescript
readonly model = signal({ account: { email: '' }, profile: { name: '' } });
readonly signupForm = form(this.model, (s) => {
  required(s.account.email);
  email(s.account.email);
  required(s.profile.name);
});
```

## Parts

### ScStepper — `[scStepper]` (`exportAs: 'scStepper'`)

Hosts the CDK's `CdkStepper`.

| Input         | Type                         | Default        | Description                      |
| ------------- | ---------------------------- | -------------- | -------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout and arrow keys            |
| `linear`      | `boolean`                    | `false`        | Steps must be completed in order |
| `class`       | `string`                     | `''`           | Additional CSS classes           |

| Model / output      | Type                    | Description                                   |
| ------------------- | ----------------------- | --------------------------------------------- |
| `[(selectedIndex)]` | `number`                | Current step (0-based)                        |
| `(selectionChange)` | `StepperSelectionEvent` | From the CDK: previous and new step and index |

Signals: `selectedIndex()`, `stepCount()`. Methods: `next()`, `previous()`, `goToStep(index)`, `reset()` (first step, every step and its form reset), `isFirstStep()`, `isLastStep()`, `isStepComplete(index)`, `isStepActive(index)`. The CDK stepper itself is `cdk`.

### ScStepperList — `[scStepperList]`

The row of steps: `role="tablist"`, one Tab stop, arrow keys between steps (the CDK's focus manager).

### ScStepperItem — `[scStepperItem]` (`exportAs: 'scStepperItem'`)

One step — a `CdkStep`, with its inputs. It's an attribute component (only components can extend `CdkStep`), used like a directive: it just projects its content.

| Input         | Type               | Default | Description                                            |
| ------------- | ------------------ | ------- | ------------------------------------------------------ |
| `stepControl` | Signal Forms field | —       | The step is complete when it's valid (and was visited) |
| `optional`    | `boolean`          | `false` | Can be skipped in linear mode                          |
| `editable`    | `boolean`          | `true`  | Can be revisited once completed                        |
| `completed`   | `boolean`          | —       | Overrides the computed completion                      |
| `hasError`    | `boolean`          | —       | Overrides the computed error                           |
| `class`       | `string`           | `''`    | Additional CSS classes                                 |

`status()`: `'active' | 'complete' | 'error' | 'inactive'` (also as `data-state`); `index()`: its position. (`status`, not `state`: `state` is a `CdkStep` input.)

### ScStepperTrigger — `button[scStepperTrigger]`

The clickable step header (`role="tab"`, a CDK `CdkStepHeader`). Disabled — still focusable — while the step can't be reached (linear mode, an earlier step incomplete). Holds the indicator and, ideally, the title (it names the tab).

### ScStepperIndicator — `[scStepperIndicator]` (`exportAs: 'scStepperIndicator'`)

The step's circle: border and colors follow the step's status (including `error`), icons inside are sized for you. The content is yours — `state()` and `step()` help you choose it.

### ScStepperSeparator — `[scStepperSeparator]`

The line after a step; filled once that step is completed. `[step]` when it's outside the item. Hidden from assistive technology.

### ScStepperPanel — `[scStepperPanel]`

The content of step `[step]` (`role="tabpanel"`, labelled by its step), shown while that step is current. Hidden panels keep their content.

### ScStepperTitle / ScStepperDescription

Text for a step.

### ScStepperPrevious / ScStepperNext — `button[scStepperPrevious]` / `button[scStepperNext]`

Previous is disabled on the first step. Next respects linear mode and validation. Each styles itself (Next `default`, Previous `outline`; change it with `variant` and `size`).

## Accessibility

- The step list is a `role="tablist"` (`aria-orientation` from the orientation); triggers are `role="tab"` with `aria-selected` and `aria-controls`; panels are `role="tabpanel"` labelled by their step. Put the title inside the trigger so each tab has a name.
- One Tab stop for the step list: ←/→ (↑/↓ when vertical) move between steps, Home/End go to the first/last step. Steps that can't be reached yet are `aria-disabled`.
- In linear mode a refused Next shows the step's field errors; the indicator switches to the error state.
