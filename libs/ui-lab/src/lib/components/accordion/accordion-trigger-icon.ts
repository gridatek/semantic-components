import { Directive, inject, input, computed } from '@angular/core';
import { AccordionTrigger } from '@angular/aria/accordion';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[sc-accordion-trigger-icon]',
  host: {
    'data-slot': 'accordion-trigger-icon',
    '[class]': 'class()',
  },
})
export class ScAccordionTriggerIcon {
  private readonly trigger = inject(AccordionTrigger, {
    host: true,
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none shrink-0',
      this.trigger?.expanded() && 'rotate-180',
      this.classInput(),
    ),
  );
}
