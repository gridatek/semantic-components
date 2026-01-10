import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scAccordionAnimatedContent]',
  host: {
    'data-slot': 'accordion-animated-content',
    '[class]': 'class()',
    'animate.enter': 'animate-accordion-down',
    'animate.leave': 'animate-accordion-up',
  },
})
export class ScAccordionAnimatedContent {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('pb-4 pt-0 px-4', this.classInput()));
}
