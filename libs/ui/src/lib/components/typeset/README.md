# Typeset

Styles for content you don't write the markup of — rendered markdown, a chat answer — in a typeset container, and the same look for a heading, a paragraph or a quote on its own. shadcn's one CSS file, tuned by three variables; components inside keep their look, your classes win.

## Setup

Import the file in your global stylesheet, after Tailwind:

```css
@import '@semantic-components/ui/styles/typeset.css';
@import '@semantic-components/presets/nova/typeset-variables.css';
```

## Two ways

**A container** (`class="typeset"`): its plain elements are set — headings, paragraphs, lists, quotes, code, tables — with no directive on any. Components inside keep their look (they have a `data-slot`); `not-typeset` opts out the rest.

```html
<article class="typeset">
  <h2>The Joke Tax</h2>
  <p>Once upon a time…</p>
</article>
```

**The directive** (`scTypeset`): on one element with no container around it, set by its tag. What depends on its children isn't (the items of a list, code inside a heading).

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

**Our recommendation:** a container for reading text — content you don't write the markup of (markdown, a CMS, a chat answer) and long-form pages (an article, a blog post, a docs page): one class, and every element in it follows, lists and all. The directive for a few pieces of text placed among UI — a dashboard's title, a settings section's heading, a paragraph in a card — where a container would also set the layout's own lists and links. In a container, the directive changes nothing.

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

**Variables** — in your preset's file (`@semantic-components/presets/<style>/typeset-variables.css`, on `:where(:root)`): `--typeset-size`, `--typeset-leading`, `--typeset-flow` (space between blocks), `--typeset-font-body`, `--typeset-font-heading`, `--typeset-font-mono`, `--typeset-muted`, `--typeset-rule`, and the style's corners: `--typeset-radius` (code blocks, images: its Code Block's) and `--typeset-radius-inline` (inline code, keys: its Kbd's). Override them on `:root`, any ancestor, or a container's preset class: yours win.

**Classes:** `typeset` (the container), `not-typeset` (opts an element out; `data-not-typeset` too), `typeset-scroll` (a wide table scrolls in its own box).

**Your classes win:** the rules are in `@layer components` with `:where()` selectors, so a utility on the element (`text-2xl`, `mt-0`) beats them.

## Accessibility

- Native elements only: headings keep the page's outline, lists and quotes are read as such. Keep heading levels in order.
- A wide table in `typeset-scroll`: give the box `tabindex="0"`, `role="region"` and a name, so the keyboard can reach and scroll it.
