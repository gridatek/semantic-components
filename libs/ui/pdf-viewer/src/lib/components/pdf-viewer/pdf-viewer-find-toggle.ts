import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens and closes the find bar.
 */
@Directive({
  selector: 'button[scPdfViewerFindToggle]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.findOpen()',
    '(click)': 'pdfViewer.toggleFind()',
  },
})
export class ScPdfViewerFindToggle {
  private readonly buttonStyles = injectPreset().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);

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
