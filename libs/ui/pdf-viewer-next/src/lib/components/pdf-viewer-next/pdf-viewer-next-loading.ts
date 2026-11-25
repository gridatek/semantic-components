import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Covers the content while the document loads (`role="status"`); hidden
 * otherwise. Write its content — a spinner, a label.
 */
@Directive({
  selector: '[scPdfViewerNextLoading]',
  host: {
    'data-slot': 'pdf-viewer-loading',
    role: 'status',
    '[hidden]': '!pdfViewer.isLoading()',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextLoading {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'bg-background text-muted-foreground absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-sm',
      '[&>svg]:size-6',
      this.classInput(),
    ),
  );
}
