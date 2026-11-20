import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullFeaturedEditorDemo } from './full-featured-editor-demo';

@Component({
  selector: 'app-full-featured-editor-demo-container',
  imports: [DemoContainer, FullFeaturedEditorDemo],
  template: `
    <app-demo-container
      title="An article, with every tool"
      [code]="code"
      demoUrl="/demos/editor/full-featured-editor-demo"
    >
      <app-full-featured-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FullFeaturedEditorDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScField,
  ScFrame,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScLink,
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
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScSeparator,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorBlock,
  type ScEditorBlockType,
  ScEditorCharCount,
  ScEditorCommand,
  ScEditorContent,
  ScEditorCount,
  ScEditorLink,
  ScEditorWordCount,
  provideEditor,
} from '@semantic-components/ui/editor';
import { withAlign } from '@semantic-components/ui/editor/align';
import { ScEditorBubbleMenu } from '@semantic-components/ui/editor/bubble-menu';
import {
  ScEditorHighlight,
  ScEditorHighlightColor,
  ScEditorRemoveHighlight,
  withHighlight,
} from '@semantic-components/ui/editor/highlight';
import {
  ScEditorImage,
  type ScEditorUploadHandler,
  ScEditorUploads,
  withImages,
} from '@semantic-components/ui/editor/images';
import { withScripts } from '@semantic-components/ui/editor/scripts';
import {
  ScEditorReplace,
  ScEditorReplaceAll,
  ScEditorReplaceInput,
  ScEditorSearchBar,
  ScEditorSearchClose,
  ScEditorSearchInput,
  ScEditorSearchNext,
  ScEditorSearchOption,
  ScEditorSearchPrevious,
  ScEditorSearchResults,
  withSearch,
} from '@semantic-components/ui/editor/search';
import {
  ScEditorTable,
  type ScEditorTableAction,
  withTables,
} from '@semantic-components/ui/editor/tables';
import {
  SiBanIcon,
  SiBoldIcon,
  SiCaseSensitiveIcon,
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiCodeIcon,
  SiCodeXmlIcon,
  SiExternalLinkIcon,
  SiHeading1Icon,
  SiHeading2Icon,
  SiHeading3Icon,
  SiHeading4Icon,
  SiHeadingIcon,
  SiHighlighterIcon,
  SiImagePlusIcon,
  SiItalicIcon,
  SiLinkIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiListTodoIcon,
  SiMinusIcon,
  SiRedoIcon,
  SiRegexIcon,
  SiRemoveFormattingIcon,
  SiSearchIcon,
  SiStrikethroughIcon,
  SiSubscriptIcon,
  SiSuperscriptIcon,
  SiTable2Icon,
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignJustifyIcon,
  SiTextAlignStartIcon,
  SiTextQuoteIcon,
  SiUnderlineIcon,
  SiUndoIcon,
  SiUnlinkIcon,
  SiWholeWordIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

const SAMPLE = \`<h1>Getting started</h1>
<p>Welcome to the editor: a <strong>rich text editor</strong> built on <a href="https://tiptap.dev">Tiptap</a>, with every part written in your own template.</p>
<p>Write in <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike</s> or <code>code</code>, and <mark data-color="var(--sc-editor-highlight-1)" style="background-color: var(--sc-editor-highlight-1)">highlight</mark> what matters. Superscript and subscript: E = mc<sup>2</sup>, H<sub>2</sub>O.</p>
<h2>Lists</h2>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><p>Pick a block type from the heading menu</p></li>
  <li data-type="taskItem" data-checked="false"><p>Try a bulleted, numbered or task list</p></li>
  <li data-type="taskItem" data-checked="false"><p>Drop an image into the document</p></li>
</ul>
<h2>Code</h2>
<pre><code>const editor = inject(SC_EDITOR);
editor.run((chain) =&gt; chain.toggleBold());</code></pre>
<h2>Tables</h2>
<table>
  <tr><th><p>Feature</p></th><th><p>Where</p></th></tr>
  <tr><td><p>Tables</p></td><td><p>The table menu</p></td></tr>
  <tr><td><p>Floating toolbar</p></td><td><p>Select some text</p></td></tr>
</table>
<blockquote><p>Search with Ctrl + F, and replace what you find.</p></blockquote>
<p style="text-align: center">Centred, justified, or aligned to either side.</p>\`;

/**
 * The editor with everything: the toolbar of Tiptap's Simple Editor (undo,
 * block type, lists, marks, highlight, link, alignment, images) and search
 * and replace, in the library's styles.
 */
@Component({
  selector: 'app-full-featured-editor-demo',
  providers: [
    provideEditor(
      withAlign(),
      withHighlight(),
      withImages(),
      withScripts(),
      withSearch(),
      withTables(),
    ),
  ],
  imports: [
    ScInputGroupAddon,
    ScInputGroup,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScToolbarSeparator,
    ScToggle,
    ScFrame,
    FormField,
    ScButton,
    ScField,
    ScInput,
    ScLabel,
    ScLink,
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
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    ScSeparator,
    ScEditor,
    ScEditorCommand,
    ScEditorCharCount,
    ScEditorContent,
    ScEditorCount,
    ScEditorBlock,
    ScEditorLink,
    ScEditorWordCount,
    ScEditorBubbleMenu,
    ScEditorHighlight,
    ScEditorHighlightColor,
    ScEditorRemoveHighlight,
    ScEditorImage,
    ScEditorUploads,
    ScEditorTable,
    ScEditorSearchBar,
    ScEditorSearchInput,
    ScEditorSearchResults,
    ScEditorSearchPrevious,
    ScEditorSearchNext,
    ScEditorSearchOption,
    ScEditorReplaceInput,
    ScEditorReplace,
    ScEditorReplaceAll,
    ScEditorSearchClose,
    SiBanIcon,
    SiBoldIcon,
    SiCaseSensitiveIcon,
    SiChevronDownIcon,
    SiChevronUpIcon,
    SiCodeIcon,
    SiCodeXmlIcon,
    SiExternalLinkIcon,
    SiHeading1Icon,
    SiHeading2Icon,
    SiHeading3Icon,
    SiHeading4Icon,
    SiHeadingIcon,
    SiHighlighterIcon,
    SiImagePlusIcon,
    SiItalicIcon,
    SiLinkIcon,
    SiListIcon,
    SiListOrderedIcon,
    SiListTodoIcon,
    SiMinusIcon,
    SiRedoIcon,
    SiRegexIcon,
    SiRemoveFormattingIcon,
    SiSearchIcon,
    SiStrikethroughIcon,
    SiSubscriptIcon,
    SiSuperscriptIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
    SiTextAlignJustifyIcon,
    SiTextAlignStartIcon,
    SiTable2Icon,
    SiTextQuoteIcon,
    SiUnderlineIcon,
    SiUndoIcon,
    SiUnlinkIcon,
    SiWholeWordIcon,
    SiXIcon,
  ],
  template: \`
    <div class="w-full">
      <div
        scEditor
        #images="scEditorUploads"
        [formField]="editorForm.body"
        [upload]="upload"
        class="flex flex-col gap-2"
      >
        <div scToolbar aria-label="Formatting" class="w-full flex-wrap">
          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="undo">
              <svg siUndoIcon></svg>
              <span class="sr-only">Undo</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="redo">
              <svg siRedoIcon></svg>
              <span class="sr-only">Redo</span>
            </button>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <div scMenuProvider>
              <button
                scToolbarWidget
                scToggle
                scMenuTrigger
                scEditorBlock
                #block="scEditorBlock"
              >
                @switch (block.value()) {
                  @case ('heading-1') {
                    <svg siHeading1Icon></svg>
                  }
                  @case ('heading-2') {
                    <svg siHeading2Icon></svg>
                  }
                  @case ('heading-3') {
                    <svg siHeading3Icon></svg>
                  }
                  @case ('heading-4') {
                    <svg siHeading4Icon></svg>
                  }
                  @case ('bullet-list') {
                    <svg siListIcon></svg>
                  }
                  @case ('ordered-list') {
                    <svg siListOrderedIcon></svg>
                  }
                  @case ('task-list') {
                    <svg siListTodoIcon></svg>
                  }
                  @default {
                    <svg siHeadingIcon></svg>
                  }
                }
                <span class="sr-only"
                  >Text style: {{ blockLabels[block.value()] }}</span
                >
                <svg siChevronDownIcon></svg>
              </button>
              <ng-template scMenuPortal>
                <div scMenu (itemSelected)="block.select($event)">
                  <ng-template scMenuContent>
                    @for (item of blocks; track item) {
                      <div scMenuItem [value]="item">
                        {{ blockLabels[item] }}
                      </div>
                    }
                  </ng-template>
                </div>
              </ng-template>
            </div>

            <button scToolbarWidget scToggle scEditorCommand="quote">
              <svg siTextQuoteIcon></svg>
              <span class="sr-only">Blockquote</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="code-block">
              <svg siCodeXmlIcon></svg>
              <span class="sr-only">Code block</span>
            </button>

            <div scMenuProvider>
              <button
                scToolbarWidget
                scToggle
                scMenuTrigger
                scEditorTable
                #table="scEditorTable"
              >
                <svg siTable2Icon></svg>
                <span class="sr-only">Table</span>
                <svg siChevronDownIcon></svg>
              </button>
              <ng-template scMenuPortal>
                <div scMenu (itemSelected)="table.select($event)">
                  <ng-template scMenuContent>
                    @for (action of tableActions; track action) {
                      <div
                        scMenuItem
                        [value]="action"
                        [disabled]="!table.can(action)"
                      >
                        {{ tableLabels[action] }}
                      </div>
                    }
                  </ng-template>
                </div>
              </ng-template>
            </div>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="strikethrough">
              <svg siStrikethroughIcon></svg>
              <span class="sr-only">Strikethrough</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="code">
              <svg siCodeIcon></svg>
              <span class="sr-only">Code</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>

            <div scPopoverProvider>
              <button
                scToolbarWidget
                scToggle
                scEditorHighlight
                scPopoverTrigger
              >
                <svg siHighlighterIcon></svg>
                <span class="sr-only">Highlight</span>
              </button>
              <ng-template scPopoverPortal>
                <div
                  scPopover
                  aria-label="Highlight colours"
                  class="flex w-auto items-center gap-2 p-2"
                >
                  @for (color of highlightColors; track color.value) {
                    <button [scEditorHighlightColor]="color.value">
                      <span class="sr-only">{{ color.label }}</span>
                    </button>
                  }
                  <div scSeparator orientation="vertical"></div>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-sm"
                    class="rounded-full"
                    scEditorRemoveHighlight
                  >
                    <svg siBanIcon></svg>
                    <span class="sr-only">Remove highlight</span>
                  </button>
                </div>
              </ng-template>
            </div>

            <div scPopoverProvider [(open)]="linkOpen">
              <button
                scToolbarWidget
                scToggle
                scEditorLink
                #link="scEditorLink"
                scPopoverTrigger
                (click)="editLink(link.href())"
              >
                <svg siLinkIcon></svg>
                <span class="sr-only">Link</span>
              </button>
              <ng-template scPopoverPortal>
                <div scPopover aria-label="Link" class="w-80">
                  <div class="flex items-end gap-2">
                    <div scField class="flex-1">
                      <label scLabel>Address</label>
                      <input
                        scInput
                        type="url"
                        [formField]="linkForm.href"
                        (keydown.enter)="applyLink(link)"
                      />
                    </div>
                    <button scButton type="button" (click)="applyLink(link)">
                      Apply
                    </button>
                  </div>
                  @if (link.href(); as href) {
                    <div class="flex items-center justify-between gap-2">
                      <a
                        scLink
                        variant="button"
                        [href]="href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1 truncate text-sm"
                      >
                        <svg siExternalLinkIcon></svg>
                        Open link
                      </a>
                      <button
                        scButton
                        variant="ghost"
                        size="sm"
                        type="button"
                        (click)="removeLink(link)"
                      >
                        <svg siUnlinkIcon></svg>
                        Remove
                      </button>
                    </div>
                  }
                </div>
              </ng-template>
            </div>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="superscript">
              <svg siSuperscriptIcon></svg>
              <span class="sr-only">Superscript</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="subscript">
              <svg siSubscriptIcon></svg>
              <span class="sr-only">Subscript</span>
            </button>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="align-left">
              <svg siTextAlignStartIcon></svg>
              <span class="sr-only">Align left</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="align-center">
              <svg siTextAlignCenterIcon></svg>
              <span class="sr-only">Align center</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="align-right">
              <svg siTextAlignEndIcon></svg>
              <span class="sr-only">Align right</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="align-justify">
              <svg siTextAlignJustifyIcon></svg>
              <span class="sr-only">Align justify</span>
            </button>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorImage>
              <svg siImagePlusIcon></svg>
              Add
              <span class="sr-only">image</span>
            </button>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="horizontal-rule">
              <svg siMinusIcon></svg>
              <span class="sr-only">Horizontal rule</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="clear-formatting">
              <svg siRemoveFormattingIcon></svg>
              <span class="sr-only">Clear formatting</span>
            </button>
            <button
              scToolbarWidget
              scButton
              variant="ghost"
              [scCollapsibleTrigger]="search"
            >
              <svg siSearchIcon></svg>
              <span class="sr-only">Search and replace</span>
            </button>
          </div>
        </div>

        <div
          scEditorBubbleMenu
          scToolbar
          aria-label="Selection"
          class="shadow-md"
        >
          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="strikethrough">
              <svg siStrikethroughIcon></svg>
              <span class="sr-only">Strikethrough</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="code">
              <svg siCodeIcon></svg>
              <span class="sr-only">Code</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
          </div>
        </div>

        <div
          scCollapsible
          #search="scCollapsible"
          [(open)]="searchOpen"
          class="contents"
        >
          <!-- The panel only animates: the gap above is inside it. -->
          <div scCollapsiblePanel class="-mt-2">
            <div class="pt-2">
              <div
                scFrame
                scEditorSearchBar
                [(open)]="searchOpen"
                aria-label="Search and replace"
                class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 p-2 [grid-template-areas:'search_close'_'actions_actions'_'replace_replace'_'buttons_buttons'] sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:[grid-template-areas:'search_actions_close'_'replace_buttons_.']"
              >
                <div scInputGroup class="h-8 [grid-area:search]">
                  <input
                    scInput
                    scEditorSearchInput
                    aria-label="Search"
                    placeholder="Search…"
                  />
                  <div scInputGroupAddon side="inline-end">
                    <span
                      scEditorSearchResults
                      #results="scEditorSearchResults"
                      class="text-muted-foreground data-[state=none]:text-destructive text-sm whitespace-nowrap tabular-nums"
                    >
                      @if (results.state() === 'found') {
                        {{ (results.index() ?? 0) + 1 }} of
                        {{ results.count() }}
                      } @else if (results.state() === 'none') {
                        No results
                      }
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2 [grid-area:actions]">
                  <button
                    scButton
                    variant="ghost"
                    size="icon-sm"
                    scEditorSearchPrevious
                  >
                    <svg siChevronUpIcon></svg>
                    <span class="sr-only">Previous match</span>
                  </button>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-sm"
                    scEditorSearchNext
                  >
                    <svg siChevronDownIcon></svg>
                    <span class="sr-only">Next match</span>
                  </button>
                  <button
                    scToggle
                    size="sm"
                    scEditorSearchOption="caseSensitive"
                  >
                    <svg siCaseSensitiveIcon></svg>
                    <span class="sr-only">Match case</span>
                  </button>
                  <button scToggle size="sm" scEditorSearchOption="wholeWord">
                    <svg siWholeWordIcon></svg>
                    <span class="sr-only">Whole word</span>
                  </button>
                  <button scToggle size="sm" scEditorSearchOption="useRegex">
                    <svg siRegexIcon></svg>
                    <span class="sr-only">Regular expression</span>
                  </button>
                </div>
                <button
                  scButton
                  variant="ghost"
                  size="icon-sm"
                  scEditorSearchClose
                  class="[grid-area:close]"
                >
                  <svg siXIcon></svg>
                  <span class="sr-only">Close search</span>
                </button>
                <input
                  scInput
                  scEditorReplaceInput
                  aria-label="Replace with"
                  placeholder="Replace with…"
                  class="h-8 w-full [grid-area:replace]"
                />
                <div class="flex items-center gap-2 [grid-area:buttons]">
                  <button scButton variant="outline" size="sm" scEditorReplace>
                    Replace
                  </button>
                  <button
                    scButton
                    variant="outline"
                    size="sm"
                    scEditorReplaceAll
                  >
                    Replace all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          scFrame
          scEditorContent
          ariaLabel="Article"
          layout="page"
          class="max-h-[600px] min-h-[400px]"
          placeholder="Start writing…"
        ></div>

        <div class="text-muted-foreground px-1 text-xs">
          @for (upload of images.uploads(); track upload.id) {
            <div class="mb-1.5 flex items-center gap-2">
              <span class="truncate">Uploading {{ upload.file.name }}</span>
              <div
                scProgress
                [value]="upload.progress * 100"
                [attr.aria-label]="'Uploading ' + upload.file.name"
                class="w-32"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
              <button
                scButton
                variant="ghost"
                size="icon-xs"
                type="button"
                (click)="images.cancel(upload.id)"
              >
                <svg siXIcon></svg>
                <span class="sr-only">Cancel upload</span>
              </button>
            </div>
          }
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
        <p class="mb-2 text-sm font-medium">HTML Output:</p>
        <pre
          tabindex="0"
          scFrame
          class="bg-muted max-h-32 overflow-x-auto p-3 text-xs"
          >{{ editorForm.body().value() }}</pre>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FullFeaturedEditorDemo {
  private readonly searchOpen = signal(false);
  private readonly model = signal({ body: SAMPLE });
  private readonly editorForm = form(this.model);

  /** The link popover and its address. */
  private readonly linkOpen = signal(false);
  private readonly linkModel = signal({ href: '' });
  private readonly linkForm = form(this.linkModel);

  /** The block menu's items, and every block's name (the trigger's too). */
  private readonly blocks: ScEditorBlockType[] = [
    'paragraph',
    'heading-1',
    'heading-2',
    'heading-3',
    'heading-4',
    'bullet-list',
    'ordered-list',
    'task-list',
  ];
  private readonly blockLabels: Record<ScEditorBlockType, string> = {
    paragraph: 'Paragraph',
    'heading-1': 'Heading 1',
    'heading-2': 'Heading 2',
    'heading-3': 'Heading 3',
    'heading-4': 'Heading 4',
    'heading-5': 'Heading 5',
    'heading-6': 'Heading 6',
    'bullet-list': 'Bullet list',
    'ordered-list': 'Numbered list',
    'task-list': 'Task list',
    quote: 'Quote',
    'code-block': 'Code block',
  };

  private readonly tableActions: ScEditorTableAction[] = [
    'insertTable',
    'addRowBefore',
    'addRowAfter',
    'deleteRow',
    'addColumnBefore',
    'addColumnAfter',
    'deleteColumn',
    'mergeCells',
    'splitCell',
    'toggleHeaderRow',
    'toggleHeaderColumn',
    'deleteTable',
  ];
  private readonly tableLabels: Record<ScEditorTableAction, string> = {
    insertTable: 'Insert table',
    addRowBefore: 'Add row above',
    addRowAfter: 'Add row below',
    deleteRow: 'Delete row',
    addColumnBefore: 'Add column before',
    addColumnAfter: 'Add column after',
    deleteColumn: 'Delete column',
    mergeCells: 'Merge cells',
    splitCell: 'Split cell',
    toggleHeaderRow: 'Header row',
    toggleHeaderColumn: 'Header column',
    deleteTable: 'Delete table',
  };

  private readonly highlightColors = [
    { label: 'Yellow', value: 'var(--sc-editor-highlight-1)' },
    { label: 'Green', value: 'var(--sc-editor-highlight-2)' },
    { label: 'Blue', value: 'var(--sc-editor-highlight-3)' },
    { label: 'Purple', value: 'var(--sc-editor-highlight-4)' },
    { label: 'Red', value: 'var(--sc-editor-highlight-5)' },
  ];

  /**
   * A pretend upload: reports progress for a second, then gives the image a
   * local address. A real one would send the file to your server.
   */
  private readonly upload: ScEditorUploadHandler = (
    file,
    { onProgress, signal },
  ) =>
    new Promise((resolve, reject) => {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 0.2;
        onProgress(progress);
        if (progress >= 1) {
          clearInterval(timer);
          resolve(URL.createObjectURL(file));
        }
      }, 200);
      signal.addEventListener('abort', () => {
        clearInterval(timer);
        reject(signal.reason);
      });
    });

  /** The link popover opens with the address at the selection. */
  private editLink(href: string): void {
    this.linkModel.set({ href: href || 'https://' });
  }

  private applyLink(link: ScEditorLink): void {
    link.set(this.linkModel().href);
    this.linkOpen.set(false);
  }

  private removeLink(link: ScEditorLink): void {
    link.remove();
    this.linkOpen.set(false);
  }

  private clearContent(): void {
    this.model.set({ body: '' });
  }

  private insertSampleContent(): void {
    this.model.set({ body: SAMPLE });
  }
}`;
}
