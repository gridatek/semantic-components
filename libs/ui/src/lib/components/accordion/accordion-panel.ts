import { AccordionPanel } from '@angular/aria/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[scAccordionPanel]',
  exportAs: 'scAccordionPanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['id'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
})
export class ScAccordionPanel {
  readonly panel = inject(AccordionPanel);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('text-sm', this.classInput()));
}
