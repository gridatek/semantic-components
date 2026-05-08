import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { PdfViewerDemoContainer } from './demos/pdf-viewer-demo-container';

@Component({
  selector: 'app-pdf-viewer-page',
  imports: [PdfViewerDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Pdf Viewer</h1>
        <p class="text-muted-foreground">
          A document viewer component for displaying PDF files with navigation,
          zoom, and toolbar controls. Powered by
          <a
            href="https://github.com/mozilla/pdf.js"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            pdf.js
          </a>
          under the hood.
        </p>
        <app-component-badges path="pdf-viewer" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-pdf-viewer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfViewerPage {}
