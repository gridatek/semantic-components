import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Zooms in a step (×1.1, as pdf.js); disabled at 2500%. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerZoomIn]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.zoomIn()',
  },
})
export class ScPdfViewerZoomIn {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.canZoomIn()),
    );
  }
}
