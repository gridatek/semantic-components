import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_NUMBER } from './number';

@Directive({
  selector: 'button[scNumberIncrement]',
  host: {
    'data-slot': 'number-increment',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!number.canIncrement()',
    '[attr.aria-label]': '"Increase value"',
    '(click)': 'onClick()',
  },
})
export class ScNumberIncrement {
  readonly number = inject(SC_NUMBER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'outline', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.number.increment();
  }
}
