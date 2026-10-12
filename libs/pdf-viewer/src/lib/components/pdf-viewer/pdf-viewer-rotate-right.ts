import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Rotates the pages 90° clockwise. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerRotateRight]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.rotateRight()',
  },
})
export class ScPdfViewerRotateRight {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
