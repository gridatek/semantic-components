import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The breadcrumb's navigation; its name is yours (`aria-label`). */
@Directive({
  selector: 'nav[scBreadcrumb]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumb {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
