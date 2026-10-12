import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/** Deletes an annotation (undoable from the undo bar). Use on a `scButton`. */
@Directive({
  selector: 'button[scPdfViewerAnnotationDelete]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.removeEditorAnnotation(annotation().id)',
  },
})
export class ScPdfViewerAnnotationDelete {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly annotation = input.required<ScPdfEditorAnnotation>({
    alias: 'scPdfViewerAnnotationDelete',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
