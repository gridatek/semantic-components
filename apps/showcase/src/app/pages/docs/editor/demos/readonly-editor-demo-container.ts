import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyEditorDemo } from './readonly-editor-demo';

@Component({
  selector: 'app-readonly-editor-demo-container',
  imports: [DemoContainer, ReadonlyEditorDemo],
  template: `
    <app-demo-container
      title="An article to read"
      [code]="code"
      demoUrl="/demos/editor/readonly-editor-demo"
    >
      <app-readonly-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, readonly } from '@angular/forms/signals';
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
    FormField,
    ScEditor,
    ScEditorContent,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
  ],
  template: \`
    <div class="w-full">
      <div
        scEditor
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorContent ariaLabel="Article"></div>

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
})
export class ReadonlyEditorDemo {
  private readonly model = signal({
    body: \`
    <h3>Readonly Content</h3>
    <p>This content cannot be edited. The editor is in readonly mode with the toolbar hidden.</p>
    <p>Useful for displaying formatted content that users should only read.</p>
  \`,
  });
  readonly editorForm = form(this.model, (path) => readonly(path.body));
}`;
}
