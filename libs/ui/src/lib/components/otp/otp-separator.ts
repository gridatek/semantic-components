import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scOtpSeparator]',
  host: {
    'data-slot': 'otp-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOtpSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center', this.classInput()),
  );
}
