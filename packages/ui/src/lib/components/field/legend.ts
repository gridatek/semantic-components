import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

export type ScLegendVariant = 'legend' | 'label';

@Directive({
  selector: 'legend[scLegend]',
  host: {
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScLegend {
  private readonly styles = injectStyle().field;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScLegendVariant>('legend');

  private readonly class = computed(() =>
    cn(this.styles.legend, this.classInput()),
  );
}
