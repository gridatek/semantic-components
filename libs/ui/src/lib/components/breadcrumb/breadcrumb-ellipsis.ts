import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[scBreadcrumbEllipsis]',
  host: {
    'data-slot': 'breadcrumb-ellipsis',
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbEllipsis {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex size-9 items-center justify-center [&_svg]:size-4',
      this.classInput(),
    ),
  );
}
