import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WrapCodeEditorNextDemo } from './wrap-code-editor-next-demo';

@Component({
  selector: 'app-wrap-code-editor-next-demo-container',
  imports: [DemoContainer, WrapCodeEditorNextDemo],
  template: `
    <app-demo-container
      title="Wrap"
      [code]="code"
      demoUrl="/demos/code-editor-next/wrap-code-editor-next-demo"
    >
      <app-wrap-code-editor-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeEditorNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock, ScCodeEditorNext } from '@semantic-components/code';

/** wrap: long lines break instead of scrolling; lineNumbers off. */
@Component({
  selector: 'app-wrap-code-editor-next-demo',
  imports: [ScCodeBlock, ScCodeEditorNext],
  template: \`
    <div scCodeBlock>
      <div
        scCodeEditorNext
        wrap
        aria-label="Notes"
        [lineNumbers]="false"
        [(value)]="code"
      ></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeEditorNextDemo {
  readonly code = signal(
    'A long line of prose that wraps inside the editor instead of scrolling sideways, because wrap is on. A second sentence keeps it going, well past the edge.',
  );
}`;
}
