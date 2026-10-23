import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** Loads the document again after an error. */
@Directive({
  selector: 'button[scPdfViewerRetry]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.retry()',
  },
})
export class ScPdfViewerRetry {
  private readonly buttonStyles = injectPreset().button;

  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
