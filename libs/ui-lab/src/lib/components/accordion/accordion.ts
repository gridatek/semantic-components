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
  selector: 'div[sc-accordion]',
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['disabled', 'multiExpandable', 'wrap'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'accordion',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAccordion {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex w-full flex-col', this.classInput()),
  );
}
