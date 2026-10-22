# Diff Viewer

The differences between two texts, line by line and word by word ([jsdiff](https://github.com/kpdecker/jsdiff)): unified (one column, both line numbers) or split (side by side, rows aligned), highlighted like a [code block](../code-block/README.md), long unchanged runs folded. `diff` (jsdiff) is a peer of this library.

## Usage

Put it in a code block for its frame and header — your title, counts and view switch:

```html
<div scCodeBlock>
  <div scCodeBlockHeader>
    <div scCodeBlockTitle>counter.ts</div>
    <span>+{{ diff.additions() }} −{{ diff.deletions() }}</span>
  </div>
  <div scDiffViewer #diff="scDiffViewer" language="typescript" [oldText]="before" [newText]="after" [(view)]="view" [context]="3">
    <ng-template scDiffViewerFold let-count>Show {{ count }} unchanged lines</ng-template>
  </div>
</div>
```

It renders the lines itself; the only thing inside it is the optional fold template.

## API

### ScDiffViewer — `div[scDiffViewer]`, `#diff="scDiffViewer"`

| Input                             | Type                           | Default       |
| --------------------------------- | ------------------------------ | ------------- |
| `oldText` / `newText`             | `string`                       | `''`          |
| `language`                        | `string`                       | `'plaintext'` |
| `view`                            | `'unified' \| 'split'` (model) | `'unified'`   |
| `ignoreWhitespace` / `ignoreCase` | `boolean`                      | `false`       |
| `context`                         | `number \| null`               | `null`        |

| Member                        | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| `lines()`                     | The lines compared: `context`, `added`, `removed` |
| `additions()` / `deletions()` | Lines added / removed                             |
| `identical()`                 | Nothing changed                                   |

- **Highlighting**: by the app's highlighter (`provideCodeHighlighter()`), each text whole, so multi-line strings and comments stay right; plain without one.
- **Changed words**: within a removed line facing an added one, the words that differ are tinted.
- **Folding**: with `context` and a `ng-template[scDiffViewerFold]` (`let-count`: the hidden lines), unchanged runs beyond `context` lines of a change fold into a button — its text yours; a click shows them. Without the template, nothing folds.
- **Split view**: long lines wrap; an added line faces an empty cell, and so does a removed one.

### Pure functions

`diffTexts(oldText, newText, options)`, `foldLines(lines, context, expanded)`, `splitRows(rows)` — the model under the view, for other renderings.

## Accessibility

- Changed lines are `<ins>` / `<del>`; the `+` / `−` signs and line numbers are hidden from assistive technology.
- Always `dir="ltr"`; focusable (`tabindex="0"`), to scroll by keyboard. Name it if it stands alone (`aria-label`).
- The fold buttons are buttons: their text is yours.
