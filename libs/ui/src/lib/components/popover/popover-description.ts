import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'p[scPopoverDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScPopoverDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground', this.classInput()),
  );
}
