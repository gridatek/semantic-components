import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';

@Component({
  selector: 'li[scBreadcrumbSeparator]',
  imports: [SiChevronRightIcon],
  host: {
    'data-slot': 'breadcrumb-separator',
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  template: `
    <ng-content>
      <svg siChevronRightIcon></svg>
    </ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScBreadcrumbSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('[&>svg]:size-3.5', this.classInput()),
  );
}
