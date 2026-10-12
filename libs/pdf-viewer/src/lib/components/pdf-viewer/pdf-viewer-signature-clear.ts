import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScPdfViewerSignatureForm } from './pdf-viewer-signature-form';

/**
 * Clears the current mode of a `scPdfViewerSignatureForm` (the typed
 * name, the drawing or the image). Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerSignatureClear]',
  host: {
    '[class]': 'class()',
    '(click)': 'form.clear()',
  },
})
export class ScPdfViewerSignatureClear {
  protected readonly form = inject(ScPdfViewerSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
