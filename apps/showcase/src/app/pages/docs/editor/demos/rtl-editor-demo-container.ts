import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlEditorDemo } from './rtl-editor-demo';

@Component({
  selector: 'app-rtl-editor-demo-container',
  imports: [DemoContainer, RtlEditorDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/editor/rtl-editor-demo"
    >
      <app-rtl-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlEditorDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
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
  ScEditorCommand,
  ScEditorContent,
} from '@semantic-components/ui/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiUnderlineIcon,
  SiUndoIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the toolbar and the text from the right. */
@Component({
  selector: 'app-rtl-editor-demo',
  imports: [
    Dir,
    FormField,
    ScFrame,
    ScToggle,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScEditor,
    ScEditorCommand,
    ScEditorContent,
    SiBoldIcon,
    SiItalicIcon,
    SiListIcon,
    SiListOrderedIcon,
    SiUnderlineIcon,
    SiUndoIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-lg">
      <div
        scEditor
        [formField]="noteForm.body"
        class="flex w-full flex-col gap-2"
      >
        <div scToolbar aria-label="التنسيق" class="w-full flex-wrap">
          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">عريض</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">مائل</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">تسطير</span>
            </button>
          </div>
          <div scToolbarSeparator></div>
          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="bullet-list">
              <svg siListIcon></svg>
              <span class="sr-only">قائمة نقطية</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="ordered-list">
              <svg siListOrderedIcon></svg>
              <span class="sr-only">قائمة مرقمة</span>
            </button>
          </div>
          <div scToolbarSeparator></div>
          <button scToolbarWidget scToggle scEditorCommand="undo">
            <svg siUndoIcon></svg>
            <span class="sr-only">تراجع</span>
          </button>
        </div>
        <div scFrame scEditorContent ariaLabel="النص" class="min-h-32"></div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlEditorDemo {
  private readonly model = signal({
    body: '<p>تستيقظ الحديقة.</p><ul><li><p>أولاً الزعفران</p></li><li><p>ثم التوليب</p></li></ul>',
  });
  readonly noteForm = form(this.model);
}`;
}
