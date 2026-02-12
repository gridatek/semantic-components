import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

export type ScFieldLegendVariant = 'legend' | 'label';

@Directive({
  selector: 'legend[sc-field-legend]',
  host: {
    'data-slot': 'field-legend',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScFieldLegend {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScFieldLegendVariant>('legend');

  protected readonly class = computed(() =>
    cn(
      'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
      this.classInput(),
    ),
  );
}
