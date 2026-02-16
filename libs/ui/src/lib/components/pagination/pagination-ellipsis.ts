import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'span[sc-pagination-ellipsis]',
  host: {
    'data-slot': 'pagination-ellipsis',
    '[attr.aria-hidden]': 'true',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPaginationEllipsis {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "size-8 [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center",
      this.classInput(),
    ),
  );
}
