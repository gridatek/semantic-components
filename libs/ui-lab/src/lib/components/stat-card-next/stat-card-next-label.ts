import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** What the figure is: on a `<dt>` — an icon (`scStatCardNextIcon`) in it, at its end. */
@Directive({
  selector: '[scStatCardNextLabel]',
  host: {
    'data-slot': 'stat-card-label',
    '[class]': 'class()',
  },
})
export class ScStatCardNextLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex basis-full items-center gap-2 font-medium',
      this.classInput(),
    ),
  );
}
