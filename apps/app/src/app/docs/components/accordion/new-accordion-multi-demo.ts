import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScNewAccordionAnimatedContent,
  ScNewAccordionContent,
  ScNewAccordionGroup,
  ScNewAccordionPanel,
  ScNewAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-accordion-multi-demo',
  imports: [
    ScNewAccordionGroup,
    ScNewAccordionTrigger,
    ScNewAccordionPanel,
    ScNewAccordionContent,
    ScNewAccordionAnimatedContent,
    SiChevronDownIcon,
  ],
  template: `
    <div [multiExpandable]="true" scNewAccordionGroup>
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scNewAccordionTrigger panelId="multi-faq1">
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="multi-faq1">
          <ng-template scNewAccordionContent>
            <div scNewAccordionAnimatedContent>Yes. It adheres to the WAI-ARIA design pattern.</div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scNewAccordionTrigger panelId="multi-faq2">
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="multi-faq2">
          <ng-template scNewAccordionContent>
            <div scNewAccordionAnimatedContent>
              Yes. It supports arrow keys, Home, and End for navigation between accordion triggers.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div>
        <h3 class="flex">
          <button scNewAccordionTrigger panelId="multi-faq3">
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="multi-faq3">
          <ng-template scNewAccordionContent>
            <div scNewAccordionAnimatedContent>
              Yes! This demo has multiExpandable set to true, so you can open multiple panels
              simultaneously.
            </div>
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
export class NewAccordionMultiDemo {}
