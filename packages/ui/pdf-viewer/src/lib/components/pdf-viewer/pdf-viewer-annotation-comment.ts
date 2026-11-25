import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { SC_PDF_ANNOTATION } from './pdf-viewer-annotation-toolbar';

/**
 * Writes the annotation's comment, in your annotation toolbar: it's
 * `viewer.pendingComment()` then, in your comment form. Name it.
 */
@Directive({
  selector: 'button[scPdfViewerAnnotationComment]',
  host: {
    type: 'button',
    'aria-haspopup': 'dialog',
    '[class]': 'class()',
    '(click)': 'pdfViewer.commentAnnotation(annotation.id)',
  },
})
export class ScPdfViewerAnnotationComment {
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
