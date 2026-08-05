import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCardBody]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCardBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('px-(--card-spacing)', this.classInput()),
  );
}
