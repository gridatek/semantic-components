import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** An option's label (and its icon). */
@Directive({
  selector: 'span[scSelectItemText]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSelectItemText {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
