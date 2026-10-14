import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scOtpFieldSeparator]',
  host: {
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOtpFieldSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center', this.classInput()),
  );
}
