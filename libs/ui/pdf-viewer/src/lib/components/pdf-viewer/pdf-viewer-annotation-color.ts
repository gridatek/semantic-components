import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
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
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly annotation = input.required<ScPdfEditorAnnotation>({
    alias: 'scPdfViewerAnnotationColor',
  });
  readonly color = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
