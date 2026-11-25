import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ApiTable } from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { PdfViewerDemoContainer } from './demos/pdf-viewer-demo-container';
import { PdfViewerFormDemoContainer } from './demos/pdf-viewer-form-demo-container';
import { PdfViewerOpenParametersDemoContainer } from './demos/pdf-viewer-open-parameters-demo-container';
import { PdfViewerPresentationDemoContainer } from './demos/pdf-viewer-presentation-demo-container';
import { PdfViewerReadingDemoContainer } from './demos/pdf-viewer-reading-demo-container';
import { PdfViewerRtlDemoContainer } from './demos/pdf-viewer-rtl-demo-container';
import { PdfViewerUsageDemoContainer } from './demos/pdf-viewer-usage-demo-container';

@Component({
  selector: 'app-pdf-viewer-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    ComponentBadges,
    EntryInstall,
    PartsTable,
    TocHeading,
    PdfViewerUsageDemoContainer,
    PdfViewerDemoContainer,
    PdfViewerFormDemoContainer,
    PdfViewerOpenParametersDemoContainer,
    PdfViewerPresentationDemoContainer,
    PdfViewerReadingDemoContainer,
    PdfViewerRtlDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>PDF Viewer</h1>
        <p class="text-muted-foreground">
          A document viewer for PDF files — navigation, zoom, find, forms,
          annotations, signatures, comments, presentation mode and page
          organisation. The pages are pdf.js&apos;s own viewer; everything
          around them — toolbars, sidebar, find bar, dialogs — is your markup,
          with the viewer&apos;s parts on it.
        </p>
        <app-component-badges path="pdf-viewer" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="pdf-viewer"
          library="pdfjs-dist"
          href="https://mozilla.github.io/pdf.js/"
          names="ScPdfViewer"
        />
        <p>
          Import pdf.js&apos;s viewer styles in your
          <code scTypeset>styles.css</code>:
          <code scTypeset>@import 'pdfjs-dist/web/pdf_viewer.css';</code>.
          pdf.js&apos;s worker, fonts, scripting sandbox and images load from
          <code scTypeset>assetsUrl</code> (unpkg by default): host
          <code scTypeset>pdfjs-dist</code>&apos;s folders yourself for an
          offline or strict-CSP app.
        </p>
        <p>
          <code scTypeset>pdf_viewer.css</code> sets
          <code scTypeset>:root &#123; color-scheme: light dark &#125;</code>
          for the whole page, not only the viewer (<a
            href="https://github.com/mozilla/pdf.js/issues/19886"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
            >pdf.js issue 19886</a
          >): scrollbars and native controls would follow the operating
          system&apos;s mode instead of your app&apos;s.
          <code scTypeset>ScPresetManager</code> sets the page&apos;s
          <code scTypeset>color-scheme</code> inline with the mode, which no
          stylesheet overrides — nothing to do with it (the Theming guide&apos;s
          Mode). Without it, set it yourself the same way.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-pdf-viewer-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The viewer holds the document and its state; the container frames it
          (and goes fullscreen); the canvas is pdf.js&apos;s viewer. The rest is
          yours — toolbars, a sidebar, a find bar, dialogs — with parts on your
          buttons, fields and lists. Parts find the viewer by their place: put
          them inside it, templates rendered elsewhere included.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>pdf.js</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The pages are pdf.js&apos;s <code scTypeset>PDFViewer</code>, wired
            as pdf.js&apos;s viewer application wires it: rendering, text,
            links, forms (their scripts run in pdf.js&apos;s sandbox), structure
            for screen readers, find, scroll and spread modes, annotation
            editors, page organisation.
          </li>
          <li>
            pdf.js&apos;s own words on the pages — its editors&apos; toolbar
            buttons — are its English, or your app&apos;s language when your
            page links pdf.js&apos;s locale files. The library ships no other
            text: yours is yours to word and translate.
          </li>
          <li>
            The look is the library&apos;s: the pages in the style&apos;s frame,
            pdf.js&apos;s toolbars on the pages in the theme&apos;s colours.
            Annotation colours are the theme&apos;s CSS variables —
            <code scTypeset>--sc-pdf-viewer-highlight-1</code> to
            <code scTypeset>-5</code>,
            <code scTypeset>--sc-pdf-viewer-ink-1</code> to
            <code scTypeset>-4</code> — written into the PDF as they are.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Annotations and comments</h2>
        <p>
          pdf.js&apos;s editors draw highlights, text, drawings, images and
          signatures, with its toolbar on each one (colour, alt text, comment,
          delete); your tools set the editor mode and its settings. A comment
          belongs to an annotation, as in pdf.js: its comment button asks for
          one, and your comment form writes it. Deleting offers your undo bar.
          Signatures are made in your dialog — typed, drawn or from an image —
          and saved for reuse in
          <code scTypeset>savedSignatures</code>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Saving and page organisation</h2>
        <p>
          Download and Print write the annotations, comments and form data into
          the PDF, the pages in their order. In the full example&apos;s Pages
          sidebar, select pages to move, copy, cut, paste, delete or save them
          as a new file, drag them to reorder, or insert another PDF — as pdf.js
          does, without rebuilding the file; every change can be undone.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <p>
          pdf.js&apos;s shortcuts, while focus is in the viewer (<code scTypeset
            >keyboardShortcuts</code
          >
          turns them off):
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <kbd scKbd>Ctrl + F</kbd> find, <kbd scKbd>Ctrl + G</kbd> next
            match; <kbd scKbd>Ctrl + =</kbd> / <kbd scKbd>Ctrl + −</kbd> /
            <kbd scKbd>Ctrl + 0</kbd> zoom; <kbd scKbd>Ctrl</kbd> + wheel or a
            pinch zooms around the pointer.
          </li>
          <li>
            <kbd scKbd>N</kbd> / <kbd scKbd>J</kbd> next page,
            <kbd scKbd>P</kbd> / <kbd scKbd>K</kbd> previous,
            <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd> first and last;
            <kbd scKbd>Ctrl + Alt + G</kbd> the page field.
          </li>
          <li>
            <kbd scKbd>R</kbd> / <kbd scKbd>Shift + R</kbd> rotate;
            <kbd scKbd>S</kbd> / <kbd scKbd>H</kbd> select or hand tool;
            <kbd scKbd>F4</kbd> the sidebar.
          </li>
          <li>
            <kbd scKbd>Ctrl + O</kbd> open, <kbd scKbd>Ctrl + S</kbd> download,
            <kbd scKbd>Ctrl + P</kbd> print,
            <kbd scKbd>Ctrl + Alt + P</kbd> presentation mode.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Parts add roles and states (toolbar, group, status, alert,
            separator, pressed, current, expanded); you give the names — icon
            buttons, toolbars, groups, the page field.
          </li>
          <li>
            Tagged PDFs expose their structure — headings, lists, tables,
            figures with alt text — to screen readers; form fields are named
            from the document; images placed on a page take alt text.
          </li>
          <li>
            Pages are landmarks only when you name them:
            <code scTypeset>pageName</code> on the canvas, e.g.
            <code scTypeset>(page, label) =&gt; 'Report, page ' + label</code>.
            pdf.js&apos;s viewer makes every page a region named "Page N"; with
            two viewers on a page (as here), or labels that repeat page numbers,
            those names repeat — screen readers can&apos;t tell the landmarks
            apart — and a long document floods the list of landmarks.
          </li>
          <li>
            In the system&apos;s high-contrast mode the pages are drawn in its
            colours; with <code scTypeset>enablePermissions</code>, a document
            that forbids copying, printing or annotating is shown that way.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <p>
          The complete viewer: sidebar (pages, outline, attachments, layers,
          comments), find, annotation tools, signatures, view options and the
          keyboard shortcuts. Drop a PDF on it to open it.
        </p>
        <app-pdf-viewer-demo-container />
        <p>
          Form fields are real inputs; the document&apos;s own scripts run in
          pdf.js&apos;s sandbox — here the total is computed by the PDF.
          Download and Print include what you typed in.
        </p>
        <app-pdf-viewer-form-demo-container />
        <p>
          pdf.js&apos;s open parameters in the fragment of
          <code scTypeset>src</code> (<code scTypeset>page</code>,
          <code scTypeset>zoom</code>, <code scTypeset>nameddest</code>,
          <code scTypeset>search</code>, <code scTypeset>pagemode</code>) are
          applied on load, or later with <code scTypeset>applyHash</code>. This
          document has page labels: the page field shows them.
        </p>
        <app-pdf-viewer-open-parameters-demo-container />
        <p>
          Presentation mode: one page at a time, fitted to the screen, in
          fullscreen. A click, the arrow keys, the wheel or a swipe turn the
          page; <kbd scKbd>Escape</kbd> leaves and restores the view.
        </p>
        <app-pdf-viewer-presentation-demo-container />
        <p>
          Reading: jumps are remembered — Back and Forward return to where you
          were, in the viewer rather than the browser&apos;s history — and a
          document reopens where it was left (<code scTypeset>rememberView</code
          >). <code scTypeset>pageColors</code> draws the pages in your
          theme&apos;s colours, by name (a reading mode:
          <code scTypeset>--sc-pdf-viewer-sepia-foreground</code> on
          <code scTypeset>--sc-pdf-viewer-sepia-background</code>). With the
          browser&apos;s caret browsing (<kbd scKbd>F7</kbd>) on, tell the
          viewer (<code scTypeset>caretBrowsing</code>) and <kbd scKbd>↑</kbd> /
          <kbd scKbd>↓</kbd> move the caret line by line through the text.
        </p>
        <app-pdf-viewer-reading-demo-container />
        <app-pdf-viewer-rtl-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its look
          (cn: a later class wins). Button parts style their button — the
          style&apos;s — with <code scTypeset>variant</code> and
          <code scTypeset>size</code> as on <code scTypeset>scButton</code>;
          write their icon and text, and name the icon-only ones.
        </p>
        <app-api-table label="ScPdfViewer inputs" [inputs]="inputs" />
        <app-parts-table label="Viewer and layout" [parts]="layout" />
        <app-parts-table label="Buttons" [parts]="buttons" />
        <app-parts-table label="Fields and settings" [parts]="fields" />
        <app-parts-table label="States" [parts]="states" />
        <app-parts-table label="Dialogs" [parts]="dialogs" />
        <app-parts-table label="Annotations and comments" [parts]="comments" />
        <app-parts-table label="Sidebar" [parts]="sidebar" />
        <app-parts-table label="Page organisation" [parts]="organisation" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PdfViewerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScPdfViewer, ScPdfViewerContainer, ScPdfViewerToolbar,',
      '  ScPdfViewerContent, ScPdfViewerLoading, ScPdfViewerError,',
      '  ScPdfViewerCanvas,',
      "} from '@semantic-components/ui/pdf-viewer';",
    ].join('\n'),
    markup: [
      '<div scPdfViewer src="…" #viewer="scPdfViewer">',
      '  <div scPdfViewerContainer>',
      '    <div scPdfViewerToolbar aria-label="…">',
      '      <button scPdfViewerPrevPage>…</button>',
      '      <input scInput scPdfViewerPageInput aria-label="…" />',
      '      …',
      '    </div>',
      '    <div scPdfViewerContent>',
      '      <div scPdfViewerLoading>…</div>',
      '      <div scEmpty scPdfViewerError>…</div>',
      '      <div scPdfViewerCanvas></div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly inputs = [
    {
      name: 'src',
      type: 'string',
      default: "''",
      description:
        "The PDF's URL — its fragment, pdf.js's open parameters (#page=3, #nameddest=…).",
    },
    {
      name: 'fileName',
      type: 'string',
      default: "''",
      description: 'The download and print name, without .pdf.',
    },
    {
      name: 'initialPage',
      type: 'number',
      default: '1',
      description:
        'The page it opens at, without open parameters or a remembered view.',
    },
    {
      name: 'initialZoom',
      type: 'ScPdfZoomLevel',
      default: "'auto'",
      description:
        "A scale (1.5) or 'auto', 'page-actual', 'page-fit', 'page-width'.",
    },
    {
      name: 'assetsUrl',
      type: 'string',
      default: 'unpkg',
      description:
        "Where pdf.js's worker, sandbox, fonts, CMaps, wasm decoders and images are (pdfjs-dist's folders).",
    },
    {
      name: 'workerSrc, sandboxSrc, wasmSrc',
      type: 'string',
      default: "''",
      description: 'Their URLs, if not under assetsUrl.',
    },
    {
      name: 'enableScripting',
      type: 'boolean',
      default: 'true',
      description:
        "The document's scripts (calculations, validation, actions) in pdf.js's sandbox.",
    },
    {
      name: 'enableAutoLinking',
      type: 'boolean',
      default: 'true',
      description: 'URLs and email addresses in the text become links.',
    },
    {
      name: 'enablePermissions',
      type: 'boolean',
      default: 'false',
      description:
        "Follow the document's permissions: no copying, printing, annotating or form filling when it forbids them.",
    },
    {
      name: 'rememberView',
      type: 'boolean',
      default: 'true',
      description:
        'A document reopens where it was left: page, zoom, scroll, rotation.',
    },
    {
      name: 'keyboardShortcuts',
      type: 'boolean',
      default: 'true',
      description: "pdf.js's shortcuts, while focus is in the viewer.",
    },
    {
      name: 'autoPrint',
      type: 'boolean',
      default: 'true',
      description: 'Print when the document asks to on opening.',
    },
    {
      name: '[(sidebarOpen)], [(sidebarView)]',
      type: 'boolean, ScPdfSidebarView',
      default: "false, 'thumbnails'",
      description: 'The sidebar, and its view.',
    },
    {
      name: '[(cursorTool)], [(scrollMode)], [(spreadMode)]',
      type: 'string',
      default: "'select', 'vertical', 'none'",
      description: 'The view: select or hand tool, scroll and spread modes.',
    },
    {
      name: '[(pageColors)]',
      type: 'string',
      default: "''",
      description:
        "Page colours by name: --sc-pdf-viewer-<name>-foreground on -background ('', the document's own).",
    },
    {
      name: '[(caretBrowsing)]',
      type: 'boolean',
      default: 'false',
      description:
        "The browser's caret browsing (F7) is on: ↑ / ↓ move the caret line by line.",
    },
    {
      name: '[(savedSignatures)]',
      type: 'ScPdfSignatureData[]',
      default: '[]',
      description:
        'Signatures saved for reuse — bind to keep them between sessions.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Classes merged over its own.',
    },
  ];

  private readonly layout = [
    {
      name: 'ScPdfViewer',
      selector: '[scPdfViewer]',
      description:
        'The document and all state (exportAs scPdfViewer): currentPage(), totalPages(), pageLabel(n), zoom(), findState(), comments(), undoable(), editorMode(), toolSettings()… and its methods. Outputs: loaded, pageChange, zoomChange, errorEvent, fileOpened.',
    },
    {
      name: 'ScPdfViewerContainer',
      selector: '[scPdfViewerContainer]',
      description:
        "The frame — the style's, as scFrame's; the fullscreen element.",
    },
    {
      name: 'ScPdfViewerToolbar',
      selector: '[scPdfViewerToolbar]',
      description:
        'A toolbar row (role toolbar): name it. Hidden in presentation mode.',
    },
    {
      name: 'ScPdfViewerNav, ScPdfViewerZoom',
      selector: '[scPdfViewerNav], [scPdfViewerZoom]',
      description: 'Groups of page or zoom controls (role group): name them.',
    },
    {
      name: 'ScPdfViewerSpacer',
      selector: '[scPdfViewerSpacer]',
      description: 'Pushes what follows to the end of the row.',
    },
    {
      name: 'ScPdfViewerContent',
      selector: '[scPdfViewerContent]',
      description:
        'The page area. Opens a file dropped on it (data-dragging; [dropFiles]="false" turns it off).',
    },
    {
      name: 'ScPdfViewerCanvas',
      selector: 'div[scPdfViewerCanvas]',
      description:
        "pdf.js's viewer: the pages. pageName: a function naming each page, which makes them landmarks.",
    },
    {
      name: 'ScPdfViewerMenu',
      selector: '[scMenu][scPdfViewerMenu]',
      description:
        "Runs commands: each item's value — open, download, print, presentation, fullscreen, first-page, last-page, rotate-right, rotate-left, properties.",
    },
  ];

  private readonly buttons = [
    {
      name: 'ScPdfViewerPrevPage, ScPdfViewerNextPage',
      selector: 'button[scPdfViewerPrevPage], button[scPdfViewerNextPage]',
      description: 'The previous / next page (spread); disabled at the ends.',
    },
    {
      name: 'ScPdfViewerBack, ScPdfViewerForward',
      selector: 'button[scPdfViewerBack], button[scPdfViewerForward]',
      description: 'Back to before the last jump, or forward again.',
    },
    {
      name: 'ScPdfViewerZoomIn, ScPdfViewerZoomOut',
      selector: 'button[scPdfViewerZoomIn], button[scPdfViewerZoomOut]',
      description: 'Zoom a step, as pdf.js (10% to 2500%).',
    },
    {
      name: 'ScPdfViewerRotateLeft, ScPdfViewerRotateRight',
      selector: 'button[scPdfViewerRotateLeft], button[scPdfViewerRotateRight]',
      description: 'Rotate the pages a quarter turn.',
    },
    {
      name: 'ScPdfViewerSidebarToggle',
      selector: 'button[scPdfViewerSidebarToggle]',
      description: 'Opens and closes the sidebar (aria-pressed).',
    },
    {
      name: 'ScPdfViewerFindToggle',
      selector: 'button[scPdfViewerFindToggle]',
      description: 'Opens and closes the find bar (aria-pressed).',
    },
    {
      name: 'ScPdfViewerFullscreen, ScPdfViewerPresentation',
      selector:
        'button[scPdfViewerFullscreen], button[scPdfViewerPresentation]',
      description: 'Fullscreen; presentation mode (aria-pressed).',
    },
    {
      name: 'ScPdfViewerOpenFile',
      selector: 'button[scPdfViewerOpenFile]',
      description: 'Asks for a PDF and opens it.',
    },
    {
      name: 'ScPdfViewerDownload, ScPdfViewerPrint',
      selector: 'button[scPdfViewerDownload], button[scPdfViewerPrint]',
      description:
        'Download or print, with annotations, comments and form data; print is disabled if the document forbids it.',
    },
    {
      name: 'ScPdfViewerRetry',
      selector: 'button[scPdfViewerRetry]',
      description: 'Loads again after an error.',
    },
    {
      name: 'ScPdfViewerUndo, ScPdfViewerUndoDismiss',
      selector: 'button[scPdfViewerUndo], button[scPdfViewerUndoDismiss]',
      description: 'Undo, or close, what the undo bar offers.',
    },
  ];

  private readonly fields = [
    {
      name: 'ScPdfViewerPageInput',
      selector: 'input[scInput][scPdfViewerPageInput]',
      description:
        'The current page — its label when the document has labels; takes a label or a number.',
    },
    {
      name: 'ScPdfViewerZoomSelect',
      selector: 'select[scPdfViewerZoomSelect]',
      description:
        'Binds the zoom (exportAs scPdfViewerZoomSelect): write the options — auto, page-actual, page-fit, page-width, zoom.scales().',
    },
    {
      name: 'ScPdfViewerFindbar',
      selector: '[scPdfViewerFindbar]',
      description: "The find bar's row, under the toolbar.",
    },
    {
      name: 'ScPdfViewerFindInput',
      selector: 'input[scPdfViewerFindInput]',
      description: 'Finds as you type; Enter / Shift + Enter: next / previous.',
    },
    {
      name: 'ScPdfViewerFindPrevious, ScPdfViewerFindNext',
      selector: 'button[scPdfViewerFindPrevious], button[scPdfViewerFindNext]',
      description: 'The previous / next match.',
    },
    {
      name: 'ScPdfViewerFindResultsInfo',
      selector: '[scPdfViewerFindResultsInfo]',
      description:
        'Where results are announced (role status, data-state): write them from the viewer.',
    },
    {
      name: 'ScPdfViewerSetting',
      selector:
        '[scToggleGroup], [scTabs], input[scSlider], input[scSwitch], input[scCheckbox] [scPdfViewerSetting]',
      description:
        'Binds a setting both ways: editorMode, sidebarView, cursorTool, scrollMode, spreadMode, pageColors, the tools’ thickness, size and opacity, highlightShowAll, the find options, caretBrowsing.',
    },
    {
      name: 'ScPdfViewerColor',
      selector: 'button[scPdfViewerColor]',
      description:
        'A colour swatch (the theme’s variable) for setting: highlightColor, freetextColor or inkColor; pressed while it’s the one.',
    },
  ];

  private readonly states = [
    {
      name: 'ScPdfViewerLoading',
      selector: '[scPdfViewerLoading]',
      description: 'Covers the pages while loading (role status).',
    },
    {
      name: 'ScPdfViewerLoadingBar',
      selector: '[scProgress][scPdfViewerLoadingBar]',
      description: 'The download progress.',
    },
    {
      name: 'ScPdfViewerError',
      selector: '[scPdfViewerError]',
      description:
        'Shown when loading fails (role alert, data-kind): word it from viewer.error().',
    },
    {
      name: 'ScPdfViewerEmpty',
      selector: '[scPdfViewerEmpty]',
      description: 'Shown while there’s no document.',
    },
    {
      name: 'ScPdfViewerUndoBar',
      selector: '[scPdfViewerUndoBar]',
      description:
        'The undo bar (role status, data-state): write its content while viewer.undoable() is set.',
    },
  ];

  private readonly dialogs = [
    {
      name: 'ScPdfViewerDialog',
      selector: '[scDialogProvider][scPdfViewerDialog]',
      description:
        "Opens your dialog when the viewer needs it, and tells it when it's closed: password, print, altText, signature, properties.",
    },
    {
      name: 'ScPdfViewerPasswordForm, ScPdfViewerPasswordInput',
      selector:
        'form[scPdfViewerPasswordForm], input[scPdfViewerPasswordInput]',
      description: 'The password dialog’s form (incorrect()) and field.',
    },
    {
      name: 'ScPdfViewerPrintProgress',
      selector: '[scProgress][scPdfViewerPrintProgress]',
      description: 'The print dialog’s progress.',
    },
    {
      name: 'ScPdfViewerAltTextForm, ScPdfViewerAltTextInput, ScPdfViewerAltTextKind',
      selector:
        'form[scPdfViewerAltTextForm], textarea[scPdfViewerAltTextInput], input[type=radio][scPdfViewerAltTextKind]',
      description:
        "An image's alt text — a description, or decorative — opened by pdf.js's alt text button.",
    },
    {
      name: 'ScPdfViewerSignatureForm',
      selector: '[scPdfViewerSignatureForm]',
      description:
        'Makes a signature: typed, drawn or from an image (exportAs scPdfViewerSignatureForm).',
    },
    {
      name: 'ScPdfViewerSignatureMode',
      selector: '[scTabs][scPdfViewerSignatureMode]',
      description: 'Tabs for how it’s made: type, draw, image.',
    },
    {
      name: 'ScPdfViewerSignatureName, ScPdfViewerSignaturePad, ScPdfViewerSignatureImage',
      selector:
        'input[scInput][scPdfViewerSignatureName], canvas[scPdfViewerSignaturePad], button[scPdfViewerSignatureImage]',
      description: 'The typed name, the drawing pad, the image button.',
    },
    {
      name: 'ScPdfViewerSignatureDescription, ScPdfViewerSignatureClear, ScPdfViewerSignatureAdd',
      selector:
        'input[scPdfViewerSignatureDescription], button[scPdfViewerSignatureClear], button[scPdfViewerSignatureAdd]',
      description: 'Its description; clear; add it (and save it for reuse).',
    },
    {
      name: 'ScPdfViewerSignaturePlace, ScPdfViewerSignatureRemove, ScPdfViewerSignatureNew',
      selector:
        'button[scPdfViewerSignaturePlace], button[scPdfViewerSignatureRemove], button[scPdfViewerSignatureNew]',
      description:
        'In your list of saved signatures: place one, remove one, make a new one.',
    },
  ];

  private readonly comments = [
    {
      name: 'ScPdfViewerAddImage',
      selector: 'button[scPdfViewerAddImage]',
      description: "Asks for an image and places it (pdf.js's image editor).",
    },
    {
      name: 'ScPdfViewerComment',
      selector: '[scPdfViewerComment]',
      description:
        'A comment in your list of viewer.comments() (data-active when picked).',
    },
    {
      name: 'ScPdfViewerCommentShow, ScPdfViewerCommentEdit, ScPdfViewerCommentRemove',
      selector:
        'button[scPdfViewerCommentShow], button[scPdfViewerCommentEdit], button[scPdfViewerCommentRemove]',
      description: 'Shows its annotation; edits it; deletes it (undoable).',
    },
    {
      name: 'ScPdfViewerCommentForm, ScPdfViewerCommentInput, ScPdfViewerCommentCancel',
      selector:
        'form[scPdfViewerCommentForm], textarea[scPdfViewerCommentInput], button[scPdfViewerCommentCancel]',
      description: 'Writes the comment asked for (viewer.pendingComment()).',
    },
  ];

  private readonly sidebar = [
    {
      name: 'ScPdfViewerSidebarResizer',
      selector: '[scPdfViewerSidebarResizer]',
      description: 'Resizes the sidebar (drag, ← / →): a separator — name it.',
    },
    {
      name: 'ScPdfViewerThumbnail',
      selector: 'img[scPdfViewerThumbnail]',
      description: "A page's thumbnail, drawn when near view.",
    },
    {
      name: 'ScPdfViewerGoToPage',
      selector: 'button[scPdfViewerGoToPage]',
      description: 'Goes to its page (aria-current).',
    },
    {
      name: 'ScPdfViewerOutlineItem, ScPdfViewerOutlineToggle',
      selector:
        'button[scPdfViewerOutlineItem], button[scPdfViewerOutlineToggle]',
      description: 'A bookmark (aria-current), and its toggle (aria-expanded).',
    },
    {
      name: 'ScPdfViewerOutlineExpandAll, ScPdfViewerOutlineCollapseAll, ScPdfViewerOutlineFindCurrent',
      selector:
        'button[scPdfViewerOutlineExpandAll], button[scPdfViewerOutlineCollapseAll], button[scPdfViewerOutlineFindCurrent]',
      description: 'Open or close all; reveal the current bookmark.',
    },
    {
      name: 'ScPdfViewerAttachment',
      selector: 'button[scPdfViewerAttachment]',
      description: 'Downloads an attached file.',
    },
    {
      name: 'ScPdfViewerLayer',
      selector: 'input[scCheckbox][scPdfViewerLayer]',
      description: 'Shows or hides a layer.',
    },
  ];

  private readonly organisation = [
    {
      name: 'ScPdfViewerPages',
      selector: '[scPdfViewerPages]',
      description:
        'Your list of viewer.pageNumbers(): drag to reorder; Delete, Ctrl + C / X / V on the selection.',
    },
    {
      name: 'ScPdfViewerPageItem, ScPdfViewerPageSelect',
      selector:
        '[scPdfViewerPageItem], input[scCheckbox][scPdfViewerPageSelect]',
      description:
        'A page in it (draggable, data-selected, data-current), and its checkbox.',
    },
    {
      name: 'ScPdfViewerMovePagesEarlier, ScPdfViewerMovePagesLater',
      selector:
        'button[scPdfViewerMovePagesEarlier], button[scPdfViewerMovePagesLater]',
      description: 'Move the selected pages a place.',
    },
    {
      name: 'ScPdfViewerCopyPages, ScPdfViewerCutPages, ScPdfViewerPastePages, ScPdfViewerDeletePages',
      selector:
        'button[scPdfViewerCopyPages], button[scPdfViewerCutPages], button[scPdfViewerPastePages], button[scPdfViewerDeletePages]',
      description:
        'Copy, cut, paste (after the current page), delete — undoable.',
    },
    {
      name: 'ScPdfViewerExportPages, ScPdfViewerInsertPages',
      selector:
        'button[scPdfViewerExportPages], button[scPdfViewerInsertPages]',
      description:
        'Download the selected pages; insert another PDF (viewer.insertFailed() names one that isn’t).',
    },
  ];
}
