import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
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
    <div scEditor class="border rounded-lg overflow-hidden">
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
          <span scEditorWordCount></span>
          <span scEditorCharCount></span>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalToolbarEditorDemo {
  readonly content = signal('');
}
