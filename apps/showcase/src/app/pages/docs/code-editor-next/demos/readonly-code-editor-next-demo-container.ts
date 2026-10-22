import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyCodeEditorNextDemo } from './readonly-code-editor-next-demo';

@Component({
  selector: 'app-readonly-code-editor-next-demo-container',
  imports: [DemoContainer, ReadonlyCodeEditorNextDemo],
  template: `
    <app-demo-container
      title="Read-only and disabled"
      [code]="code"
      demoUrl="/demos/code-editor-next/readonly-code-editor-next-demo"
    >
      <app-readonly-code-editor-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyCodeEditorNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock, ScCodeEditorNext } from '@semantic-components/code';

/** readonly: selectable and copyable, not edited. disabled: out of the way. */
@Component({
  selector: 'app-readonly-code-editor-next-demo',
  imports: [ScCodeBlock, ScCodeEditorNext],
  template: \`
    <div class="grid gap-3">
      <div scCodeBlock>
        <div
          scCodeEditorNext
          readonly
          aria-label="Read-only"
          language="json"
          [(value)]="code"
        ></div>
      </div>
      <div scCodeBlock>
        <div
          scCodeEditorNext
          disabled
          aria-label="Disabled"
          language="json"
          [(value)]="code"
        ></div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyCodeEditorNextDemo {
  readonly code = signal(\`{
  "name": "semantic-components",
  "private": true
}\`);
}`;
}
