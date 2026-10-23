import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/** Deletes an annotation (undoable from the undo bar). */
@Directive({
  selector: 'button[scPdfViewerAnnotationDelete]',
  host: {
    type: 'button',
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
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
