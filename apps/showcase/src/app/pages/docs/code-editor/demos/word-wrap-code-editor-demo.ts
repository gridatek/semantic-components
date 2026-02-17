import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
  ScCodeEditorCopyButton,
} from '@semantic-components/code';

@Component({
  selector: 'app-word-wrap-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: `
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">README.md</span>
          <span scCodeEditorLabel>markdown</span>
        </div>
        <button scCodeEditorCopyButton [code]="longLineCode"></button>
      </div>
      <div
        scCodeEditorContent
        [(value)]="longLineCode"
        language="markdown"
        filename="README.md"
        [wordWrap]="true"
        class="max-h-[200px]"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordWrapCodeEditorDemo {
  longLineCode = `# Long Line Example

This is a very long line that demonstrates word wrapping in the code editor. When word wrap is enabled, long lines like this one will automatically wrap to the next line instead of requiring horizontal scrolling.

## Features
- Syntax highlighting
- Line numbers
- Word wrap support`;
}
