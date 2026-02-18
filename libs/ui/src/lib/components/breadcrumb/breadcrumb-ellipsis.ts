import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiEllipsisIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';

@Component({
  selector: 'span[scBreadcrumbEllipsis]',
  imports: [SiEllipsisIcon],
  host: {
    'data-slot': 'breadcrumb-ellipsis',
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  template: `
    <svg siEllipsisIcon class="size-4"></svg>
    <span class="sr-only">More</span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScBreadcrumbEllipsis {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex size-9 items-center justify-center', this.classInput()),
  );
}
