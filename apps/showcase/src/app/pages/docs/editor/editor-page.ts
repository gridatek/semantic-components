import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PackageManagerInstall } from '../../../components/package-manager-install/package-manager-install';
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
import { SearchEditorDemoContainer } from './demos/search-editor-demo-container';
import { SignalFormsEditorDemoContainer } from './demos/signal-forms-editor-demo-container';
import { TablesEditorDemoContainer } from './demos/tables-editor-demo-container';
import { ViewEditorDemoContainer } from './demos/view-editor-demo-container';

@Component({
  selector: 'app-editor-page',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    EditorUsageDemoContainer,
    PrefilledEditorDemoContainer,
    NoCountEditorDemoContainer,
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
    TocHeading,
    ComponentBadges,
    PackageManagerInstall,
    ScHeading,
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
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Editor</h1>
        <p class="text-muted-foreground">
          Composable WYSIWYG editor powered by Tiptap: block types, lists and
          task lists, code blocks and links in its core; tables, images, search
          and replace, highlights and more as features you add. A Signal Forms
          value in HTML, JSON, Markdown or text. The full demo follows
          Tiptap&apos;s Simple Editor template, in this library&apos;s styles.
        </p>
        <app-component-badges path="editor" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <p class="text-muted-foreground">
          It has its own entry point,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/ui/editor</code
          >, built on
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
            href="#features"
            class="text-foreground underline underline-offset-4"
            >Features</a
          >.
        </p>
        <app-package-manager-install
          packages="@tiptap/core @tiptap/pm @tiptap/starter-kit"
        />
        <p class="text-muted-foreground">
          Then its styles, in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code
          >:
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
        <h2 scHeading appToc>Usage</h2>
        <app-editor-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc id="features">Features</h2>
        <p class="text-muted-foreground">
          The core,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/ui/editor</code
          >, writes text, headings, lists and task lists, quotes, code blocks
          and links, with undo and redo, the counts and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorView</code
          >, in HTML, JSON or text. It needs only what Tiptap&apos;s own install
          asks for:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;tiptap/core</code
          >,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;tiptap/pm</code
          >
          and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;tiptap/starter-kit</code
          >. Everything else is a feature, in its own entry point with its own
          package: install it and provide it only when you use it. Give the
          editor and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorView</code
          >
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
                    <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                      feature.entry
                    }}</code>
                  </td>
                  <td scTableCell>
                    @if (feature.provide) {
                      <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                        feature.provide
                      }}</code>
                    } @else {
                      None (scEditorBubbleMenu adds itself to the editor)
                    }
                  </td>
                  <td scTableCell>
                    <div class="flex flex-wrap gap-1">
                      @for (part of feature.parts; track part) {
                        <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                          part
                        }}</code>
                      }
                    </div>
                  </td>
                  <td scTableCell>
                    <div class="flex flex-wrap gap-1">
                      @for (pkg of feature.packages; track pkg) {
                        <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                          pkg
                        }}</code>
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground">
          The complete editor, after Tiptap's Simple Editor: undo and redo, the
          block type and list menus (with task lists), blockquotes and code
          blocks, marks, highlight colours, links, superscript and subscript,
          alignment, tables (from the table menu), images (pick, drop or paste
          one) and search and replace (Ctrl + F). Select some text for the
          floating toolbar. The page layout centres the text in a column of
          readable width. It uses every feature:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >provideEditor(withAlign(), withHighlight(), withImages(),
            withScripts(), withSearch(), withTables())</code
          >.
        </p>
        <app-full-featured-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Tables</h2>
        <p class="text-muted-foreground">
          The core and one feature,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >withTables()</code
          >: the table menu inserts a table and edits the one at the selection,
          its actions disabled where they don&apos;t apply. Tab moves between
          cells; dragging a column&apos;s border resizes it.
        </p>
        <app-tables-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Images</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >withImages()</code
          >
          and an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">[upload]</code>
          handler on the editor (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorUploads</code
          >): pick an image, or drop or paste one. Each is uploaded with its
          progress — cancel it there — and inserted when it resolves, named
          after its file.
        </p>
        <app-images-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Search and replace</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >withSearch()</code
          >: the search button, or Ctrl / ⌘ + F in the document, opens the bar.
          Enter and Shift + Enter step through the matches, Escape closes it.
        </p>
        <app-search-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Floating toolbar</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorBubbleMenu</code
          >
          shows by the selected text, here instead of a toolbar. It needs no
          provider: it adds itself to the editor.
        </p>
        <app-bubble-menu-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Signal Forms</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[formField]</code
          >
          on the editor: the value is the document's HTML.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">required</code>
          checks it,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scFieldErrors</code
          >
          shows the message once the document is left, and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">disabled</code>
          from the schema follows the checkbox.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >characterLimit</code
          >
          stops the text at 280 characters — its text, not its HTML.
        </p>
        <app-signal-forms-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Displaying the document</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorView</code
          >
          shows what the editor wrote — a published post, a preview — in the
          editor's styles, without an editor. The HTML is read through the
          editor's schema, so only what the editor can hold is shown: no
          scripts, no unsafe links.
        </p>
        <app-view-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">format</code>
          picks what the form holds:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">html</code> (the
          default),
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">json</code>
          (Tiptap&apos;s JSON,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">null</code> when
          empty),
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">markdown</code>
          or
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">text</code>
          (plain text, a line per paragraph). Switching it rewrites the value in
          the new format, and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorView</code
          >
          shows any of them, given the same format.
        </p>
        <app-formats-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Layout</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">layout</code> on
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorContent</code
          >:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">default</code>
          pads the text edge to edge, for a field or a comment box;
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">page</code> sets
          it in a centred column of readable width with page margins, for a
          document. The toolbar follows.
        </p>
        <app-layout-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Initial content</h2>
        <p class="text-muted-foreground">
          The form's value is the document to start with: any HTML the editor
          knows — headings, lists, quotes, marks.
        </p>
        <app-prefilled-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Read-only</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">readonly</code>
          from the schema: the document can be read, selected and searched, not
          changed, and its buttons are disabled. Here it has no toolbar at all.
        </p>
        <app-readonly-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Without counts</h2>
        <p class="text-muted-foreground">
          Every part is optional: leave out the footer and its word and
          character counts.
        </p>
        <app-no-count-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <p class="text-muted-foreground">
          Tiptap&apos;s shortcuts, and Markdown as you type:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"># </code>
          headings,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">- </code> lists,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">[ ] </code>
          tasks,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">&gt; </code>
          quotes,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#96;&#96;&#96;</code
          >
          code blocks. Some come with a feature. A browser can take a few before
          the editor: Ctrl + Shift + R reloads, Ctrl + Shift + J opens the
          console; with AltGr layouts, Ctrl + Alt is AltGr.
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
                    <kbd class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                      shortcut.keys
                    }}</kbd>
                  </td>
                  <td scTableCell>{{ shortcut.does }}</td>
                  <td scTableCell>
                    @if (shortcut.needs) {
                      <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
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
        <h2 scHeading appToc>API</h2>
        <p class="text-muted-foreground">
          Every part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>, and
          the buttons take
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">disabled</code>.
          What a part holds is read through its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">exportAs</code>,
          which is its selector&apos;s name (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >#link="scEditorLink"</code
          >).
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[formField]</code
          >
          sets the editor&apos;s value,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">disabled</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">readonly</code>,
          errors and touched state.
        </p>
        @for (group of api; track group.entry) {
          <div class="space-y-2">
            <p class="text-sm font-medium">
              <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                group.entry
              }}</code>
            </p>
            <div
              scTableContainer
              tabindex="0"
              role="region"
              [attr.aria-label]="group.entry"
            >
              <table scTable>
                <thead scTableHeader>
                  <tr scTableRow>
                    <th scTableHeaderCell class="w-1/4">Name</th>
                    <th scTableHeaderCell class="w-1/4">Inputs</th>
                    <th scTableHeaderCell class="w-1/4">Read</th>
                    <th scTableHeaderCell class="w-1/4">Do</th>
                  </tr>
                </thead>
                <tbody scTableBody>
                  @for (item of group.items; track item.name) {
                    <tr scTableRow>
                      <td scTableCell class="align-top">
                        <div class="flex flex-wrap gap-1">
                          @for (name of item.name.split(' '); track name) {
                            <code
                              class="bg-muted rounded px-1.5 py-0.5 text-sm"
                              >{{ name }}</code
                            >
                          }
                        </div>
                      </td>
                      @for (
                        cell of [item.inputs, item.read, item.do];
                        track $index
                      ) {
                        <td scTableCell class="align-top">
                          <div class="flex flex-col items-start gap-1">
                            @for (entry of cell; track entry) {
                              <code
                                class="bg-muted rounded px-1.5 py-0.5 text-sm whitespace-normal"
                                >{{ entry }}</code
                              >
                            }
                          </div>
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Loading</h2>
        <p class="text-muted-foreground">
          The features are loaded with the editor, not on their own: a
          feature&apos;s package is small next to what every editor needs (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;tiptap/core</code
          >, ProseMirror,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;tiptap/starter-kit</code
          >), and loading it later would make the editor and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scEditorView</code
          >
          wait before showing a document. To keep the editor out of a
          page&apos;s first load, load the component that holds it lazily —
          everything, Tiptap&apos;s core too, is then split off. A lazy route
          (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >loadComponent</code
          >) does the same for a page with an editor.
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class EditorPage {
  readonly stylesCode = '@import "@semantic-components/ui/editor/styles";';

  readonly featuresCode = `import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  provideEditor,
} from '@semantic-components/ui/editor';
import { withMarkdown } from '@semantic-components/ui/editor/markdown';
import {
  ScEditorSubscript,
  ScEditorSuperscript,
  withScripts,
} from '@semantic-components/ui/editor/scripts';
import {
  SiBoldIcon,
  SiSubscriptIcon,
  SiSuperscriptIcon,
} from '@semantic-icons/lucide-icons';
import { ScCodeBlock, ScCodeBlockHeader, ScCodeBlockTitle, ScCodeBlockActions, ScCodeBlockCopy, ScCodeBlockContent } from '@semantic-components/code';
import { ScHeading, ScTable, ScTableBody, ScTableCell, ScTableContainer, ScTableHeader, ScTableHeaderCell, ScTableRow } from '@semantic-components/ui';

@Component({
  selector: 'app-note-editor',
  imports: [
    FormField,
    ScEditor,
    ScEditorBold,
    ScEditorContent,
    ScEditorSubscript,
    ScEditorSuperscript,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    SiBoldIcon,
    SiSubscriptIcon,
    SiSuperscriptIcon,
  ],
  // The features of the editors in this component.
  providers: [provideEditor(withScripts(), withMarkdown())],
  template: \`
    <div scEditor [formField]="noteForm.body" format="markdown">
      <div scEditorToolbar aria-label="Formatting">
        <div scEditorToolbarGroup>
          <button scEditorBold value="bold">
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scEditorSuperscript value="superscript">
            <svg siSuperscriptIcon></svg>
            <span class="sr-only">Superscript</span>
          </button>
          <button scEditorSubscript value="subscript">
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
  readonly api: {
    entry: string;
    items: { name: string; inputs: string[]; read: string[]; do: string[] }[];
  }[] = [
    {
      entry: '@semantic-components/ui/editor',
      items: [
        {
          name: '[scEditor]',
          inputs: [
            "format: 'html' | 'json' | 'markdown' | 'text'",
            'characterLimit: number | null',
          ],
          read: [
            'editable()',
            'isActive(name, attributes?)',
            'can(command)',
            'editorInstance()',
            'contentVersion()',
          ],
          do: ['run(command)'],
        },
        {
          name: 'div[scEditorContent]',
          inputs: ['ariaLabel', 'placeholder', "layout: 'default' | 'page'"],
          read: [],
          do: [],
        },
        {
          name: '[scEditorView]',
          inputs: [
            '[scEditorView]: the document',
            'format',
            "layout: 'default' | 'page'",
          ],
          read: [],
          do: [],
        },
        {
          name: 'div[scEditorToolbar]',
          inputs: ['orientation', 'wrap', 'disabled'],
          read: [],
          do: [],
        },
        {
          name: 'button[scEditorHeading]',
          inputs: [],
          read: ["level(): 'p' | 'h1' … 'h6'"],
          do: ['select(level)'],
        },
        {
          name: 'button[scEditorList]',
          inputs: [],
          read: ["type(): 'bulletList' | 'orderedList' | 'taskList' | null"],
          do: ['select(type)'],
        },
        {
          name: 'button[scEditorLink]',
          inputs: [],
          read: ['href()'],
          do: ['set(href, text?)', 'remove()'],
        },
        {
          name: 'span[scEditorWordCount]',
          inputs: [],
          read: ['wordCount()'],
          do: [],
        },
        {
          name: 'span[scEditorCharCount]',
          inputs: [],
          read: ['charCount()', 'limit()', 'remaining()', 'limitReached()'],
          do: [],
        },
        {
          name: 'scEditorBold scEditorItalic scEditorUnderline scEditorStrikethrough scEditorCode scEditorBulletList scEditorOrderedList scEditorTaskList scEditorBlockquote scEditorCodeBlock scEditorHorizontalRule scEditorClearFormatting scEditorUndo scEditorRedo',
          inputs: ['disabled'],
          read: [],
          do: [],
        },
        {
          name: 'scEditorToolbarGroup scEditorSeparator scEditorHeader scEditorFooter scEditorCount',
          inputs: [],
          read: [],
          do: [],
        },
        {
          name: 'provideEditor(...features)',
          inputs: [],
          read: [],
          do: ['The features of the editors and displays below'],
        },
        {
          name: 'withExtensions(...extensions)',
          inputs: [],
          read: [],
          do: ['Your own Tiptap extensions, as a feature'],
        },
        {
          name: 'editorContentExtensions(features?)',
          inputs: [],
          read: [],
          do: ['The document’s extensions, for generateHTML / generateJSON'],
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/tables',
      items: [
        {
          name: 'button[scEditorTable]',
          inputs: [],
          read: ['inTable()', 'can(action)'],
          do: ['select(action)'],
        },
        { name: 'withTables()', inputs: [], read: [], do: ['Tables'] },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/images',
      items: [
        {
          name: '[scEditor][upload]',
          inputs: ['upload: ScEditorUploadHandler', 'imageTypes: string[]'],
          read: ['uploads(): { id, file, progress }[]'],
          do: ['insert(files, position?)', 'cancel(id)'],
        },
        {
          name: 'button[scEditorImage]',
          inputs: ['disabled'],
          read: [],
          do: [],
        },
        {
          name: 'withImages()',
          inputs: [],
          read: [],
          do: ['Images, and dropping or pasting them'],
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/search',
      items: [
        {
          name: 'button[scEditorSearch]',
          inputs: ['disabled'],
          read: ['open()'],
          do: [],
        },
        {
          name: '[scEditorSearchResults]',
          inputs: [],
          read: [
            'count()',
            'index(): number | null',
            "state(): 'idle' | 'found' | 'none'",
          ],
          do: [],
        },
        {
          name: 'button[scEditorSearchOption]',
          inputs: [
            "[scEditorSearchOption]: 'caseSensitive' | 'wholeWord' | 'useRegex'",
          ],
          read: [],
          do: [],
        },
        {
          name: 'scEditorSearchBar scEditorSearchInput scEditorSearchPrevious scEditorSearchNext scEditorReplaceInput scEditorReplace scEditorReplaceAll scEditorSearchClose',
          inputs: [],
          read: [],
          do: [],
        },
        {
          name: 'withSearch()',
          inputs: [],
          read: [],
          do: ['Search and replace, Ctrl / ⌘ + F'],
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/highlight',
      items: [
        {
          name: 'button[scEditorHighlightColor]',
          inputs: ['[scEditorHighlightColor]: a CSS colour'],
          read: [],
          do: [],
        },
        {
          name: 'scEditorHighlight scEditorRemoveHighlight',
          inputs: ['disabled'],
          read: [],
          do: [],
        },
        { name: 'withHighlight()', inputs: [], read: [], do: ['Highlights'] },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/scripts',
      items: [
        {
          name: 'scEditorSuperscript scEditorSubscript',
          inputs: ['disabled'],
          read: [],
          do: [],
        },
        {
          name: 'withScripts()',
          inputs: [],
          read: [],
          do: ['Superscript and subscript'],
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/align',
      items: [
        {
          name: 'scEditorAlignLeft scEditorAlignCenter scEditorAlignRight scEditorAlignJustify',
          inputs: ['disabled'],
          read: [],
          do: [],
        },
        { name: 'withAlign()', inputs: [], read: [], do: ['Alignment'] },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/markdown',
      items: [
        {
          name: 'withMarkdown()',
          inputs: [],
          read: [],
          do: ['format="markdown"'],
        },
      ],
    },
    {
      entry: '@semantic-components/ui/editor/bubble-menu',
      items: [
        {
          name: 'div[scEditorBubbleMenu]',
          inputs: ['orientation', 'wrap'],
          read: [],
          do: [],
        },
      ],
    },
  ];

  readonly shortcuts = [
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

  readonly loadingCode = `@defer (on viewport) {
  <app-note-editor />
} @placeholder {
  <div class="h-40 rounded-lg border"></div>
}`;

  readonly features = [
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
      parts: ['scEditorSearch', 'scEditorSearchBar', 'Ctrl / ⌘ + F'],
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
      parts: ['scEditorSuperscript', 'scEditorSubscript'],
      packages: [
        '@tiptap/extension-superscript',
        '@tiptap/extension-subscript',
      ],
    },
    {
      entry: '/align',
      provide: 'withAlign()',
      parts: [
        'scEditorAlignLeft',
        'scEditorAlignCenter',
        'scEditorAlignRight',
        'scEditorAlignJustify',
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
