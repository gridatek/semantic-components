# Stepper

A multi-step wizard component for guiding users through a process.

## Usage

```html
<div sc-stepper [(activeStep)]="currentStep">
  <div sc-stepper-list>
    <div sc-stepper-item [step]="0">
      <button sc-stepper-trigger></button>
      <span sc-stepper-title>Step 1</span>
    </div>
    <div sc-stepper-separator></div>
    <div sc-stepper-item [step]="1">
      <button sc-stepper-trigger></button>
      <span sc-stepper-title>Step 2</span>
    </div>
  </div>

  <div sc-stepper-content [step]="0">Step 1 content</div>
  <div sc-stepper-content [step]="1">Step 2 content</div>

  <button sc-stepper-previous>Previous</button>
  <button sc-stepper-next>Next</button>
</div>
```

## Components

### ScStepper

Root container that manages step state.

**Selector:** `[sc-stepper]`

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

**Selector:** `[sc-stepper-list]`

### ScStepperItem

Individual step indicator.

**Selector:** `[sc-stepper-item]`

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

**Selector:** `button[sc-stepper-trigger]`

### ScStepperSeparator

Visual line between steps.

**Selector:** `[sc-stepper-separator]`

**Data Attributes:**

| Attribute    | Values                     |
| ------------ | -------------------------- |
| `data-state` | `'complete' \| 'inactive'` |

### ScStepperContent

Content panel for a step.

**Selector:** `[sc-stepper-content]`

**Inputs:**

| Input   | Type     | Required | Description          |
| ------- | -------- | -------- | -------------------- |
| `step`  | `number` | Yes      | Step index (0-based) |
| `class` | `string` | No       | Additional CSS       |

### ScStepperTitle

Title text for a step.

**Selector:** `[sc-stepper-title]`

### ScStepperDescription

Description text for a step.

**Selector:** `[sc-stepper-description]`

### ScStepperPrevious

Button to go to previous step.

**Selector:** `button[sc-stepper-previous]`

Auto-disables on first step.

### ScStepperNext

Button to go to next step.

**Selector:** `button[sc-stepper-next]`

## Examples

### Horizontal Stepper

```html
<div sc-stepper [(activeStep)]="step">
  <div sc-stepper-list>
    <div sc-stepper-item [step]="0">
      <button sc-stepper-trigger></button>
      <div class="flex flex-col">
        <span sc-stepper-title>Account</span>
        <span sc-stepper-description>Create your account</span>
      </div>
    </div>
    <div sc-stepper-separator></div>
    <div sc-stepper-item [step]="1">
      <button sc-stepper-trigger></button>
      <div class="flex flex-col">
        <span sc-stepper-title>Profile</span>
        <span sc-stepper-description>Set up your profile</span>
      </div>
    </div>
    <div sc-stepper-separator></div>
    <div sc-stepper-item [step]="2">
      <button sc-stepper-trigger></button>
      <div class="flex flex-col">
        <span sc-stepper-title>Complete</span>
        <span sc-stepper-description>Review and submit</span>
      </div>
    </div>
  </div>

  <div sc-stepper-content [step]="0">Account form...</div>
  <div sc-stepper-content [step]="1">Profile form...</div>
  <div sc-stepper-content [step]="2">Review...</div>

  <div class="flex justify-between">
    <button sc-stepper-previous>Previous</button>
    <button sc-stepper-next>Next</button>
  </div>
</div>
```

### Vertical Stepper

```html
<div sc-stepper orientation="vertical" [(activeStep)]="step">
  <div sc-stepper-list>
    <div sc-stepper-item [step]="0">
      <button sc-stepper-trigger></button>
      <div class="flex flex-col">
        <span sc-stepper-title>Step 1</span>
        <span sc-stepper-description>First step</span>
        @if (step === 0) {
        <div class="mt-4">Step 1 content here</div>
        }
      </div>
      <div sc-stepper-separator></div>
    </div>
    <div sc-stepper-item [step]="1">
      <button sc-stepper-trigger></button>
      <div class="flex flex-col">
        <span sc-stepper-title>Step 2</span>
        <span sc-stepper-description>Second step</span>
      </div>
    </div>
  </div>
</div>
```

### Simple Number Steps

```html
<div sc-stepper [(activeStep)]="step">
  <div sc-stepper-list>
    <div sc-stepper-item [step]="0">
      <button sc-stepper-trigger></button>
    </div>
    <div sc-stepper-separator></div>
    <div sc-stepper-item [step]="1">
      <button sc-stepper-trigger></button>
    </div>
    <div sc-stepper-separator></div>
    <div sc-stepper-item [step]="2">
      <button sc-stepper-trigger></button>
    </div>
  </div>

  <button sc-stepper-previous>Back</button>
  <button sc-stepper-next>Continue</button>
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
