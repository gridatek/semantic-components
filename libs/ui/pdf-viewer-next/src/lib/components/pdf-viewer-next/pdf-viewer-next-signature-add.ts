import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScPdfViewerNextSignatureForm } from './pdf-viewer-next-signature-form';

/**
 * Places the signature being made in a `scPdfViewerNextSignatureForm` (and
 * saves it), closing the dialog; disabled while there's nothing to add.
 *
 */
@Directive({
  selector: 'button[scPdfViewerNextSignatureAdd]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'form.add()',
  },
})
export class ScPdfViewerNextSignatureAdd {
  private readonly buttonStyles = injectStyle().button;

  private readonly form = inject(ScPdfViewerNextSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly disabled = computed(() => !this.form.canAdd());

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
