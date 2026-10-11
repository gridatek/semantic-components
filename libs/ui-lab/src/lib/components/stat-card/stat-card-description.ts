import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scStatCardDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStatCardDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-xs text-muted-foreground',
      'group-data-[variant=filled]/stat-card:text-primary-foreground/80',
      this.classInput(),
    ),
  );
}
