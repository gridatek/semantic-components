import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { ScPdfViewerSignatureForm } from './pdf-viewer-signature-form';

/**
 * Places the signature being made in a `scPdfViewerSignatureForm` (and
 * saves it), closing the dialog; disabled while there's nothing to add.
 *
 */
@Directive({
  selector: 'button[scPdfViewerSignatureAdd]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'form.add()',
  },
})
export class ScPdfViewerSignatureAdd {
  private readonly buttonStyles = injectPreset().button;

  protected readonly form = inject(ScPdfViewerSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly disabled = computed(() => !this.form.canAdd());

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
