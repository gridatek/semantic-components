import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { ScPdfViewerSignatureForm } from './pdf-viewer-signature-form';

/**
 * Clears the current mode of a `scPdfViewerSignatureForm` (the typed
 * name, the drawing or the image).
 */
@Directive({
  selector: 'button[scPdfViewerSignatureClear]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'form.clear()',
  },
})
export class ScPdfViewerSignatureClear {
  private readonly buttonStyles = injectPreset().button;

  protected readonly form = inject(ScPdfViewerSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
