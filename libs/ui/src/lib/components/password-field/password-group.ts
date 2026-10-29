import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { inputGroupStyles } from '../input-group';

/** The box around the input and the toggle: one border, one focus ring. */
@Directive({
  selector: 'div[scPasswordGroup]',
  host: {
    'data-slot': 'input-group',
    '[class]': 'class()',
  },
})
export class ScPasswordGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(inputGroupStyles, 'pe-1', this.classInput()),
  );
}
