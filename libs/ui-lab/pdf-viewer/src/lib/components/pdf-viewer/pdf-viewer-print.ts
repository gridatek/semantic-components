import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Prints the document (with a progress dialog); disabled until it has
 * loaded, and when the document forbids printing (`enablePermissions`).
 *
 */
@Directive({
  selector: 'button[scPdfViewerPrint]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'pdfViewer.printWithProgress()',
  },
})
export class ScPdfViewerPrint {
  private readonly buttonStyles = injectPreset().button;

  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly disabled = computed(() => !this.pdfViewer.canPrint());

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
