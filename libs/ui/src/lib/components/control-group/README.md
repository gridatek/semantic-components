# Control Group

Related buttons joined into one: shared borders, the outer corners rounded, side by side or stacked. Inputs, selects, text and other groups join in too, in the look of the app's preset. For buttons that switch something on or off, use a Toggle Group.

## Usage

```html
<div scControlGroup aria-label="Text alignment">
  <button scButton variant="outline">Left</button>
  <button scButton variant="outline">Center</button>
  <button scButton variant="outline">Right</button>
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
  <div scControlGroupSeparator></div>
  <button scButton variant="outline">Button</button>
</div>
```

A group on a `div`, its children what you put in it: buttons, links, inputs, selects, text, a separator, other groups. Its children are joined by position — the first keeps its start corners, the last its end corners — whatever they are. Name it with `aria-label`: it is announced as a group.

## Control Group or Toggle Group

A button group holds buttons that act: Tab goes to each. Buttons that toggle a state, one or several pressed at a time, are a Toggle Group; a row of controls moved between with the arrow keys is a Toolbar.

## API reference

### ScControlGroup — `div[scControlGroup]`

The group: `role="group"`, `data-orientation`; its classes are the preset's (`injectPreset().controlGroup`). A group in a group is spaced from the others (`gap-2`).

| Input         | Type                         | Default        | Description                                               |
| ------------- | ---------------------------- | -------------- | --------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Side by side, or stacked                                  |
| `class`       | `string`                     | `''`           | Classes merged over the preset (`cn`: a later class wins) |

`data-slot="control-group"`: read by the button's `xs` and `sm` sizes (their corners in a group), and by a group nested in it.

### ScControlGroupText — `div[scControlGroupText]`, `label[scControlGroupText]`

Text beside the buttons, in the preset's look (`injectPreset().controlGroupText`). On a `label`, it names the input it is `for`.

| Input   | Type     | Default | Description                                               |
| ------- | -------- | ------- | --------------------------------------------------------- |
| `class` | `string` | `''`    | Classes merged over the preset (`cn`: a later class wins) |

### ScControlGroupSeparator — `div[scControlGroupSeparator]`

A line between two buttons of the same look — secondary ones, which have no border. `role="separator"`, `aria-orientation`; the same classes in every preset.

| Input         | Type                         | Default      | Description                                                          |
| ------------- | ---------------------------- | ------------ | -------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Vertical between buttons side by side; horizontal in a stacked group |
| `class`       | `string`                     | `''`         | Classes merged over the preset (`cn`: a later class wins)            |

## Examples

### Orientation

```html
<div scControlGroup orientation="vertical" aria-label="Media controls">
  <button scButton variant="outline" size="icon">
    <svg siPlusIcon></svg>
    <span class="sr-only">Volume up</span>
  </button>
  <button scButton variant="outline" size="icon">
    <svg siMinusIcon></svg>
    <span class="sr-only">Volume down</span>
  </button>
</div>
```

### Size

The buttons' own `size`, the same for all of them (`sm`, `default`, `lg`, and `icon-sm`, `icon`, `icon-lg`).

### Nested

```html
<div scControlGroup aria-label="Message">
  <div scControlGroup>
    <button scButton variant="outline" size="icon">…</button>
  </div>
  <div scControlGroup>
    <div scInputGroup>…</div>
  </div>
</div>
```

### Separator

```html
<div scControlGroup aria-label="Clipboard">
  <button scButton variant="secondary" size="sm">Copy</button>
  <div scControlGroupSeparator></div>
  <button scButton variant="secondary" size="sm">Paste</button>
</div>
```

### Split

An action and a button beside it, a separator between: `variant="secondary"` and an icon button.

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

### Input Group, Dropdown Menu, Select, Popover

An input group, a menu's trigger (`scMenuTrigger`), a select (`scSelect`) or a popover's trigger (`scPopoverTrigger`) join a group as a button does; see the docs page.

### RTL

The corners follow the reading way (logical properties); mirror the icons that point along the line yourself (`class="rtl:rotate-180"`).

## Accessibility

- `role="group"`, named by you (`aria-label`, `aria-labelledby`).
- Tab goes to each button; the focused one is drawn over its neighbours (`z-10`), its ring whole.
- Icon-only buttons are named by hidden text (`sr-only`).
