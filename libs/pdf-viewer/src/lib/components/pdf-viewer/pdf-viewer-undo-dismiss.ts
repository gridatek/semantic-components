import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** Closes the undo bar. Use on a `scButton`. */
@Directive({
  selector: 'button[scPdfViewerUndoDismiss]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.closeUndoBar()',
  },
})
export class ScPdfViewerUndoDismiss {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
