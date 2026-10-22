# @semantic-components/code

Code components for the Semantic Components library, highlighted with [Shiki](https://shiki.style).

## Contents

- **Code block**: code to read and copy, following shadcn/ui's code block — header, title, actions, copy button, content (line numbers, wrap, highlighted / added / removed lines), footer. See its [README](src/lib/components/code-block/README.md).
- **Code editor**: an editable code area with a header, footer, label and copy button.
- **Styles**: Shiki's light/dark colors for the code editor.

## Usage

```ts
// app.config.ts — highlights code blocks; without it they show plain code.
import { provideCodeHighlighter } from '@semantic-components/code';

export const appConfig: ApplicationConfig = {
  providers: [provideCodeHighlighter()],
};
```

```ts
import { ScCodeBlock, ScCodeBlockContent } from '@semantic-components/code';
import { ScCodeEditor, ScCodeEditorContent } from '@semantic-components/code';
```
