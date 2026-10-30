# Input Group

An input or a textarea with icons, text and buttons in one box: beside it, above or below. In the look of the app's preset; a click on an addon focuses the field. To join a field with buttons outside its box, use a Control Group.

## Usage

```html
<div scInputGroup>
  <input scInput placeholder="Search..." aria-label="Search" />
  <div scInputGroupAddon>
    <svg siSearchIcon></svg>
  </div>
</div>
```

## Anatomy

```ts
import { ScInputGroup, ScInputGroupAddon, ScInputGroupButton, ScInputGroupText } from '@semantic-components/ui';
```

```html
<div scInputGroup>
  <input scInput aria-label="…" />
  <div scInputGroupAddon>
    <svg></svg>
  </div>
  <div scInputGroupAddon align="inline-end">
    <span scInputGroupText>Text</span>
    <button scInputGroupButton>Button</button>
  </div>
</div>
```

The group on a `div`, the control in it — `scInput`, `scTextarea`, or one of yours with `data-slot="control"` — then its addons. Write the addons after the control, so Tab reaches the control first; `align` sets where they show. The group draws the border and the ring, and gives its control the look of being inside (no border, ring or corners of its own).

## API reference

### ScInputGroup — `div[scInputGroup]`

The box: `role="group"`, the border, the ring when its control has focus, red when it is invalid. Its classes are the preset's (`injectPreset().inputGroup`). A focused date or time segment, or a select, multiselect or combobox trigger inside, rings it too.

| Input   | Type     | Default | Description                                               |
| ------- | -------- | ------- | --------------------------------------------------------- |
| `class` | `string` | `''`    | Classes merged over the preset (`cn`: a later class wins) |

`data-slot="input-group"`: read by a control group around it, and by the parts that join it.

### ScInputGroupAddon — `div[scInputGroupAddon]`

Icons, text or buttons beside the control (`injectPreset().inputGroupAddon`). A click on it, not on its buttons, focuses the control.

| Input   | Type                                                             | Default          | Description                                                            |
| ------- | ---------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | Before or after the control (an input), above or below it (a textarea) |
| `class` | `string`                                                         | `''`             | Classes merged over the preset (`cn`: a later class wins)              |

### ScInputGroupButton — `button[scInputGroupButton]`

A button in an addon: the preset's button, sized for the group (`injectPreset().inputGroupButton`).

| Input      | Type                                                                          | Default    | Description                                    |
| ---------- | ----------------------------------------------------------------------------- | ---------- | ---------------------------------------------- |
| `variant`  | `'default' \| 'outline' \| 'secondary' \| 'ghost' \| 'destructive' \| 'link'` | `'ghost'`  | Its look: the button's variants                |
| `size`     | `'xs' \| 'sm' \| 'icon-xs' \| 'icon-sm'`                                      | `'xs'`     | Its size in the group                          |
| `type`     | `'button' \| 'submit' \| 'reset'`                                             | `'button'` | In a form, only a submit button submits it     |
| `disabled` | `boolean`                                                                     | `false`    | Sets the native `disabled` and `aria-disabled` |
| `class`    | `string`                                                                      | `''`       | Classes merged over the preset                 |

### ScInputGroupText — `span[scInputGroupText]`

Text in an addon, with its icons (`injectPreset().inputGroupText`).

| Input   | Type     | Default | Description                    |
| ------- | -------- | ------- | ------------------------------ |
| `class` | `string` | `''`    | Classes merged over the preset |

## Examples

### Text

```html
<div scInputGroup>
  <input scInput placeholder="0.00" aria-label="Amount" inputmode="decimal" />
  <div scInputGroupAddon>
    <span scInputGroupText>$</span>
  </div>
  <div scInputGroupAddon align="inline-end">
    <span scInputGroupText>USD</span>
  </div>
</div>
```

### Button

```html
<div scInputGroup>
  <input scInput value="https://x.com/shadcn" aria-label="Profile URL" readonly />
  <div scInputGroupAddon align="inline-end">
    <button scInputGroupButton size="icon-xs" (click)="copy()">
      <svg siCopyIcon></svg>
      <span class="sr-only">Copy</span>
    </button>
  </div>
</div>
```

### Textarea

```html
<div scInputGroup>
  <textarea scTextarea aria-label="Code"></textarea>
  <div scInputGroupAddon align="block-end" class="border-t">
    <span scInputGroupText>Line 1, Column 1</span>
    <button scInputGroupButton variant="default" size="sm" class="ms-auto">Run</button>
  </div>
</div>
```

### Custom Input

A control of yours joins by carrying `data-slot="control"`: the group rings it when it has focus.

```html
<div scInputGroup>
  <textarea data-slot="control" aria-label="Message" class="field-sizing-content …"></textarea>
</div>
```

### Dropdown, Kbd, Spinner, RTL

A menu's trigger (`scMenuTrigger`) on a `scInputGroupButton`; a `kbd[scKbd]` or a `svg[scSpinner]` in an addon. In right to left, `inline-start` is the right side.

## Accessibility

- The control is named by a label or `aria-label` — `scInput` warns in development without one; the group is `role="group"`.
- Addons come after the control in the markup: Tab reaches the control first.
- Icon-only buttons are named by hidden text (`sr-only`); a button that toggles keeps its name and sets `aria-pressed`.
