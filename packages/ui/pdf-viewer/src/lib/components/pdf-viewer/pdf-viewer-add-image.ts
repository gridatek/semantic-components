import { DOCUMENT, Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Asks for an image and places it on the current page — pdf.js's image
 * editor, in its image mode. Disabled while the document forbids changes.
 * Name it.
 */
@Directive({
  selector: 'button[scPdfViewerAddImage]',
  host: {
    type: 'button',
    'data-slot': 'pdf-viewer-add-image',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'choose()',
  },
})
export class ScPdfViewerAddImage {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly disabled = computed(
    () => !this.pdfViewer.pdfDocument() || !this.pdfViewer.canEdit(),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  private choose(): void {
    const field = this.document.createElement('input');
    field.type = 'file';
    field.accept = 'image/*';
    field.addEventListener('change', () => {
      const file = field.files?.[0];
      if (file) this.pdfViewer.addImage(file);
    });
    field.click();
  }
}
