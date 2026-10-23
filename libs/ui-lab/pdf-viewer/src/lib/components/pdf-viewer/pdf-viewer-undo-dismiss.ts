import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** Closes the undo bar. */
@Directive({
  selector: 'button[scPdfViewerUndoDismiss]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.closeUndoBar()',
  },
})
export class ScPdfViewerUndoDismiss {
  private readonly buttonStyles = injectPreset().button;

  readonly pdfViewer = inject(SC_PDF_VIEWER);
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
