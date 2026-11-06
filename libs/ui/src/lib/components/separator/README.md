# Separator

A line between sections, across or up and down — shadcn's Separator (Base UI's). The same in every style, so it has no preset key.

## Usage

```html
<div scSeparator></div>
<div scSeparator orientation="vertical"></div>
```

## Part

| Part          | Selector           | What it does                                                                                                           |
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `ScSeparator` | `div[scSeparator]` | `role="separator"`, `orientation` (`horizontal` — the default — or `vertical`), `aria-orientation`, `data-orientation` |

## Keyboard and screen readers

- A separator: screen readers announce the break, as for an `<hr>`.
- Only decoration — a line under a heading, behind "Or continue with" — hide it yourself: `<div scSeparator aria-hidden="true"></div>`.

## Not Radix's

- **No `decorative` input** (Base UI has none; the library's had one, true by default, until 2026-11-06): one way — `aria-hidden="true"` in your markup.
