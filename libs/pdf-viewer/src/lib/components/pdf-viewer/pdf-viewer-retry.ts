import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** Loads the document again after an error. Use on a `scButton`. */
@Directive({
  selector: 'button[scPdfViewerRetry]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.retry()',
  },
})
export class ScPdfViewerRetry {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
