import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** Your icon, in the label: at its end. */
@Directive({
  selector: '[scStatCardIcon]',
  host: {
    'data-slot': 'stat-card-icon',
    '[class]': 'class()',
  },
})
export class ScStatCardIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground ms-auto size-4 shrink-0', this.classInput()),
  );
}
