import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scItemTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScItemTitle {
  private readonly styles = injectStyle().item;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
