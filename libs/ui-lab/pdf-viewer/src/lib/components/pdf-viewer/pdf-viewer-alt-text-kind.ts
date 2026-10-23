import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScPdfViewerAltTextForm } from './pdf-viewer-alt-text-form';

/**
 * A radio choosing between a description and decorative in a
 * `scPdfViewerAltTextForm`: `scPdfViewerAltTextKind="describe"` or
 * `"decorative"`. Use on a `scRadio` and label it.
 */
@Directive({
  selector: 'input[type="radio"][scPdfViewerAltTextKind]',
  host: {
    'data-slot': 'pdf-viewer-alt-text-kind',
    name: 'sc-pdf-viewer-alt-text-kind',
    '[value]': 'kind()',
    '[checked]': 'form.decorative() === (kind() === "decorative")',
    '[class]': 'class()',
    '(change)': 'form.decorative.set(kind() === "decorative")',
  },
})
export class ScPdfViewerAltTextKind {
  protected readonly form = inject(ScPdfViewerAltTextForm);
  readonly kind = input.required<'describe' | 'decorative'>({
    alias: 'scPdfViewerAltTextKind',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
