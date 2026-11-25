import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScPdfViewerNextSignatureForm } from './pdf-viewer-next-signature-form';

/**
 * The description of the signature being made in a
 * `scPdfViewerNextSignatureForm`. Use on a `scInput` and label it.
 */
@Directive({
  selector: 'input[scPdfViewerNextSignatureDescription]',
  host: {
    'data-slot': 'pdf-viewer-signature-description',
    '[value]': 'form.description()',
    '[class]': 'class()',
    '(input)': 'form.description.set($any($event.target).value)',
  },
})
export class ScPdfViewerNextSignatureDescription {
  private readonly form = inject(ScPdfViewerNextSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
}
