import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyCodeEditorDemo } from './readonly-code-editor-demo';

@Component({
  selector: 'app-readonly-code-editor-demo-container',
  imports: [DemoContainer, ReadonlyCodeEditorDemo],
  template: `
    <app-demo-container
      title="Read-only and disabled"
      [code]="code"
      demoUrl="/demos/code-editor/readonly-code-editor-demo"
    >
      <app-readonly-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyCodeEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock } from '@semantic-components/ui/code-block';
import { ScCodeEditor } from '@semantic-components/ui/code-editor';

/** readonly: selectable and copyable, not edited. disabled: out of the way. */
@Component({
  selector: 'app-readonly-code-editor-demo',
  imports: [ScCodeBlock, ScCodeEditor],
  template: \`
    <div class="grid gap-3">
      <div scCodeBlock>
        <div
          scCodeEditor
          readonly
          aria-label="Read-only"
          language="json"
          [(value)]="code"
        ></div>
      </div>
      <div scCodeBlock>
        <div
          scCodeEditor
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
export class ReadonlyCodeEditorDemo {
  readonly code = signal(\`{
  "name": "semantic-components",
  "private": true
}\`);
}`;
}
