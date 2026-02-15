import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { AccordionTrigger } from '@angular/aria/accordion';
import { cn } from '@semantic-components/ui';

@Component({
  selector: '[scAccordionTrigger]',
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
      data-slot="accordion-trigger-icon"
      class="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
    <svg
      data-slot="accordion-trigger-icon"
      class="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
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
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );
}
