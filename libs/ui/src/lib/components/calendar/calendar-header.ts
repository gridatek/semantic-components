import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scCalendarHeader]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative flex items-center justify-center pt-1', this.classInput()),
  );
}
