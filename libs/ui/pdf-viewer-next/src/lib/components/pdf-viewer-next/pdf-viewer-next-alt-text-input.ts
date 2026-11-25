import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScPdfViewerNextAltTextForm } from './pdf-viewer-next-alt-text-form';

/**
 * The description field of a `scPdfViewerNextAltTextForm`. Use on a
 * `scTextarea` and label it.
 */
@Directive({
  selector: 'textarea[scPdfViewerNextAltTextInput]',
  host: {
    'data-slot': 'pdf-viewer-alt-text-input',
    '[value]': 'form.text()',
    '[class]': 'class()',
    '(input)': 'form.text.set($any($event.target).value)',
  },
})
export class ScPdfViewerNextAltTextInput {
  private readonly form = inject(ScPdfViewerNextAltTextForm);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
}
