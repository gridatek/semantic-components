# JSON Viewer

A JSON value as a tree: keys and values coloured by type, objects and arrays that open and close, long arrays split into ranges. Built on our [Tree](../tree/README.md), so it follows the WAI-ARIA tree view pattern.

## Features

- **Any value** — JSON, plus `undefined`, BigInt and dates (`Date`, Temporal) when the data isn't pure JSON
- **Type colours** — strings, numbers, booleans, `null`/`undefined`, dates
- **Summaries** — a closed object or array shows its size, `{ 3 }`; the words are yours (`{ 3 keys }`)
- **Large arrays** — split into ranges of 100 (`[0 … 99]`); children are drawn the first time their parent opens, and kept
- **Long strings** — shortened with "…" after `maxStringLength`; the whole text in the tooltip and when copied
- **Keyboard** — one Tab stop, arrows, Home/End, type-ahead on keys; Ctrl/⌘+C copies the focused value
- **`expandAll()`, `collapseAll()`, `focusedPath()`** through `#viewer="scJsonViewer"`

## Quick Start

```html
<ul scJsonViewer aria-label="User" [data]="user"></ul>
```

The viewer draws its rows from `data`; you write no markup inside it, except the summary words.

## Summary words

The text between an object's or array's brackets. Without a template, the count alone.

```html
<ul scJsonViewer aria-label="Order" [data]="order">
  <ng-template scJsonViewerSummary let-node> @if (node.kind === 'object') { {{ node.size }} {{ node.size === 1 ? 'key' : 'keys' }} } @else { {{ node.size }} {{ node.size === 1 ? 'item' : 'items' }} } </ng-template>
</ul>
```

## Expand, collapse, copy

```html
<button scButton type="button" (click)="viewer.expandAll()">Expand all</button>
<button scButton type="button" (click)="viewer.collapseAll()">Collapse all</button>
<ul scJsonViewer #viewer="scJsonViewer" aria-label="Package" [data]="pkg"></ul>
<p>Focused: {{ viewer.focusedPath() }}</p>
```

`focusedPath()` is the focused row's path from the top value — `user.roles[2]`, `headers["content-type"]` — `''` for the top value itself, `null` before any row has had focus. Use it for your own "Copy path" button.

## API

### ScJsonViewer — `ul[scJsonViewer]`

Hosts `ScTree` (`role="tree"`). Name it with `aria-label` or `aria-labelledby`.

| Input             | Type      | Default    | Description                                                  |
| ----------------- | --------- | ---------- | ------------------------------------------------------------ |
| `data`            | `unknown` | —          | The value shown                                              |
| `expandDepth`     | `number`  | `1`        | Levels open at first: `0` all closed, `1` the top value open |
| `sortKeys`        | `boolean` | `false`    | Object keys in alphabetical order                            |
| `maxStringLength` | `number`  | `Infinity` | Strings longer than this are shortened with "…"              |
| `rootName`        | `string`  | `''`       | The top value's key                                          |
| `class`           | `string`  | `''`       | Additional CSS classes                                       |

| Method / signal | Description                                       |
| --------------- | ------------------------------------------------- |
| `expandAll()`   | Opens every object and array                      |
| `collapseAll()` | Closes every object and array                     |
| `focusedPath()` | The focused row's path (`string \| null`, signal) |

### ScJsonViewerSummary — `ng-template[scJsonViewerSummary]`

The summary words. Context: `$implicit` is the row's `ScJsonViewerNode` (`kind`, `size`, `key`, `path`, `value`, `depth`).

## Keyboard

| Key                  | Action                                                     |
| -------------------- | ---------------------------------------------------------- |
| `Tab`                | Into / out of the viewer (one stop)                        |
| `↓` / `↑`            | Next / previous visible row                                |
| `→`                  | Closed row: open. Open row: its first child                |
| `←`                  | Open row: close. Otherwise: its parent                     |
| `Home` / `End`       | First / last visible row                                   |
| Printable characters | Type-ahead to the next matching key                        |
| `Ctrl/⌘+C`           | Copies the focused value: a string as itself, rest as JSON |

## Styling

- `li[data-slot=json-viewer-row]`: `data-kind` (`object`, `array`, `range`, `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `date`, `other`), `data-state="open|closed"`
- `[data-slot=json-viewer-key]`, `[data-slot=json-viewer-value]`, `[data-slot=json-viewer-summary]`, `[data-slot=json-viewer-marker]`

## Accessibility

- A tree (`role="tree"`, `treeitem`, `group`) with `aria-level` and `aria-expanded`, from our Tree.
- Each row reads as its text: "age: 42", "roles: [ 3 items ]" with your summary words.
- Colours are not the only cue: strings are quoted, BigInts end in `n`, `null` and `undefined` are written out.
- The open/closed marker is drawn with CSS and `aria-hidden`; it points the reading direction (mirrored in RTL).

## Left out

- Editing (a JSON editor is another component).
- Search with highlighted matches.
