import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scCalendarFooter]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('border-t pt-3', this.classInput()),
  );
}
