import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** Between inputs: splits the joined box in two; write its content (an icon, a dash, a dot). */
@Directive({
  selector: '[scOtpFieldSeparator]',
  host: {
    'data-slot': 'otp-field-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOtpFieldSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center px-2', this.classInput()),
  );
}
