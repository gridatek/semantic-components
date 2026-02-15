import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { AccordionGroup } from '@angular/aria/accordion';
import { cn } from '../../utils';

@Component({
  selector: '[scAccordionGroup]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['multiExpandable', 'disabled', 'wrap', 'softDisabled'],
    },
  ],
  host: {
    'data-slot': 'accordion-group',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
})
export class ScAccordionGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn('flex w-full flex-col', this.classInput()),
  );
}
