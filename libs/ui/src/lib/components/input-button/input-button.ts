import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button/button';

@Directive({
  selector: 'button[scInputButton]',
  host: {
    'data-slot': 'input-button',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScInputButton {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'outline', size: 'default' }),
      'w-full justify-start gap-2 text-muted-foreground',
      this.classInput(),
    ),
  );
}
