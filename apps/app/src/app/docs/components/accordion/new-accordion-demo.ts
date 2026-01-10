import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScNewAccordionContent,
  ScNewAccordionGroup,
  ScNewAccordionPanel,
  ScNewAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-accordion-demo',
  imports: [
    ScNewAccordionGroup,
    ScNewAccordionTrigger,
    ScNewAccordionPanel,
    ScNewAccordionContent,
    SiChevronDownIcon,
  ],
  template: `
    <div [multiExpandable]="false" scNewAccordionGroup>
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scNewAccordionTrigger panelId="faq1">
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="faq1">
          <ng-template scNewAccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button scNewAccordionTrigger panelId="faq2">
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="faq2">
          <ng-template scNewAccordionContent>
            Yes. It supports arrow keys, Home, and End for navigation between accordion triggers.
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div>
        <h3 class="flex">
          <button scNewAccordionTrigger panelId="faq3">
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="faq3">
          <ng-template scNewAccordionContent>
            By default, yes. But this demo has multiExpandable set to false, so only one panel can
            be open at a time.
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block w-80',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccordionDemo {}
