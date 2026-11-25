import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Shown while there's no document (`src` empty, no file opened); hidden
 * otherwise. Use on a `scEmpty` and write its content (e.g. an "Open file"
 * button calling `viewer.openFile()`).
 */
@Directive({
  selector: '[scPdfViewerNextEmpty]',
  host: {
    'data-slot': 'pdf-viewer-empty',
    '[hidden]': 'pdfViewer.hasSource()',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextEmpty {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('absolute inset-0', this.classInput()),
  );
}
