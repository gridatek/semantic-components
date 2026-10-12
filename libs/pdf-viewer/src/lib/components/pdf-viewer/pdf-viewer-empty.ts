import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Shown while there's no document (`src` empty, no file opened); hidden
 * otherwise. Use on a `scEmpty` and write its content (e.g. an "Open file"
 * button calling `viewer.openFile()`).
 */
@Directive({
  selector: '[scPdfViewerEmpty]',
  host: {
    'data-slot': 'pdf-viewer-empty',
    '[hidden]': 'pdfViewer.hasSource()',
    '[class]': 'class()',
  },
})
export class ScPdfViewerEmpty {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute inset-0', this.classInput()),
  );
}
