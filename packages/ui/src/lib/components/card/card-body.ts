import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scCardBody]',
  host: {
    // Read by the parts inside that blend in (a calendar: no background).
    'data-slot': 'card-body',
    '[class]': 'class()',
  },
})
export class ScCardBody {
  private readonly styles = injectStyle().card;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.body, this.classInput()),
  );
}
