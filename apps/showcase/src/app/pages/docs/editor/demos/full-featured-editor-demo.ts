import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScEditor,
  ScEditorAlignCenterToggle,
  ScEditorAlignJustifyToggle,
  ScEditorAlignLeftToggle,
  ScEditorAlignRightToggle,
  ScEditorBlockquoteToggle,
  ScEditorBoldToggle,
  ScEditorBulletListToggle,
  ScEditorCharCount,
  ScEditorClearFormattingButton,
  ScEditorCodeButton,
  ScEditorContent,
  ScEditorCount,
  ScEditorFooter,
  ScEditorHeadingSelect,
  ScEditorHorizontalRuleButton,
  ScEditorItalicToggle,
  ScEditorLinkButton,
  ScEditorNumberedListToggle,
  ScEditorRedoButton,
  ScEditorSeparator,
  ScEditorStrikethroughToggle,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderlineToggle,
  ScEditorUndoButton,
  ScEditorWordCount,
} from '@semantic-components/editor';
import { ScButton } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiCodeIcon,
  SiItalicIcon,
  SiLinkIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiMinusIcon,
  SiQuoteIcon,
  SiRedoIcon,
  SiRemoveFormattingIcon,
  SiStrikethroughIcon,
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignJustifyIcon,
  SiTextAlignStartIcon,
  SiUnderlineIcon,
  SiUndoIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-full-featured-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldToggle,
    ScEditorItalicToggle,
    ScEditorUnderlineToggle,
    ScEditorStrikethroughToggle,
    ScEditorSeparator,
    ScEditorHeadingSelect,
    ScEditorUndoButton,
    ScEditorRedoButton,
    ScEditorAlignLeftToggle,
    ScEditorAlignCenterToggle,
    ScEditorAlignRightToggle,
    ScEditorAlignJustifyToggle,
    ScEditorBulletListToggle,
    ScEditorNumberedListToggle,
    ScEditorLinkButton,
    ScEditorBlockquoteToggle,
    ScEditorCodeButton,
    ScEditorHorizontalRuleButton,
    ScEditorClearFormattingButton,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiStrikethroughIcon,
    SiUndoIcon,
    SiRedoIcon,
    SiTextAlignStartIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
    SiTextAlignJustifyIcon,
    SiListIcon,
    SiListOrderedIcon,
    SiLinkIcon,
    SiQuoteIcon,
    SiCodeIcon,
    SiMinusIcon,
    SiRemoveFormattingIcon,
    ScButton,
  ],
  template: `
    <div class="w-full">
      <p class="text-muted-foreground mb-4 text-sm">
        Try all the formatting options: bold, italic, headings, lists, links,
        blockquotes, and more.
      </p>
      <div scEditor class="overflow-hidden rounded-lg border">
        <div scEditorToolbar>
          <div scEditorToolbarGroup>
            <button scEditorUndo>
              <svg siUndoIcon></svg>
              <span class="sr-only">Undo</span>
            </button>
            <button scEditorRedo>
              <svg siRedoIcon></svg>
              <span class="sr-only">Redo</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <select scEditorHeading></select>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorBoldToggle>
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalicToggle>
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scEditorUnderlineToggle>
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
            <button scEditorStrikethroughToggle>
              <svg siStrikethroughIcon></svg>
              <span class="sr-only">Strikethrough</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorAlignLeftToggle>
              <svg siTextAlignStartIcon></svg>
              <span class="sr-only">Align left</span>
            </button>
            <button scEditorAlignCenterToggle>
              <svg siTextAlignCenterIcon></svg>
              <span class="sr-only">Align center</span>
            </button>
            <button scEditorAlignRightToggle>
              <svg siTextAlignEndIcon></svg>
              <span class="sr-only">Align right</span>
            </button>
            <button scEditorAlignJustifyToggle>
              <svg siTextAlignJustifyIcon></svg>
              <span class="sr-only">Align justify</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorBulletListToggle>
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scEditorNumberedListToggle>
              <svg siListOrderedIcon></svg>
              <span class="sr-only">Numbered list</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorLink>
              <svg siLinkIcon></svg>
              <span class="sr-only">Insert link</span>
            </button>
            <button scEditorBlockquoteToggle>
              <svg siQuoteIcon></svg>
              <span class="sr-only">Blockquote</span>
            </button>
            <button scEditorCode>
              <svg siCodeIcon></svg>
              <span class="sr-only">Code</span>
            </button>
            <button scEditorHorizontalRule>
              <svg siMinusIcon></svg>
              <span class="sr-only">Horizontal rule</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorClearFormatting>
              <svg siRemoveFormattingIcon></svg>
              <span class="sr-only">Clear formatting</span>
            </button>
          </div>
        </div>

        <div
          scEditorContent
          [(value)]="content"
          class="max-h-[500px] min-h-[300px]"
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
      <div class="mt-4 flex gap-4">
        <button scButton variant="outline" (click)="clearContent()">
          Clear Content
        </button>
        <button scButton (click)="insertSampleContent()">
          Insert Sample Content
        </button>
      </div>

      <div class="mt-4">
        <h4 class="mb-2 text-sm font-medium">HTML Output:</h4>
        <pre class="bg-muted max-h-32 overflow-x-auto rounded-lg p-3 text-xs">{{
          content()
        }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullFeaturedEditorDemo {
  readonly content = signal('');

  clearContent(): void {
    this.content.set('');
  }

  insertSampleContent(): void {
    this.content.set(`
      <h1>Article Title</h1>
      <p>This is the introduction paragraph of the article. It provides an overview of what will be discussed.</p>

      <h2>First Section</h2>
      <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <h3>Subsection</h3>
      <p>Here are some key points to consider:</p>
      <ul>
        <li>First important point</li>
        <li>Second important point</li>
        <li>Third important point</li>
      </ul>

      <h2>Second Section</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

      <blockquote>
        "The only way to do great work is to love what you do." - Steve Jobs
      </blockquote>

      <p>Here's a numbered list of steps:</p>
      <ol>
        <li>Begin with the basics</li>
        <li>Build upon your foundation</li>
        <li>Practice regularly</li>
        <li>Review and improve</li>
      </ol>

      <hr>

      <h2>Conclusion</h2>
      <p>In conclusion, this rich text editor provides all the tools you need for creating well-formatted content.</p>
      <p>For more information, visit our <a href="https://example.com">documentation</a>.</p>
    `);
  }
}
