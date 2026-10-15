import { Directive, computed, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';

@Directive({
  selector: 'svg[scSpinner]',
  host: {
    role: 'status',
    '[class]': 'class()',
  },
})
export class ScSpinner {
  constructor() {
    ɵwarnIfUnnamed('scSpinner');
  }

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('size-4 animate-spin', this.classInput()),
  );
}
