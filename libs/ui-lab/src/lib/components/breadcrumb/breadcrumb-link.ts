import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'a[sc-breadcrumb-link]',
  host: {
    'data-slot': 'breadcrumb-link',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbLink {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('transition-colors hover:text-foreground', this.classInput()),
  );
}
