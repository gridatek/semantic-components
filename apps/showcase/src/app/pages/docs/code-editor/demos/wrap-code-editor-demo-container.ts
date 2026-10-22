import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WrapCodeEditorDemo } from './wrap-code-editor-demo';

@Component({
  selector: 'app-wrap-code-editor-demo-container',
  imports: [DemoContainer, WrapCodeEditorDemo],
  template: `
    <app-demo-container
      title="Wrap"
      [code]="code"
      demoUrl="/demos/code-editor/wrap-code-editor-demo"
    >
      <app-wrap-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock, ScCodeEditor } from '@semantic-components/code';

/** wrap: long lines break instead of scrolling; lineNumbers off. */
@Component({
  selector: 'app-wrap-code-editor-demo',
  imports: [ScCodeBlock, ScCodeEditor],
  template: \`
    <div scCodeBlock>
      <div
        scCodeEditor
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
export class WrapCodeEditorDemo {
  readonly code = signal(
    'A long line of prose that wraps inside the editor instead of scrolling sideways, because wrap is on. A second sentence keeps it going, well past the edge.',
  );
}`;
}
