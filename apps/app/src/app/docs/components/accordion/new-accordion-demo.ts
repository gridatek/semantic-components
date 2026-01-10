import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScAccordionAnimatedContent,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-accordion-demo',
  imports: [
    ScAccordionAnimatedContent,
    ScAccordionGroup,
    ScAccordionTrigger,
    ScAccordionPanel,
    ScAccordionContent,
    SiChevronDownIcon,
  ],
  template: `
    <div [multiExpandable]="false" scAccordionGroup>
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scAccordionTrigger panelId="faq1">
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 pointer-events-none"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scAccordionPanel panelId="faq1">
          <ng-template scAccordionContent>
            <div scAccordionAnimatedContent>Yes. It adheres to the WAI-ARIA design pattern.</div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button scAccordionTrigger panelId="faq2">
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 pointer-events-none"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scAccordionPanel panelId="faq2">
          <ng-template scAccordionContent>
            <div scAccordionAnimatedContent>
              Yes. It supports arrow keys, Home, and End for navigation between accordion triggers.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div>
        <h3 class="flex">
          <button scAccordionTrigger panelId="faq3">
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 pointer-events-none"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scAccordionPanel panelId="faq3">
          <ng-template scAccordionContent>
            <div scAccordionAnimatedContent>
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccordionDemo {}
