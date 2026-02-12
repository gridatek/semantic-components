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
  ScEditorStrikethroughButton,
  ScEditorSeparator,
  ScEditorHeadingSelect,
  ScEditorUndoButton,
  ScEditorRedoButton,
  ScEditorAlignLeftButton,
  ScEditorAlignCenterButton,
  ScEditorAlignRightButton,
  ScEditorAlignJustifyButton,
  ScEditorBulletListButton,
  ScEditorNumberedListButton,
  ScEditorLinkButton,
  ScEditorBlockquoteButton,
  ScEditorCodeButton,
  ScEditorHorizontalRuleButton,
  ScEditorClearFormattingButton,
  ScEditorFooter,
  ScEditorCount,
  ScEditorWordCount,
  ScEditorCharCount,
} from '@semantic-components/ui-lab';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
  SiStrikethroughIcon,
  SiUndoIcon,
  SiRedoIcon,
  SiAlignLeftIcon,
  SiAlignCenterIcon,
  SiAlignRightIcon,
  SiAlignJustifyIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiLinkIcon,
  SiQuoteIcon,
  SiCodeIcon,
  SiMinusIcon,
  SiRemoveFormattingIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-full-featured-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldButton,
    ScEditorItalicButton,
    ScEditorUnderlineButton,
    ScEditorStrikethroughButton,
    ScEditorSeparator,
    ScEditorHeadingSelect,
    ScEditorUndoButton,
    ScEditorRedoButton,
    ScEditorAlignLeftButton,
    ScEditorAlignCenterButton,
    ScEditorAlignRightButton,
    ScEditorAlignJustifyButton,
    ScEditorBulletListButton,
    ScEditorNumberedListButton,
    ScEditorLinkButton,
    ScEditorBlockquoteButton,
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
    SiAlignLeftIcon,
    SiAlignCenterIcon,
    SiAlignRightIcon,
    SiAlignJustifyIcon,
    SiListIcon,
    SiListOrderedIcon,
    SiLinkIcon,
    SiQuoteIcon,
    SiCodeIcon,
    SiMinusIcon,
    SiRemoveFormattingIcon,
  ],
  template: `
    <p class="text-sm text-muted-foreground mb-4">
      Try all the formatting options: bold, italic, headings, lists, links,
      blockquotes, and more.
    </p>
    <div sc-editor class="border rounded-lg overflow-hidden">
      <div sc-editor-toolbar>
        <div sc-editor-toolbar-group>
          <button sc-editor-undo>
            <svg si-undo-icon class="size-4"></svg>
            <span class="sr-only">Undo</span>
          </button>
          <button sc-editor-redo>
            <svg si-redo-icon class="size-4"></svg>
            <span class="sr-only">Redo</span>
          </button>
        </div>

        <div sc-editor-separator></div>

        <div sc-editor-toolbar-group>
          <select sc-editor-heading></select>
        </div>

        <div sc-editor-separator></div>

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
          <button sc-editor-strikethrough>
            <svg si-strikethrough-icon class="size-4"></svg>
            <span class="sr-only">Strikethrough</span>
          </button>
        </div>

        <div sc-editor-separator></div>

        <div sc-editor-toolbar-group>
          <button sc-editor-align-left>
            <svg si-align-left-icon class="size-4"></svg>
            <span class="sr-only">Align left</span>
          </button>
          <button sc-editor-align-center>
            <svg si-align-center-icon class="size-4"></svg>
            <span class="sr-only">Align center</span>
          </button>
          <button sc-editor-align-right>
            <svg si-align-right-icon class="size-4"></svg>
            <span class="sr-only">Align right</span>
          </button>
          <button sc-editor-align-justify>
            <svg si-align-justify-icon class="size-4"></svg>
            <span class="sr-only">Align justify</span>
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

        <div sc-editor-separator></div>

        <div sc-editor-toolbar-group>
          <button sc-editor-link>
            <svg si-link-icon class="size-4"></svg>
            <span class="sr-only">Insert link</span>
          </button>
          <button sc-editor-blockquote>
            <svg si-quote-icon class="size-4"></svg>
            <span class="sr-only">Blockquote</span>
          </button>
          <button sc-editor-code>
            <svg si-code-icon class="size-4"></svg>
            <span class="sr-only">Code</span>
          </button>
          <button sc-editor-horizontal-rule>
            <svg si-minus-icon class="size-4"></svg>
            <span class="sr-only">Horizontal rule</span>
          </button>
        </div>

        <div sc-editor-separator></div>

        <div sc-editor-toolbar-group>
          <button sc-editor-clear-formatting>
            <svg si-remove-formatting-icon class="size-4"></svg>
            <span class="sr-only">Clear formatting</span>
          </button>
        </div>
      </div>

      <div sc-editor-content [(value)]="content" minHeight="250px"></div>

      <div sc-editor-footer>
        <div sc-editor-count>
          <span sc-editor-word-count></span>
          <span sc-editor-char-count></span>
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-4">
      <button
        type="button"
        (click)="clearContent()"
        class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
      >
        Clear Content
      </button>
      <button
        type="button"
        (click)="insertSampleContent()"
        class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Insert Sample Content
      </button>
    </div>
  `,
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
