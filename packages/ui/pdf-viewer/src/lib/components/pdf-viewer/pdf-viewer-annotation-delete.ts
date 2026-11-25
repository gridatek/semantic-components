import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { SC_PDF_ANNOTATION } from './pdf-viewer-annotation-toolbar';

/**
 * Removes the annotation (with the others selected with it), in your
 * annotation toolbar. Undoable (the undo bar). Name it.
 */
@Directive({
  selector: 'button[scPdfViewerAnnotationDelete]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.removeAnnotation(annotation.id)',
  },
})
export class ScPdfViewerAnnotationDelete {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly annotation = inject(SC_PDF_ANNOTATION);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
