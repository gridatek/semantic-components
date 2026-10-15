import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBoldToggle,
  ScEditorBulletListToggle,
  ScEditorContent,
  ScEditorItalicToggle,
  ScEditorNumberedListToggle,
  ScEditorSeparator,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderlineToggle,
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
    ScEditorBoldToggle,
    ScEditorItalicToggle,
    ScEditorUnderlineToggle,
    ScEditorSeparator,
    ScEditorBulletListToggle,
    ScEditorNumberedListToggle,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiListIcon,
    SiListOrderedIcon,
  ],
  template: `
    <div class="w-full">
      <div
        scEditor
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar>
          <div scEditorToolbarGroup>
            <button scEditorBoldToggle value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalicToggle value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scEditorUnderlineToggle value="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorBulletListToggle value="bullet-list">
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scEditorNumberedListToggle value="numbered-list">
              <svg siListOrderedIcon></svg>
              <span class="sr-only">Numbered list</span>
            </button>
          </div>
        </div>

        <div scEditorContent ariaLabel="Notes"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCountEditorDemo {
  private readonly model = signal({ body: '' });
  readonly editorForm = form(this.model);
}
