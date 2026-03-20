import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[scOtpSlotChar]',
  host: {
    'data-slot': 'otp-slot-char',
    '[class]': 'class()',
    '[textContent]': 'char()',
  },
})
export class ScOtpSlotChar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly char = input<string>('');

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}
