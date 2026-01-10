import { TabList } from '@angular/aria/tabs';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scTabList]',
  hostDirectives: [
    {
      directive: TabList,
      inputs: [
        'orientation',
        'wrap',
        'softDisabled',
        'focusMode',
        'selectionMode',
        'selectedTab',
        'disabled',
      ],
      outputs: ['selectedTabChange'],
    },
  ],
  host: {
    'data-slot': 'tab-list',
    '[class]': 'class()',
  },
})
export class ScTabList {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      this.classInput(),
    ),
  );
}
