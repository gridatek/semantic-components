import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[sc-breadcrumb-page]',
  host: {
    'data-slot': 'breadcrumb-page',
    role: 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbPage {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('font-normal text-foreground', this.classInput()),
  );
}
