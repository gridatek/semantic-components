import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scItemBody]',
  host: {
    'data-slot': 'item-body',
    '[class]': 'class()',
  },
})
export class ScItemBody {
  private readonly styles = injectStyle().item;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.body, this.classInput()),
  );
}
