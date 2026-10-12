import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { ScPdfViewerSignatureForm } from './pdf-viewer-signature-form';

/**
 * Places the signature being made in a `scPdfViewerSignatureForm` (and
 * saves it), closing the dialog; disabled while there's nothing to add.
 * Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerSignatureAdd]',
  host: {
    '[class]': 'class()',
    '(click)': 'form.add()',
  },
})
export class ScPdfViewerSignatureAdd {
  protected readonly form = inject(ScPdfViewerSignatureForm);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.form.canAdd()),
    );
  }
}
