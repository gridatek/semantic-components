import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[scOtpFieldSlotChar]',
  host: {
    'data-slot': 'otp-field-slot-char',
    '[class]': 'class()',
    '[textContent]': 'char()',
  },
})
export class ScOtpFieldSlotChar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly char = input<string>('');

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}
