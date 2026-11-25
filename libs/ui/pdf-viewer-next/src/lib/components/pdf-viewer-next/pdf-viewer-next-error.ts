import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Covers the content when the document can't be loaded (`role="alert"`);
 * hidden otherwise. Use on a `scEmpty` and write its content: word the
 * message from `viewer.error().kind`, and add a `scPdfViewerNextRetry` button.
 */
@Directive({
  selector: '[scPdfViewerNextError]',
  host: {
    'data-slot': 'pdf-viewer-error',
    role: 'alert',
    '[hidden]': '!pdfViewer.error()',
    '[attr.data-kind]': 'pdfViewer.error()?.kind',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextError {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('bg-background absolute inset-0 z-10', this.classInput()),
  );
}
