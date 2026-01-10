import { AccordionGroup } from '@angular/aria/accordion';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scNewAccordionGroup]',
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['multiExpandable'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScNewAccordionGroup {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('w-full divide-y divide-border rounded-md border', this.classInput()),
  );
}
