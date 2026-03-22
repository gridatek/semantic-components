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
    'data-slot': 'collapsible-panel',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCollapsiblePanel {
  readonly panel = inject(AccordionPanel);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
