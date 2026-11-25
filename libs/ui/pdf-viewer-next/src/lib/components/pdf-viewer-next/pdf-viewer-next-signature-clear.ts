import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScPdfViewerNextSignatureForm } from './pdf-viewer-next-signature-form';

/**
 * Clears the current mode of a `scPdfViewerNextSignatureForm` (the typed
 * name, the drawing or the image).
 */
@Directive({
  selector: 'button[scPdfViewerNextSignatureClear]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'form.clear()',
  },
})
export class ScPdfViewerNextSignatureClear {
  private readonly buttonStyles = injectStyle().button;

  private readonly form = inject(ScPdfViewerNextSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
