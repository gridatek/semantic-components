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
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
  SiListIcon,
  SiListOrderedIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-editor-demo',
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
    <div scEditor class="border rounded-lg overflow-hidden">
      <div scEditorToolbar>
        <div scEditorToolbarGroup>
          <button scEditorBold>
            <svg si-bold-icon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scEditorItalic>
            <svg si-italic-icon></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button scEditorUnderline>
            <svg si-underline-icon></svg>
            <span class="sr-only">Underline</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorBulletList>
            <svg si-list-icon></svg>
            <span class="sr-only">Bullet list</span>
          </button>
          <button scEditorNumberedList>
            <svg si-list-ordered-icon></svg>
            <span class="sr-only">Numbered list</span>
          </button>
        </div>
      </div>

      <div
        scEditorContent
        [(value)]="content"
        placeholder="Start writing your content..."
      ></div>

      <div scEditorFooter>
        <div scEditorCount>
          <span scEditorWordCount></span>
          <span scEditorCharCount></span>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h4 class="text-sm font-medium mb-2">HTML Output:</h4>
      <pre class="p-3 bg-muted rounded-lg text-xs overflow-x-auto max-h-32">{{
        content()
      }}</pre>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEditorDemo {
  readonly content = signal('');
}
