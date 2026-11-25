import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Opens and closes the find bar.
 */
@Directive({
  selector: 'button[scPdfViewerNextFindToggle]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.findOpen()',
    '(click)': 'pdfViewer.toggleFind()',
  },
})
export class ScPdfViewerNextFindToggle {
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
