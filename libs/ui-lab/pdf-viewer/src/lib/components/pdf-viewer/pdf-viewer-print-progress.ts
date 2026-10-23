import { Directive, computed, effect, inject, input } from '@angular/core';
import { ScProgress, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * How far the pages are prepared for printing. Use on a `scProgress` in the
 * `print` dialog (`scPdfViewerDialog="print"`), with an `aria-label`;
 * `viewer.printProgress()` is the percentage, for your text.
 */
@Directive({
  selector: '[scProgress][scPdfViewerPrintProgress]',
  host: {
    'data-slot': 'pdf-viewer-print-progress',
    '[class]': 'class()',
  },
})
export class ScPdfViewerPrintProgress {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const progress = inject(ScProgress);
    effect(() => progress.value.set(this.pdfViewer.printProgress()));
  }
}
