import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Moves the selected pages one place later; they stay selected.
 */
@Directive({
  selector: 'button[scPdfViewerMovePagesLater]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'pdfViewer.moveSelectedPages(1)',
  },
})
export class ScPdfViewerMovePagesLater {
  private readonly buttonStyles = injectPreset().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly disabled = computed(
    () =>
      !this.pdfViewer.pageSelection().length ||
      this.pdfViewer.pageSelection().includes(this.pdfViewer.totalPages()) ||
      this.pdfViewer.organizing(),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
