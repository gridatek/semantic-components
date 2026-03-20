import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_NUMBER } from './number';

@Directive({
  selector: 'button[scNumberDecrement]',
  host: {
    'data-slot': 'number-decrement',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!number.canDecrement()',
    '[attr.aria-label]': '"Decrease value"',
    '(click)': 'onClick()',
  },
})
export class ScNumberDecrement {
  readonly number = inject(SC_NUMBER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'outline', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.number.decrement();
  }
}
