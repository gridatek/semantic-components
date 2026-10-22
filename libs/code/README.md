# @semantic-components/code

Code components for the Semantic Components library, highlighted with [Shiki](https://shiki.style).

## Contents

- **Code block**: code to read and copy, following shadcn/ui's code block — header, title, actions, copy button, content (line numbers, wrap, highlighted / added / removed lines), footer. See its [README](src/lib/components/code-block/README.md).
- **Diff viewer**: two texts compared, line by line and word by word (jsdiff) — split or unified, folded. See its [README](src/lib/components/diff-viewer/README.md).
- **Code editor**: CodeMirror 6, colored by Shiki through `shikiHighlighting()`; a form field. See its [README](src/lib/components/code-editor/README.md).

All three share the app's highlighter and the code block's look; none needs a CSS file of its own.

## Usage

```ts
// app.config.ts — highlights code; without it, code shows plain.
import { provideCodeHighlighter } from '@semantic-components/code';

export const appConfig: ApplicationConfig = {
  providers: [provideCodeHighlighter()],
};
```

```ts
import { ScCodeBlock, ScCodeBlockContent, ScCodeEditor, ScDiffViewer } from '@semantic-components/code';
```
