import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** What the figure is: on a `<dt>` — an icon (`scStatCardIcon`) in it, at its end. */
@Directive({
  selector: '[scStatCardLabel]',
  host: {
    'data-slot': 'stat-card-label',
    '[class]': 'class()',
  },
})
export class ScStatCardLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex basis-full items-center gap-2 font-medium',
      this.classInput(),
    ),
  );
}
