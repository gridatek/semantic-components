# Radio Group

A set of checkable buttons where only one button can be checked at a time.

## Components

- `ScRadioGroup` - Container directive that provides radiogroup semantics (applied to div)
- `ScRadioField` - Container component for each radio option (applied to div or label)
- `ScRadio` - Directive for styling native radio inputs (applied to input[type="radio"])

## Usage

```typescript
import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

interface FormModel {
  option: string;
}

@Component({
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div scRadioGroup>
      <label scRadioField>
        <input type="radio" scRadio value="option1" [formField]="optionForm.option" />
        Option 1
      </label>
      <label scRadioField>
        <input type="radio" scRadio value="option2" [formField]="optionForm.option" />
        Option 2
      </label>
      <label scRadioField>
        <input type="radio" scRadio value="option3" [formField]="optionForm.option" />
        Option 3
      </label>
    </div>
    <p>Selected: {{ formModel().option }}</p>
  `,
})
export class MyComponent {
  readonly formModel = signal<FormModel>({ option: 'option1' });
  readonly optionForm = form(this.formModel);
}
```

## Horizontal Layout

```html
<div scRadioGroup orientation="horizontal">
  <label scRadioField>
    <input type="radio" scRadio value="all" [formField]="filterForm.filter" />
    All
  </label>
  <label scRadioField>
    <input type="radio" scRadio value="unread" [formField]="filterForm.filter" />
    Unread
  </label>
</div>
```

## Disabled

```html
<!-- Disable entire group using fieldset -->
<fieldset disabled>
  <div scRadioGroup>
    <label scRadioField>
      <input type="radio" scRadio value="option1" [formField]="optionForm.option" />
      Option 1
    </label>
    <label scRadioField>
      <input type="radio" scRadio value="option2" [formField]="optionForm.option" />
      Option 2
    </label>
  </div>
</fieldset>

<!-- Disable individual items (without formField) -->
<div scRadioGroup>
  <label scRadioField>
    <input type="radio" scRadio value="option1" [formField]="optionForm.option" />
    Option 1
  </label>
  <label scRadioField>
    <input type="radio" scRadio value="option2" disabled />
    Option 2 (disabled)
  </label>
</div>
```

**Note:** The `disabled` attribute cannot be used on inputs with `[formField]`. To disable individual form-connected radio buttons, remove `[formField]` and use the native `disabled` attribute.

## With Accessible Label

```html
<!-- Using aria-label -->
<div scRadioGroup aria-label="Choose your theme">
  <label scRadioField>
    <input type="radio" scRadio value="light" [formField]="themeForm.theme" />
    Light
  </label>
  <label scRadioField>
    <input type="radio" scRadio value="dark" [formField]="themeForm.theme" />
    Dark
  </label>
</div>

<!-- Using aria-labelledby with a visible heading -->
<div>
  <h3 id="theme-heading">Choose your theme</h3>
  <div scRadioGroup aria-labelledby="theme-heading">
    <label scRadioField>
      <input type="radio" scRadio value="light" [formField]="themeForm.theme" />
      Light
    </label>
    <label scRadioField>
      <input type="radio" scRadio value="dark" [formField]="themeForm.theme" />
      Dark
    </label>
  </div>
</div>
```

## API

### ScRadioGroup

Container directive for radio buttons that provides radiogroup semantics.

**Selector:** `div[scRadioGroup]`

**Inputs:**

| Input         | Type                         | Default      | Description                         |
| ------------- | ---------------------------- | ------------ | ----------------------------------- |
| `class`       | `string`                     | `''`         | Additional CSS classes              |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of the radio group |

**Host Attributes:**

- `role="radiogroup"` - Provides semantic grouping for screen readers
- You can add `aria-label` or `aria-labelledby` directly to the element

### ScRadioField

Container component for each radio option. Can be applied to `div` or `label` elements.

**Selector:** `div[scRadioField], label[scRadioField]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScRadio

Directive for styling native radio inputs. Apply to `input[type="radio"]` elements.

**Selector:** `input[type="radio"][scRadio]`

**Inputs:**

| Input              | Type     | Default | Description                          |
| ------------------ | -------- | ------- | ------------------------------------ |
| `id`               | `string` | `''`    | Element ID (auto-generated if empty) |
| `class`            | `string` | `''`    | Additional CSS classes               |
| `aria-describedby` | `string` | `''`    | IDs of describing elements           |

**State Management:**

- Use `[(ngModel)]` for template-driven forms
- Use `[formControl]` or `formControlName` for reactive forms
- All native input attributes are supported (`name`, `value`, `disabled`, `checked`, etc.)

## Customization

The `ScRadio` directive styles the native radio input using CSS. You can customize the appearance by passing custom classes:

```html
<div scRadioGroup>
  <label scRadioField>
    <input type="radio" scRadio class="h-6 w-6 border-2" name="custom" value="option1" [(ngModel)]="selected" />
    Custom sized radio
  </label>
</div>
```

For complete custom styling, you can omit the `sc-radio` directive and style the native input directly:

```html
<div scRadioGroup>
  <label scRadioField>
    <input type="radio" class="your-custom-classes" name="custom" value="option1" [(ngModel)]="selected" />
    Fully custom radio
  </label>
</div>
```

### Theming with CSS Variables

You can customize the radio button colors by setting CSS custom properties (variables) on a parent element:

```html
<!-- Purple theme -->
<div style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);">
  <div scRadioGroup>
    <label scRadioField>
      <input type="radio" scRadio name="theme" value="option1" [(ngModel)]="selected" />
      Option 1
    </label>
  </div>
</div>

<!-- Green theme -->
<div style="--primary: oklch(0.5 0.18 145); --primary-foreground: oklch(0.985 0 0);">
  <div scRadioGroup>
    <label scRadioField>
      <input type="radio" scRadio name="theme" value="option1" [(ngModel)]="selected" />
      Option 1
    </label>
  </div>
</div>
```

**Available CSS Variables:**

| Variable               | Usage                                          |
| ---------------------- | ---------------------------------------------- |
| `--primary`            | Border color and checked indicator background  |
| `--primary-foreground` | Foreground color (not used in default styling) |
| `--ring`               | Focus ring color                               |

## Data Attributes

All components have a `data-slot` attribute for styling purposes:

| Component    | data-slot     |
| ------------ | ------------- |
| ScRadioGroup | `radio-group` |
| ScRadioField | `radio-field` |
| ScRadio      | `radio`       |

## Accessibility

- Uses native `<input type="radio">` elements with custom styling via CSS
- Native radio inputs provide all semantic roles and ARIA attributes automatically
- Container uses `role="radiogroup"` for group semantics
- Keyboard accessible via native browser behavior (arrow keys navigate, space/enter to select)
- Native radio grouping via `name` attribute ensures only one selection
- Works seamlessly with associated `<label>` elements for click-to-focus
- Full native form integration (submission, validation, autofill)
- Supports `aria-label` for programmatic group labels (WCAG 4.1.2)
- Supports `aria-labelledby` to reference visible group labels (WCAG 4.1.2)
- Visual styling uses CSS `appearance-none` with custom ::before pseudo-element
- Compatible with all screen readers (NVDA, JAWS, VoiceOver, TalkBack)

## Architecture

The radio group uses a composable directive-based architecture:

```
div[scRadioGroup] (container with role="radiogroup")
└── label[scRadioField] (or div[scRadioField]) (for each radio option)
    └── input[type="radio"][scRadio] (styled native radio input)
```

This pattern provides:

- **Simplicity**: Minimal abstraction over native HTML
- **Flexibility**: Use native inputs with standard form integration (ngModel, reactive forms)
- **Accessibility**: Native radio buttons provide full keyboard and screen reader support
- **Customization**: Direct access to native input attributes and styling
- **No Magic**: State management is handled through standard Angular forms, not internal component state
