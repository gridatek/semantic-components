# Table of Contents

The sections of a page, as links beside it: listed from its headings or written by you, the section read marked as it scrolls.

## Usage

```html
<article>
  <h2 scTocHeading>Introduction</h2>
  …
  <h2 scTocHeading>Installation</h2>
  …
</article>

<nav scToc #toc="scToc" aria-label="On this page">
  <ul scTocList>
    @for (item of toc.items(); track item.id) {
    <li><a [scTocLink]="item.id" [depth]="item.depth">{{ item.text }}</a></li>
    }
  </ul>
</nav>
```

Links written by hand need no headings part — `<a scTocLink="installation">Installation</a>`, to your ids — and are rendered on the server too.

## Notes

- Every part is a directive on your element; the text and the navigation's name (`aria-label`) are yours.
- The headings (`scTocHeading`) register with the page: the `nav` can be anywhere — a layout's aside, outside the router outlet. A `scTocScope` keeps a table of contents of its own (an article in a page, a demo in the docs): the headings and the `nav` inside it.
- A heading's id is yours, or one from its text, unique on the page ("Basic" twice: `basic`, `basic-2`); letters of any script are kept. The text is read once rendered, so a list from the headings is filled in the browser.
- The section read is the last one whose heading reached the top of the page — or of the box that scrolls it — and the last one, scrolled to the end. A heading's scroll margin is where it counts as reached: under a sticky header, the header's height (`scroll-mt-20`; `scroll-mt-16` by default).
- Its link is `aria-current="location"` and `data-active`: style it from elsewhere with `data-active`.
- A link followed jumps to its section (in a box, the box alone scrolls), moves the focus to its heading for the keyboard and screen readers, and puts the section in the address. A modified click (new tab…) is the browser's.
- A link's `href` is this page at the section, not `#id` alone — which `<base href="/">` makes the home page's.
- A `nav` that scrolls (`overflow-y-auto`, a max height) keeps the active link in view.

## API reference

Each part takes `class`, merged over its own.

| Part           | Selector                       | Description                                                 |
| -------------- | ------------------------------ | ----------------------------------------------------------- |
| `ScToc`        | `nav[scToc]`                   | The navigation: lists the headings, marks the section read. |
| `ScTocList`    | `ul[scTocList], ol[scTocList]` | The list of links.                                          |
| `ScTocLink`    | `a[scTocLink]`                 | A link to a section, by its id.                             |
| `ScTocHeading` | `[scTocHeading]`               | A heading listed: your id, or one from its text.            |
| `ScTocScope`   | `[scTocScope]`                 | A table of contents of its own, apart from the page's.      |

### `ScToc` (`exportAs: 'scToc'`)

| Member       | Type          | Description                                                                 |
| ------------ | ------------- | --------------------------------------------------------------------------- |
| `items()`    | `ScTocItem[]` | The headings in document order: `id`, `text`, `level`, `depth`.             |
| `activeId()` | `string`      | The id of the section read; empty on the server.                            |
| `goTo(id)`   | `boolean`     | Goes to the section: scrolled there, focus on its heading, its link marked. |

### `ScTocLink`

| Input       | Type     | Default | Description                                  |
| ----------- | -------- | ------- | -------------------------------------------- |
| `scTocLink` | `string` | —       | The id of the section it goes to (required). |
| `depth`     | `number` | `0`     | Indented by it: an item's `depth` (up to 3). |

## Styles

No preset: shadcn has no table of contents in its components. The look is its docs site's — small muted links, the active one in the foreground colour, deeper ones indented (`ps-4` a level).
