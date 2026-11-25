import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScPdfViewerNextPasswordForm } from './pdf-viewer-next-password-form';

/**
 * The password field of a `scPdfViewerNextPasswordForm`. Use on a `scInput`
 * and label it.
 */
@Directive({
  selector: 'input[scPdfViewerNextPasswordInput]',
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
export class ScPdfViewerNextPasswordInput {
  private readonly form = inject(ScPdfViewerNextPasswordForm);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
}
