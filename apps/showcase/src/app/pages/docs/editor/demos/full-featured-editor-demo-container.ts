import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullFeaturedEditorDemo } from './full-featured-editor-demo';

@Component({
  selector: 'app-full-featured-editor-demo-container',
  imports: [DemoContainer, FullFeaturedEditorDemo],
  template: `
    <app-demo-container
      title="Full Featured Editor"
      [code]="code"
      demoUrl="/demos/editor/full-featured-editor-demo"
    >
      <app-full-featured-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullFeaturedEditorDemoContainer {
  readonly code = `import {
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
} from '@semantic-components/editor';
import {
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
  ],
  template: \`
    <p class="text-sm text-muted-foreground mb-4">
      Try all the formatting options: bold, italic, headings, lists, links,
      blockquotes, and more.
    </p>
    <div scEditor class="border rounded-lg overflow-hidden">
      <div scEditorToolbar>
        <div scEditorToolbarGroup>
          <button scEditorUndo>
            <svg siUndoIcon class="size-4"></svg>
            <span class="sr-only">Undo</span>
          </button>
          <button scEditorRedo>
            <svg siRedoIcon class="size-4"></svg>
            <span class="sr-only">Redo</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <select scEditorHeading></select>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorBold>
            <svg siBoldIcon class="size-4"></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scEditorItalic>
            <svg siItalicIcon class="size-4"></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button scEditorUnderline>
            <svg siUnderlineIcon class="size-4"></svg>
            <span class="sr-only">Underline</span>
          </button>
          <button scEditorStrikethrough>
            <svg siStrikethroughIcon class="size-4"></svg>
            <span class="sr-only">Strikethrough</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorAlignLeft>
            <svg siTextAlignStartIcon class="size-4"></svg>
            <span class="sr-only">Align left</span>
          </button>
          <button scEditorAlignCenter>
            <svg siTextAlignCenterIcon class="size-4"></svg>
            <span class="sr-only">Align center</span>
          </button>
          <button scEditorAlignRight>
            <svg siTextAlignEndIcon class="size-4"></svg>
            <span class="sr-only">Align right</span>
          </button>
          <button scEditorAlignJustify>
            <svg siTextAlignJustifyIcon class="size-4"></svg>
            <span class="sr-only">Align justify</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorBulletList>
            <svg siListIcon class="size-4"></svg>
            <span class="sr-only">Bullet list</span>
          </button>
          <button scEditorNumberedList>
            <svg siListOrderedIcon class="size-4"></svg>
            <span class="sr-only">Numbered list</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorLink>
            <svg siLinkIcon class="size-4"></svg>
            <span class="sr-only">Insert link</span>
          </button>
          <button scEditorBlockquote>
            <svg siQuoteIcon class="size-4"></svg>
            <span class="sr-only">Blockquote</span>
          </button>
          <button scEditorCode>
            <svg siCodeIcon class="size-4"></svg>
            <span class="sr-only">Code</span>
          </button>
          <button scEditorHorizontalRule>
            <svg siMinusIcon class="size-4"></svg>
            <span class="sr-only">Horizontal rule</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorClearFormatting>
            <svg siRemoveFormattingIcon class="size-4"></svg>
            <span class="sr-only">Clear formatting</span>
          </button>
        </div>
      </div>

      <div scEditorContent [(value)]="content" minHeight="250px"></div>

      <div scEditorFooter>
        <div scEditorCount>
          <span scEditorWordCount></span>
          <span scEditorCharCount></span>
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullFeaturedEditorDemo {
  readonly content = signal('');

  clearContent(): void {
    this.content.set('');
  }

  insertSampleContent(): void {
    this.content.set(\`
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
    \`);
  }
}`;
}
