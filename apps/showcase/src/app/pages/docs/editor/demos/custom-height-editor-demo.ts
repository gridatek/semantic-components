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
  ScEditorUnderlineButton,
  ScEditorSeparator,
  ScEditorBulletListButton,
  ScEditorNumberedListButton,
  ScEditorFooter,
  ScEditorCount,
  ScEditorWordCount,
  ScEditorCharCount,
} from '@semantic-components/ui-lab';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
  SiListIcon,
  SiListOrderedIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-height-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldButton,
    ScEditorItalicButton,
    ScEditorUnderlineButton,
    ScEditorSeparator,
    ScEditorBulletListButton,
    ScEditorNumberedListButton,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiListIcon,
    SiListOrderedIcon,
  ],
  template: `
    <div sc-editor class="border rounded-lg overflow-hidden">
      <div sc-editor-toolbar>
        <div sc-editor-toolbar-group>
          <button sc-editor-bold>
            <svg si-bold-icon class="size-4"></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button sc-editor-italic>
            <svg si-italic-icon class="size-4"></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button sc-editor-underline>
            <svg si-underline-icon class="size-4"></svg>
            <span class="sr-only">Underline</span>
          </button>
        </div>

        <div sc-editor-separator></div>

        <div sc-editor-toolbar-group>
          <button sc-editor-bullet-list>
            <svg si-list-icon class="size-4"></svg>
            <span class="sr-only">Bullet list</span>
          </button>
          <button sc-editor-numbered-list>
            <svg si-list-ordered-icon class="size-4"></svg>
            <span class="sr-only">Numbered list</span>
          </button>
        </div>
      </div>

      <div
        sc-editor-content
        [(value)]="content"
        class="min-h-[300px] max-h-[500px]"
        placeholder="This editor has a taller minimum height..."
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
export class CustomHeightEditorDemo {
  readonly content = signal('');
}
