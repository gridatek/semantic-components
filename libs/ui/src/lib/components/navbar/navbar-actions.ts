import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

@Component({
  selector: 'div[scNavbarActions]',
  template: ` <ng-content /> `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavbarActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative z-50', 'flex items-center gap-2', this.classInput()),
  );
}
