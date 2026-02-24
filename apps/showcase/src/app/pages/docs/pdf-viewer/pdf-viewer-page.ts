import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicPdfViewerDemoContainer } from './demos/basic-pdf-viewer-demo-container';
import { MinimalPdfViewerDemoContainer } from './demos/minimal-pdf-viewer-demo-container';
import { CustomToolbarPdfViewerDemoContainer } from './demos/custom-toolbar-pdf-viewer-demo-container';
import { InteractivePdfViewerDemoContainer } from './demos/interactive-pdf-viewer-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-pdf-viewer-page',
  imports: [
    BasicPdfViewerDemoContainer,
    MinimalPdfViewerDemoContainer,
    CustomToolbarPdfViewerDemoContainer,
    InteractivePdfViewerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>PdfViewer</h1>
        <p class="text-muted-foreground">
          A document viewer component for displaying PDF files with navigation,
          zoom, and toolbar controls.
        </p>
        <app-component-badges path="pdf-viewer" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-pdf-viewer-demo-container />
        <app-minimal-pdf-viewer-demo-container />
        <app-custom-toolbar-pdf-viewer-demo-container />
        <app-interactive-pdf-viewer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfViewerPage {}
