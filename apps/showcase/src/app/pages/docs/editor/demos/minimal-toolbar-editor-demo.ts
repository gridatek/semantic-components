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
} from '@semantic-components/ui-lab';
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
    <div sc-editor class="border rounded-lg overflow-hidden">
      <div sc-editor-toolbar>
        <div sc-editor-toolbar-group>
          <button sc-editor-bold>
            <svg si-bold-icon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button sc-editor-italic>
            <svg si-italic-icon></svg>
            <span class="sr-only">Italic</span>
          </button>
        </div>
      </div>

      <div
        sc-editor-content
        [(value)]="content"
        placeholder="Simple text formatting only..."
      ></div>

      <div sc-editor-footer>
        <div sc-editor-count>
          <span sc-editor-word-count></span>
          <span sc-editor-char-count></span>
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
