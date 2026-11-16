# Typeset

Styles for content you don't write the markup of — rendered markdown, a chat answer — in a typeset container, and the same look for a heading, a paragraph or a quote on its own. shadcn's one CSS file, tuned by three variables; components inside keep their look, your classes win.

## Setup

Import the file in your global stylesheet, after Tailwind:

```css
@import '@semantic-components/ui/styles/typeset.css';
```

## Usage

Content you don't write the markup of goes in a container — its plain elements are set:

```html
<article class="typeset">
  <h2>The Joke Tax</h2>
  <p>Once upon a time…</p>
</article>
```

Text that stands on its own — a page title, a section's heading, a paragraph under it — takes `scTypeset`:

```typescript
import { ScTypeset } from '@semantic-components/ui';

@Component({
  imports: [ScTypeset],
  template: `
    <h1 scTypeset>Page Title</h1>
    <p scTypeset>A paragraph with <code scTypeset>code</code> in it.</p>
  `,
})
export class MyComponent {}
```

## Components

### `ScTypeset`

**Selector:** `[scTypeset]` — on the element itself (`h1`–`h6`, `p`, `blockquote`, `code`, `hr`, `a`, `strong`, `kbd`, `table`…). It marks it `data-typeset`, and `typeset.css` sets it by its tag: the same rules as in a container, from the same variables. No Tailwind classes of its own. For the container itself, `class="typeset"`.

**Inputs:**

| Input   | Type     | Default | Description                         |
| ------- | -------- | ------- | ----------------------------------- |
| `class` | `string` | `''`    | Your classes; they win (see below). |

- In a container, plain elements are enough: `scTypeset` there changes nothing.
- What depends on an element's children in a container isn't set on a lone one (the items of a list, code inside a heading): use a container for those.
- A block of code is the Code Block; a line between parts of a UI is the Separator; a key in a UI is `scKbd`.

**Headings** (in `em`, from the size around them):

| Level | Size       | Line height | Weight | Space above              |
| ----- | ---------- | ----------- | ------ | ------------------------ |
| `h1`  | `1.75em`   | `1.3`       | 600    | `--typeset-flow`         |
| `h2`  | `1.25em`   | `1.4`       | 600    | `--typeset-flow` × 1.4   |
| `h3`  | `1.125em`  | `1.45`      | 600    | `--typeset-flow`         |
| `h4`  | `1em`      | `1.5`       | 600    | `--typeset-flow`         |
| `h5`  | `0.875em`  | `1.5`       | 500    | muted                    |
| `h6`  | `0.8125em` | `1.5`       | 500    | muted, uppercase, spaced |

**Variables** (set them on `:root`, any ancestor, or a `typeset` container's preset class): `--typeset-size`, `--typeset-leading`, `--typeset-flow` (space between blocks), `--typeset-font-body`, `--typeset-font-heading`, `--typeset-font-mono`. `typeset.css` gives the page the container's defaults at zero specificity, so yours win.

**Classes:** `typeset` (the container), `not-typeset` (opts an element out; `data-not-typeset` too), `typeset-scroll` (a wide table scrolls in its own box).

**Your classes win:** the rules are in `@layer components` with `:where()` selectors, so a utility on the element (`text-2xl`, `mt-0`) beats them.

## Accessibility

- Native elements only: headings keep the page's outline, lists and quotes are read as such. Keep heading levels in order.
- A wide table in `typeset-scroll`: give the box `tabindex="0"`, `role="region"` and a name, so the keyboard can reach and scroll it.
