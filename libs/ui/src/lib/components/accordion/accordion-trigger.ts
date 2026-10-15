import { AccordionTrigger } from '@angular/aria/accordion';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Opens and closes its panel. Write its text, then its icon (a chevron down):
 * it goes to the end, and turns over while open.
 */
@Directive({
  selector: '[scAccordionTrigger]',
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panel', 'disabled', 'expanded', 'id'],
      outputs: ['expandedChange'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScAccordionTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring',
      'rounded-lg py-2.5 text-start text-sm font-medium hover:underline focus-visible:ring-3',
      'group/accordion-trigger relative flex flex-1 items-start justify-between',
      'border border-transparent transition-all outline-none',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      // Its icon, last: at the end, turned over while open.
      '[&>svg:last-child]:text-muted-foreground [&>svg:last-child]:pointer-events-none [&>svg:last-child]:ms-auto [&>svg:last-child]:size-4 [&>svg:last-child]:shrink-0 [&>svg:last-child]:transition-transform',
      'aria-expanded:[&>svg:last-child]:rotate-180',
      this.classInput(),
    ),
  );
}
