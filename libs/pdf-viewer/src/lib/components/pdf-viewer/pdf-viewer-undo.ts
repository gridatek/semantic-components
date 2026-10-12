import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** Undoes what the undo bar offers. Use on a `scButton`. */
@Directive({
  selector: 'button[scPdfViewerUndo]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.undoLastAction()',
  },
})
export class ScPdfViewerUndo {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
