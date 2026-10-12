import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Covers the content when the document can't be loaded (`role="alert"`);
 * hidden otherwise. Use on a `scEmpty` and write its content: word the
 * message from `viewer.error().kind`, and add a `scPdfViewerRetry` button.
 */
@Directive({
  selector: '[scPdfViewerError]',
  host: {
    'data-slot': 'pdf-viewer-error',
    role: 'alert',
    '[hidden]': '!pdfViewer.error()',
    '[attr.data-kind]': 'pdfViewer.error()?.kind',
    '[class]': 'class()',
  },
})
export class ScPdfViewerError {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-background absolute inset-0 z-10', this.classInput()),
  );
}
