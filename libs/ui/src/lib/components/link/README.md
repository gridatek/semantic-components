# Link

A link: it goes somewhere, so it stays a link — opened in a new tab, copied, announced as a link. A link in text by default — underlined, in the colour and size of the text around it — or a button's look (`variant`), inherited from the Button: `link` the Button's link variant, `button` the primary one, or `outline`, `secondary`, `ghost`, `destructive`.

## Usage

```html
<a scLink variant="button" href="/docs/components/button">Go to Button</a>
```

## Anatomy

```ts
import { ScLink } from '@semantic-components/ui';
```

```html
<a scLink variant="button" href="…">
  <svg data-icon="inline-start"></svg>
  Label
  <svg data-icon="inline-end"></svg>
</a>
```

One part, on a native link. Its address is yours, and it needs one: `href`, or `routerLink` (which writes the `href` itself). The link never writes or invents one: an `<a>` without an address is not a link — not focusable, not announced as one — as with Angular Material's `a[mat-button]`. For an action rather than an address, use `button[scButton]`. An icon may go at either side, marked with its side.

## API reference

### ScLink — `a[scLink]`

In text (the default), its classes are its own (underline, the text's colour and size, an icon at the text's size) and the preset's `link` (`injectPreset().link`: the style's corners and focus ring). In a button's look, they are the preset's button (`injectPreset().button`), as `scButton`'s, and it carries `data-slot="button"` so a button group styles it as a button.

| Input      | Type                                                                                      | Default     | Description                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`  | `'default' \| 'link' \| 'button' \| 'outline' \| 'secondary' \| 'ghost' \| 'destructive'` | `'default'` | Its look: a link in text (default), or a button's, inherited from the Button — `link` the Button's link variant, `button` the primary one |
| `size`     | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'icon-xs' \| 'icon-sm' \| 'icon' \| 'icon-lg'`      | `'default'` | A button look's size: the button's sizes. A link in text takes the size of its text                                                       |
| `disabled` | `boolean`                                                                                 | `false`     | Not followed by any means (click, Enter, middle-click, `routerLink`); out of the tab order; `aria-disabled`                               |
| `class`    | `string`                                                                                  | `''`        | Classes merged over the preset (`cn`: a later class wins)                                                                                 |

## Examples

### In text

The default: a link inside a sentence. Underlined — told apart by more than its colour — in the colour and size of the text around it; it turns to the primary colour on hover.

```html
<p class="text-muted-foreground">
  By continuing, you agree to our
  <a scLink href="/terms">Terms of Service</a>.
</p>
```

### Variants

The button looks are inherited from the Button: the same preset classes as `scButton`'s variants. `link` is the Button's link variant — the button's box (its height, padding and text size), underlined on hover — for a link that sits among buttons: in a toolbar, beside an empty state's actions, a card's footer. In a sentence, use the default.

```html
<a scLink href="/docs/components/tabs">Default</a>
<a scLink variant="link" href="/docs/components/toggle">Link</a>
<a scLink variant="button" href="/docs/components/button">Button</a>
<a scLink variant="outline" href="/docs/components/badge">Outline</a>
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
<a scLink variant="button" href="/docs/components/button" disabled>Button docs</a> <a scLink variant="button" routerLink="/docs/components/badge" disabled>Badge docs</a>
```

Its `href` stays: a disabled link is still announced as a link, dimmed. Nothing follows it — the clicks are stopped before any other listener (a `routerLink`'s) hears them.

### RTL

Mirror the icons that point along the line yourself (`class="rtl:-scale-x-100"`); `data-icon="inline-start"` is the right side in right to left.

## Accessibility

- A native link: Enter follows it; it can be opened in a new tab, copied, bookmarked.
- Never a button that navigates, nor a link that acts: for an action, `button[scButton]`.
- Disabled: `aria-disabled="true"`, out of the tab order, not followed by any means.
- An icon-only link is named by hidden text; a link to another site says it opens in a new tab.
