import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorCopyButton,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
} from '@semantic-components/code';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-html-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground text-sm">index.html</span>
          <span scCodeEditorLabel>html</span>
        </div>
        <button
          scCodeEditorCopyButton
          #copy="scCodeEditorCopyButton"
          [code]="htmlCode"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }

          <span class="sr-only">{{
            copy.copied() ? 'Copied' : 'Copy code'
          }}</span>
        </button>
      </div>
      <div
        scCodeEditorContent
        ariaLabel="Code editor"
        [(value)]="htmlCode"
        language="html"
        filename="index.html"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HtmlCodeEditorDemo {
  htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main id="content">
    <h1>Welcome</h1>
    <p>This is a sample HTML document.</p>
  </main>
  <script src="app.js"></script>
</body>
</html>`;
}
