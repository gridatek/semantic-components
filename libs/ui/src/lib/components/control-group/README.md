# Control Group

An input or a select joined with its buttons into one control: shared borders, the outer corners rounded, in the look of the app's preset. Text and input groups join in too.

This is shadcn's [Button Group](https://ui.shadcn.com/docs/components/button-group), under a name for what it is for. Its look, class for class, and its parts are shadcn's. It joins buttons alone too — vertically, in three sizes, with a separator, as a split button, with a menu or a popover: those examples are on the Button page.

## Usage

```html
<div scControlGroup aria-label="Newsletter">
  <input scInput type="email" placeholder="Email" aria-label="Email" />
  <button scButton variant="outline">Subscribe</button>
</div>
```

## Anatomy

```ts
import { ScControlGroup, ScControlGroupSeparator, ScControlGroupText } from '@semantic-components/ui';
```

```html
<div scControlGroup aria-label="…">
  <label scControlGroupText for="…">Text</label>
  <input scInput id="…" />
  <button scButton variant="outline">Button</button>
</div>
```

A group on a `div`, its children what you put in it: inputs, selects, text, buttons, input groups, other groups. Its children are joined by position — the first keeps its start corners, the last its end corners — whatever they are; a select's trigger is reached inside its root. Name it with `aria-label`: it is announced as a group.

Tab goes to each control. For buttons that toggle a state, use a Toggle Group; for a row of controls moved between with the arrow keys, a Toolbar.

## API reference

### ScControlGroup — `div[scControlGroup]`

The group: `role="group"`, `data-orientation`; its classes are the preset's (`injectPreset().controlGroup`). A group in a group is spaced from the others (`gap-2`).

| Input         | Type                         | Default        | Description                                               |
| ------------- | ---------------------------- | -------------- | --------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Side by side, or stacked                                  |
| `class`       | `string`                     | `''`           | Classes merged over the preset (`cn`: a later class wins) |

`data-slot="control-group"`: read by the button's `xs` and `sm` sizes (their corners in a group), and by a group nested in it.

### ScControlGroupText — `div[scControlGroupText]`, `label[scControlGroupText]`

Text beside the controls, in the preset's look (`injectPreset().controlGroupText`). On a `label`, it names the input it is `for`.

| Input   | Type     | Default | Description                                               |
| ------- | -------- | ------- | --------------------------------------------------------- |
| `class` | `string` | `''`    | Classes merged over the preset (`cn`: a later class wins) |

### ScControlGroupSeparator — `div[scControlGroupSeparator]`

A line between two buttons of the same look — secondary ones, which have no border (the Button page's Group Separator and Split Button). `role="separator"`, `aria-orientation`; the same classes in every preset.

| Input         | Type                         | Default      | Description                                                          |
| ------------- | ---------------------------- | ------------ | -------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Vertical between buttons side by side; horizontal in a stacked group |
| `class`       | `string`                     | `''`         | Classes merged over the preset (`cn`: a later class wins)            |

## Examples

### Input

```html
<div scControlGroup aria-label="Search">
  <input scInput placeholder="Search..." aria-label="Search" />
  <button scButton variant="outline">
    <svg siSearchIcon></svg>
    <span class="sr-only">Search</span>
  </button>
</div>
```

The input takes the room left (`flex-1`).

### Text

```html
<div scControlGroup aria-label="Website">
  <label scControlGroupText for="url">https://</label>
  <input scInput id="url" placeholder="example.com" />
  <button scButton variant="outline">Visit</button>
</div>
```

### Select

```html
<div scControlGroup aria-label="Payment">
  <div scControlGroup>
    <div scSelect [formField]="form.currency">
      <div scSelectTrigger aria-label="Currency">…</div>
      …
    </div>
    <input scInput [formField]="form.amount" aria-label="Amount" />
  </div>
  <div scControlGroup>
    <button scButton variant="outline" size="icon" type="submit">…</button>
  </div>
</div>
```

### Input Group, Nested

An input group joins as an input does; groups in a group are spaced apart — see the docs page.

### RTL

The corners follow the reading way (logical properties); mirror the icons that point along the line yourself (`class="rtl:rotate-180"`).

## Accessibility

- `role="group"`, named by you (`aria-label`, `aria-labelledby`).
- Tab goes to each control; the focused one is drawn over its neighbours (`z-10`), its ring whole.
- Every input has a name: a `label` (`scControlGroupText`), or `aria-label`. Icon-only buttons are named by hidden text (`sr-only`).
