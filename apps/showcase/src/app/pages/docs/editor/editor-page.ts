import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PackageManagerInstall } from '../../../components/package-manager-install/package-manager-install';
import {
  type ApiPart,
  PartsTable,
} from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BubbleMenuEditorDemoContainer } from './demos/bubble-menu-editor-demo-container';
import { EditorUsageDemoContainer } from './demos/editor-usage-demo-container';
import { FormatsEditorDemoContainer } from './demos/formats-editor-demo-container';
import { FullFeaturedEditorDemoContainer } from './demos/full-featured-editor-demo-container';
import { ImagesEditorDemoContainer } from './demos/images-editor-demo-container';
import { LayoutEditorDemoContainer } from './demos/layout-editor-demo-container';
import { NoCountEditorDemoContainer } from './demos/no-count-editor-demo-container';
import { PrefilledEditorDemoContainer } from './demos/prefilled-editor-demo-container';
import { ReadonlyEditorDemoContainer } from './demos/readonly-editor-demo-container';
import { RtlEditorDemoContainer } from './demos/rtl-editor-demo-container';
import { SearchEditorDemoContainer } from './demos/search-editor-demo-container';
import { SignalFormsEditorDemoContainer } from './demos/signal-forms-editor-demo-container';
import { TablesEditorDemoContainer } from './demos/tables-editor-demo-container';
import { ViewEditorDemoContainer } from './demos/view-editor-demo-container';

@Component({
  selector: 'app-editor-page',
  imports: [
    RouterLink,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    EditorUsageDemoContainer,
    PrefilledEditorDemoContainer,
    NoCountEditorDemoContainer,
    RtlEditorDemoContainer,
    ReadonlyEditorDemoContainer,
    FullFeaturedEditorDemoContainer,
    SignalFormsEditorDemoContainer,
    ViewEditorDemoContainer,
    FormatsEditorDemoContainer,
    TablesEditorDemoContainer,
    ImagesEditorDemoContainer,
    SearchEditorDemoContainer,
    BubbleMenuEditorDemoContainer,
    LayoutEditorDemoContainer,
    Anatomy,
    PartsTable,
    TocHeading,
    ComponentBadges,
    PackageManagerInstall,
    ScKbd,
    ScTypeset,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Editor</h1>
        <p class="text-muted-foreground">
          A rich text editor for articles, posts and notes, built on Tiptap:
          headings, lists and task lists, code blocks and links, with tables,
          images, search and replace and more as features you add. Its value is
          a Signal Forms field — HTML, JSON, Markdown or text — and its toolbar
          is yours, made of the library&apos;s parts. For plain text, use a
          Textarea; for code, the Code Editor.
        </p>
        <app-component-badges path="editor" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <p>
          It has its own entry point,
          <code scTypeset>&#64;semantic-components/ui/editor</code>, built on
          <a
            href="https://tiptap.dev"
            target="_blank"
            rel="noopener"
            class="text-foreground underline underline-offset-4"
            >Tiptap</a
          >
          — optional peers of ui: install its core where you use the editor.
          Each feature adds its own package; see
          <a
            routerLink="."
            fragment="features"
            class="text-foreground underline underline-offset-4"
            >Features</a
          >.
        </p>
        <app-package-manager-install
          packages="@tiptap/core @tiptap/pm @tiptap/starter-kit"
        />
        <p>
          Then its styles, in your
          <code scTypeset>styles.css</code>:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="stylesCode"
                #copyStyles="scCodeBlockCopy"
              >
                @if (copyStyles.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="stylesCode" language="css"></pre>
        </div>
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-editor-usage-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The editor holds a toolbar — the library&apos;s Toolbar, a command
          beside each scToggle — and the document. The counts are optional; so
          are the block menu, the link popover and the features&apos; parts
          (tables, images, search), each in its own entry point.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc id="features">Features</h2>
        <p>
          The core,
          <code scTypeset>&#64;semantic-components/ui/editor</code>, writes
          text, headings, lists and task lists, quotes, code blocks and links,
          with undo and redo, the counts and
          <code scTypeset>scEditorView</code>, in HTML, JSON or text. It needs
          only what Tiptap&apos;s own install asks for:
          <code scTypeset>&#64;tiptap/core</code>,
          <code scTypeset>&#64;tiptap/pm</code>
          and
          <code scTypeset>&#64;tiptap/starter-kit</code>. Everything else is a
          feature, in its own entry point with its own package: install it and
          provide it only when you use it. Give the editor and
          <code scTypeset>scEditorView</code>
          the same features, so they hold the same documents.
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>ts</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="featuresCode" #copy="scCodeBlockCopy">
                @if (copy.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre
            scCodeBlockContent
            [code]="featuresCode"
            language="typescript"
          ></pre>
        </div>
        <div scTableContainer tabindex="0" role="region" aria-label="Features">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Entry point</th>
                <th scTableHeaderCell>Provide</th>
                <th scTableHeaderCell>Parts</th>
                <th scTableHeaderCell>Package</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (feature of features; track feature.entry) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ feature.entry }}</code>
                  </td>
                  <td scTableCell>
                    @if (feature.provide) {
                      <code class="font-mono text-sm">{{
                        feature.provide
                      }}</code>
                    } @else {
                      —
                    }
                  </td>
                  <td scTableCell>
                    <div class="flex flex-col gap-1">
                      @for (part of feature.parts; track part) {
                        <code class="font-mono text-sm">{{ part }}</code>
                      }
                    </div>
                  </td>
                  <td scTableCell>
                    <div class="flex flex-col gap-1">
                      @for (pkg of feature.packages; track pkg) {
                        <code class="font-mono text-sm">{{ pkg }}</code>
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="text-muted-foreground text-sm">
          The bubble menu has nothing to provide:
          <code class="font-mono text-sm">scEditorBubbleMenu</code> adds itself
          to the editor.
        </p>
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <p>
          Tiptap&apos;s shortcuts, and Markdown as you type, each at the start
          of a line and followed by a space:
          <kbd scKbd class="font-mono">#</kbd> headings,
          <kbd scKbd class="font-mono">-</kbd> lists,
          <kbd scKbd class="font-mono">[ ]</kbd> tasks,
          <kbd scKbd class="font-mono">&gt;</kbd> quotes,
          <kbd scKbd class="font-mono">&#96;&#96;&#96;</kbd> code blocks. Some
          come with a feature. A browser can take a few before the editor:
          <kbd scKbd>Ctrl + Shift + R</kbd> reloads,
          <kbd scKbd>Ctrl + Shift + J</kbd> opens the console; with AltGr
          layouts, <kbd scKbd>Ctrl + Alt</kbd> is <kbd scKbd>AltGr</kbd>.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Keyboard shortcuts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Keys</th>
                <th scTableHeaderCell>Does</th>
                <th scTableHeaderCell>Needs</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (shortcut of shortcuts; track shortcut.keys) {
                <tr scTableRow>
                  <td scTableCell>
                    <kbd scKbd>{{ shortcut.keys }}</kbd>
                  </td>
                  <td scTableCell>{{ shortcut.does }}</td>
                  <td scTableCell>
                    @if (shortcut.needs) {
                      <code class="font-mono text-sm">{{
                        shortcut.needs
                      }}</code>
                    } @else {
                      The core
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Loading</h2>
        <p>
          The features are loaded with the editor, not on their own: a
          feature&apos;s package is small next to what every editor needs (<code
            scTypeset
            >&#64;tiptap/core</code
          >, ProseMirror, <code scTypeset>&#64;tiptap/starter-kit</code>), and
          loading it later would make the editor and
          <code scTypeset>scEditorView</code>
          wait before showing a document. To keep the editor out of a
          page&apos;s first load, load the component that holds it lazily —
          everything, Tiptap&apos;s core too, is then split off. A lazy route
          (<code scTypeset>loadComponent</code>) does the same for a page with
          an editor.
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>html</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="loadingCode"
                #copyLoading="scCodeBlockCopy"
              >
                @if (copyLoading.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="loadingCode" language="html"></pre>
        </div>
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Examples</h2>
        <p>
          The complete editor, after Tiptap's Simple Editor: undo and redo, the
          block type and list menus (with task lists), blockquotes and code
          blocks, marks, highlight colours, links, superscript and subscript,
          alignment, tables (from the table menu), images (pick, drop or paste
          one) and search and replace (<kbd scKbd>Ctrl / ⌘ + F</kbd>). The page
          layout centres the text in a column of readable width. It uses every
          feature:
          <code scTypeset
            >provideEditor(withAlign(), withHighlight(), withImages(),
            withScripts(), withSearch(), withTables())</code
          >.
        </p>
        <app-full-featured-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Tables</h2>
        <p>
          The core and one feature,
          <code scTypeset>withTables()</code>: the table menu inserts a table
          and edits the one at the selection, its actions disabled where they
          don&apos;t apply. <kbd scKbd>Tab</kbd> moves between cells; dragging a
          column&apos;s border resizes it.
        </p>
        <app-tables-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Images</h2>
        <p>
          <code scTypeset>withImages()</code>
          and an
          <code scTypeset>[upload]</code>
          handler on the editor (<code scTypeset>scEditorUploads</code>): pick
          an image, or drop or paste one. Each is uploaded with its progress —
          cancel it there — and inserted when it resolves, named after its file.
        </p>
        <app-images-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Search and replace</h2>
        <p>
          <code scTypeset>withSearch()</code>: the search button, or
          <kbd scKbd>Ctrl / ⌘ + F</kbd> in the document, opens the bar.
          <kbd scKbd>Enter</kbd> and <kbd scKbd>Shift + Enter</kbd> step through
          the matches, <kbd scKbd>Escape</kbd> closes it.
        </p>
        <p>
          Whether the bar is open is yours: one signal, bound to what shows it
          and to the bar's
          <code scTypeset>[(open)]</code>. Here a Collapsible, its trigger in
          the toolbar. The editor isn't tied to it: where a search shows is a
          layout choice — a panel that pushes the text down, a box over a
          corner, a dialog — and editors make it differently. The editor does
          the search (its keys, focus and matches); a Popover, a Sheet or an
          <code scTypeset>&#64;if</code>
          work as well.
        </p>
        <app-search-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Floating toolbar</h2>
        <p>
          <code scTypeset>scEditorBubbleMenu</code>
          shows by the selected text, here instead of a toolbar. It needs no
          provider: it adds itself to the editor.
        </p>
        <app-bubble-menu-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Signal Forms</h2>
        <p>
          <code scTypeset>[formField]</code>
          on the editor: the value is the document's HTML.
          <code scTypeset>required</code>
          checks it,
          <code scTypeset>scFieldErrors</code>
          shows the message once the document is left, and
          <code scTypeset>disabled</code>
          from the schema follows the checkbox.
          <code scTypeset>characterLimit</code>
          stops the text at 280 characters — its text, not its HTML.
        </p>
        <app-signal-forms-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Displaying the document</h2>
        <p>
          <code scTypeset>scEditorView</code>
          shows what the editor wrote — a published post, a preview — in the
          editor's styles, without an editor. The HTML is read through the
          editor's schema, so only what the editor can hold is shown: no
          scripts, no unsafe links.
        </p>
        <app-view-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Formats</h2>
        <p>
          <code scTypeset>format</code>
          picks what the form holds:
          <code scTypeset>html</code>
          (the default),
          <code scTypeset>json</code>
          (Tiptap&apos;s JSON,
          <code scTypeset>null</code>
          when empty),
          <code scTypeset>markdown</code>
          or
          <code scTypeset>text</code>
          (plain text, a line per paragraph). Switching it rewrites the value in
          the new format, and
          <code scTypeset>scEditorView</code>
          shows any of them, given the same format.
        </p>
        <app-formats-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Layout</h2>
        <p>
          <code scTypeset>layout</code>
          on
          <code scTypeset>scEditorContent</code>:
          <code scTypeset>default</code>
          pads the text edge to edge, for a field or a comment box;
          <code scTypeset>page</code>
          sets it in a centred column of readable width with page margins, for a
          document. The toolbar follows.
        </p>
        <app-layout-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Initial content</h2>
        <p>
          The form's value is the document to start with: any HTML the editor
          knows — headings, lists, quotes, marks.
        </p>
        <app-prefilled-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Read-only</h2>
        <p>
          <code scTypeset>readonly</code>
          from the schema: the document can be read, selected and searched, not
          changed, and its buttons are disabled. Here it has no toolbar at all.
        </p>
        <app-readonly-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>Without counts</h2>
        <p>
          Every part is optional: leave out the footer and its word and
          character counts.
        </p>
        <app-no-count-editor-demo-container />
      </section>
      <section class="space-y-4">
        <h2 scTypeset appToc>RTL</h2>
        <p>
          In a right-to-left page: the toolbar starts at the right and Left
          moves to the next button; the text runs from the right, list markers
          on the right.
        </p>
        <app-rtl-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Every part takes
          <code scTypeset>class</code>, and the buttons take
          <code scTypeset>disabled</code>. What a part holds is read through its
          <code scTypeset>exportAs</code>, which is its selector&apos;s name
          (<code scTypeset>#link="scEditorLink"</code>).
          <code scTypeset>[formField]</code>
          sets the editor&apos;s value,
          <code scTypeset>disabled</code>, <code scTypeset>readonly</code>,
          errors and touched state.
        </p>
        @for (group of api; track group.entry) {
          <div class="space-y-2">
            <p class="text-sm font-medium">
              <code scTypeset>{{ group.entry }}</code>
            </p>
            <app-parts-table [label]="group.entry" [parts]="group.parts" />
          </div>
        }
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class EditorPage {
  private readonly anatomy = {
    imports:
      "import { ScEditor, ScEditorCharCount, ScEditorCommand, ScEditorContent, ScEditorCount, ScEditorWordCount } from '@semantic-components/ui/editor';\nimport { ScToggle, ScToolbar, ScToolbarSeparator, ScToolbarWidget, ScToolbarWidgetGroup } from '@semantic-components/ui';",
    markup: [
      '<div scEditor [formField]="form.body">',
      "  <!-- The toolbar: the library's Toolbar; a command beside each scToggle -->",
      '  <div scToolbar aria-label="Formatting">',
      '    <div scToolbarWidgetGroup aria-label="Marks">',
      '      <button scToolbarWidget scToggle scEditorCommand="bold">…</button>',
      '    </div>',
      '    <div scToolbarSeparator></div>',
      '    <button scToolbarWidget scToggle scEditorCommand="undo">…</button>',
      '  </div>',
      '',
      '  <!-- The document -->',
      '  <div scEditorContent ariaLabel="…" placeholder="…"></div>',
      '',
      '  <!-- Optional: the counts -->',
      '  <div scEditorCount>',
      '    <span scEditorWordCount></span>',
      '    <span scEditorCharCount></span>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly stylesCode = [
    '@import "@semantic-components/styles/typeset.css";',
    '@import "@semantic-components/styles/nova/typeset-variables.css";',
    '@import "@semantic-components/styles/nova/editor.css";',
  ].join('\n');

  private readonly featuresCode = `import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScToggle,
  ScToolbar,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorCommand,
  ScEditorContent,
  provideEditor,
} from '@semantic-components/ui/editor';
import { withMarkdown } from '@semantic-components/ui/editor/markdown';
import { withScripts } from '@semantic-components/ui/editor/scripts';
import {
  SiBoldIcon,
  SiSubscriptIcon,
  SiSuperscriptIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-note-editor',
  imports: [FormField, ScEditor, ScEditorCommand, ScEditorContent, ScToggle, ScToolbar, ScToolbarWidget, ScToolbarWidgetGroup, SiBoldIcon, SiSubscriptIcon, SiSuperscriptIcon],
  // The features of the editors in this component.
  providers: [provideEditor(withScripts(), withMarkdown())],
  template: \`
    <div scEditor [formField]="noteForm.body" format="markdown">
      <div scToolbar aria-label="Formatting">
        <div scToolbarWidgetGroup>
          <button scToolbarWidget scToggle scEditorCommand="bold">
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scToolbarWidget scToggle scEditorCommand="superscript">
            <svg siSuperscriptIcon></svg>
            <span class="sr-only">Superscript</span>
          </button>
          <button scToolbarWidget scToggle scEditorCommand="subscript">
            <svg siSubscriptIcon></svg>
            <span class="sr-only">Subscript</span>
          </button>
        </div>
      </div>
      <div scEditorContent ariaLabel="Note"></div>
    </div>
  \`,
})
export class NoteEditor {
  readonly noteForm = form(signal({ body: '' }));
}`;

  /** The parts and functions of each entry point. */
  private readonly api: { entry: string; parts: ApiPart[] }[] = [
    {
      entry: '@semantic-components/ui/editor',
      parts: [
        {
          name: 'ScEditor',
          selector: '[scEditor]',
          description:
            "Inputs: format: 'html' | 'json' | 'markdown' | 'text'; characterLimit: number | null. Reads: editable(); isActive(name, attributes?); can(command); editorInstance(); contentVersion(). Does: run(command).",
        },
        {
          name: 'ScEditorContent',
          selector: 'div[scEditorContent]',
          description:
            "Inputs: ariaLabel; placeholder; layout: 'default' | 'page'.",
        },
        {
          name: 'ScEditorView',
          selector: '[scEditorView]',
          description:
            "Inputs: [scEditorView]: the document; format; layout: 'default' | 'page'.",
        },
        {
          name: 'ScEditorBlock',
          selector: '[scEditorBlock]',
          description:
            "Inputs: disabled. Reads: value(): 'paragraph' | 'heading-1' … 'heading-6' | 'bullet-list' | 'ordered-list' | 'task-list' | 'quote' | 'code-block'. Does: select(block): out of a list or quote first.",
        },
        {
          name: 'ScEditorLink',
          selector: 'button[scEditorLink]',
          description: 'Reads: href(). Does: set(href, text?); remove().',
        },
        {
          name: 'ScEditorWordCount',
          selector: 'span[scEditorWordCount]',
          description: 'Reads: wordCount().',
        },
        {
          name: 'ScEditorCharCount',
          selector: 'span[scEditorCharCount]',
          description:
            'Reads: charCount(); limit(); remaining(); limitReached().',
        },
        {
          name: 'ScEditorCommand',
          selector: 'button[scEditorCommand]',
          description:
            "Inputs: scEditorCommand: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'bullet-list' | 'ordered-list' | 'task-list' | 'quote' | 'code-block' | 'horizontal-rule' | 'clear-formatting' | 'undo' | 'redo' — and a feature's: 'align-…', 'superscript', 'subscript'; disabled. Does: Behaviour only: beside scToggle in a toolbar (every command the same size; pressed as the document says, off for one with no state) or scButton elsewhere, and scToolbarWidget in a toolbar.",
        },
        {
          name: 'ScEditorCount',
          selector: 'div[scEditorCount]',
          description:
            'The counts’ row: the word and character counts side by side, at its end.',
        },
        {
          name: 'provideEditor(...features)',
          selector: 'function',
          description: 'The features of the editors and displays below.',
        },
        {
          name: 'withExtensions(...extensions)',
          selector: 'function',
          description: 'Your own Tiptap extensions, as a feature.',
        },
        {
          name: 'editorContentExtensions(features?)',
          selector: 'function',
          description:
            'The document’s extensions, for generateHTML / generateJSON.',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/tables',
      parts: [
        {
          name: 'ScEditorTable',
          selector: 'button[scEditorTable]',
          description: 'Reads: inTable(); can(action). Does: select(action).',
        },
        {
          name: 'withTables()',
          selector: 'function',
          description: 'Tables.',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/images',
      parts: [
        {
          name: 'ScEditorUploads',
          selector: '[scEditor][upload]',
          description:
            'Inputs: upload: ScEditorUploadHandler; imageTypes: string[]. Reads: uploads(): { id, file, progress }[]. Does: insert(files, position?); cancel(id).',
        },
        {
          name: 'ScEditorImage',
          selector: 'button[scEditorImage]',
          description: 'Inputs: disabled.',
        },
        {
          name: 'withImages()',
          selector: 'function',
          description: 'Images, and dropping or pasting them.',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/search',
      parts: [
        {
          name: 'ScEditorSearchBar',
          selector: 'div[scEditorSearchBar]',
          description:
            'Inputs: open (two-way). Does: Open is yours: bind [(open)] to the signal that shows it (a collapsible, a popover…). Opened (by you, Ctrl / ⌘ + F): focus in the search; Escape: closed, back to the text; closed: matches cleared.',
        },
        {
          name: 'ScEditorSearchResults',
          selector: '[scEditorSearchResults]',
          description:
            "Reads: count(); index(): number | null; state(): 'idle' | 'found' | 'none'.",
        },
        {
          name: 'ScEditorSearchOption',
          selector: 'button[scEditorSearchOption]',
          description:
            "Inputs: [scEditorSearchOption]: 'caseSensitive' | 'wholeWord' | 'useRegex'.",
        },
        {
          name: 'ScEditorSearchInput',
          selector: '[scEditorSearchInput]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorSearchPrevious',
          selector: '[scEditorSearchPrevious]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorSearchNext',
          selector: '[scEditorSearchNext]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorReplaceInput',
          selector: '[scEditorReplaceInput]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorReplace',
          selector: '[scEditorReplace]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorReplaceAll',
          selector: '[scEditorReplaceAll]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorSearchClose',
          selector: '[scEditorSearchClose]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'withSearch()',
          selector: 'function',
          description: 'Search and replace, Ctrl / ⌘ + F.',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/highlight',
      parts: [
        {
          name: 'ScEditorHighlightColor',
          selector: 'button[scEditorHighlightColor]',
          description: 'Inputs: [scEditorHighlightColor]: a CSS colour.',
        },
        {
          name: 'ScEditorHighlight',
          selector: '[scEditorHighlight]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'ScEditorRemoveHighlight',
          selector: '[scEditorRemoveHighlight]',
          description: 'A control of the search bar: its look and its action.',
        },
        {
          name: 'withHighlight()',
          selector: 'function',
          description: 'Highlights.',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/scripts',
      parts: [
        {
          name: 'withScripts()',
          selector: 'function',
          description:
            'Superscript and subscript: the commands superscript, subscript (scEditorCommand).',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/align',
      parts: [
        {
          name: 'withAlign()',
          selector: 'function',
          description:
            'Alignment: the commands align-left, align-center, align-right, align-justify (scEditorCommand).',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/markdown',
      parts: [
        {
          name: 'withMarkdown()',
          selector: 'function',
          description: 'format="markdown".',
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/bubble-menu',
      parts: [
        {
          name: 'ScEditorBubbleMenu',
          selector: 'div[scEditorBubbleMenu]',
          description: 'Inputs: orientation; wrap.',
        },
      ],
    },
  ];
  private readonly shortcuts = [
    { keys: 'Ctrl / ⌘ + B', does: 'Bold', needs: '' },
    { keys: 'Ctrl / ⌘ + I', does: 'Italic', needs: '' },
    { keys: 'Ctrl / ⌘ + U', does: 'Underline', needs: '' },
    { keys: 'Ctrl / ⌘ + Shift + S', does: 'Strikethrough', needs: '' },
    { keys: 'Ctrl / ⌘ + E', does: 'Inline code', needs: '' },
    { keys: 'Ctrl / ⌘ + Alt + 1 … 6', does: 'Heading 1 to 6', needs: '' },
    { keys: 'Ctrl / ⌘ + Shift + 7', does: 'Numbered list', needs: '' },
    { keys: 'Ctrl / ⌘ + Shift + 8', does: 'Bullet list', needs: '' },
    { keys: 'Ctrl / ⌘ + Shift + 9', does: 'Task list', needs: '' },
    { keys: 'Ctrl / ⌘ + Shift + B', does: 'Blockquote', needs: '' },
    { keys: 'Ctrl / ⌘ + Alt + C', does: 'Code block', needs: '' },
    { keys: 'Ctrl / ⌘ + Z', does: 'Undo', needs: '' },
    { keys: 'Ctrl / ⌘ + Shift + Z, Ctrl / ⌘ + Y', does: 'Redo', needs: '' },
    {
      keys: 'Ctrl / ⌘ + Shift + H',
      does: 'Highlight',
      needs: 'withHighlight()',
    },
    { keys: 'Ctrl / ⌘ + .', does: 'Superscript', needs: 'withScripts()' },
    { keys: 'Ctrl / ⌘ + ,', does: 'Subscript', needs: 'withScripts()' },
    {
      keys: 'Ctrl / ⌘ + Shift + L, E, R, J',
      does: 'Align left, centre, right, justify',
      needs: 'withAlign()',
    },
    {
      keys: 'Ctrl / ⌘ + F',
      does: 'Open the search bar',
      needs: 'withSearch()',
    },
    {
      keys: 'Enter, Shift + Enter',
      does: 'Next, previous match (in the search)',
      needs: 'withSearch()',
    },
    { keys: 'Escape', does: 'Close the search bar', needs: 'withSearch()' },
    { keys: '← / →', does: 'Move between the toolbar’s buttons', needs: '' },
    {
      keys: 'Tab',
      does: 'Leave the toolbar; in a table, the next cell',
      needs: '',
    },
  ];

  private readonly loadingCode = `@defer (on viewport) {
  <app-note-editor />
} @placeholder {
  <div class="h-40 rounded-lg border"></div>
}`;

  private readonly features = [
    {
      entry: '/tables',
      provide: 'withTables()',
      parts: ['scEditorTable'],
      packages: ['@tiptap/extension-table'],
    },
    {
      entry: '/images',
      provide: 'withImages()',
      parts: ['scEditorUploads', 'scEditorImage', 'drop', 'paste'],
      packages: ['@tiptap/extension-image', '@tiptap/extension-file-handler'],
    },
    {
      entry: '/search',
      provide: 'withSearch()',
      parts: ['scEditorSearchBar ([(open)])', 'Ctrl / ⌘ + F'],
      packages: ['@tiptap/extension-find-and-replace'],
    },
    {
      entry: '/highlight',
      provide: 'withHighlight()',
      parts: [
        'scEditorHighlight',
        'scEditorHighlightColor',
        'scEditorRemoveHighlight',
      ],
      packages: ['@tiptap/extension-highlight'],
    },
    {
      entry: '/scripts',
      provide: 'withScripts()',
      parts: ['scEditorCommand="superscript" / "subscript"'],
      packages: [
        '@tiptap/extension-superscript',
        '@tiptap/extension-subscript',
      ],
    },
    {
      entry: '/align',
      provide: 'withAlign()',
      parts: [
        'scEditorCommand="align-left" / "align-center" / "align-right" / "align-justify"',
      ],
      packages: ['@tiptap/extension-text-align'],
    },
    {
      entry: '/markdown',
      provide: 'withMarkdown()',
      parts: ['format="markdown"'],
      packages: ['@tiptap/markdown'],
    },
    {
      entry: '/bubble-menu',
      provide: '',
      parts: ['scEditorBubbleMenu'],
      packages: ['@tiptap/extension-bubble-menu'],
    },
  ];
}
