import { AccordionPanel } from '@angular/aria/accordion';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[scCollapsiblePanel]',
  exportAs: 'scCollapsiblePanel',
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['id'],
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
export class ScCollapsiblePanel {
  readonly panel = inject(AccordionPanel);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
