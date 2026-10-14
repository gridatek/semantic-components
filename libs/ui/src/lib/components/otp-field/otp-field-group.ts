import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * The row of inputs and separators, in a `scOtpField`. Inputs next to each
 * other are joined into one box; a separator splits them (`123 – 456`).
 */
@Directive({
  selector: 'div[scOtpFieldGroup]',
  host: {
    'data-slot': 'otp-field-group',
    '[class]': 'class()',
  },
})
export class ScOtpFieldGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center has-disabled:opacity-50',
      // Joined: an input after an input loses its start edge and corners, one
      // before an input its end corners.
      '[&>[data-slot=otp-field-input]+[data-slot=otp-field-input]]:rounded-s-none [&>[data-slot=otp-field-input]+[data-slot=otp-field-input]]:border-s-0',
      '[&>[data-slot=otp-field-input]:has(+[data-slot=otp-field-input])]:rounded-e-none',
      this.classInput(),
    ),
  );
}
