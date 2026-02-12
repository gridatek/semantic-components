import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalCodeEditorDemo } from './minimal-code-editor-demo';

@Component({
  selector: 'app-minimal-code-editor-demo-container',
  imports: [DemoContainer, MinimalCodeEditorDemo],
  template: `
    <app-demo-container
      title="Minimal (No Header/Footer)"
      demoUrl="/demos/code-editor/minimal-code-editor-demo"
      [code]="code"
    >
      <app-minimal-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalCodeEditorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCodeEditor, ScCodeEditorContent } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-code-editor-demo',
  imports: [ScCodeEditor, ScCodeEditorContent],
  template: \`
    <div sc-code-editor>
      <div
        sc-code-editor-content
        [(value)]="minimalCode"
        language="javascript"
        class="max-h-[150px]"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalCodeEditorDemo {
  minimalCode = \`const hello = "world";
console.log(hello);\`;
}`;
}
