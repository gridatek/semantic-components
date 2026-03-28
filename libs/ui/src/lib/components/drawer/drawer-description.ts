import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'p[scDrawerDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDrawerDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );
}
