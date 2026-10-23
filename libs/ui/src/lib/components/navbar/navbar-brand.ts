import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

@Directive({
  selector: '[scNavbarBrand]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNavbarBrand {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative z-50',
      'flex items-center gap-2',
      'text-lg font-semibold',
      'text-foreground',
      "[&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-6",
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );
}
