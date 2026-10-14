import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The row of slot groups and separators, in a `scOtpField`. */
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
    cn('flex items-center gap-2 has-disabled:opacity-50', this.classInput()),
  );
}
