import { Directive, computed, inject, input } from '@angular/core';
import { ScProgress, bindInput } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * How far the pages are prepared for printing. Use on a `scProgress` in the
 * `print` dialog (`scPdfViewerNextDialog="print"`), with its track and range and
 * an `aria-label`;
 * `viewer.printProgress()` is the percentage, for your text.
 */
@Directive({
  selector: '[scProgress][scPdfViewerNextPrintProgress]',
  host: {
    'data-slot': 'pdf-viewer-print-progress',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextPrintProgress {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const progress = inject(ScProgress);
    bindInput(progress.value, this.pdfViewer.printProgress);
  }
}
