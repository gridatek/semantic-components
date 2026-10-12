import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Rotates the pages 90° counterclockwise. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerRotateLeft]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.rotateLeft()',
  },
})
export class ScPdfViewerRotateLeft {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
