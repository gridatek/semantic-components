import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

export type ScLegendVariant = 'legend' | 'label';

@Directive({
  selector: 'legend[scLegend]',
  host: {
    'data-slot': 'legend',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScLegend {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScLegendVariant>('legend');

  protected readonly class = computed(() =>
    cn(
      'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
      this.classInput(),
    ),
  );
}
