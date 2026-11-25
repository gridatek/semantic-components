import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Starts and ends presentation mode (`aria-pressed`); disabled until the
 * document loads. Write its text, or name it.
 */
@Directive({
  selector: 'button[scPdfViewerNextPresentation]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!pdfViewer.pdfDocument()',
    '[attr.aria-pressed]': 'pdfViewer.presenting()',
    '(click)': 'pdfViewer.togglePresentation()',
  },
})
export class ScPdfViewerNextPresentation {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
