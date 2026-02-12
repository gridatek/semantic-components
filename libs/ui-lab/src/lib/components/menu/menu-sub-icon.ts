import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[sc-menu-sub-icon]',
  host: {
    'data-slot': 'menu-sub-icon',
    '[class]': 'class()',
    'aria-hidden': 'true',
  },
})
export class ScMenuSubIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('ml-auto size-4 text-muted-foreground', this.classInput()),
  );
}
