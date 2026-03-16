# Stepper

A multi-step wizard component for guiding users through a process.

## Usage

```html
<div scStepper [(activeStep)]="currentStep">
  <div scStepperList>
    <div scStepperItem [step]="0" #item0="scStepperItem">
      <button scStepperTrigger>
        @if (item0.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>1</span>
        }
      </button>
      <div class="flex flex-col">
        <span scStepperTitle>Step 1</span>
        <span scStepperDescription>First step</span>
      </div>
    </div>
    <div scStepperSeparator [step]="0"></div>
    <div scStepperItem [step]="1" #item1="scStepperItem">
      <button scStepperTrigger>
        @if (item1.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>2</span>
        }
      </button>
      <div class="flex flex-col">
        <span scStepperTitle>Step 2</span>
        <span scStepperDescription>Second step</span>
      </div>
    </div>
  </div>

  <!-- Eager: always in DOM, hidden when inactive -->
  <div scStepperPanel [step]="0">Step 1 content</div>

  <!-- Lazy: content only created when step is active -->
  <div scStepperPanel [step]="1">
    <ng-template scStepperContent>Step 2 content (lazy)</ng-template>
  </div>

  <button scButton scStepperPrevious variant="outline">Previous</button>
  <button scButton scStepperNext>Next</button>
</div>
```

## Components

### ScStepper

Root container directive that manages step state.

**Selector:** `[scStepper]`

**Inputs:**

| Input         | Type                         | Default        | Description            |
| ------------- | ---------------------------- | -------------- | ---------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation     |
| `class`       | `string`                     | `''`           | Additional CSS classes |

**Two-way Bindings:**

| Binding      | Type     | Default | Description         |
| ------------ | -------- | ------- | ------------------- |
| `activeStep` | `number` | `0`     | Current active step |

**Methods:**

| Method                   | Description                 |
| ------------------------ | --------------------------- |
| `goToStep(step: number)` | Navigate to a specific step |
| `nextStep()`             | Go to next step             |
| `prevStep()`             | Go to previous step         |
| `isStepComplete(step)`   | Check if step is complete   |
| `isStepActive(step)`     | Check if step is active     |

### ScStepperList

Container for step indicators.

**Selector:** `[scStepperList]`

### ScStepperItem

Individual step indicator. Exposes its state for template use via `exportAs`.

**Selector:** `[scStepperItem]`
**Export As:** `scStepperItem`

**Inputs:**

| Input   | Type     | Required | Description          |
| ------- | -------- | -------- | -------------------- |
| `step`  | `number` | Yes      | Step index (0-based) |
| `class` | `string` | No       | Additional CSS       |

**Computed:**

| Property | Type     | Description                            |
| -------- | -------- | -------------------------------------- |
| `state`  | `Signal` | `'complete' \| 'active' \| 'inactive'` |

**Data Attributes:**

| Attribute    | Values                                 |
| ------------ | -------------------------------------- |
| `data-state` | `'complete' \| 'active' \| 'inactive'` |

### ScStepperTrigger

Clickable step button directive. The consumer provides the trigger content (step number, check icon, etc.).

**Selector:** `button[scStepperTrigger]`
**Export As:** `scStepperTrigger`

**Data Attributes:**

| Attribute    | Values                                 |
| ------------ | -------------------------------------- |
| `data-state` | `'complete' \| 'active' \| 'inactive'` |

### ScStepperSeparator

Visual line between steps. Automatically adapts to the stepper orientation.

**Selector:** `[scStepperSeparator]`

**Inputs:**

| Input   | Type     | Required | Description                                            |
| ------- | -------- | -------- | ------------------------------------------------------ |
| `step`  | `number` | No       | Step index (for horizontal separators outside an item) |
| `class` | `string` | No       | Additional CSS                                         |

**Data Attributes:**

| Attribute    | Values                     |
| ------------ | -------------------------- |
| `data-state` | `'complete' \| 'inactive'` |

### ScStepperPanel

Eager content panel for a step. Always in the DOM, hidden via `[hidden]` when not active.

**Selector:** `[scStepperPanel]`

**Inputs:**

| Input   | Type     | Required | Description          |
| ------- | -------- | -------- | -------------------- |
| `step`  | `number` | Yes      | Step index (0-based) |
| `class` | `string` | No       | Additional CSS       |

### ScStepperContent

Lazy content directive used inside `ScStepperPanel` with `ng-template`. Content is only created when the step becomes active and destroyed when navigating away.

**Selector:** `ng-template[scStepperContent]`

### ScStepperTitle

Title text for a step.

**Selector:** `[scStepperTitle]`

### ScStepperDescription

Description text for a step.

**Selector:** `[scStepperDescription]`

### ScStepperPrevious

Directive for the previous step button. Auto-disables on first step. Use with `scButton` for styling.

**Selector:** `button[scStepperPrevious]`

### ScStepperNext

Directive for the next step button. Use with `scButton` for styling.

**Selector:** `button[scStepperNext]`

## Examples

### Horizontal Stepper with Content

```html
<div scStepper [(activeStep)]="step">
  <div scStepperList>
    <div scStepperItem [step]="0" #item0="scStepperItem">
      <button scStepperTrigger>
        @if (item0.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>1</span>
        }
      </button>
      <div class="flex flex-col">
        <span scStepperTitle>Account</span>
        <span scStepperDescription>Create your account</span>
      </div>
    </div>
    <div scStepperSeparator [step]="0"></div>
    <div scStepperItem [step]="1" #item1="scStepperItem">
      <button scStepperTrigger>
        @if (item1.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>2</span>
        }
      </button>
      <div class="flex flex-col">
        <span scStepperTitle>Profile</span>
        <span scStepperDescription>Set up your profile</span>
      </div>
    </div>
    <div scStepperSeparator [step]="1"></div>
    <div scStepperItem [step]="2" #item2="scStepperItem">
      <button scStepperTrigger>
        @if (item2.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>3</span>
        }
      </button>
      <div class="flex flex-col">
        <span scStepperTitle>Complete</span>
        <span scStepperDescription>Review and submit</span>
      </div>
    </div>
  </div>

  <div scStepperPanel [step]="0">Account form...</div>
  <div scStepperPanel [step]="1">Profile form...</div>

  <div scStepperPanel [step]="2">
    <ng-template scStepperContent>Review...</ng-template>
  </div>

  <div class="flex justify-between">
    <button scButton scStepperPrevious variant="outline" size="lg">Previous</button>
    <button scButton scStepperNext size="lg">Next</button>
  </div>
</div>
```

### Vertical Stepper

```html
<div scStepper orientation="vertical" [(activeStep)]="step">
  <div scStepperList>
    <div scStepperItem [step]="0" #item0="scStepperItem">
      <div class="flex flex-col items-center">
        <button scStepperTrigger>
          @if (item0.state() === 'complete') {
          <svg siCheckIcon class="size-4"></svg>
          } @else {
          <span>1</span>
          }
        </button>
        <div scStepperSeparator></div>
      </div>
      <div class="flex flex-col pb-4">
        <span scStepperTitle>Step 1</span>
        <span scStepperDescription>First step</span>
        @if (step() === 0) {
        <div class="bg-muted mt-4 rounded-lg p-4">
          <p class="text-sm">Step 1 content</p>
        </div>
        }
      </div>
    </div>
    <div scStepperItem [step]="1" #item1="scStepperItem">
      <div class="flex flex-col items-center">
        <button scStepperTrigger>
          @if (item1.state() === 'complete') {
          <svg siCheckIcon class="size-4"></svg>
          } @else {
          <span>2</span>
          }
        </button>
      </div>
      <div class="flex flex-col">
        <span scStepperTitle>Step 2</span>
        <span scStepperDescription>Second step</span>
      </div>
    </div>
  </div>

  <div class="flex justify-between">
    <button scButton scStepperPrevious variant="outline" size="lg">Previous</button>
    <button scButton scStepperNext size="lg">Next</button>
  </div>
</div>
```

### Simple Number Steps

```html
<div scStepper [(activeStep)]="step">
  <div scStepperList>
    <div scStepperItem [step]="0" #item0="scStepperItem">
      <button scStepperTrigger>
        @if (item0.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>1</span>
        }
      </button>
    </div>
    <div scStepperSeparator [step]="0"></div>
    <div scStepperItem [step]="1" #item1="scStepperItem">
      <button scStepperTrigger>
        @if (item1.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>2</span>
        }
      </button>
    </div>
    <div scStepperSeparator [step]="1"></div>
    <div scStepperItem [step]="2" #item2="scStepperItem">
      <button scStepperTrigger>
        @if (item2.state() === 'complete') {
        <svg siCheckIcon class="size-4"></svg>
        } @else {
        <span>3</span>
        }
      </button>
    </div>
  </div>

  <button scButton scStepperPrevious variant="outline">Back</button>
  <button scButton scStepperNext>Continue</button>
</div>
```

## Features

- **Horizontal/Vertical**: Supports both orientations
- **Click Navigation**: Click any step trigger to navigate directly
- **Step States**: Complete, active, and inactive visual states via `data-state`
- **Auto-disable**: Previous button disabled on first step
- **Composable Triggers**: Consumer provides trigger content (numbers, icons, custom elements)
- **Composable Buttons**: Previous/Next are directives — combine with `scButton` for styling
- **Two-way Binding**: Sync step state with `[(activeStep)]`
- **Separator State**: Separator line changes color when its step is complete
- **Lazy Content**: `ScStepperContent` inside `ScStepperPanel` uses `ng-template` to lazily render step content
- **Eager Content**: `ScStepperPanel` keeps content in the DOM, toggling visibility

## Accessibility

- Uses `role="tablist"` for step list
- Uses `role="tab"` for step triggers
- Uses `role="tabpanel"` for step panels
- `aria-selected` indicates active step
- `aria-disabled` on previous button when on first step
- Keyboard navigation via Tab key
