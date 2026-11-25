import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Copies the selected pages (with their annotations, comments and form
 * data) for `scPdfViewerPastePages`.
 */
@Directive({
  selector: 'button[scPdfViewerCopyPages]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'pdfViewer.copyPages(pdfViewer.pageSelection())',
  },
})
export class ScPdfViewerCopyPages {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly disabled = computed(
    () => !this.pdfViewer.pageSelection().length,
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
