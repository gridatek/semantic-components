import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scCardFooter]',
  host: {
    'data-slot': 'card-footer',
    '[class]': 'class()',
  },
})
export class ScCardFooter {
  private readonly styles = injectStyle().card;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
