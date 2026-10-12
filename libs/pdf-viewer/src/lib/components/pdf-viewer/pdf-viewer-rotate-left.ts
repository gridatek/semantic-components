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
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'pdfViewer.rotateLeft()',
  },
})
export class ScPdfViewerRotateLeft {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name — the button usually shows only an icon. */
  readonly ariaLabel = input('Rotate counterclockwise', {
    alias: 'aria-label',
  });

  protected readonly class = computed(() => cn(this.classInput()));
}
