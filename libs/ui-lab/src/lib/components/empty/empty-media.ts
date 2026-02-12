import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

type EmptyMediaVariant = 'default' | 'icon';

@Directive({
  selector: 'div[sc-empty-media]',
  host: {
    'data-slot': 'empty-icon',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScEmptyMedia {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<EmptyMediaVariant>('default');

  protected readonly class = computed(() => {
    const base =
      'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0';

    const variantClass =
      this.variant() === 'icon'
        ? 'bg-muted text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*=size-])]:size-4'
        : 'bg-transparent';

    return cn(base, variantClass, this.classInput());
  });
}
