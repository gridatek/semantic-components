import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScEditor,
  ScEditorBoldButton,
  ScEditorBulletListButton,
  ScEditorCharCount,
  ScEditorContent,
  ScEditorCount,
  ScEditorFooter,
  ScEditorItalicButton,
  ScEditorNumberedListButton,
  ScEditorSeparator,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderlineButton,
  ScEditorWordCount,
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiUnderlineIcon,
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
            <button scEditorUnderline>
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorBulletList>
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scEditorNumberedList>
              <svg siListOrderedIcon></svg>
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
            <span scEditorWordCount #wc="scEditorWordCount">
              {{ wc.wordCount() }} words
            </span>
            <span scEditorCharCount #cc="scEditorCharCount">
              {{ cc.charCount() }} characters
            </span>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h4 class="mb-2 text-sm font-medium">HTML Output:</h4>
        <pre class="bg-muted max-h-32 overflow-x-auto rounded-lg p-3 text-xs">{{
          content()
        }}</pre>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEditorDemo {
  readonly content = signal('');
}
