import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScPdfViewerNextAltTextForm } from './pdf-viewer-next-alt-text-form';

/**
 * A radio choosing between a description and decorative in a
 * `scPdfViewerNextAltTextForm`: `scPdfViewerNextAltTextKind="describe"` or
 * `"decorative"`. Use on a `scRadio` and label it.
 */
@Directive({
  selector: 'input[type="radio"][scPdfViewerNextAltTextKind]',
  host: {
    'data-slot': 'pdf-viewer-alt-text-kind',
    name: 'sc-pdf-viewer-alt-text-kind',
    '[value]': 'kind()',
    '[checked]': 'form.decorative() === (kind() === "decorative")',
    '[class]': 'class()',
    '(change)': 'form.decorative.set(kind() === "decorative")',
  },
})
export class ScPdfViewerNextAltTextKind {
  private readonly form = inject(ScPdfViewerNextAltTextForm);
  readonly kind = input.required<'describe' | 'decorative'>({
    alias: 'scPdfViewerNextAltTextKind',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
}
