import { DOCUMENT, Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Asks for a PDF and inserts its pages after the current page (merging
 * files). When the file isn't a readable PDF, `viewer.insertFailed()` has
 * its name — say so.
 */
@Directive({
  selector: 'button[scPdfViewerNextInsertPages]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'choose()',
  },
})
export class ScPdfViewerNextInsertPages {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly disabled = computed(
    () => !this.pdfViewer.pdfDocument() || this.pdfViewer.organizing(),
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
    field.accept = '.pdf,application/pdf';
    field.addEventListener('change', () => {
      const file = field.files?.[0];
      if (!file) return;
      this.pdfViewer.insertFile(file, this.pdfViewer.currentPage());
    });
    field.click();
  }
}
