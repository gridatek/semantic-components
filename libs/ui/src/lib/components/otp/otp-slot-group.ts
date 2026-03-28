import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scOtpSlotGroup]',
  host: {
    '[class]': 'class()',
  },
})
export class ScOtpSlotGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center', this.classInput()),
  );
}
