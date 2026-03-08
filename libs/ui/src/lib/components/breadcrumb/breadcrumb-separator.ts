import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scBreadcrumbSeparator]',
  host: {
    'data-slot': 'breadcrumb-separator',
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('[&>svg]:size-3.5', this.classInput()),
  );
}
