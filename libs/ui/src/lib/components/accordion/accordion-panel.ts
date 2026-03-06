import { AccordionPanel } from '@angular/aria/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[scAccordionPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['panelId', 'id'],
    },
  ],
  host: {
    'data-slot': 'accordion-panel',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
})
export class ScAccordionPanel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('text-sm', this.classInput()));
}
