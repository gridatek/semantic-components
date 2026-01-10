import { AccordionGroup } from '@angular/aria/accordion';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scAccordionGroup]',
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['multiExpandable'],
    },
  ],
  host: {
    'data-slot': 'accordion-group',
    '[class]': 'class()',
  },
})
export class ScAccordionGroup {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('w-full divide-y divide-border rounded-md border', this.classInput()),
  );
}
