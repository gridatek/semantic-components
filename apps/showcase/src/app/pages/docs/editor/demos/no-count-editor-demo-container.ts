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
  ScFrame,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorBold,
  ScEditorBulletList,
  ScEditorContent,
  ScEditorItalic,
  ScEditorOrderedList,
  ScEditorUnderline,
} from '@semantic-components/ui/editor';
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
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScToolbarSeparator,
    ScToggle,
    ScFrame,
    FormField,
    ScEditor,
    ScEditorContent,
    ScEditorBold,
    ScEditorItalic,
    ScEditorUnderline,
    ScEditorBulletList,
    ScEditorOrderedList,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiListIcon,
    SiListOrderedIcon,
  ],
  template: \`
    <div class="w-full">
      <div scEditor [formField]="editorForm.body" class="flex flex-col gap-2">
        <div scToolbar aria-label="Formatting" class="w-full flex-wrap">
          <div scToolbarWidgetGroup>
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

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorBulletList>
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scToolbarWidget scToggle scEditorOrderedList>
              <svg siListOrderedIcon></svg>
              <span class="sr-only">Numbered list</span>
            </button>
          </div>
        </div>

        <div scFrame scEditorContent ariaLabel="Notes"></div>
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
