import { DOCUMENT, Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScPdfViewerNextSignatureForm } from './pdf-viewer-next-signature-form';

/**
 * Asks for the image of a signature in a `scPdfViewerNextSignatureForm`
 * (`form.image()` — preview it). Write its text.
 */
@Directive({
  selector: 'button[scPdfViewerNextSignatureImage]',
  host: {
    type: 'button',
    'data-slot': 'pdf-viewer-signature-image',
    '[class]': 'class()',
    '(click)': 'choose()',
  },
})
export class ScPdfViewerNextSignatureImage {
  private readonly buttonStyles = injectStyle().button;

  private readonly form = inject(ScPdfViewerNextSignatureForm);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  private choose(): void {
    const field = this.document.createElement('input');
    field.type = 'file';
    field.accept = 'image/*';
    field.addEventListener('change', () => {
      const file = field.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => this.form.image.set(reader.result as string);
      reader.readAsDataURL(file);
    });
    field.click();
  }
}
