import { AccordionGroup } from '@angular/aria/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-collapsible]',
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
    'data-slot': 'collapsible',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCollapsible {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
