import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';
import { ScHeading, ScLink, ScSeparator } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-pdf-viewer-install-page',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    RouterLink,
    TocHeading,
    ScLink,
    SiCheckIcon,
    SiCopyIcon,
    ScSeparator,
    ScHeading,
    PackageManagerInstall,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>PDF Viewer</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/pdf-viewer</code
          >
          package. Requires the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install the package</h2>
        <p class="text-muted-foreground">
          Install the PDF viewer library and its peer dependency
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">pdfjs-dist</code
          >.
        </p>
        <app-package-manager-install
          packages="@semantic-components/pdf-viewer pdfjs-dist"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure styles</h2>
        <p class="text-muted-foreground">
          Import PDF.js's viewer styles (text selection, links, form fields) and
          add the library as a Tailwind source in your
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
        <p class="text-muted-foreground text-sm">
          Adjust the path to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >node_modules</code
          >
          based on your project structure.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>3. Overlays in fullscreen</h2>
        <p class="text-muted-foreground">
          Dialogs, menus and tooltips are attached to the page body, which is
          hidden while the viewer is fullscreen. Provide CDK's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >FullscreenOverlayContainer</code
          >
          in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >app.config.ts</code
          >
          so they follow it:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>typescript</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="overlayCode"
                #copyOverlay="scCodeBlockCopy"
              >
                @if (copyOverlay.copied()) {
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
            [code]="overlayCode"
            language="typescript"
          ></pre>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>4. Host PDF.js's files (optional)</h2>
        <p class="text-muted-foreground">
          PDF.js loads its worker, form-script sandbox, fonts, CMaps and image
          decoders as needed — from unpkg by default. For offline or strict-CSP
          apps, copy them into your build in
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >angular.json</code
          >
          (the build target's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">assets</code>):
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>json</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="assetsCode"
                #copyAssets="scCodeBlockCopy"
              >
                @if (copyAssets.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="assetsCode" language="json"></pre>
        </div>
        <p class="text-muted-foreground">and point the viewer at them:</p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>html</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="assetsUrlCode"
                #copyAssetsUrl="scCodeBlockCopy"
              >
                @if (copyAssetsUrl.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="assetsUrlCode" language="html"></pre>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <p class="text-muted-foreground">
          The viewer is assembled from parts — see the
          <a scLink routerLink="/docs/components/pdf-viewer">PDF Viewer</a>
          page for a complete example.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PdfViewerInstallPage {
  readonly stylesCode = `@import 'pdfjs-dist/web/pdf_viewer.css';
@source "../node_modules/@semantic-components/pdf-viewer";`;

  readonly assetsCode = `"assets": [
  {
    "glob": "**/*",
    "input": "node_modules/pdfjs-dist",
    "ignore": ["legacy/**", "types/**", "web/**", "image_decoders/**", "**/*.map"],
    "output": "pdfjs"
  }
]`;

  readonly assetsUrlCode = `<div scPdfViewer src="document.pdf" assetsUrl="/pdfjs/">…</div>`;

  readonly overlayCode = `import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { ScCodeBlock, ScCodeBlockHeader, ScCodeBlockTitle, ScCodeBlockActions, ScCodeBlockCopy, ScCodeBlockContent } from '@semantic-components/code';
import { ScHeading, ScLink, ScSeparator } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
};`;
}
