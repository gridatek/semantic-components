import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Goes to the next page; disabled on the last one.
 */
@Directive({
  selector: 'button[scPdfViewerNextPage]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'pdfViewer.goToNextPage()',
  },
})
export class ScPdfViewerNextPage {
  private readonly buttonStyles = injectPreset().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly disabled = computed(() => !this.pdfViewer.canGoNext());

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
