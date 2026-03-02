import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'ol[scBreadcrumbList]',
  host: {
    'data-slot': 'breadcrumb-list',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5',
      this.classInput(),
    ),
  );
}
