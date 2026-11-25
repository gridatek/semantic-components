import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  ScPopoverProvider,
  injectStyle,
} from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens the `signature` dialog to make a new signature (closing the
 * popover it's in, if any).
 */
@Directive({
  selector: 'button[scPdfViewerSignatureNew]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.openSignatureDialog(); popover?.open.set(false)',
  },
})
export class ScPdfViewerSignatureNew {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  /** The popover of your list of signatures, which closes. */
  private readonly popover = inject(ScPopoverProvider, { optional: true });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
