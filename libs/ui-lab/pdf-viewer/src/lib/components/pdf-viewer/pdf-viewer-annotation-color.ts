import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/**
 * Recolours an annotation (e.g. a highlight): `[scPdfViewerAnnotationColor]`
 * the annotation, `color` a CSS colour. `aria-pressed` on its current
 * colour. Draw the swatch and name it.
 */
@Directive({
  selector: 'button[scPdfViewerAnnotationColor]',
  host: {
    type: 'button',
    '[attr.aria-pressed]': 'annotation().color === color()',
    '[class]': 'class()',
    '(click)':
      'pdfViewer.updateEditorAnnotation(annotation().id, { color: color() })',
  },
})
export class ScPdfViewerAnnotationColor {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly annotation = input.required<ScPdfEditorAnnotation>({
    alias: 'scPdfViewerAnnotationColor',
  });
  readonly color = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
