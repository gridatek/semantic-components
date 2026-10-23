import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Gives up on the comment being placed or written.
 */
@Directive({
  selector: 'button[scPdfViewerCommentCancel]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.cancelComment()',
  },
})
export class ScPdfViewerCommentCancel {
  private readonly buttonStyles = injectPreset().button;

  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
