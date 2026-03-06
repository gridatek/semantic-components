import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scOtpFieldSlotGroup]',
  host: {
    'data-slot': 'otp-field-slot-group',
    '[class]': 'class()',
  },
})
export class ScOtpFieldSlotGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center', this.classInput()),
  );
}
