import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { PdfViewerDemoContainer } from './demos/pdf-viewer-demo-container';
import { PdfViewerFormDemoContainer } from './demos/pdf-viewer-form-demo-container';
import { PdfViewerOpenParametersDemoContainer } from './demos/pdf-viewer-open-parameters-demo-container';
import { PdfViewerPresentationDemoContainer } from './demos/pdf-viewer-presentation-demo-container';
import { PdfViewerReadingDemoContainer } from './demos/pdf-viewer-reading-demo-container';

@Component({
  selector: 'app-pdf-viewer-page',
  imports: [
    EntryInstall,
    PdfViewerDemoContainer,
    PdfViewerFormDemoContainer,
    PdfViewerOpenParametersDemoContainer,
    PdfViewerPresentationDemoContainer,
    PdfViewerReadingDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Pdf Viewer</h1>
        <p class="text-muted-foreground">
          A document viewer for PDF files — navigation, zoom, find, annotations,
          forms, presentation mode and page organisation — assembled from parts.
          Powered by
          <a
            href="https://github.com/mozilla/pdf.js"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            pdf.js</a
          >, and following its viewer's behaviour.
        </p>
        <app-component-badges path="pdf-viewer" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="pdf-viewer"
          library="pdfjs-dist"
          href="https://mozilla.github.io/pdf.js/"
          names="ScPdfViewer"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Examples</h2>
        <p class="text-muted-foreground">
          The complete viewer: sidebar (pages, outline, attachments, layers,
          comments), find, annotation tools, signatures, view options and the
          pdf.js keyboard shortcuts. Drop a PDF on it to open it.
        </p>
        <app-pdf-viewer-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Forms</h2>
        <p class="text-muted-foreground">
          Form fields are real inputs. The document's own scripts run in
          pdf.js's sandbox — here the total is computed by the PDF. Download and
          Print include what you typed in.
        </p>
        <app-pdf-viewer-form-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Open parameters</h2>
        <p class="text-muted-foreground">
          pdf.js's open parameters in the fragment of
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">src</code>
          (<code class="bg-muted rounded px-1.5 py-0.5 text-sm">page</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">zoom</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">nameddest</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">search</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">pagemode</code>)
          are applied on load, or later with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">applyHash</code>.
          This document has page labels: the page field shows them.
        </p>
        <app-pdf-viewer-open-parameters-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Presentation mode</h2>
        <p class="text-muted-foreground">
          One page at a time, fitted to the screen, in fullscreen. Click, the
          arrow keys, the wheel or a swipe turn the page; Escape leaves and
          restores the view.
        </p>
        <app-pdf-viewer-presentation-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Reading</h2>
        <p class="text-muted-foreground">
          Jumps — a link, a bookmark, a thumbnail, the page field — are
          remembered:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Back</code>
          and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Forward</code>
          return to where you were, in the viewer rather than the browser's
          history.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">pageColors</code>
          draws the pages in your colours (a reading mode); in the system's
          high-contrast mode they follow its colours. With the browser's caret
          browsing (F7) on, tell the viewer (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >caretBrowsing</code
          >) and ↑ / ↓ move the caret line by line through the text.
        </p>
        <app-pdf-viewer-reading-demo-container />
        <p class="text-muted-foreground">
          Zoom goes from 10% to 2500% (Ctrl + wheel or pinch around the
          pointer): past what a canvas can hold, the visible part is drawn sharp
          on its own. Tagged PDFs expose their structure — headings, lists,
          tables, figures with alt text — to screen readers. With
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >enablePermissions</code
          >, a document that forbids copying, printing, annotating or filling in
          its form is shown that way. Document properties (More → Document
          properties… in the full example) come from
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >documentProperties()</code
          >; the dialog and its text are yours.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Saving and page organisation</h2>
        <p class="text-muted-foreground">
          Download writes the annotations, comments and form data into the PDF.
          In the full example's Pages sidebar, select pages to move, copy, cut,
          paste, delete or save them as a new file, drag them to reorder, or
          insert another PDF; every change can be undone.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PdfViewerPage {}
