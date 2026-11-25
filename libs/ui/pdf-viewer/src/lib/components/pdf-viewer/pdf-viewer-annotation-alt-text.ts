import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { SC_PDF_ANNOTATION } from './pdf-viewer-annotation-toolbar';

/**
 * Edits an image's alt text, in your annotation toolbar (for a `stamp`):
 * it's `viewer.altText()` then, in your dialog. `data-done` once it has one
 * (or is decorative). Word it ("Alt text").
 */
@Directive({
  selector: 'button[scPdfViewerAnnotationAltText]',
  host: {
    type: 'button',
    'aria-haspopup': 'dialog',
    '[attr.data-done]': 'done() || null',
    '[class]': 'class()',
    '(click)': 'pdfViewer.editAltText(annotation.id)',
  },
})
export class ScPdfViewerAnnotationAltText {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly annotation = inject(SC_PDF_ANNOTATION);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly done = computed(() =>
    this.pdfViewer.hasAltText(this.annotation.id),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
