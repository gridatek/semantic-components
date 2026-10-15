import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/**
 * Opens the `altText` dialog for an image annotation (a stamp or a
 * signature). Its `altText` / `isDecorative` tell what
 * it has.
 */
@Directive({
  selector: 'button[scPdfViewerAnnotationAltText]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.openAltText(annotation().id)',
  },
})
export class ScPdfViewerAnnotationAltText {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly annotation = input.required<ScPdfEditorAnnotation>({
    alias: 'scPdfViewerAnnotationAltText',
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
