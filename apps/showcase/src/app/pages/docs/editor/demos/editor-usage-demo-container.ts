import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { EditorUsageDemo } from './editor-usage-demo';

@Component({
  selector: 'app-editor-usage-demo-container',
  imports: [UsageCode, EditorUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-editor-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFrame,
  ScToggle,
  ScToolbar,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorItalic,
  ScEditorUnderline,
} from '@semantic-components/ui/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-editor-usage-demo',
  imports: [
    FormField,
    ScFrame,
    ScToggle,
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScEditor,
    ScEditorContent,
    ScEditorBold,
    ScEditorItalic,
    ScEditorUnderline,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: \`
    <div
      scEditor
      [formField]="editorForm.body"
      class="flex w-full max-w-lg flex-col gap-2"
    >
      <div scToolbar aria-label="Formatting">
        <div scToolbarWidgetGroup aria-label="Marks">
          <button scToolbarWidget scToggle scEditorBold>
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scToolbarWidget scToggle scEditorItalic>
            <svg siItalicIcon></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button scToolbarWidget scToggle scEditorUnderline>
            <svg siUnderlineIcon></svg>
            <span class="sr-only">Underline</span>
          </button>
        </div>
      </div>
      <div
        scFrame
        scEditorContent
        ariaLabel="Message"
        placeholder="Start writing..."
      ></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorUsageDemo {
  private readonly model = signal({ body: '' });
  readonly editorForm = form(this.model);
}`;
}
