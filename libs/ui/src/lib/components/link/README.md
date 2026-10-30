# Link

A link that looks like a button: it goes somewhere, so it stays a link — opened in a new tab, copied, announced as a link — with a button's look.

## Usage

```html
<a scLink href="/docs/components/button">Go to Button</a>
```

## Anatomy

```ts
import { ScLink } from '@semantic-components/ui';
```

```html
<a scLink href="…">
  <svg data-icon="inline-start"></svg>
  Label
  <svg data-icon="inline-end"></svg>
</a>
```

One part, on a native link. Its address is yours: `href`, or `routerLink` (it is never written by the link itself). An icon may go at either side, marked with its side.

## API reference

### ScLink — `a[scLink]`

Its classes are the preset's button (`injectPreset().button`), as `scButton`'s.

| Input      | Type                                                                                 | Default     | Description                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `variant`  | `'default' \| 'outline' \| 'secondary' \| 'ghost' \| 'destructive' \| 'link'`        | `'default'` | Its look: the button's variants                                                                             |
| `size`     | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'icon-xs' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'default'` | Its size: the button's sizes                                                                                |
| `disabled` | `boolean`                                                                            | `false`     | Not followed by any means (click, Enter, middle-click, `routerLink`); out of the tab order; `aria-disabled` |
| `class`    | `string`                                                                             | `''`        | Classes merged over the preset (`cn`: a later class wins)                                                   |

## Examples

### Variants

```html
<a scLink href="/docs/components/button">Default</a>
<a scLink variant="outline" href="/docs/components/badge">Outline</a>
<a scLink variant="link" href="/docs/components/tabs">Link</a>
```

### Size

```html
<a scLink variant="outline" size="sm" href="…">Small</a>
<a scLink variant="outline" size="icon" href="…">
  <svg siArrowUpRightIcon></svg>
  <span class="sr-only">Button docs</span>
</a>
```

### With Icon

```html
<a scLink variant="outline" href="/docs/components/card">
  Card
  <svg siArrowRightIcon data-icon="inline-end"></svg>
</a>
```

### Router Link

```html
<a scLink variant="outline" routerLink="/docs/components/button">Go to Button</a>
```

### External

A new tab, without the opener; said to the reader:

```html
<a scLink variant="outline" href="https://github.com/gridatek/semantic-components" target="_blank" rel="noopener noreferrer">
  GitHub
  <svg siExternalLinkIcon data-icon="inline-end"></svg>
  <span class="sr-only">(opens in a new tab)</span>
</a>
```

### Disabled

```html
<a scLink href="/docs/components/button" disabled>Button docs</a> <a scLink routerLink="/docs/components/badge" disabled>Badge docs</a>
```

Its `href` stays: a disabled link is still announced as a link, dimmed. Nothing follows it — the clicks are stopped before any other listener (a `routerLink`'s) hears them.

### RTL

Mirror the icons that point along the line yourself (`class="rtl:-scale-x-100"`); `data-icon="inline-start"` is the right side in right to left.

## Accessibility

- A native link: Enter follows it; it can be opened in a new tab, copied, bookmarked.
- Never a button that navigates, nor a link that acts: for an action, `button[scButton]`.
- Disabled: `aria-disabled="true"`, out of the tab order, not followed by any means.
- An icon-only link is named by hidden text; a link to another site says it opens in a new tab.
