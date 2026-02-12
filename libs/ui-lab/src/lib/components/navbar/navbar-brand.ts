import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-navbar-brand]',
  host: {
    'data-slot': 'navbar-brand',
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
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );
}
