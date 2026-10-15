import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { EditorUsageDemoContainer } from './demos/editor-usage-demo-container';
import { FullFeaturedEditorDemoContainer } from './demos/full-featured-editor-demo-container';
import { NoCountEditorDemoContainer } from './demos/no-count-editor-demo-container';
import { PrefilledEditorDemoContainer } from './demos/prefilled-editor-demo-container';
import { ReadonlyEditorDemoContainer } from './demos/readonly-editor-demo-container';
import { SignalFormsEditorDemoContainer } from './demos/signal-forms-editor-demo-container';

@Component({
  selector: 'app-editor-page',
  imports: [
    EditorUsageDemoContainer,
    PrefilledEditorDemoContainer,
    NoCountEditorDemoContainer,
    ReadonlyEditorDemoContainer,
    FullFeaturedEditorDemoContainer,
    SignalFormsEditorDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Editor</h1>
        <p class="text-muted-foreground">
          Composable WYSIWYG editor powered by Tiptap: block types, lists and
          task lists, code blocks, highlights, links, images, and search and
          replace, with a Signal Forms value in HTML. The full demo follows
          Tiptap&apos;s Simple Editor template, in this library&apos;s styles.
        </p>
        <app-component-badges path="editor" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-editor-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground">
          The complete editor, after Tiptap's Simple Editor: undo and redo, the
          block type and list menus (with task lists), blockquotes and code
          blocks, marks, highlight colours, links, superscript and subscript,
          alignment, images (pick, drop or paste one) and search and replace
          (Ctrl + F). The page layout centres the text in a column of readable
          width.
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
          and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">maxLength</code>
          check it,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scFieldErrors</code
          >
          shows the message once the document is left, and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">disabled</code>
          from the schema follows the checkbox.
        </p>
        <app-signal-forms-editor-demo-container />
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
export default class EditorPage {}
