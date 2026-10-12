import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScPdfViewerPasswordForm } from './pdf-viewer-password-form';

/**
 * The password field of a `scPdfViewerPasswordForm`. Use on a `scInput`
 * and label it.
 */
@Directive({
  selector: 'input[scPdfViewerPasswordInput]',
  host: {
    'data-slot': 'pdf-viewer-password-input',
    type: 'password',
    autocomplete: 'current-password',
    '[value]': 'form.password()',
    '[attr.aria-invalid]': 'form.incorrect() || null',
    '[class]': 'class()',
    '(input)': 'form.password.set($any($event.target).value)',
  },
})
export class ScPdfViewerPasswordInput {
  protected readonly form = inject(ScPdfViewerPasswordForm);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
