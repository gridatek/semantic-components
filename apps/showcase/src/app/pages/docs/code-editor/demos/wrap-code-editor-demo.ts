import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock } from '@semantic-components/ui/code-block';
import { ScCodeEditor } from '@semantic-components/ui/code-editor';

/** wrap: long lines break instead of scrolling; lineNumbers off. */
@Component({
  selector: 'app-wrap-code-editor-demo',
  imports: [ScCodeBlock, ScCodeEditor],
  template: `
    <div scCodeBlock>
      <div
        scCodeEditor
        wrap
        aria-label="Notes"
        [lineNumbers]="false"
        [(value)]="code"
      ></div>
    </div>
  `,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeEditorDemo {
  readonly code = signal(
    'A long line of prose that wraps inside the editor instead of scrolling sideways, because wrap is on. A second sentence keeps it going, well past the edge.',
  );
}
