import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Covers the content while the document loads (`role="status"`); hidden
 * otherwise. Write its content — a spinner, a label.
 */
@Directive({
  selector: '[scPdfViewerLoading]',
  host: {
    'data-slot': 'pdf-viewer-loading',
    role: 'status',
    '[hidden]': '!pdfViewer.isLoading()',
    '[class]': 'class()',
  },
})
export class ScPdfViewerLoading {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-background text-muted-foreground absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-sm',
      this.classInput(),
    ),
  );
}
