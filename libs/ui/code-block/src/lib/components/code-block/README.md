# Code Block

Code to read and copy, following shadcn/ui's code block, in the look of the app's preset: a header (title, actions), the code — highlighted, numbered, wrapped, its lines marked — and a footer.

## Architecture

```
div[scCodeBlock] (variant: default | destructive, size: default | sm)
├── div[scCodeBlockHeader]
│   ├── div[scCodeBlockTitle]            — your icon and text
│   └── div[scCodeBlockActions]
│       └── button[scCodeBlockCopy]      — your icons and sr-only name; copied()
├── pre[scCodeBlockContent] ([code], language, wrap, lineNumbers, startLine,
│                            highlightedLines, addedLines, removedLines)
└── div[scCodeBlockFooter]
```

`scCodeBlockActions` straight in the block (no header) floats over the code at the top end, shown on hover or focus — always on a touch screen.

## Highlighting

The content highlights its `language` when the app provides a highlighter; otherwise, and until it answers, the code shows plain.

```ts
import { provideSemanticComponents } from '@semantic-components/ui';
import { withCodeHighlighter } from '@semantic-components/ui/code-block';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({}, withCodeHighlighter())],
};
```

`withCodeHighlighter()` uses Shiki's core with its JavaScript engine and the GitHub light (high contrast) / dark themes; each language loads the first time it is shown: `angular-html`, `angular-ts`, `bash` (`sh`, `shell`, `zsh`), `css`, `diff`, `html`, `javascript` (`js`), `json`, `markdown` (`md`), `python` (`py`), `scss`, `sql`, `typescript` (`ts`), `yaml` (`yml`) — and `ansi`, a terminal's output in its colours (Shiki reads the codes; its dim text is drawn in the muted foreground, to keep 4.5:1). Another highlighter can be provided as `SC_CODE_HIGHLIGHTER` (`ScCodeHighlighter`: code and language in, lines of tokens out).

## Usage

```html
<div scCodeBlock>
  <div scCodeBlockHeader>
    <div scCodeBlockTitle><svg siFileCodeIcon></svg>counter.ts</div>
    <div scCodeBlockActions>
      <button [scCodeBlockCopy]="source" #copy="scCodeBlockCopy">
        @if (copy.copied()) {
        <svg siCheckIcon></svg>
        } @else {
        <svg siCopyIcon></svg>
        }
        <span class="sr-only">Copy code</span>
      </button>
    </div>
  </div>
  <pre scCodeBlockContent [code]="source" language="angular-ts" lineNumbers></pre>
  <span aria-live="polite" class="sr-only"> @if (copy.copied()) { Copied } </span>
</div>
```

## API

### ScCodeBlock — `div[scCodeBlock]`

| Input     | Type                         | Default     |
| --------- | ---------------------------- | ----------- |
| `variant` | `'default' \| 'destructive'` | `'default'` |
| `size`    | `'default' \| 'sm'`          | `'default'` |

### ScCodeBlockContent — `pre[scCodeBlockContent]`

| Input                                              | Type                | Default       |
| -------------------------------------------------- | ------------------- | ------------- |
| `code`                                             | `string` (required) | —             |
| `language`                                         | `string`            | `'plaintext'` |
| `wrap`                                             | `boolean`           | `false`       |
| `lineNumbers`                                      | `boolean`           | `false`       |
| `startLine`                                        | `number`            | `1`           |
| `highlightedLines` / `addedLines` / `removedLines` | `number[]` (from 1) | `[]`          |

Renders its own lines: nothing to put inside it. Always `dir="ltr"`; focusable (`tabindex="0"`), to scroll by keyboard. An empty line holds a newline, so a copied selection keeps it.

### ScCodeBlockCopy — `button[scCodeBlockCopy]`, `#copy="scCodeBlockCopy"`

`[scCodeBlockCopy]`: the text to copy. `copied()` is true for `duration` ms (2000) after; `data-copied` too. A ghost `icon-xs` button (`variant`, `size`). Write its icons and an `sr-only` name; a polite live region of yours can say it was copied.

### ScCodeBlockHeader, ScCodeBlockTitle, ScCodeBlockActions, ScCodeBlockFooter

Layout parts, each a `div` with its `class`.

## Styles

Every part's classes are the preset's (`injectPreset().codeBlock`: `root` by variant, `header`, `title`, `actions`, `content`, `code`, `line` by mark, `footer`): shadcn's Code Block, in each style. A code editor in the block (the Code Editor) takes the preset's focus look for the code.
