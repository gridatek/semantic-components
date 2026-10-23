import { Directive, computed, inject, input } from '@angular/core';
import { ScInput, bindInput, cn } from '@semantic-components/ui';
import {
  SC_PDF_SIGNATURE_FONT,
  ScPdfViewerSignatureForm,
} from './pdf-viewer-signature-form';

/**
 * The typed signature of a `scPdfViewerSignatureForm`, shown in the
 * signature font, black on white like paper. Use on a `scInput` and label it.
 */
@Directive({
  selector: 'input[scInput][scPdfViewerSignatureName]',
  host: {
    'data-slot': 'pdf-viewer-signature-name',
    '[value]': 'form.name()',
    '[style.font-family]': 'font',
    '(input)': 'form.name.set($any($event.target).value)',
  },
})
export class ScPdfViewerSignatureName {
  protected readonly form = inject(ScPdfViewerSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly font = SC_PDF_SIGNATURE_FONT;
  protected readonly class = computed(() =>
    cn(
      'h-36 bg-white text-center text-4xl text-black italic md:text-4xl dark:bg-white',
      this.classInput(),
    ),
  );

  constructor() {
    // Into the input's own classes, so they merge with ours.
    bindInput(inject(ScInput).classInput, this.class);
  }
}
