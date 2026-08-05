import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scBreadcrumbItem]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumbItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('inline-flex items-center gap-1', this.classInput()),
  );
}
