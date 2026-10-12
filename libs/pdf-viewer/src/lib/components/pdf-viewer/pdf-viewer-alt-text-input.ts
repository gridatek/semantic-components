import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScPdfViewerAltTextForm } from './pdf-viewer-alt-text-form';

/**
 * The description field of a `scPdfViewerAltTextForm`. Use on a
 * `scTextarea` and label it.
 */
@Directive({
  selector: 'textarea[scPdfViewerAltTextInput]',
  host: {
    'data-slot': 'pdf-viewer-alt-text-input',
    '[value]': 'form.text()',
    '[class]': 'class()',
    '(input)': 'form.text.set($any($event.target).value)',
  },
})
export class ScPdfViewerAltTextInput {
  protected readonly form = inject(ScPdfViewerAltTextForm);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
