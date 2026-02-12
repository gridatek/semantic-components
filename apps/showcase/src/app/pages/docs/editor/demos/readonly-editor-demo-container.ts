import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyEditorDemo } from './readonly-editor-demo';

@Component({
  selector: 'app-readonly-editor-demo-container',
  imports: [DemoContainer, ReadonlyEditorDemo],
  template: `
    <app-demo-container
      title="Readonly Mode"
      [code]="code"
      demoUrl="/demos/editor/readonly-editor-demo"
    >
      <app-readonly-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyEditorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScEditor,
  ScEditorContent,
  ScEditorFooter,
  ScEditorCount,
  ScEditorWordCount,
  ScEditorCharCount,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-readonly-editor-demo',
  imports: [ScEditor, ScEditorContent, ScEditorFooter, ScEditorCount],
  template: \`
    <div sc-editor [readonly]="true" class="border rounded-lg overflow-hidden">
      <div sc-editor-content [(value)]="content"></div>

      <div sc-editor-footer>
        <div sc-editor-count>
          <span sc-editor-word-count></span>
          <span sc-editor-char-count></span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyEditorDemo {
  readonly content = signal(\`
    <h3>Readonly Content</h3>
    <p>This content cannot be edited. The editor is in readonly mode with the toolbar hidden.</p>
    <p>Useful for displaying formatted content that users should only read.</p>
  \`);
}`;
}
