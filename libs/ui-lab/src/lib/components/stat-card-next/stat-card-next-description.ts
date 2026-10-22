import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** More about the figure, on a `<dd>` — beside the change: "from last month". */
@Directive({
  selector: '[scStatCardNextDescription]',
  host: {
    'data-slot': 'stat-card-description',
    '[class]': 'class()',
  },
})
export class ScStatCardNextDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-xs', this.classInput()),
  );
}
