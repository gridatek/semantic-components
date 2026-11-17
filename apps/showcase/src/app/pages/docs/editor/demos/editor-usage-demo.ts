import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  SiUnderlineIcon,
  SiUndoIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-editor-usage-demo',
  imports: [
    FormField,
    ScFrame,
    ScToggle,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScEditor,
    ScEditorContent,
    ScEditorCommand,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiUndoIcon,
  ],
  template: `
    <div
      scEditor
      [formField]="editorForm.body"
      class="flex w-full max-w-lg flex-col gap-2"
    >
      <div scToolbar aria-label="Formatting">
        <div scToolbarWidgetGroup aria-label="Marks">
          <button scToolbarWidget scToggle scEditorCommand="bold">
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scToolbarWidget scToggle scEditorCommand="italic">
            <svg siItalicIcon></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button scToolbarWidget scToggle scEditorCommand="underline">
            <svg siUnderlineIcon></svg>
            <span class="sr-only">Underline</span>
          </button>
        </div>
        <div scToolbarSeparator></div>
        <button scToolbarWidget scToggle scEditorCommand="undo">
          <svg siUndoIcon></svg>
          <span class="sr-only">Undo</span>
        </button>
      </div>
      <div
        scFrame
        scEditorContent
        ariaLabel="Message"
        placeholder="Start writing..."
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorUsageDemo {
  private readonly model = signal({ body: '' });
  private readonly editorForm = form(this.model);
}
