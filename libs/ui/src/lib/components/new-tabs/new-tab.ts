import { Tab } from '@angular/aria/tabs';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: 'button[scNewTab]',
  hostDirectives: [
    {
      directive: Tab,
      inputs: ['id', 'disabled', 'value'],
    },
  ],
  host: {
    'data-slot': 'tab',
    '[class]': 'class()',
  },
})
export class ScNewTab {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow',
      this.classInput(),
    ),
  );
}
