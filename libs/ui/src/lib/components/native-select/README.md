# Native Select

A styled wrapper around the native HTML `<select>` element, providing consistent theming while preserving full native browser behavior and accessibility.

## Usage

```html
<div scNativeSelectContainer>
  <select scNativeSelect>
    <option value="">Select an option</option>
    <option value="one">Option 1</option>
    <option value="two">Option 2</option>
  </select>
  <svg siChevronDownIcon scNativeSelectIcon aria-hidden="true"></svg>
</div>
```

```typescript
import { ScNativeSelect, ScNativeSelectContainer, ScNativeSelectIcon, ScNativeSelectOptGroup, ScNativeSelectOption } from '@semantic-components/ui';
```

## Components

### ScNativeSelectContainer

Wrapping container that provides relative positioning for the select and its icon.

| Property       | Details                               |
| -------------- | ------------------------------------- |
| Selector       | `div[scNativeSelectContainer]`        |
| Data attribute | `data-slot="native-select-container"` |
| Inputs         | `class` — additional CSS classes      |

### ScNativeSelect

Directive applied to a native `<select>` element to apply themed styling.

| Property        | Details                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Selector        | `select[scNativeSelect]`                                                                          |
| Data attribute  | `data-slot="native-select"`                                                                       |
| Inputs          | `class` — additional CSS classes                                                                  |
|                 | `id` — element ID (auto-generated if not provided; inherits from parent `ScField` when available) |
|                 | `aria-describedby` — linked description IDs (auto-inherited from parent `ScField` when available) |
|                 | `size` — `'default' \| 'sm'` (default: `'default'`)                                               |
| Data attributes | `data-size` — reflects the current `size` value                                                   |

### ScNativeSelectIcon

Positions a decorative icon (typically a chevron) inside the container, overlaying the right side of the select.

| Property       | Details                          |
| -------------- | -------------------------------- |
| Selector       | `[scNativeSelectIcon]`           |
| Data attribute | `data-slot="native-select-icon"` |
| Inputs         | `class` — additional CSS classes |

### ScNativeSelectOption

Optional directive for styling individual `<option>` elements.

| Property       | Details                            |
| -------------- | ---------------------------------- |
| Selector       | `option[scNativeSelectOption]`     |
| Data attribute | `data-slot="native-select-option"` |
| Inputs         | `class` — additional CSS classes   |

### ScNativeSelectOptGroup

Optional directive for styling `<optgroup>` elements.

| Property       | Details                              |
| -------------- | ------------------------------------ |
| Selector       | `optgroup[scNativeSelectOptgroup]`   |
| Data attribute | `data-slot="native-select-optgroup"` |
| Inputs         | `class` — additional CSS classes     |

## Examples

### With a label (using ScField)

```html
<div scField>
  <label scLabel>Framework</label>
  <div scNativeSelectContainer>
    <select scNativeSelect>
      <option value="">Select a framework</option>
      <option value="angular">Angular</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </select>
    <svg siChevronDownIcon scNativeSelectIcon aria-hidden="true"></svg>
  </div>
</div>
```

### Small size

```html
<div scNativeSelectContainer>
  <select scNativeSelect size="sm">
    <option value="us">US</option>
    <option value="uk">UK</option>
  </select>
  <svg siChevronDownIcon scNativeSelectIcon aria-hidden="true"></svg>
</div>
```

### With option groups

```html
<div scNativeSelectContainer>
  <select scNativeSelect>
    <optgroup scNativeSelectOptgroup label="Frontend">
      <option scNativeSelectOption value="angular">Angular</option>
      <option scNativeSelectOption value="react">React</option>
    </optgroup>
    <optgroup scNativeSelectOptgroup label="Backend">
      <option scNativeSelectOption value="nest">NestJS</option>
      <option scNativeSelectOption value="express">Express</option>
    </optgroup>
  </select>
  <svg siChevronDownIcon scNativeSelectIcon aria-hidden="true"></svg>
</div>
```

## Accessibility

- Uses a native `<select>` element, so all standard keyboard navigation and screen reader behavior is preserved.
- The `id` and `aria-describedby` attributes are automatically wired when used inside an `ScField`, linking the select to its label and description.
- The chevron icon should include `aria-hidden="true"` since it is purely decorative.
- Disabled state is handled via the native `disabled` attribute; the container automatically reduces opacity when the select is disabled.
- Validation states are conveyed through `aria-invalid`, which triggers visible error styling.
