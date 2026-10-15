import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoCountEditorDemo } from './no-count-editor-demo';

@Component({
  selector: 'app-no-count-editor-demo-container',
  imports: [DemoContainer, NoCountEditorDemo],
  template: `
    <app-demo-container
      title="Notes without counts"
      [code]="code"
      demoUrl="/demos/editor/no-count-editor-demo"
    >
      <app-no-count-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCountEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorBulletList,
  ScEditorContent,
  ScEditorItalic,
  ScEditorNumberedList,
  ScEditorSeparator,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderline,
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-no-count-editor-demo',
  imports: [
    FormField,
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBold,
    ScEditorItalic,
    ScEditorUnderline,
    ScEditorSeparator,
    ScEditorBulletList,
    ScEditorNumberedList,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiListIcon,
    SiListOrderedIcon,
  ],
  template: \`
    <div class="w-full">
      <div
        scEditor
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar>
          <div scEditorToolbarGroup>
            <button scEditorBold value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scEditorUnderline value="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorBulletList value="bullet-list">
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scEditorNumberedList value="numbered-list">
              <svg siListOrderedIcon></svg>
              <span class="sr-only">Numbered list</span>
            </button>
          </div>
        </div>

        <div scEditorContent ariaLabel="Notes"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCountEditorDemo {
  private readonly model = signal({ body: '' });
  readonly editorForm = form(this.model);
}`;
}
