import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'p[scItemDescription]',
  host: {
    'data-slot': 'item-description',
    '[class]': 'class()',
  },
})
export class ScItemDescription {
  private readonly styles = injectStyle().item;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
