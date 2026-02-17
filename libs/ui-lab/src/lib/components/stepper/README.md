# Stepper

A multi-step wizard component for guiding users through a process.

## Usage

```html
<div scStepper [(activeStep)]="currentStep">
  <div scStepperList>
    <div scStepperItem [step]="0">
      <button scStepperTrigger></button>
      <span scStepperTitle>Step 1</span>
    </div>
    <div scStepperSeparator></div>
    <div scStepperItem [step]="1">
      <button scStepperTrigger></button>
      <span scStepperTitle>Step 2</span>
    </div>
  </div>

  <div scStepperContent [step]="0">Step 1 content</div>
  <div scStepperContent [step]="1">Step 2 content</div>

  <button scStepperPrevious>Previous</button>
  <button scStepperNext>Next</button>
</div>
```

## Components

### ScStepper

Root container that manages step state.

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

Individual step indicator.

**Selector:** `[scStepperItem]`

**Inputs:**

| Input   | Type     | Required | Description          |
| ------- | -------- | -------- | -------------------- |
| `step`  | `number` | Yes      | Step index (0-based) |
| `class` | `string` | No       | Additional CSS       |

**Data Attributes:**

| Attribute    | Values                                 |
| ------------ | -------------------------------------- |
| `data-state` | `'complete' \| 'active' \| 'inactive'` |

### ScStepperTrigger

Clickable step button with number or check icon.

**Selector:** `button[scStepperTrigger]`

### ScStepperSeparator

Visual line between steps.

**Selector:** `[scStepperSeparator]`

**Data Attributes:**

| Attribute    | Values                     |
| ------------ | -------------------------- |
| `data-state` | `'complete' \| 'inactive'` |

### ScStepperContent

Content panel for a step.

**Selector:** `[scStepperContent]`

**Inputs:**

| Input   | Type     | Required | Description          |
| ------- | -------- | -------- | -------------------- |
| `step`  | `number` | Yes      | Step index (0-based) |
| `class` | `string` | No       | Additional CSS       |

### ScStepperTitle

Title text for a step.

**Selector:** `[scStepperTitle]`

### ScStepperDescription

Description text for a step.

**Selector:** `[scStepperDescription]`

### ScStepperPrevious

Button to go to previous step.

**Selector:** `button[scStepperPrevious]`

Auto-disables on first step.

### ScStepperNext

Button to go to next step.

**Selector:** `button[scStepperNext]`

## Examples

### Horizontal Stepper

```html
<div scStepper [(activeStep)]="step">
  <div scStepperList>
    <div scStepperItem [step]="0">
      <button scStepperTrigger></button>
      <div class="flex flex-col">
        <span scStepperTitle>Account</span>
        <span scStepperDescription>Create your account</span>
      </div>
    </div>
    <div scStepperSeparator></div>
    <div scStepperItem [step]="1">
      <button scStepperTrigger></button>
      <div class="flex flex-col">
        <span scStepperTitle>Profile</span>
        <span scStepperDescription>Set up your profile</span>
      </div>
    </div>
    <div scStepperSeparator></div>
    <div scStepperItem [step]="2">
      <button scStepperTrigger></button>
      <div class="flex flex-col">
        <span scStepperTitle>Complete</span>
        <span scStepperDescription>Review and submit</span>
      </div>
    </div>
  </div>

  <div scStepperContent [step]="0">Account form...</div>
  <div scStepperContent [step]="1">Profile form...</div>
  <div scStepperContent [step]="2">Review...</div>

  <div class="flex justify-between">
    <button scStepperPrevious>Previous</button>
    <button scStepperNext>Next</button>
  </div>
</div>
```

### Vertical Stepper

```html
<div scStepper orientation="vertical" [(activeStep)]="step">
  <div scStepperList>
    <div scStepperItem [step]="0">
      <button scStepperTrigger></button>
      <div class="flex flex-col">
        <span scStepperTitle>Step 1</span>
        <span scStepperDescription>First step</span>
        @if (step === 0) {
        <div class="mt-4">Step 1 content here</div>
        }
      </div>
      <div scStepperSeparator></div>
    </div>
    <div scStepperItem [step]="1">
      <button scStepperTrigger></button>
      <div class="flex flex-col">
        <span scStepperTitle>Step 2</span>
        <span scStepperDescription>Second step</span>
      </div>
    </div>
  </div>
</div>
```

### Simple Number Steps

```html
<div scStepper [(activeStep)]="step">
  <div scStepperList>
    <div scStepperItem [step]="0">
      <button scStepperTrigger></button>
    </div>
    <div scStepperSeparator></div>
    <div scStepperItem [step]="1">
      <button scStepperTrigger></button>
    </div>
    <div scStepperSeparator></div>
    <div scStepperItem [step]="2">
      <button scStepperTrigger></button>
    </div>
  </div>

  <button scStepperPrevious>Back</button>
  <button scStepperNext>Continue</button>
</div>
```

## Features

- **Horizontal/Vertical**: Supports both orientations
- **Click Navigation**: Click any step to navigate directly
- **Step States**: Complete, active, and inactive visual states
- **Auto-disable**: Previous button disabled on first step
- **Check Icons**: Completed steps show a checkmark
- **Two-way Binding**: Sync step state with `[(activeStep)]`

## Accessibility

- Uses `role="tablist"` for step list
- Uses `role="tab"` for step triggers
- Uses `role="tabpanel"` for step content
- `aria-selected` indicates active step
- Keyboard navigation via Tab key
