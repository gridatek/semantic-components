import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-accordion-demo',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent, SiChevronDownIcon],
  template: `
    <div
      class="w-full divide-y divide-border rounded-md border"
      [multiExpandable]="false"
      ngAccordionGroup
    >
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
            #trigger1="ngAccordionTrigger"
            [expanded]="true"
            ngAccordionTrigger
            panelId="faq1"
          >
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="faq1">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
            #trigger2="ngAccordionTrigger"
            ngAccordionTrigger
            panelId="faq2"
          >
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="faq2">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              Yes. It supports arrow keys, Home, and End for navigation between accordion triggers.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div>
        <h3 class="flex">
          <button
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
            #trigger3="ngAccordionTrigger"
            ngAccordionTrigger
            panelId="faq3"
          >
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="faq3">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              By default, yes. But this demo has multiExpandable set to false, so only one panel can
              be open at a time.
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block w-80',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccordionDemo {}
