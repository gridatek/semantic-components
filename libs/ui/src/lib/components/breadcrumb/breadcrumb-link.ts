import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'a[scBreadcrumbLink]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumbLink {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('hover:text-foreground transition-colors', this.classInput()),
  );
}
