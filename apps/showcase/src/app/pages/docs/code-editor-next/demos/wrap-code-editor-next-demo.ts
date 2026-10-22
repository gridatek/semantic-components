import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock, ScCodeEditorNext } from '@semantic-components/code';

/** wrap: long lines break instead of scrolling; lineNumbers off. */
@Component({
  selector: 'app-wrap-code-editor-next-demo',
  imports: [ScCodeBlock, ScCodeEditorNext],
  template: `
    <div scCodeBlock>
      <div
        scCodeEditorNext
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
export class WrapCodeEditorNextDemo {
  readonly code = signal(
    'A long line of prose that wraps inside the editor instead of scrolling sideways, because wrap is on. A second sentence keeps it going, well past the edge.',
  );
}
