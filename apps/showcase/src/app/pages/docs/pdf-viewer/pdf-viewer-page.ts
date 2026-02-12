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
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-pdf-viewer-page',
  imports: [
    BasicPdfViewerDemoContainer,
    MinimalPdfViewerDemoContainer,
    CustomToolbarPdfViewerDemoContainer,
    InteractivePdfViewerDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">PdfViewer</h1>
        <p class="text-muted-foreground">
          A document viewer component for displaying PDF files with navigation,
          zoom, and toolbar controls.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class PdfViewerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'pdf-viewer')!
    .status;
}
