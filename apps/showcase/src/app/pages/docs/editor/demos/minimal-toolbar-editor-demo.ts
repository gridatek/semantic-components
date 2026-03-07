import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScEditor,
  ScEditorBoldButton,
  ScEditorCharCount,
  ScEditorContent,
  ScEditorCount,
  ScEditorFooter,
  ScEditorItalicButton,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorWordCount,
} from '@semantic-components/editor';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-minimal-toolbar-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldButton,
    ScEditorItalicButton,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
    SiBoldIcon,
    SiItalicIcon,
  ],
  template: `
    <div class="w-full">
      <div scEditor class="overflow-hidden rounded-lg border">
        <div scEditorToolbar>
          <div scEditorToolbarGroup>
            <button scEditorBold>
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic>
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
          </div>
        </div>

        <div
          scEditorContent
          [(value)]="content"
          placeholder="Simple text formatting only..."
        ></div>

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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalToolbarEditorDemo {
  readonly content = signal('');
}
