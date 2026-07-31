import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scSelectGroup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col', this.classInput()),
  );
}
