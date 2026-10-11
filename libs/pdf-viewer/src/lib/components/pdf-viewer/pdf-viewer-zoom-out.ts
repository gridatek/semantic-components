import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * Zooms out by 25%; disabled at 25%. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerZoomOut]',
  host: {
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'pdfViewer.zoomOut()',
  },
})
export class ScPdfViewerZoomOut {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name — the button usually shows only an icon. */
  readonly ariaLabel = input('Zoom out', { alias: 'aria-label' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.canZoomOut()),
    );
  }
}
