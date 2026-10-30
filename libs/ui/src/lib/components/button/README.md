# Button

Displays a button or a component that looks like a button.

## Usage

```html
<button scButton>Click me</button>
```

## API

### ScButton — `button[scButton]`

Its classes are the app's preset's (`provideScConfig({ preset })`, from `@semantic-components/presets`; nova by default). Each of the eight presets (nova, vega, maia, lyra, mira, luma, sera, rhea) is shadcn's button in that style, class for class.

| Input      | Type                              | Default     | Description                                   |
| ---------- | --------------------------------- | ----------- | --------------------------------------------- |
| `variant`  | `ScButtonVariant`                 | `'default'` | Its look                                      |
| `size`     | `ScButtonSize`                    | `'default'` | Its size                                      |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'`  | `button` by default: it doesn't submit a form |
| `disabled` | `boolean`                         | `false`     | Disabled: not pressed, not in the tab order   |
| `class`    | `string`                          | `''`        | Additional CSS classes                        |

**Variants:** `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.

**Sizes:** `xs`, `sm`, `default`, `lg` (24, 28, 32 and 36 px high), and their square icon-only sizes `icon-xs`, `icon-sm`, `icon`, `icon-lg`.

`ScButtonVariants` (`{ variant, size }`) is the type the parts that look like buttons take (`scLink`, `scPaginationLast`…).

## Cursor

Buttons keep the default cursor, as native buttons and Tailwind do: a pointer is for links. To show one on buttons anyway, add to your global styles:

```css
button:not(:disabled) {
  cursor: pointer;
}
```

## Examples

### Size

```html
<button scButton variant="outline" size="sm">Small</button>
<button scButton variant="outline" size="icon-sm">
  <svg siArrowUpRightIcon></svg>
  <span class="sr-only">Submit</span>
</button>
```

### Variants

```html
<button scButton>Button</button>
<button scButton variant="outline">Outline</button>
<button scButton variant="secondary">Secondary</button>
<button scButton variant="ghost">Ghost</button>
<button scButton variant="destructive">Destructive</button>
<button scButton variant="link">Link</button>
```

### Icon

An icon-only button is named by its hidden text (`sr-only`), not `aria-label`:

```html
<button scButton variant="outline" size="icon">
  <svg siCircleFadingArrowUpIcon></svg>
  <span class="sr-only">Upgrade</span>
</button>
```

### With Icon

Mark the icon's side with `data-icon` — `inline-start` or `inline-end` — and the button tightens its padding there. Icons are bare: the button sizes them.

```html
<button scButton variant="outline" size="sm">
  <svg siGitBranchIcon data-icon="inline-start"></svg>
  New Branch
</button>
<button scButton variant="outline" size="sm">
  Fork
  <svg siGitForkIcon data-icon="inline-end"></svg>
</button>
```

### Rounded

```html
<button scButton variant="outline" size="icon" class="rounded-full">
  <svg siArrowUpIcon></svg>
  <span class="sr-only">Scroll to top</span>
</button>
```

### Spinner

A busy button: disabled, with a spinner (`svg[scSpinner]`, named).

```html
<button scButton variant="outline" disabled>
  <svg scSpinner siLoaderCircleIcon data-icon="inline-start" aria-label="Loading"></svg>
  Generating
</button>
```

### Button Group

Buttons side by side in a named group (`scButtonGroup`): their inner corners square.

```html
<div scButtonGroup aria-label="Message actions">
  <button scButton variant="outline">Archive</button>
  <button scButton variant="outline">Report</button>
  <button scButton variant="outline">Snooze</button>
</div>
```

### As Link

A link that looks like a button is a link: `a[scLink]`, which takes the same `variant` and `size`. Never a button made to navigate.

```html
<a scLink href="/docs/components/link">Go to the Link docs</a>
```

### Disabled

```html
<button scButton disabled>Disabled</button>
```

### Form submit

`type` is `button` by default, so a button in a form doesn't submit it. Say `submit` for the one that does:

```html
<form>
  <button scButton variant="outline">Cancel</button>
  <button scButton type="submit">Save</button>
</form>
```

### RTL

Logical spacing, so `data-icon="inline-start"` is the right side in right to left. Mirror the icons that point along the line yourself (`class="rtl:-scale-x-100"`): only you know which do.

```html
<div dir="rtl" lang="ar">
  <button scButton variant="outline">
    <svg siArrowLeftIcon data-icon="inline-start" class="rtl:-scale-x-100"></svg>
    السابق
  </button>
</div>
```

## Accessibility

- A native `button`: Enter and Space press it, it is in the tab order.
- `disabled` sets the native attribute and `aria-disabled`; a disabled button is skipped by Tab.
- The focus ring shows on keyboard focus (`focus-visible`).
- Icon-only buttons are named by hidden text; every variant meets AA contrast, in light and dark.
