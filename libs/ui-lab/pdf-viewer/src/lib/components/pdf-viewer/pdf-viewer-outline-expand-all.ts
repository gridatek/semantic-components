import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens every bookmark of the outline.
 */
@Directive({
  selector: 'button[scPdfViewerOutlineExpandAll]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.setOutlineExpanded(true)',
  },
})
export class ScPdfViewerOutlineExpandAll {
  private readonly buttonStyles = injectPreset().button;

  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
