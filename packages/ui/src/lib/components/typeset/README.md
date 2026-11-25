# Typeset

Styles for content you don't write the markup of — rendered markdown, a chat answer — in a typeset container, and the same look for a heading, a paragraph or a quote on its own. One CSS file, started from shadcn's and tuned by variables; components inside keep their look, your classes win.

## Setup

Import the file in your global stylesheet, after Tailwind:

```css
@import '@semantic-components/styles/typeset.css';
@import '@semantic-components/styles/nova/typeset-variables.css';
```

The second file is optional: your style's values. Without it, set every variable yourself (the list: **Variables**, under [Components](#components)).

## Not shadcn's Typeset

We started from shadcn's `typeset.css` and no longer follow it exactly. What's ours:

- **The variables are the style's**, on `:root` (shadcn sets them on `.typeset` in its file): each style's own `typeset-variables.css`, or your values.
- **An element on its own** is set like one in a container: `scTypeset` marks it (`data-typeset`).
- **The style's corners**: code blocks and images as its Code Block (`--sc-typeset-radius`); inline code, keys and highlights as its Kbd (`--sc-typeset-radius-inline`). shadcn's highlight has a fixed `0.2em`.
- **Headings h1 to h4 take the style's weight, tracking and case**: `--sc-typeset-heading-weight`, `--sc-typeset-heading-tracking`, `--sc-typeset-heading-case`. shadcn's Typeset has no such variables. They're 600, `normal` and `none` in every style but sera (uppercase, `0.05em`: its titles). **Writing your own values?** Set these three too: they have no fallback, and without `--sc-typeset-heading-weight` headings lose their bold.

The full list: "Deliberate divergences" in `docs/shadcn-style-reference.md`.

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

## Leaving something out

In a container, every plain element is set. To keep one as it is — a link, a list, a block:

- **All of it:** `class="not-typeset"` (or `data-not-typeset`, where your renderer can't add a class). The element and everything in it lose Typeset's rules — a link its underline, weight, hover and focus outline — and keep only your classes. On a wrapper, a whole region is left out.

  ```html
  <article class="typeset">
    <p>Read the <a href="/guide" class="not-typeset">guide</a> first.</p>
  </article>
  ```

- **Part of it:** a utility on the element (`class="no-underline font-normal"`). The rules are in `@layer components` with `:where()`, so your classes win; the rest of Typeset's look stays.
- **Components:** anything with a `data-slot` keeps its own look with nothing to add — a button, a card, a link with a button's look (`scLink variant="button"`). A plain text link (`scLink`) has none: it's set as a link in the text, as it should be.

In rendered markdown you can rarely put a class on one element: a hook in your renderer adds it, or `not-typeset` goes on a wrapper around the region.

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

**Variables** — in your style's file (`@semantic-components/styles/<style>/typeset-variables.css`, on `:where(:root)`): `--typeset-size`, `--typeset-leading`, `--typeset-flow` (space between blocks), `--typeset-font-body`, `--typeset-font-heading`, `--typeset-font-mono`, `--typeset-muted`, `--typeset-rule`, and the style's corners: `--sc-typeset-radius` (code blocks, images: its Code Block's) and `--sc-typeset-radius-inline`, `--sc-typeset-heading-weight`, `--sc-typeset-heading-tracking`, `--sc-typeset-heading-case` (headings h1 to h4: sera's uppercase and wider, as its titles) (inline code, keys: its Kbd's). Override them on `:root`, any ancestor, or a container's style class: yours win.

**Classes:** `typeset` (the container), `not-typeset` (opts an element out; `data-not-typeset` too), `typeset-scroll` (a wide table scrolls in its own box).

**Your classes win:** the rules are in `@layer components` with `:where()` selectors, so a utility on the element (`text-2xl`, `mt-0`) beats them.

## Accessibility

- Native elements only: headings keep the page's outline, lists and quotes are read as such. Keep heading levels in order.
- A wide table in `typeset-scroll`: give the box `tabindex="0"`, `role="region"` and a name, so the keyboard can reach and scroll it.
