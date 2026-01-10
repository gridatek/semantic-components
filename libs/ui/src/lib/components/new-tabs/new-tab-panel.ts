import { TabPanel } from '@angular/aria/tabs';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scNewTabPanel]',
  hostDirectives: [
    {
      directive: TabPanel,
      inputs: ['id', 'value'],
    },
  ],
  host: {
    'data-slot': 'tab-panel',
    '[class]': 'class()',
  },
})
export class ScNewTabPanel {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('mt-2', this.classInput()));
}
