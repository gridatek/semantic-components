import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'li[scBreadcrumbItem]',
  host: {
    'data-slot': 'breadcrumb-item',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('inline-flex items-center gap-1.5', this.classInput()),
  );
}
