import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'svg[scSelectIcon]',
  host: {
    'data-slot': 'select-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground size-4 shrink-0', this.classInput()),
  );
}
