import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { AccordionPanel } from '@angular/aria/accordion';
import { cn } from '@semantic-components/ui';

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
    'data-slot': 'accordion-content',
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
