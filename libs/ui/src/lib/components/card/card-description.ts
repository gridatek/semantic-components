import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scCardDescription]',
  host: {
    'data-slot': 'card-description',
    '[class]': 'class()',
  },
})
export class ScCardDescription {
  private readonly styles = injectStyle().card;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
