import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import {
  ScButton,
  ScCopyToClipboard,
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
import { TocHeading } from '../../../components/toc/toc-heading';
import { EditorUsageDemoContainer } from './demos/editor-usage-demo-container';
import { FormatsEditorDemoContainer } from './demos/formats-editor-demo-container';
import { FullFeaturedEditorDemoContainer } from './demos/full-featured-editor-demo-container';
import { NoCountEditorDemoContainer } from './demos/no-count-editor-demo-container';
import { PrefilledEditorDemoContainer } from './demos/prefilled-editor-demo-container';
import { ReadonlyEditorDemoContainer } from './demos/readonly-editor-demo-container';
import { SignalFormsEditorDemoContainer } from './demos/signal-forms-editor-demo-container';
import { ViewEditorDemoContainer } from './demos/view-editor-demo-container';

@Component({
  selector: 'app-editor-page',
  imports: [
    EditorUsageDemoContainer,
    PrefilledEditorDemoContainer,
    NoCountEditorDemoContainer,
    ReadonlyEditorDemoContainer,
    FullFeaturedEditorDemoContainer,
    SignalFormsEditorDemoContainer,
    ViewEditorDemoContainer,
    FormatsEditorDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScButton,
    ScCopyToClipboard,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
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
        <h2 scHeading appToc>Usage</h2>
        <app-editor-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc id="features">Features</h2>
        <p class="text-muted-foreground">
          The core,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/editor</code
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
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>ts</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="featuresCode"
              #copy="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="featuresCode"
            language="typescript"
          ></div>
        </div>
        <div scTableContainer>
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
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>html</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="loadingCode"
              #copyLoading="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copyLoading.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div scCodeViewerContent [code]="loadingCode" language="html"></div>
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
          readable width.
        </p>
        <app-full-featured-editor-demo-container />
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class EditorPage {
  readonly featuresCode = `import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  provideEditor,
} from '@semantic-components/editor';
import { withMarkdown } from '@semantic-components/editor/markdown';
import {
  ScEditorSubscript,
  ScEditorSuperscript,
  withScripts,
} from '@semantic-components/editor/scripts';
import {
  SiBoldIcon,
  SiSubscriptIcon,
  SiSuperscriptIcon,
} from '@semantic-icons/lucide-icons';

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
      parts: ['scEditorImage', 'drop', 'paste'],
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
        'scEditorUnsetHighlight',
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
