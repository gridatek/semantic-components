import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
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
  ScEditorClearFormattingToggle,
  ScEditorCodeToggle,
  ScEditorContent,
  ScEditorCount,
  ScEditorFooter,
  ScEditorHeading,
  type ScEditorHeadingLevel,
  ScEditorHorizontalRuleToggle,
  ScEditorItalicToggle,
  ScEditorLinkToggle,
  ScEditorNumberedListToggle,
  ScEditorRedoToggle,
  ScEditorSeparator,
  ScEditorStrikethroughToggle,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderlineToggle,
  ScEditorUndoToggle,
  ScEditorWordCount,
} from '@semantic-components/editor';
import {
  ScButton,
  ScField,
  ScInput,
  ScLabel,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiChevronDownIcon,
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
    FormField,
    ScField,
    ScInput,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldToggle,
    ScEditorItalicToggle,
    ScEditorUnderlineToggle,
    ScEditorStrikethroughToggle,
    ScEditorSeparator,
    ScEditorHeading,
    ScEditorUndoToggle,
    ScEditorRedoToggle,
    ScEditorAlignLeftToggle,
    ScEditorAlignCenterToggle,
    ScEditorAlignRightToggle,
    ScEditorAlignJustifyToggle,
    ScEditorBulletListToggle,
    ScEditorNumberedListToggle,
    ScEditorLinkToggle,
    ScEditorBlockquoteToggle,
    ScEditorCodeToggle,
    ScEditorHorizontalRuleToggle,
    ScEditorClearFormattingToggle,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiBoldIcon,
    SiChevronDownIcon,
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
      <div
        scEditor
        #editor="scEditor"
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar aria-label="Text formatting">
          <div scEditorToolbarGroup>
            <button scEditorUndoToggle value="undo">
              <svg siUndoIcon></svg>
              <span class="sr-only">Undo</span>
            </button>
            <button scEditorRedoToggle value="redo">
              <svg siRedoIcon></svg>
              <span class="sr-only">Redo</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scMenuProvider>
            <button
              scMenuTrigger
              scEditorHeading
              value="heading"
              #heading="scEditorHeading"
              class="w-auto gap-1"
            >
              {{ headingLabels[heading.level()] }}
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu (itemSelected)="heading.select($event)">
                <ng-template scMenuContent>
                  @for (level of headingLevels; track level) {
                    <div scMenuItem [value]="level">
                      {{ headingLabels[level] }}
                    </div>
                  }
                </ng-template>
              </div>
            </ng-template>
          </div>

          <div scEditorSeparator></div>

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
            <button scEditorStrikethroughToggle value="strikethrough">
              <svg siStrikethroughIcon></svg>
              <span class="sr-only">Strikethrough</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorAlignLeftToggle value="align-left">
              <svg siTextAlignStartIcon></svg>
              <span class="sr-only">Align left</span>
            </button>
            <button scEditorAlignCenterToggle value="align-center">
              <svg siTextAlignCenterIcon></svg>
              <span class="sr-only">Align center</span>
            </button>
            <button scEditorAlignRightToggle value="align-right">
              <svg siTextAlignEndIcon></svg>
              <span class="sr-only">Align right</span>
            </button>
            <button scEditorAlignJustifyToggle value="align-justify">
              <svg siTextAlignJustifyIcon></svg>
              <span class="sr-only">Align justify</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorBulletListToggle value="bullet-list">
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scEditorNumberedListToggle value="numbered-list">
              <svg siListOrderedIcon></svg>
              <span class="sr-only">Numbered list</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <div scPopoverProvider [(open)]="linkOpen">
              <button
                scEditorLinkToggle
                scPopoverTrigger
                value="link"
                (click)="editLink(editor.linkHref())"
              >
                <svg siLinkIcon></svg>
                <span class="sr-only">Link</span>
              </button>
              <ng-template scPopoverPortal>
                <div scPopover class="w-72">
                  <div scField>
                    <label scLabel>Address</label>
                    <input
                      scInput
                      type="url"
                      [formField]="linkForm.href"
                      (keydown.enter)="applyLink(editor)"
                    />
                  </div>
                  <div class="flex justify-end gap-2">
                    @if (editor.linkHref()) {
                      <button
                        scButton
                        variant="outline"
                        type="button"
                        (click)="removeLink(editor)"
                      >
                        Remove
                      </button>
                    }
                    <button scButton type="button" (click)="applyLink(editor)">
                      Apply
                    </button>
                  </div>
                </div>
              </ng-template>
            </div>
            <button scEditorBlockquoteToggle value="blockquote">
              <svg siQuoteIcon></svg>
              <span class="sr-only">Blockquote</span>
            </button>
            <button scEditorCodeToggle value="code">
              <svg siCodeIcon></svg>
              <span class="sr-only">Code</span>
            </button>
            <button scEditorHorizontalRuleToggle value="horizontal-rule">
              <svg siMinusIcon></svg>
              <span class="sr-only">Horizontal rule</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorClearFormattingToggle value="clear-formatting">
              <svg siRemoveFormattingIcon></svg>
              <span class="sr-only">Clear formatting</span>
            </button>
          </div>
        </div>

        <div
          scEditorContent
          ariaLabel="Article"
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
          editorForm.body().value()
        }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FullFeaturedEditorDemo {
  private readonly model = signal({ body: '' });
  readonly editorForm = form(this.model);

  /** The link popover and its address. */
  readonly linkOpen = signal(false);
  private readonly linkModel = signal({ href: '' });
  readonly linkForm = form(this.linkModel);

  readonly headingLevels: ScEditorHeadingLevel[] = ['p', 'h1', 'h2', 'h3'];
  readonly headingLabels: Record<ScEditorHeadingLevel, string> = {
    p: 'Paragraph',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
  };

  /** The link popover opens with the address at the selection. */
  editLink(href: string): void {
    this.linkModel.set({ href: href || 'https://' });
  }

  applyLink(editor: ScEditor): void {
    editor.setLink(this.linkModel().href);
    this.linkOpen.set(false);
  }

  removeLink(editor: ScEditor): void {
    editor.unsetLink();
    this.linkOpen.set(false);
  }

  clearContent(): void {
    this.model.set({ body: '' });
  }

  insertSampleContent(): void {
    this.model.set({
      body: `
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
    `,
    });
  }
}
