import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WordWrapCodeEditorDemo } from './word-wrap-code-editor-demo';

@Component({
  selector: 'app-word-wrap-code-editor-demo-container',
  imports: [DemoContainer, WordWrapCodeEditorDemo],
  template: `
    <app-demo-container
      title="Word Wrap Enabled"
      demoUrl="/demos/code-editor/word-wrap-code-editor-demo"
      [code]="code"
    >
      <app-word-wrap-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordWrapCodeEditorDemoContainer {
  readonly code = `import {
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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-word-wrap-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: \`
    <div sc-code-editor>
      <div sc-code-editor-header>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">README.md</span>
          <span sc-code-editor-label>markdown</span>
        </div>
        <button sc-code-editor-copy-button [code]="longLineCode"></button>
      </div>
      <div
        sc-code-editor-content
        [(value)]="longLineCode"
        language="markdown"
        filename="README.md"
        [wordWrap]="true"
        class="max-h-[200px]"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordWrapCodeEditorDemo {
  longLineCode = \`# Long Line Example

This is a very long line that demonstrates word wrapping in the code editor. When word wrap is enabled, long lines like this one will automatically wrap to the next line instead of requiring horizontal scrolling.

## Features
- Syntax highlighting
- Line numbers
- Word wrap support\`;
}`;
}
