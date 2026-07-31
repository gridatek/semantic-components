import { AccordionGroup } from '@angular/aria/accordion';
import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[scCollapsible]',
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['disabled'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCollapsible {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
