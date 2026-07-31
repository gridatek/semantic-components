import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScEditor,
  ScEditorBoldToggle,
  ScEditorContent,
  ScEditorItalicToggle,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderlineToggle,
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-editor-usage-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldToggle,
    ScEditorItalicToggle,
    ScEditorUnderlineToggle,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: `
    <div class="w-full max-w-lg">
      <div scEditor class="overflow-hidden rounded-lg border">
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
        </div>

        <div
          scEditorContent
          [(value)]="content"
          placeholder="Start writing..."
        ></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorUsageDemo {
  readonly content = signal('');
}
