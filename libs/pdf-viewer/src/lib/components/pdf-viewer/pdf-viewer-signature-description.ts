import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScPdfViewerSignatureForm } from './pdf-viewer-signature-form';

/**
 * The description of the signature being made in a
 * `scPdfViewerSignatureForm`. Use on a `scInput` and label it.
 */
@Directive({
  selector: 'input[scPdfViewerSignatureDescription]',
  host: {
    'data-slot': 'pdf-viewer-signature-description',
    '[value]': 'form.description()',
    '[class]': 'class()',
    '(input)': 'form.description.set($any($event.target).value)',
  },
})
export class ScPdfViewerSignatureDescription {
  protected readonly form = inject(ScPdfViewerSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
