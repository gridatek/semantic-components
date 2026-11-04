import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scBreadcrumbSeparator]',
  host: {
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      // Its icon turns right to left: a chevron points the reading way (a
      // slash looks the same turned).
      '[&>svg]:size-3.5 rtl:[&>svg]:rotate-180',
      this.classInput(),
    ),
  );
}
