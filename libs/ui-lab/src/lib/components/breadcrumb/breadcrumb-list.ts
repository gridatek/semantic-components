import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'ol[sc-breadcrumb-list]',
  host: {
    'data-slot': 'breadcrumb-list',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      this.classInput(),
    ),
  );
}
