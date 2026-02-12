import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCodeEditor, ScCodeEditorContent } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-code-editor-demo',
  imports: [ScCodeEditor, ScCodeEditorContent],
  template: `
    <div sc-code-editor>
      <div
        sc-code-editor-content
        [(value)]="minimalCode"
        language="javascript"
        class="max-h-[150px]"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalCodeEditorDemo {
  minimalCode = `const hello = "world";
console.log(hello);`;
}
