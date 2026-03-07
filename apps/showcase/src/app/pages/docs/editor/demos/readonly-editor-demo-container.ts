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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyEditorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScEditor,
  ScEditorCharCount,
  ScEditorContent,
  ScEditorCount,
  ScEditorFooter,
  ScEditorWordCount,
} from '@semantic-components/editor';

@Component({
  selector: 'app-readonly-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
  ],
  template: \`
    <div class="w-full">
      <div scEditor [readonly]="true" class="overflow-hidden rounded-lg border">
        <div scEditorContent [(value)]="content"></div>

        <div scEditorFooter>
          <div scEditorCount>
            <span scEditorWordCount #wc="scEditorWordCount">
              {{ wc.wordCount() }} words
            </span>
            <span scEditorCharCount #cc="scEditorCharCount">
              {{ cc.charCount() }} characters
            </span>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
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
