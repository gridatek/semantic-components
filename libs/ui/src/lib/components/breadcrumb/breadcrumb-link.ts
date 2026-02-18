import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'a[scBreadcrumbLink]',
  host: {
    'data-slot': 'breadcrumb-link',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbLink {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('hover:text-foreground transition-colors', this.classInput()),
  );
}
