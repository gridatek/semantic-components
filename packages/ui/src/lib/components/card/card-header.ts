import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scCardHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCardHeader {
  private readonly styles = injectStyle().card;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
