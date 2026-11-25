import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScPdfViewerNextSignatureForm } from './pdf-viewer-next-signature-form';

/**
 * Picks the image of a signature in a `scPdfViewerNextSignatureForm`
 * (`form.image()`). Use on an `input type="file"` — hide it and open it from
 * your own button (`#file`, `file.click()`), and preview `form.image()`.
 */
@Directive({
  selector: 'input[type="file"][scPdfViewerNextSignatureImage]',
  host: {
    'data-slot': 'pdf-viewer-signature-image',
    accept: 'image/*',
    '[class]': 'class()',
    '(change)': 'pick($event)',
  },
})
export class ScPdfViewerNextSignatureImage {
  private readonly form = inject(ScPdfViewerNextSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  private pick(event: Event): void {
    const field = event.target as HTMLInputElement;
    const file = field.files?.[0];
    field.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.form.image.set(reader.result as string);
    reader.readAsDataURL(file);
  }
}
