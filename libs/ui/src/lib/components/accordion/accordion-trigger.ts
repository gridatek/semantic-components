import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { AccordionTrigger } from '@angular/aria/accordion';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';

@Component({
  selector: '[scAccordionTrigger]',
  imports: [SiChevronDownIcon, SiChevronUpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panelId', 'disabled', 'expanded', 'id'],
      outputs: ['expandedChange'],
    },
  ],
  host: {
    'data-slot': 'accordion-trigger',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
    <svg
      si-chevron-down-icon
      data-slot="accordion-trigger-icon"
      class="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
    ></svg>
    <svg
      si-chevron-up-icon
      data-slot="accordion-trigger-icon"
      class="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
    ></svg>
  `,
})
export class ScAccordionTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring',
      '**:data-[slot=accordion-trigger-icon]:text-muted-foreground',
      'rounded-lg py-2.5 text-left text-sm font-medium hover:underline focus-visible:ring-3',
      '**:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4',
      'group/accordion-trigger relative flex flex-1 items-start justify-between',
      'border border-transparent transition-all outline-none',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
